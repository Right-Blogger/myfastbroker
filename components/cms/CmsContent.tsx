import React from 'react';

interface CmsContentProps {
  html: string;
}

export default function CmsContent({ html }: CmsContentProps) {
  return (
    <div
      className="prose prose-invert prose-lg max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-p:text-gray-300 prose-p:leading-relaxed
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white
        prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-[#0c0c0e] prose-pre:border prose-pre:border-white/10
        prose-blockquote:border-blue-500/40 prose-blockquote:text-gray-400 prose-blockquote:bg-blue-500/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1
        prose-img:rounded-xl prose-img:border prose-img:border-white/10
        prose-table:border-collapse
        prose-th:text-white prose-th:font-semibold prose-th:border prose-th:border-white/10 prose-th:px-4 prose-th:py-2
        prose-td:text-gray-300 prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2
        prose-li:text-gray-300 prose-li:marker:text-blue-400
        prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
