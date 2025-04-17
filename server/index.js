const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import endpoints configuration
const endpoints = require('../config/endpoints');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Database setup
const DB_PATH = path.join(__dirname, 'data');
const CONVERSATIONS_PATH = path.join(DB_PATH, 'conversations');

// Ensure database directory exists
fs.ensureDirSync(DB_PATH);
fs.ensureDirSync(CONVERSATIONS_PATH);

// Helper functions for file-based storage
function getConversationFilePath(phoneNumber, endpoint) {
  const safePhoneNumber = phoneNumber.replace(/[^a-zA-Z0-9]/g, '_');
  const safeEndpoint = endpoint.replace(/[^a-zA-Z0-9]/g, '_');
  return path.join(CONVERSATIONS_PATH, `${safePhoneNumber}_${safeEndpoint}.json`);
}

async function getConversationHistory(phoneNumber, endpoint) {
  const filePath = getConversationFilePath(phoneNumber, endpoint);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function saveConversation(conversation) {
  const { phoneNumber, endpoint } = conversation;
  const filePath = getConversationFilePath(phoneNumber, endpoint);
  const history = await getConversationHistory(phoneNumber, endpoint);
  history.push(conversation);
  await fs.writeFile(filePath, JSON.stringify(history, null, 2));
}

// API Routes
app.get('/api/chat/:endpoint', (req, res) => {
  const endpoint = req.params.endpoint;
  
  if (!endpoints[endpoint]) {
    return res.status(404).json({ 
      error: 'Invalid endpoint',
      available_endpoints: Object.keys(endpoints)
    });
  }

  res.json({
    endpoint: endpoint,
    model: endpoints[endpoint].model,
    system_prompt: endpoints[endpoint].systemPrompt
  });
});

app.post('/api/chat/:endpoint', async (req, res) => {
  const startTime = Date.now();
  console.log('Received chat request:', {
    endpoint: req.params.endpoint,
    phoneNumber: req.body.phoneNumber,
    message: req.body.message
  });

  try {
    const endpoint = req.params.endpoint;
    const { phoneNumber, message } = req.body;

    if (!endpoints[endpoint]) {
      console.log('Invalid endpoint requested:', endpoint);
      return res.status(404).json({ 
        error: 'Invalid endpoint',
        available_endpoints: Object.keys(endpoints)
      });
    }

    if (!phoneNumber || !message) {
      console.log('Missing required fields:', { phoneNumber, message });
      return res.status(400).json({ 
        error: 'Phone number and message are required'
      });
    }

    console.log('Getting conversation history...');
    const history = await getConversationHistory(phoneNumber, endpoint);
    console.log('History retrieved:', history.length, 'messages');
    
    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: endpoints[endpoint].systemPrompt },
      ...history.map(msg => [
        { role: 'user', content: msg.userMessage },
        { role: 'assistant', content: msg.assistantMessage }
      ]).flat(),
      { role: 'user', content: message }
    ];

    console.log('Sending request to OpenAI...');
    const openAIStartTime = Date.now();
    const response = await fetch(`${process.env.OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: endpoints[endpoint].model,
        messages: messages,
        temperature: 0.7
      })
    });

    console.log('OpenAI response received:', response.status);
    console.log('OpenAI request time:', Date.now() - openAIStartTime, 'ms');

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return res.status(500).json({ 
        error: 'OpenAI API request failed',
        details: errorText
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log('Saving conversation...');
    await saveConversation({
      phoneNumber,
      endpoint,
      model: endpoints[endpoint].model,
      systemPrompt: endpoints[endpoint].systemPrompt,
      userMessage: message,
      assistantMessage
    });

    // Convert markdown to HTML
    const htmlResponse = marked.parse(assistantMessage);

    console.log('Total processing time:', Date.now() - startTime, 'ms');
    res.json({ 
      response: htmlResponse,
      endpoint: endpoint,
      model: endpoints[endpoint].model
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 