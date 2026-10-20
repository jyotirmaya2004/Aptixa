import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/jyotirmaya2004',
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/jyotirmayabehera',
      icon: (
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53 1.53 1.53 0 0 0-1.53-1.54 1.54 1.54 0 0 0-1.54 1.54 1.53 1.53 0 0 0 1.54 1.53m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      ),
    },
    {
      name: 'Twitter / X',
      href: 'https://twitter.com/jyotirmaya_dev',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Website',
      href: 'https://www.jyotirmayabehera.com',
      icon: <Globe size={18} aria-hidden="true" />,
    },
    {
      name: 'Email',
      href: 'mailto:jyotirmaybehera2020@gmail.com',
      icon: <Mail size={18} aria-hidden="true" />,
    },
  ];

  return (
    <footer className="w-full bg-[#0B1120] text-slate-300 pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16">
          {/* Col 1: Brand & Mission & Socials */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src="/images/logo.png"
                alt="Aptixa Emblem"
                width={36}
                height={36}
                className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="font-serif text-3xl font-extrabold tracking-tight text-white group-hover:opacity-90 transition-opacity flex items-center">
                Aptixa
                <span className="h-2 w-2 rounded-full bg-[#DF6951] self-end mb-1 ml-0.5" aria-hidden="true" />
              </span>
            </Link>

            <p className="font-sans text-sm text-slate-400 leading-[1.8] max-w-sm">
              Standardized campus placement assessment portal designed for quantitative precision, logical mastery, and high-performance competitive testing.
            </p>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/[0.05] hover:bg-[#DF6951] text-slate-400 hover:text-white border border-white/[0.08] hover:border-transparent transition-all duration-200"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Platform & Practice */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-tight">
              Platform
            </h4>
            <ul className="space-y-3 text-sm font-sans text-slate-400">
              <li>
                <Link href="/practice" className="hover:text-white transition-colors">
                  Practice Studio
                </Link>
              </li>
              <li>
                <Link href="/quiz/quantitative" className="hover:text-white transition-colors">
                  Quantitative Aptitude
                </Link>
              </li>
              <li>
                <Link href="/quiz/logical" className="hover:text-white transition-colors">
                  Logical Reasoning
                </Link>
              </li>
              <li>
                <Link href="/quiz/verbal" className="hover:text-white transition-colors">
                  Verbal Ability
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Curricula & Dispatches */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-tight">
              Textbooks & News
            </h4>
            <ul className="space-y-3 text-sm font-sans text-slate-400">
              <li>
                <Link href="/books" className="hover:text-white transition-colors">
                  Chapter Index & Books
                </Link>
              </li>
              <li>
                <Link href="/books/rs-aggarwal-quant" className="hover:text-white transition-colors">
                  R.S. Aggarwal Quant
                </Link>
              </li>
              <li>
                <Link href="/books/arun-sharma-lr" className="hover:text-white transition-colors">
                  Arun Sharma Reasoning
                </Link>
              </li>
              <li>
                <Link href="/current-affairs" className="hover:text-white transition-colors">
                  Daily Current Affairs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Developer & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-tight">
              Developer & Contact
            </h4>
            <div className="space-y-3 text-sm font-sans text-slate-400">
              <div>
                <p className="font-semibold text-white">Jyotirmaya Behera</p>
                <p className="text-xs text-slate-500 mt-0.5">Software & AI Developer · Utkal University</p>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href="mailto:jyotirmaybehera2020@gmail.com"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-[#DF6951] transition-colors group"
                >
                  <Mail size={14} className="shrink-0 text-slate-500 group-hover:text-[#DF6951]" aria-hidden="true" />
                  <span className="truncate">jyotirmaybehera2020@gmail.com</span>
                </a>

                <a
                  href="https://www.jyotirmayabehera.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-[#DF6951] transition-colors group"
                >
                  <Globe size={14} className="shrink-0 text-slate-500 group-hover:text-[#DF6951]" aria-hidden="true" />
                  <span>jyotirmayabehera.com</span>
                  <ArrowUpRight size={12} className="opacity-60" aria-hidden="true" />
                </a>

                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <MapPin size={14} className="shrink-0 text-slate-600" aria-hidden="true" />
                  <span>Odisha, India</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:jyotirmaybehera2020@gmail.com"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-white/[0.08] hover:bg-[#DF6951] text-white font-sans text-xs font-semibold border border-white/[0.08] hover:border-transparent transition-all duration-200"
                >
                  <span>Send Message</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
          <p>
            All rights reserved © 2026 Aptixa. Placement Standards Platform.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Designed & Engineered by</span>
            <a
              href="https://www.jyotirmayabehera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white font-semibold transition-colors"
            >
              Jyotirmaya Behera
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
