'use client';

import { useState } from 'react';
import { BLOG_CATEGORIES } from '@/data/blog-articles';
import TipTapEditor from '@/components/admin/TipTapEditor';
import { Plus, X, Loader2 } from 'lucide-react';

interface PostFormData {
  id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  categorySlug?: string;
  author?: string;
  authorRole?: string;
  featuredImage?: string;
  imageAlt?: string;
  status?: 'draft' | 'published' | 'scheduled';
  keyTakeaways?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: any) => Promise<void>;
  isEditing?: boolean;
}

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none';

const labelClasses = 'mb-1.5 block text-sm font-medium text-gray-300';

const selectClasses =
  'w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-2.5 text-sm text-white transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none';

export default function PostForm({
  initialData,
  onSubmit,
  isEditing = false,
}: PostFormProps) {
  const [form, setForm] = useState<PostFormData>({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    categorySlug: initialData?.categorySlug || '',
    author: initialData?.author || '',
    authorRole: initialData?.authorRole || '',
    featuredImage: initialData?.featuredImage || '',
    imageAlt: initialData?.imageAlt || '',
    status: initialData?.status || 'draft',
    keyTakeaways: initialData?.keyTakeaways || [],
    tags: initialData?.tags || [],
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    primaryKeyword: initialData?.primaryKeyword || '',
    secondaryKeywords: initialData?.secondaryKeywords || [],
    ogImage: initialData?.ogImage || '',
    canonicalUrl: initialData?.canonicalUrl || '',
  });

  const [newKeyTakeaway, setNewKeyTakeaway] = useState('');
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(', ') || ''
  );
  const [secondaryKeywordsInput, setSecondaryKeywordsInput] = useState(
    initialData?.secondaryKeywords?.join(', ') || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof PostFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addKeyTakeaway = () => {
    if (newKeyTakeaway.trim()) {
      updateField('keyTakeaways', [
        ...(form.keyTakeaways || []),
        newKeyTakeaway.trim(),
      ]);
      setNewKeyTakeaway('');
    }
  };

  const removeKeyTakeaway = (index: number) => {
    updateField(
      'keyTakeaways',
      (form.keyTakeaways || []).filter((_, i) => i !== index)
    );
  };

  const handleCategoryChange = (value: string) => {
    const category = BLOG_CATEGORIES.find((c) => c.slug === value);
    updateField('category', category?.name || '');
    updateField('categorySlug', value);
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    setIsSubmitting(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const secondaryKeywords = secondaryKeywordsInput
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

      await onSubmit({
        ...form,
        status,
        tags,
        secondaryKeywords,
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
              placeholder="Enter post title..."
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder="Brief description of the post..."
              rows={3}
              className={inputClasses}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>Category</label>
              <select
                value={form.categorySlug}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className={selectClasses}
              >
                <option value="">Select category...</option>
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Author name..."
                className={inputClasses}
              />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Author Role</label>
            <input
              type="text"
              value={form.authorRole}
              onChange={(e) => updateField('authorRole', e.target.value)}
              placeholder="e.g. Senior Broker Analyst"
              className={inputClasses}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Content</h2>
        <TipTapEditor
          content={form.content || ''}
          onChange={(html) => updateField('content', html)}
          placeholder="Write your post content..."
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
            <label className={labelClasses}>Primary Keyword</label>
            <input
              type="text"
              value={form.primaryKeyword}
              onChange={(e) => updateField('primaryKeyword', e.target.value)}
              placeholder="Main target keyword..."
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>
              Secondary Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={secondaryKeywordsInput}
              onChange={(e) => setSecondaryKeywordsInput(e.target.value)}
              placeholder="keyword1, keyword2, keyword3..."
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
        <div className="space-y-4">
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

          {/* Key Takeaways */}
          <div>
            <label className={labelClasses}>Key Takeaways</label>
            <div className="space-y-2">
              {(form.keyTakeaways || []).map((takeaway, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-2 text-sm text-white">
                    {takeaway}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeKeyTakeaway(index)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyTakeaway}
                  onChange={(e) => setNewKeyTakeaway(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyTakeaway();
                    }
                  }}
                  placeholder="Add a key takeaway..."
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={addKeyTakeaway}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={labelClasses}>Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="tag1, tag2, tag3..."
              className={inputClasses}
            />
          </div>
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
