import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F8F9FF',
        surface: '#FFFFFF',
        'surface-dim': '#F1F5F9',
        'surface-high': '#E6EEFF',
        border: '#E2E8F0',
        'border-mid': '#CBD5E1',
        navy: '#0F172A',
        'navy-hover': '#1E3A8A',
        indigo: '#1E3A8A',
        gold: '#C5A880',
        amber: '#D97706',
        error: '#BA1A1A',
        success: '#059669',
        slate: {
          text: '#0D1C2E',
          secondary: '#475569',
          muted: '#64748B',
        },
        'jadoo-navy': '#181E4B',
        'jadoo-coral': '#DF6951',
        'jadoo-amber': '#F1A501',
        'jadoo-body': '#5E6282',
        'jadoo-peach': '#FFF1DA',
      },
      fontFamily: {
        serif: ['var(--font-eb-garamond)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        lg: '8px',
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'space-2xl': '4rem',
      },
    },
  },
  plugins: [],
};

export default config;
