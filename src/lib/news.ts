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

/**
 * Fetches live, on-demand Current Affairs directly from NewsData.io.
 * Never persists or stores the articles to disk or database.
 * Executes on each user request with cache: 'no-store'.
 */
export async function fetchLiveCurrentAffairs(
  categoryQuery?: string
): Promise<{ data: CurrentAffairs; isLive: boolean }> {
  const apiKey = process.env.NEWSDATA_API_KEY || env.NEWSDATA_API_KEY;

  if (apiKey) {
    try {
      const url = new URL('https://newsdata.io/api/1/latest');
      url.searchParams.set('apikey', apiKey);
      url.searchParams.set('country', 'in');
      url.searchParams.set('language', 'en');

      if (categoryQuery && categoryQuery !== 'all') {
        url.searchParams.set('category', categoryQuery);
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
              totalArticles: articles.length,
              articles,
            },
            isLive: true,
          };
        }
      }
    } catch {
      // Silently fall back to cached dataset if network or quota threshold met
    }
  }

  // Graceful fallback to local reference dataset (read-only, no writing)
  try {
    const fallbackRaw = await readJsonFile<unknown>('dailyCurrentAffairs.json');
    return {
      data: CurrentAffairsSchema.parse(fallbackRaw),
      isLive: false,
    };
  } catch {
    return {
      data: {
        lastFetchedDate: 'Live Feed',
        totalArticles: 0,
        articles: [],
      },
      isLive: false,
    };
  }
}
