import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getBooks } from '@/lib/data';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { Folder, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Standard Textbooks — Aptixa',
  description:
    'Authoritative reference textbooks for placement and competitive examinations, including R.S. Aggarwal Quantitative Aptitude and Arun Sharma Logical Reasoning.',
};

interface BooksPageProps {
  searchParams: Promise<{ book?: string }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const resolvedParams = await searchParams;
  if (resolvedParams.book) {
    redirect(`/books/${resolvedParams.book}`);
  }

  const books = await getBooks();

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 lg:px-12">
        <h1 className="sr-only">Prescribed Textbooks</h1>

        {/* Open Folder Navigation (No rigid boxes, clean architectural directory) */}
        <div className="max-w-4xl mx-auto pt-6 space-y-4">
          {books.map((book) => {
            const isQuant = book.category === 'quantitative';
            const totalMCQs = book.chapters.reduce((acc, ch) => acc + (ch.question_count || 0), 0);

            return (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 px-6 sm:px-8 hover:bg-white/80 rounded-2xl transition-all duration-200 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Folder size={20} className="text-[#DF6951] stroke-[2.2]" aria-hidden="true" />
                    <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-wider text-[#DF6951]">
                      {isQuant ? 'Quantitative Aptitude' : 'Logical Reasoning'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-sans text-xs text-[#5E6282]">
                      {book.chapters.length} Chapters • {totalMCQs.toLocaleString()} MCQs
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181E4B] group-hover:text-[#DF6951] transition-colors leading-tight">
                    {book.author}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-[#5E6282] max-w-xl line-clamp-2">
                    {book.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-[#181E4B] group-hover:text-[#DF6951] transition-colors shrink-0">
                  <span>Explore Chapters</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
