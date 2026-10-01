'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// JSON-LD: Organization + LodgingBusiness (Hotel)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Hotel', 'LodgingBusiness'],
  name: 'Hotel Ratnawali Jodhpur',
  url: 'https://hotelratnawalijodhpur.com',
  logo: 'https://hotelratnawalijodhpur.com/images/hero-main.jpg',
  image: 'https://hotelratnawalijodhpur.com/images/hero-main.jpg',
  description:
    'A heritage-inspired boutique hotel at 149–150 Nai Sarak, steps from Jodhpur\'s Clock Tower. Experience Marwari hospitality in the heart of the Blue City.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '149–150, Nai Sarak',
    addressLocality: 'Jodhpur',
    addressRegion: 'Rajasthan',
    postalCode: '342001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '26.2942',
    longitude: '73.0243',
  },
  telephone: '+919929040000',
  email: 'jodhpur@hotelratnawali.com',
  starRating: {
    '@type': 'Rating',
    ratingValue: '4',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Breakfast Available', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24-Hour Front Desk', value: true },
  ],
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, UPI',
  checkinTime: '14:00',
  checkoutTime: '11:00',
};

export function HomeClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityBackground = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="flex flex-col min-h-screen bg-alabaster">
        {/* ── Hero Section ── */}
        <section
          ref={heroRef}
          className="relative h-[70vh] md:h-[95vh] flex items-center overflow-hidden bg-obsidian"
          aria-label="Hotel Ratnawali hero — Blue City heritage boutique hotel"
        >
          <motion.div
            style={{ y: yBackground, opacity: opacityBackground }}
            className="absolute inset-0 z-0 origin-top"
          >
            <Image
              src="/images/hero-main.jpg"
              alt="Aerial view of Hotel Ratnawali in Jodhpur's historic Blue City neighbourhood, with blue-washed buildings and Mehrangarh Fort in the background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
          </motion.div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 pt-16 md:pt-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-2xl text-alabaster"
            >
              <motion.p
                variants={fadeUp}
                className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-champagne mb-4 md:mb-6 font-medium"
              >
                Welcome to Jodhpur
              </motion.p>
              {/* Single H1 — this is the page's primary heading */}
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 md:mb-8 drop-shadow-lg font-normal"
              >
                A Quiet <br />
                <span className="italic text-champagne">Sanctuary.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="font-sans text-base md:text-xl font-light mb-8 md:mb-12 opacity-80 max-w-lg leading-relaxed text-alabaster/90"
              >
                Experience the perfect blend of Marwari heritage and modern comfort, steps from
                Jodhpur&apos;s iconic Clock Tower in the heart of the Blue City.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/rooms"
                  className="relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 min-h-[44px] min-w-[44px] bg-transparent border border-champagne/50 text-champagne font-sans font-medium uppercase tracking-widest text-xs md:hover:bg-champagne md:hover:text-alabaster transition-all duration-700 ease-out shadow-[0_0_0_rgba(184,156,114,0)] md:hover:shadow-[0_4px_30px_rgba(184,156,114,0.3)] group overflow-hidden"
                >
                  <span className="relative z-10">Reserve Your Stay</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Feature Highlights ── */}
        <section className="py-24 md:py-40 bg-alabaster relative" aria-label="About Hotel Ratnawali">
          <div className="absolute left-0 top-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-champagne/5 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}
              >
                <motion.h2
                  variants={fadeUp}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian mb-6 md:mb-10 leading-tight"
                >
                  Redefining the <br />
                  <span className="italic font-light text-champagne">Hospitality</span> Experience
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="font-sans text-obsidian/70 mb-8 md:mb-12 leading-relaxed text-base md:text-lg font-light"
                >
                  Our approach to hospitality is rooted in minimal design, maximal comfort, and
                  understated luxury. Every corner of our property is meticulously curated to foster
                  relaxation and inspiration, honouring the rich Marwari heritage of Jodhpur.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link
                    href="/about"
                    className="group inline-flex items-center min-h-[44px] font-sans text-champagne font-medium uppercase tracking-widest text-xs md:hover:text-obsidian transition-colors duration-500"
                  >
                    <span className="relative pb-1">
                      Discover Our Story
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-champagne scale-x-100 md:group-hover:scale-x-0 transition-transform origin-right duration-500" />
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-obsidian scale-x-0 md:group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </span>
                    <span className="ml-4 transform md:group-hover:translate-x-2 transition-transform duration-500">
                      →
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2 }}
                className="relative h-[50vh] md:h-[700px] w-full group"
              >
                <div className="absolute inset-0 overflow-hidden shadow-2xl shadow-obsidian/10 transition-all duration-700 md:group-hover:shadow-champagne/20 z-10 rounded-sm">
                  <Image
                    src="/images/amenity-spa.jpg"
                    alt="Hotel Ratnawali's serene minimalist spa treatment room with warm Rajasthani stone accents"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700" />
                </div>
                {/* Decorative accent frame */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border border-champagne/30 -z-10 rounded-sm" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
