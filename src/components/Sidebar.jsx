import React, { useContext } from 'react';
import { FiX, FiMessageSquare, FiTrash2, FiEdit3, FiFeather, FiBookOpen, FiClock } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { 
    chats, 
    currentChatId, 
    selectChat, 
    deleteChat, 
    updateChatTitle,
    createNewChat 
  } = useContext(ChatContext);

  const handleChatSelect = (chatId) => {
    selectChat(chatId);
    onClose();
  };

  const handleRename = (chatId, currentTitle) => {
    const newTitle = prompt('Enter new story session title:', currentTitle);
    if (newTitle && newTitle.trim()) {
      updateChatTitle(chatId, newTitle.trim());
    }
  };

  const handleDelete = (chatId) => {
    if (window.confirm('Are you sure you want to delete this story session?')) {
      deleteChat(chatId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-sidebar z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-none
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <FiBookOpen size={20} className="text-white" />
            <h2 className="font-bold text-white text-lg">Story Sessions</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white lg:hidden transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* New Chat Button */}
          <button
            onClick={() => {
              createNewChat();
              onClose();
            }}
            className="w-full p-4 mb-4 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200 flex items-center gap-3 text-white group"
          >
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
              <FiFeather size={16} />
            </div>
            <div className="text-left">
              <div className="font-semibold">New Story Session</div>
              <div className="text-sm text-white/70">Start crafting your next tale</div>
            </div>
          </button>
          
          {/* Chat List */}
          <div className="space-y-2">
            {chats.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                <FiMessageSquare size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No story sessions yet</p>
                <p className="text-xs mt-1">Create your first story to get started</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`
                    group relative p-4 rounded-xl cursor-pointer transition-all duration-200
                    ${chat.id === currentChatId 
                      ? 'bg-white/20 border border-white/30 shadow-lg' 
                      : 'hover:bg-white/10 border border-transparent'
                    }
                  `}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate text-sm">
                        {chat.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <FiClock size={12} className="text-white/50" />
                        <span className="text-xs text-white/60">
                          {formatDate(chat.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(chat.id, chat.title);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                        title="Rename session"
                      >
                        <FiEdit3 size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(chat.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-300 transition-colors"
                        title="Delete session"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Preview of last message */}
                  {chat.messages && chat.messages.length > 0 && (
                    <p className="text-xs text-white/50 truncate">
                      {chat.messages[chat.messages.length - 1].content.substring(0, 60)}...
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-xs text-white/60 mb-2">StoryForge AI</p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/40">
              <span>✨ Creative</span>
              <span>📖 Inspiring</span>
              <span>🎯 Focused</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
