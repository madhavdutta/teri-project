import React, { createContext, useState, useEffect } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  }, [apiKey]);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: 'New Story Session',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
  };

  const selectChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const updateChatTitle = (chatId, title) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title, updatedAt: new Date().toISOString() }
        : chat
    ));
  };

  const deleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    let chatId = currentChatId;

    // If no current chat, create one
    if (!chatId) {
      chatId = Date.now().toString();
      const newChat = {
        id: chatId,
        title: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(chatId);
    }

    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    // Add user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Update chat with user message
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: updatedMessages,
            title: chat.title === 'New Story Session' ? (content.substring(0, 50) + (content.length > 50 ? '...' : '')) : chat.title,
            updatedAt: new Date().toISOString()
          }
        : chat
    ));

    setIsLoading(true);

    try {
      const response = await callGeminiAPI(content, updatedMessages);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Update chat with assistant response
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: finalMessages,
              updatedAt: new Date().toISOString()
            }
          : chat
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error while processing your request: ${error.message}. Please check your API key and try again.`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        isError: true
      };

      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);

      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: finalMessages,
              updatedAt: new Date().toISOString()
            }
          : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const callGeminiAPI = async (message, conversationHistory) => {
    const API_KEY = apiKey || 'AIzaSyBvbQ9fKAWnfX8CHoDyxy3ByWF7lGGnqhY';
    
    if (!API_KEY) {
      throw new Error('API key is required. Please set your Gemini API key.');
    }

    // Updated to use the correct model name for v1beta API
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // Create context from conversation history (last 10 messages)
    const context = conversationHistory
      .slice(-10)
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n\n');

    const storytellerPrompt = `You are StoryForge AI, an expert creative writing assistant and storytelling companion. You specialize in helping writers craft compelling narratives, develop rich characters, build immersive worlds, and refine their storytelling techniques.

Your expertise includes:
- Character development and psychology
- Plot structure and pacing
- World-building and setting creation
- Dialogue writing and voice
- Genre conventions and tropes
- Writing techniques and style
- Story editing and feedback

Always respond with:
- Practical, actionable advice
- Creative inspiration and ideas
- Specific examples when helpful
- Encouraging and supportive tone
- Professional writing insights

${context ? `Previous conversation:\n${context}\n\n` : ''}Current message: ${message}

Respond as StoryForge AI:`;

    const requestBody = {
      contents: [{
        parts: [{
          text: storytellerPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
        stopSequences: []
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed (${response.status}): ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the API. Please check your internet connection.');
      }
      throw error;
    }
  };

  const value = {
    messages,
    currentChatId,
    chats,
    isLoading,
    apiKey,
    setApiKey,
    createNewChat,
    selectChat,
    updateChatTitle,
    deleteChat,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
