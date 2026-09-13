import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import ArticlePageClient from './ArticlePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
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
  if (!article) notFound();

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
