'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, useGSAP } from '@/lib/gsap';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-fade', {
          y: 28,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
        });

        gsap.from('.hero-image-wrap', {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.15,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-6 pb-20 lg:pt-10 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Coral Eyebrow */}
            <span className="hero-fade block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#DF6951]">
              Top Placement Assessments
            </span>

            {/* Main Headline with Refined Curved Accent */}
            <h1 className="hero-fade font-serif text-4xl sm:text-6xl lg:text-[4.75rem] font-bold leading-[1.1] sm:leading-[1.08] tracking-tight text-[#181E4B]">
              Practice,{' '}
              <span className="relative whitespace-nowrap inline-block">
                <span className="relative z-10">master</span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-[#DF6951] -z-0 pointer-events-none opacity-85"
                  viewBox="0 0 255 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 13.5C45.5 4.5 130 -1.5 252 14"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              and secure elite placements
            </h1>

            {/* Description */}
            <p className="hero-fade font-sans text-sm sm:text-base text-[#5E6282] leading-[1.8] max-w-lg">
              Standardized campus recruitment portal engineered for quantitative problem-solving, logical formulations, and verbal speed. Verified question sets derived from authoritative competitive curricula.
            </p>

            {/* Dual CTAs */}
            {/* CTA */}
            <div className="hero-fade pt-2 sm:pt-4">
              <Link
                href="/quiz/quantitative?mode=test"
                className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 rounded-[12px] bg-[#F1A501] hover:bg-[#E09600] text-white font-sans text-sm sm:text-base font-semibold shadow-[0_10px_25px_rgba(241,165,1,0.22)] hover:shadow-[0_14px_30px_rgba(241,165,1,0.3)] hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                Start Assessment
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Composition (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-6 relative justify-center lg:justify-end">
            <div className="hero-image-wrap relative w-full max-w-[480px] lg:max-w-[540px]">
              {/* Soft Ambient Depth Aura */}
              <div
                className="pointer-events-none absolute inset-x-8 top-10 bottom-6 rounded-full bg-gradient-to-tr from-slate-200/40 via-blue-50/20 to-transparent blur-3xl -z-10"
                aria-hidden="true"
              />

              {/* Central Cutout Candidate Photograph */}
              <div className="relative aspect-[3/4] w-full flex items-end justify-center select-none">
                <Image
                  src="/images/hero-candidate.png"
                  alt="Indian university scholar preparing for placement examinations"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-contain object-bottom drop-shadow-[0_18px_30px_rgba(24,30,75,0.08)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
