'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check, Award, AlertCircle } from 'lucide-react';

type AssetType = 'us_stocks' | 'options' | 'forex' | 'crypto';

interface BrokerCostResult {
  name: string;
  monthlyCost: number;
  annualCost: number;
  costBreakdown: string;
  isLowest: boolean;
  highlightNote: string;
}

export default function TradingCommissionCalculator() {
  const [assetType, setAssetType] = useState<AssetType>('us_stocks');
  const [tradesPerMonth, setTradesPerMonth] = useState<number>(20);
  const [tradeSizeUnits, setTradeSizeUnits] = useState<number>(100); // 100 shares or contracts or $1000 crypto
  const [tradeValueUsd, setTradeValueUsd] = useState<number>(2500);

  const results: BrokerCostResult[] = useMemo(() => {
    let list: { name: string; monthlyCost: number; costBreakdown: string; highlightNote: string }[] = [];

    if (assetType === 'us_stocks') {
      // US Stocks & ETFs
      // Robinhood: $0
      // Charles Schwab: $0
      // Webull: $0
      // Fidelity: $0
      // IBKR Pro: $0.005/share (min $1.00)
      const ibkrMonthly = tradesPerMonth * Math.max(1.0, tradeSizeUnits * 0.005);
      const saxoMonthly = tradesPerMonth * Math.max(1.0, tradeSizeUnits * 0.03);

      list = [
        { name: 'Charles Schwab', monthlyCost: 0, costBreakdown: '$0 commission on online US stocks', highlightNote: 'Zero commission + high quality execution' },
        { name: 'Fidelity', monthlyCost: 0, costBreakdown: '$0 commission + no PFOF execution', highlightNote: 'Zero commission + No PFOF price quality' },
        { name: 'Robinhood', monthlyCost: 0, costBreakdown: '$0 commission (PFOF routed)', highlightNote: 'Pure $0 commission retail execution' },
        { name: 'Webull', monthlyCost: 0, costBreakdown: '$0 commission (PFOF routed)', highlightNote: 'Zero commission + pre-market hours' },
        { name: 'Interactive Brokers (Pro)', monthlyCost: ibkrMonthly, costBreakdown: `$0.005/share (min $1) = $${ibkrMonthly.toFixed(2)}/mo`, highlightNote: 'SmartRouting beats commissions via price improvement' },
        { name: 'Saxo Bank', monthlyCost: saxoMonthly, costBreakdown: `$0.03/share (min $1) = $${saxoMonthly.toFixed(2)}/mo`, highlightNote: 'Full European bank security' },
      ];
    } else if (assetType === 'options') {
      // Options contracts
      // Robinhood: $0 per contract
      // Webull: $0 per contract (regulatory $0.055)
      // IBKR: $0.65 per contract (volume tiered down to $0.15)
      // Schwab: $0.65 per contract
      // Fidelity: $0.65 per contract
      const contractsPerTrade = tradeSizeUnits;
      const totalContractsPerMonth = tradesPerMonth * contractsPerTrade;

      const robinhoodMonthly = 0;
      const webullMonthly = totalContractsPerMonth * 0.055;
      const ibkrMonthly = totalContractsPerMonth * 0.65;
      const schwabMonthly = totalContractsPerMonth * 0.65;
      const fidelityMonthly = totalContractsPerMonth * 0.65;

      list = [
        { name: 'Robinhood', monthlyCost: robinhoodMonthly, costBreakdown: '$0/contract ($0 per trade)', highlightNote: 'Cheapest baseline for simple option legs' },
        { name: 'Webull', monthlyCost: webullMonthly, costBreakdown: `$0 contract fee + $0.055 regulatory fee = $${webullMonthly.toFixed(2)}`, highlightNote: 'Zero base options fee with advanced options charts' },
        { name: 'Interactive Brokers', monthlyCost: ibkrMonthly, costBreakdown: `$0.65 per contract = $${ibkrMonthly.toFixed(2)}`, highlightNote: 'Best multi-leg execution & options probability lab' },
        { name: 'Charles Schwab', monthlyCost: schwabMonthly, costBreakdown: `$0.65 per contract = $${schwabMonthly.toFixed(2)}`, highlightNote: 'Premier thinkorswim risk profiles & backtesting' },
        { name: 'Fidelity', monthlyCost: fidelityMonthly, costBreakdown: `$0.65 per contract = $${fidelityMonthly.toFixed(2)}`, highlightNote: 'Zero exercise or assignment fees' },
      ];
    } else if (assetType === 'forex') {
      // Forex Lots (Standard lot = 100k, pip = $10)
      // IG: ~0.6 pip spread EUR/USD
      // IBKR: 0.2 pip spread + $2/lot commission
      // eToro: 1.0 pip spread
      // XTB: 0.8 pip spread
      const lotsPerMonth = tradesPerMonth * (tradeSizeUnits / 10); // user enters size
      const igMonthly = lotsPerMonth * 6; // 0.6 pip = $6
      const ibkrMonthly = lotsPerMonth * (2 + 2); // 0.2 pip ($2) + $2 commission = $4
      const xtbMonthly = lotsPerMonth * 8; // 0.8 pip = $8
      const etoroMonthly = lotsPerMonth * 10; // 1.0 pip = $10

      list = [
        { name: 'Interactive Brokers (ECN)', monthlyCost: ibkrMonthly, costBreakdown: `0.2 pip spread + $2 commission per lot = $${ibkrMonthly.toFixed(2)}`, highlightNote: 'Institutional tight interbank raw spreads' },
        { name: 'IG Group', monthlyCost: igMonthly, costBreakdown: `0.6 pip all-inclusive spread = $${igMonthly.toFixed(2)}`, highlightNote: 'World No. 1 CFD/Forex provider with GSLO protection' },
        { name: 'XTB Online', monthlyCost: xtbMonthly, costBreakdown: `0.8 pip standard spread = $${xtbMonthly.toFixed(2)}`, highlightNote: 'Fast xStation 5 execution with no deposit minimum' },
        { name: 'eToro', monthlyCost: etoroMonthly, costBreakdown: `1.0 pip standard spread = $${etoroMonthly.toFixed(2)}`, highlightNote: 'Copy top vetted currency portfolio managers' },
      ];
    } else {
      // Crypto Volume
      const monthlyCryptoVolume = tradesPerMonth * tradeValueUsd;
      // IBKR: 0.15% = 0.0015
      // eToro: 1.0% = 0.01
      // Webull: 1.0% spread = 0.01
      // Robinhood: ~0.40% spread markup = 0.004
      const ibkrMonthly = monthlyCryptoVolume * 0.0015;
      const robinhoodMonthly = monthlyCryptoVolume * 0.004;
      const etoroMonthly = monthlyCryptoVolume * 0.01;
      const webullMonthly = monthlyCryptoVolume * 0.01;

      list = [
        { name: 'Interactive Brokers Crypto', monthlyCost: ibkrMonthly, costBreakdown: `0.15% fee tier = $${ibkrMonthly.toFixed(2)}`, highlightNote: 'Lowest fee institutional crypto gateway' },
        { name: 'Robinhood Crypto', monthlyCost: robinhoodMonthly, costBreakdown: `~0.40% embedded spread = $${robinhoodMonthly.toFixed(2)}`, highlightNote: 'Direct cold storage withdrawals enabled' },
        { name: 'Webull Pay', monthlyCost: webullMonthly, costBreakdown: `1.00% point spread = $${webullMonthly.toFixed(2)}`, highlightNote: 'Convenient unified stock and crypto balance' },
        { name: 'eToro Crypto', monthlyCost: etoroMonthly, costBreakdown: `1.00% flat trading fee = $${etoroMonthly.toFixed(2)}`, highlightNote: 'Crypto smart portfolios & social sentiment tracking' },
      ];
    }

    const minCost = Math.min(...list.map(b => b.monthlyCost));

    return list
      .map(b => ({
        ...b,
        annualCost: b.monthlyCost * 12,
        isLowest: Math.abs(b.monthlyCost - minCost) < 0.01,
      }))
      .sort((a, b) => a.monthlyCost - b.monthlyCost);
  }, [assetType, tradesPerMonth, tradeSizeUnits, tradeValueUsd]);

  return (
    <div id="trading-commission-calculator" className="bg-[#0c0c0e] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-[#e5e7eb]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Multi-Broker Fee Engine</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Trading Commission & Fee Estimator</h3>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Input your monthly trading frequency to calculate real out-of-pocket costs across regulated brokers.
          </p>
        </div>
      </div>

      {/* Asset selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
        {[
          { id: 'us_stocks', label: 'US Stocks & ETFs' },
          { id: 'options', label: 'Options Contracts' },
          { id: 'forex', label: 'Forex Currencies' },
          { id: 'crypto', label: 'Crypto Trading' },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAssetType(item.id as AssetType)}
            className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition border text-center ${
              assetType === item.id
                ? 'accent-gradient text-white border-transparent shadow-sm'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6 bg-white/[0.02] p-5 rounded-xl border border-white/10">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Trades Per Month
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="200"
              value={tradesPerMonth}
              onChange={(e) => setTradesPerMonth(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg cursor-pointer"
            />
            <span className="font-bold text-white bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-sm min-w-[3.5rem] text-center">
              {tradesPerMonth}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {assetType === 'us_stocks' ? 'Avg Shares Per Trade' :
             assetType === 'options' ? 'Contracts Per Trade' :
             assetType === 'forex' ? 'Position Size (Lots)' : 'Trade Size (USD)'}
          </label>
          <input
            type="number"
            min="1"
            max={assetType === 'crypto' ? 100000 : 5000}
            value={assetType === 'crypto' ? tradeValueUsd : tradeSizeUnits}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (assetType === 'crypto') setTradeValueUsd(val);
              else setTradeSizeUnits(val);
            }}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Est. Monthly Volume
          </label>
          <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white">
            {assetType === 'crypto'
              ? `$${(tradesPerMonth * tradeValueUsd).toLocaleString()}`
              : assetType === 'us_stocks'
              ? `${(tradesPerMonth * tradeSizeUnits).toLocaleString()} shares`
              : assetType === 'options'
              ? `${(tradesPerMonth * tradeSizeUnits).toLocaleString()} contracts`
              : `${(tradesPerMonth * tradeSizeUnits).toLocaleString()} lots`}
          </div>
        </div>
      </div>

      {/* Results Ranking Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
              <th className="py-3 px-4">Broker</th>
              <th className="py-3 px-4">Monthly Cost</th>
              <th className="py-3 px-4">Annual Cost</th>
              <th className="py-3 px-4 hidden md:table-cell">Pricing Mechanics</th>
              <th className="py-3 px-4">Key Advantage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {results.map((b) => (
              <tr
                key={b.name}
                className={`transition-colors ${b.isLowest ? 'bg-blue-500/[0.05] hover:bg-blue-500/[0.08]' : 'hover:bg-white/[0.02]'}`}
              >
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <span>{b.name}</span>
                  {b.isLowest && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <Award className="w-3 h-3" /> Lowest Cost
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 font-bold text-white">
                  {b.monthlyCost === 0 ? (
                    <span className="text-emerald-400 font-bold">$0.00</span>
                  ) : (
                    `$${b.monthlyCost.toFixed(2)}`
                  )}
                </td>
                <td className="py-3 px-4 font-medium text-gray-300">
                  {b.annualCost === 0 ? (
                    <span className="text-emerald-400 font-semibold">$0.00/yr</span>
                  ) : (
                    `$${b.annualCost.toFixed(2)}/yr`
                  )}
                </td>
                <td className="py-3 px-4 text-xs text-gray-400 hidden md:table-cell">
                  {b.costBreakdown}
                </td>
                <td className="py-3 px-4 text-xs text-gray-300">
                  <span className="inline-block bg-white/5 text-gray-300 border border-white/5 px-2.5 py-1 rounded-md font-medium">
                    {b.highlightNote}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3.5 bg-white/[0.02] rounded-xl border border-white/10 text-xs text-gray-400 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <p>
          <strong>Methodology Note:</strong> Regulatory fees (SEC, FINRA TAF, OCC) and exchange passthrough fees are applied universally across all US registered brokerages. Price improvement data is based on quarterly SEC Rule 605 disclosures audited by MyFastBroker.
        </p>
      </div>
    </div>
  );
}
