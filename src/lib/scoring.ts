import type { Question } from '@/types';

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
 * Calculates candidate scores based on standardized placement assessment:
 * +1.0 per correct answer, 0 penalty for incorrect, maxScore = totalQuestions.
 */
export function calculateExamScore(
  questions: Question[],
  answers: Record<string, number | null>
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
  const score = correctCount * 1.0;
  const maxScore = totalQuestions * 1.0;
  const percentage = maxScore > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

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
