'use client';

import React from 'react';
import Link from 'next/link';
import { BlogArticleSection, FAQItem } from '@/data/blog-articles';
import { AlertTriangle, Info, Lightbulb, ChevronDown } from 'lucide-react';

interface ArticleContentProps {
  content: BlogArticleSection[];
}

function CalloutBox({ variant, text }: { variant: string; text: string }) {
  const config = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: <Info className="w-4 h-4 text-blue-400" />, textClass: 'text-gray-200' },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: <AlertTriangle className="w-4 h-4 text-amber-400" />, textClass: 'text-gray-200' },
    tip: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: <Lightbulb className="w-4 h-4 text-emerald-400" />, textClass: 'text-gray-200' },
  }[variant] || { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: <Info className="w-4 h-4 text-blue-400" />, textClass: 'text-gray-200' };

  return (
    <div className={`${config.bg} border ${config.border} rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5">{config.icon}</span>
        <p className={`text-sm ${config.textClass} leading-relaxed`}>{text}</p>
      </div>
    </div>
  );
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="space-y-6">
      {content.map((section, index) => {
        switch (section.type) {
          case 'paragraph':
            return (
              <p key={index} className="text-gray-300 text-[15px] leading-[1.8]">
                {section.text}
              </p>
            );

          case 'heading':
            if (section.headingLevel === 'h3') {
              return (
                <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3">
                  {section.heading}
                </h3>
              );
            }
            return (
              <h2 key={index} className="text-2xl font-extrabold text-white mt-10 mb-4 pt-4 border-t border-white/5">
                {section.heading}
              </h2>
            );

          case 'list':
            return (
              <ul key={index} className="space-y-3 my-4">
                {section.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-[15px] leading-relaxed">
                    <span className="text-blue-400 font-bold mt-1.5 text-xs">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div key={index} className="overflow-x-auto my-6 rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.04] border-b border-white/10">
                      {section.tableHeaders?.map((header, i) => (
                        <th key={i} className="py-3 px-4 text-left font-bold uppercase tracking-wider text-[11px] text-gray-400">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {section.tableRows?.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-500/[0.04] transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="py-3 px-4 text-gray-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'callout':
          case 'warning':
            return (
              <CalloutBox
                key={index}
                variant={section.variant || section.type}
                text={section.text || ''}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

interface ArticleFAQProps {
  faq: FAQItem[];
}

export function ArticleFAQ({ faq }: ArticleFAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-extrabold text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faq.map((item, index) => (
          <div
            key={index}
            className="bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm font-semibold text-white">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface RelatedArticlesProps {
  articles: { slug: string; title: string; category: string; readingTime: string }[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-extrabold text-white mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}/`}
            className="bg-[#0c0c0e] border border-white/10 hover:border-blue-500/40 rounded-xl p-5 transition-all group"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
              {article.category}
            </span>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mt-3 leading-snug">
              {article.title}
            </h3>
            <span className="text-xs text-gray-500 mt-2 block">{article.readingTime}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
