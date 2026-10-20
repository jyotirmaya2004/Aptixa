'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

import { MathRenderer } from '@/components/ui/MathRenderer';

export interface SolutionDrawerProps {
  explanation?: string;
  hint?: string;
  correctAnswerText?: string;
  source?: string;
  isOpenDefault?: boolean;
}

export function SolutionDrawer({
  explanation,
  hint,
  correctAnswerText,
  source,
  isOpenDefault = false,
}: SolutionDrawerProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen || !contentRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(contentRef.current, {
          y: -8,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.out',
        });
      });
    },
    { scope: contentRef, dependencies: [isOpen] }
  );

  if (!explanation && !hint && !correctAnswerText) {
    return null;
  }

  return (
    <div className="w-full mt-8 rounded-[20px] bg-[#FFF8EE] border border-[#F1A501]/25 overflow-hidden shadow-2xs">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#FFF4E5] hover:bg-[#ffeed6] transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1A501]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle2 size={16} aria-hidden="true" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-[#181E4B]">
            Diagnostic Solution & Step Derivation
          </span>
          {source && (
            <span className="hidden sm:inline font-sans text-xs uppercase tracking-wider text-[#5E6282] bg-white/60 px-2.5 py-0.5 rounded-full">
              {source}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951]">
            {isOpen ? 'Hide' : 'Inspect'}
          </span>
          <ChevronDown
            size={16}
            className={cn(
              'text-[#DF6951] transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {isOpen && (
        <div ref={contentRef} className="p-6 space-y-4 text-[#181E4B]">
          {correctAnswerText && (
            <div className="flex items-start gap-3 p-4 rounded-[14px] bg-emerald-50 border border-emerald-200/80">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-800 shrink-0 mt-0.5">
                Correct Key:
              </span>
              <span className="font-sans text-sm sm:text-base font-semibold text-emerald-950">
                <MathRenderer text={correctAnswerText} />
              </span>
            </div>
          )}

          {explanation && (
            <div className="space-y-2">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282]">
                Step-by-Step Derivation
              </h4>
              <div className="p-5 rounded-[14px] bg-white border border-black/[0.04] font-sans text-sm sm:text-base leading-relaxed text-[#181E4B] whitespace-pre-line shadow-2xs">
                <MathRenderer text={explanation} />
              </div>
            </div>
          )}

          {hint && (
            <div className="flex items-start gap-3 p-4 rounded-[14px] bg-[#FFF1DA] border border-[#F1A501]/30 text-[#181E4B]">
              <HelpCircle size={18} className="text-[#F1A501] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="uppercase font-bold tracking-wider mr-1.5 text-[#DF6951]">Principle / Diagnostic Tip:</strong>
                <MathRenderer text={hint} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
