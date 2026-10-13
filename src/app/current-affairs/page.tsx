import { fetchLiveCurrentAffairs } from '@/lib/news';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/ui/ArticleCard';
import Link from 'next/link';
import type { Metadata } from 'next';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Daily Current Affairs & General Awareness — Aptixa',
  description:
    'Real-time live news dispatches and current affairs for competitive placement examinations and civil service readiness, powered by NewsData.io.',
};

const CATEGORIES = [
  { id: 'all', label: 'All Dispatches' },
  { id: 'top', label: 'Top Stories' },
  { id: 'business', label: 'Business & Economy' },
  { id: 'technology', label: 'Technology' },
  { id: 'education', label: 'Education & Policy' },
  { id: 'politics', label: 'Governance & Law' },
  { id: 'science', label: 'Science & Environment' },
  { id: 'sports', label: 'Sports & Honors' },
];

interface CurrentAffairsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CurrentAffairsPage({
  searchParams,
}: CurrentAffairsPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || 'all';

  const { data } = await fetchLiveCurrentAffairs(
    currentCategory === 'all' ? undefined : currentCategory
  );

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 lg:px-12">
        {/* Page Header */}
        <div className="mb-10 max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B]">
            Daily Current Affairs & Latest Dispatches
          </h1>
        </div>

        {/* Live Filter Bar & Refresh Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Current Affairs Categories">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.id;
              const href = cat.id === 'all' ? '/current-affairs' : `/current-affairs?category=${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-bold transition-all duration-150',
                    isActive
                      ? 'bg-[#181E4B] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-[#5E6282] hover:text-[#181E4B] border border-black/[0.06]'
                  )}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          <Link
            href={currentCategory === 'all' ? '/current-affairs' : `/current-affairs?category=${currentCategory}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#F8F9FF] border border-black/[0.06] text-xs font-bold text-[#181E4B] hover:text-[#DF6951] transition-colors shadow-2xs group"
          >
            <RefreshCw size={13} className="group-hover:rotate-180 transition-transform duration-500 text-[#DF6951]" aria-hidden="true" />
            <span>Refresh Dispatches</span>
          </Link>
        </div>

        {/* Article Matrix Grid */}
        {data.articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] bg-white p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.04] max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-bold text-[#181E4B] mb-2">
              No Dispatches Found
            </h3>
            <p className="font-sans text-sm text-[#5E6282] mb-6">
              There are currently no real-time articles available under this specific filter.
            </p>
            <Link
              href="/current-affairs"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#181E4B] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-black transition-all"
            >
              Reset to All Dispatches
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
