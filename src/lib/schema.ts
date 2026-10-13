import { z } from 'zod';

/**
 * Standardized Unified Question Schema
 * Guaranteed uniform representation across all questions in the portal.
 */
export const QuestionSchema = z.object({
  id: z.string(),
  category: z.string(),
  topic: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  question: z.string(),
  options: z.array(z.string()).min(2),
  correctOption: z.number().int().min(0),
  hint: z.string().optional(),
  explanation: z.string().optional(),
  source: z.string().optional(),
  questionNumber: z.number().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;

/**
 * Raw Chapter Question Schema (handles R.S. Aggarwal & Arun Sharma formats)
 */
export const RawChapterQuestionSchema = z.object({
  id: z.string(),
  chapter: z.string().optional(),
  question_number: z.number().optional(),
  question: z.string(),
  options: z.union([
    z.record(z.string(), z.string()),
    z.array(z.string()),
  ]),
  correct_option: z.union([z.string(), z.number()]).optional(),
  correctOption: z.number().optional(),
  answer: z.string().optional(),
  book_page: z.number().optional(),
  pdf_page: z.number().optional(),
  explanation: z.string().optional(),
  hint: z.string().optional(),
});

export type RawChapterQuestion = z.infer<typeof RawChapterQuestionSchema>;

/**
 * Helper to normalize any raw question into the unified Question schema
 */
export function normalizeRawQuestion(
  raw: RawChapterQuestion,
  category = 'quantitative',
  topic = 'General Aptitude'
): Question {
  let optionsArray: string[] = [];
  let correctIndex = 0;

  if (Array.isArray(raw.options)) {
    optionsArray = raw.options;
  } else if (raw.options && typeof raw.options === 'object') {
    const keys = Object.keys(raw.options).sort();
    optionsArray = keys.map((k) => (raw.options as Record<string, string>)[k] || '');

    const correctKey = String(raw.correct_option || '').trim().toLowerCase();
    const foundIdx = keys.findIndex((k) => k.toLowerCase() === correctKey);
    if (foundIdx >= 0) {
      correctIndex = foundIdx;
    } else if (raw.answer) {
      const ansIdx = optionsArray.findIndex(
        (opt) => opt.trim().toLowerCase() === raw.answer?.trim().toLowerCase()
      );
      if (ansIdx >= 0) correctIndex = ansIdx;
    }
  }

  if (raw.correctOption !== undefined) {
    correctIndex = raw.correctOption;
  }

  return {
    id: raw.id,
    category,
    topic: raw.chapter || topic,
    question: raw.question,
    options: optionsArray.length > 0 ? optionsArray : ['Option 1', 'Option 2'],
    correctOption: correctIndex,
    hint: raw.hint,
    explanation: raw.explanation || (raw.answer ? `Correct answer: ${raw.answer}` : undefined),
    source: raw.chapter,
    questionNumber: raw.question_number,
  };
}

/**
 * Category Schema (categories.json)
 */
export const CategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  bgGradient: z.string().optional(),
  topics: z.array(z.string()),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Book & Chapter Schemas (books.json)
 */
export const BookChapterSchema = z.object({
  id: z.string(),
  chapter_number: z.number(),
  title: z.string(),
  question_count: z.number(),
  description: z.string(),
  file: z.string(),
});

export type BookChapter = z.infer<typeof BookChapterSchema>;

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  category: z.string(),
  coverColor: z.string(),
  description: z.string(),
  chapters: z.array(BookChapterSchema),
});

export type Book = z.infer<typeof BookSchema>;

/**
 * Current Affairs Article & Feed Schemas (dailyCurrentAffairs.json)
 */
export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().optional(),
  url: z.string(),
  urlToImage: z.string().optional(),
  publishedAt: z.string().optional(),
  source: z.string().optional(),
  category: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const CurrentAffairsSchema = z.object({
  lastFetchedDate: z.string(),
  lastFetchedTimestamp: z.string().optional(),
  totalArticles: z.number().optional(),
  articles: z.array(ArticleSchema),
});

export type CurrentAffairs = z.infer<typeof CurrentAffairsSchema>;

/**
 * Examination / Assessment Attempt Record Schema (attempts.json)
 */
export const AttemptBreakdownItemSchema = z.object({
  questionId: z.string().optional(),
  isCorrect: z.boolean().optional(),
  selectedOption: z.number().nullable().optional(),
  timeSpent: z.number().optional(),
});

export const AttemptSchema = z.object({
  id: z.string().optional(),
  sessionId: z.string().optional(),
  category: z.string(),
  mode: z.enum(['quiz', 'test', 'exam']),
  score: z.number(),
  totalQuestions: z.number().optional(),
  total: z.number().optional(),
  percentage: z.number().optional(),
  timeSpentSeconds: z.number().optional(),
  timeTaken: z.number().optional(),
  answers: z.record(z.string(), z.number().nullable()).optional(),
  breakdown: z.array(z.any()).optional(),
  date: z.string().optional(),
  completedAt: z.string().optional(),
});

export type Attempt = z.infer<typeof AttemptSchema>;
