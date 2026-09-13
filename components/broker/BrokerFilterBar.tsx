'use client';

import React from 'react';
import { BROKER_CATEGORIES } from '@/data/brokers';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface BrokerFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy: 'rating' | 'reviews' | 'minDeposit' | 'name';
  onSortChange: (sort: 'rating' | 'reviews' | 'minDeposit' | 'name') => void;
  zeroCommissionOnly: boolean;
  onToggleZeroCommission: (val: boolean) => void;
  totalMatches: number;
}

export default function BrokerFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  zeroCommissionOnly,
  onToggleZeroCommission,
  totalMatches,
}: BrokerFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4">
      {/* Top search and sort row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search broker by name, asset (e.g. IBKR, thinkorswim, MT4, crypto)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Zero commission toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 transition select-none">
            <input
              type="checkbox"
              checked={zeroCommissionOnly}
              onChange={(e) => onToggleZeroCommission(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <span>0% Commission Only</span>
          </label>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="minDeposit">Lowest Min Deposit</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {BROKER_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition border ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === cat.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results counter indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
        <span>Showing <strong className="text-slate-800 font-bold">{totalMatches}</strong> verified brokers</span>
        {searchQuery && (
          <span>Filter: &quot;{searchQuery}&quot;</span>
        )}
      </div>
    </div>
  );
}
