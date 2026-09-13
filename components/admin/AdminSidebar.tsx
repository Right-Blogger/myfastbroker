'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, File, ExternalLink, X } from 'lucide-react';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Posts', icon: FileText },
  { href: '/admin/pages', label: 'Pages', icon: File },
  { href: '/blog/', label: 'View Site', icon: ExternalLink, external: true },
];

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#08080a] transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="text-lg font-semibold text-white">MyFastBroker CMS</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 text-blue-400 shadow-[inset_0_1px_0_rgba(59,130,246,0.2)]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {link.label}
                {link.external && (
                  <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-40" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-xs text-gray-500">MyFastBroker CMS v1.0</p>
        </div>
      </aside>
    </>
  );
}
