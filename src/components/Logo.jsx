import React from 'react';
import { FiZap, FiStar } from 'react-icons/fi';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 48
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      {/* Main logo circle with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 shadow-2xl animate-pulse"></div>
      
      {/* Inner glow effect */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm"></div>
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center text-white">
        <FiZap size={iconSizes[size]} className="animate-pulse" />
        <FiStar size={iconSizes[size] * 0.6} className="absolute top-0 right-0 text-yellow-300 animate-bounce" />
      </div>
      
      {/* Outer ring effect */}
      <div className="absolute -inset-1 rounded-full border-2 border-white/30 animate-spin-slow"></div>
    </div>
  );
};

export default Logo;
