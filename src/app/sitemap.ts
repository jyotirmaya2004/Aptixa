import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aptixa.jyotirmayabehera.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-13'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/practice`,
      lastModified: new Date('2026-10-13'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date('2026-10-13'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/current-affairs`,
      lastModified: new Date('2026-10-13'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
