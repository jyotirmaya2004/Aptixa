import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBooks, getBookById } from '@/lib/data';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BookDetailPageProps {
  params: Promise<{ bookId: string }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((b) => ({ bookId: b.id }));
}

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const { bookId } = await params;
  const book = await getBookById(bookId);

  if (!book) {
    return { title: 'Textbook Not Found — Aptixa' };
  }

  return {
    title: `${book.author} — ${book.title} | Aptixa`,
    description: `Standard chapter syllabus and comprehensive question pool for ${book.title} by ${book.author}.`,
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { bookId } = await params;
  const book = await getBookById(bookId);

  if (!book) {
    notFound();
  }

  // Arrange chapters by their natural chapter number
  const sortedChapters = [...book.chapters].sort(
    (a, b) => a.chapter_number - b.chapter_number
  );

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 lg:px-12">
        {/* Return to Books Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#DF6951] transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            <span>All Textbooks</span>
          </Link>
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#181E4B]">
            {book.author}
          </span>
        </div>

        <h1 className="sr-only">{book.title}</h1>

        {/* Clean Chapter List (No rigid box structures) */}
        <div className="max-w-4xl mx-auto space-y-2">
          {sortedChapters.map((ch) => {
            const cleanTitle = ch.title.replace(/^\d+\.\s*/, '');

            return (
              <div
                key={ch.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-4 sm:px-6 hover:bg-white/80 rounded-xl transition-all duration-150"
              >
                {/* Left: Chapter Details */}
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-wider text-[#DF6951]">
                      Chapter {ch.chapter_number}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-sans text-xs font-semibold text-slate-400">
                      {ch.question_count} MCQs
                    </span>
                  </div>

                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#181E4B] group-hover:text-[#DF6951] transition-colors leading-snug">
                    {cleanTitle}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-[#5E6282] leading-relaxed line-clamp-1 max-w-2xl">
                    {ch.description}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center shrink-0 pt-1 sm:pt-0">
                  <Link
                    href={`/quiz/${ch.file}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#181E4B] hover:bg-[#DF6951] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Practice</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
