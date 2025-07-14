import React, { useState } from 'react';
import { usePayment } from '../context/PaymentContext';
import { useAuth } from '../context/AuthContext';
import { FiX, FiCheck, FiStar, FiZap, FiShield } from 'react-icons/fi';

const PricingModal = ({ isOpen, onClose }) => {
  const { createCheckoutSession, loading, error } = usePayment();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      priceId: 'price_basic_monthly',
      icon: <FiCheck className="w-6 h-6" />,
      features: [
        '100 AI conversations per month',
        'Basic personality responses',
        'Standard response time',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      priceId: 'price_premium_monthly',
      icon: <FiStar className="w-6 h-6" />,
      features: [
        'Unlimited AI conversations',
        'Advanced Listen Deep Oracle personality',
        'Priority response time',
        'Custom conversation memory',
        'Export chat history',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      priceId: 'price_enterprise_monthly',
      icon: <FiShield className="w-6 h-6" />,
      features: [
        'Everything in Premium',
        'API access',
        'Custom integrations',
        'Advanced analytics',
        'Dedicated support',
        'Custom branding options'
      ],
      popular: false
    }
  ];

  const handlePurchase = async (plan) => {
    if (!user) {
      alert('Please log in first');
      return;
    }

    setSelectedPlan(plan.id);
    const result = await createCheckoutSession(plan.priceId, plan.name.toLowerCase());
    
    if (result.success) {
      alert('Payment successful! You now have access to premium features.');
      onClose();
    }
    
    setSelectedPlan(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl relative gold-border max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text transition-colors z-10"
        >
          <FiX size={24} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text mb-2">Choose Your Plan</h2>
            <p className="text-text-secondary">
              Unlock the full power of Listen Deep Oracle
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-gradient-card rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'border-divider hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full text-white mb-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-text">
                    ${plan.price}
                    <span className="text-sm font-normal text-text-secondary">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={loading && selectedPlan === plan.id}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-gradient-secondary text-text border border-divider hover:border-primary'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading && selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Get Started'
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Features comparison */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-text mb-4">All plans include:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center">
                <FiZap className="w-5 h-5 text-primary mr-2" />
                <span className="text-text-secondary">Lightning fast responses</span>
              </div>
              <div className="flex items-center justify-center">
                <FiShield className="w-5 h-5 text-primary mr-2" />
                <span className="text-text-secondary">Secure & private</span>
              </div>
              <div className="flex items-center justify-center">
                <FiStar className="w-5 h-5 text-primary mr-2" />
                <span className="text-text-secondary">Regular updates</span>
              </div>
            </div>
          </div>

          {/* Money back guarantee */}
          <div className="mt-8 text-center p-4 bg-gold-border rounded-lg">
            <p className="text-text-secondary text-sm">
              <strong>30-day money-back guarantee.</strong> Cancel anytime, no questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
