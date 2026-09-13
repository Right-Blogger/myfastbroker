import { promises as fs } from 'fs';
import path from 'path';
import {
  CmsPost,
  CmsPage,
  CmsPostIndexEntry,
  CmsPageIndexEntry,
  PostsIndex,
  PagesIndex,
  CmsPostStatus,
  CmsPageStatus,
} from './types';
import { getPool, ensureSchema, isUsingMysql } from './db';

// ─── JSON Fallback Paths ─────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), 'data', 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');
const POSTS_INDEX = path.join(POSTS_DIR, 'index.json');
const PAGES_INDEX = path.join(PAGES_DIR, 'index.json');
const REVISIONS_DIR = path.join(CONTENT_DIR, 'revisions');

let jsonWarningShown = false;

function warnJsonFallback(): void {
  if (!jsonWarningShown && !isUsingMysql()) {
    console.warn(
      '[CMS] ⚠️  DATABASE_URL not set — using JSON file storage. ' +
        'Content will NOT survive redeployment on Hostinger. ' +
        'Set DATABASE_URL in your .env to use MySQL for production.'
    );
    jsonWarningShown = true;
  }
}

// ─── JSON Helpers ────────────────────────────────────────────────────────────

async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateReadingTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function rowToPostIndex(row: any): CmsPostIndexEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    categorySlug: row.category_slug,
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    author: row.author,
    excerpt: row.excerpt,
    featuredImage: row.featured_image,
    readingTime: row.reading_time,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags ?? [],
  };
}

function rowToPageIndex(row: any): CmsPageIndexEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    featuredImage: row.featured_image,
  };
}

function rowToPost(row: any): CmsPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    category: row.category,
    categorySlug: row.category_slug,
    author: row.author,
    authorRole: row.author_role ?? '',
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    scheduledAt: row.scheduled_at ?? undefined,
    readingTime: row.reading_time ?? '',
    featuredImage: row.featured_image ?? '',
    imageAlt: row.image_alt ?? '',
    status: row.status,
    keyTakeaways: typeof row.key_takeaways === 'string' ? JSON.parse(row.key_takeaways) : row.key_takeaways ?? [],
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags ?? [],
    seoTitle: row.seo_title ?? '',
    seoDescription: row.seo_description ?? '',
    primaryKeyword: row.primary_keyword ?? '',
    secondaryKeywords: typeof row.secondary_keywords === 'string' ? JSON.parse(row.secondary_keywords) : row.secondary_keywords ?? [],
    ogImage: row.og_image ?? undefined,
    canonicalUrl: row.canonical_url ?? undefined,
  };
}

function rowToPage(row: any): CmsPage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content ?? '',
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    status: row.status,
    featuredImage: row.featured_image ?? '',
    imageAlt: row.image_alt ?? '',
    seoTitle: row.seo_title ?? '',
    seoDescription: row.seo_description ?? '',
    ogImage: row.og_image ?? undefined,
    canonicalUrl: row.canonical_url ?? undefined,
  };
}

function postToRow(post: CmsPost): any {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    category_slug: post.categorySlug,
    author: post.author,
    author_role: post.authorRole,
    published_at: post.publishedAt,
    updated_at: post.updatedAt,
    scheduled_at: post.scheduledAt ?? null,
    reading_time: post.readingTime,
    featured_image: post.featuredImage,
    image_alt: post.imageAlt,
    status: post.status,
    key_takeaways: JSON.stringify(post.keyTakeaways),
    tags: JSON.stringify(post.tags),
    seo_title: post.seoTitle,
    seo_description: post.seoDescription,
    primary_keyword: post.primaryKeyword,
    secondary_keywords: JSON.stringify(post.secondaryKeywords),
    og_image: post.ogImage ?? null,
    canonical_url: post.canonicalUrl ?? null,
  };
}

function pageToRow(page: CmsPage): any {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    content: page.content,
    published_at: page.publishedAt,
    updated_at: page.updatedAt,
    status: page.status,
    featured_image: page.featuredImage,
    image_alt: page.imageAlt,
    seo_title: page.seoTitle,
    seo_description: page.seoDescription,
    og_image: page.ogImage ?? null,
    canonical_url: page.canonicalUrl ?? null,
  };
}

// ─── Posts CRUD ──────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<CmsPostIndexEntry[]> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute('SELECT * FROM cms_posts ORDER BY published_at DESC');
    return (rows as any[]).map(rowToPostIndex);
  }
  warnJsonFallback();
  const index = await readJsonFile<PostsIndex>(POSTS_INDEX, { posts: [] });
  return index.posts;
}

export async function getPublishedPosts(): Promise<CmsPostIndexEntry[]> {
  const posts = await getAllPosts();
  return posts.filter(
    (p) =>
      p.status === 'published' ||
      (p.status === 'scheduled' && new Date(p.publishedAt) <= new Date())
  );
}

export async function getPostById(id: string): Promise<CmsPost | null> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute('SELECT * FROM cms_posts WHERE id = ?', [id]);
    const arr = rows as any[];
    return arr.length > 0 ? rowToPost(arr[0]) : null;
  }
  warnJsonFallback();
  const filePath = path.join(POSTS_DIR, `${id}.json`);
  return readJsonFile<CmsPost | null>(filePath, null);
}

export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute('SELECT * FROM cms_posts WHERE slug = ?', [slug]);
    const arr = rows as any[];
    return arr.length > 0 ? rowToPost(arr[0]) : null;
  }
  warnJsonFallback();
  const posts = await getAllPosts();
  const entry = posts.find((p) => p.slug === slug);
  if (!entry) return null;
  return getPostById(entry.id);
}

export async function getPublishedPostBySlug(slug: string): Promise<CmsPost | null> {
  const post = await getPostBySlug(slug);
  if (!post) return null;
  if (
    post.status === 'published' ||
    (post.status === 'scheduled' && new Date(post.publishedAt) <= new Date())
  ) {
    return post;
  }
  return null;
}

export async function createPost(post: CmsPost): Promise<CmsPost> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const row = postToRow(post);
    await pool.execute(
      `INSERT INTO cms_posts
       (id, slug, title, excerpt, content, category, category_slug, author, author_role,
        published_at, updated_at, scheduled_at, reading_time, featured_image, image_alt,
        status, key_takeaways, tags, seo_title, seo_description, primary_keyword,
        secondary_keywords, og_image, canonical_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        row.id, row.slug, row.title, row.excerpt, row.content, row.category,
        row.category_slug, row.author, row.author_role, row.published_at,
        row.updated_at, row.scheduled_at, row.reading_time, row.featured_image,
        row.image_alt, row.status, row.key_takeaways, row.tags, row.seo_title,
        row.seo_description, row.primary_keyword, row.secondary_keywords,
        row.og_image, row.canonical_url,
      ]
    );
    return post;
  }
  warnJsonFallback();
  await ensureDir(POSTS_DIR);
  const filePath = path.join(POSTS_DIR, `${post.id}.json`);
  await writeJsonFile(filePath, post);
  const index = await readJsonFile<PostsIndex>(POSTS_INDEX, { posts: [] });
  const entry: CmsPostIndexEntry = {
    id: post.id, slug: post.slug, title: post.title, category: post.category,
    categorySlug: post.categorySlug, status: post.status, publishedAt: post.publishedAt,
    updatedAt: post.updatedAt, author: post.author, excerpt: post.excerpt,
    featuredImage: post.featuredImage, readingTime: post.readingTime, tags: post.tags,
  };
  index.posts.push(entry);
  index.posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  await writeJsonFile(POSTS_INDEX, index);
  return post;
}

export async function updatePost(post: CmsPost): Promise<CmsPost> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    post.updatedAt = new Date().toISOString();
    post.readingTime = calculateReadingTime(post.content);
    await saveRevision(post.id, post);
    const row = postToRow(post);
    await pool.execute(
      `UPDATE cms_posts SET slug=?, title=?, excerpt=?, content=?, category=?,
       category_slug=?, author=?, author_role=?, published_at=?, updated_at=?,
       scheduled_at=?, reading_time=?, featured_image=?, image_alt=?, status=?,
       key_takeaways=?, tags=?, seo_title=?, seo_description=?, primary_keyword=?,
       secondary_keywords=?, og_image=?, canonical_url=? WHERE id=?`,
      [
        row.slug, row.title, row.excerpt, row.content, row.category,
        row.category_slug, row.author, row.author_role, row.published_at,
        row.updated_at, row.scheduled_at, row.reading_time, row.featured_image,
        row.image_alt, row.status, row.key_takeaways, row.tags, row.seo_title,
        row.seo_description, row.primary_keyword, row.secondary_keywords,
        row.og_image, row.canonical_url, row.id,
      ]
    );
    return post;
  }
  warnJsonFallback();
  await ensureDir(POSTS_DIR);
  post.updatedAt = new Date().toISOString();
  post.readingTime = calculateReadingTime(post.content);
  await saveRevision(post.id, post);
  const filePath = path.join(POSTS_DIR, `${post.id}.json`);
  await writeJsonFile(filePath, post);
  const index = await readJsonFile<PostsIndex>(POSTS_INDEX, { posts: [] });
  const entryIndex = index.posts.findIndex((p) => p.id === post.id);
  if (entryIndex >= 0) {
    index.posts[entryIndex] = {
      id: post.id, slug: post.slug, title: post.title, category: post.category,
      categorySlug: post.categorySlug, status: post.status, publishedAt: post.publishedAt,
      updatedAt: post.updatedAt, author: post.author, excerpt: post.excerpt,
      featuredImage: post.featuredImage, readingTime: post.readingTime, tags: post.tags,
    };
  }
  index.posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  await writeJsonFile(POSTS_INDEX, index);
  return post;
}

export async function deletePost(id: string): Promise<boolean> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [result] = await pool.execute('DELETE FROM cms_posts WHERE id = ?', [id]);
    await pool.execute('DELETE FROM cms_revisions WHERE content_id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
  warnJsonFallback();
  const filePath = path.join(POSTS_DIR, `${id}.json`);
  try { await fs.unlink(filePath); } catch { return false; }
  const index = await readJsonFile<PostsIndex>(POSTS_INDEX, { posts: [] });
  index.posts = index.posts.filter((p) => p.id !== id);
  await writeJsonFile(POSTS_INDEX, index);
  return true;
}

// ─── Pages CRUD ──────────────────────────────────────────────────────────────

export async function getAllPages(): Promise<CmsPageIndexEntry[]> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute('SELECT * FROM cms_pages ORDER BY published_at DESC');
    return (rows as any[]).map(rowToPageIndex);
  }
  warnJsonFallback();
  const index = await readJsonFile<PagesIndex>(PAGES_INDEX, { pages: [] });
  return index.pages;
}

export async function getPublishedPages(): Promise<CmsPageIndexEntry[]> {
  const pages = await getAllPages();
  return pages.filter((p) => p.status === 'published');
}

export async function getPageById(id: string): Promise<CmsPage | null> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute('SELECT * FROM cms_pages WHERE id = ?', [id]);
    const arr = rows as any[];
    return arr.length > 0 ? rowToPage(arr[0]) : null;
  }
  warnJsonFallback();
  const filePath = path.join(PAGES_DIR, `${id}.json`);
  return readJsonFile<CmsPage | null>(filePath, null);
}

export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute('SELECT * FROM cms_pages WHERE slug = ?', [slug]);
    const arr = rows as any[];
    return arr.length > 0 ? rowToPage(arr[0]) : null;
  }
  warnJsonFallback();
  const pages = await getAllPages();
  const entry = pages.find((p) => p.slug === slug);
  if (!entry) return null;
  return getPageById(entry.id);
}

export async function getPublishedPageBySlug(slug: string): Promise<CmsPage | null> {
  const page = await getPageBySlug(slug);
  if (!page) return null;
  if (page.status === 'published') return page;
  return null;
}

export async function createPage(page: CmsPage): Promise<CmsPage> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const row = pageToRow(page);
    await pool.execute(
      `INSERT INTO cms_pages
       (id, slug, title, content, published_at, updated_at, status,
        featured_image, image_alt, seo_title, seo_description, og_image, canonical_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        row.id, row.slug, row.title, row.content, row.published_at,
        row.updated_at, row.status, row.featured_image, row.image_alt,
        row.seo_title, row.seo_description, row.og_image, row.canonical_url,
      ]
    );
    return page;
  }
  warnJsonFallback();
  await ensureDir(PAGES_DIR);
  const filePath = path.join(PAGES_DIR, `${page.id}.json`);
  await writeJsonFile(filePath, page);
  const index = await readJsonFile<PagesIndex>(PAGES_INDEX, { pages: [] });
  const entry: CmsPageIndexEntry = {
    id: page.id, slug: page.slug, title: page.title, status: page.status,
    publishedAt: page.publishedAt, updatedAt: page.updatedAt, featuredImage: page.featuredImage,
  };
  index.pages.push(entry);
  index.pages.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  await writeJsonFile(PAGES_INDEX, index);
  return page;
}

export async function updatePage(page: CmsPage): Promise<CmsPage> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    page.updatedAt = new Date().toISOString();
    await saveRevision(page.id, page);
    const row = pageToRow(page);
    await pool.execute(
      `UPDATE cms_pages SET slug=?, title=?, content=?, published_at=?, updated_at=?,
       status=?, featured_image=?, image_alt=?, seo_title=?, seo_description=?,
       og_image=?, canonical_url=? WHERE id=?`,
      [
        row.slug, row.title, row.content, row.published_at, row.updated_at,
        row.status, row.featured_image, row.image_alt, row.seo_title,
        row.seo_description, row.og_image, row.canonical_url, row.id,
      ]
    );
    return page;
  }
  warnJsonFallback();
  await ensureDir(PAGES_DIR);
  page.updatedAt = new Date().toISOString();
  await saveRevision(page.id, page);
  const filePath = path.join(PAGES_DIR, `${page.id}.json`);
  await writeJsonFile(filePath, page);
  const index = await readJsonFile<PagesIndex>(PAGES_INDEX, { pages: [] });
  const entryIndex = index.pages.findIndex((p) => p.id === page.id);
  if (entryIndex >= 0) {
    index.pages[entryIndex] = {
      id: page.id, slug: page.slug, title: page.title, status: page.status,
      publishedAt: page.publishedAt, updatedAt: page.updatedAt, featuredImage: page.featuredImage,
    };
  }
  index.pages.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  await writeJsonFile(PAGES_INDEX, index);
  return page;
}

export async function deletePage(id: string): Promise<boolean> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [result] = await pool.execute('DELETE FROM cms_pages WHERE id = ?', [id]);
    await pool.execute('DELETE FROM cms_revisions WHERE content_id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
  warnJsonFallback();
  const filePath = path.join(PAGES_DIR, `${id}.json`);
  try { await fs.unlink(filePath); } catch { return false; }
  const index = await readJsonFile<PagesIndex>(PAGES_INDEX, { pages: [] });
  index.pages = index.pages.filter((p) => p.id !== id);
  await writeJsonFile(PAGES_INDEX, index);
  return true;
}

// ─── Revisions ───────────────────────────────────────────────────────────────

async function saveRevision(contentId: string, snapshot: CmsPost | CmsPage): Promise<void> {
  if (isUsingMysql()) {
    const pool = getPool()!;
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    // Keep only last 20 revisions per content
    await pool.execute(
      `DELETE FROM cms_revisions WHERE content_id = ? AND id NOT IN (
        SELECT id FROM (
          SELECT id FROM cms_revisions WHERE content_id = ? ORDER BY timestamp DESC LIMIT 19
        ) AS keep
      )`,
      [contentId, contentId]
    );
    await pool.execute(
      'INSERT INTO cms_revisions (id, content_id, timestamp, snapshot) VALUES (?, ?, ?, ?)',
      [id, contentId, timestamp, JSON.stringify(snapshot)]
    );
    return;
  }
  warnJsonFallback();
  await ensureDir(REVISIONS_DIR);
  const revision = {
    id: crypto.randomUUID(),
    contentId,
    timestamp: new Date().toISOString(),
    snapshot,
  };
  const filePath = path.join(REVISIONS_DIR, `${contentId}.json`);
  let revisions = await readJsonFile<Array<typeof revision>>(filePath, []);
  revisions.push(revision);
  if (revisions.length > 20) {
    revisions = revisions.slice(-20);
  }
  await writeJsonFile(filePath, revisions);
}

export async function getRevisions(
  contentId: string
): Promise<Array<{ id: string; timestamp: string; snapshot: CmsPost | CmsPage }>> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [rows] = await pool.execute(
      'SELECT * FROM cms_revisions WHERE content_id = ? ORDER BY timestamp DESC LIMIT 20',
      [contentId]
    );
    return (rows as any[]).map((r: any) => ({
      id: r.id,
      timestamp: r.timestamp,
      snapshot: typeof r.snapshot === 'string' ? JSON.parse(r.snapshot) : r.snapshot,
    }));
  }
  warnJsonFallback();
  const filePath = path.join(REVISIONS_DIR, `${contentId}.json`);
  return readJsonFile(filePath, []);
}

// ─── Slug Uniqueness ─────────────────────────────────────────────────────────

export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [postRows] = await pool.execute(
      'SELECT id FROM cms_posts WHERE slug = ?' + (excludeId ? ' AND id != ?' : ''),
      excludeId ? [slug, excludeId] : [slug]
    );
    if ((postRows as any[]).length > 0) return false;
    const [pageRows] = await pool.execute(
      'SELECT id FROM cms_pages WHERE slug = ?' + (excludeId ? ' AND id != ?' : ''),
      excludeId ? [slug, excludeId] : [slug]
    );
    return (pageRows as any[]).length === 0;
  }
  warnJsonFallback();
  const posts = await getAllPosts();
  const pages = await getAllPages();
  const allSlugs = [...posts, ...pages]
    .filter((item) => item.id !== excludeId)
    .map((item) => item.slug);
  return !allSlugs.includes(slug);
}

export async function getAllExistingSlugs(): Promise<string[]> {
  if (isUsingMysql()) {
    await ensureSchema();
    const pool = getPool()!;
    const [postRows] = await pool.execute('SELECT slug FROM cms_posts');
    const [pageRows] = await pool.execute('SELECT slug FROM cms_pages');
    return [
      ...(postRows as any[]).map((r: any) => r.slug),
      ...(pageRows as any[]).map((r: any) => r.slug),
    ];
  }
  warnJsonFallback();
  const posts = await getAllPosts();
  const pages = await getAllPages();
  return [...posts.map((p) => p.slug), ...pages.map((p) => p.slug)];
}
