'use client';

import React, { useState, useMemo } from 'react';
import { Percent, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function MarginRiskCalculator() {
  const [instrumentType, setInstrumentType] = useState<'forex' | 'stock'>('stock');
  const [stockPrice, setStockPrice] = useState<number>(150);
  const [stockShares, setStockShares] = useState<number>(100);
  const [cashDeposit, setCashDeposit] = useState<number>(7500);
  const [maintenanceMarginReq, setMaintenanceMarginReq] = useState<number>(25); // 25% FINRA standard

  // Forex state
  const [currencyPair, setCurrencyPair] = useState<string>('EUR/USD');
  const [lotSize, setLotSize] = useState<number>(1.0); // 1.0 standard lot = 100,000 units
  const [leverage, setLeverage] = useState<number>(30); // 1:30 EU/UK retail
  const [stopLossPips, setStopLossPips] = useState<number>(35);

  const stockCalculation = useMemo(() => {
    const totalPositionValue = stockPrice * stockShares;
    const marginBorrowed = Math.max(0, totalPositionValue - cashDeposit);
    const initialLeverageRatio = cashDeposit > 0 ? (totalPositionValue / cashDeposit).toFixed(2) : '1.0';

    // Liquidation Price Formula:
    // Equity = Value - Loan
    // Maintenance Margin = Value * (maintenanceReq / 100)
    // Value * (1 - maintenanceReq / 100) = Loan
    // Liquidation Price = Loan / (Shares * (1 - maintenanceReq / 100))
    const mmRatio = maintenanceMarginReq / 100;
    let liquidationPrice = 0;
    if (stockShares > 0 && 1 - mmRatio > 0 && marginBorrowed > 0) {
      liquidationPrice = marginBorrowed / (stockShares * (1 - mmRatio));
    }

    const dropToMarginCall = stockPrice > 0 && liquidationPrice > 0
      ? (((stockPrice - liquidationPrice) / stockPrice) * 100).toFixed(1)
      : '0';

    return {
      totalPositionValue,
      marginBorrowed,
      initialLeverageRatio,
      liquidationPrice: Math.max(0, liquidationPrice),
      dropToMarginCall,
      isMarginUsed: marginBorrowed > 0
    };
  }, [stockPrice, stockShares, cashDeposit, maintenanceMarginReq]);

  const forexCalculation = useMemo(() => {
    const units = lotSize * 100000;
    const pipValueUsd = lotSize * 10; // For EUR/USD, 1 standard lot = $10/pip
    const requiredMargin = units / leverage;
    const riskDollar = stopLossPips * pipValueUsd;

    return {
      units,
      pipValueUsd,
      requiredMargin: Math.round(requiredMargin),
      riskDollar: Math.round(riskDollar)
    };
  }, [lotSize, leverage, stopLossPips]);

  return (
    <div id="margin-risk-calculator" className="bg-[#0c0c0e] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-[#e5e7eb]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
            <Percent className="w-3.5 h-3.5" />
            <span>Risk Protection Tool</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Margin & Liquidation Threshold Calculator</h3>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Calculate your exact margin borrowing requirements, cushion against margin calls, and pip risk.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 my-6">
        <button
          type="button"
          onClick={() => setInstrumentType('stock')}
          className={`py-2 px-4 rounded-xl text-sm font-semibold transition border ${
            instrumentType === 'stock'
              ? 'accent-gradient text-white border-transparent shadow-sm'
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
          }`}
        >
          Stock Margin & Liquidation Price
        </button>
        <button
          type="button"
          onClick={() => setInstrumentType('forex')}
          className={`py-2 px-4 rounded-xl text-sm font-semibold transition border ${
            instrumentType === 'forex'
              ? 'accent-gradient text-white border-transparent shadow-sm'
              : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
          }`}
        >
          Forex Pip Value & Required Margin
        </button>
      </div>

      {instrumentType === 'stock' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Stock Share Price ($)
              </label>
              <input
                type="number"
                min="1"
                value={stockPrice}
                onChange={(e) => setStockPrice(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Number of Shares
              </label>
              <input
                type="number"
                min="1"
                value={stockShares}
                onChange={(e) => setStockShares(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Your Cash Equity ($)
              </label>
              <input
                type="number"
                min="0"
                value={cashDeposit}
                onChange={(e) => setCashDeposit(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Broker Maintenance Margin Requirement (%)
              </label>
              <div className="flex gap-2">
                {[25, 30, 35, 40].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setMaintenanceMarginReq(rate)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${
                      maintenanceMarginReq === rate
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {rate}% {rate === 25 ? '(FINRA Min)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#080809] border border-white/10 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4 pb-3 border-b border-white/10">
                Calculated Risk Metrics
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-gray-400">Total Position Value:</span>
                  <span className="text-base font-bold text-white">
                    ${stockCalculation.totalPositionValue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-gray-400">Margin Loan Borrowed:</span>
                  <span className="text-base font-bold text-amber-400">
                    ${stockCalculation.marginBorrowed.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-gray-400">Effective Leverage:</span>
                  <span className="text-base font-bold text-white">
                    {stockCalculation.initialLeverageRatio}x
                  </span>
                </div>

                {stockCalculation.isMarginUsed ? (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-4">
                    <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                      Forced Liquidation Trigger
                    </div>
                    <div className="text-3xl font-extrabold text-amber-400 mt-1">
                      ${stockCalculation.liquidationPrice.toFixed(2)} / share
                    </div>
                    <p className="text-xs text-amber-200/80 mt-2">
                      A drop of <strong className="text-amber-100 font-bold">{stockCalculation.dropToMarginCall}%</strong> in stock price will breach your {maintenanceMarginReq}% maintenance requirement and trigger auto-liquidation.
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4 text-emerald-300 text-xs">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
                    <strong>Fully Cash Funded:</strong> No borrowed margin. Zero risk of broker margin liquidation.
                  </div>
                )}
              </div>
            </div>

            <p className="text-[11px] text-gray-500 pt-4 border-t border-white/10 mt-6">
              *Brokers reserve the right to increase house maintenance requirements during market volatility without prior notice.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Currency Pair
              </label>
              <select
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EUR/USD" className="bg-[#0c0c0e] text-white">EUR/USD (Euro / US Dollar)</option>
                <option value="GBP/USD" className="bg-[#0c0c0e] text-white">GBP/USD (British Pound / US Dollar)</option>
                <option value="USD/JPY" className="bg-[#0c0c0e] text-white">USD/JPY (US Dollar / Japanese Yen)</option>
                <option value="AUD/USD" className="bg-[#0c0c0e] text-white">AUD/USD (Australian Dollar / US Dollar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Lot Size (1.0 = 100,000 units)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.01"
                value={lotSize}
                onChange={(e) => setLotSize(Math.max(0.01, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-500 mt-1 block">
                {lotSize >= 1 ? `${lotSize} Standard Lot (${(lotSize * 100000).toLocaleString()} base currency)` : `${lotSize} Mini/Micro Lot`}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Leverage Ratio
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '1:30 (EU/UK)', val: 30 },
                  { label: '1:50 (US)', val: 50 },
                  { label: '1:100 (Pro)', val: 100 },
                  { label: '1:200 (Pro)', val: 200 }
                ].map((lev) => (
                  <button
                    key={lev.val}
                    type="button"
                    onClick={() => setLeverage(lev.val)}
                    className={`text-xs py-2 px-2 rounded-lg border font-medium text-center transition ${
                      leverage === lev.val
                        ? 'accent-gradient text-white border-transparent'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lev.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Stop Loss Distance (Pips)
              </label>
              <input
                type="number"
                min="1"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#080809] border border-white/10 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4 pb-3 border-b border-white/10">
                Forex Risk Analysis ({currencyPair})
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-gray-400">Position Nominal Size:</span>
                  <span className="text-base font-bold text-white">
                    {forexCalculation.units.toLocaleString()} units
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-gray-400">Value of 1 Pip:</span>
                  <span className="text-base font-bold text-emerald-400">
                    ${forexCalculation.pipValueUsd.toFixed(2)} USD
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-gray-400">Required Margin Deposit (1:{leverage}):</span>
                  <span className="text-base font-bold text-amber-400">
                    ${forexCalculation.requiredMargin.toLocaleString()} USD
                  </span>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mt-4">
                  <div className="text-xs text-rose-300 font-semibold uppercase tracking-wider">
                    Total Capital at Risk
                  </div>
                  <div className="text-3xl font-extrabold text-rose-400 mt-1">
                    ${forexCalculation.riskDollar.toLocaleString()} USD
                  </div>
                  <p className="text-xs text-rose-200/80 mt-1">
                    If your {stopLossPips}-pip stop loss is hit, this exact dollar loss will be deducted from your account equity.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 pt-4 border-t border-white/10 mt-6">
              *Calculated with standard 4-digit/2-digit pip conventions for major currency crosses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
