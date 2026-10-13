'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { QuestionStatus } from '@/types';

export interface PaletteCellProps {
  questionNumber: number;
  status: QuestionStatus;
  isActive?: boolean;
  onClick: () => void;
}

export function PaletteCell({
  questionNumber,
  status,
  isActive = false,
  onClick,
}: PaletteCellProps) {
  let statusStyles = 'bg-[#F8F9FF] text-[#5E6282] border border-black/[0.04] hover:bg-slate-100';

  switch (status) {
    case 'answered':
      statusStyles = 'bg-[#181E4B] text-white shadow-xs hover:bg-[#212832]';
      break;
    case 'marked':
      statusStyles = 'bg-[#FFF1DA] text-[#F1A501] border-2 border-[#F1A501] hover:bg-[#ffe7be]';
      break;
    case 'marked-answered':
      statusStyles = 'bg-[#181E4B] text-white border-2 border-[#F1A501] shadow-xs hover:bg-[#212832]';
      break;
    case 'unanswered':
      statusStyles = 'bg-white border border-black/15 text-[#181E4B] hover:border-[#F1A501]';
      break;
    case 'unvisited':
    default:
      statusStyles = 'bg-[#F8F9FF] text-[#5E6282] border border-black/[0.04] hover:bg-slate-100';
      break;
  }

  const activeStyles = isActive
    ? 'ring-2 ring-[#DF6951] ring-offset-2 scale-110 font-bold z-10'
    : '';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Go to question ${questionNumber}, status: ${status}`}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-full font-sans text-xs font-semibold tabular-nums transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1A501]',
        statusStyles,
        activeStyles
      )}
    >
      {questionNumber}

      {/* Review mark corner dot */}
      {(status === 'marked' || status === 'marked-answered') && (
        <span
          className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#DF6951] ring-2 ring-white"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
