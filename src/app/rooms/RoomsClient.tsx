'use client';

import { motion } from 'framer-motion';
import { rooms } from '@/content/rooms';
import Link from 'next/link';
import { RoomGallery } from '@/components/RoomGallery';
import { roomGalleries } from '@/data/images';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2 } },
};

// FAQPage JSON-LD for the rooms listing
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of rooms are available at Hotel Ratnawali Jodhpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hotel Ratnawali offers three room categories: Deluxe Rooms (from ₹2,499/night) with courtyard or city views, Super Deluxe Rooms (from ₹3,499/night) with carved jharokha seating and rain showers, and the Ratnawali Royal Suite (from ₹5,499/night) with panoramic Blue City fort views and personalized concierge service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do rooms at Hotel Ratnawali include breakfast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Breakfast is available for all guests. Please contact us to confirm the current meal plan included with your booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the check-in and check-out time at Hotel Ratnawali?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard check-in is at 14:00 (2 PM) and check-out is at 11:00 (11 AM). Early check-in and late check-out may be arranged subject to availability — please contact the hotel.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a room at Hotel Ratnawali Jodhpur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reserve your room directly via WhatsApp on +91 99290-40000, by email at jodhpur@hotelratnawali.com, or through the booking form on our Contact page.',
      },
    },
  ],
};

export function RoomsClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="pt-32 pb-24 md:pb-40 relative overflow-hidden bg-alabaster">
        <div className="absolute top-1/4 -right-64 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6">
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-obsidian/50">
              <li><Link href="/" className="md:hover:text-champagne transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-obsidian/30">›</li>
              <li className="text-champagne" aria-current="page">Rooms &amp; Accommodations</li>
            </ol>
          </nav>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl mb-24 md:mb-40 pt-4"
          >
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl text-obsidian mb-8 tracking-tight">
              Accommodations
            </motion.h1>
            <motion.div variants={fadeUp} className="w-16 h-[1px] bg-champagne mb-10 opacity-70" />
            <motion.p variants={fadeUp} className="font-sans text-xl md:text-2xl text-obsidian/70 font-light leading-relaxed">
              Designed for the discerning traveller. Each room at Hotel Ratnawali blends premium
              amenities with authentic Marwari heritage craftsmanship and unparalleled comfort.
            </motion.p>
          </motion.div>

          <div className="space-y-24 md:space-y-48">
            {rooms.map((room, index) => {
              const gallery = roomGalleries[room.slug] ?? [];
              return (
                <motion.div
                  key={room.slug}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={staggerContainer}
                  className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 lg:gap-24 items-center`}
                >
                  <motion.div
                    variants={imageReveal}
                    className="w-full md:w-1/2 h-[40vh] md:h-[550px] relative rounded-sm overflow-hidden group shadow-lg"
                  >
                    <RoomGallery
                      images={gallery}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="absolute inset-0 transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 bg-white rounded-sm shadow-xl shadow-obsidian/5 -mt-16 md:mt-0 relative z-10 border border-transparent md:hover:border-champagne/30 transition-all duration-700 group mx-4 md:mx-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6 md:mb-8">
                      <h2 className="font-serif text-3xl md:text-4xl text-obsidian transition-colors duration-300">{room.name}</h2>
                      <span className="px-3 py-1 bg-champagne/10 text-champagne text-xs uppercase tracking-widest font-semibold rounded-full self-start md:self-auto">
                        Available
                      </span>
                    </div>

                    <p className="font-sans text-base md:text-lg text-obsidian/70 mb-8 md:mb-12 leading-relaxed font-light">
                      {room.description}
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6 mb-10 md:mb-12" aria-label={`${room.name} features`}>
                      {room.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="font-sans text-sm text-obsidian flex items-center group/item">
                          <span className="w-1.5 h-1.5 bg-champagne/40 mr-4 md:group-hover/item:bg-champagne transition-all duration-300" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-obsidian/10 pt-8 md:pt-10 gap-6 sm:gap-0">
                      <div>
                        <span className="block font-sans text-2xl md:text-3xl text-obsidian font-medium tracking-tight">
                          ₹{(room.basePrice / 100).toLocaleString('en-IN')}
                        </span>
                        <span className="block font-sans text-[10px] md:text-xs uppercase tracking-widest text-champagne mt-1 md:mt-2 font-semibold">
                          per night + taxes
                        </span>
                      </div>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="relative overflow-hidden px-8 py-4 bg-transparent border border-obsidian/20 text-obsidian font-sans text-xs uppercase tracking-widest font-medium md:hover:bg-obsidian md:hover:border-obsidian md:hover:text-alabaster transition-all duration-500 shadow-sm rounded-sm text-center w-full sm:w-auto min-h-[44px] flex items-center justify-center"
                        aria-label={`View details for ${room.name}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
