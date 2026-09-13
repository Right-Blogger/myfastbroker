'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import ArticleContent, { ArticleFAQ, RelatedArticles } from '@/components/blog/ArticleContent';
import { BlogArticle, BLOG_ARTICLES } from '@/data/blog-articles';

interface ArticlePageClientProps {
  article: BlogArticle;
}

export default function ArticlePageClient({ article }: ArticlePageClientProps) {
  const pathname = usePathname();

  // Get related articles
  const relatedArticles = (article.relatedArticleSlugs ?? [])
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean)
    .slice(0, 3) as { slug: string; title: string; category: string; readingTime: string }[];

  // Get previous/next articles
  const currentIndex = BLOG_ARTICLES.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: `https://myfastbroker.news/blog/${article.slug}/`,
      });
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`https://myfastbroker.news/blog/${article.slug}/`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] flex flex-col font-sans">
      <BlogHeader />

      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog/' },
              { label: article.category, href: `/blog/?category=${article.categorySlug}` },
              { label: article.title },
            ]}
          />

          {/* Article Header */}
          <header className="mt-8 space-y-6">
            <div className="flex items-center gap-2">
              <Link
                href={`/blog/?category=${article.categorySlug}`}
                className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full hover:bg-blue-500/20 transition"
              >
                {article.category}
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-gray-400 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author and Meta Bar */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center text-white font-bold text-sm">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{article.author}</div>
                  <div className="text-[11px] text-gray-400">{article.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishedAt}
                </span>
                {article.updatedAt && (
                  <span className="flex items-center gap-1">
                    <span className="text-gray-500">Updated:</span>
                    {article.updatedAt}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-blue-400 transition bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mt-8 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-900/20 to-[#0c0c0e]">
            <Image
              src={article.featuredImage}
              alt={article.imageAlt}
              fill
              className="object-cover relative z-10"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              priority
            />
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mt-10 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-4">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                    <span className="text-blue-400 font-bold mt-0.5">✓</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <div className="mt-10">
            <ArticleContent content={article.content ?? []} />
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Topics:</span>
            {(article.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* FAQ */}
          {article.faq && article.faq.length > 0 && (
            <ArticleFAQ faq={article.faq} />
          )}

          {/* Related Articles */}
          <RelatedArticles articles={relatedArticles} />

          {/* Previous / Next Navigation */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                href={`/blog/${prevArticle.slug}/`}
                className="bg-[#0c0c0e] border border-white/10 hover:border-blue-500/40 rounded-xl p-5 transition-all group"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Previous Article
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mt-2 leading-snug">
                  {prevArticle.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/blog/${nextArticle.slug}/`}
                className="bg-[#0c0c0e] border border-white/10 hover:border-blue-500/40 rounded-xl p-5 transition-all group text-right"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1 justify-end">
                  Next Article
                  <ArrowRight className="w-3 h-3" />
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mt-2 leading-snug">
                  {nextArticle.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* CTA Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 px-6 py-3 accent-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 p-4 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-gray-400 leading-relaxed">
            <strong className="text-gray-300">Editorial Disclaimer:</strong> This article was compiled independently by the MyFastBroker editorial research desk on myfastbroker.news. Broker regulations and pricing schedules are audited monthly. This content does not constitute personalized financial or investment advice. Trading financial instruments carries a high level of risk.
          </div>
        </article>
      </main>

      <BlogFooter />
    </div>
  );
}
