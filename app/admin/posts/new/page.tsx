'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: Record<string, unknown>) => {
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        const body = await res.json();
        setError(body.message || 'Failed to create post');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/posts"
          className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">New Post</h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
