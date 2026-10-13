import fs from 'node:fs/promises';
import path from 'node:path';
import {
  CategorySchema,
  BookSchema,
  CurrentAffairsSchema,
  AttemptSchema,
  normalizeRawQuestion,
  type Category,
  type Book,
  type CurrentAffairs,
  type Attempt,
  type Question,
  type RawChapterQuestion,
} from './schema';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

/**
 * Safely decodes and normalizes file paths to prevent URL-encoded "%2F" ENOENT issues
 */
export function normalizeDataPath(filePath: string): string {
  let clean = filePath;
  try {
    while (clean.includes('%')) {
      const decoded = decodeURIComponent(clean);
      if (decoded === clean) break;
      clean = decoded;
    }
  } catch {
    // fallback if malformed URI component
  }
  return clean.replace(/%2F/gi, '/');
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const normalized = normalizeDataPath(filePath);
  const fullPath = path.isAbsolute(normalized) ? normalized : path.join(DATA_DIR, normalized);
  const content = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const raw = await readJsonFile<unknown[]>('categories.json');
  return CategorySchema.array().parse(raw);
}

/**
 * Fetch all textbooks / reference works
 */
export async function getBooks(): Promise<Book[]> {
  const raw = await readJsonFile<unknown[]>('books.json');
  return BookSchema.array().parse(raw);
}

/**
 * Fetch a book by ID
 */
export async function getBookById(id: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((b) => b.id === id) || null;
}

/**
 * Fetch questions from a specific chapter file (e.g. "rs_agrawal/simplification.json")
 */
export async function getChapterQuestions(file: string): Promise<Question[]> {
  try {
    const raw = await readJsonFile<Record<string, unknown>>(file);
    let questionsRaw: RawChapterQuestion[] = [];

    if (Array.isArray(raw.questions)) {
      questionsRaw = raw.questions as RawChapterQuestion[];
    } else if (
      raw.exercise &&
      typeof raw.exercise === 'object' &&
      Array.isArray((raw.exercise as Record<string, unknown>).questions)
    ) {
      questionsRaw = (raw.exercise as Record<string, unknown>).questions as RawChapterQuestion[];
    } else if (Array.isArray(raw.practice_questions)) {
      questionsRaw = raw.practice_questions as RawChapterQuestion[];
    } else if (Array.isArray(raw)) {
      questionsRaw = raw as unknown as RawChapterQuestion[];
    }

    const category =
      (raw.book as string) || (file.includes('arun_sharma') ? 'logical' : 'quantitative');
    const topic = (raw.chapter as string) || (raw.title as string) || 'Aptitude Practice';

    return questionsRaw.map((q) => normalizeRawQuestion(q, category, topic));
  } catch {
    return [];
  }
}

/**
 * Fetch standard questions from questions.json
 */
export async function getQuestions(categoryFilter?: string): Promise<Question[]> {
  try {
    const raw = await readJsonFile<Record<string, unknown>[]>('questions.json');
    let questions = raw.map((q) =>
      normalizeRawQuestion(
        q as unknown as RawChapterQuestion,
        (q.category as string) || 'quantitative',
        (q.topic as string) || 'General'
      )
    );

    if (categoryFilter && categoryFilter.toLowerCase() !== 'all') {
      questions = questions.filter(
        (q) => q.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    return questions;
  } catch {
    return [];
  }
}

/**
 * Fetch Current Affairs articles
 */
export async function getCurrentAffairs(): Promise<CurrentAffairs> {
  const raw = await readJsonFile<unknown>('dailyCurrentAffairs.json');
  return CurrentAffairsSchema.parse(raw);
}

/**
 * Fetch past attempts
 */
export async function getAttempts(): Promise<Attempt[]> {
  try {
    const raw = await readJsonFile<unknown[]>('attempts.json');
    return AttemptSchema.array().parse(raw);
  } catch {
    return [];
  }
}

/**
 * Aggregate questions for an exam or practice session by topic/category
 */
export async function getExamSessionQuestions(
  categoryOrChapter: string,
  limit = 25,
  difficultyFilter?: string
): Promise<Question[]> {
  const normalized = normalizeDataPath(categoryOrChapter);
  let questions: Question[] = [];

  // Check if it's a chapter file reference
  if (normalized.endsWith('.json')) {
    questions = await getChapterQuestions(normalized);
  } else if (normalized === 'mixed' || normalized === 'all') {
    questions = await getQuestions();
  } else if (normalized === 'quantitative' || normalized === 'rs-aggarwal-quant') {
    questions = await getQuestions('quantitative');
    if (questions.length === 0) {
      questions = await getChapterQuestions('rs_agrawal/numbersystem.json');
    }
  } else if (
    normalized === 'logical' ||
    normalized === 'reasoning' ||
    normalized === 'arun-sharma-lr'
  ) {
    questions = await getQuestions('logical');
    if (questions.length === 0) {
      questions = await getChapterQuestions('arun_sharma/blood_relations.json');
    }
  } else {
    // Otherwise, pull from standard questions
    questions = await getQuestions(normalized);
    if (questions.length === 0) {
      questions = await getChapterQuestions('rs_agrawal/average.json');
    }
  }

  // Filter by difficulty if specified
  if (difficultyFilter && difficultyFilter.toLowerCase() !== 'all') {
    const filtered = questions.filter(
      (q) => q.difficulty?.toLowerCase() === difficultyFilter.toLowerCase()
    );
    if (filtered.length > 0) {
      questions = filtered;
    }
  }

  return questions.slice(0, limit);
}
