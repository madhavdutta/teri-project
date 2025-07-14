import React from 'react';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="App">
          <ChatInterface />
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
