'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Question, QuizMode, QuestionStatus } from '@/types';
import { calculateExamScore } from '@/lib/scoring';

function loadFromStorage(cleanKey: string, rawKey?: string) {
  if (typeof window === 'undefined') return null;
  try {
    const raw =
      localStorage.getItem(cleanKey) ||
      (rawKey ? localStorage.getItem(rawKey) : null);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useQuizSession(
  sessionId: string,
  initialQuestions: Question[],
  initialMode: QuizMode = 'quiz',
  category = 'General Aptitude',
  topic = 'Placement Examination',
  customInitialTimeSeconds?: number
) {
  const totalQuestions = initialQuestions.length;
  const initialTime = useMemo(() => {
    if (typeof customInitialTimeSeconds === 'number' && customInitialTimeSeconds > 0) {
      return customInitialTimeSeconds;
    }
    return totalQuestions * 60; // default 60 seconds per question
  }, [totalQuestions, customInitialTimeSeconds]);

  const cleanSessionId = useMemo(() => {
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

  const storageKey = `aptixa_session_${cleanSessionId}`;
  const rawStorageKey = `aptixa_session_${sessionId}`;

  const [mode, setMode] = useState<QuizMode>(() => {
    return (
      loadFromStorage(storageKey, rawStorageKey)?.mode || initialMode
    );
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = loadFromStorage(storageKey, rawStorageKey)?.currentIndex;
    return typeof saved === 'number' && saved >= 0 && saved < totalQuestions ? saved : 0;
  });

  const [answers, setAnswers] = useState<Record<string, number | null>>(() => {
    return loadFromStorage(storageKey, rawStorageKey)?.answers || {};
  });

  const [marked, setMarked] = useState<Record<string, boolean>>(() => {
    return loadFromStorage(storageKey, rawStorageKey)?.marked || {};
  });

  const [visited, setVisited] = useState<Record<string, boolean>>(() => {
    const v = loadFromStorage(storageKey, rawStorageKey)?.visited || {};
    const firstQId = initialQuestions[0]?.id;
    if (firstQId) v[firstQId] = true;
    return v;
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const saved = loadFromStorage(storageKey, rawStorageKey)?.timeRemaining;
    return typeof saved === 'number' ? saved : initialTime;
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    return loadFromStorage(storageKey, rawStorageKey)?.isSubmitted ?? false;
  });

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          sessionId,
          category,
          topic,
          mode,
          currentIndex,
          answers,
          marked,
          visited,
          timeRemaining,
          isSubmitted,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore localStorage write failures in restricted environments
    }
  }, [storageKey, sessionId, category, topic, mode, currentIndex, answers, marked, visited, timeRemaining, isSubmitted]);

  // Countdown timer for test mode
  useEffect(() => {
    if (mode !== 'test' || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isSubmitted]);

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (isSubmitted) return;
      const currentQ = initialQuestions[currentIndex];
      if (!currentQ) return;

      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionIndex,
      }));
    },
    [currentIndex, initialQuestions, isSubmitted]
  );

  const clearAnswer = useCallback(() => {
    if (isSubmitted) return;
    const currentQ = initialQuestions[currentIndex];
    if (!currentQ) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: null,
    }));
  }, [currentIndex, initialQuestions, isSubmitted]);

  const toggleMarkForReview = useCallback(() => {
    const currentQ = initialQuestions[currentIndex];
    if (!currentQ) return;

    setMarked((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  }, [currentIndex, initialQuestions]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
        const targetQ = initialQuestions[index];
        if (targetQ?.id) {
          setVisited((prev) => ({ ...prev, [targetQ.id]: true }));
        }
      }
    },
    [totalQuestions, initialQuestions]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      const targetQ = initialQuestions[nextIdx];
      if (targetQ?.id) {
        setVisited((prev) => ({ ...prev, [targetQ.id]: true }));
      }
    }
  }, [currentIndex, totalQuestions, initialQuestions]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const targetQ = initialQuestions[prevIdx];
      if (targetQ?.id) {
        setVisited((prev) => ({ ...prev, [targetQ.id]: true }));
      }
    }
  }, [currentIndex, initialQuestions]);

  const submitExam = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  // Compute question statuses for the palette matrix
  const getQuestionStatus = useCallback(
    (index: number): QuestionStatus => {
      const q = initialQuestions[index];
      if (!q) return 'unvisited';

      const isAns = answers[q.id] !== undefined && answers[q.id] !== null;
      const isMkd = Boolean(marked[q.id]);
      const isVis = Boolean(visited[q.id]);

      if (isMkd && isAns) return 'marked-answered';
      if (isMkd) return 'marked';
      if (isAns) return 'answered';
      if (isVis) return 'unanswered';
      return 'unvisited';
    },
    [answers, marked, visited, initialQuestions]
  );

  // Score computation
  const stats = useMemo(() => {
    const breakdown = calculateExamScore(initialQuestions, answers, mode);
    return {
      ...breakdown,
      markedCount: Object.values(marked).filter(Boolean).length,
    };
  }, [answers, marked, initialQuestions, mode]);

  return {
    mode,
    setMode,
    currentIndex,
    currentQuestion: initialQuestions[currentIndex] || null,
    totalQuestions,
    answers,
    marked,
    visited,
    timeRemaining,
    totalTime: initialTime,
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
  };
}
