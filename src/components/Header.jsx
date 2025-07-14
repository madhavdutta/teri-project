import React, { useContext, useState } from 'react';
import { FiMenu, FiPlus, FiSettings, FiFeather } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';
import HeaderControls from './HeaderControls';
import ApiKeyModal from './ApiKeyModal';

const Header = ({ onToggleSidebar }) => {
  const { createNewChat } = useContext(ChatContext);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  return (
    <>
      <header className="bg-header px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-hover transition-all duration-200 hover:scale-105"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-storyteller rounded-lg flex items-center justify-center">
              <FiFeather size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text">StoryForge AI</h1>
              <p className="text-xs text-muted">Your Creative Writing Companion</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="p-2 rounded-xl hover:bg-hover transition-all duration-200 hover:scale-105"
            aria-label="API Settings"
            title="Configure API Key"
          >
            <FiSettings size={20} />
          </button>
          
          <button
            onClick={createNewChat}
            className="btn-primary flex items-center gap-2"
            aria-label="New story session"
          >
            <FiPlus size={16} />
            <span className="hidden sm:inline">New Story</span>
          </button>
          
          <HeaderControls />
        </div>
      </header>

      <ApiKeyModal 
        isOpen={showApiKeyModal} 
        onClose={() => setShowApiKeyModal(false)} 
      />
    </>
  );
};

export default Header;
