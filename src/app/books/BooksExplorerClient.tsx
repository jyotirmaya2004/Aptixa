'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Book } from '@/types';
import {
  Search,
  X,
  Clock,
  ArrowRight,
  List,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BooksExplorerClientProps {
  books: Book[];
}

export function BooksExplorerClient({ books }: BooksExplorerClientProps) {
  const searchParams = useSearchParams();
  const initialBook = searchParams.get('book') || 'all';

  const [activeBookId, setActiveBookId] = useState<string>(initialBook);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Compute total chapters across all books
  const totalChapters = useMemo(
    () => books.reduce((acc, b) => acc + b.chapters.length, 0),
    [books]
  );

  // Flatten and filter chapters based on search query and active book filter
  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const selectedBooks =
      activeBookId === 'all'
        ? books
        : books.filter((b) => b.id === activeBookId);

    const items: Array<{
      bookId: string;
      bookTitle: string;
      bookAuthor: string;
      bookCategory: string;
      chapter: Book['chapters'][number];
    }> = [];

    for (const book of selectedBooks) {
      for (const ch of book.chapters) {
        const matchesQuery =
          !q ||
          ch.title.toLowerCase().includes(q) ||
          ch.description.toLowerCase().includes(q) ||
          `chapter ${ch.chapter_number}`.toLowerCase().includes(q) ||
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q);

        if (matchesQuery) {
          items.push({
            bookId: book.id,
            bookTitle: book.title,
            bookAuthor: book.author,
            bookCategory: book.category,
            chapter: ch,
          });
        }
      }
    }

    return items;
  }, [books, activeBookId, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Control Toolbar: Search, Filter Tabs, and View Toggle */}
      <div className="rounded-[22px] bg-white border border-slate-200/80 p-4 sm:p-5 shadow-[0_6px_24px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters (e.g. Profit, Number System, Time, Average)..."
              className="w-full pl-11 pr-10 py-2.5 rounded-[12px] bg-slate-50 border border-slate-200/80 text-sm font-sans text-[#181E4B] placeholder:text-slate-400 focus:outline-none focus:border-[#181E4B] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#181E4B] p-1 transition-colors"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* View Mode Toggle & Results Count */}
          <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
            <span className="font-sans text-xs font-semibold text-[#848995]">
              Showing <strong className="text-[#181E4B]">{filteredChapters.length}</strong> of {totalChapters} chapters
            </span>

            <div className="flex items-center rounded-[10px] bg-slate-100 p-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all',
                  viewMode === 'list'
                    ? 'bg-white text-[#181E4B] shadow-sm'
                    : 'text-slate-500 hover:text-[#181E4B]'
                )}
                aria-label="List view"
              >
                <List size={14} aria-hidden="true" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all',
                  viewMode === 'grid'
                    ? 'bg-white text-[#181E4B] shadow-sm'
                    : 'text-slate-500 hover:text-[#181E4B]'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid size={14} aria-hidden="true" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs by Textbook */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveBookId('all')}
            className={cn(
              'px-4 py-2 rounded-[10px] font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200',
              activeBookId === 'all'
                ? 'bg-[#181E4B] text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-[#5E6282] hover:text-[#181E4B]'
            )}
          >
            All Textbooks ({totalChapters})
          </button>

          {books.map((b) => {
            const isActive = activeBookId === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBookId(b.id)}
                className={cn(
                  'px-4 py-2 rounded-[10px] font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200',
                  isActive
                    ? 'bg-[#181E4B] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-[#5E6282] hover:text-[#181E4B]'
                )}
              >
                {b.author} • {b.category === 'quantitative' ? 'Quant' : 'Reasoning'} ({b.chapters.length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapters Listing */}
      {filteredChapters.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-[22px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Search size={24} aria-hidden="true" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#181E4B]">
            No Chapters Found
          </h3>
          <p className="font-sans text-sm text-[#5E6282] max-w-md mx-auto">
            No chapter titles or descriptions matched &quot;{searchQuery}&quot;. Try adjusting your search query or reset the book filter.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveBookId('all');
              }}
              className="px-5 py-2 rounded-[10px] bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : viewMode === 'list' ? (
        /* Structured List Format */
        <div className="space-y-3">
          {filteredChapters.map(({ chapter: ch }) => (
            <div
              key={ch.id}
              className="group rounded-[16px] bg-white border border-slate-200/70 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_25px_rgba(24,30,75,0.06)] hover:border-slate-300 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Number, Title, Metadata */}
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-slate-100 text-[#181E4B] font-mono text-sm font-bold shrink-0 group-hover:bg-[#181E4B] group-hover:text-white transition-colors duration-200">
                  {String(ch.chapter_number).padStart(2, '0')}
                </div>

                <div className="min-w-0 space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#181E4B] group-hover:text-[#DF6951] transition-colors leading-snug truncate">
                    {ch.title}
                  </h3>

                  <p className="font-sans text-xs text-[#5E6282] line-clamp-1 max-w-2xl leading-relaxed">
                    {ch.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Question Count & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0">
                <span className="px-3.5 py-1 rounded-full bg-slate-100 text-[#181E4B] font-sans text-xs font-semibold whitespace-nowrap">
                  {ch.question_count} MCQs
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/quiz/${ch.file}?mode=quiz`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-slate-100 hover:bg-[#DF6951] text-[#181E4B] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200"
                  >
                    <span>Practice</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>

                  <Link
                    href={`/quiz/${ch.file}?mode=test`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all duration-200"
                  >
                    <Clock size={12} aria-hidden="true" />
                    <span>Timed</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Alternate Compact Grid Format */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChapters.map(({ chapter: ch }) => (
            <div
              key={ch.id}
              className="group rounded-[18px] bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(24,30,75,0.06)] hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider mb-2.5">
                  <span className="text-[#DF6951]">Chapter {ch.chapter_number}</span>
                  <span className="bg-slate-100 text-[#181E4B] px-2.5 py-0.5 rounded-full text-[0.6875rem]">
                    {ch.question_count} MCQs
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#181E4B] tracking-tight mb-2 group-hover:text-[#DF6951] transition-colors leading-snug line-clamp-1">
                  {ch.title}
                </h3>

                <p className="font-sans text-xs text-[#5E6282] line-clamp-2 leading-relaxed mb-5">
                  {ch.description}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  href={`/quiz/${ch.file}?mode=quiz`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[10px] bg-slate-100 hover:bg-[#DF6951] text-[#181E4B] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200"
                >
                  <span>Practice</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>

                <Link
                  href={`/quiz/${ch.file}?mode=test`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-[10px] bg-[#181E4B] hover:bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200"
                >
                  <Clock size={12} aria-hidden="true" />
                  <span>Timed</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
