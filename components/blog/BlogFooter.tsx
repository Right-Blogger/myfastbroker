'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, AlertTriangle } from 'lucide-react';
import BrandLogo from '@/components/common/BrandLogo';

export default function BlogFooter() {
  return (
    <footer className="bg-[#080809] text-gray-400 border-t border-white/10 text-xs leading-relaxed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandLogo size="md" variant="badge" />
              <span className="text-xl font-bold text-white tracking-tight">
                MyFastBroker<span className="text-blue-500 font-extrabold">.news</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed">
              <strong>MyFastBroker</strong> is an independent financial comparison platform providing broker reviews, fee analysis, and educational content for traders and investors.
            </p>
            <div className="pt-2">
              <a href="mailto:collab.topagency@gmail.com" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition">
                <Mail className="w-3.5 h-3.5" />
                <span>collab.topagency@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Blog Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Blog Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog/?category=getting-started" className="hover:text-blue-400 transition">Getting Started</Link></li>
              <li><Link href="/blog/?category=broker-basics" className="hover:text-blue-400 transition">Broker Basics</Link></li>
              <li><Link href="/blog/?category=broker-fees-costs" className="hover:text-blue-400 transition">Broker Fees & Costs</Link></li>
              <li><Link href="/blog/?category=stock-trading" className="hover:text-blue-400 transition">Stock Trading</Link></li>
              <li><Link href="/blog/?category=forex-trading" className="hover:text-blue-400 transition">Forex Trading</Link></li>
              <li><Link href="/blog/?category=trading-platforms" className="hover:text-blue-400 transition">Trading Platforms</Link></li>
              <li><Link href="/blog/?category=broker-safety-regulation" className="hover:text-blue-400 transition">Broker Safety & Regulation</Link></li>
              <li><Link href="/blog/?category=risk-management" className="hover:text-blue-400 transition">Risk Management</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-blue-400 transition">Broker Directory</Link></li>
              <li><Link href="/blog/" className="hover:text-blue-400 transition">All Blog Articles</Link></li>
              <li><Link href="/blog/best-online-brokers-beginners/" className="hover:text-blue-400 transition">Best Brokers for Beginners</Link></li>
              <li><Link href="/blog/complete-beginners-guide-online-brokers/" className="hover:text-blue-400 transition">Complete Beginner&apos;s Guide</Link></li>
              <li><Link href="/blog/broker-fees-explained/" className="hover:text-blue-400 transition">Broker Fees Explained</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><span className="text-gray-500">Privacy Policy</span></li>
              <li><span className="text-gray-500">Terms of Service</span></li>
              <li><span className="text-gray-500">Risk Disclaimer</span></li>
            </ul>
          </div>
        </div>

        {/* Risk Disclosure */}
        <div className="mt-10 pt-6 border-t border-white/5 bg-white/[0.02] p-4 rounded-xl border border-white/5 text-[11px] text-gray-400 leading-relaxed">
          <div className="flex items-start gap-2 text-amber-400 font-semibold mb-1">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>High Risk Investment & Derivative Disclosure</span>
          </div>
          <p>
            Trading financial instruments — including equities, options, futures, spot foreign exchange (Forex), and Contracts for Difference (CFDs) — carries a high level of risk and may not be suitable for all investors. The information contained on MyFastBroker (myfastbroker.news) is for informational and educational purposes only and does not constitute financial, investment, legal, or tax advice. Always consult with a licensed fiduciary financial advisor before making investment decisions.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <div>© {new Date().getFullYear()} MyFastBroker.news. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-gray-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-gray-300">Terms of Service</Link>
            <span>•</span>
            <Link href="/" className="hover:text-gray-300">Risk Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
