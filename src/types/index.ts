export type {
  Question,
  RawChapterQuestion,
  Category,
  Book,
  BookChapter,
  Article,
  CurrentAffairs,
  Attempt,
} from '@/lib/schema';

/**
 * Examination Mode
 * 'quiz' = Self-Paced Practice Assessment
 */
export type QuizMode = 'quiz' | 'test';

/**
 * Standard Status of a Question in the Examination Palette Matrix
 */
export type QuestionStatus =
  | 'unvisited'
  | 'unanswered'
  | 'answered'
  | 'marked'
  | 'marked-answered';

/**
 * In-memory active session state
 */
export interface ExamSessionState {
  sessionId: string;
  category: string;
  topic: string;
  mode: QuizMode;
  currentIndex: number;
  answers: Record<string, number | null>; // questionId -> selectedOptionIndex
  markedForReview: Record<string, boolean>; // questionId -> boolean
  visitedQuestions: Record<string, boolean>; // questionId -> boolean
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  isSubmitted: boolean;
  score?: number;
}
