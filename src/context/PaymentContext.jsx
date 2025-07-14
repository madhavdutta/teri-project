import { createContext, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from './AuthContext';

export const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

// Initialize Stripe - replace with your actual publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here');

export const PaymentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, updateSubscription } = useAuth();

  const createCheckoutSession = async (priceId, planName) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('User must be logged in to purchase');
      }

      // Simulate creating a checkout session - replace with your actual backend call
      const response = await simulateCreateCheckoutSession(user.id, priceId, planName);
      
      if (response.success) {
        // In a real implementation, redirect to Stripe Checkout
        // const stripe = await stripePromise;
        // const { error } = await stripe.redirectToCheckout({
        //   sessionId: response.sessionId,
        // });
        
        // For demo purposes, simulate successful payment
        await simulateSuccessfulPayment(user.id, planName);
        
        return { success: true };
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const simulateSuccessfulPayment = async (userId, planName) => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const subscription = {
      id: `sub_${userId}_${Date.now()}`,
      status: 'active',
      plan: planName,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    };
    
    updateSubscription(subscription);
  };

  const value = {
    loading,
    error,
    createCheckoutSession,
    clearError: () => setError(null)
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

// Simulate backend API calls - replace with your actual backend
const simulateCreateCheckoutSession = async (userId, priceId, planName) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would create a Stripe checkout session
  return {
    success: true,
    sessionId: `cs_demo_${userId}_${Date.now()}`,
    url: `https://checkout.stripe.com/demo/${priceId}`
  };
};
