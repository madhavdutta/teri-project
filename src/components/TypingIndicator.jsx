import React from 'react';
import { FiEye, FiSparkles } from 'react-icons/fi';

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 p-6 message-animation justify-center">
      {/* Avatar */}
      <div className="flex-shrink-0 mr-4">
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg animate-pulse-glow gold-border">
          <div className="relative">
            <FiEye size={20} className="text-white" />
            <FiSparkles size={8} className="absolute -top-1 -right-1 text-pink-200 animate-float" />
          </div>
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex-1 text-center">
        <div className="typing-indicator inline-block gold-border-thin">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-text-secondary text-sm font-medium">Listen Deep Oracle is thinking</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
