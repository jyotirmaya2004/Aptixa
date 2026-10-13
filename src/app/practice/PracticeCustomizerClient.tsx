'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Book, Category } from '@/types';
import {
  BookOpen,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PracticeCustomizerClientProps {
  books: Book[];
  categories: Category[];
}

export function PracticeCustomizerClient({ books }: PracticeCustomizerClientProps) {
  const router = useRouter();

  // Track selection
  const [selectedTrack, setSelectedTrack] = useState<'quant' | 'reasoning' | 'mixed'>('quant');

  // Chapter selection
  const quantBook = useMemo(() => books.find((b) => b.id.includes('quant')) || books[0], [books]);
  const reasoningBook = useMemo(() => books.find((b) => b.id.includes('lr') || b.id.includes('reasoning')) || books[1], [books]);

  const availableChapters = useMemo(() => {
    if (selectedTrack === 'quant') {
      return quantBook?.chapters || [];
    }
    if (selectedTrack === 'reasoning') {
      return reasoningBook?.chapters || [];
    }
    return [];
  }, [selectedTrack, quantBook, reasoningBook]);

  // Selected chapter: 'all' or specific chapter file
  const [selectedChapterFile, setSelectedChapterFile] = useState<string>('all');

  // Question count: 10, 20, 30, 50
  const [questionCount, setQuestionCount] = useState<number>(20);

  // Difficulty: 'All', 'Easy', 'Medium', 'Hard'
  const [difficulty, setDifficulty] = useState<string>('All');

  // Mode: 'quiz' | 'test'
  const [mode, setMode] = useState<'quiz' | 'test'>('quiz');

  // Pacing / Time: 'standard' (1 min/Q), 'sprint' (45s/Q), 'extended' (2 min/Q), 'untimed'
  const [pacing, setPacing] = useState<'standard' | 'sprint' | 'extended' | 'untimed'>('standard');

  // Calculate total time in minutes
  const totalTimeMinutes = useMemo(() => {
    if (pacing === 'untimed') return 0;
    if (pacing === 'sprint') return Math.max(Math.round((questionCount * 45) / 60), 5);
    if (pacing === 'extended') return questionCount * 2;
    return questionCount * 1; // standard 1 min per Q
  }, [pacing, questionCount]);

  // Determine effective session file ID
  const effectiveSessionId = useMemo(() => {
    if (selectedChapterFile !== 'all') {
      return selectedChapterFile;
    }
    if (selectedTrack === 'quant') {
      return 'quantitative';
    }
    if (selectedTrack === 'reasoning') {
      return 'logical';
    }
    return 'mixed';
  }, [selectedChapterFile, selectedTrack]);

  // Handle launch
  const handleLaunchQuiz = () => {
    const params = new URLSearchParams();
    params.set('mode', mode);
    params.set('count', String(questionCount));
    if (difficulty !== 'All') {
      params.set('difficulty', difficulty);
    }
    if (pacing !== 'untimed' && totalTimeMinutes > 0) {
      params.set('time', String(totalTimeMinutes));
    }

    const targetUrl = `/quiz/${effectiveSessionId}?${params.toString()}`;
    router.push(targetUrl);
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-6 py-8 sm:py-12 lg:px-12">
      {/* Studio Header */}
      <div className="max-w-3xl mb-10">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#DF6951] block mb-2">
          CUSTOMIZE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B] mb-3">
          Customize Your Test
        </h1>
        <p className="font-sans text-base text-[#5E6282] leading-relaxed">
          Configure question count, topics, difficulty, and timing. Questions are randomly generated on each session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Arena: Customization Options Matrix (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Track Selection */}
          <section className="rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DF6951]/10 text-[#DF6951] font-bold text-xs">
                1
              </span>
              <h2 className="font-serif text-xl font-bold text-[#181E4B]">
                Curriculum Assessment Track
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('quant');
                  setSelectedChapterFile('all');
                }}
                className={cn(
                  'flex flex-col text-left p-5 rounded-[20px] border transition-all duration-200 cursor-pointer',
                  selectedTrack === 'quant'
                    ? 'border-[#181E4B] bg-[#F8F9FF] ring-2 ring-[#181E4B]/10 shadow-xs'
                    : 'border-black/[0.06] bg-white hover:border-[#F1A501] hover:bg-slate-50/50'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951]">
                    R.S. Aggarwal
                  </span>
                  {selectedTrack === 'quant' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#181E4B] text-white">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#181E4B] mb-1">
                  Quantitative Aptitude
                </h3>
                <p className="font-sans text-xs text-[#5E6282] leading-relaxed">
                  35+ Standardized Chapters covering arithmetic, algebra & numeric drills.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('reasoning');
                  setSelectedChapterFile('all');
                }}
                className={cn(
                  'flex flex-col text-left p-5 rounded-[20px] border transition-all duration-200 cursor-pointer',
                  selectedTrack === 'reasoning'
                    ? 'border-[#181E4B] bg-[#F8F9FF] ring-2 ring-[#181E4B]/10 shadow-xs'
                    : 'border-black/[0.06] bg-white hover:border-[#F1A501] hover:bg-slate-50/50'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951]">
                    Arun Sharma
                  </span>
                  {selectedTrack === 'reasoning' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#181E4B] text-white">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#181E4B] mb-1">
                  Logical Reasoning
                </h3>
                <p className="font-sans text-xs text-[#5E6282] leading-relaxed">
                  Analytical deductions, blood relations, series & arrangement puzzles.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('mixed');
                  setSelectedChapterFile('all');
                }}
                className={cn(
                  'flex flex-col text-left p-5 rounded-[20px] border transition-all duration-200 cursor-pointer',
                  selectedTrack === 'mixed'
                    ? 'border-[#181E4B] bg-[#F8F9FF] ring-2 ring-[#181E4B]/10 shadow-xs'
                    : 'border-black/[0.06] bg-white hover:border-[#F1A501] hover:bg-slate-50/50'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#DF6951]">
                    Placement Exam
                  </span>
                  {selectedTrack === 'mixed' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#181E4B] text-white">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#181E4B] mb-1">
                  Comprehensive Mix
                </h3>
                <p className="font-sans text-xs text-[#5E6282] leading-relaxed">
                  Full multi-disciplinary cross-section mirroring real placement drives.
                </p>
              </button>
            </div>

            {/* Specific Chapter Selection (if Track has individual chapters) */}
            {availableChapters.length > 0 && (
              <div className="mt-6 pt-2">
                <label htmlFor="chapter-select" className="block font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282] mb-2.5">
                  Specific Chapter Focus (Optional)
                </label>
                <select
                  id="chapter-select"
                  value={selectedChapterFile}
                  onChange={(e) => setSelectedChapterFile(e.target.value)}
                  className="w-full px-4 py-3 rounded-[14px] bg-[#F8F9FF] border border-black/[0.08] text-sm font-semibold text-[#181E4B] focus:outline-none focus:ring-2 focus:ring-[#F1A501] cursor-pointer"
                >
                  <option value="all">All Chapters Combined (Comprehensive Question Pool)</option>
                  {availableChapters.map((ch) => (
                    <option key={ch.id} value={ch.file}>
                      Chapter {ch.chapter_number}: {ch.title} ({ch.question_count} MCQs)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </section>

          {/* Section 2: Question Volume & Difficulty */}
          <section className="rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DF6951]/10 text-[#DF6951] font-bold text-xs">
                2
              </span>
              <h2 className="font-serif text-xl font-bold text-[#181E4B]">
                Question Volume & Difficulty
              </h2>
            </div>

            <div className="space-y-6">
              {/* Question Count Pills */}
              <div>
                <span className="block font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282] mb-3">
                  Number of Questions
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { count: 10, label: '10 MCQs', desc: 'Quick 10-Min Drill' },
                    { count: 20, label: '20 MCQs', desc: 'Standard Practice' },
                    { count: 30, label: '30 MCQs', desc: 'Full Test Paper' },
                    { count: 50, label: '50 MCQs', desc: 'Marathon Sprint' },
                  ].map((item) => (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => setQuestionCount(item.count)}
                      className={cn(
                        'p-4 rounded-[18px] border text-center transition-all duration-150 cursor-pointer',
                        questionCount === item.count
                          ? 'border-[#181E4B] bg-[#181E4B] text-white shadow-xs'
                          : 'border-black/[0.06] bg-[#F8F9FF] text-[#181E4B] hover:border-[#F1A501] hover:bg-white'
                      )}
                    >
                      <div className="font-sans text-base font-bold mb-0.5">
                        {item.label}
                      </div>
                      <div className={cn('text-[0.6875rem] font-medium', questionCount === item.count ? 'text-white/80' : 'text-[#5E6282]')}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <span className="block font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282] mb-3">
                  Target Difficulty Level
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'All', label: 'All Levels', desc: 'Natural Spread' },
                    { id: 'Easy', label: 'Easy', desc: 'Core Fundamentals' },
                    { id: 'Medium', label: 'Medium', desc: 'Campus Standard' },
                    { id: 'Hard', label: 'Hard', desc: 'Top Cutoff Level' },
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setDifficulty(diff.id)}
                      className={cn(
                        'p-3.5 rounded-[16px] border text-center transition-all duration-150 cursor-pointer',
                        difficulty === diff.id
                          ? 'border-[#DF6951] bg-[#DF6951] text-white shadow-xs'
                          : 'border-black/[0.06] bg-[#F8F9FF] text-[#181E4B] hover:border-[#DF6951] hover:bg-white'
                      )}
                    >
                      <div className="font-sans text-sm font-bold">
                        {diff.label}
                      </div>
                      <div className={cn('text-[0.6875rem]', difficulty === diff.id ? 'text-white/80' : 'text-[#5E6282]')}>
                        {diff.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Assessment Mode & Timing */}
          <section className="rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.04]">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DF6951]/10 text-[#DF6951] font-bold text-xs">
                3
              </span>
              <h2 className="font-serif text-xl font-bold text-[#181E4B]">
                Assessment Mode & Pacing
              </h2>
            </div>

            <div className="space-y-6">
              {/* Mode Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMode('quiz')}
                  className={cn(
                    'p-5 rounded-[20px] border text-left transition-all duration-200 cursor-pointer',
                    mode === 'quiz'
                      ? 'border-[#DF6951] bg-[#FFF8EE] ring-2 ring-[#DF6951]/15'
                      : 'border-black/[0.06] bg-white hover:border-[#DF6951]'
                  )}
                >
                  <div className="flex items-center gap-2 text-[#DF6951] mb-2 font-bold text-xs uppercase tracking-wider">
                    <BookOpen size={16} />
                    <span>Practice Quiz Mode</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#181E4B] mb-1">
                    Self-Paced Practice
                  </h4>
                  <p className="font-sans text-xs text-[#5E6282] leading-relaxed">
                    Distraction-free question practice with zero negative marking penalty. Comprehensive performance review upon completion.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('test')}
                  className={cn(
                    'p-5 rounded-[20px] border text-left transition-all duration-200 cursor-pointer',
                    mode === 'test'
                      ? 'border-[#F1A501] bg-[#FFF8EE] ring-2 ring-[#F1A501]/15'
                      : 'border-black/[0.06] bg-white hover:border-[#F1A501]'
                  )}
                >
                  <div className="flex items-center gap-2 text-[#F1A501] mb-2 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck size={16} />
                    <span>Proctored Test Mode</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#181E4B] mb-1">
                    Authentic Examination Pressure
                  </h4>
                  <p className="font-sans text-xs text-[#5E6282] leading-relaxed">
                    Live timer countdown with strict +3.0 / -0.75 negative scoring. Full diagnostic review upon completion.
                  </p>
                </button>
              </div>

              {/* Timing & Pacing Selection */}
              <div>
                <span className="block font-sans text-xs font-bold uppercase tracking-wider text-[#5E6282] mb-3">
                  Pacing & Time Limit
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'standard', label: 'Standard Pace', desc: '1 min / MCQ' },
                    { id: 'sprint', label: 'Speed Sprint', desc: '45 sec / MCQ' },
                    { id: 'extended', label: 'Deep Solve', desc: '2 min / MCQ' },
                    { id: 'untimed', label: 'Untimed', desc: 'Self-Paced Practice' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPacing(p.id as typeof pacing)}
                      className={cn(
                        'p-3.5 rounded-[16px] border text-center transition-all duration-150 cursor-pointer',
                        pacing === p.id
                          ? 'border-[#F1A501] bg-[#F1A501] text-white shadow-xs'
                          : 'border-black/[0.06] bg-[#F8F9FF] text-[#181E4B] hover:border-[#F1A501] hover:bg-white'
                      )}
                    >
                      <div className="font-sans text-sm font-bold">
                        {p.label}
                      </div>
                      <div className={cn('text-[0.6875rem]', pacing === p.id ? 'text-white/80' : 'text-[#5E6282]')}>
                        {p.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Summary Console: Sticky Overview & Launch CTA (4 Columns) */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="rounded-[28px] bg-white p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.04]">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-[#DF6951]" aria-hidden="true" />
              <h3 className="font-serif text-xl font-bold text-[#181E4B]">
                Session Docket Preview
              </h3>
            </div>

            <div className="space-y-2 mb-8 text-sm">
              <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F9FF]">
                <span className="font-sans text-xs font-semibold text-[#5E6282]">Track</span>
                <span className="font-bold text-[#181E4B] capitalize">
                  {selectedTrack === 'quant' ? 'Quantitative' : selectedTrack === 'reasoning' ? 'Logical Reasoning' : 'Mixed Assessment'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F9FF]">
                <span className="font-sans text-xs font-semibold text-[#5E6282]">Chapter Focus</span>
                <span className="font-bold text-[#181E4B] truncate max-w-[180px]">
                  {selectedChapterFile === 'all' ? 'All Topics' : 'Specific Chapter'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F9FF]">
                <span className="font-sans text-xs font-semibold text-[#5E6282]">Question Count</span>
                <span className="font-bold text-[#DF6951]">
                  {questionCount} MCQs
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F9FF]">
                <span className="font-sans text-xs font-semibold text-[#5E6282]">Difficulty</span>
                <span className="font-bold text-[#181E4B]">
                  {difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F9FF]">
                <span className="font-sans text-xs font-semibold text-[#5E6282]">Mode</span>
                <span className="font-bold text-[#F1A501] uppercase text-xs">
                  {mode === 'test' ? 'Proctored Standard' : 'Practice Quiz'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#F8F9FF]">
                <span className="font-sans text-xs font-semibold text-[#5E6282]">Session Duration</span>
                <span className="font-bold text-[#181E4B]">
                  {pacing === 'untimed' ? 'Untimed' : `${totalTimeMinutes} Minutes`}
                </span>
              </div>
            </div>

            {/* Launch Action CTA */}
            <button
              type="button"
              onClick={handleLaunchQuiz}
              className="w-full py-4 px-6 rounded-full bg-[#F1A501] hover:bg-[#d99100] text-white font-sans text-sm font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(241,165,1,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Launch Practice Session</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
