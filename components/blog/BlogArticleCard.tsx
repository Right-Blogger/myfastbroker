'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, User } from 'lucide-react';
import { BlogArticle } from '@/data/blog-articles';

interface BlogArticleCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export default function BlogArticleCard({ article, featured = false }: BlogArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${article.slug}/`} className="block group">
        <div className="bg-[#0c0c0e] rounded-2xl border border-white/10 hover:border-blue-500/40 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-blue-900/30 to-[#0c0c0e] overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.imageAlt}
                fill
                className="object-cover relative z-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-300">{article.author}</div>
                    <div className="text-[11px] text-gray-500">{article.publishedAt}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}/`} className="block group">
      <div className="bg-[#0c0c0e] rounded-2xl border border-white/10 hover:border-blue-500/40 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 flex flex-col h-full">
        <div className="relative aspect-[16/10] bg-gradient-to-br from-blue-900/20 to-[#0c0c0e] overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.imageAlt}
            fill
            className="object-cover relative z-10"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
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

          <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-[11px]">
                {article.author.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-gray-300">{article.author.split(',')[0]}</span>
            </div>
            <span className="text-xs font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              <span>Read</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
