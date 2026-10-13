'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import {
  RotateCcw,
  Home,
  BookOpen,
  SlidersHorizontal,
  AlertTriangle,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyDigest = () => {
    if (error?.digest) {
      navigator.clipboard.writeText(error.digest);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)]">
      <main className="flex-1 mx-auto max-w-3xl w-full px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
        {/* Ambient Halo & Icon */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 rounded-full bg-[#DF6951]/20 blur-2xl transform scale-150 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-white border border-rose-100 shadow-[0_12px_30px_rgba(223,105,81,0.12)] text-[#DF6951]">
            <AlertTriangle size={36} className="stroke-[2.2]" aria-hidden="true" />
          </div>
        </div>

        {/* Eyebrow */}
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#DF6951] mb-2 block">
          Session Fault · 500 Anomaly
        </span>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B] mb-4">
          Assessment Session Interrupted
        </h1>

        {/* Descriptive Body */}
        <p className="font-sans text-sm sm:text-base text-[#5E6282] max-w-xl mx-auto leading-relaxed mb-6">
          An unexpected runtime anomaly occurred while compiling the evaluation environment.
          Your session integrity and local candidate records have been safely preserved.
        </p>

        {/* Reassurance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-sans font-semibold mb-8">
          <ShieldCheck size={15} className="text-emerald-600 shrink-0" aria-hidden="true" />
          <span>Session State Preserved: In-progress answers and timers are cached locally.</span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 w-full max-w-md">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_8px_20px_rgba(223,105,81,0.25)] hover:shadow-[0_12px_28px_rgba(223,105,81,0.32)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <RotateCcw size={14} className="stroke-[2.5]" aria-hidden="true" />
            <span>Reload & Resume</span>
          </button>

          <Link
            href="/"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-white border border-slate-200 hover:border-[#181E4B] text-[#181E4B] font-sans text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow hover:-translate-y-0.5 transition-all"
          >
            <Home size={14} aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Auxiliary Quick Links Card */}
        <div className="w-full max-w-lg rounded-[20px] bg-white border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-8">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3 text-left">
            Or Navigate to Standard Modules
          </span>
          <div className="grid grid-cols-2 gap-3 text-left">
            <Link
              href="/books"
              className="flex items-center gap-2.5 p-2.5 rounded-[12px] hover:bg-slate-50 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-amber-500/10 text-[#F1A501] group-hover:bg-[#F1A501] group-hover:text-white transition-colors">
                <BookOpen size={15} />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#181E4B] block leading-tight">
                  Textbooks
                </span>
                <span className="font-sans text-[11px] text-[#5E6282]">
                  35+ Chapter Drills
                </span>
              </div>
            </Link>

            <Link
              href="/practice"
              className="flex items-center gap-2.5 p-2.5 rounded-[12px] hover:bg-slate-50 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <SlidersHorizontal size={15} />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-[#181E4B] block leading-tight">
                  Practice Studio
                </span>
                <span className="font-sans text-[11px] text-[#5E6282]">
                  Custom Exam Setup
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Error Reference Docket (if digest exists) */}
        {error?.digest && (
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/60">
            <span>Reference ID: {error.digest}</span>
            <button
              type="button"
              onClick={handleCopyDigest}
              className="hover:text-[#181E4B] transition-colors p-0.5 cursor-pointer"
              title="Copy reference ID"
              aria-label="Copy reference ID"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
