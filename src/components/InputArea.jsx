import React, { useState, useContext, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiMic, FiImage } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';

const InputArea = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useContext(ChatContext);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      await sendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const quickPrompts = [
    "Help me develop this character further",
    "What happens next in the story?",
    "Make this dialogue more engaging",
    "Add more descriptive details"
  ];

  return (
    <div className="space-y-4">
      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => setMessage(prompt)}
            className="px-3 py-1.5 text-xs bg-card border border-border rounded-full hover:border-primary hover:bg-hover transition-all duration-200 text-text-secondary hover:text-primary"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Main Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="card-elevated p-4 focus-within:border-primary transition-all duration-300">
          <div className="flex items-end gap-3">
            {/* Attachment Options */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 text-muted hover:text-primary hover:bg-hover rounded-lg transition-all duration-200"
                aria-label="Attach file"
                title="Attach file"
              >
                <FiPaperclip size={18} />
              </button>
              <button
                type="button"
                className="p-2 text-muted hover:text-primary hover:bg-hover rounded-lg transition-all duration-200"
                aria-label="Add image"
                title="Add image"
              >
                <FiImage size={18} />
              </button>
              <button
                type="button"
                className="p-2 text-muted hover:text-primary hover:bg-hover rounded-lg transition-all duration-200"
                aria-label="Voice input"
                title="Voice input"
              >
                <FiMic size={18} />
              </button>
            </div>
            
            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your story idea, ask for writing advice, or continue your narrative..."
              className="flex-1 bg-transparent resize-none outline-none min-h-[24px] max-h-32 py-2 text-text placeholder-muted"
              rows={1}
              disabled={loading}
            />
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim() || loading}
              className={`p-3 rounded-xl transition-all duration-300 ${
                message.trim() && !loading
                  ? 'bg-gradient-storyteller text-white hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'text-muted cursor-not-allowed bg-gray-100'
              }`}
              aria-label="Send message"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
        
        {/* Status and Tips */}
        <div className="flex justify-between items-center mt-3 px-1">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Press Enter to send • Shift+Enter for new line</span>
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-storyteller rounded-full animate-pulse"></div>
                <span className="text-storyteller">AI is crafting response...</span>
              </div>
            )}
          </div>
          <div className="text-xs text-muted">
            {message.length}/2000
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputArea;
