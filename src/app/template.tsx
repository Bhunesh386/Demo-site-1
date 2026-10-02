'use client';

/**
 * template.tsx — route entry transition
 * Gentle opacity fade only (no translate or blur) to keep it premium and subtle.
 * prefers-reduced-motion: framer-motion respects this automatically when
 * `duration: 0` is not set, but we force immediate display via reduced duration.
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col min-h-screen"
    >
      {children}
    </motion.main>
  );
}
