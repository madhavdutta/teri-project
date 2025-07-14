import React, { useContext, useState } from 'react';
import { FiMessageCircle, FiSettings, FiKey, FiBookOpen, FiFeather, FiStar, FiHeart, FiZap, FiGlobe } from 'react-icons/fi';
import { ChatContext } from '../context/ChatContext';
import ApiKeyModal from './ApiKeyModal';

const WelcomeScreen = () => {
  const { apiKey, sendMessage } = useContext(ChatContext);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const storytellerIceBreakers = [
    {
      icon: <FiFeather className="w-5 h-5" />,
      title: "Character Development",
      prompt: "Help me create a compelling character with a unique backstory, personality traits, and motivations for my story.",
      category: "Character"
    },
    {
      icon: <FiBookOpen className="w-5 h-5" />,
      title: "Plot Structure",
      prompt: "I have a story idea but need help structuring the plot. Can you guide me through creating a three-act structure with key plot points?",
      category: "Plot"
    },
    {
      icon: <FiGlobe className="w-5 h-5" />,
      title: "World Building",
      prompt: "I'm creating a fantasy/sci-fi world. Help me develop the setting, rules, culture, and history that will make it feel authentic and immersive.",
      category: "World"
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: "Dialogue Mastery",
      prompt: "My dialogue feels flat. Can you help me write more natural, engaging conversations that reveal character and advance the plot?",
      category: "Dialogue"
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      title: "Opening Hook",
      prompt: "I'm struggling with my story's opening. Help me craft a compelling first chapter that hooks readers from the very first sentence.",
      category: "Opening"
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: "Emotional Depth",
      prompt: "How can I add more emotional depth to my story? Help me create scenes that will genuinely move readers and create lasting impact.",
      category: "Emotion"
    }
  ];

  const quickStarters = [
    "What's the difference between showing vs telling in storytelling?",
    "Help me overcome writer's block with creative exercises",
    "How do I create realistic conflict in my story?",
    "What makes a story ending satisfying for readers?"
  ];

  const handleIceBreakerClick = async (prompt) => {
    await sendMessage(prompt);
  };

  const handleQuickStarterClick = async (prompt) => {
    await sendMessage(prompt);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-storyteller rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FiFeather size={40} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <FiStar size={14} className="text-yellow-800" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 storyteller-text">
              Welcome, Storyteller
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Your AI writing companion is here to help you craft compelling stories, develop rich characters, and bring your creative vision to life.
            </p>
          </div>

          {/* API Key Status */}
          <div className="mb-12">
            <div className="card-elevated p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <FiKey size={18} className="text-primary" />
                <span className="font-semibold text-lg">API Configuration</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className={`w-3 h-3 rounded-full ${apiKey ? 'bg-green-500' : 'bg-amber-500'} shadow-lg`} />
                <span className="text-text-secondary">
                  {apiKey ? 'Custom API key active' : 'Using default configuration'}
                </span>
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="ml-2 text-sm text-primary hover:text-storyteller transition-colors font-medium"
                >
                  Configure
                </button>
              </div>
            </div>
          </div>

          {/* Storyteller Ice Breakers */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 text-text">Story Crafting Assistants</h2>
              <p className="text-text-secondary text-lg">
                Choose a writing area where you'd like expert guidance and inspiration
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storytellerIceBreakers.map((icebreaker, index) => (
                <div
                  key={index}
                  className="card-storyteller p-6 cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleIceBreakerClick(icebreaker.prompt)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-storyteller rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform">
                      {icebreaker.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-text">{icebreaker.title}</h3>
                        <span className="px-2 py-1 bg-storyteller text-white text-xs rounded-full font-medium">
                          {icebreaker.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed group-hover:text-text transition-colors">
                    {icebreaker.prompt.length > 100 
                      ? `${icebreaker.prompt.substring(0, 100)}...` 
                      : icebreaker.prompt
                    }
                  </p>
                  <div className="mt-4 flex items-center text-storyteller text-sm font-medium">
                    <span>Start crafting</span>
                    <FiZap className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Starters */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-text">Quick Writing Tips</h3>
              <p className="text-text-secondary">
                Get instant advice on common storytelling challenges
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {quickStarters.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickStarterClick(starter)}
                  className="card-elevated p-4 text-left hover:border-primary transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <FiMessageCircle className="w-5 h-5 text-primary group-hover:text-storyteller transition-colors" />
                    <span className="text-text group-hover:text-primary transition-colors font-medium">
                      {starter}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="card-elevated p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FiBookOpen className="w-5 h-5 text-primary" />
                <span className="font-semibold text-text">Powered by Advanced AI</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                This storytelling assistant uses Google's Gemini AI to provide personalized writing guidance, 
                character development insights, and creative inspiration tailored to your unique voice and style.
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted">
                <span>✨ Creative Writing</span>
                <span>📚 Story Structure</span>
                <span>🎭 Character Development</span>
                <span>🌟 Plot Enhancement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApiKeyModal 
        isOpen={showApiKeyModal} 
        onClose={() => setShowApiKeyModal(false)} 
      />
    </>
  );
};

export default WelcomeScreen;
