'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '@/data/blog-articles';

export default function BlogListingClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cmsPosts, setCmsPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/public/posts')
      .then(r => r.ok ? r.json() : { posts: [] })
      .then(data => setCmsPosts(data.posts || []))
      .catch(() => {});
  }, []);

  const allArticles = useMemo(() => {
    // Map CMS posts to match BlogArticle-like shape for the card
    const mappedCms = cmsPosts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      categorySlug: p.categorySlug,
      author: p.author,
      authorRole: '',
      readingTime: p.readingTime,
      featuredImage: p.featuredImage,
      imageAlt: p.title,
      publishedAt: p.publishedAt,
    }));
    return [...mappedCms, ...BLOG_ARTICLES];
  }, [cmsPosts]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') return allArticles;
    return allArticles.filter(a => a.categorySlug === activeCategory);
  }, [activeCategory, allArticles]);

  const featuredArticle = allArticles[0];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] flex flex-col font-sans">
      <BlogHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>myfastbroker.news Education Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Broker Guides & Trading Education
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              In-depth guides on broker selection, fee analysis, trading fundamentals, and risk management. Independent research from the MyFastBroker editorial team.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs justify-start sm:justify-center">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition border ${
                activeCategory === 'all'
                  ? 'accent-gradient text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              All Articles ({allArticles.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition border ${
                  activeCategory === cat.slug
                    ? 'accent-gradient text-white border-blue-500 shadow-md shadow-blue-500/20'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {activeCategory === 'all' && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">Featured Article</div>
              <BlogArticleCard article={featuredArticle} featured />
            </div>
          )}

          {/* Article Grid */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              {activeCategory === 'all' ? 'All Articles' : BLOG_CATEGORIES.find(c => c.slug === activeCategory)?.name} ({filteredArticles.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === 'all' ? filteredArticles.slice(1) : filteredArticles).map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
}
