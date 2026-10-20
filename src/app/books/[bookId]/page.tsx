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

  const isQuant = book.category === 'quantitative';
  const totalMCQs = book.chapters.reduce(
    (acc, ch) => acc + (ch.question_count || 0),
    0
  );

  // Arrange chapters by their natural chapter number
  const sortedChapters = [...book.chapters].sort(
    (a, b) => a.chapter_number - b.chapter_number
  );

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 lg:px-12">
        {/* Return to Books Navigation */}
        <div className="mb-8">
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
        </div>

        {/* Editorial Book Header */}
        <div className="mb-10 max-w-3xl">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951] mb-2 block">
            {isQuant ? 'Quantitative Aptitude Track' : 'Logical Reasoning Track'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B]">
            {book.title}
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#5E6282] mt-3 leading-relaxed">
            Prescribed by <strong className="text-[#181E4B] font-semibold">{book.author}</strong> • {book.chapters.length} Standard Chapters • {totalMCQs.toLocaleString()} Verified Practice Problems
          </p>
        </div>

        {/* Clean Chapter List (No messy boxes, No serial number square boxes) */}
        <div className="space-y-3.5">
          {sortedChapters.map((ch) => {
            const cleanTitle = ch.title.replace(/^\d+\.\s*/, '');

            return (
              <div
                key={ch.id}
                className="group rounded-[18px] bg-white border border-black/[0.05] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(24,30,75,0.06)] hover:border-[#181E4B]/20 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Chapter Details */}
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-wider text-[#DF6951]">
                      Chapter {ch.chapter_number}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-sans text-xs font-semibold text-slate-500">
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
                <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0">
                  <Link
                    href={`/quiz/${ch.file}`}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Practice Chapter</span>
                    <ArrowRight size={13} aria-hidden="true" />
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
