'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BrokerCard from '@/components/broker/BrokerCard';
import BrokerFilterBar from '@/components/broker/BrokerFilterBar';
import BrokerDetailModal from '@/components/broker/BrokerDetailModal';
import BrokerComparisonModal from '@/components/broker/BrokerComparisonModal';
import FeeDragCalculator from '@/components/tools/FeeDragCalculator';
import TradingCommissionCalculator from '@/components/tools/TradingCommissionCalculator';
import MarginRiskCalculator from '@/components/tools/MarginRiskCalculator';
import BrokerMatcher from '@/components/tools/BrokerMatcher';
import ArticleCard from '@/components/news/ArticleCard';
import ArticleModal from '@/components/news/ArticleModal';
import LegalModal from '@/components/legal/LegalModal';
import AboutView from '@/components/views/AboutView';
import ContactView from '@/components/views/ContactView';
import BrandLogo from '@/components/common/BrandLogo';
import Link from 'next/link';

import { BROKERS_DATA, Broker, BROKER_CATEGORIES } from '@/data/brokers';
import { ARTICLES_DATA, Article } from '@/data/articles';
import {
  Scale,
  Search,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Award,
  Star,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  BookOpen,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';

export default function HomePage() {
  // Navigation
  const [activeNav, setActiveNav] = useState<string>('home');

  // Broker filter and search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'minDeposit' | 'name'>('rating');
  const [zeroCommissionOnly, setZeroCommissionOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Comparison state
  const [comparedBrokerIds, setComparedBrokerIds] = useState<string[]>(['ibkr', 'charles-schwab']);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);

  // Detail modals
  const [selectedBrokerForDetail, setSelectedBrokerForDetail] = useState<Broker | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'disclaimer' | 'advertiser' | null>(null);

  // Active calculator tab in Calculators view/section
  const [activeCalcTab, setActiveCalcTab] = useState<'fee_drag' | 'commission' | 'margin' | 'matcher'>('fee_drag');

  // Comparison toggle helper
  const handleToggleCompare = (broker: Broker) => {
    if (comparedBrokerIds.includes(broker.id)) {
      setComparedBrokerIds(comparedBrokerIds.filter(id => id !== broker.id));
    } else {
      if (comparedBrokerIds.length >= 4) {
        alert('You can compare up to 4 brokers side-by-side simultaneously.');
        return;
      }
      setComparedBrokerIds([...comparedBrokerIds, broker.id]);
    }
  };

  const handleRemoveCompare = (brokerId: string) => {
    setComparedBrokerIds(comparedBrokerIds.filter(id => id !== brokerId));
  };

  // Filtered & sorted brokers
  const filteredBrokers = useMemo(() => {
    return BROKERS_DATA.filter(broker => {
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        broker.name.toLowerCase().includes(q) ||
        broker.tagline.toLowerCase().includes(q) ||
        broker.pros.some(p => p.toLowerCase().includes(q)) ||
        broker.categories.some(c => c.toLowerCase().includes(q)) ||
        broker.platforms.some(p => p.toLowerCase().includes(q));

      // Category filter
      const matchesCategory = selectedCategory === 'all' ||
        broker.categories.includes(selectedCategory as any);

      // Zero commission filter
      const matchesZeroCommission = !zeroCommissionOnly ||
        broker.categories.includes('zero_commission');

      return matchesSearch && matchesCategory && matchesZeroCommission;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'minDeposit') return a.minDeposit - b.minDeposit;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategory, zeroCommissionOnly, sortBy]);

  const comparedBrokers = useMemo(() => {
    return BROKERS_DATA.filter(b => comparedBrokerIds.includes(b.id));
  }, [comparedBrokerIds]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Global Header */}
      <Header
        comparedBrokers={comparedBrokers}
        onOpenCompare={() => setIsComparisonModalOpen(true)}
        activeNav={activeNav}
        onNavigate={(nav) => {
          setActiveNav(nav);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ======================= HOME VIEW ======================= */}
        {activeNav === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <section className="relative bg-[#050505] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
              <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
                <div className="flex justify-center">
                  <BrandLogo size={58} variant="badge" className="shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform" />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>myfastbroker.news • Independent Brokerage Audits</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight max-w-4xl mx-auto text-white">
                  Compare Brokers. <br className="hidden sm:inline" />
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                    Cut Your Fees. Invest Confidently.
                  </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Secure your financial future on <span className="text-gray-200 font-semibold">myfastbroker.news</span>. We provide verified data and real-time fee analysis across US stocks, forex, options, and zero-commission brokers.
                </p>

                {/* Hero Search Box */}
                <div className="max-w-2xl mx-auto mt-8">
                  <div className="bg-[#111111] p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/10 focus-within:border-blue-500/60 transition">
                    <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search broker, asset, or feature (e.g., Interactive Brokers, MT4, Options)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-sm text-white placeholder:text-gray-500 focus:outline-none py-2 bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('broker-comparison-directory');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 accent-gradient hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 flex-shrink-0 shadow-lg shadow-blue-500/20"
                    >
                      <span>Analyze Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Fast category shortcuts */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                    <span className="text-gray-500 font-medium">Quick Filters:</span>
                    {['stocks', 'zero_commission', 'forex', 'options', 'crypto'].map((catId) => (
                      <button
                        key={catId}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(catId);
                          const el = document.getElementById('broker-comparison-directory');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition text-[11px] font-medium"
                      >
                        {catId === 'zero_commission' ? '0% Commission' : catId.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-white/10 text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">$14.8M+</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">Estimated Fees Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-blue-400">45+</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">Regulated Brokers Tested</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">100+</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">Audit Checkpoints</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">Tier-1 Regulatory Audit</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Top Picks Spotlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Editor&apos;s Verified Selections</div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Brokers for 2025/2026</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>View All {BROKERS_DATA.length} Platforms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {BROKERS_DATA.filter(b => b.isEditorsChoice || b.rating >= 4.8).slice(0, 4).map((broker) => (
                  <BrokerCard
                    key={broker.id}
                    broker={broker}
                    onViewDetails={(b) => setSelectedBrokerForDetail(b)}
                    onToggleCompare={handleToggleCompare}
                    isCompared={comparedBrokerIds.includes(broker.id)}
                  />
                ))}
              </div>
            </section>

            {/* Master Broker Directory & Comparison Section */}
            <section id="broker-comparison-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Comprehensive Broker Directory
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Filter by asset, commission structure, and regulatory jurisdiction.
                  </p>
                </div>

                {/* View switcher */}
                <div className="flex items-center gap-2 self-start sm:self-auto bg-white/5 border border-white/10 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                      viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>
              </div>

              {/* Filter controls */}
              <BrokerFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                zeroCommissionOnly={zeroCommissionOnly}
                onToggleZeroCommission={setZeroCommissionOnly}
                totalMatches={filteredBrokers.length}
              />

              {/* Grid view */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBrokers.map((broker) => (
                    <BrokerCard
                      key={broker.id}
                      broker={broker}
                      onViewDetails={(b) => setSelectedBrokerForDetail(b)}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedBrokerIds.includes(broker.id)}
                    />
                  ))}
                </div>
              ) : (
                /* Interactive Table View */
                <div className="bg-[#0c0c0e] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead className="bg-white/[0.04] text-gray-400 font-bold uppercase tracking-wider text-[10px] border-b border-white/10">
                        <tr>
                          <th className="py-4 px-5">Broker</th>
                          <th className="py-4 px-4">Rating</th>
                          <th className="py-4 px-4">US Stocks</th>
                          <th className="py-4 px-4">Min. Deposit</th>
                          <th className="py-4 px-4">Margin APR</th>
                          <th className="py-4 px-4 hidden md:table-cell">Regulations</th>
                          <th className="py-4 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredBrokers.map((broker) => (
                          <tr key={broker.id} className="hover:bg-blue-500/[0.06] transition-colors">
                            <td className="py-4 px-5 font-bold text-white">
                              <div className="font-bold text-sm text-white">{broker.name}</div>
                              <div className="text-[11px] text-gray-400 font-normal line-clamp-1">{broker.tagline}</div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-1 font-bold text-white">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span>{broker.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-semibold text-emerald-400">
                              {broker.stockCommissionUS.split('/')[0]}
                            </td>
                            <td className="py-4 px-4 font-mono text-gray-200">
                              ${broker.minDeposit}
                            </td>
                            <td className="py-4 px-4 font-medium text-gray-300">
                              {broker.marginRateEst.split('(')[0]}
                            </td>
                            <td className="py-4 px-4 hidden md:table-cell text-xs text-gray-400">
                              {broker.regulations.slice(0, 3).join(', ')}
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleCompare(broker)}
                                  className={`p-2 rounded-lg border text-xs font-semibold transition ${
                                    comparedBrokerIds.includes(broker.id)
                                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                  }`}
                                  title="Add to compare matrix"
                                >
                                  <Scale className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedBrokerForDetail(broker)}
                                  className="px-3.5 py-1.5 accent-gradient hover:opacity-90 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-500/10 transition"
                                >
                                  Review
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {filteredBrokers.length === 0 && (
                <div className="text-center py-12 bg-[#0c0c0e] rounded-2xl border border-white/10 p-8 space-y-3">
                  <Info className="w-8 h-8 text-gray-500 mx-auto" />
                  <h3 className="text-lg font-bold text-white">No matching brokers found</h3>
                  <p className="text-xs text-gray-400">
                    Try clearing your search query or selecting &quot;All Brokers&quot;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setZeroCommissionOnly(false);
                    }}
                    className="px-4 py-2 accent-gradient text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 hover:opacity-90"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </section>

            {/* Interactive Calculators Teaser Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Financial Modeling Suite</div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Interactive Calculators & Tools
                  </h2>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'fee_drag', label: 'Broker Fee Drag' },
                    { id: 'commission', label: 'Commission Estimator' },
                    { id: 'margin', label: 'Margin & Liquidation' },
                    { id: 'matcher', label: '60s Broker Matcher' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveCalcTab(t.id as any)}
                      className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition border ${
                        activeCalcTab === t.id
                          ? 'accent-gradient text-white border-blue-500 shadow-md shadow-blue-500/20'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active calculator component */}
              {activeCalcTab === 'fee_drag' && <FeeDragCalculator />}
              {activeCalcTab === 'commission' && <TradingCommissionCalculator />}
              {activeCalcTab === 'margin' && <MarginRiskCalculator />}
              {activeCalcTab === 'matcher' && (
                <BrokerMatcher onSelectBroker={(b) => setSelectedBrokerForDetail(b)} />
              )}
            </section>

            {/* Educational & News Hub Teaser */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">myfastbroker.news Intelligence</div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Latest Market Insights & Due Diligence
                  </h2>
                </div>
                <Link
                href="/blog/"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>View All Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ARTICLES_DATA.slice(0, 3).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onReadArticle={(a) => setSelectedArticle(a)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ======================= COMPARE VIEW ======================= */}
        {activeNav === 'compare' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Side-by-Side Comparison Engine</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Compare Online Brokers Side-by-Side
                </h1>
                <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                  Select up to 4 brokers to inspect 20+ parameters including trade commissions, margin interest rates, Tier-1 regulations, and platforms.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsComparisonModalOpen(true)}
                disabled={comparedBrokers.length === 0}
                className="px-5 py-3 accent-gradient hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition cursor-pointer self-start sm:self-auto"
              >
                <Scale className="w-4 h-4" />
                <span>Open Comparison Matrix ({comparedBrokers.length})</span>
              </button>
            </div>

            {/* Currently Selected Comparison Chips */}
            <div className="bg-[#0c0c0e] p-5 rounded-2xl border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                Brokers in Matrix ({comparedBrokers.length} of 4 selected):
              </span>
              <div className="flex flex-wrap gap-2">
                {comparedBrokers.map(b => (
                  <div
                    key={b.id}
                    className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    <span>{b.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCompare(b.id)}
                      className="hover:text-rose-400 transition"
                      title="Remove from compare"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {comparedBrokers.length === 0 && (
                  <span className="text-xs text-gray-500 italic">No brokers selected. Click any broker card below to add to comparison.</span>
                )}
              </div>
            </div>

            {/* Grid of all brokers to add/remove */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BROKERS_DATA.map((broker) => (
                <BrokerCard
                  key={broker.id}
                  broker={broker}
                  onViewDetails={(b) => setSelectedBrokerForDetail(b)}
                  onToggleCompare={handleToggleCompare}
                  isCompared={comparedBrokerIds.includes(broker.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ======================= CALCULATORS VIEW ======================= */}
        {activeNav === 'calculators' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Calculator className="w-3.5 h-3.5" />
                <span>Financial Toolset</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                Broker Fee, Margin & Risk Calculators
              </h1>
              <p className="text-sm text-gray-400">
                Transparent mathematical models to calculate the true cost of trading, broker fee drag, and leverage liquidation thresholds.
              </p>
            </div>

            {/* Navigation Pills for calculators */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
              {[
                { id: 'fee_drag', label: '1. Fee Drag & Compounding' },
                { id: 'commission', label: '2. Commission Estimator' },
                { id: 'margin', label: '3. Margin & Liquidation' },
                { id: 'matcher', label: '4. 60s Broker Matcher' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveCalcTab(t.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition border ${
                    activeCalcTab === t.id
                      ? 'accent-gradient text-white border-blue-500 shadow-md shadow-blue-500/20'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Active Calculator Component */}
            <div className="space-y-12">
              {activeCalcTab === 'fee_drag' && <FeeDragCalculator />}
              {activeCalcTab === 'commission' && <TradingCommissionCalculator />}
              {activeCalcTab === 'margin' && <MarginRiskCalculator />}
              {activeCalcTab === 'matcher' && (
                <BrokerMatcher onSelectBroker={(b) => setSelectedBrokerForDetail(b)} />
              )}
            </div>
          </div>
        )}

        {/* ======================= NEWS & GUIDES VIEW ======================= */}
        {activeNav === 'news' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>myfastbroker.news Publication</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Broker Due Diligence, Market Guides & Reviews
                </h1>
                <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                  In-depth empirical research on execution quality, regulatory solvency schemes, and broker fee mechanics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARTICLES_DATA.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onReadArticle={(a) => setSelectedArticle(a)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ======================= ABOUT VIEW ======================= */}
        {activeNav === 'about' && (
          <AboutView onNavigate={(nav) => {
            setActiveNav(nav);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {/* ======================= CONTACT VIEW ======================= */}
        {activeNav === 'contact' && <ContactView />}
      </main>

      {/* Floating Compare Action Bar when brokers are selected */}
      {comparedBrokerIds.length > 0 && activeNav !== 'compare' && (
        <div className="fixed bottom-6 right-6 z-30 animate-fade-in">
          <button
            type="button"
            onClick={() => setIsComparisonModalOpen(true)}
            className="bg-[#0c0c0e] hover:bg-[#141416] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3 text-xs sm:text-sm font-bold transition transform hover:scale-105"
          >
            <Scale className="w-4 h-4 text-blue-400" />
            <span>Compare Matrix ({comparedBrokerIds.length})</span>
            <span className="accent-gradient text-white text-[11px] px-2 py-0.5 rounded-full shadow-sm">
              View
            </span>
          </button>
        </div>
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={(nav) => {
          setActiveNav(nav);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegal={(type) => setLegalType(type)}
      />

      {/* Modals */}
      <BrokerDetailModal
        broker={selectedBrokerForDetail}
        onClose={() => setSelectedBrokerForDetail(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedBrokerForDetail ? comparedBrokerIds.includes(selectedBrokerForDetail.id) : false}
      />

      {isComparisonModalOpen && (
        <BrokerComparisonModal
          brokers={comparedBrokers}
          onClose={() => setIsComparisonModalOpen(false)}
          onRemoveBroker={handleRemoveCompare}
          onAddMore={() => {
            setIsComparisonModalOpen(false);
            setActiveNav('home');
            const el = document.getElementById('broker-comparison-directory');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </div>
  );
}
