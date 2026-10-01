'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

// FAQPage JSON-LD for contact / booking queries
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I contact Hotel Ratnawali Jodhpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach Hotel Ratnawali by phone at +91 99290-40000, by email at jodhpur@hotelratnawali.com, or by visiting us at 149–150, Nai Sarak, Jodhpur, Rajasthan 342001.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cancellation policy at Hotel Ratnawali?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cancellations made more than 48 hours before check-in are eligible for a full refund. Cancellations within 48 hours of check-in may incur a one-night retention charge. Please contact us for specific terms applicable to your booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Hotel Ratnawali close to Jodhpur railway station or airport?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel Ratnawali is located in the historic city centre at Nai Sarak, approximately 3 km from Jodhpur Railway Station and 8 km from Jodhpur Airport (Maharana Pratap Airport). We can arrange pick-up — please contact us in advance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Hotel Ratnawali offer event or wedding packages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Hotel Ratnawali can accommodate intimate gatherings, celebrations, and destination wedding events. Please reach out via email or phone to discuss your requirements and receive a customised proposal.',
      },
    },
  ],
};

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="pt-24 md:pt-32 pb-24 md:pb-40 relative overflow-hidden bg-alabaster">
        <div className="absolute -left-32 md:-left-64 bottom-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-champagne/5 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="mb-8 pt-4">
            <ol className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-obsidian/50">
              <li><Link href="/" className="md:hover:text-champagne transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-obsidian/30">›</li>
              <li className="text-champagne" aria-current="page">Contact</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="show">
              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl md:text-7xl text-obsidian mb-6 md:mb-8 tracking-tight"
              >
                Get in Touch
              </motion.h1>
              <motion.div variants={fadeUp} className="w-16 h-[1px] bg-champagne mb-8 md:mb-10 opacity-70" />
              <motion.p
                variants={fadeUp}
                className="font-sans text-lg md:text-xl text-obsidian/70 mb-12 md:mb-16 font-light leading-relaxed max-w-lg"
              >
                We look forward to welcoming you. Reach out for reservations, event inquiries, or
                any special requests — our team responds within a few hours.
              </motion.p>

              <motion.address variants={fadeUp} className="not-italic space-y-8 md:space-y-10 border-l border-champagne/30 pl-6 md:pl-8">
                <div>
                  <h2 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-champagne mb-2 md:mb-3 font-semibold">Location</h2>
                  <p className="font-sans text-base md:text-lg text-obsidian font-light">
                    149–150, Nai Sarak<br />
                    Jodhpur, Rajasthan 342001
                  </p>
                </div>
                <div>
                  <h2 className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-champagne mb-2 md:mb-3 font-semibold">Contact</h2>
                  <p className="font-sans text-base md:text-lg text-obsidian font-light">
                    <a
                      href="mailto:jodhpur@hotelratnawali.com"
                      className="md:hover:text-champagne transition-colors"
                    >
                      jodhpur@hotelratnawali.com
                    </a>
                    <br />
                    <a
                      href="tel:+919929040000"
                      className="md:hover:text-champagne transition-colors"
                    >
                      +91 99290-40000
                    </a>
                  </p>
                </div>
              </motion.address>

              <motion.div
                variants={fadeUp}
                className="mt-12 md:mt-20 h-[30vh] md:h-72 rounded-sm border border-obsidian/5 flex items-center justify-center relative overflow-hidden group shadow-md"
                aria-label="Hotel location map placeholder"
              >
                <span className="font-sans text-obsidian uppercase tracking-widest text-[10px] md:text-xs font-semibold z-10 bg-alabaster/95 px-4 md:px-6 py-2 md:py-3 backdrop-blur-md shadow-sm border border-champagne/20">
                  149–150 Nai Sarak, Jodhpur
                </span>
                <Image
                  src="/images/amenity-spa.jpg"
                  alt="Aerial view of Hotel Ratnawali's surroundings in Jodhpur's Nai Sarak neighbourhood near the Clock Tower"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90 transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700" />
              </motion.div>
            </motion.div>

            {/* ── Reservation Form ── */}
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
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 border border-champagne/40 bg-champagne/5 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border border-champagne/30 animate-ping" aria-hidden="true" />
                    <span className="text-champagne text-2xl font-light" aria-hidden="true">✓</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-obsidian mb-4">Request Sent</h3>
                  <p className="font-sans text-base md:text-lg text-obsidian/70 font-light max-w-xs mx-auto">
                    Our concierge team will be in touch within a few hours to confirm your reservation details.
                  </p>
                </motion.div>
              ) : (
                <form
                  className="space-y-8 md:space-y-10"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  aria-label="Reservation request form"
                >
                  <h2 className="font-serif text-2xl md:text-3xl text-obsidian mb-8 md:mb-12">Reservation Request</h2>

                  <div className="space-y-2 md:space-y-3 group">
                    <label htmlFor="contact-name" className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      autoComplete="name"
                      className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none"
                    />
                  </div>

                  <div className="space-y-2 md:space-y-3 group">
                    <label htmlFor="contact-email" className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      autoComplete="email"
                      className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-3 group">
                      <label htmlFor="contact-checkin" className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">
                        Check-in
                      </label>
                      <input
                        id="contact-checkin"
                        required
                        type="date"
                        className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none appearance-none"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3 group">
                      <label htmlFor="contact-checkout" className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-obsidian/50 md:group-focus-within:text-champagne transition-colors font-semibold">
                        Check-out
                      </label>
                      <input
                        id="contact-checkout"
                        required
                        type="date"
                        className="w-full border-b border-obsidian/20 py-2 md:py-3 bg-transparent font-sans text-obsidian text-base md:text-lg focus:outline-none focus:border-champagne transition-colors min-h-[44px] rounded-none appearance-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 md:pt-10">
                    <button
                      type="submit"
                      className="relative overflow-hidden w-full py-4 md:py-5 bg-obsidian text-alabaster font-sans text-[10px] md:text-xs font-semibold uppercase tracking-widest md:hover:bg-champagne transition-colors duration-500 shadow-md md:hover:shadow-champagne/30 rounded-sm min-h-[44px]"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
