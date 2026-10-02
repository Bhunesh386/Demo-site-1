'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.scrollY >= 40;
  });

  useEffect(() => {
    if (!isHome) {
      // Immediately show solid nav on inner pages — intentional synchronous init
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY >= 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change — pre-existing pattern, rule is overly strict here
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/rooms', label: 'Rooms & Services' },
    { href: '/contact', label: 'Contact' },
  ];

  // One source of truth for nav state: transparent = (route is "/" AND scrollY < 40). Everything else is solid.
  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;
  const isSolid = !isTransparent;

  return (
    <>
      <header
        className={twMerge(
          clsx(
            'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
            isSolid
              ? 'bg-[var(--color-surface)] border-b border-[var(--color-divider)] shadow-sm'
              : 'bg-transparent border-b border-transparent',
          ),
        )}
      >
        {/* Soft top gradient scrim for transparent state to ensure readability */}
        {!isSolid && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent -z-10 pointer-events-none" />
        )}
        
        <nav className="container mx-auto px-4 lg:px-6 h-20 md:h-24 flex items-center justify-between">
          <Link
            href="/"
            className={clsx(
              'font-serif text-2xl md:text-3xl font-medium tracking-wide flex items-center gap-3 group z-50 transition-colors duration-300',
              isSolid ? 'text-[var(--color-body)]' : 'text-white',
            )}
          >
            <span
              className={clsx(
                'w-8 h-8 md:w-9 md:h-9 border flex items-center justify-center rounded-sm text-base md:text-lg transition-all duration-700 ease-out',
                isSolid
                  ? 'border-[var(--color-accent)]/40 text-[var(--color-accent)] md:group-hover:bg-[var(--color-accent)] md:group-hover:text-white'
                  : 'border-white/50 text-white md:group-hover:bg-white/20',
              )}
            >
              H
            </span>
            <span className="relative overflow-hidden tracking-wider">Ratnawali</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={twMerge(
                      clsx(
                        'font-sans text-sm tracking-widest uppercase transition-colors duration-300 py-2',
                        isSolid
                          ? isActive
                            ? 'text-[var(--color-body)] font-medium'
                            : 'text-[var(--color-muted)] hover:text-[var(--color-body)]'
                          : isActive
                          ? 'text-white font-medium'
                          : 'text-white/80 hover:text-white',
                      ),
                    )}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-[var(--color-accent)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                  )}
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                className={clsx(
                  'px-6 py-2.5 font-sans text-xs uppercase tracking-widest transition-all duration-300 border flex items-center gap-2',
                  isSolid
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white'
                    : 'border-white/80 text-white hover:bg-white hover:text-[var(--color-body)]',
                )}
              >
                <span>Book Now</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={clsx(
              'lg:hidden z-50 p-2 -mr-2 transition-colors duration-300',
              isSolid ? 'text-[var(--color-body)]' : 'text-white',
            )}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span
                className={clsx(
                  'h-[1px] transition-all duration-300',
                  isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[9px]' : 'w-6',
                  isSolid ? 'bg-[var(--color-body)]' : 'bg-white',
                )}
              />
              <span
                className={clsx(
                  'h-[1px] transition-all duration-300',
                  isMobileMenuOpen ? 'opacity-0' : 'w-4',
                  isSolid ? 'bg-[var(--color-body)]' : 'bg-white',
                )}
              />
              <span
                className={clsx(
                  'h-[1px] transition-all duration-300',
                  isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[10px]' : 'w-5',
                  isSolid ? 'bg-[var(--color-body)]' : 'bg-white',
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-40 bg-[var(--color-surface)] flex flex-col pt-24 px-6 pb-10"
          >
            <ul className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className={clsx(
                        'font-serif text-3xl tracking-wide block w-full py-2',
                        isActive ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-body)]',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="px-10 py-4 bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] font-sans text-sm uppercase tracking-widest flex items-center justify-center gap-3 w-full"
                >
                  <span>Book Now</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
