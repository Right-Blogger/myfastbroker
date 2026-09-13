'use client';

import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowUpRight, Scale, Lock, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '@/components/common/BrandLogo';

interface FooterProps {
  onNavigate: (nav: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer' | 'advertiser') => void;
}

export default function Footer({ onNavigate, onOpenLegal }: FooterProps) {
  return (
    <footer className="bg-[#080809] text-gray-400 border-t border-white/10 text-xs leading-relaxed">
      {/* Upper Footer: Directory & Brand Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
              <BrandLogo size="md" variant="badge" />
              <span className="text-xl font-bold text-white tracking-tight">
                MyFastBroker<span className="text-blue-500 font-extrabold">.news</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              <strong>MyFastBroker</strong> (operating across <strong className="text-gray-200">myfastbroker.news</strong> and referenced online as <strong className="text-gray-200">myfastbroker.com</strong>) is an independent financial comparison platform. We empower retail and institutional traders to compare brokers, audit hidden fees, verify regulatory compliance, and invest with uncompromising confidence.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Direct Inquiries & Partnerships:
              </span>
              <a
                href="mailto:collab.topagency@gmail.com"
                className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>collab.topagency@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Compare By Asset Class</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="hover:text-blue-400 transition"
                >
                  Best Online Stock Brokers (US & Global)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="hover:text-blue-400 transition"
                >
                  Zero-Commission Trading Platforms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="hover:text-blue-400 transition"
                >
                  Regulated Forex & CFD Providers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="hover:text-blue-400 transition"
                >
                  Options & Multi-Leg Derivatives Brokers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="hover:text-blue-400 transition"
                >
                  Cryptocurrency & Social Copy Trading
                </button>
              </li>
            </ul>
          </div>

          {/* Calculators & Tools */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Interactive Calculators</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog/" className="hover:text-blue-400 transition">
                  MyFastBroker Blog
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculators')}
                  className="hover:text-blue-400 transition"
                >
                  Broker Fee Drag & Compounding Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculators')}
                  className="hover:text-blue-400 transition"
                >
                  Trading Commission & Volume Estimator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculators')}
                  className="hover:text-blue-400 transition"
                >
                  Margin Liquidation Threshold & Pip Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('calculators')}
                  className="hover:text-blue-400 transition"
                >
                  60-Second &ldquo;Find My Broker&rdquo; Matcher
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('news')}
                  className="hover:text-blue-400 transition"
                >
                  2025 Due Diligence Safety Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Editorial */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition"
                >
                  About MyFastBroker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-400 transition"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-blue-400 transition"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-blue-400 transition"
                >
                  Risk Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('advertiser')}
                  className="hover:text-blue-400 transition"
                >
                  Advertiser Disclosure
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Natural Keyword Context Section */}
        <div className="mt-10 pt-8 border-t border-white/5 text-[11px] text-gray-500 space-y-2">
          <p>
            Whether searching for <strong className="text-gray-300">myfastbroker</strong>, visiting <strong className="text-gray-300">myfastbroker.com</strong>, finding recommendations on <strong className="text-gray-300">myfast broker.com</strong>, or exploring editorial fee breakdowns on <strong className="text-gray-300">my fastbroker.com</strong> (officially published at <strong className="text-gray-300">myfastbroker.news</strong>), our editorial mission remains strictly focused on unbiased financial transparency. We analyze Tier-1 regulators (SEC, FINRA, FCA, ASIC, BaFin, CySEC) to safeguard your capital.
          </p>
        </div>

        {/* Regulatory & Risk Disclaimers */}
        <div className="mt-6 pt-6 border-t border-white/5 bg-white/[0.02] p-4 rounded-xl border border-white/5 text-[11px] text-gray-400 leading-relaxed">
          <div className="flex items-start gap-2 text-amber-400 font-semibold mb-1">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>High Risk Investment & Derivative Disclosure</span>
          </div>
          <p>
            Trading financial instruments—including equities, options, futures, spot foreign exchange (Forex), and Contracts for Difference (CFDs)—carries a high level of risk and may not be suitable for all investors. Leveraged products like CFDs can result in losses exceeding your initial investment. Between 74% and 89% of retail investor accounts lose money when trading CFDs with regulated providers.
          </p>
          <p className="mt-2">
            The information contained on MyFastBroker (myfastbroker.news) is for informational and educational purposes only and does not constitute financial, investment, legal, or tax advice. Always consult with a licensed fiduciary financial advisor before making investment decisions.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <div>
            © {new Date().getFullYear()} MyFastBroker.news. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => onOpenLegal('privacy')} className="hover:text-gray-300">
              Privacy Policy
            </button>
            <span>•</span>
            <button type="button" onClick={() => onOpenLegal('terms')} className="hover:text-gray-300">
              Terms of Service
            </button>
            <span>•</span>
            <button type="button" onClick={() => onOpenLegal('disclaimer')} className="hover:text-gray-300">
              Risk Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
