'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } }
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-40 relative overflow-hidden bg-alabaster">
      <div className="absolute -left-64 bottom-0 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl text-obsidian mb-8 tracking-tight pt-10">Get in Touch</motion.h1>
            <motion.div variants={fadeUp} className="w-16 h-[1px] bg-champagne mb-10 opacity-70"></motion.div>
            <motion.p variants={fadeUp} className="font-sans text-xl text-obsidian/70 mb-16 font-light leading-relaxed max-w-lg">
              We look forward to welcoming you. Reach out for reservations, event inquiries, or any special requests.
            </motion.p>

            <motion.address variants={fadeUp} className="not-italic space-y-10 border-l border-champagne/30 pl-8">
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-champagne mb-3 font-semibold">Location</h3>
                <p className="font-sans text-lg text-obsidian font-light">149–150, Nai Sarak<br/>Jodhpur, Rajasthan 342001</p>
              </div>
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest text-champagne mb-3 font-semibold">Contact</h3>
                <p className="font-sans text-lg text-obsidian font-light">jodhpur@hotelratnawali.com<br/>+91 99290-40000</p>
              </div>
            </motion.address>

            <motion.div variants={fadeUp} className="mt-20 h-72 rounded-sm border border-obsidian/5 flex items-center justify-center relative overflow-hidden group shadow-md">
              <span className="font-sans text-obsidian uppercase tracking-widest text-xs font-semibold z-10 bg-alabaster/95 px-6 py-3 backdrop-blur-md shadow-sm border border-champagne/20">Map Placeholder</span>
              <Image 
                src="/images/amenity-spa.jpg" 
                alt="Location View" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700"></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white p-10 md:p-16 rounded-sm shadow-xl shadow-obsidian/5 border border-transparent hover:border-champagne/20 transition-all duration-700 relative"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="h-full flex flex-col items-center justify-center text-center py-24"
              >
                <div className="w-16 h-16 border border-champagne/40 bg-champagne/5 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-full border border-champagne/30 animate-ping"></div>
                  <span className="text-champagne text-2xl font-light">✓</span>
                </div>
                <h3 className="font-serif text-3xl text-obsidian mb-4">Request Sent</h3>
                <p className="font-sans text-lg text-obsidian/70 font-light max-w-xs mx-auto">Our concierge team will be in touch shortly to confirm your reservation details.</p>
              </motion.div>
            ) : (
              <form 
                className="space-y-10"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <h3 className="font-serif text-3xl text-obsidian mb-12">Reservation Request</h3>
                
                <div className="space-y-3 group">
                  <label className="font-sans text-xs uppercase tracking-widest text-obsidian/50 group-focus-within:text-champagne transition-colors font-semibold">Full Name</label>
                  <input required type="text" className="w-full border-b border-obsidian/20 py-3 bg-transparent font-sans text-obsidian text-lg focus:outline-none focus:border-champagne transition-colors" />
                </div>
                
                <div className="space-y-3 group">
                  <label className="font-sans text-xs uppercase tracking-widest text-obsidian/50 group-focus-within:text-champagne transition-colors font-semibold">Email Address</label>
                  <input required type="email" className="w-full border-b border-obsidian/20 py-3 bg-transparent font-sans text-obsidian text-lg focus:outline-none focus:border-champagne transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="font-sans text-xs uppercase tracking-widest text-obsidian/50 group-focus-within:text-champagne transition-colors font-semibold">Check-in</label>
                    <input required type="date" className="w-full border-b border-obsidian/20 py-3 bg-transparent font-sans text-obsidian text-lg focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                  <div className="space-y-3 group">
                    <label className="font-sans text-xs uppercase tracking-widest text-obsidian/50 group-focus-within:text-champagne transition-colors font-semibold">Check-out</label>
                    <input required type="date" className="w-full border-b border-obsidian/20 py-3 bg-transparent font-sans text-obsidian text-lg focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                </div>

                <div className="pt-10">
                  <button type="submit" className="relative overflow-hidden w-full py-5 bg-obsidian text-alabaster font-sans text-xs font-semibold uppercase tracking-widest hover:bg-champagne transition-colors duration-500 shadow-md hover:shadow-champagne/30 rounded-sm">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
