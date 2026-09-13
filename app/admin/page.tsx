'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Layout, Edit3, Eye, Plus, ArrowRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  status: string;
  category: string;
  createdAt: string;
}

interface Page {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

function StatCard({
  label,
  value,
  icon: Icon,
  accentColor,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accentColor: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/40">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-white/10" />
          <div className="h-7 w-12 rounded bg-white/10" />
        </div>
        <div className="h-10 w-10 rounded-lg bg-white/10" />
      </div>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-48 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/posts').then((res) => {
        if (res.status === 401) {
          router.push('/admin/login');
          return [];
        }
        return res.json();
      }),
      fetch('/api/pages').then((res) => {
        if (res.status === 401) {
          router.push('/admin/login');
          return [];
        }
        return res.json();
      }),
    ]).then(([postsData, pagesData]) => {
      setPosts(Array.isArray(postsData) ? postsData : []);
      setPages(Array.isArray(pagesData) ? pagesData : []);
      setLoading(false);
    });
  }, [router]);

  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const draftPosts = posts.filter((p) => p.status === 'draft').length;

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
            New Page
          </Link>
        </div>
      </div>

      {loading ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <SkeletonList />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Posts" value={posts.length} icon={FileText} accentColor="bg-blue-500/10 text-blue-400" />
            <StatCard label="Published" value={publishedPosts} icon={Eye} accentColor="bg-green-500/10 text-green-400" />
            <StatCard label="Drafts" value={draftPosts} icon={Edit3} accentColor="bg-yellow-500/10 text-yellow-400" />
            <StatCard label="Total Pages" value={pages.length} icon={Layout} accentColor="bg-purple-500/10 text-purple-400" />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Posts</h2>
              <Link href="/admin/posts" className="text-sm text-white/40 hover:text-white/60">
                View all
              </Link>
            </div>
            {recentPosts.length === 0 ? (
              <p className="py-8 text-center text-sm text-white/30">No posts yet. Create your first post!</p>
            ) : (
              <div className="space-y-2">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/admin/posts/${post.id}`}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{post.title}</p>
                      <p className="text-xs text-white/30">{post.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {post.status}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/20" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
