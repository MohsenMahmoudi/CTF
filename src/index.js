import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { marked } from 'marked';
import { config } from 'dotenv';

config();

const app = new Hono();
const PORT = process.env.PORT || 3000;

// Import endpoints configuration
const endpoints = require('./config/endpoints');

// Middleware
app.use('/*', serveStatic({ root: './frontend/build' }));

// Add CORS middleware
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (c.req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }
  
  await next();
});

// Helper function to get conversation history
async function getConversationHistory(c, phoneNumber, endpoint) {
  const stmt = c.env.DB.prepare(`
    SELECT user_message, assistant_message 
    FROM conversations 
    WHERE phone_number = ? AND endpoint = ? 
    ORDER BY timestamp DESC 
    LIMIT 10
  `);
  const result = await stmt.bind(phoneNumber, endpoint).all();
  return result.results;
}

// Helper function to save conversation
async function saveConversation(c, phoneNumber, endpoint, model, systemPrompt, userMessage, assistantMessage) {
  const stmt = c.env.DB.prepare(`
    INSERT INTO conversations (phone_number, endpoint, model, system_prompt, user_message, assistant_message)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  await stmt.bind(phoneNumber, endpoint, model, systemPrompt, userMessage, assistantMessage).run();
}

// Root path handler
app.get('/', (c) => {
  return c.json({ 
    message: 'ChatGPT API Worker is running',
    available_endpoints: Object.keys(endpoints)
  });
});

// GET endpoint to return system prompt
app.get('/chat/:endpoint', async (c) => {
  const endpoint = c.req.param('endpoint');
  
  if (!endpoints[endpoint]) {
    return c.json({ 
      error: 'Invalid endpoint',
      available_endpoints: Object.keys(endpoints)
    }, 404);
  }

  return c.json({
    endpoint: endpoint,
    model: endpoints[endpoint].model,
    system_prompt: endpoints[endpoint].systemPrompt
  });
});

// API endpoint for chat
app.post('/api/chat/:endpoint', async (c) => {
  try {
    const endpoint = c.req.param('endpoint');
    console.log('Received request for endpoint:', endpoint);
    
    if (!endpoints[endpoint]) {
      return c.json({ 
        error: 'Invalid endpoint',
        available_endpoints: Object.keys(endpoints)
      }, 404);
    }

    const { phoneNumber, message } = await c.req.json();

    if (!phoneNumber || !message) {
      return c.json({ 
        error: 'Phone number and message are required',
        received: { phoneNumber, message }
      }, 400);
    }

    // Get conversation history
    const history = await getConversationHistory(c, phoneNumber, endpoint);
    
    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: endpoints[endpoint].systemPrompt },
      ...history.map(msg => [
        { role: 'user', content: msg.user_message },
        { role: 'assistant', content: msg.assistant_message }
      ]).flat(),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await fetch(`${c.env.OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${c.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: endpoints[endpoint].model,
        messages: messages,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return c.json({ 
        error: 'OpenAI API request failed',
        details: errorText
      }, 500);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Save conversation
    await saveConversation(
      c,
      phoneNumber,
      endpoint,
      endpoints[endpoint].model,
      endpoints[endpoint].systemPrompt,
      message,
      assistantMessage
    );

    return c.json({ 
      response: assistantMessage,
      endpoint: endpoint,
      model: endpoints[endpoint].model
    });
  } catch (error) {
    console.error('Error:', error);
    return c.json({ 
      error: 'Internal server error',
      details: error.message
    }, 500);
  }
});

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok' });
});

// Fallback route for React app
app.get('*', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Critical Thinking Chat</title>
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  `);
});

export default app; 