'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { SolutionDrawer } from '@/components/ui/SolutionDrawer';
import { MathRenderer } from '@/components/ui/MathRenderer';
import type { Question } from '@/types';
import { calculateExamScore } from '@/lib/scoring';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface SavedSession {
  sessionId: string;
  category: string;
  topic: string;
  mode: 'quiz';
  answers: Record<string, number | null>;
  timeRemaining: number;
  updatedAt: string;
}

export interface ResultsClientProps {
  sessionId: string;
  questions: Question[];
}

export function ResultsClient({ sessionId, questions }: ResultsClientProps) {
  const cleanSessionId = React.useMemo(() => {
    try {
      let s = sessionId;
      while (s.includes('%')) {
        const d = decodeURIComponent(s);
        if (d === s) break;
        s = d;
      }
      return s.replace(/%2F/gi, '/');
    } catch {
      return sessionId;
    }
  }, [sessionId]);

  const [session] = useState<SavedSession | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const key1 = `aptixa_session_${cleanSessionId}`;
      const key2 = `aptixa_session_${sessionId}`;
      const key3 = `aptixa_session_${encodeURIComponent(cleanSessionId)}`;

      // Purge any legacy localStorage data
      [key1, key2, key3].forEach((k) => {
        if (localStorage.getItem(k)) localStorage.removeItem(k);
      });

      const saved =
        sessionStorage.getItem(key1) ||
        sessionStorage.getItem(key2) ||
        sessionStorage.getItem(key3);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const answers = session?.answers || {};

  const {
    correctCount: correct,
    wrongCount: wrong,
    unansweredCount: unanswered,
    score,
    maxScore,
    percentage,
  } = calculateExamScore(questions, answers);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10 lg:px-8">
        {/* Header Status */}
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#DF6951]">
              RESULTS
            </span>
            <span className="font-sans text-xs font-bold uppercase tracking-wider bg-[#DF6951]/10 text-[#DF6951] px-2.5 py-0.5 rounded-full">
              Practice Assessment
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#181E4B]">
            Assessment Performance
          </h1>
        </div>

        {/* High-Level Score Card */}
        <div className="rounded-[28px] bg-white p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.04] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score Metric Display */}
            <div className="md:col-span-5 text-center md:text-left">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282] block mb-2">
                Candidate Score
              </span>
              <div className="flex items-baseline justify-center md:justify-start gap-2.5">
                <span className="font-serif text-6xl sm:text-7xl font-extrabold text-[#181E4B]">
                  {score.toFixed(1)}
                </span>
                <span className="font-sans text-sm font-semibold text-[#5E6282]">
                  / {maxScore} pts
                </span>
              </div>
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951] mt-3">
                Proficiency: {percentage}% Accuracy
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="md:col-span-7 grid grid-cols-3 gap-4 text-center">
              <div className="p-5 rounded-[20px] bg-emerald-50/80 border border-emerald-200/70">
                <div className="flex items-center justify-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>Correct</span>
                </div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
                  {correct}
                </span>
              </div>

              <div className="p-5 rounded-[20px] bg-rose-50/80 border border-rose-200/70">
                <div className="flex items-center justify-center gap-1.5 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <XCircle size={14} aria-hidden="true" />
                  <span>Incorrect</span>
                </div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-950">
                  {wrong}
                </span>
              </div>

              <div className="p-5 rounded-[20px] bg-[#F8F9FF] border border-black/[0.04]">
                <div className="flex items-center justify-center gap-1.5 text-[#5E6282] text-xs font-bold uppercase tracking-wider mb-2">
                  <HelpCircle size={14} aria-hidden="true" />
                  <span>Skipped</span>
                </div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#181E4B]">
                  {unanswered}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 pt-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/quiz/${encodeURIComponent(cleanSessionId)}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#F1A501] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#d99100] transition-all shadow-[0_6px_16px_rgba(241,165,1,0.25)]"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Retake Assessment</span>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-black/10 hover:bg-black/5 text-[#181E4B] text-xs font-bold uppercase tracking-wider transition-all"
              >
                <BookOpen size={14} aria-hidden="true" />
                <span>Textbook Syllabi</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282] hover:text-[#DF6951] transition-colors ml-2"
              >
                <span>Dashboard</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Per-Question Verification Accordion */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-2xl font-bold text-[#181E4B]">
              Detailed Question Analysis ({questions.length})
            </h2>
            <span className="font-sans text-xs text-[#5E6282]">
              Step-by-step diagnostic breakdown
            </span>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const chosen = answers[q.id];
              const hasAnswered = chosen !== undefined && chosen !== null;
              const isCorrect = hasAnswered && chosen === q.correctOption;
              const isWrong = hasAnswered && chosen !== q.correctOption;

              return (
                <div
                  key={q.id}
                  className="rounded-[24px] bg-white p-7 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-black/[0.04]"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951]">
                      Question {idx + 1}
                    </span>

                    {isCorrect ? (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs uppercase px-3 py-1 rounded-full">
                        Correct (+1.0)
                      </span>
                    ) : isWrong ? (
                      <span className="bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs uppercase px-3 py-1 rounded-full">
                        Incorrect
                      </span>
                    ) : (
                      <span className="bg-[#F8F9FF] text-[#5E6282] border border-black/[0.04] font-semibold text-xs uppercase px-3 py-1 rounded-full">
                        Not Attempted
                      </span>
                    )}
                  </div>

                  <p className="font-serif text-xl font-bold text-[#181E4B] leading-relaxed mb-6">
                    <MathRenderer text={q.question} />
                  </p>

                  {/* Options List */}
                  <div className="space-y-2.5 mb-6">
                    {q.options.map((opt, optIdx) => {
                      const isCandidateChosen = chosen === optIdx;
                      const isAnswerKey = optIdx === q.correctOption;

                      let rowClasses = 'bg-[#F8F9FF] border border-black/[0.04] text-[#5E6282]';
                      if (isAnswerKey) {
                        rowClasses = 'bg-emerald-50/90 border border-emerald-300 text-emerald-950 font-medium';
                      } else if (isCandidateChosen && !isAnswerKey) {
                        rowClasses = 'bg-rose-50/90 border border-rose-300 text-rose-950';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-start gap-3 p-4 rounded-[14px] text-sm sm:text-base ${rowClasses}`}
                        >
                          <span className="font-bold text-xs uppercase w-5 shrink-0 pt-0.5">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="flex-1">
                            <MathRenderer text={opt} />
                          </span>
                          {isCandidateChosen && (
                            <span className="text-[0.6875rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white border border-black/10 text-[#181E4B]">
                              Your Selection
                            </span>
                          )}
                          {isAnswerKey && (
                            <span className="text-[0.6875rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-700 text-white">
                              Key
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Diagnostic Explanation Drawer */}
                  <SolutionDrawer
                    explanation={q.explanation}
                    hint={q.hint}
                    correctAnswerText={q.options[q.correctOption] || ''}
                    source={q.source}
                    isOpenDefault={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
