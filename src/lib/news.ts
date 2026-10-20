import { z } from 'zod';
import { env } from './env';
import { readJsonFile } from './data';
import { CurrentAffairsSchema, type CurrentAffairs, type Article } from './schema';

/**
 * Raw article schema from NewsData.io API response
 */
const NewsDataRawArticleSchema = z.object({
  article_id: z.string(),
  title: z.string(),
  link: z.string(),
  description: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  pubDate: z.string().optional(),
  image_url: z.string().nullable().optional(),
  source_name: z.string().nullable().optional(),
  source_id: z.string().nullable().optional(),
  category: z.array(z.string()).optional(),
  creator: z.array(z.string()).nullable().optional(),
  country: z.array(z.string()).optional(),
  language: z.string().optional(),
});

const NewsDataResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number().optional(),
  results: z.array(NewsDataRawArticleSchema).default([]),
  nextPage: z.union([z.string(), z.number()]).nullable().optional(),
});

/**
 * Normalizes raw NewsData article into standardized portal Article
 */
function normalizeNewsDataArticle(raw: z.infer<typeof NewsDataRawArticleSchema>): Article {
  const primaryCategory =
    raw.category && raw.category.length > 0 && raw.category[0]
      ? raw.category[0].charAt(0).toUpperCase() + raw.category[0].slice(1)
      : 'General Awareness';

  const sourceTitle =
    raw.source_name ||
    (raw.creator && raw.creator.length > 0 && raw.creator[0]
      ? raw.creator[0]
      : 'Top Dispatch');

  return {
    id: raw.article_id,
    title: raw.title,
    description:
      raw.description && raw.description.trim().length > 0
        ? raw.description.trim()
        : raw.title,
    url: raw.link,
    urlToImage: raw.image_url || undefined,
    publishedAt: raw.pubDate,
    source: sourceTitle,
    category: primaryCategory,
  };
}

export interface FetchCurrentAffairsResult {
  data: CurrentAffairs;
  isLive: boolean;
  nextPage: string | null;
  hasMore: boolean;
}

/**
 * Fetches live, on-demand Current Affairs directly from NewsData.io (10 articles per request).
 * Never persists or stores the articles to disk or database.
 * Executes on each user request with cache: 'no-store'.
 */
export async function fetchLiveCurrentAffairs(
  pageCursor?: string,
  pageNumber: number = 1
): Promise<FetchCurrentAffairsResult> {
  const apiKey = process.env.NEWSDATA_API_KEY || env.NEWSDATA_API_KEY;

  if (apiKey) {
    try {
      const url = new URL('https://newsdata.io/api/1/latest');
      url.searchParams.set('apikey', apiKey);
      url.searchParams.set('country', 'in');
      url.searchParams.set('language', 'en');

      if (pageCursor) {
        url.searchParams.set('page', pageCursor);
      }

      // Live on-demand fetch: never cached, never stored
      const response = await fetch(url.toString(), {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Aptixa-Placement-Portal/1.0',
        },
      });

      if (response.ok) {
        const json = await response.json();
        const parsed = NewsDataResponseSchema.safeParse(json);

        if (parsed.success && parsed.data.results.length > 0) {
          const articles = parsed.data.results.map(normalizeNewsDataArticle);
          const nextPageStr = parsed.data.nextPage ? String(parsed.data.nextPage) : null;

          const now = new Date();
          const formattedDate = now.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          return {
            data: {
              lastFetchedDate: formattedDate,
              lastFetchedTimestamp: now.toISOString(),
              totalArticles: parsed.data.totalResults || articles.length,
              articles,
            },
            isLive: true,
            nextPage: nextPageStr,
            hasMore: Boolean(nextPageStr),
          };
        }
      }
    } catch {
      // Silently fall back to cached dataset if network or quota threshold met
    }
  }

  // Graceful fallback to local reference dataset (read-only, 10 articles per page)
  try {
    const fallbackRaw = await readJsonFile<unknown>('dailyCurrentAffairs.json');
    const parsed = CurrentAffairsSchema.parse(fallbackRaw);
    const allArticles = parsed.articles;
    const PAGE_SIZE = 10;
    const startIndex = (pageNumber - 1) * PAGE_SIZE;
    const paginatedArticles = allArticles.slice(startIndex, startIndex + PAGE_SIZE);
    const hasMore = startIndex + PAGE_SIZE < allArticles.length;
    const nextPage = hasMore ? String(pageNumber + 1) : null;

    return {
      data: {
        lastFetchedDate: parsed.lastFetchedDate,
        lastFetchedTimestamp: parsed.lastFetchedTimestamp,
        totalArticles: allArticles.length,
        articles: paginatedArticles,
      },
      isLive: false,
      nextPage,
      hasMore,
    };
  } catch {
    return {
      data: {
        lastFetchedDate: 'Live Feed',
        totalArticles: 0,
        articles: [],
      },
      isLive: false,
      nextPage: null,
      hasMore: false,
    };
  }
}
