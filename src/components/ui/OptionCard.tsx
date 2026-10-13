'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export interface OptionCardProps {
  index: number;
  text: string;
  selected?: boolean;
  isCorrectResult?: boolean;
  isWrongResult?: boolean;
  disabled?: boolean;
  onSelect: (index: number) => void;
  hotkey?: string;
}

export function OptionCard({
  index,
  text,
  selected = false,
  isCorrectResult,
  isWrongResult,
  disabled = false,
  onSelect,
  hotkey,
}: OptionCardProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const letter = letters[index] || String.fromCharCode(65 + index);

  let stateClasses =
    'border border-black/[0.06] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#F1A501] hover:shadow-[0_10px_25px_rgba(241,165,1,0.08)] hover:-translate-y-0.5';
  let badgeClasses = 'bg-[#F8F9FF] border border-black/[0.06] text-[#181E4B]';

  if (selected) {
    stateClasses =
      'border-[2px] border-[#181E4B] bg-[#F8F9FF] ring-2 ring-[#181E4B]/10 shadow-[0_8px_20px_rgba(24,30,75,0.08)]';
    badgeClasses = 'bg-[#181E4B] text-white border-[#181E4B]';
  }

  if (isCorrectResult) {
    stateClasses =
      'border-[2px] border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20';
    badgeClasses = 'bg-emerald-600 text-white border-emerald-600';
  } else if (isWrongResult) {
    stateClasses =
      'border-[2px] border-rose-500 bg-rose-50/70 text-rose-950 ring-2 ring-rose-500/20';
    badgeClasses = 'bg-rose-600 text-white border-rose-600';
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(index)}
      className={cn(
        'w-full text-left flex items-start gap-4 p-5 sm:p-6 rounded-[18px] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1A501] focus-visible:ring-offset-2 disabled:cursor-default',
        stateClasses
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold tracking-wider uppercase transition-colors',
          badgeClasses
        )}
      >
        {isCorrectResult ? (
          <Check size={16} className="stroke-[3]" />
        ) : isWrongResult ? (
          <X size={16} className="stroke-[3]" />
        ) : (
          letter
        )}
      </div>

      <div className="flex-1 font-sans text-base sm:text-lg leading-relaxed text-[#181E4B] pt-1.5 font-medium">
        {text}
      </div>

      {hotkey && !disabled && (
        <span
          className="hidden md:inline-flex items-center justify-center text-[10px] font-mono font-bold text-slate-400 bg-slate-100/90 border border-slate-200/80 rounded px-1.5 py-0.5 shrink-0 self-center select-none"
          aria-label={`Shortcut key ${hotkey}`}
        >
          {hotkey}
        </span>
      )}
    </button>
  );
}
