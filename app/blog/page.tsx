import type { Metadata } from 'next';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '@/data/blog-articles';
import BlogListingClient from './BlogListingClient';

export const metadata: Metadata = {
  title: 'Broker Guides & Trading Education | MyFastBroker Blog',
  description: 'Expert guides on choosing brokers, understanding fees, trading stocks and forex, and managing risk. Educational content from MyFastBroker.news.',
  keywords: [
    'broker guides', 'trading education', 'online broker comparison',
    'stock trading guide', 'forex trading guide', 'broker fees explained',
    'risk management trading', 'beginner trading guide'
  ],
  authors: [{ name: 'MyFastBroker Editorial Team', url: 'https://myfastbroker.news' }],
  openGraph: {
    title: 'Broker Guides & Trading Education | MyFastBroker Blog',
    description: 'Expert guides on choosing brokers, understanding fees, trading stocks and forex, and managing risk.',
    type: 'website',
    url: 'https://myfastbroker.news/blog/',
    siteName: 'MyFastBroker',
    images: [
      {
        url: '/logo-badge.png',
        width: 512,
        height: 512,
        alt: 'MyFastBroker Blog',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Broker Guides & Trading Education | MyFastBroker Blog',
    description: 'Expert guides on choosing brokers, understanding fees, trading stocks and forex, and managing risk.',
    images: ['/logo-badge.png'],
  },
  alternates: {
    canonical: 'https://myfastbroker.news/blog/',
  },
};

export default function BlogPage() {
  return <BlogListingClient />;
}
