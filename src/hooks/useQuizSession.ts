'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Question, QuestionStatus } from '@/types';
import { calculateExamScore } from '@/lib/scoring';

function purgeLegacyLocalStorage() {
  if (typeof window === 'undefined') return;
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith('aptixa_session_')) {
        localStorage.removeItem(k);
      }
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
}

function loadFromSessionStorage(cleanKey: string, rawKey?: string) {
  if (typeof window === 'undefined') return null;
  try {
    purgeLegacyLocalStorage();

    const raw =
      sessionStorage.getItem(cleanKey) ||
      (rawKey ? sessionStorage.getItem(rawKey) : null);

    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // If an assessment was previously completed, discard to ensure a clean slate upon reopening
    if (parsed && parsed.isSubmitted) {
      sessionStorage.removeItem(cleanKey);
      if (rawKey) sessionStorage.removeItem(rawKey);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function useQuizSession(
  sessionId: string,
  initialQuestions: Question[],
  category = 'General Aptitude',
  topic = 'Placement Examination',
  customInitialTimeSeconds?: number
) {
  const totalQuestions = initialQuestions.length;
  const initialTime = useMemo(() => {
    if (typeof customInitialTimeSeconds === 'number' && customInitialTimeSeconds > 0) {
      return customInitialTimeSeconds;
    }
    return totalQuestions * 60;
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

  const mode = 'quiz' as const;

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = loadFromSessionStorage(storageKey, rawStorageKey)?.currentIndex;
    return typeof saved === 'number' && saved >= 0 && saved < totalQuestions ? saved : 0;
  });

  const [answers, setAnswers] = useState<Record<string, number | null>>(() => {
    return loadFromSessionStorage(storageKey, rawStorageKey)?.answers || {};
  });

  const [marked, setMarked] = useState<Record<string, boolean>>(() => {
    return loadFromSessionStorage(storageKey, rawStorageKey)?.marked || {};
  });

  const [visited, setVisited] = useState<Record<string, boolean>>(() => {
    const v = loadFromSessionStorage(storageKey, rawStorageKey)?.visited || {};
    const firstQId = initialQuestions[0]?.id;
    if (firstQId) v[firstQId] = true;
    return v;
  });

  const [timeRemaining] = useState<number>(initialTime);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Save active progress to sessionStorage (automatically cleaned when reopening app)
  useEffect(() => {
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          sessionId,
          category,
          topic,
          mode: 'quiz',
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
      // Ignore sessionStorage write failures
    }
  }, [storageKey, sessionId, category, topic, currentIndex, answers, marked, visited, timeRemaining, isSubmitted]);

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
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          sessionId,
          category,
          topic,
          mode: 'quiz',
          currentIndex,
          answers,
          marked,
          visited,
          timeRemaining,
          isSubmitted: true,
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [storageKey, sessionId, category, topic, currentIndex, answers, marked, visited, timeRemaining]);

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

  const stats = useMemo(() => {
    const breakdown = calculateExamScore(initialQuestions, answers);
    return {
      ...breakdown,
      markedCount: Object.values(marked).filter(Boolean).length,
    };
  }, [answers, marked, initialQuestions]);

  return {
    mode,
    setMode: () => {},
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
