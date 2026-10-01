'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function Navigation() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/rooms', label: 'Rooms & Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-alabaster/90 backdrop-blur-xl border-b border-obsidian/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <nav className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="font-serif text-3xl font-medium tracking-wide text-obsidian flex items-center gap-3 group">
          <span className="w-9 h-9 border border-champagne/40 bg-transparent text-champagne flex items-center justify-center rounded-sm text-lg group-hover:bg-champagne group-hover:text-alabaster transition-all duration-700 ease-out">
            H
          </span>
          <span className="relative overflow-hidden tracking-wider">
            Ratnawali
          </span>
        </Link>
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
      </nav>
    </header>
  );
}
