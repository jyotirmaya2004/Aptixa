import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';
import { ExternalLink, Calendar, Globe } from 'lucide-react';

export interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article
      className={cn(
        'group flex flex-col justify-between rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/[0.04] overflow-hidden hover:shadow-[0_16px_40px_rgba(24,30,75,0.07)] hover:-translate-y-1 transition-all duration-200',
        className
      )}
    >
      <div>
        {article.urlToImage && (
          <div className="relative h-36 w-full overflow-hidden bg-slate-50">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
            <span className="flex items-center gap-1 text-[#DF6951] bg-[#DF6951]/10 px-2.5 py-0.5 rounded-full text-[0.6875rem] font-bold uppercase tracking-wider">
              <Globe size={11} aria-hidden="true" />
              <span className="truncate max-w-[120px]">{article.source || 'Dispatch'}</span>
            </span>
            {formattedDate && (
              <span className="flex items-center gap-1 text-[0.6875rem] font-medium text-[#5E6282]">
                <Calendar size={11} aria-hidden="true" />
                <span>{formattedDate}</span>
              </span>
            )}
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-[#181E4B] tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-[#DF6951] transition-colors">
            {article.title}
          </h3>

          <p className="font-sans text-xs text-[#5E6282] leading-relaxed line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-1 flex items-center justify-between">
        <span className="bg-[#181E4B]/5 text-[#181E4B] px-2.5 py-0.5 rounded-full text-[0.6875rem] font-semibold truncate max-w-[120px]">
          {article.category || 'General'}
        </span>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-[0.6875rem] font-bold uppercase tracking-wider text-[#F1A501] hover:text-[#d99100] transition-colors"
        >
          <span>Dispatch</span>
          <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
