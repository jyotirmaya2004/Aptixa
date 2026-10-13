import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { Compass, Home, BookOpen, SlidersHorizontal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)]">
      <main className="flex-1 mx-auto max-w-2xl w-full px-6 py-16 sm:py-24 text-center flex flex-col items-center justify-center">
        {/* Ambient Halo & Compass Icon */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 rounded-full bg-[#F1A501]/20 blur-2xl transform scale-150 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-white border border-amber-100 shadow-[0_12px_30px_rgba(241,165,1,0.12)] text-[#F1A501]">
            <Compass size={36} className="stroke-[2.2]" aria-hidden="true" />
          </div>
        </div>

        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#DF6951] mb-2 block">
          Error 404 · Docket Missing
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181E4B] mb-4">
          Docket Item Not Located
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#5E6282] max-w-lg mx-auto mb-8 leading-relaxed">
          The requested assessment track, problem set, or curriculum chapter could not be located on the examination server.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 w-full max-w-md">
          <Link
            href="/"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-[#181E4B] hover:bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_8px_20px_rgba(24,30,75,0.18)] hover:-translate-y-0.5"
          >
            <Home size={14} aria-hidden="true" />
            <span>Return to Dashboard</span>
          </Link>

          <Link
            href="/books"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-white border border-slate-200 hover:border-[#DF6951] hover:text-[#DF6951] text-[#181E4B] text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <BookOpen size={14} aria-hidden="true" />
            <span>Browse Textbooks</span>
          </Link>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="w-full max-w-md rounded-[20px] bg-white border border-slate-200/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-2 gap-2 text-left">
            <Link
              href="/practice"
              className="flex items-center gap-2 p-2 rounded-[10px] hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal size={14} className="text-[#DF6951] shrink-0" />
              <span className="font-sans text-xs font-semibold text-[#181E4B]">
                Practice Studio
              </span>
            </Link>

            <Link
              href="/current-affairs"
              className="flex items-center gap-2 p-2 rounded-[10px] hover:bg-slate-50 transition-colors"
            >
              <Compass size={14} className="text-[#F1A501] shrink-0" />
              <span className="font-sans text-xs font-semibold text-[#181E4B]">
                Current Affairs
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
