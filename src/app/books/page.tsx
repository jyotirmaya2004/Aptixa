import { Suspense } from 'react';
import { getBooks } from '@/lib/data';
import { Footer } from '@/components/layout/Footer';
import { BooksExplorerClient } from './BooksExplorerClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Textbooks & Chapter Index — Aptixa',
  description:
    'Comprehensive chapter index for standard competitive examination textbooks including R.S. Aggarwal Quantitative Aptitude and Arun Sharma Logical Reasoning.',
};

export default async function BooksPage() {
  const books = await getBooks();

  const booksJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: books.map((book, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Course',
        name: book.title,
        description: book.description,
        provider: {
          '@type': 'Organization',
          name: 'Aptixa Assessment Council',
        },
      },
    })),
  };

  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(booksJsonLd) }}
      />

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-8 sm:py-12 lg:px-12">
        <Suspense
          fallback={
            <div className="py-20 text-center font-sans text-sm text-[#5E6282] animate-pulse">
              Loading chapter index...
            </div>
          }
        >
          <BooksExplorerClient books={books} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
