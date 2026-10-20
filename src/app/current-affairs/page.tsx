import { fetchLiveCurrentAffairs } from '@/lib/news';
import { Footer } from '@/components/layout/Footer';
import { CurrentAffairsFeedClient } from './CurrentAffairsFeedClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Daily Current Affairs & General Awareness — Aptixa',
  description:
    'Real-time live news dispatches and current affairs for competitive placement examinations and civil service readiness, powered by NewsData.io.',
};

export default async function CurrentAffairsPage() {
  const { data, nextPage, hasMore } = await fetchLiveCurrentAffairs(undefined, 1);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 lg:px-12">
        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B]">
            Daily Current Affairs & Latest Dispatches
          </h1>
        </div>

        {/* Current Affairs Feed with Read More pagination */}
        <CurrentAffairsFeedClient
          initialArticles={data.articles}
          initialNextPage={nextPage}
          initialHasMore={hasMore}
        />
      </main>

      <Footer />
    </div>
  );
}
