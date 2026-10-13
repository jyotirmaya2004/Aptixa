import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aptixa.jyotirmayabehera.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/quiz/session-*/results'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
