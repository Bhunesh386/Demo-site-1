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
    <div className="pt-24 md:pt-32 pb-24 md:pb-40 relative overflow-hidden bg-alabaster">
      <div className="absolute -left-32 md:-left-64 bottom-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-champagne/5 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-7xl text-obsidian mb-6 md:mb-8 tracking-tight pt-10">Get in Touch</motion.h1>
            <motion.div variants={fadeUp} className="w-16 h-[1px] bg-champagne mb-8 md:mb-10 opacity-70"></motion.div>
            <motion.p variants={fadeUp} className="font-sans text-lg md:text-xl text-obsidian/70 mb-12 md:mb-16 font-light leading-relaxed max-w-lg">
              We look forward to welcoming you. Reach out for reservations, event inquiries, or any special requests.
            </motion.p>

            <motion.address variants={fadeUp} className="not-italic space-y-8 md:space-y-10 border-l border-champagne/30 pl-6 md:pl-8">
              <div>
                <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-champagne mb-2 md:mb-3 font-semibold">Location</h3>
                <p className="font-sans text-base md:text-lg text-obsidian font-light">149–150, Nai Sarak<br/>Jodhpur, Rajasthan 342001</p>
              </div>
              <div>
                <h3 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-champagne mb-2 md:mb-3 font-semibold">Contact</h3>
                <p className="font-sans text-base md:text-lg text-obsidian font-light">jodhpur@hotelratnawali.com<br/>+91 99290-40000</p>
              </div>
            </motion.address>

            <motion.div variants={fadeUp} className="mt-12 md:mt-20 h-[30vh] md:h-72 rounded-sm border border-obsidian/5 flex items-center justify-center relative overflow-hidden group shadow-md">
              <span className="font-sans text-obsidian uppercase tracking-widest text-[10px] md:text-xs font-semibold z-10 bg-alabaster/95 px-4 md:px-6 py-2 md:py-3 backdrop-blur-md shadow-sm border border-champagne/20">Map Placeholder</span>
              <Image 
                src="/images/amenity-spa.jpg" 
                alt="Location View" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700"></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white p-6 md:p-10 lg:p-16 rounded-sm shadow-xl shadow-obsidian/5 border border-transparent hover:border-champagne/20 transition-all duration-700 relative"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 md:py-24"
              >
                <div className="w-16 h-16 border border-champagne/40 bg-champagne/5 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-full border border-champagne/30 animate-ping"></div>
                  <span className="text-champagne text-2xl font-light">✓</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-obsidian mb-4">Request Sent</h3>
                <p className="font-sans text-base md:text-lg text-obsidian/70 font-light max-w-xs mx-auto">Our concierge team will be in touch shortly to confirm your reservation details.</p>
              </motion.div>
            ) : (
              <form 
                className="space-y-8 md:space-y-10"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <h3 className="font-serif text-2xl md:text-3xl text-obsidian mb-8 md:mb-12">Reservation Request</h3>
                
                <div className="space-y-2 md:space-y-3 group">
                  <label className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">Full Name</label>
                  <input required type="text" className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none" />
                </div>
                
                <div className="space-y-2 md:space-y-3 group">
                  <label className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">Email Address</label>
                  <input required type="email" className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3 group">
                    <label className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">Check-in</label>
                    <input required type="date" className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none appearance-none" />
                  </div>
                  <div className="space-y-2 md:space-y-3 group">
                    <label className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">Check-out</label>
                    <input required type="date" className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none appearance-none" />
                  </div>
                </div>

                <div className="pt-6 md:pt-10">
                  <button type="submit" className="relative overflow-hidden w-full py-4 md:py-5 bg-obsidian text-alabaster font-sans text-[10px] md:text-xs font-semibold uppercase tracking-widest md:hover:bg-champagne transition-colors duration-500 shadow-md md:hover:shadow-champagne/30 rounded-sm min-h-[44px]">
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
