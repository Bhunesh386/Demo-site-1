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

  return (
    <header className="sticky top-0 z-50 bg-alabaster/90 backdrop-blur-xl border-b border-obsidian/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <nav className="container mx-auto px-4 lg:px-6 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-obsidian flex items-center gap-3 group z-50">
          <span className="w-8 h-8 md:w-9 md:h-9 border border-champagne/40 bg-transparent text-champagne flex items-center justify-center rounded-sm text-base md:text-lg md:group-hover:bg-champagne md:group-hover:text-alabaster transition-all duration-700 ease-out">
            H
          </span>
          <span className="relative overflow-hidden tracking-wider">
            Ratnawali
          </span>
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
                      "font-sans text-sm tracking-widest uppercase transition-colors py-2",
                      isActive ? "text-obsidian font-medium" : "text-obsidian/60 hover:text-obsidian"
                    )
                  )}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[1px] bg-champagne"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
              className="relative px-8 py-3 bg-transparent border border-champagne text-obsidian font-sans text-xs uppercase tracking-widest hover:bg-champagne hover:text-alabaster transition-all duration-500 shadow-sm group flex items-center gap-2"
            >
              <span className="relative z-10">Book Now</span>
              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-champagne group-hover:bg-alabaster transition-colors duration-500"></span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 w-11 h-11 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={clsx("block w-6 h-[1px] bg-obsidian transition-all duration-300", isMobileMenuOpen && "rotate-45 translate-y-[7px]")}></span>
          <span className={clsx("block w-6 h-[1px] bg-obsidian transition-all duration-300", isMobileMenuOpen && "opacity-0")}></span>
          <span className={clsx("block w-6 h-[1px] bg-obsidian transition-all duration-300", isMobileMenuOpen && "-rotate-45 -translate-y-[7px]")}></span>
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
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    className="w-full text-center"
                  >
                    <Link 
                      href={link.href}
                      className={clsx(
                        "font-serif text-3xl tracking-wide block w-full py-2",
                        isActive ? "text-champagne font-medium" : "text-obsidian"
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
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne"></span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
