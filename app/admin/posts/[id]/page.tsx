'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import PostForm from '@/components/admin/PostForm';
import { ArrowLeft } from 'lucide-react';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (res.status === 401) {
          router.push('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      });
  }, [id, router]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (res.ok) {
        setSuccess('Post updated successfully');
        const updated = await res.json();
        if (updated) setPost(updated);
      } else {
        const body = await res.json();
        setError(body.message || 'Failed to update post');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-lg bg-white/10" />
          <div className="h-8 w-32 rounded bg-white/10" />
        </div>
        <div className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded-lg bg-white/10" />
          <div className="h-64 w-full animate-pulse rounded-lg bg-white/10" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-white/40">Post not found</p>
        <Link href="/admin/posts" className="mt-4 text-sm text-white/60 hover:text-white">
          Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Post</h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {success && (
        <div className="rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-400">{success}</div>
      )}

      <PostForm initialData={post} onSubmit={handleSubmit} isEditing />
    </div>
  );
}
