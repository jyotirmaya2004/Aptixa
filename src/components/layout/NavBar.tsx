'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { href: '/books', label: 'Textbooks' },
    { href: '/current-affairs', label: 'Current Affairs' },
    { href: '/practice', label: 'Customize Test' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const cleanHref = href.split('?')[0] || '';
    return pathname === cleanHref || pathname.startsWith(cleanHref + '/');
  };

  // Autohide mobile menu when clicking any spot outside in the UI
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  // Hide global navbar on quiz pages for an immersive, distraction-free examination view
  if (pathname.startsWith('/quiz')) {
    return null;
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-[#F8F9FF]/95 backdrop-blur-md border-b border-black/[0.04] transition-colors"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo - Official Emblem + Bold Typography */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src="/images/logo.png"
            alt="Aptixa Emblem"
            width={38}
            height={38}
            className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#181E4B] group-hover:opacity-90 transition-opacity flex items-center">
            Aptixa
            <span className="h-2 w-2 rounded-full bg-[#DF6951] self-end mb-1 ml-0.5" aria-hidden="true" />
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-11">
          <nav className="flex items-center gap-7 lg:gap-10" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-sans text-base font-semibold transition-colors duration-200 relative py-1 inline-block',
                    isActive
                      ? 'text-[#DF6951]'
                      : 'text-[#212832] hover:text-[#DF6951]'
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#DF6951]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/quiz/quantitative?mode=test"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] bg-[#181E4B] hover:bg-[#0F172A] text-white font-sans text-sm font-semibold transition-all duration-200 whitespace-nowrap shadow-sm"
            >
              Proctored Test
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-[8px] text-[#181E4B] hover:bg-black/5 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Backdrop to autohide when tapping any spot in the UI */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-30 bg-black/20 backdrop-blur-xs md:hidden animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-white px-6 py-5 shadow-xl border-b border-black/[0.05] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-3 py-2.5 rounded-lg font-sans text-base font-semibold transition-colors',
                    isActive
                      ? 'text-[#DF6951] bg-[#DF6951]/5'
                      : 'text-[#212832] hover:text-[#DF6951] hover:bg-slate-50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
