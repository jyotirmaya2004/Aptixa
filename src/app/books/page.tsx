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

        {/* 2-Folder Structure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl pt-2 sm:pt-4">
          {books.map((book) => {
            const isQuant = book.category === 'quantitative';
            const totalMCQs = book.chapters.reduce((acc, ch) => acc + (ch.question_count || 0), 0);

            return (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="group relative flex flex-col rounded-[26px] bg-white border border-black/[0.06] p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(24,30,75,0.08)] hover:border-[#181E4B]/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Folder Top Tab Effect */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F8F9FF] border border-black/[0.04] text-[#181E4B] group-hover:bg-[#181E4B] group-hover:text-white transition-colors duration-300">
                      <Folder size={22} className="stroke-[2.2]" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-wider text-[#DF6951] block">
                        {isQuant ? 'Quantitative Aptitude' : 'Logical Reasoning'}
                      </span>
                      <span className="font-sans text-xs font-semibold text-[#5E6282]">
                        {book.chapters.length} Chapters • {totalMCQs} MCQs
                      </span>
                    </div>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#DF6951] group-hover:text-white transition-all duration-300 shrink-0">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                  </span>
                </div>

                {/* Book Author & Title */}
                <div className="flex-1 mb-6">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181E4B] group-hover:text-[#DF6951] transition-colors duration-200 mb-2">
                    {book.author}
                  </h2>
                  <h3 className="font-sans text-sm font-semibold text-[#181E4B]/80 mb-3 leading-snug">
                    {book.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#5E6282] leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                </div>

                {/* Folder Footer Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
                  <span className="font-semibold text-slate-400 group-hover:text-[#181E4B] transition-colors">
                    Authority Edition
                  </span>
                  <span className="font-bold uppercase tracking-wider text-[#DF6951] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore Chapters
                    <ArrowRight size={12} aria-hidden="true" />
                  </span>
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
