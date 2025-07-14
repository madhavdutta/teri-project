import React, { useContext, useRef, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { ThemeContext } from '../context/ThemeContext';
import Header from './Header';
import MessageList from './MessageList';
import InputArea from './InputArea';
import WelcomeScreen from './WelcomeScreen';
import Sidebar from './Sidebar';

const ChatInterface = () => {
  const { messages } = useContext(ChatContext);
  const { theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-background text-text min-h-screen flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col">
          <Header onToggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-hidden flex flex-col">
            {messages.length === 0 ? (
              <WelcomeScreen />
            ) : (
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-4xl mx-auto">
                  <MessageList />
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </main>
          
          <div className="border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <InputArea />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
