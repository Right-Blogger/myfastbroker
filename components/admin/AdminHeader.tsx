'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Menu, ExternalLink, LogOut } from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
}

const pageTitleMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/posts': 'Posts',
  '/admin/posts/new': 'New Post',
  '/admin/pages': 'Pages',
  '/admin/pages/new': 'New Page',
};

function getPageTitle(pathname: string): string {
  // Check exact matches first
  if (pageTitleMap[pathname]) return pageTitleMap[pathname];

  // Check dynamic routes
  if (pathname.match(/^\/admin\/posts\/[^/]+\/edit$/)) return 'Edit Post';
  if (pathname.match(/^\/admin\/pages\/[^/]+\/edit$/)) return 'Edit Page';
  if (pathname.startsWith('/admin/posts/')) return 'Post';
  if (pathname.startsWith('/admin/pages/')) return 'Page';

  return 'Admin';
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pageTitle = getPageTitle(pathname);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-[#050505]/80 px-4 backdrop-blur-xl sm:px-6">
      {/* Hamburger toggle */}
      <button
        onClick={onToggleSidebar}
        className="mr-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop hamburger (always visible for sidebar toggle) */}
      <button
        onClick={onToggleSidebar}
        className="mr-4 hidden rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:block"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        <a
          href="/blog/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-white/20 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">View Site</span>
        </a>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </span>
        </button>
      </div>
    </header>
  );
}
