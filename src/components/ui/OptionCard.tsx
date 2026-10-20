'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

import { MathRenderer } from '@/components/ui/MathRenderer';

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
}: OptionCardProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const letter = letters[index] || String.fromCharCode(65 + index);

  let stateClasses =
    'border border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-[#181E4B]';
  let badgeClasses = 'bg-slate-100 text-slate-700';

  if (selected) {
    stateClasses = 'border-2 border-[#181E4B] bg-[#F8F9FF] text-[#181E4B] shadow-2xs';
    badgeClasses = 'bg-[#181E4B] text-white';
  }

  if (isCorrectResult) {
    stateClasses = 'border-2 border-emerald-500 bg-emerald-50/70 text-emerald-950';
    badgeClasses = 'bg-emerald-600 text-white';
  } else if (isWrongResult) {
    stateClasses = 'border-2 border-rose-500 bg-rose-50/70 text-rose-950';
    badgeClasses = 'bg-rose-600 text-white';
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(index)}
      className={cn(
        'w-full text-left flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-[14px] transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181E4B] disabled:cursor-default',
        stateClasses
      )}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-colors',
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

      <div className="flex-1 font-sans text-base sm:text-lg leading-relaxed pt-0.5">
        <MathRenderer text={text} />
      </div>
    </button>
  );
}
