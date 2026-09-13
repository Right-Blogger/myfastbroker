import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/content/auth';
import { getPageById, updatePage, deletePage } from '@/lib/content/store';
import { CmsPage, CmsPageStatus } from '@/lib/content/types';

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
    const page = await getPageById(id);
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Get page error:', error);
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
    const existing = await getPageById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const body = await request.json();
    const updated: CmsPage = {
      ...existing,
      title: body.title ?? existing.title,
      content: body.content ?? existing.content,
      featuredImage: body.featuredImage ?? existing.featuredImage,
      imageAlt: body.imageAlt ?? existing.imageAlt,
      status: (body.status as CmsPageStatus) ?? existing.status,
      seoTitle: body.seoTitle ?? existing.seoTitle,
      seoDescription: body.seoDescription ?? existing.seoDescription,
      ogImage: body.ogImage ?? existing.ogImage,
      canonicalUrl: body.canonicalUrl ?? existing.canonicalUrl,
      publishedAt:
        body.status === 'published' && existing.status !== 'published'
          ? new Date().toISOString()
          : existing.publishedAt,
    };

    await updatePage(updated);

    return NextResponse.json({ page: updated });
  } catch (error) {
    console.error('Update page error:', error);
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
    const success = await deletePage(id);
    if (!success) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete page error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
