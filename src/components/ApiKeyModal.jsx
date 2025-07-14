import React, { useState, useContext, useEffect } from 'react';
import { FiX, FiKey, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';

const ApiKeyModal = ({ isOpen, onClose }) => {
  const { apiKey, setApiKey } = useContext(ChatContext);
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setInputValue(apiKey || '');
      setIsValid(true);
    }
  }, [isOpen, apiKey]);

  const handleSave = () => {
    if (inputValue.trim() && !inputValue.startsWith('AIza')) {
      setIsValid(false);
      return;
    }
    
    setApiKey(inputValue.trim());
    onClose();
  };

  const handleClear = () => {
    setInputValue('');
    setApiKey('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="card-elevated max-w-md w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FiKey size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">API Configuration</h2>
              <p className="text-sm text-muted">Configure your Gemini API key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-hover rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-1">
                  Get your free Gemini API key
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google AI Studio</a> to create your API key. It's free with generous usage limits.
                </p>
              </div>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsValid(true);
                }}
                placeholder="Enter your Gemini API key (optional)"
                className={`input-professional w-full pr-12 ${
                  !isValid ? 'border-red-500 focus:border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-text transition-colors"
              >
                {showKey ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {!isValid && (
              <p className="text-red-500 text-sm flex items-center gap-2">
                <FiAlertCircle size={14} />
                Please enter a valid Gemini API key (starts with 'AIza')
              </p>
            )}
            <p className="text-xs text-muted">
              Leave empty to use the default API key with rate limits
            </p>
          </div>

          {/* Current Status */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-green-500' : 'bg-amber-500'}`} />
              <span className="text-sm font-medium text-text">Current Status</span>
            </div>
            <p className="text-sm text-muted">
              {apiKey 
                ? `Custom API key configured (${apiKey.substring(0, 8)}...)`
                : 'Using default API key with shared rate limits'
              }
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-border">
          <button
            onClick={handleClear}
            className="btn-secondary"
          >
            Use Default
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-muted hover:text-text transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <FiCheck size={16} />
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
