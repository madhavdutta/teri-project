import { useState, useContext, useRef, useEffect } from 'react';
import { FiSend, FiX, FiZap, FiStar } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';
import { getChallengingQuestions } from '../config/personality';

const MessageInput = ({ isLoading }) => {
  const [message, setMessage] = useState('');
  const [showChallenges, setShowChallenges] = useState(false);
  const { sendMessage } = useContext(ChatContext);
  const textareaRef = useRef(null);
  const challengingQuestions = getChallengingQuestions();

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage('');
      setShowChallenges(false);
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      setShowChallenges(false);
    }
  };

  const handleChallengeClick = (question) => {
    setMessage(question);
    setShowChallenges(false);
    textareaRef.current?.focus();
  };

  const getRandomChallenges = () => {
    const shuffled = [...challengingQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  return (
    <div className="relative">
      {/* Challenge Questions Popup */}
      {showChallenges && (
        <div className="absolute bottom-full left-0 right-0 mb-4 bg-card rounded-2xl shadow-2xl p-6 z-10 gold-border backdrop-blur-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <FiZap className="text-primary" size={20} />
              <h3 className="font-bold text-lg text-text text-center">Storytelling Challenges</h3>
              <FiStar className="text-secondary" size={16} />
            </div>
            <button
              onClick={() => setShowChallenges(false)}
              className="text-text-secondary hover:text-text p-2 rounded-full hover:bg-hover transition-colors ml-auto"
            >
              <FiX size={18} />
            </button>
          </div>
          <div className="grid gap-3 max-h-64 overflow-y-auto">
            {getRandomChallenges().map((question, index) => (
              <button
                key={index}
                onClick={() => handleChallengeClick(question)}
                className="text-center text-sm bg-hover hover:bg-active p-4 rounded-xl transition-all duration-200 border border-transparent hover:border-primary/30 hover:shadow-md group gold-border-thin"
              >
                <span className="text-primary/70 group-hover:text-primary transition-colors">"</span>
                <span className="text-text group-hover:text-text font-medium">{question}</span>
                <span className="text-primary/70 group-hover:text-primary transition-colors">"</span>
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-divider">
            <p className="text-xs text-text-secondary text-center">
              Or type your own message below...
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-end rounded-2xl gold-border bg-input shadow-lg focus-within:shadow-xl input-glow transition-all duration-300 backdrop-blur-sm">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts with Listen Deep Oracle, or ask for a storytelling challenge..."
            disabled={isLoading}
            className="w-full resize-none bg-transparent py-4 pl-6 pr-24 text-text focus:outline-none min-h-[60px] max-h-[200px] placeholder-text-secondary text-center"
            rows={1}
          />
          
          <div className="absolute bottom-3 right-3 flex space-x-2">
            {/* Challenge Button */}
            <button
              type="button"
              onClick={() => setShowChallenges(!showChallenges)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                showChallenges
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'text-text-secondary hover:text-text hover:bg-hover'
              }`}
              title="Get a storytelling challenge"
            >
              <FiZap size={18} />
            </button>

            {message && (
              <button
                type="button"
                onClick={() => setMessage('')}
                className="p-3 text-text-secondary hover:text-text rounded-xl hover:bg-hover transition-all duration-200"
              >
                <FiX size={18} />
              </button>
            )}
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className={`p-3 rounded-xl transition-all duration-200 ${
                message.trim() && !isLoading
                  ? 'bg-gradient-primary text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-hover text-text-secondary cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="loading-spinner w-4 h-4"></div>
              ) : (
                <FiSend size={18} />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
