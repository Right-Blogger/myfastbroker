import { BlogCategory } from '@/data/blog-articles';

// ─── CMS Post Types ──────────────────────────────────────────────────────────

export type CmsPostStatus = 'draft' | 'published' | 'scheduled';

export interface CmsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML from TipTap editor
  category: BlogCategory;
  categorySlug: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  scheduledAt?: string;
  readingTime: string;
  featuredImage: string;
  imageAlt: string;
  status: CmsPostStatus;
  keyTakeaways: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface CmsPostIndexEntry {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  categorySlug: string;
  status: CmsPostStatus;
  publishedAt: string;
  updatedAt: string;
  author: string;
  excerpt: string;
  featuredImage: string;
  readingTime: string;
  tags: string[];
}

// ─── CMS Page Types ──────────────────────────────────────────────────────────

export type CmsPageStatus = 'draft' | 'published';

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string; // HTML from TipTap editor
  publishedAt: string;
  updatedAt: string;
  status: CmsPageStatus;
  featuredImage: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface CmsPageIndexEntry {
  id: string;
  slug: string;
  title: string;
  status: CmsPageStatus;
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
}

// ─── Index Types ─────────────────────────────────────────────────────────────

export interface PostsIndex {
  posts: CmsPostIndexEntry[];
}

export interface PagesIndex {
  pages: CmsPageIndexEntry[];
}

// ─── Revision Types ──────────────────────────────────────────────────────────

export interface ContentRevision {
  id: string;
  contentId: string;
  timestamp: string;
  snapshot: CmsPost | CmsPage;
}

// ─── Auth Types ──────────────────────────────────────────────────────────────

export interface AuthSession {
  id: string;
  createdAt: string;
  expiresAt: string;
}
