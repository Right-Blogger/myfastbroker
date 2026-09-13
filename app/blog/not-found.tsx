'use client';

import Link from 'next/link';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';
import { ArrowLeft } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] flex flex-col font-sans">
      <BlogHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="text-6xl font-black text-white/10">404</div>
          <h1 className="text-2xl font-extrabold text-white">Article Not Found</h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            The article you are looking for may have been moved, renamed, or does not exist.
          </p>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 accent-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
