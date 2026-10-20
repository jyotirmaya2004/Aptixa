'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizSession } from '@/hooks/useQuizSession';
import { cn } from '@/lib/utils';
import { TelemetryBar } from '@/components/ui/TelemetryBar';
import { OptionCard } from '@/components/ui/OptionCard';
import type { Question, QuizMode } from '@/types';
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  AlertTriangle,
} from 'lucide-react';

export interface QuizWorkspaceClientProps {
  sessionId: string;
  initialQuestions: Question[];
  initialMode?: QuizMode;
  title: string;
  customInitialTimeSeconds?: number;
}

export function QuizWorkspaceClient({
  sessionId,
  initialQuestions,
  initialMode = 'quiz',
  title,
  customInitialTimeSeconds,
}: QuizWorkspaceClientProps) {
  const router = useRouter();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const {
    mode,
    setMode,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    marked,
    timeRemaining,
    totalTime,
    isSubmitted,
    stats,
    selectOption,
    toggleMarkForReview,
    nextQuestion,
    prevQuestion,
    submitExam,
  } = useQuizSession(
    sessionId,
    initialQuestions,
    initialMode,
    'General Aptitude',
    title,
    customInitialTimeSeconds
  );

  const cleanId = useMemo(() => {
    let s = sessionId;
    try {
      while (s.includes('%')) {
        const d = decodeURIComponent(s);
        if (d === s) break;
        s = d;
      }
    } catch {
      // fallback
    }
    return s.replace(/%2F/gi, '/');
  }, [sessionId]);

  const handleSubmitConfirm = useCallback(() => {
    submitExam();
    setShowSubmitModal(false);
    router.push(`/results/${cleanId}`);
  }, [cleanId, submitExam, router]);

  // When timer expires in proctored test mode, automatically route to performance report
  useEffect(() => {
    if (isSubmitted && mode === 'test' && timeRemaining === 0) {
      router.push(`/results/${cleanId}`);
    }
  }, [isSubmitted, mode, timeRemaining, cleanId, router]);

  // Keyboard navigation for convenient answering without displaying distracting guides
  useEffect(() => {
    if (isSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      const key = e.key;
      const keyLower = key.toLowerCase();

      // Number keys 1-5 for options
      const numKeys = ['1', '2', '3', '4', '5'];
      const numIdx = numKeys.indexOf(key);
      if (numIdx !== -1 && currentQuestion && numIdx < currentQuestion.options.length) {
        e.preventDefault();
        selectOption(numIdx);
        return;
      }

      // Letter keys A-E for options
      const letterKeys = ['a', 'b', 'c', 'd', 'e'];
      const letterIdx = letterKeys.indexOf(keyLower);
      if (letterIdx !== -1 && currentQuestion && letterIdx < currentQuestion.options.length) {
        e.preventDefault();
        selectOption(letterIdx);
        return;
      }

      // Next Question: Right Arrow or Enter
      if (key === 'ArrowRight' || key === 'Enter') {
        e.preventDefault();
        if (currentIndex < totalQuestions - 1) {
          nextQuestion();
        } else {
          setShowSubmitModal(true);
        }
        return;
      }

      // Previous Question: Left Arrow
      if (key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          prevQuestion();
        }
        return;
      }

      // Review Later (Flag): Key M or F
      if (keyLower === 'm' || keyLower === 'f') {
        e.preventDefault();
        toggleMarkForReview();
        return;
      }


      if (key === 'Escape') {
        setShowSubmitModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSubmitted,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectOption,
    nextQuestion,
    prevQuestion,
    toggleMarkForReview,
  ]);

  // Touch Swipe Gesture Detection for Mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (!e.changedTouches || e.changedTouches.length === 0 || !e.changedTouches[0]) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        if (currentIndex < totalQuestions - 1) {
          nextQuestion();
        }
      } else if (currentIndex > 0) {
        prevQuestion();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (totalQuestions === 0 || !currentQuestion) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] flex items-center justify-center p-6 bg-[#F8F9FF]">
        <div className="max-w-md w-full p-8 rounded-[24px] bg-white border border-slate-200/80 text-center space-y-4">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <AlertTriangle size={24} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#181E4B]">No Questions Available</h2>
          <p className="font-sans text-sm text-[#5E6282]">
            The requested assessment problem set could not be loaded.
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-2.5 rounded-full bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentQuestion.id];
  const isMarked = Boolean(marked[currentQuestion.id]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col bg-[#F8F9FF]">
      {/* Top Header Bar */}
      <TelemetryBar
        title={title}
        mode={mode}
        onModeChange={setMode}
        timeRemainingSeconds={timeRemaining}
        totalTimeSeconds={totalTime}
        answeredCount={stats.answeredCount}
        totalQuestions={totalQuestions}
        onSubmit={() => setShowSubmitModal(true)}
        isSubmitted={isSubmitted}
      />

      {/* Main Reading Arena: Centered, clean, single-surface layout */}
      <main className="flex-1 min-h-0 w-full max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-6 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col rounded-[22px] sm:rounded-[26px] bg-white border border-slate-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
          
          {/* Question Header */}
          <div className="shrink-0 px-6 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951]">
              Question {currentIndex + 1} of {totalQuestions}
            </span>

            {isMarked && (
              <span className="font-sans text-xs font-semibold text-[#DF6951] flex items-center gap-1.5 bg-[#FFF1DA] px-2.5 py-1 rounded-full border border-[#DF6951]/20">
                <Flag size={12} aria-hidden="true" />
                <span>Review Later</span>
              </span>
            )}
          </div>

          {/* Question Reading & Options Pane */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-5 custom-scrollbar"
          >
            {/* Question Stem */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181E4B] leading-relaxed tracking-tight mb-6 sm:mb-8">
              {currentQuestion.question}
            </h2>

            {/* Clean Choices Stack */}
            <div className="space-y-3 pb-6" role="radiogroup" aria-label="Question choices">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = isSubmitted && optIdx === currentQuestion.correctOption;
                const isWrong = isSubmitted && isSelected && optIdx !== currentQuestion.correctOption;

                return (
                  <OptionCard
                    key={`${currentQuestion.id}-opt-${optIdx}`}
                    index={optIdx}
                    text={optionText}
                    selected={isSelected}
                    isCorrectResult={isCorrect}
                    isWrongResult={isWrong}
                    disabled={isSubmitted}
                    onSelect={selectOption}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="shrink-0 px-6 sm:px-8 py-3.5 sm:py-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
            {/* Left Actions: Review flag */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMarkForReview}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full font-sans text-xs font-semibold transition-colors cursor-pointer',
                  isMarked
                    ? 'bg-[#DF6951]/10 text-[#DF6951]'
                    : 'text-slate-500 hover:text-[#DF6951] hover:bg-slate-50'
                )}
              >
                <Flag size={13} aria-hidden="true" />
                <span>{isMarked ? 'Unmark' : 'Review Later'}</span>
              </button>
            </div>

            {/* Right Actions: Prev & Next/Submit */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={prevQuestion}
                className="inline-flex items-center gap-1 px-4 sm:px-5 py-2 rounded-full border border-slate-200 text-[#181E4B] hover:bg-slate-50 font-sans text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowLeft size={13} aria-hidden="true" />
                <span>Prev</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="inline-flex items-center gap-1 px-5 sm:px-7 py-2 rounded-full bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="inline-flex items-center gap-1 px-5 sm:px-7 py-2 rounded-full bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Submit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181E4B]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
        >
          <div className="max-w-md w-full rounded-[24px] bg-white p-7 sm:p-8 shadow-2xl border border-black/[0.05] space-y-4 animate-in zoom-in-95 duration-200">
            <h3 id="submit-modal-title" className="font-serif text-2xl font-bold text-[#181E4B]">
              Submit Examination?
            </h3>
            <p className="font-sans text-sm text-[#5E6282] leading-relaxed">
              You answered <strong className="text-[#181E4B]">{stats.answeredCount}</strong> of{' '}
              <strong className="text-[#181E4B]">{totalQuestions}</strong> questions.
              {stats.unansweredCount > 0 && (
                <span className="block mt-2 text-[#DF6951] font-semibold text-xs">
                  {stats.unansweredCount} questions remain unattempted.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-[#181E4B] hover:bg-slate-50 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={handleSubmitConfirm}
                className="px-6 py-2.5 rounded-full bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
