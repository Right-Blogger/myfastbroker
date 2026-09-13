'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageForm from '@/components/admin/PageForm';
import { ArrowLeft } from 'lucide-react';

export default function NewPagePage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: Record<string, unknown>) => {
    setError('');

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (res.ok) {
        router.push('/admin/pages');
      } else {
        const body = await res.json();
        setError(body.message || 'Failed to create page');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/pages"
          className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-white">New Page</h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <PageForm onSubmit={handleSubmit} />
    </div>
  );
}
