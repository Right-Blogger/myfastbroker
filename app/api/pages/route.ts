import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/content/auth';
import { getAllPages, createPage } from '@/lib/content/store';
import { generateSlug, ensureUniqueSlug } from '@/lib/content/slug';
import { getAllExistingSlugs } from '@/lib/content/store';
import { CmsPage } from '@/lib/content/types';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pages = await getAllPages();
    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Get pages error:', error);
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
      content = '',
      featuredImage = '',
      imageAlt = '',
      status = 'draft',
      seoTitle,
      seoDescription,
      ogImage,
      canonicalUrl,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const slug = ensureUniqueSlug(
      generateSlug(title),
      await getAllExistingSlugs()
    );

    const now = new Date().toISOString();

    const page: CmsPage = {
      id,
      slug,
      title,
      content,
      publishedAt: status === 'published' ? now : now,
      updatedAt: now,
      status: status || 'draft',
      featuredImage,
      imageAlt,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || '',
      ogImage,
      canonicalUrl,
    };

    await createPage(page);

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    console.error('Create page error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
