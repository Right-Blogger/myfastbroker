import { MetadataRoute } from 'next';
import { BLOG_ARTICLES } from '@/data/blog-articles';
import { getPublishedPosts, getPublishedPages } from '@/lib/content/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://myfastbroker.news';

  const blogUrls: MetadataRoute.Sitemap = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}/`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // CMS posts
  let cmsPostUrls: MetadataRoute.Sitemap = [];
  let cmsPageUrls: MetadataRoute.Sitemap = [];

  try {
    const cmsPosts = await getPublishedPosts();
    cmsPostUrls = cmsPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch {}

  try {
    const cmsPages = await getPublishedPages();
    cmsPageUrls = cmsPages.map((page) => ({
      url: `${baseUrl}/pages/${page.slug}/`,
      lastModified: new Date(page.updatedAt || page.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {}

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
    ...cmsPostUrls,
    ...cmsPageUrls,
  ];
}
