'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuizSession } from '@/hooks/useQuizSession';
import { cn } from '@/lib/utils';
import { TelemetryBar } from '@/components/ui/TelemetryBar';
import { OptionCard } from '@/components/ui/OptionCard';
import { PaletteCell } from '@/components/ui/PaletteCell';
import type { Question, QuizMode } from '@/types';
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  RotateCcw,
  AlertTriangle,
  SlidersHorizontal,
  LayoutGrid,
  Clock,
  Keyboard,
  X,
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
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);
  const [showShortcutsGuide, setShowShortcutsGuide] = useState(false);
  const [questionElapsedSeconds, setQuestionElapsedSeconds] = useState(0);

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
    clearAnswer,
    toggleMarkForReview,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
    getQuestionStatus,
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
    setMobilePaletteOpen(false);
    router.push(`/results/${cleanId}`);
  }, [cleanId, submitExam, router]);

  // When timer expires in proctored test mode, automatically route to performance report
  useEffect(() => {
    if (isSubmitted && mode === 'test' && timeRemaining === 0) {
      router.push(`/results/${cleanId}`);
    }
  }, [isSubmitted, mode, timeRemaining, cleanId, router]);

  // Track per-question pacing time (resets whenever question changes)
  useEffect(() => {
    setQuestionElapsedSeconds(0);
  }, [currentIndex]);

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setQuestionElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Global Keyboard Navigation (Power User Shortcuts)
  useEffect(() => {
    if (isSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes inside inputs or textareas
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      const key = e.key;
      const keyLower = key.toLowerCase();

      // Number keys 1-5 for options
      const optionNumKeys = ['1', '2', '3', '4', '5'];
      const numIdx = optionNumKeys.indexOf(key);
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

      // Next Question: Right Arrow, Enter, or Key N
      if (key === 'ArrowRight' || key === 'Enter' || keyLower === 'n') {
        e.preventDefault();
        if (currentIndex < totalQuestions - 1) {
          nextQuestion();
        } else {
          setShowSubmitModal(true);
        }
        return;
      }

      // Previous Question: Left Arrow or Key P
      if (key === 'ArrowLeft' || keyLower === 'p') {
        e.preventDefault();
        if (currentIndex > 0) {
          prevQuestion();
        }
        return;
      }

      // Review Later (Flag): Key M or Key F
      if (keyLower === 'm' || keyLower === 'f') {
        e.preventDefault();
        toggleMarkForReview();
        return;
      }

      // Clear selection: Backspace or Delete
      if (key === 'Backspace' || key === 'Delete') {
        e.preventDefault();
        clearAnswer();
        return;
      }

      // Toggle shortcuts help: Key ?
      if (key === '?') {
        e.preventDefault();
        setShowShortcutsGuide((prev) => !prev);
        return;
      }

      // Close modal / drawer on Escape
      if (key === 'Escape') {
        setShowSubmitModal(false);
        setMobilePaletteOpen(false);
        setShowShortcutsGuide(false);
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
    clearAnswer,
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

    // Horizontal swipe threshold > 50px and primary horizontal direction
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        // Swiped Left -> Next Question
        if (currentIndex < totalQuestions - 1) {
          nextQuestion();
        }
      } else {
        // Swiped Right -> Previous Question
        if (currentIndex > 0) {
          prevQuestion();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (totalQuestions === 0 || !currentQuestion) {
    return (
      <div className="fixed inset-0 w-full h-[100dvh] flex items-center justify-center p-6 bg-[#F8F9FF]">
        <div className="max-w-md w-full p-8 rounded-[28px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.04] text-center space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-[#FFF1DA] text-[#F1A501]">
            <AlertTriangle size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#181E4B]">No Questions Available</h2>
          <p className="font-sans text-sm text-[#5E6282] leading-relaxed">
            The selected assessment track or chapter problem set could not be loaded.
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-2.5 rounded-full bg-[#F1A501] hover:bg-[#d99100] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(241,165,1,0.25)] transition-all cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const selectedAnswer = answers[currentQuestion.id];
  const isMarked = Boolean(marked[currentQuestion.id]);

  // Format per-question time
  const questionMinutes = Math.floor(questionElapsedSeconds / 60);
  const questionSeconds = questionElapsedSeconds % 60;
  const questionPacingFormatted = `${String(questionMinutes).padStart(2, '0')}:${String(questionSeconds).padStart(2, '0')}`;
  const isPacingHigh = questionElapsedSeconds > 90;

  return (
    <div className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col bg-[#F8F9FF] select-none md:select-auto">
      {/* Top Header Bar */}
      <TelemetryBar
        title={title}
        mode={mode}
        onModeChange={setMode}
        timeRemainingSeconds={timeRemaining}
        totalTimeSeconds={totalTime}
        answeredCount={stats.answeredCount}
        totalQuestions={totalQuestions}
        markedCount={stats.markedCount}
        onSubmit={() => setShowSubmitModal(true)}
        isSubmitted={isSubmitted}
        onOpenPalette={() => setMobilePaletteOpen(true)}
      />

      {/* Main Workspace — strictly viewport-locked (never causes page scroll) */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch overflow-hidden">
          
          {/* Left Arena (8 Columns on desktop, full width on mobile): Non-scrollable shell with scrollable inner stem */}
          <section className="lg:col-span-8 flex flex-col min-h-0 h-full rounded-[20px] sm:rounded-[26px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-black/[0.04] overflow-hidden">
            
            {/* Question Card Header (Pinned Top) */}
            <div className="shrink-0 px-4 sm:px-8 pt-4 sm:pt-6 pb-2 sm:pb-3 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <span className="font-sans text-xs font-bold uppercase tracking-wider bg-[#DF6951]/10 text-[#DF6951] px-3 py-1 rounded-full">
                  Question {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
                </span>

                {currentQuestion.difficulty && (
                  <span className="font-sans text-[11px] font-semibold bg-[#181E4B]/5 text-[#181E4B] px-2.5 py-0.5 rounded-full capitalize">
                    {currentQuestion.difficulty}
                  </span>
                )}

                {/* Per-Question Pacing Indicator */}
                {!isSubmitted && (
                  <div
                    className={cn(
                      'flex items-center gap-1 font-sans text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors tabular-nums',
                      isPacingHigh
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    )}
                    title="Pacing: Time spent on this problem"
                  >
                    <Clock size={11} aria-hidden="true" />
                    <span>{questionPacingFormatted}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Keyboard Shortcuts Trigger (Desktop) */}
                <button
                  type="button"
                  onClick={() => setShowShortcutsGuide(true)}
                  className="hidden md:inline-flex items-center gap-1 font-sans text-xs font-semibold text-slate-500 hover:text-[#181E4B] bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-full border border-black/[0.05] transition-colors cursor-pointer"
                  title="View Keyboard Shortcuts (?)"
                >
                  <Keyboard size={12} aria-hidden="true" />
                  <span>Shortcuts</span>
                </button>

                {/* Mobile Question Matrix Trigger */}
                <button
                  type="button"
                  onClick={() => setMobilePaletteOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181E4B]/5 hover:bg-[#181E4B]/10 text-[#181E4B] font-sans text-xs font-bold transition-colors cursor-pointer"
                >
                  <LayoutGrid size={13} className="text-[#DF6951]" aria-hidden="true" />
                  <span>Matrix</span>
                </button>

                {isMarked && (
                  <span className="font-sans text-xs font-bold bg-[#FFF1DA] text-[#DF6951] px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#DF6951]/30">
                    <Flag size={11} aria-hidden="true" />
                    <span className="hidden sm:inline">Review Later</span>
                  </span>
                )}
              </div>
            </div>

            {/* Scrollable Question Arena — internal scroll only, with mobile touch swipe */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-2 custom-scrollbar"
            >
              {/* Question Formulation Stem */}
              <div className="py-2 mb-6">
                <h2 className="font-serif text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-[#181E4B] leading-[1.55] tracking-tight">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3 pb-4" role="radiogroup" aria-label="Multiple Choice Options">
                {currentQuestion.options.map((optionText, optIdx) => {
                  const isSelected = selectedAnswer === optIdx;
                  const isCorrect = isSubmitted && optIdx === currentQuestion.correctOption;
                  const isWrong = isSubmitted && isSelected && optIdx !== currentQuestion.correctOption;
                  const letter = String.fromCharCode(65 + optIdx);

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
                      hotkey={`${optIdx + 1} / ${letter}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Fixed Action Toolbar (Pinned at bottom of question card) */}
            <div className="shrink-0 px-4 sm:px-8 py-3 sm:py-4 bg-white border-t border-black/[0.04] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMarkForReview}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                    isMarked
                      ? 'border-[#DF6951] bg-[#DF6951]/10 text-[#DF6951]'
                      : 'border-black/10 text-[#5E6282] hover:border-[#DF6951] hover:text-[#DF6951]'
                  )}
                  title="Mark for review (Shortcut: M)"
                >
                  <Flag size={13} aria-hidden="true" />
                  <span className="hidden sm:inline">{isMarked ? 'Unmark' : 'Review Later'}</span>
                  <span className="sm:hidden">{isMarked ? 'Flagged' : 'Flag'}</span>
                  <span className="hidden lg:inline text-[10px] font-mono text-slate-400 ml-0.5">[M]</span>
                </button>

                {selectedAnswer !== undefined && selectedAnswer !== null && !isSubmitted && (
                  <button
                    type="button"
                    onClick={clearAnswer}
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 font-sans text-xs font-semibold text-[#5E6282] hover:text-[#DF6951] transition-colors cursor-pointer"
                    title="Clear selection (Shortcut: Backspace)"
                  >
                    <RotateCcw size={12} aria-hidden="true" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={prevQuestion}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-black/10 text-[#181E4B] hover:bg-black/5 font-sans text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Previous question (Shortcut: ←)"
                >
                  <ArrowLeft size={13} aria-hidden="true" />
                  <span>Prev</span>
                </button>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={nextQuestion}
                    className="inline-flex items-center gap-1.5 px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-[#F1A501] hover:bg-[#d99100] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(241,165,1,0.22)] transition-all cursor-pointer"
                    title="Next question (Shortcut: →)"
                  >
                    <span>Next</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="inline-flex items-center gap-1.5 px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(223,105,81,0.22)] transition-all cursor-pointer"
                  >
                    <span>Finish</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Right Console (4 Columns on Desktop): Candidate Docket & Matrix Palette */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col min-h-0 h-full rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] border border-black/[0.04] overflow-hidden">
            
            {/* Docket Header (Pinned) */}
            <div className="shrink-0 px-6 pt-5 pb-3 border-b border-black/[0.04] flex items-center justify-between">
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#DF6951] block">
                  Question Palette
                </span>
                <span className="font-serif text-base font-bold text-[#181E4B]">
                  {stats.answeredCount} of {totalQuestions} Answered
                </span>
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider bg-[#F1A501]/10 text-[#F1A501] px-2.5 py-1 rounded-full">
                {mode === 'test' ? 'Proctored' : 'Practice'}
              </span>
            </div>

            {/* Matrix Body (Scrollable if many questions) */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 custom-scrollbar space-y-5">
              <div className="grid grid-cols-6 gap-2">
                {initialQuestions.map((q, idx) => {
                  const status = getQuestionStatus(idx);
                  const isActive = idx === currentIndex;

                  return (
                    <PaletteCell
                      key={q.id}
                      questionNumber={idx + 1}
                      status={status}
                      isActive={isActive}
                      onClick={() => goToQuestion(idx)}
                    />
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-[#5E6282] border-t border-black/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#181E4B]" />
                  <span>Answered ({stats.answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FFF1DA] border-2 border-[#F1A501]" />
                  <span>Review ({stats.markedCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-white border border-black/20" />
                  <span>Unanswered ({stats.unansweredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#F8F9FF] border border-black/[0.04]" />
                  <span>Unvisited</span>
                </div>
              </div>
            </div>

            {/* Exam Actions (Pinned at bottom of docket) */}
            <div className="shrink-0 px-6 py-4 border-t border-black/[0.04] bg-white space-y-2.5">
              {isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitConfirm}
                  className="w-full py-3 rounded-full bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(223,105,81,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>View Performance Report</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-3 rounded-full bg-[#181E4B] hover:bg-[#212832] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(24,30,75,0.15)] transition-all cursor-pointer"
                >
                  Finish & Evaluate Test
                </button>
              )}

              <Link
                href="/practice"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-black/10 hover:border-[#DF6951] hover:text-[#DF6951] text-[#5E6282] font-sans text-xs font-bold uppercase tracking-wider transition-all"
              >
                <SlidersHorizontal size={12} aria-hidden="true" />
                <span>Change Options</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Question Matrix Drawer (Bottom Sheet) */}
      {mobilePaletteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-palette-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#181E4B]/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150"
        >
          <div
            className="w-full max-w-lg max-h-[85vh] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-black/[0.05] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
          >
            {/* Sheet Header */}
            <div className="shrink-0 px-6 py-4 border-b border-black/[0.05] flex items-center justify-between">
              <div>
                <h3 id="mobile-palette-title" className="font-serif text-lg font-bold text-[#181E4B]">
                  Question Matrix
                </h3>
                <span className="font-sans text-xs text-[#5E6282]">
                  {stats.answeredCount} answered · {stats.markedCount} marked for review
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-[#181E4B] transition-colors"
                aria-label="Close palette"
              >
                <X size={16} />
              </button>
            </div>

            {/* Sheet Grid Content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 custom-scrollbar space-y-5">
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
                {initialQuestions.map((q, idx) => {
                  const status = getQuestionStatus(idx);
                  const isActive = idx === currentIndex;

                  return (
                    <PaletteCell
                      key={`mobile-${q.id}`}
                      questionNumber={idx + 1}
                      status={status}
                      isActive={isActive}
                      onClick={() => {
                        goToQuestion(idx);
                        setMobilePaletteOpen(false);
                      }}
                    />
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-[#5E6282] border-t border-black/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#181E4B]" />
                  <span>Answered ({stats.answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FFF1DA] border-2 border-[#F1A501]" />
                  <span>Review ({stats.markedCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-white border border-black/20" />
                  <span>Unanswered ({stats.unansweredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#F8F9FF] border border-black/[0.04]" />
                  <span>Unvisited</span>
                </div>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="shrink-0 p-4 border-t border-black/[0.05] bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(false)}
                className="flex-1 py-2.5 rounded-full border border-black/10 text-[#181E4B] font-sans text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Return to Question
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobilePaletteOpen(false);
                  setShowSubmitModal(true);
                }}
                className="flex-1 py-2.5 rounded-full bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      {showShortcutsGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181E4B]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
        >
          <div className="max-w-md w-full rounded-[24px] bg-white p-6 shadow-2xl border border-black/[0.05] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#181E4B]">
                <Keyboard size={18} className="text-[#DF6951]" aria-hidden="true" />
                <h3 id="shortcuts-title" className="font-serif text-lg font-bold">
                  Keyboard Shortcuts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcutsGuide(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                aria-label="Close shortcuts guide"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2 text-xs font-sans text-slate-700 divide-y divide-black/[0.04]">
              <div className="flex items-center justify-between py-1.5">
                <span>Select Option A, B, C, D</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">1-4</kbd>
                  <span>or</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">A-D</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Next Question</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">→</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">Enter</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">N</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Previous Question</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">←</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">P</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Mark for Review (Flag)</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">M</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Clear Selection</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">Backspace</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Close Dialogs / Drawers</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold border border-slate-200">Esc</kbd>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowShortcutsGuide(false)}
                className="px-4 py-2 rounded-full bg-[#181E4B] text-white text-xs font-bold uppercase tracking-wider"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181E4B]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
        >
          <div className="max-w-md w-full rounded-[28px] bg-white p-7 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-black/[0.05] space-y-5 animate-in zoom-in-95 duration-200">
            <h3 id="submit-modal-title" className="font-serif text-2xl font-bold text-[#181E4B]">
              Submit Examination Session?
            </h3>
            <p className="font-sans text-sm text-[#5E6282] leading-relaxed">
              You have answered <strong className="text-[#181E4B]">{stats.answeredCount}</strong> of{' '}
              <strong className="text-[#181E4B]">{totalQuestions}</strong> questions.
              {stats.unansweredCount > 0 && (
                <span className="block mt-2 text-[#DF6951] font-semibold">
                  Notice: {stats.unansweredCount} questions remain unattempted.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-5 py-2.5 rounded-full border border-black/10 text-[#181E4B] hover:bg-black/5 font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Resume Test
              </button>
              <button
                type="button"
                onClick={handleSubmitConfirm}
                className="px-6 py-2.5 rounded-full bg-[#DF6951] hover:bg-[#c9533c] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_6px_16px_rgba(223,105,81,0.25)] transition-all cursor-pointer"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
