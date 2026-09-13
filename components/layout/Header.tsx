'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Scale, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Broker } from '@/data/brokers';
import BrandLogo from '@/components/common/BrandLogo';

interface HeaderProps {
  comparedBrokers: Broker[];
  onOpenCompare: () => void;
  activeNav: string;
  onNavigate: (nav: string) => void;
}

export default function Header({
  comparedBrokers,
  onOpenCompare,
  activeNav,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isOnBlog = pathname.startsWith('/blog');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  const handleNavClick = (nav: string) => {
    onNavigate(nav);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const navBtnClass = (nav: string) =>
    `px-3 py-2 rounded-xl transition ${
      activeNav === nav
        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold'
        : 'hover:text-white hover:bg-white/5'
    }`;

  const dropdownItemClass = (active: boolean) =>
    `flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition ${
      active
        ? 'bg-blue-500/10 text-blue-400 font-semibold'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
      {/* Top micro-bar */}
      <div className="bg-[#080809] text-gray-400 text-[11px] py-1.5 px-4 hidden sm:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>myfastbroker.news: Independent 2025/2026 Broker Fee Schedules & Regulatory Verification</span>
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
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group flex-shrink-0"
        >
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
        </button>

        {/* Desktop Navigation — Dropdown Structure */}
        <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium text-gray-400" ref={dropdownRef}>
          {/* Home */}
          <button type="button" onClick={() => handleNavClick('home')} className={navBtnClass('home')}>
            Home
          </button>

          {/* Compare Brokers */}
          <button type="button" onClick={() => handleNavClick('compare')} className={navBtnClass('compare')}>
            Compare Brokers
          </button>

          {/* Tools dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition ${
                activeNav === 'calculators' || activeNav === 'news'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'tools' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'tools' && (
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
                <button
                  type="button"
                  onClick={() => handleNavClick('calculators')}
                  className={dropdownItemClass(activeNav === 'calculators')}
                >
                  <span className="text-blue-400 text-xs">📊</span>
                  <span>Fee & Risk Calculators</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('news')}
                  className={dropdownItemClass(activeNav === 'news')}
                >
                  <span className="text-blue-400 text-xs">📰</span>
                  <span>Guides & Market News</span>
                </button>
              </div>
            )}
          </div>

          {/* Learn dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'learn' ? null : 'learn')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition ${
                isOnBlog || activeNav === 'about' || activeNav === 'contact'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Learn</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'learn' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'learn' && (
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
                <Link
                  href="/blog/"
                  onClick={() => setOpenDropdown(null)}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition ${
                    isOnBlog
                      ? 'bg-blue-500/10 text-blue-400 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-blue-400 text-xs">✏️</span>
                  <span>Blog</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  className={dropdownItemClass(activeNav === 'about')}
                >
                  <span className="text-blue-400 text-xs">ℹ️</span>
                  <span>About</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className={dropdownItemClass(activeNav === 'contact')}
                >
                  <span className="text-blue-400 text-xs">✉️</span>
                  <span>Contact</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action: Comparison Drawer Button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenCompare}
            disabled={comparedBrokers.length === 0}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              comparedBrokers.length > 0
                ? 'accent-gradient text-white shadow-lg shadow-blue-500/20 hover:opacity-90 cursor-pointer'
                : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Compare Matrix</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
              comparedBrokers.length > 0 ? 'bg-black/40 text-blue-200' : 'bg-white/10 text-gray-500'
            }`}>
              {comparedBrokers.length}
            </span>
          </button>

          {/* Mobile hamburger */}
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

      {/* ═══════ MOBILE DRAWER — UNCHANGED ═══════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#080809] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('compare')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            Compare Brokers
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('calculators')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            Fee & Risk Calculators
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('news')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            Guides & Market News
          </button>
          <Link
            href="/blog/"
            className="block w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            Blog
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            About MyFastBroker
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 hover:text-white text-sm"
          >
            Contact & Partnerships
          </button>

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
