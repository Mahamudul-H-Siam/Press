import React from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Free Starter',
      price: '৳0',
      period: 'forever',
      description: 'Ideal for small businesses getting started with B2B tenders.',
      features: [
        'Browse all public tender listings',
        'Submit up to 3 bids per month',
        'Basic business profile',
        'Standard email notifications',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro Supplier',
      price: '৳4,999',
      period: 'per month',
      description: 'For growing companies actively competing for major contracts.',
      features: [
        'Unlimited bid submissions',
        'Verified Supplier Badge',
        'Real-time instant tender alerts (SMS & Email)',
        'AI Tender Matcher & Eligibility Assistant',
        'Standardized bid comparison visibility',
        'Priority technical support',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise Buyer & Corporate',
      price: '৳14,999',
      period: 'per month',
      description: 'For organizations seeking transparent sourcing & vendor evaluation.',
      features: [
        'Unlimited requirement / tender postings',
        'Custom evaluation criteria & scorecards',
        'Verified Buyer Badge & Dedicated Support',
        'Private invited-only tender capability',
        'Full bid evaluation matrix & export',
        'Procurement analytics & audit logs',
      ],
      cta: 'Contact Enterprise Team',
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Transparent Membership Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Plans Designed for Buyers & Verified Suppliers
        </h1>
        <p className="text-sm text-gray-600">
          Simple pricing models. Choose the tier that matches your business procurement volume.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-8 border flex flex-col justify-between transition-all duration-200 ${
              plan.popular ? 'border-2 border-blue-600 shadow-xl relative' : 'border-gray-200/80 shadow-xs hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-700 to-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Most Popular for Suppliers
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-xs text-gray-500 font-medium">/ {plan.period}</span>
              </div>

              <ul className="space-y-3 border-t border-gray-100 pt-6 text-xs text-gray-700">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/register"
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {plan.cta}
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
