import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/content/auth';
import { getPostById, updatePost, deletePost } from '@/lib/content/store';
import { CmsPost, CmsPostStatus } from '@/lib/content/types';
import { BlogCategory } from '@/data/blog-articles';

function computeReadingTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const post = await getPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await getPostById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const updated: CmsPost = {
      ...existing,
      title: body.title ?? existing.title,
      excerpt: body.excerpt ?? existing.excerpt,
      content: body.content ?? existing.content,
      category: (body.category as BlogCategory) ?? existing.category,
      categorySlug: body.categorySlug ?? existing.categorySlug,
      author: body.author ?? existing.author,
      authorRole: body.authorRole ?? existing.authorRole,
      featuredImage: body.featuredImage ?? existing.featuredImage,
      imageAlt: body.imageAlt ?? existing.imageAlt,
      status: (body.status as CmsPostStatus) ?? existing.status,
      keyTakeaways: body.keyTakeaways ?? existing.keyTakeaways,
      tags: body.tags ?? existing.tags,
      seoTitle: body.seoTitle ?? existing.seoTitle,
      seoDescription: body.seoDescription ?? existing.seoDescription,
      primaryKeyword: body.primaryKeyword ?? existing.primaryKeyword,
      secondaryKeywords: body.secondaryKeywords ?? existing.secondaryKeywords,
      ogImage: body.ogImage ?? existing.ogImage,
      canonicalUrl: body.canonicalUrl ?? existing.canonicalUrl,
      scheduledAt: body.scheduledAt ?? existing.scheduledAt,
      publishedAt:
        body.status === 'published' && existing.status !== 'published'
          ? new Date().toISOString()
          : existing.publishedAt,
    };
    updated.readingTime = computeReadingTime(updated.content);

    await updatePost(updated);

    return NextResponse.json({ post: updated });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const success = await deletePost(id);
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
