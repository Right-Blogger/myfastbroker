'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2, FileText } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  status: string;
  category: string;
  createdAt: string;
}

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = () => {
    fetch('/api/posts')
      .then((res) => {
        if (res.status === 401) {
          router.push('/admin/login');
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [router]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/posts/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      }
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: 'bg-green-500/10 text-green-400',
      draft: 'bg-yellow-500/10 text-yellow-400',
      scheduled: 'bg-blue-500/10 text-blue-400',
    };
    return styles[status] || 'bg-white/10 text-white/50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-4">
                <div className="h-4 flex-1 rounded bg-white/10" />
                <div className="h-4 w-20 rounded bg-white/10" />
                <div className="h-5 w-16 rounded-full bg-white/10" />
                <div className="h-4 w-24 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] py-16">
          <FileText className="mb-4 h-12 w-12 text-white/10" />
          <p className="text-sm text-white/40">No posts yet</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            <Plus className="h-4 w-4" />
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 font-medium text-white/50">Title</th>
                  <th className="px-4 py-3 font-medium text-white/50">Category</th>
                  <th className="px-4 py-3 font-medium text-white/50">Status</th>
                  <th className="px-4 py-3 font-medium text-white/50">Date</th>
                  <th className="px-4 py-3 font-medium text-white/50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white">{post.title}</td>
                    <td className="px-4 py-3 text-white/50">{post.category || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="rounded-md p-1.5 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Delete Post</h3>
            <p className="mt-2 text-sm text-white/50">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
