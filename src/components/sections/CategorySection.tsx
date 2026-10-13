'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, Brain, BookOpen, Code2, ArrowUpRight } from 'lucide-react';
import type { Category } from '@/types';

export interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  // Select top 4 tracks for the Jadoo 4-card layout
  const featuredTracks = categories.slice(0, 4);

  const iconMap: Record<string, React.ElementType> = {
    quantitative: Calculator,
    logical: Brain,
    verbal: BookOpen,
    di: Calculator,
    technical: Code2,
  };

  const trackTheme: Record<string, { bg: string; text: string }> = {
    quantitative: { bg: 'bg-amber-500/10', text: 'text-amber-600' },
    logical: { bg: 'bg-indigo-500/10', text: 'text-indigo-600' },
    verbal: { bg: 'bg-blue-500/10', text: 'text-blue-600' },
    di: { bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
    technical: { bg: 'bg-purple-500/10', text: 'text-purple-600' },
  };

  return (
    <section className="py-20 lg:py-28 bg-transparent relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#DF6951]">
            CATEGORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B]">
            We Offer Best Assessment Tracks
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {featuredTracks.map((cat) => {
            const IconComponent = iconMap[cat.id] || Brain;
            const theme = trackTheme[cat.id] || { bg: 'bg-slate-100', text: 'text-slate-700' };

            return (
              <div key={cat.id} className="relative group">
                <div className="h-full flex flex-col justify-between rounded-[22px] bg-white p-6 text-center border border-slate-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300">
                  <div>
                    {/* Centered Icon Container */}
                    <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] ${theme.bg} ${theme.text} group-hover:scale-105 transition-transform duration-200`}>
                      <IconComponent size={26} aria-hidden="true" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E1D4C] mb-2">
                      {cat.title}
                    </h3>

                    <p className="font-sans text-xs text-[#5E6282] leading-relaxed line-clamp-3 mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <Link
                      href={`/quiz/${cat.id}?mode=quiz`}
                      className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-[0.06em] text-[#DF6951] hover:text-[#c4533d] transition-colors"
                    >
                      <span>Practice</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                      href={`/quiz/${cat.id}?mode=test`}
                      className="font-sans text-xs font-bold uppercase tracking-[0.06em] text-[#181E4B] hover:text-[#DF6951] transition-colors"
                    >
                      Timed Test
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
