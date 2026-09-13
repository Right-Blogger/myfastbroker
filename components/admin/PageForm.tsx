'use client';

import { useState, useMemo } from 'react';
import TipTapEditor from '@/components/admin/TipTapEditor';
import { Loader2 } from 'lucide-react';

interface PageFormData {
  id?: string;
  title?: string;
  content?: string;
  featuredImage?: string;
  imageAlt?: string;
  status?: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

interface PageFormProps {
  initialData?: PageFormData;
  onSubmit: (data: any) => Promise<void>;
  isEditing?: boolean;
}

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none';

const labelClasses = 'mb-1.5 block text-sm font-medium text-gray-300';

const selectClasses =
  'w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-2.5 text-sm text-white transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function PageForm({
  initialData,
  onSubmit,
  isEditing = false,
}: PageFormProps) {
  const [form, setForm] = useState<PageFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    featuredImage: initialData?.featuredImage || '',
    imageAlt: initialData?.imageAlt || '',
    status: initialData?.status || 'draft',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    ogImage: initialData?.ogImage || '',
    canonicalUrl: initialData?.canonicalUrl || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const slug = useMemo(() => slugify(form.title || ''), [form.title]);

  const updateField = (field: keyof PageFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...form,
        slug,
        status,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <section className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Basic Info</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter page title..."
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Slug</label>
            <input
              type="text"
              value={slug}
              readOnly
              placeholder="auto-generated-from-title"
              className={`${inputClasses} cursor-not-allowed opacity-60`}
            />
            <p className="mt-1 text-xs text-gray-500">
              Auto-generated from the title
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Content</h2>
        <TipTapEditor
          content={form.content || ''}
          onChange={(html) => updateField('content', html)}
          placeholder="Write your page content..."
        />
      </section>

      {/* Media */}
      <section className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Media</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Featured Image URL</label>
            <input
              type="url"
              value={form.featuredImage}
              onChange={(e) => updateField('featuredImage', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Image Alt Text</label>
            <input
              type="text"
              value={form.imageAlt}
              onChange={(e) => updateField('imageAlt', e.target.value)}
              placeholder="Describe the image..."
              className={inputClasses}
            />
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>SEO Title</label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              placeholder="SEO optimized title..."
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>SEO Description</label>
            <textarea
              value={form.seoDescription}
              onChange={(e) => updateField('seoDescription', e.target.value)}
              placeholder="Meta description for search engines..."
              rows={2}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>OG Image URL</label>
            <input
              type="url"
              value={form.ogImage}
              onChange={(e) => updateField('ogImage', e.target.value)}
              placeholder="https://example.com/og-image.jpg"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Canonical URL</label>
            <input
              type="url"
              value={form.canonicalUrl}
              onChange={(e) => updateField('canonicalUrl', e.target.value)}
              placeholder="https://example.com/canonical-url"
              className={inputClasses}
            />
          </div>
        </div>
      </section>

      {/* Publishing */}
      <section className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Publishing</h2>
        <div>
          <label className={labelClasses}>Status</label>
          <select
            value={form.status}
            onChange={(e) => updateField('status', e.target.value)}
            className={selectClasses}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={() => handleSubmit('draft')}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('published')}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditing ? 'Update' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
