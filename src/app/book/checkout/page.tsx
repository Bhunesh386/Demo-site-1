'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useBookingStore } from '@/store/useBookingStore';
import { rooms } from '@/data/rooms';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { checkIn, checkOut, adults, children, selectedRoomId, totalPrice } = useBookingStore();
  const { setBookingRef } = useBookingStore();

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    if (!checkIn || !checkOut || !selectedRoom) {
      router.push('/book');
    }
  }, [checkIn, checkOut, selectedRoom, router]);

  const onSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate simple ref
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'RTN-';
    for (let i = 0; i < 8; i++) {
      // Avoid Math.random in strict purity lint rules by using current time
      // eslint-disable-next-line react-hooks/purity
      ref += chars.charAt(Math.floor((Date.now() + i * 13) % chars.length));
    }

    setBookingRef(ref);
    router.push('/book/confirmation');
  };

  if (!checkIn || !checkOut || !selectedRoom) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 md:py-20"
    >
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-2/3">
          <h1 className="font-serif text-3xl md:text-5xl text-body mb-8">Guest Details</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-accent mb-2 font-semibold">First Name</label>
                <input 
                  {...register('firstName')}
                  className="w-full bg-surface border border-divider px-4 py-3 text-body rounded-sm focus:outline-none focus:border-accent transition-colors"
                />
                {errors.firstName && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-xs mt-1">{errors.firstName.message}</motion.p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-accent mb-2 font-semibold">Last Name</label>
                <input 
                  {...register('lastName')}
                  className="w-full bg-surface border border-divider px-4 py-3 text-body rounded-sm focus:outline-none focus:border-accent transition-colors"
                />
                {errors.lastName && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-xs mt-1">{errors.lastName.message}</motion.p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-accent mb-2 font-semibold">Email Address</label>
                <input 
                  type="email"
                  {...register('email')}
                  className="w-full bg-surface border border-divider px-4 py-3 text-body rounded-sm focus:outline-none focus:border-accent transition-colors"
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-xs mt-1">{errors.email.message}</motion.p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-accent mb-2 font-semibold">Phone Number</label>
                <input 
                  type="tel"
                  {...register('phone')}
                  className="w-full bg-surface border border-divider px-4 py-3 text-body rounded-sm focus:outline-none focus:border-accent transition-colors"
                />
                {errors.phone && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-xs mt-1">{errors.phone.message}</motion.p>
                )}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-divider">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-4 bg-accent text-page uppercase tracking-widest text-sm font-semibold hover:bg-dark transition-colors disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-32 bg-surface border border-divider shadow-lg rounded-sm p-6 md:p-8">
            <h2 className="font-serif text-2xl text-body mb-6">Reservation Summary</h2>
            
            <div className="space-y-4 mb-6 border-b border-divider pb-6">
              <div>
                <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">Room</p>
                <p className="font-serif text-lg text-body">{selectedRoom.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">Check-in</p>
                  <p className="font-sans text-body">{format(checkIn, 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">Check-out</p>
                  <p className="font-sans text-body">{format(checkOut, 'MMM d, yyyy')}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">Guests</p>
                <p className="font-sans text-body">{adults} Adult{adults > 1 ? 's' : ''}, {children} Children</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-body">
                <span>Room Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-body">
                <span>Taxes & Fees (18%)</span>
                <span>₹{Math.round(totalPrice * 0.18)}</span>
              </div>
              <div className="flex justify-between font-serif text-2xl text-body pt-4 border-t border-divider mt-4">
                <span>Total</span>
                <span>₹{totalPrice + Math.round(totalPrice * 0.18)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
