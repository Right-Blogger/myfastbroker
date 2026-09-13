'use client';

import React from 'react';
import { Article } from '@/data/articles';
import { Clock, Calendar, ArrowRight, User, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export default function ArticleCard({ article, onReadArticle }: ArticleCardProps) {
  return (
    <div
      id={`article-card-${article.id}`}
      onClick={() => onReadArticle(article)}
      className="bg-[#0c0c0e] rounded-2xl border border-white/10 hover:border-blue-500/40 p-6 shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col justify-between cursor-pointer group text-[#e5e7eb]"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-[11px]">
            {article.author.charAt(0)}
          </div>
          <span className="font-semibold text-gray-300">{article.author}</span>
        </div>

        <span className="font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
          <span>Read Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
