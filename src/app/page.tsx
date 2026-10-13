import { getCategories } from '@/lib/data';
import { HeroSection } from '@/components/sections/HeroSection';
import { CategorySection } from '@/components/sections/CategorySection';
import { Footer } from '@/components/layout/Footer';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://aptixa.jyotirmayabehera.com/#website',
      url: 'https://aptixa.jyotirmayabehera.com',
      name: 'Aptixa',
      description:
        'Standardized competitive examination hub and psychometric assessment platform for quantitative aptitude, logical reasoning, and placement practice.',
      inLanguage: 'en-IN',
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://aptixa.jyotirmayabehera.com/#organization',
      name: 'Aptixa Assessment Council',
      url: 'https://aptixa.jyotirmayabehera.com',
      logo: 'https://aptixa.jyotirmayabehera.com/images/logo.png',
      description:
        'Placement assessment authority and competitive testing standards framework.',
    },
  ],
};

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <HeroSection />
        <CategorySection categories={categories} />
      </main>
      <Footer />
    </div>
  );
}
