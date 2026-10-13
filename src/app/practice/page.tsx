import { getBooks, getCategories } from '@/lib/data';
import { PracticeCustomizerClient } from './PracticeCustomizerClient';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Practice Studio & Assessment Configurator — Aptixa',
  description:
    'Customizable placement evaluation practice studio. Tailor question topics, question volume, difficulty ratings, and timer pacing to match your competitive readiness.',
};

export default async function PracticePage() {
  const [books, categories] = await Promise.all([
    getBooks(),
    getCategories(),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <PracticeCustomizerClient books={books} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
