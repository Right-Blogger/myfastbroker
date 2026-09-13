'use client';

import React from 'react';
import { ShieldCheck, Target, Award, Users, Scale, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import BrandLogo from '@/components/common/BrandLogo';

export default function AboutView({ onNavigate }: { onNavigate: (nav: string) => void }) {
  return (
    <div id="about-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in text-[#e5e7eb]">
      {/* Hero Banner */}
      <div className="bg-[#0c0c0e] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <span>Our Mission & Testing Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Empowering Investors to Compare Clear Truth, Eliminate Fees & Trade Securely
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Welcome to <strong>MyFastBroker</strong> (officially published at <strong className="text-white">myfastbroker.news</strong> and referenced across <strong className="text-white">myfastbroker.com</strong>). We were founded on a straightforward belief: every trader deserves honest, mathematical clarity regarding what their brokerage platform actually costs them.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center flex-shrink-0">
          <BrandLogo size={68} variant="badge" className="mb-3 shadow-xl" />
          <div className="text-base font-bold text-white flex items-center gap-1">
            <span>MyFastBroker</span>
            <span className="text-blue-500 font-extrabold">.news</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">Audited & Verified Platform</div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0c0c0e] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-lg space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">100% Independent Methodology</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            No broker can purchase a higher rating or manipulate their scorecard on MyFastBroker. If a platform operates with abusive spreads, slow withdrawals, or substandard execution, our reviews document it transparently.
          </p>
        </div>

        <div className="bg-[#0c0c0e] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-lg space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Rigorous Regulatory Verification</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            We confirm regulatory licenses directly against official statutory registers including the SEC, FINRA, FCA, ASIC, and BaFin. We never recommend unregulated or blacklisted offshore operators.
          </p>
        </div>

        <div className="bg-[#0c0c0e] rounded-2xl border border-white/10 p-6 sm:p-7 shadow-lg space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Real Mathematical Audits</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Rather than relying on marketing claims, our proprietary calculators model real compound fee drag, financing interest APRs, and execution slippage across thousands of trade scenarios.
          </p>
        </div>
      </div>

      {/* 100-Point Audit Process */}
      <div className="bg-[#0c0c0e] rounded-3xl border border-white/10 p-8 sm:p-10 shadow-lg space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
            Research Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How We Evaluate Brokers: The 100+ Data Point Scoring Engine
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl">
            Our analysts open real funded accounts to test order execution speeds, platform stability during market volatility, deposit and withdrawal latency, and responsive customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {[
            { title: 'Fee Transparency (25%)', desc: 'Commissions, stock spreads, options per-contract fees, margin loan borrowing rates, inactivity, and conversion costs.' },
            { title: 'Platform & Execution Quality (25%)', desc: 'Direct Market Access (DMA) vs PFOF routing, Level 2 order depth, execution speed, mobile reliability, and charting software.' },
            { title: 'Safety, Custody & Regulation (20%)', desc: 'Tier-1 regulatory standing, client fund segregation, SIPC/FSCS compensation schemes, and audited parent balance sheets.' },
            { title: 'Market Access & Instruments (15%)', desc: 'Availability of US & international equities, ETFs, options, spot and CFD forex, fixed income bonds, and digital assets.' },
            { title: 'Customer Support & Research (15%)', desc: 'Availability of 24/7 human telephone desks, responsiveness of live chat, proprietary analyst research, and educational webinars.' },
          ].map((item, index) => (
            <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="font-bold text-white block mb-1">{item.title}</span>
              <span className="text-gray-400">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout box */}
      <div className="p-8 rounded-3xl bg-[#080809] border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-bold">Have questions or want your platform audited?</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Our research and partnership team responds to all verified inquiries within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 accent-gradient hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap shadow-sm transition"
        >
          <span>Contact Our Team</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
