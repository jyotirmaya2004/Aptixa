'use server';

import { fetchLiveCurrentAffairs } from '@/lib/news';
import type { Article } from '@/lib/schema';

export interface FetchMoreArticlesResponse {
  articles: Article[];
  nextPage: string | null;
  hasMore: boolean;
}

export async function fetchMoreArticlesAction(params: {
  pageNumber: number;
  nextPageCursor?: string | null;
}): Promise<FetchMoreArticlesResponse> {
  const result = await fetchLiveCurrentAffairs(
    params.nextPageCursor || undefined,
    params.pageNumber
  );

  return {
    articles: result.data.articles,
    nextPage: result.nextPage,
    hasMore: result.hasMore,
  };
}
