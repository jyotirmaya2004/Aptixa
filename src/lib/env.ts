import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('https://aptixa.jyotirmayabehera.com'),
  NEWSDATA_API_KEY: z.string().optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEWSDATA_API_KEY: process.env.NEWSDATA_API_KEY,
});
