'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingSearchWidget from '@/components/BookingSearchWidget';
import AvailableRooms from '@/components/AvailableRooms';

export default function BookPage() {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-20"
    >
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-6xl text-body mb-4">Select Your Dates</h1>
        <div className="w-16 h-[1px] bg-accent mx-auto opacity-70 mb-4" />
        <p className="font-sans text-muted max-w-2xl mx-auto">
          Experience the heritage of Jodhpur. Enter your dates to find the perfect accommodation for your stay.
        </p>
      </div>

      <BookingSearchWidget onSearch={() => setHasSearched(true)} />

      <AnimatePresence mode="wait">
        {hasSearched && (
          <AvailableRooms />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
