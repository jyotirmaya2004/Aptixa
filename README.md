# Aptixa — Placement Assessment Portal

> Standardized competitive examination hub and psychometric assessment platform for quantitative aptitude, logical reasoning, and placement practice.

[![Live Portal](https://img.shields.io/badge/Live_Portal-aptixa.jyotirmayabehera.com-181E4B?style=flat-square&logo=googlechrome)](https://aptixa.jyotirmayabehera.com)
[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-0ae448?style=flat-square&logo=greensock)](https://greensock.com/)

---

## 1. Overview

Aptixa is an architectural, minimal assessment portal engineered for rigorous preparation across standardized competitive examinations and campus placements. It features:

- **Dual Examination Modes**:
  - **Diagnostic Quiz Mode**: Immediate step-by-step diagnostic solutions, hint derivations, and no negative marking.
  - **Proctored Test Mode**: Standardized competitive marking (+3.0 correct, -0.75 penalty per incorrect answer), live countdown clock, question palette matrix, and post-submission evaluation.
- **Practice Studio**: Customizable session configurator supporting custom topic drilling, pacing timers, question counts, and difficulty levels.
- **Reference Syllabi**: Direct problem sets from authoritative texts (R.S. Aggarwal Quantitative Aptitude, Arun Sharma Logical Reasoning) across 35+ chapters (3,918 MCQs).
- **General Awareness & Current Affairs**: Daily on-demand curated dispatches powered by live streaming feeds.

---

## 2. Technology Stack

- **Framework**: Next.js 16 (App Router, React 19, Server Components by default)
- **Language**: TypeScript strict mode (`noUncheckedIndexedAccess`)
- **Styling**: Tailwind CSS v4 with luxury architectural tokens (Canvas `#F8F9FF`, Navy `#0F172A`, Gold `#C5A880`)
- **Typography**: `next/font/google` with EB Garamond (display/serif) and Plus Jakarta Sans (body/telemetry)
- **Animation**: GSAP + ScrollTrigger via `@gsap/react` `useGSAP` (scoped cleanup, `prefers-reduced-motion` safety)
- **Icons**: Lucide React
- **Validation**: Zod schema validation across all JSON datasets and runtime environment variables
- **Package Manager**: pnpm

---

## 3. Architecture

```
src/
├── app/
│   ├── layout.tsx                # Root layout with fonts, tokens, and SEO metadata
│   ├── page.tsx                  # Home Assessment Dashboard
│   ├── books/page.tsx            # Standard Textbook Library & Chapter Sets
│   ├── practice/page.tsx         # Practice Customizer Studio
│   ├── quiz/[...sessionId]/      # Desktop & Mobile Examination Workspace
│   ├── results/[...sessionId]/   # Performance Analytics & Derivation Review
│   ├── current-affairs/          # Daily General Awareness Dispatch Feed
│   ├── not-found.tsx             # 404 Error Dossier
│   ├── error.tsx                 # Runtime Exception Boundary
│   ├── loading.tsx               # Suspense Shell
│   ├── sitemap.ts                # Dynamic Search Engine Sitemap
│   └── robots.ts                 # Web Crawler Directives
├── components/
│   ├── ui/                   # Button, Icon, Badge, OptionCard, PaletteCell, ModeSwitcher, SolutionDrawer, TelemetryBar
│   ├── sections/             # HeroSection, BookShowcase
│   └── layout/               # NavBar, Footer
├── hooks/
│   ├── useQuizSession.ts     # Examination state machine, timer countdown, and persistence
│   └── useReducedMotion.ts   # Accessibility media query listener
├── lib/
│   ├── data.ts               # Asynchronous server-side JSON file loaders
│   ├── schema.ts             # Zod validation schemas & normalization adapters
│   ├── scoring.ts            # Standardized +3.0 / -0.75 and +1.0 scoring formulas
│   ├── gsap.ts               # GSAP and ScrollTrigger plugin registration
│   ├── env.ts                # Runtime environment variable validation
│   └── utils.ts              # cn() Tailwind classname merger
├── types/
│   └── index.ts              # Domain types, QuizMode, QuestionStatus, ExamSessionState
└── styles/
    └── globals.css           # Tailwind v4 @theme tokens, typography utility classes
```

---

## 4. Getting Started

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x / 12.x

### Installation

```bash
# Clone the repository
git clone https://github.com/jyotirmaya2004/Aptixa.git
cd Aptixa

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Verification & Production Build

```bash
# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Production build
pnpm build

# Start production server
pnpm start
```

---

## 5. License

Institutional Placement Assessment Standards. All rights reserved © 2026 Aptixa Assessment Council.
