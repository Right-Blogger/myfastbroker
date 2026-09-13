'use client';

import React, { useState } from 'react';
import { Broker, getBrokerUrl } from '@/data/brokers';
import { X, Star, ShieldCheck, CheckCircle2, XCircle, ArrowUpRight, Scale, Award, Info, Building, Globe, Layers } from 'lucide-react';

interface BrokerDetailModalProps {
  broker: Broker | null;
  onClose: () => void;
  onToggleCompare: (broker: Broker) => void;
  isCompared: boolean;
}

export default function BrokerDetailModal({
  broker,
  onClose,
  onToggleCompare,
  isCompared
}: BrokerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'safety' | 'platforms'>('overview');

  if (!broker) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-[#0c0c0e] w-full max-w-4xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative max-h-[90vh] flex flex-col text-[#e5e7eb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#080809] text-white p-6 sm:p-7 relative flex-shrink-0 border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition border border-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                  {broker.featuredBadge || 'Verified Broker Review'}
                </span>
                <span className="text-xs text-gray-400">Founded {broker.yearFounded} • {broker.headquarters}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{broker.name}</h2>
              <p className="text-sm text-gray-400 mt-1 max-w-xl">{broker.tagline}</p>
            </div>

            <div className="flex items-center sm:flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-xl font-black text-white">{broker.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">/ 5.0</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">({broker.reviewCount.toLocaleString()} trader reviews)</span>
            </div>
          </div>

          {/* Sub-ratings row */}
          <div className="grid grid-cols-5 gap-2 mt-6 pt-5 border-t border-white/10 text-center">
            <div>
              <span className="text-[11px] text-gray-400 block">Fees & Rates</span>
              <span className="text-sm font-bold text-blue-400">{broker.ratingBreakdown.fees}/5.0</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Platform</span>
              <span className="text-sm font-bold text-white">{broker.ratingBreakdown.platform}/5.0</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Safety & Reg</span>
              <span className="text-sm font-bold text-white">{broker.ratingBreakdown.safety}/5.0</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Research</span>
              <span className="text-sm font-bold text-white">{broker.ratingBreakdown.research}/5.0</span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Customer Care</span>
              <span className="text-sm font-bold text-white">{broker.ratingBreakdown.support}/5.0</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#080809] px-6 gap-2 sm:gap-6 flex-shrink-0 overflow-x-auto text-sm font-semibold">
          {[
            { id: 'overview', label: 'Overview & Verdict' },
            { id: 'fees', label: 'Fee Schedule' },
            { id: 'safety', label: 'Safety & Regulations' },
            { id: 'platforms', label: 'Platforms & Tools' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400 font-bold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">MyFastBroker Editorial Verdict</h4>
                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/10 text-sm text-gray-300 leading-relaxed">
                  {broker.detailedReview}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="bg-blue-500/[0.04] rounded-xl border border-blue-500/20 p-5">
                  <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Key Strengths & Advantages
                  </h4>
                  <ul className="space-y-2">
                    {broker.pros.map((pro, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 font-bold mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-rose-500/[0.04] rounded-xl border border-rose-500/20 p-5">
                  <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    Drawbacks & Considerations
                  </h4>
                  <ul className="space-y-2">
                    {broker.cons.map((con, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/10 text-xs">
                <div>
                  <span className="text-gray-400 block">Best Suited For:</span>
                  <span className="font-semibold text-white mt-0.5 block">{broker.bestFor}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Account Minimum:</span>
                  <span className="font-semibold text-white mt-0.5 block">${broker.minDeposit}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Execution Model:</span>
                  <span className="font-semibold text-white mt-0.5 block">{broker.executionType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Support Channels:</span>
                  <span className="font-semibold text-white mt-0.5 block">{broker.customerSupport}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Trading & Non-Trading Fee Schedule</h4>
              <div className="overflow-x-auto border border-white/10 rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Fee Category</th>
                      <th className="py-3 px-4">Cost / Rate</th>
                      <th className="py-3 px-4">Pricing Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">US Stocks & ETFs</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">{broker.stockCommissionUS}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Standard online executions</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">European / UK Equities</td>
                      <td className="py-3 px-4 font-medium text-gray-300">{broker.stockCommissionEU}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Local exchange fees may apply</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Options Contracts</td>
                      <td className="py-3 px-4 font-medium text-gray-300">{broker.optionsFeePerContract}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Per contract fee</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Forex Benchmark Spread (EUR/USD)</td>
                      <td className="py-3 px-4 font-medium text-gray-300">{broker.forexSpreadEurUsd}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Typical liquid session spread</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Cryptocurrency Trading</td>
                      <td className="py-3 px-4 font-medium text-gray-300">{broker.cryptoFee}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Spot crypto or crypto ETF</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Margin Loan Annual Rate</td>
                      <td className="py-3 px-4 font-bold text-amber-400">{broker.marginRateEst}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Tiered based on borrowed debit balance</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Inactivity Fee</td>
                      <td className="py-3 px-4 font-medium text-gray-300">{broker.inactivityFee}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Assessed on dormant balances</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-white">Withdrawal Fee</td>
                      <td className="py-3 px-4 font-medium text-gray-300">{broker.withdrawalFee}</td>
                      <td className="py-3 px-4 text-xs text-gray-400">Via wire, card or ACH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-white/[0.02] p-5 rounded-xl border border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Statutory Investor Compensation & Protection
                </h4>
                <p className="text-sm text-gray-300 font-medium">{broker.investorProtection}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Licensed Regulatory Authorities</h4>
                <div className="flex flex-wrap gap-2">
                  {broker.regulations.map((reg) => (
                    <span
                      key={reg}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      {reg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                  <span className="text-gray-400 font-semibold block mb-1">Max Leverage Limits:</span>
                  <span className="font-bold text-white">{broker.leverageMax}</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                  <span className="text-gray-400 font-semibold block mb-1">Client Fund Segregation:</span>
                  <span className="font-bold text-emerald-400">100% Segregated at Tier-1 Custodian Banks</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Supported Platforms & Interfaces</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {broker.platforms.map((platform) => (
                    <div key={platform} className="p-3.5 bg-white/[0.02] border border-white/10 rounded-xl flex items-center gap-3">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-semibold text-white">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Deposit & Funding Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {broker.depositMethods.map((method) => (
                    <span key={method} className="px-3 py-1 bg-white/5 text-gray-300 rounded-md text-xs font-medium border border-white/5">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#080809] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => onToggleCompare(broker)}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition ${
              isCompared
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isCompared ? 'Remove from Comparison' : 'Add to Side-by-Side Compare'}</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition"
            >
              Close
            </button>
            <a
              href={getBrokerUrl(broker)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 accent-gradient hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition"
            >
              <span>Visit {broker.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
