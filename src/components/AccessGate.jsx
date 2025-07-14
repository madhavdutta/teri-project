import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import PricingModal from './PricingModal';
import { FiLock, FiStar, FiZap, FiShield } from 'react-icons/fi';

const AccessGate = ({ children }) => {
  const { isAuthenticated, isPremium, user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // If user is authenticated and has premium access, show the app
  if (isAuthenticated && isPremium) {
    return children;
  }

  // If user is authenticated but doesn't have premium access
  if (isAuthenticated && !isPremium) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card rounded-2xl p-8 gold-border shadow-2xl">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full text-white mb-6">
                <FiLock size={40} />
              </div>
              <h1 className="text-4xl font-bold text-text mb-4">
                Welcome, {user?.name}!
              </h1>
              <p className="text-xl text-text-secondary mb-6">
                Upgrade to Premium to unlock the full power of Listen Deep Oracle
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4">
                <FiZap className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text mb-1">Unlimited Conversations</h3>
                <p className="text-sm text-text-secondary">Chat without limits</p>
              </div>
              <div className="text-center p-4">
                <FiStar className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text mb-1">Advanced AI</h3>
                <p className="text-sm text-text-secondary">Deep insights & wisdom</p>
              </div>
              <div className="text-center p-4">
                <FiShield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-text mb-1">Priority Support</h3>
                <p className="text-sm text-text-secondary">Get help when you need it</p>
              </div>
            </div>

            <button
              onClick={() => setShowPricingModal(true)}
              className="btn-primary text-lg px-8 py-4 mb-4"
            >
              Upgrade to Premium
            </button>

            <p className="text-sm text-text-secondary">
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </div>

        <PricingModal 
          isOpen={showPricingModal} 
          onClose={() => setShowPricingModal(false)} 
        />
      </div>
    );
  }

  // If user is not authenticated, show landing page
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card rounded-2xl p-8 md:p-12 gold-border shadow-2xl">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
                Listen Deep Oracle
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary mb-8">
                Your Wise Companion for Deep Insights and Meaningful Conversations
              </p>
              <p className="text-lg text-text-secondary mb-8">
                Experience AI-powered wisdom that listens deeply, understands profoundly, 
                and responds with the insight you seek.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="text-center p-6 bg-gradient-card rounded-xl">
                <FiZap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text mb-2">Lightning Fast</h3>
                <p className="text-text-secondary">Get instant responses powered by advanced AI technology</p>
              </div>
              <div className="text-center p-6 bg-gradient-card rounded-xl">
                <FiStar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text mb-2">Deep Wisdom</h3>
                <p className="text-text-secondary">Receive thoughtful insights and profound understanding</p>
              </div>
              <div className="text-center p-6 bg-gradient-card rounded-xl">
                <FiShield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text mb-2">Secure & Private</h3>
                <p className="text-text-secondary">Your conversations are protected and confidential</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  setAuthMode('register');
                  setShowAuthModal(true);
                }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="btn-gold text-lg px-8 py-4"
              >
                Sign In
              </button>
            </div>

            <p className="text-sm text-text-secondary mt-6">
              Join thousands of users discovering deeper insights every day
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default AccessGate;
