'use client';

/**
 * ScrollReveal
 * ─────────────
 * Lightweight IntersectionObserver wrapper that adds a CSS class to trigger
 * a fade + 20 px rise animation defined in globals.css.
 *
 * - Once-per-element (won't re-trigger on scroll up)
 * - prefers-reduced-motion: the CSS rule in globals.css makes the element
 *   immediately visible — no animation runs
 * - No JS animation libraries — pure CSS transition via class toggle
 * - Accepts any HTML tag via the `as` prop (default: div)
 */

import { useEffect, useRef, ReactNode, ElementType } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay before the reveal transition starts, in ms (default 0) */
  delay?: number;
  /** Tailwind / custom className to merge with scroll-reveal */
  className?: string;
  /** Render as a different HTML element (default: div) */
  as?: ElementType;
  /** IntersectionObserver threshold (0–1). Default 0.1 */
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = delay > 0 ? `${delay}ms` : '';
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  // Cast is necessary because `as` allows any ElementType but ref expects HTMLDivElement.
  // In practice users pass block-level HTML tags (section, article, h2, p) which are all
  // HTMLDivElement-compatible for the IntersectionObserver usage we need.
  const TagTyped = Tag as React.ElementType;
  return (
    <TagTyped
      ref={ref as React.Ref<HTMLDivElement>}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </TagTyped>
  );
}
