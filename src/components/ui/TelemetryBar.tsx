'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

export interface TelemetryBarProps {
  title: string;
  answeredCount: number;
  totalQuestions: number;
  onSubmit: () => void;
  isSubmitted?: boolean;
}

export function TelemetryBar({
  title,
  answeredCount,
  totalQuestions,
  onSubmit,
  isSubmitted = false,
}: TelemetryBarProps) {
  return (
    <header className="shrink-0 z-30 w-full h-16 bg-white/95 backdrop-blur-md border-b border-black/[0.04] px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">
      {/* Left: Home Return & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          title="Return to Dashboard"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-[#181E4B] transition-colors">
            <ArrowLeft size={16} aria-hidden="true" />
          </div>
          <Image
            src="/images/logo.png"
            alt="Aptixa"
            width={26}
            height={26}
            className="h-6 w-auto object-contain hidden sm:block"
          />
        </Link>
        <h1 className="font-serif text-sm sm:text-base font-bold text-[#181E4B] truncate">
          {title}
        </h1>
      </div>

      {/* Right: Customize, Answered Progress & Submit */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Customize Test Link */}
        <Link
          href="/practice"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-500 hover:text-[#181E4B] hover:bg-slate-100 font-sans text-xs font-semibold transition-colors"
          title="Customize question count, topics & timing"
        >
          <SlidersHorizontal size={13} className="text-[#DF6951]" aria-hidden="true" />
          <span>Customize</span>
        </Link>

        {/* Progress Counter */}
        <span className="font-sans text-xs font-semibold text-slate-500 tabular-nums">
          {answeredCount} / {totalQuestions} answered
        </span>

        {/* Submit Action */}
        {!isSubmitted ? (
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Submit
          </button>
        ) : (
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Submitted
          </span>
        )}
      </div>
    </header>
  );
}
