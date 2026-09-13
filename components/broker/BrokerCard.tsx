'use client';

import React from 'react';
import { Broker, getBrokerUrl } from '@/data/brokers';
import { Star, ShieldCheck, Scale, ArrowRight, Check, Award, ArrowUpRight } from 'lucide-react';

interface BrokerCardProps {
  broker: Broker;
  onViewDetails: (broker: Broker) => void;
  onToggleCompare: (broker: Broker) => void;
  isCompared: boolean;
}

export default function BrokerCard({
  broker,
  onViewDetails,
  onToggleCompare,
  isCompared,
}: BrokerCardProps) {
  return (
    <div
      id={`broker-card-${broker.id}`}
      className="bg-[#0c0c0e] rounded-2xl border border-white/10 hover:border-blue-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-blue-500/10"
    >
      <div>
        {/* Top badge & header */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            {broker.featuredBadge ? (
              <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25">
                {broker.featuredBadge}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                Regulated Broker
              </span>
            )}

            <button
              type="button"
              onClick={() => onToggleCompare(broker)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition ${
                isCompared
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                {broker.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {broker.tagline}
              </p>
            </div>

            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-white">{broker.rating.toFixed(1)}</span>
              </div>
              <span className="text-[10px] text-gray-500 mt-1">({broker.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 px-5 py-3 bg-white/[0.02] border-y border-white/5 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">US Stocks</span>
            <span className="text-xs font-bold text-emerald-400 block truncate mt-0.5">
              {broker.stockCommissionUS.includes('$0') ? 'Zero $0' : broker.stockCommissionUS.split('/')[0]}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">Min Deposit</span>
            <span className="text-xs font-bold text-white block mt-0.5">
              ${broker.minDeposit}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">Margin Loan</span>
            <span className="text-xs font-bold text-gray-200 block truncate mt-0.5">
              {broker.marginRateEst.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Pros summary */}
        <div className="p-5 pt-3 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
            Top Advantages:
          </span>
          {broker.pros.slice(0, 2).map((pro, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-300">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{pro}</span>
            </div>
          ))}
        </div>

        {/* Regulation badges */}
        <div className="px-5 pb-3 flex flex-wrap gap-1">
          {broker.regulations.slice(0, 4).map((reg) => (
            <span
              key={reg}
              className="text-[10px] font-semibold text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
            >
              {reg}
            </span>
          ))}
          {broker.regulations.length > 4 && (
            <span className="text-[10px] font-semibold text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
              +{broker.regulations.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 px-5 bg-white/[0.02] border-t border-white/5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewDetails(broker)}
          className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
        >
          <span>Full Review</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
        </button>

        <a
          href={getBrokerUrl(broker)}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-3 accent-gradient hover:opacity-90 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-md shadow-blue-500/20"
        >
          <span>Visit</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
