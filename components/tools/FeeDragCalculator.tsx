'use client';

import React, { useState, useMemo } from 'react';
import { TrendingDown, ShieldAlert, DollarSign, Calendar, Percent, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FeeDragCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(25);
  const [annualReturn, setAnnualReturn] = useState<number>(8.0);
  const [brokerFeePercent, setBrokerFeePercent] = useState<number>(0.75); // e.g. 0.75% combined fee/drag

  // Calculate compound growth with and without fee
  const calculation = useMemo(() => {
    const rClean = annualReturn / 100 / 12;
    const rFee = Math.max(0, (annualReturn - brokerFeePercent) / 100 / 12);
    const months = years * 12;

    let balanceClean = initialDeposit;
    let balanceFee = initialDeposit;
    let totalContributed = initialDeposit;

    const yearlyData = [];

    for (let m = 1; m <= months; m++) {
      balanceClean = balanceClean * (1 + rClean) + monthlyContribution;
      balanceFee = balanceFee * (1 + rFee) + monthlyContribution;
      totalContributed += monthlyContribution;

      if (m % 12 === 0 || m === months) {
        const yr = Math.round(m / 12);
        yearlyData.push({
          year: yr,
          balanceClean: Math.round(balanceClean),
          balanceFee: Math.round(balanceFee),
          lostToFees: Math.round(balanceClean - balanceFee),
          contributions: Math.round(totalContributed)
        });
      }
    }

    const finalClean = Math.round(balanceClean);
    const finalWithFee = Math.round(balanceFee);
    const totalLost = finalClean - finalWithFee;
    const percentLost = finalClean > 0 ? ((totalLost / finalClean) * 100).toFixed(1) : '0';

    return {
      finalClean,
      finalWithFee,
      totalLost,
      percentLost,
      totalContributed: Math.round(totalContributed),
      yearlyData
    };
  }, [initialDeposit, monthlyContribution, years, annualReturn, brokerFeePercent]);

  return (
    <div id="fee-drag-calculator" className="bg-[#0c0c0e] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-[#e5e7eb]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-2">
            <span>Verified Mathematical Model</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Broker Fee Drag & Compounding Calculator</h3>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            See how hidden spreads, expense ratios, and advisory commissions silently erode your wealth over time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Sliders and Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex justify-between items-center text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-blue-400" /> Initial Investment
              </span>
              <span className="font-semibold text-white bg-white/5 border border-white/10 px-3 py-1 rounded-md text-base">
                ${initialDeposit.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$1,000</span>
              <span>$100,000</span>
              <span>$200,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-sm font-medium text-gray-300 mb-2">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-blue-400" /> Monthly Contribution
              </span>
              <span className="font-semibold text-white bg-white/5 border border-white/10 px-3 py-1 rounded-md text-base">
                ${monthlyContribution.toLocaleString()}/mo
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$2,500</span>
              <span>$5,000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Time Horizon
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={years}
                  onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value))))}
                  className="w-full pl-3 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-medium">yrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Annual Return
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="25"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full pl-3 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-medium">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                Broker Fee Drag
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="5"
                  value={brokerFeePercent}
                  onChange={(e) => setBrokerFeePercent(Number(e.target.value))}
                  className="w-full pl-3 pr-8 py-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-sm font-semibold text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-rose-400 font-medium">%</span>
              </div>
            </div>
          </div>

          {/* Quick preset pills */}
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/10">
            <span className="text-xs font-semibold text-gray-400 block mb-2">Quick Fee Benchmarks:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBrokerFeePercent(0.05)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                  brokerFeePercent === 0.05
                    ? 'accent-gradient text-white border-transparent'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                Direct Index Broker (0.05%)
              </button>
              <button
                type="button"
                onClick={() => setBrokerFeePercent(0.40)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                  brokerFeePercent === 0.40
                    ? 'accent-gradient text-white border-transparent'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                Robo-Advisor (0.40%)
              </button>
              <button
                type="button"
                onClick={() => setBrokerFeePercent(1.10)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                  brokerFeePercent === 1.10
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                Traditional Wealth Broker (1.10%)
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#080809] border border-white/10 text-white rounded-xl p-6 sm:p-7 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-3 border-b border-white/10">
              <span className="font-semibold uppercase tracking-wider">Over {years} Years Outlook</span>
              <span className="text-blue-400 font-mono font-bold">Total Saved: ${calculation.totalLost.toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-400 block">Potential Portfolio with Low-Fee Broker (0% drag)</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">
                  ${calculation.finalClean.toLocaleString()}
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 block">Portfolio with {brokerFeePercent}% Annual Broker Drag</span>
                <div className="text-2xl sm:text-3xl font-bold text-gray-200 mt-1">
                  ${calculation.finalWithFee.toLocaleString()}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-rose-200">
                      Total Lost to Broker Fees: <span className="text-rose-400 text-base font-bold">${calculation.totalLost.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-rose-300/80 mt-1">
                      A seemingly small {brokerFeePercent}% fee forfeits <strong className="text-rose-200 font-bold">{calculation.percentLost}%</strong> of your total compound returns over {years} years!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-gray-400 space-y-2">
            <div className="flex justify-between">
              <span>Your Total Out-of-Pocket Deposits:</span>
              <span className="font-semibold text-white">${calculation.totalContributed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Gross Investment Earnings (No Fee):</span>
              <span className="font-semibold text-emerald-400">
                +${Math.max(0, calculation.finalClean - calculation.totalContributed).toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 pt-2 italic">
              *Compounded monthly at {annualReturn}% annual gross return. Switching to a low-fee broker verified on MyFastBroker preserves your capital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
