'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { HeroSlideshow } from '@/components/HeroSlideshow';
import { homeFeatureImage, ogImage } from '@/data/images';

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
  logo: `https://hotelratnawalijodhpur.com${ogImage.url}`,
  image: `https://hotelratnawalijodhpur.com${ogImage.url}`,
  description:
    "A heritage-inspired boutique hotel at 149–150 Nai Sarak, steps from Jodhpur's Clock Tower. Experience Marwari hospitality in the heart of the Blue City.",
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
  const featureRef = useRef(null);

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
        {/* ── Hero Slideshow ── */}
        <HeroSlideshow />

        {/* ── Feature Highlights ── */}
        <section
          ref={featureRef}
          className="py-24 md:py-40 bg-alabaster relative"
          aria-label="About Hotel Ratnawali"
        >
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
                    src={homeFeatureImage.src}
                    alt={homeFeatureImage.alt}
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

        {/* ── Location & Heritage Content (SEO Boost) ── */}
        <section className="py-24 md:py-32 bg-obsidian text-alabaster relative" aria-label="Location and Heritage">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
            >
              <div>
                <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                  A Heritage Hotel in the Heart of <br className="hidden md:block"/>
                  <span className="italic text-champagne font-light">Jodhpur&apos;s Blue City</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="font-sans text-alabaster/80 mb-6 leading-relaxed font-light">
                  Nestled comfortably on Nai Sarak, Hotel Ratnawali offers unparalleled access to Jodhpur&apos;s most iconic landmarks. As a premier heritage boutique hotel, we provide a tranquil retreat from the bustling city streets, while keeping you within a short stroll of the magnificent Clock Tower (Ghanta Ghar) and the vibrant Sardar Market.
                </motion.p>
                <motion.h3 variants={fadeUp} className="font-sans text-lg text-champagne uppercase tracking-widest mb-4 mt-10">
                  Authentic Rajasthani Architecture
                </motion.h3>
                <motion.p variants={fadeUp} className="font-sans text-alabaster/80 mb-6 leading-relaxed font-light">
                  Our property features intricately carved sandstone jharokhas, traditional Marwari design motifs, and sustainable modern luxury. Whether you are exploring the towering Mehrangarh Fort or enjoying our rooftop amenities, the essence of Rajasthan is woven into every aspect of your stay.
                </motion.p>
              </div>
              <div className="flex flex-col justify-center space-y-8 border-l border-alabaster/10 pl-8 md:pl-12">
                <motion.div variants={fadeUp}>
                  <h3 className="font-serif text-2xl mb-2 text-champagne">Premium Accommodations</h3>
                  <p className="font-sans font-light text-alabaster/70">From our thoughtfully appointed Deluxe Rooms to the expansive Ratnawali Royal Suite, every space is designed for absolute comfort and quiet luxury.</p>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h3 className="font-serif text-2xl mb-2 text-champagne">Central Jodhpur Location</h3>
                  <p className="font-sans font-light text-alabaster/70">Located at 149-150 Nai Sarak, we are perfectly positioned for travellers looking to discover the rich history, textiles, and cuisine of Jodhpur.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
