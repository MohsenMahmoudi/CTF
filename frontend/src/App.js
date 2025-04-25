import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ChatInterface from './components/ChatInterface';
import HomePage from './components/HomePage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Import endpoints configuration
import endpoints from './config/endpoints';

function AppContent() {
  const { direction } = useLanguage();

  return (
    <ThemeProvider theme={createTheme({
      direction,
      palette: {
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
      },
      typography: {
        fontFamily: [
          'Vazirmatn',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
      },
    })}>
      <CssBaseline />
      <Router>
        <Routes>
          {endpoints.frontend.map((endpoint) => (
            <Route
              key={endpoint.path}
              path={endpoint.path}
              element={
                <ChatInterface
                  endpoint={endpoint.path.replace('/', '')}
                  title={endpoint.title}
                  description={endpoint.description}
                />
              }
            />
          ))}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App; 