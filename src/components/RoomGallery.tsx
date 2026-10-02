'use client';

/**
 * RoomGallery
 * ───────────
 * Soft crossfade image rotator for room cards and detail pages.
 *
 * Features
 * - IntersectionObserver: rotation only starts when ≥50% visible (no background churn)
 * - 5 s auto-advance, opacity crossfade (~1 s)
 * - Optional dots + touch swipe (enabled on detail pages via showControls)
 * - Pauses on hover (when controls visible)
 * - prefers-reduced-motion: no auto-advance, static first image
 * - next/image with correct sizes for each context
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import type { RoomImage } from '@/data/images';
import { getWrappedIndex, shouldAutoAdvance } from '@/utils/slideshowLogic';

const GALLERY_INTERVAL_MS = 5000;
const CROSSFADE_MS = 1000;

interface RoomGalleryProps {
  images: RoomImage[];
  /** Show dot navigation and enable swipe — use on detail pages */
  showControls?: boolean;
  /** Passed to next/image sizes. Default covers card usage (50vw) */
  sizes?: string;
  className?: string;
}

export function RoomGallery({
  images,
  showControls = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
}: RoomGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;

  // Detect reduced-motion preference using lazy initializer
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver — start rotating only when visible
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const advance = useCallback(() => {
    setCurrent((c) => getWrappedIndex(c + 1, total));
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (!shouldAutoAdvance(isVisible, paused, reducedMotion, total)) return;
    timerRef.current = setTimeout(advance, GALLERY_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance, current, isVisible, paused, reducedMotion, total]);

  const go = (index: number) => {
    setCurrent(getWrappedIndex(index, total));
  };

  // Touch swipe (detail pages)
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

  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Base64 encoded 1x1 SVG with beige color #E9DFCE
  const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNFOURGQ0UiLz48L3N2Zz4=';

  return (
    <div
      ref={containerRef}
      className={twMerge('relative overflow-hidden w-full h-full bg-[var(--color-band)]', className)}
      onMouseEnter={() => showControls && setPaused(true)}
      onMouseLeave={() => showControls && setPaused(false)}
      onTouchStart={showControls ? onTouchStart : undefined}
      onTouchEnd={showControls ? onTouchEnd : undefined}
    >
      {/* Images */}
      {images.map((img, i) => {
        if (failedImages.has(i)) return null;
        
        const isActive = i === current;
        return (
          <div
            key={img.src}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: reducedMotion ? '0ms' : `${CROSSFADE_MS}ms`,
              transitionTimingFunction: 'ease-in-out',
              zIndex: isActive ? 1 : 0,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes={sizes}
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
              onError={() => {
                setFailedImages(prev => {
                  const next = new Set(prev);
                  next.add(i);
                  return next;
                });
                if (isActive) {
                  advance();
                }
              }}
            />
          </div>
        );
      })}

      {/* Dot controls — shown only when showControls is true and there are multiple images */}
      {showControls && total > 1 && (
        <div
          className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2"
          role="tablist"
          aria-label="Room gallery navigation"
        >
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Image ${i + 1}: ${img.alt}`}
              onClick={() => go(i)}
              className={[
                'w-2 h-2 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                i === current
                  ? 'bg-accent border-accent'
                  : 'bg-transparent border-divider/60',
              ].join(' ')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
