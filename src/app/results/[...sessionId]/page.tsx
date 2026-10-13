import { getExamSessionQuestions, normalizeDataPath } from '@/lib/data';
import { ResultsClient } from './ResultsClient';
import type { Metadata } from 'next';

interface ResultsPageProps {
  params: Promise<{ sessionId: string[] }>;
}

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const { sessionId } = await params;
  const rawId = Array.isArray(sessionId) ? sessionId.join('/') : (sessionId || '');
  const clean = normalizeDataPath(rawId);
  return {
    title: `Assessment Performance Report: ${clean} — Aptixa`,
    description: 'Detailed diagnostic score breakdown and step-by-step examination analysis.',
  };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { sessionId } = await params;
  const rawId = Array.isArray(sessionId) ? sessionId.join('/') : (sessionId || '');
  const cleanSessionId = normalizeDataPath(rawId);
  const questions = await getExamSessionQuestions(cleanSessionId, 30);

  return <ResultsClient sessionId={cleanSessionId} questions={questions} />;
}
