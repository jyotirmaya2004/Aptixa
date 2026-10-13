'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { QuizMode } from '@/types';
import { ModeSwitcher } from './ModeSwitcher';
import { Clock, ArrowLeft, SlidersHorizontal } from 'lucide-react';

export interface TelemetryBarProps {
  title: string;
  mode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
  timeRemainingSeconds?: number;
  totalTimeSeconds?: number;
  answeredCount: number;
  totalQuestions: number;
  markedCount?: number;
  onSubmit: () => void;
  isSubmitted?: boolean;
}

export function TelemetryBar({
  title,
  mode,
  onModeChange,
  timeRemainingSeconds = 0,
  answeredCount,
  totalQuestions,
  onSubmit,
  isSubmitted = false,
}: TelemetryBarProps) {
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = mode === 'test' && timeRemainingSeconds < 300 && timeRemainingSeconds > 0;

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

      {/* Center: Mode Switcher */}
      <div className="hidden md:flex items-center justify-center">
        <ModeSwitcher mode={mode} onChange={onModeChange} disabled={isSubmitted} />
      </div>

      {/* Right: Customize, Answered Progress, Timer & Submit */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Customize Test Link */}
        <Link
          href="/practice"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-500 hover:text-[#181E4B] hover:bg-slate-100 font-sans text-xs font-semibold transition-colors"
          title="Customize question count, difficulty & timing"
        >
          <SlidersHorizontal size={13} className="text-[#DF6951]" aria-hidden="true" />
          <span>Customize</span>
        </Link>

        {/* Simple Progress Counter */}
        <span className="font-sans text-xs font-semibold text-slate-500 tabular-nums">
          {answeredCount} / {totalQuestions} answered
        </span>

        {/* Live Timer (Test Mode) */}
        {mode === 'test' && !isSubmitted && (
          <div
            className={cn(
              'flex items-center gap-1.5 px-3 py-1 rounded-full font-sans font-bold tabular-nums text-xs border',
              isTimeCritical
                ? 'bg-red-50 border-red-200 text-red-600 animate-pulse'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            )}
          >
            <Clock size={12} aria-hidden="true" />
            <span>{timeFormatted}</span>
          </div>
        )}

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
