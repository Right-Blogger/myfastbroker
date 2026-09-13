import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import ArticlePageClient from './ArticlePageClient';
import { getPublishedPostBySlug } from '@/lib/content/store';
import CmsContent from '@/components/cms/CmsContent';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // CMS posts are handled dynamically via ISR; only hardcoded articles are pre-rendered
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    // Check CMS posts if not found in hardcoded articles
    try {
      const cmsPost = await getPublishedPostBySlug(slug);
      if (cmsPost) {
        return {
          title: cmsPost.seoTitle || cmsPost.title,
          description: cmsPost.seoDescription || cmsPost.excerpt,
          openGraph: {
            title: cmsPost.seoTitle || cmsPost.title,
            description: cmsPost.seoDescription || cmsPost.excerpt,
            type: 'article',
            url: `https://myfastbroker.news/blog/${cmsPost.slug}/`,
            images: cmsPost.featuredImage ? [{ url: cmsPost.featuredImage, width: 1200, height: 630, alt: cmsPost.imageAlt || cmsPost.title }] : [],
          },
          alternates: { canonical: cmsPost.canonicalUrl || `https://myfastbroker.news/blog/${cmsPost.slug}/` },
        };
      }
    } catch {}
    return {};
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: [article.primaryKeyword, ...(article.secondaryKeywords ?? [])].filter((k): k is string => Boolean(k)),
    authors: [{ name: article.author, url: 'https://myfastbroker.news' }],
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: 'article',
      url: `https://myfastbroker.news/blog/${article.slug}/`,
      siteName: 'MyFastBroker',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author],
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: `https://myfastbroker.news/blog/${article.slug}/`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    // Check CMS posts if not found in hardcoded articles
    try {
      const cmsPost = await getPublishedPostBySlug(slug);
      if (cmsPost) {
        const cmsArticleSchema = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: cmsPost.title,
          description: cmsPost.excerpt,
          author: { '@type': 'Person', name: cmsPost.author },
          publisher: {
            '@type': 'Organization',
            name: 'MyFastBroker',
            logo: { '@type': 'ImageObject', url: 'https://myfastbroker.news/logo-badge.png' },
          },
          datePublished: cmsPost.publishedAt,
          dateModified: cmsPost.updatedAt || cmsPost.publishedAt,
          image: cmsPost.featuredImage,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://myfastbroker.news/blog/${cmsPost.slug}/`,
          },
        };

        return (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(cmsArticleSchema) }}
            />
            {/* CMS Article Page */}
            <div className="min-h-screen bg-[#050505] text-[#e5e7eb] flex flex-col font-sans">
              <header className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                  <a href="/blog/" className="text-sm text-gray-400 hover:text-white transition">
                    &larr; Back to Blog
                  </a>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {cmsPost.category || 'Blog'}
                  </span>
                </div>
              </header>
              <main className="flex-1">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  {/* Category */}
                  {cmsPost.category && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {cmsPost.category}
                      </span>
                    </div>
                  )}
                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                    {cmsPost.title}
                  </h1>
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
                    {cmsPost.author && <span>By {cmsPost.author}</span>}
                    {cmsPost.publishedAt && (
                      <time dateTime={cmsPost.publishedAt}>
                        {new Date(cmsPost.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </time>
                    )}
                    {cmsPost.readingTime && <span>{cmsPost.readingTime} min read</span>}
                  </div>
                  {/* Featured Image */}
                  {cmsPost.featuredImage && (
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-10 border border-white/10">
                      <img
                        src={cmsPost.featuredImage}
                        alt={cmsPost.imageAlt || cmsPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* Key Takeaways */}
                  {cmsPost.keyTakeaways && cmsPost.keyTakeaways.length > 0 && (
                    <div className="mb-10 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
                      <h2 className="text-lg font-bold text-white mb-3">Key Takeaways</h2>
                      <ul className="space-y-2">
                        {cmsPost.keyTakeaways.map((t: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-blue-400 mt-0.5">&#10003;</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* Body */}
                  <CmsContent html={cmsPost.content || ''} />
                  {/* Tags */}
                  {cmsPost.tags && cmsPost.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {cmsPost.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </main>
              <footer className="border-t border-white/10 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <a href="/blog/" className="text-sm text-blue-400 hover:text-blue-300 transition">
                    &larr; Back to Blog
                  </a>
                </div>
              </footer>
            </div>
          </>
        );
      }
    } catch {}
    notFound();
  }

  // Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyFastBroker',
      logo: {
        '@type': 'ImageObject',
        url: 'https://myfastbroker.news/logo-badge.png',
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    image: article.featuredImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://myfastbroker.news/blog/${article.slug}/`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://myfastbroker.news',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://myfastbroker.news/blog/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://myfastbroker.news/blog/${article.slug}/`,
      },
    ],
  };

  const faqSchema = article.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticlePageClient article={article} />
    </>
  );
}
