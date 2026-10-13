'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { QuizMode } from '@/types';
import { BookOpen, ShieldCheck } from 'lucide-react';

export interface ModeSwitcherProps {
  mode: QuizMode;
  onChange: (mode: QuizMode) => void;
  disabled?: boolean;
}

export function ModeSwitcher({ mode, onChange, disabled = false }: ModeSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Assessment Examination Mode"
      className={cn(
        'inline-flex items-center rounded-full bg-[#F8F9FF] border border-black/[0.06] p-1 shadow-2xs',
        disabled && 'opacity-60 pointer-events-none'
      )}
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'quiz'}
        disabled={disabled}
        onClick={() => onChange('quiz')}
        className={cn(
          'flex items-center gap-1.5 px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DF6951]',
          mode === 'quiz'
            ? 'bg-[#DF6951] text-white shadow-xs'
            : 'text-[#5E6282] hover:text-[#181E4B] hover:bg-white/60'
        )}
      >
        <BookOpen size={13} className="shrink-0" aria-hidden="true" />
        <span>Practice Quiz</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'test'}
        disabled={disabled}
        onClick={() => onChange('test')}
        className={cn(
          'flex items-center gap-1.5 px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1A501]',
          mode === 'test'
            ? 'bg-[#F1A501] text-white shadow-xs'
            : 'text-[#5E6282] hover:text-[#181E4B] hover:bg-white/60'
        )}
      >
        <ShieldCheck size={13} className="shrink-0" aria-hidden="true" />
        <span>Proctored Test</span>
      </button>
    </div>
  );
}
