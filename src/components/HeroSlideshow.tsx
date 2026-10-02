'use client';

/**
 * HeroSlideshow
 * ─────────────
 * Premium auto-rotating hero with per-slide headline + subtext.
 *
 * Features
 * - Ken Burns zoom (scale 1→1.06) on active slide via CSS @keyframes kenBurns
 * - 1.2 s crossfade, 6 s auto-advance
 * - Text fade-up with stagger per slide change (Framer Motion AnimatePresence)
 * - Progress-bar dots (clickable), prev/next chevrons (desktop), touch swipe (mobile)
 * - Pauses on hover, focus, and document.hidden
 * - prefers-reduced-motion: no Ken Burns, no auto-advance, immediate opacity swap
 * - Slide 1 has priority for LCP; slides 2+ are lazy
 * - "Reserve Your Stay" CTA visible on every slide
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '@/data/images';

const INTERVAL_MS = 6000;
const CROSSFADE_MS = 1200;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    // useState lazy initializer runs on client; safe to call window here
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const total = heroSlides.length;

  const go = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total],
  );

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  // Auto-advance — disabled when reduced-motion is preferred
  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = setTimeout(advance, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance, current, paused, reducedMotion]);

  // Pause when tab is hidden
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(current - 1);
      if (e.key === 'ArrowRight') go(current + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, go]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        go(current + 1);
      } else {
        go(current - 1);
      }
    }
    touchStartX.current = null;
  };

  const slide = heroSlides[current];

  return (
    <section
      aria-label="Hotel Ratnawali hero — Blue City heritage boutique hotel"
      aria-roledescription="slideshow"
      className="relative h-[70vh] md:h-[95vh] overflow-hidden bg-obsidian"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background slides ── */}
      {heroSlides.map((s, i) => {
        const isActive = i === current;
        return (
          <div
            key={s.src}
            aria-hidden={!isActive}
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}: ${s.headline}`}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: reducedMotion ? '0ms' : `${CROSSFADE_MS}ms`,
              transitionTimingFunction: 'ease-in-out',
              zIndex: isActive ? 1 : 0,
            }}
          >
            {/* Ken Burns wrapper — reset animation key so it restarts per slide */}
            <div
              key={`kb-${i}-${isActive}`}
              className={isActive && !reducedMotion ? 'animate-ken-burns absolute inset-0' : 'absolute inset-0'}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {/* Gradient overlays for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* ── Per-slide text ── */}
      <div className="container mx-auto px-4 md:px-6 absolute inset-0 z-20 flex flex-col justify-center pt-16 md:pt-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            className="max-w-2xl text-alabaster pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.5 }}
          >
            <motion.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
              className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-champagne mb-4 md:mb-6 font-medium"
            >
              Welcome to Jodhpur
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.6, delay: reducedMotion ? 0 : 0.18 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-4 md:mb-6 drop-shadow-lg font-normal"
            >
              <span className="italic text-champagne">{slide.headline}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.6, delay: reducedMotion ? 0 : 0.28 }}
              className="font-sans text-base md:text-xl font-light mb-8 md:mb-12 opacity-80 max-w-lg leading-relaxed text-alabaster/90"
            >
              {slide.subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.38 }}
            >
              <Link
                href="/rooms"
                className="relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 min-h-[44px] min-w-[44px] bg-transparent border border-champagne/50 text-champagne font-sans font-medium uppercase tracking-widest text-xs md:hover:bg-champagne md:hover:text-alabaster transition-all duration-700 ease-out shadow-[0_0_0_rgba(184,156,114,0)] md:hover:shadow-[0_4px_30px_rgba(184,156,114,0.3)] overflow-hidden"
              >
                <span className="relative z-10">Reserve Your Stay</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress-bar dots ── */}
      <div
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-3"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {heroSlides.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${s.headline}`}
            onClick={() => go(i)}
            className="relative h-[2px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-full"
            style={{
              width: i === current ? '32px' : '16px',
              transition: 'width 300ms ease',
            }}
          >
            <span className="absolute inset-0 bg-alabaster/30 rounded-full" />
            <span
              className="absolute inset-y-0 left-0 bg-champagne rounded-full"
              style={
                i === current
                  ? {
                      width: '100%',
                      transition: reducedMotion
                        ? 'none'
                        : `width ${INTERVAL_MS}ms linear`,
                    }
                  : { width: '0%', transition: 'none' }
              }
            />
          </button>
        ))}
      </div>

      {/* ── Prev / Next (desktop only) ── */}
      <button
        onClick={() => go(current - 1)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center border border-alabaster/20 text-alabaster/60 hover:text-champagne hover:border-champagne/40 transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => go(current + 1)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center border border-alabaster/20 text-alabaster/60 hover:text-champagne hover:border-champagne/40 transition-all duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
