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
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  // Transparent navbar only on home page hero; solid on all inner pages
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    // Check initial scroll position (e.g., after browser back navigation)
    setScrolled(window.scrollY > 60);

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/rooms', label: 'Rooms & Services' },
    { href: '/contact', label: 'Contact' },
  ];

  // On home page: transparent until scrolled past hero; everywhere else always solid
  const solidNav = scrolled || !isHome || isMobileMenuOpen;

  return (
    <header
      className={twMerge(
        clsx(
          'sticky top-0 z-50 transition-all duration-300',
          solidNav
            ? 'bg-alabaster/90 backdrop-blur-xl border-b border-obsidian/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
            : 'bg-transparent border-b border-transparent',
        ),
      )}
    >
      <nav className="container mx-auto px-4 lg:px-6 h-20 md:h-24 flex items-center justify-between">
        <Link
          href="/"
          className={clsx(
            'font-serif text-2xl md:text-3xl font-medium tracking-wide flex items-center gap-3 group z-50 transition-colors duration-300',
            solidNav ? 'text-obsidian' : 'text-alabaster',
          )}
        >
          <span
            className={clsx(
              'w-8 h-8 md:w-9 md:h-9 border flex items-center justify-center rounded-sm text-base md:text-lg transition-all duration-700 ease-out',
              solidNav
                ? 'border-champagne/40 text-champagne md:group-hover:bg-champagne md:group-hover:text-alabaster'
                : 'border-alabaster/50 text-alabaster md:group-hover:bg-alabaster/20',
            )}
          >
            H
          </span>
          <span className="relative overflow-hidden tracking-wider">Ratnawali</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={twMerge(
                    clsx(
                      'font-sans text-sm tracking-widest uppercase transition-colors duration-300 py-2',
                      solidNav
                        ? isActive
                          ? 'text-obsidian font-medium'
                          : 'text-obsidian/60 hover:text-obsidian'
                        : isActive
                        ? 'text-alabaster font-medium'
                        : 'text-alabaster/70 hover:text-alabaster',
                    ),
                  )}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-champagne"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-champagne scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                )}
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className={clsx(
                'relative px-8 py-3 border font-sans text-xs uppercase tracking-widest transition-all duration-500 shadow-sm group flex items-center gap-2',
                solidNav
                  ? 'bg-transparent border-champagne text-obsidian hover:bg-champagne hover:text-alabaster'
                  : 'bg-transparent border-alabaster/50 text-alabaster hover:bg-alabaster/10',
              )}
            >
              <span className="relative z-10">Book Now</span>
              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-champagne group-hover:bg-alabaster transition-colors duration-500" />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={clsx(
            'md:hidden z-50 w-11 h-11 flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-colors duration-300',
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={clsx(
              'block w-6 h-[1px] transition-all duration-300',
              isMobileMenuOpen || solidNav ? 'bg-obsidian' : 'bg-alabaster',
              isMobileMenuOpen && 'rotate-45 translate-y-[7px]',
            )}
          />
          <span
            className={clsx(
              'block w-6 h-[1px] transition-all duration-300',
              isMobileMenuOpen || solidNav ? 'bg-obsidian' : 'bg-alabaster',
              isMobileMenuOpen && 'opacity-0',
            )}
          />
          <span
            className={clsx(
              'block w-6 h-[1px] transition-all duration-300',
              isMobileMenuOpen || solidNav ? 'bg-obsidian' : 'bg-alabaster',
              isMobileMenuOpen && '-rotate-45 -translate-y-[7px]',
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-alabaster flex flex-col justify-center items-center h-screen md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 w-full px-6">
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
                        isActive ? 'text-champagne font-medium' : 'text-obsidian',
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
                  className="px-10 py-4 bg-transparent border border-champagne text-obsidian font-sans text-sm uppercase tracking-widest flex items-center justify-center gap-3 w-full"
                >
                  <span>Book Now</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
