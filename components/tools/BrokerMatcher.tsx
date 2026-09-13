'use client';

import React, { useState } from 'react';
import { BROKERS_DATA, Broker } from '@/data/brokers';
import { CheckCircle, Sparkles, ArrowRight, RotateCcw, Award, Star, ExternalLink } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    preferredCategories: string[];
    preferredBrokers: string[];
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'asset',
    title: 'What primary asset class do you intend to trade or invest in?',
    subtitle: 'This filters platforms specifically engineered for your instrument type.',
    options: [
      {
        id: 'stocks_us',
        label: 'US Stocks, Fractional Shares & ETFs',
        description: 'Zero commission, long-term wealth building, and broad market index funds.',
        preferredCategories: ['stocks', 'etfs', 'zero_commission'],
        preferredBrokers: ['charles-schwab', 'fidelity', 'robinhood', 'vanguard']
      },
      {
        id: 'options_derivatives',
        label: 'Options & Advanced Derivatives',
        description: 'Multi-leg spreads, options volatility analysis, and low per-contract costs.',
        preferredCategories: ['options'],
        preferredBrokers: ['charles-schwab', 'ibkr', 'webull']
      },
      {
        id: 'forex_cfds',
        label: 'Forex Currencies & Global CFDs',
        description: 'EUR/USD, gold, indices, leverage, and algorithmic MT4/xStation trading.',
        preferredCategories: ['forex', 'high_leverage'],
        preferredBrokers: ['ig-group', 'xtb', 'saxo-bank']
      },
      {
        id: 'crypto_social',
        label: 'Crypto & Social Copy Trading',
        description: 'Mirror top vetted traders and trade both spot digital assets and equities.',
        preferredCategories: ['crypto', 'beginner_friendly'],
        preferredBrokers: ['etoro', 'robinhood', 'webull']
      }
    ]
  },
  {
    id: 'experience',
    title: 'What is your current trading & market experience level?',
    subtitle: 'Ensures the platform interface matches your technical comfort zone.',
    options: [
      {
        id: 'beginner',
        label: 'Beginner / Casual Investor',
        description: 'I need an intuitive interface, educational resources, and zero clutter.',
        preferredCategories: ['beginner_friendly', 'zero_commission'],
        preferredBrokers: ['fidelity', 'robinhood', 'etoro', 'vanguard']
      },
      {
        id: 'intermediate',
        label: 'Intermediate Self-Directed Trader',
        description: 'I manage my own portfolio, use basic technical indicators, and value competitive pricing.',
        preferredCategories: ['stocks', 'options'],
        preferredBrokers: ['charles-schwab', 'webull', 'xtb']
      },
      {
        id: 'advanced',
        label: 'Active Pro / Day Trader / Quant',
        description: 'I demand Direct Market Access (DMA), sub-second execution, API access, and low margin rates.',
        preferredCategories: ['high_leverage', 'options'],
        preferredBrokers: ['ibkr', 'saxo-bank', 'ig-group']
      }
    ]
  },
  {
    id: 'capital',
    title: 'What is your anticipated initial deposit or trading balance?',
    subtitle: 'Matches account minimum tiers and optimal volume pricing structures.',
    options: [
      {
        id: 'under_1k',
        label: 'Under $1,000 (Starting Small)',
        description: 'I want $0 account minimums and fractional share investing from $1.',
        preferredCategories: ['zero_commission', 'beginner_friendly'],
        preferredBrokers: ['robinhood', 'fidelity', 'etoro', 'webull']
      },
      {
        id: '1k_25k',
        label: '$1,000 to $25,000',
        description: 'A solid foundation looking for good price improvement and no hidden fees.',
        preferredCategories: ['stocks', 'etfs'],
        preferredBrokers: ['charles-schwab', 'fidelity', 'xtb', 'ibkr']
      },
      {
        id: 'over_25k',
        label: '$25,000+ (Portfolio Margin Eligible)',
        description: 'I care deeply about margin loan interest rates, yield on uninvested cash, and private client service.',
        preferredCategories: ['options', 'stocks'],
        preferredBrokers: ['ibkr', 'charles-schwab', 'saxo-bank']
      }
    ]
  },
  {
    id: 'priority',
    title: 'What is your single highest priority in a brokerage?',
    subtitle: 'Our algorithm gives this criterion the heaviest weighting.',
    options: [
      {
        id: 'lowest_fees',
        label: 'Absolute Lowest Overall Fees & Margin Rates',
        description: 'Keep transaction costs and borrowing rates at rock-bottom levels.',
        preferredCategories: ['zero_commission'],
        preferredBrokers: ['ibkr', 'robinhood', 'xtb']
      },
      {
        id: 'best_tools',
        label: 'Institutional Charting & Execution Software',
        description: 'Multi-screen desktop software, Level 2 depth, and algorithmic routing.',
        preferredCategories: ['options', 'high_leverage'],
        preferredBrokers: ['charles-schwab', 'ibkr', 'ig-group', 'webull']
      },
      {
        id: 'safety_reputation',
        label: 'Heritage, Bank-Grade Safety & Customer Support',
        description: 'Decades in business, multi-jurisdiction regulation, and 24/7 human phone support.',
        preferredCategories: ['stocks'],
        preferredBrokers: ['fidelity', 'charles-schwab', 'saxo-bank', 'vanguard']
      }
    ]
  }
];

export default function BrokerMatcher({ onSelectBroker }: { onSelectBroker?: (broker: Broker) => void }) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Score brokers based on selected answers
  const matchedBrokers = React.useMemo(() => {
    if (!isCompleted) return [];

    const scores: Record<string, number> = {};
    BROKERS_DATA.forEach(b => {
      scores[b.id] = 50; // base score
    });

    QUESTIONS.forEach(q => {
      const selectedOptionId = answers[q.id];
      if (!selectedOptionId) return;

      const opt = q.options.find(o => o.id === selectedOptionId);
      if (!opt) return;

      // Heavy weighting for preferred brokers
      opt.preferredBrokers.forEach(bid => {
        if (scores[bid] !== undefined) {
          scores[bid] += q.id === 'priority' ? 25 : 15;
        }
      });

      // Category matching
      BROKERS_DATA.forEach(b => {
        const matchesCategory = opt.preferredCategories.some(c => b.categories.includes(c as any));
        if (matchesCategory) {
          scores[b.id] += 8;
        }
      });
    });

    // Normalize to percentage (max ~98%)
    const sorted = Object.entries(scores)
      .map(([id, rawScore]) => {
        const broker = BROKERS_DATA.find(b => b.id === id)!;
        const matchScore = Math.min(99, Math.max(68, Math.round(rawScore * 0.95)));
        return { broker, matchScore };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    return sorted.slice(0, 3);
  }, [answers, isCompleted]);

  const activeQuestion = QUESTIONS[currentStep];

  return (
    <div id="broker-matcher" className="bg-[#0c0c0e] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-[#e5e7eb]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Match Engine</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Find My Best Broker: 60-Second Matcher</h3>
          <p className="text-sm text-gray-400 mt-1">
            Answer 4 quick questions to receive personalized platform recommendations tailored to your goals.
          </p>
        </div>

        {isCompleted && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
          </button>
        )}
      </div>

      {!isCompleted ? (
        <div className="mt-6">
          {/* Progress Tracker */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-3">
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="accent-gradient h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="mb-6">
            <h4 className="text-lg sm:text-xl font-bold text-white">{activeQuestion.title}</h4>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">{activeQuestion.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeQuestion.options.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(activeQuestion.id, option.id)}
                className="text-left p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-blue-500/60 hover:bg-white/5 transition group relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {option.label}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition">
                  <span>Select & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-5 flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-bold text-white">We found your top 3 brokerage matches!</h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Based on your profile, asset selection, and cost preferences, these platforms offer the optimal balance of execution quality and low fees.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedBrokers.map((item, index) => (
              <div
                key={item.broker.id}
                className={`rounded-xl border p-5 flex flex-col justify-between relative ${
                  index === 0
                    ? 'border-blue-500/60 ring-2 ring-blue-500/20 bg-blue-500/[0.04]'
                    : 'border-white/10 bg-[#080809]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                      #{index + 1} Best Match ({item.matchScore}%)
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.broker.rating}</span>
                    </div>
                  </div>

                  <h5 className="text-lg font-bold text-white">{item.broker.name}</h5>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.broker.tagline}</p>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">US Stocks:</span>
                      <span className="font-semibold text-white">{item.broker.stockCommissionUS}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min. Deposit:</span>
                      <span className="font-semibold text-white">${item.broker.minDeposit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Margin Est:</span>
                      <span className="font-semibold text-white">{item.broker.marginRateEst}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectBroker && onSelectBroker(item.broker)}
                    className="w-full py-2 px-3 accent-gradient hover:opacity-90 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <span>View Full Review & Fees</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
