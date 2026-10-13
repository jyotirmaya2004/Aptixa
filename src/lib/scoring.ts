import type { Question, QuizMode } from '@/types';

export interface ScoreBreakdown {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  score: number;
  maxScore: number;
  percentage: number;
}

/**
 * Calculates candidate scores based on standardized competitive examination schemes:
 * - Diagnostic Quiz Mode: +1.0 per correct answer, 0 penalty for incorrect, maxScore = totalQuestions.
 * - Proctored Test Mode: +3.0 per correct answer, -0.75 penalty per incorrect answer, 0 for unattempted, maxScore = totalQuestions * 3.
 */
export function calculateExamScore(
  questions: Question[],
  answers: Record<string, number | null>,
  mode: QuizMode = 'quiz'
): ScoreBreakdown {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let answeredCount = 0;

  for (const q of questions) {
    const selected = answers[q.id];
    if (selected !== undefined && selected !== null) {
      answeredCount++;
      if (selected === q.correctOption) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  }

  const unansweredCount = totalQuestions - answeredCount;

  let score = 0;
  if (mode === 'test') {
    score = correctCount * 3.0 - wrongCount * 0.75;
  } else {
    score = correctCount * 1.0;
  }

  const maxScore = mode === 'test' ? totalQuestions * 3.0 : totalQuestions * 1.0;
  const rawPercentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const percentage = Math.max(0, Math.round(rawPercentage));

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    wrongCount,
    unansweredCount,
    score: Math.max(0, Number(score.toFixed(2))),
    maxScore,
    percentage,
  };
}
