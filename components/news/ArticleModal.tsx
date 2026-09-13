'use client';

import React from 'react';
import { Article } from '@/data/articles';
import { X, Clock, Calendar, CheckCircle2, User, Share2, BookOpen } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-[#0c0c0e] w-full max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative max-h-[90vh] flex flex-col text-[#e5e7eb]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#080809] border-b border-white/10 text-white relative flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 p-2 rounded-full transition"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="text-xs text-gray-400">• Published {article.publishDate}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight pr-8">
            {article.title}
          </h2>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
            <div className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center text-white font-bold text-xs">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white">{article.author}</div>
              <div className="text-[11px] text-gray-400">{article.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Key Takeaways Box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Key Executive Takeaways
            </h3>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-gray-200 flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Text */}
          <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Topics:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-300">Editorial Disclaimer:</strong> This guide was compiled independently by the MyFastBroker editorial research desk on myfastbroker.news. Broker regulations and pricing schedules are audited monthly. This content does not constitute personalized financial or investment advice.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080809] border-t border-white/10 flex items-center justify-between text-xs flex-shrink-0">
          <span className="text-gray-400">Source: MyFastBroker Research & Intelligence</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 accent-gradient hover:opacity-90 text-white rounded-xl font-bold transition shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
