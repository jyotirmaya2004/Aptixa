'use client';

import React, { useState } from 'react';
import { ArticleCard } from '@/components/ui/ArticleCard';
import type { Article } from '@/lib/schema';
import { fetchMoreArticlesAction } from './actions';
import { Loader2 } from 'lucide-react';

interface CurrentAffairsFeedClientProps {
  initialArticles: Article[];
  initialNextPage: string | null;
  initialHasMore: boolean;
}

export function CurrentAffairsFeedClient({
  initialArticles,
  initialNextPage,
  initialHasMore,
}: CurrentAffairsFeedClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [nextPage, setNextPage] = useState<string | null>(initialNextPage);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const nextPageNum = pageNumber + 1;
      const response = await fetchMoreArticlesAction({
        pageNumber: nextPageNum,
        nextPageCursor: nextPage,
      });

      if (response.articles.length > 0) {
        setArticles((prev) => [...prev, ...response.articles]);
        setNextPage(response.nextPage);
        setHasMore(response.hasMore);
        setPageNumber(nextPageNum);
      } else {
        setHasMore(false);
      }
    } catch {
      // Gracefully stop pagination on network anomaly
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (articles.length === 0) {
    return (
      <div className="rounded-[28px] bg-white p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.04] max-w-lg mx-auto">
        <h2 className="font-serif text-xl font-bold text-[#181E4B] mb-2">
          No Dispatches Available
        </h2>
        <p className="font-sans text-sm text-[#5E6282]">
          Real-time dispatches are temporarily unavailable. Please check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 4-Column Responsive Dispatches Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {articles.map((article, idx) => (
          <ArticleCard key={`${article.id}-${idx}`} article={article} />
        ))}
      </div>

      {/* Load More Pagination */}
      {hasMore && (
        <div className="mt-12 mb-6 flex justify-center">
          <button
            type="button"
            onClick={handleReadMore}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#F1A501]" aria-hidden="true" />
                <span>Fetching Dispatches...</span>
              </>
            ) : (
              <span>Read More</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
