import { getExamSessionQuestions, normalizeDataPath } from '@/lib/data';
import { QuizWorkspaceClient } from './QuizWorkspaceClient';
import type { Metadata } from 'next';
import type { QuizMode } from '@/types';

interface QuizPageProps {
  params: Promise<{ sessionId: string[] }>;
  searchParams: Promise<{
    mode?: string;
    count?: string;
    difficulty?: string;
    time?: string;
  }>;
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { sessionId } = await params;
  const rawId = Array.isArray(sessionId) ? sessionId.join('/') : (sessionId || '');
  const decoded = normalizeDataPath(rawId);
  return {
    title: `Assessment Session: ${decoded} — Aptixa`,
    description: `Standardized examination workspace for ${decoded}.`,
  };
}

export default async function QuizPage({ params, searchParams }: QuizPageProps) {
  const { sessionId } = await params;
  const {
    mode: queryMode,
    count: queryCount,
    difficulty: queryDifficulty,
    time: queryTime,
  } = await searchParams;

  const rawId = Array.isArray(sessionId) ? sessionId.join('/') : (sessionId || '');
  const cleanSessionId = normalizeDataPath(rawId);
  const initialMode: QuizMode = queryMode === 'test' ? 'test' : 'quiz';

  const limit = queryCount
    ? Math.min(Math.max(parseInt(queryCount, 10) || 30, 5), 100)
    : 30;

  const customTimeMinutes = queryTime ? parseInt(queryTime, 10) : undefined;
  const customInitialTimeSeconds =
    customTimeMinutes && !isNaN(customTimeMinutes) ? customTimeMinutes * 60 : undefined;

  const questions = await getExamSessionQuestions(cleanSessionId, limit, queryDifficulty);

  // Generate a human-readable title
  let displayTitle = cleanSessionId;
  if (cleanSessionId.includes('/')) {
    const parts = cleanSessionId.split('/');
    const lastPart = parts[parts.length - 1] || '';
    displayTitle = lastPart.replace('.json', '').replace(/_/g, ' ').toUpperCase();
  } else {
    displayTitle = cleanSessionId.toUpperCase() + ' EVALUATION';
  }

  return (
    <QuizWorkspaceClient
      sessionId={cleanSessionId}
      initialQuestions={questions}
      initialMode={initialMode}
      title={displayTitle}
      customInitialTimeSeconds={customInitialTimeSeconds}
    />
  );
}
