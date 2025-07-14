import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiX, FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let result;
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        onClose();
        setFormData({ email: '', password: '', name: '' });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormData({ email: '', password: '', name: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md relative gold-border">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join Us'}
            </h2>
            <p className="text-text-secondary">
              {mode === 'login' 
                ? 'Sign in to access Listen Deep Oracle' 
                : 'Create your account to get started'
              }
            </p>
          </div>

          {/* Demo credentials info */}
          {mode === 'login' && (
            <div className="mb-6 p-4 bg-gold-border rounded-lg border border-gold-border">
              <p className="text-sm text-text-secondary mb-2 font-semibold">Demo Credentials:</p>
              <p className="text-xs text-text-secondary">Free: demo@example.com / demo123</p>
              <p className="text-xs text-text-secondary">Premium: premium@example.com / premium123</p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-input border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-secondary"
                />
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-input border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-secondary"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 bg-input border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text placeholder-text-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-primary hover:underline font-semibold"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
