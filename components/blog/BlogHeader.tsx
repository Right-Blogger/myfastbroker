'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import BrandLogo from '@/components/common/BrandLogo';

export default function BlogHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Compare Brokers', href: '/' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      {/* Top micro-bar */}
      <div className="bg-[#080809] text-gray-400 text-[11px] py-1.5 px-4 hidden sm:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>myfastbroker.news — Independent Broker Education & Due Diligence</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Official Contact: <a href="mailto:collab.topagency@gmail.com" className="text-gray-300 hover:text-blue-400 underline">collab.topagency@gmail.com</a></span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">100% Free Public Resource</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 text-left group">
          <BrandLogo size="md" variant="badge" className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="text-xl font-bold text-white tracking-tight flex items-center gap-0.5">
              <span>MyFastBroker</span>
              <span className="text-blue-500 font-extrabold">.news</span>
            </div>
            <div className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">
              Compare • Cut Fees • Trade
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-400">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`px-3.5 py-2 rounded-xl transition ${
                (item.href === '/blog/' && pathname.startsWith('/blog'))
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold'
                  : item.href === '/' && !pathname.startsWith('/blog')
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold'
                    : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 accent-gradient text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Broker Directory</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#080809] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <Link
            href="/"
            className="block w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/blog/"
            className="block w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/"
            className="block w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Compare Brokers
          </Link>
          <div className="pt-3 border-t border-white/5 text-xs text-gray-500">
            <span>Need assistance? Email: </span>
            <a href="mailto:collab.topagency@gmail.com" className="text-blue-400 font-bold">
              collab.topagency@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
