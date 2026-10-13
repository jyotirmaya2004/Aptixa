'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { QuizMode } from '@/types';
import { ModeSwitcher } from './ModeSwitcher';
import { Clock, CheckSquare, Flag, ArrowLeft, LayoutGrid } from 'lucide-react';

export interface TelemetryBarProps {
  title: string;
  mode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
  timeRemainingSeconds?: number;
  totalTimeSeconds?: number;
  answeredCount: number;
  totalQuestions: number;
  markedCount: number;
  onSubmit: () => void;
  isSubmitted?: boolean;
  onOpenPalette?: () => void;
}

export function TelemetryBar({
  title,
  mode,
  onModeChange,
  timeRemainingSeconds = 0,
  answeredCount,
  totalQuestions,
  markedCount,
  onSubmit,
  isSubmitted = false,
  onOpenPalette,
}: TelemetryBarProps) {
  // Format MM:SS
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = mode === 'test' && timeRemainingSeconds < 300 && timeRemainingSeconds > 0;

  return (
    <header className="shrink-0 z-30 w-full h-16 sm:h-18 bg-white/90 backdrop-blur-md border-b border-black/[0.05] shadow-[0_2px_15px_rgba(0,0,0,0.02)] px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">
      {/* Left: Back & Title */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          title="Return to Dashboard"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-slate-50 border border-black/[0.08] text-[#181E4B] transition-all shadow-2xs group-hover:scale-105">
            <ArrowLeft size={16} aria-hidden="true" />
          </div>
          <Image
            src="/images/logo.png"
            alt="Aptixa"
            width={28}
            height={28}
            className="h-7 w-auto object-contain hidden sm:block transition-transform group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0 truncate">
          <h1 className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#181E4B] truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Center: Mode Switcher */}
      <div className="hidden lg:flex items-center justify-center">
        <ModeSwitcher mode={mode} onChange={onModeChange} disabled={isSubmitted} />
      </div>

      {/* Right: Telemetry metrics & Submit CTA */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Mobile Matrix Trigger */}
        {onOpenPalette && (
          <button
            type="button"
            onClick={onOpenPalette}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181E4B]/5 hover:bg-[#181E4B]/10 text-[#181E4B] font-sans text-xs font-bold transition-all cursor-pointer"
            aria-label="Open Question Matrix Palette"
          >
            <LayoutGrid size={14} className="text-[#DF6951]" aria-hidden="true" />
            <span className="tabular-nums">{answeredCount}/{totalQuestions}</span>
          </button>
        )}

        {/* Progress counter (Desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 font-sans text-xs font-bold bg-[#F8F9FF] text-[#181E4B] px-3.5 py-1.5 rounded-full border border-black/[0.05]">
          <CheckSquare size={14} className="text-[#DF6951]" aria-hidden="true" />
          <span>
            <strong>{answeredCount}</strong> / {totalQuestions}
          </span>
        </div>

        {/* Marked count */}
        {markedCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 font-sans text-xs font-bold bg-[#FFF1DA] text-[#F1A501] px-3 py-1.5 rounded-full border border-[#F1A501]/30">
            <Flag size={13} aria-hidden="true" />
            <span>{markedCount}</span>
          </div>
        )}

        {/* Live Timer (if test mode or active timer) */}
        {mode === 'test' && !isSubmitted && (
          <div
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-bold tabular-nums text-xs sm:text-sm border',
              isTimeCritical
                ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
                : 'bg-[#FFF1DA] border-[#F1A501]/30 text-[#F1A501]'
            )}
          >
            <Clock size={14} className={isTimeCritical ? 'text-red-600' : 'text-[#F1A501]'} aria-hidden="true" />
            <span>{timeFormatted}</span>
          </div>
        )}

        {/* Submit Button */}
        {!isSubmitted ? (
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center px-5 py-2 rounded-full bg-[#F1A501] hover:bg-[#d99100] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(241,165,1,0.25)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1A501]"
          >
            Submit Test
          </button>
        ) : (
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1.5 border border-emerald-200 rounded-full">
            Submitted
          </span>
        )}
      </div>
    </header>
  );
}
