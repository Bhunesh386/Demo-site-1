'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useBookingStore } from '@/store/useBookingStore';

export default function ConfirmationPage() {
  const router = useRouter();
  const { selectedRoomId, bookingRef, resetBooking } = useBookingStore();

  useEffect(() => {
    // If user accesses this route directly without booking, redirect.
    if (!selectedRoomId || !bookingRef) {
      router.push('/book');
      return;
    }
    
    // Clear booking state after mounting so they can't go back and resubmit easily
    const t = setTimeout(() => {
      resetBooking();
    }, 1000);

    return () => clearTimeout(t);
  }, [selectedRoomId, bookingRef, router, resetBooking]);

  if (!selectedRoomId || !bookingRef) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto px-4 py-20 text-center max-w-2xl"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-12 h-12 text-accent" />
      </motion.div>

      <h1 className="font-serif text-4xl md:text-5xl text-body mb-4">Reservation Confirmed</h1>
      <div className="w-16 h-[1px] bg-accent mx-auto opacity-70 mb-8" />
      
      <p className="font-sans text-muted mb-8 leading-relaxed">
        Thank you for choosing Hotel Ratnawali. Your reservation has been successfully received, and a confirmation email is on its way.
      </p>

      <div className="bg-surface border border-divider p-8 rounded-sm mb-12 shadow-sm inline-block min-w-[300px]">
        <p className="text-xs uppercase tracking-widest text-accent mb-2 font-semibold">Booking Reference</p>
        <p className="font-mono text-2xl md:text-3xl text-body font-bold tracking-wider">{bookingRef}</p>
      </div>

      <div>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-10 py-4 bg-transparent border border-accent text-accent uppercase tracking-widest text-sm font-semibold hover:bg-accent hover:text-page transition-colors shadow-sm"
        >
          Return to Homepage
        </Link>
      </div>
    </motion.div>
  );
}
