import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('auth_token');
        const userData = localStorage.getItem('user_data');
        const subscriptionData = localStorage.getItem('subscription_data');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
          if (subscriptionData) {
            setSubscription(JSON.parse(subscriptionData));
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear invalid data
        Cookies.remove('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('subscription_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with your actual authentication endpoint
      const response = await simulateLogin(email, password);
      
      if (response.success) {
        const { user: userData, token, subscription: subscriptionData } = response;
        
        // Store auth data
        Cookies.set('auth_token', token, { expires: 7 }); // 7 days
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        if (subscriptionData) {
          localStorage.setItem('subscription_data', JSON.stringify(subscriptionData));
          setSubscription(subscriptionData);
        }
        
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with your actual registration endpoint
      const response = await simulateRegister(email, password, name);
      
      if (response.success) {
        const { user: userData, token } = response;
        
        // Store auth data
        Cookies.set('auth_token', token, { expires: 7 });
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('subscription_data');
    setUser(null);
    setSubscription(null);
  };

  const updateSubscription = (subscriptionData) => {
    setSubscription(subscriptionData);
    localStorage.setItem('subscription_data', JSON.stringify(subscriptionData));
  };

  const hasActiveSubscription = () => {
    if (!subscription) return false;
    
    const now = new Date();
    const expiryDate = new Date(subscription.expiresAt);
    
    return subscription.status === 'active' && expiryDate > now;
  };

  const value = {
    user,
    subscription,
    loading,
    login,
    register,
    logout,
    updateSubscription,
    hasActiveSubscription,
    isAuthenticated: !!user,
    isPremium: hasActiveSubscription()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Simulate authentication API calls - replace with your actual backend
const simulateLogin = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Demo users for testing
  const demoUsers = {
    'demo@example.com': {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo123'
    },
    'premium@example.com': {
      id: '2',
      email: 'premium@example.com',
      name: 'Premium User',
      password: 'premium123'
    }
  };
  
  const user = demoUsers[email];
  
  if (!user || user.password !== password) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  const token = `demo_token_${user.id}_${Date.now()}`;
  
  // Premium user gets active subscription
  let subscription = null;
  if (email === 'premium@example.com') {
    subscription = {
      id: 'sub_demo_premium',
      status: 'active',
      plan: 'premium',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };
  }
  
  return { success: true, user: userData, token, subscription };
};

const simulateRegister = async (email, password, name) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple validation
  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required' };
  }
  
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }
  
  const userData = {
    id: `user_${Date.now()}`,
    email,
    name
  };
  
  const token = `demo_token_${userData.id}_${Date.now()}`;
  
  return { success: true, user: userData, token };
};
