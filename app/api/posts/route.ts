import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/content/auth';
import { getAllPosts, createPost } from '@/lib/content/store';
import { generateSlug, ensureUniqueSlug } from '@/lib/content/slug';
import { getAllExistingSlugs } from '@/lib/content/store';
import { CmsPost, CmsPostStatus } from '@/lib/content/types';
import { BlogCategory, BLOG_CATEGORIES } from '@/data/blog-articles';

function computeReadingTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      excerpt = '',
      content = '',
      category,
      categorySlug,
      author = 'MyFastBroker Editorial',
      authorRole = 'Editorial Team',
      featuredImage = '',
      imageAlt = '',
      status = 'draft' as CmsPostStatus,
      keyTakeaways = [],
      tags = [],
      seoTitle,
      seoDescription,
      primaryKeyword = '',
      secondaryKeywords = [],
      ogImage,
      canonicalUrl,
      scheduledAt,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const slug = ensureUniqueSlug(
      generateSlug(title),
      await getAllExistingSlugs()
    );

    const now = new Date().toISOString();
    const publishedAt =
      status === 'published' ? now : scheduledAt || now;

    const post: CmsPost = {
      id,
      slug,
      title,
      excerpt,
      content,
      category: (category as BlogCategory) || 'Getting Started',
      categorySlug: categorySlug || 'getting-started',
      author,
      authorRole,
      publishedAt,
      updatedAt: now,
      scheduledAt: scheduledAt,
      readingTime: computeReadingTime(content),
      featuredImage,
      imageAlt,
      status: status || 'draft',
      keyTakeaways,
      tags,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      primaryKeyword,
      secondaryKeywords,
      ogImage,
      canonicalUrl,
    };

    await createPost(post);

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
