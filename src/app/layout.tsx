import type { Metadata } from 'next';
import { EB_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { NavBar } from '@/components/layout/NavBar';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aptixa.jyotirmayabehera.com'),
  title: 'Aptixa — Placement Assessment Portal',
  description:
    'Standardized competitive examination hub and psychometric assessment platform for quantitative aptitude, logical reasoning, and placement practice.',
  keywords: [
    'Placement Assessment',
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'R.S. Aggarwal',
    'Competitive Exam',
  ],
  authors: [{ name: 'Aptixa Assessment Council' }],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Aptixa — Placement Assessment Portal',
    description:
      'Standardized competitive examination hub and psychometric assessment platform for quantitative aptitude, logical reasoning, and placement practice.',
    url: 'https://aptixa.jyotirmayabehera.com',
    siteName: 'Aptixa',
    images: [
      {
        url: '/images/logo.png',
        width: 1024,
        height: 682,
        alt: 'Aptixa Placement Assessment Portal Emblem',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aptixa — Placement Assessment Portal',
    description:
      'Standardized competitive examination hub and psychometric assessment platform for quantitative aptitude, logical reasoning, and placement practice.',
    images: ['/images/logo.png'],
    creator: '@jyotirmaya_dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F9FF] text-[#181E4B] selection:bg-[#181E4B] selection:text-white relative overflow-x-hidden">


        {/* Global Persistent Header */}
        <NavBar />

        {/* Page Content */}
        <div className="flex-1 flex flex-col relative z-10">{children}</div>
      </body>
    </html>
  );
}
