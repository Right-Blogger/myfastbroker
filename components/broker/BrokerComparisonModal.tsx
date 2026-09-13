'use client';

import React, { useState } from 'react';
import { Broker, getBrokerUrl } from '@/data/brokers';
import { X, Star, CheckCircle2, XCircle, ArrowUpRight, Printer, AlertCircle, Plus } from 'lucide-react';

interface BrokerComparisonModalProps {
  brokers: Broker[];
  onClose: () => void;
  onRemoveBroker: (brokerId: string) => void;
  onAddMore?: () => void;
}

export default function BrokerComparisonModal({
  brokers,
  onClose,
  onRemoveBroker,
  onAddMore
}: BrokerComparisonModalProps) {
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(true);

  if (brokers.length === 0) return null;

  const comparisonRows = [
    { category: 'Overview', label: 'Overall Rating', getVal: (b: Broker) => `${b.rating} / 5.0 (${b.reviewCount} reviews)` },
    { category: 'Overview', label: 'Best Suited For', getVal: (b: Broker) => b.bestFor },
    { category: 'Overview', label: 'Headquarters / Year', getVal: (b: Broker) => `${b.headquarters} (Est. ${b.yearFounded})` },
    
    { category: 'Trading Fees', label: 'US Stocks & ETFs', getVal: (b: Broker) => b.stockCommissionUS },
    { category: 'Trading Fees', label: 'European Stocks', getVal: (b: Broker) => b.stockCommissionEU },
    { category: 'Trading Fees', label: 'Options Contracts', getVal: (b: Broker) => b.optionsFeePerContract },
    { category: 'Trading Fees', label: 'EUR/USD Spread', getVal: (b: Broker) => b.forexSpreadEurUsd },
    { category: 'Trading Fees', label: 'Crypto Trading Fee', getVal: (b: Broker) => b.cryptoFee },
    
    { category: 'Financing & Minimums', label: 'Minimum Deposit', getVal: (b: Broker) => `$${b.minDeposit}` },
    { category: 'Financing & Minimums', label: 'Margin Interest APR', getVal: (b: Broker) => b.marginRateEst },
    { category: 'Financing & Minimums', label: 'Max Leverage', getVal: (b: Broker) => b.leverageMax },
    
    { category: 'Non-Trading Fees', label: 'Inactivity Fee', getVal: (b: Broker) => b.inactivityFee },
    { category: 'Non-Trading Fees', label: 'Withdrawal Fee', getVal: (b: Broker) => b.withdrawalFee },
    
    { category: 'Safety & Trust', label: 'Tier-1 Regulations', getVal: (b: Broker) => b.regulations.join(', ') },
    { category: 'Safety & Trust', label: 'Statutory Protection', getVal: (b: Broker) => b.investorProtection },
    { category: 'Safety & Trust', label: 'Execution Model', getVal: (b: Broker) => b.executionType },
    
    { category: 'Platforms & Tools', label: 'Available Platforms', getVal: (b: Broker) => b.platforms.join(', ') },
    { category: 'Platforms & Tools', label: 'Customer Support', getVal: (b: Broker) => b.customerSupport },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div
        className="bg-[#0c0c0e] w-full max-w-6xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative max-h-[92vh] flex flex-col text-[#e5e7eb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#080809] text-white flex items-center justify-between flex-shrink-0 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                Side-by-Side Matrix
              </span>
              <span className="text-xs text-gray-400">Comparing {brokers.length} Platforms</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Direct Broker Comparison</h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden sm:flex items-center gap-2 text-xs text-gray-300 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="accent-blue-500 rounded"
              />
              Highlight Differences
            </label>

            <button
              type="button"
              onClick={() => window.print()}
              className="text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 p-1.5 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sticky Broker Columns Header */}
        <div className="overflow-x-auto flex-1">
          <div className="min-w-[750px]">
            <div className="grid grid-cols-12 bg-[#080809] border-b border-white/10 sticky top-0 z-20 shadow-xs">
              <div className="col-span-3 p-4 font-bold text-xs uppercase tracking-wider text-gray-400 flex items-center justify-between">
                <span>Platform Parameters</span>
                {brokers.length < 4 && onAddMore && (
                  <button
                    type="button"
                    onClick={onAddMore}
                    className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30"
                  >
                    <Plus className="w-3 h-3" /> Add Broker
                  </button>
                )}
              </div>

              {brokers.map((broker) => (
                <div
                  key={broker.id}
                  className={`p-4 border-l border-white/10 relative ${
                    brokers.length === 2 ? 'col-span-4 sm:col-span-4' :
                    brokers.length === 3 ? 'col-span-3' : 'col-span-2'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onRemoveBroker(broker.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-rose-400 p-1 rounded-md transition"
                    title="Remove broker"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="text-sm sm:text-base font-bold text-white pr-5">{broker.name}</div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{broker.rating}</span>
                    <span className="text-gray-500 font-normal">({broker.reviewCount})</span>
                  </div>
                  <div className="mt-3">
                    <a
                      href={getBrokerUrl(broker)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white accent-gradient hover:opacity-90 px-2.5 py-1 rounded-lg shadow-sm transition"
                    >
                      <span>Visit Broker</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-white/5 text-xs sm:text-sm">
              {comparisonRows.map((row, index) => {
                const values = brokers.map((b) => row.getVal(b));
                const allSame = values.every((v) => v === values[0]);
                const isDiff = !allSame && highlightDifferences;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-12 transition-colors ${
                      isDiff ? 'bg-blue-500/[0.04] hover:bg-blue-500/[0.08]' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="col-span-3 p-3.5 sm:p-4 font-semibold text-gray-300 flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold text-gray-500">{row.category}</span>
                      <span className="text-white text-xs sm:text-sm">{row.label}</span>
                    </div>

                    {brokers.map((broker, bIdx) => (
                      <div
                        key={broker.id}
                        className={`p-3.5 sm:p-4 border-l border-white/5 flex items-center ${
                          brokers.length === 2 ? 'col-span-4 sm:col-span-4' :
                          brokers.length === 3 ? 'col-span-3' : 'col-span-2'
                        } ${bIdx === 0 && isDiff ? 'font-medium' : ''}`}
                      >
                        <span className="text-gray-200 leading-snug">
                          {row.getVal(broker)}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080809] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
          <span>*Data verified against active 2025/2026 fee filings on MyFastBroker.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg font-semibold transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
