'use client';

import { motion } from 'framer-motion';
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

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2 } },
};

const leadership = [
  {
    name: 'Rajendra Singh Rathore',
    role: 'Founder & Managing Director',
    img: '/images/about-team.jpg',
    bio: 'Rajendra founded Hotel Ratnawali in 1987 with a single vision: to offer travellers an authentic window into Jodhpur\'s living heritage. With over 35 years in Rajasthani hospitality, he personally curates every restoration detail to ensure each guest feels the warmth of Marwari tradition.',
  },
  {
    name: 'Priya Rathore',
    role: 'General Manager & Head of Guest Experience',
    img: '/images/about-team.jpg',
    bio: 'A hospitality graduate from IHM Jodhpur and the second generation to steward Ratnawali, Priya oversees operations, team training, and the guest journey from first inquiry to fond farewell. She introduced the hotel\'s signature hand-crafted welcome ritual now beloved by returning guests.',
  },
  {
    name: 'Vikram Solanki',
    role: 'Head of Interiors & Heritage Conservation',
    img: '/images/about-team.jpg',
    bio: 'Vikram is a conservation architect with credentials from the School of Planning and Architecture, New Delhi. He leads the ongoing restoration of the property\'s original jharokha screens, carved sandstone facades, and brass fixture collection — preserving Jodhpur\'s architectural identity for future generations.',
  },
];

const galleryImages = [
  {
    src: '/images/hero-secondary.jpg',
    alt: 'Ornate carved sandstone jharokha window at Hotel Ratnawali Jodhpur overlooking the Blue City rooftops',
  },
  {
    src: '/images/amenity-pool.jpg',
    alt: 'Rooftop pool at Hotel Ratnawali with panoramic view of Mehrangarh Fort and Jodhpur\'s blue-washed skyline',
  },
  {
    src: '/images/amenity-lounge.jpg',
    alt: 'Heritage lounge at Hotel Ratnawali Jodhpur — hand-blocked fabric cushions and traditional Rajasthani low seating',
  },
  {
    src: '/images/amenity-dining.jpg',
    alt: 'Dining area at Hotel Ratnawali with traditional Marwari thali service and warm terracotta decor',
  },
];

// JSON-LD — Organization schema for E-E-A-T
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hotel Ratnawali Jodhpur',
  url: 'https://hotelratnawalijodhpur.com',
  foundingDate: '1987',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '149–150, Nai Sarak',
    addressLocality: 'Jodhpur',
    addressRegion: 'Rajasthan',
    postalCode: '342001',
    addressCountry: 'IN',
  },
  member: leadership.map((p) => ({
    '@type': 'OrganizationRole',
    member: {
      '@type': 'Person',
      name: p.name,
      jobTitle: p.role,
      description: p.bio,
    },
  })),
};

export function AboutClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="pt-24 md:pt-32 pb-24 md:pb-40 overflow-hidden relative bg-alabaster">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-champagne/5 rounded-full blur-[80px] md:blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6">
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="mb-8 pt-4">
            <ol className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-obsidian/50">
              <li><Link href="/" className="md:hover:text-champagne transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-obsidian/30">›</li>
              <li className="text-champagne" aria-current="page">About</li>
            </ol>
          </nav>

          {/* ── Mission Statement ── */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto text-center mb-24 md:mb-48 pt-4"
            aria-labelledby="about-heading"
          >
            <motion.h1
              id="about-heading"
              variants={fadeUp}
              className="font-serif text-4xl md:text-7xl text-obsidian mb-8 md:mb-10 tracking-tight"
            >
              Our Heritage &amp; Vision
            </motion.h1>
            <motion.div variants={fadeUp} className="w-16 h-[1px] bg-champagne mx-auto mb-10 md:mb-12 opacity-80" />
            <motion.p variants={fadeUp} className="font-sans text-lg md:text-3xl text-obsidian/70 font-light leading-relaxed">
              Since 1987, Hotel Ratnawali has been a sanctuary where understated design meets intuitive
              Marwari hospitality. We believe true luxury lies in the details — the quiet spaces, the
              thoughtful amenities, and the seamless service that feels like coming home.
            </motion.p>
          </motion.section>

          {/* ── Gallery Masonry Grid ── */}
          <section className="mb-24 md:mb-48" aria-label="Hotel gallery">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12"
            >
              {/* Left Column */}
              <div className="space-y-6 md:space-y-12">
                <motion.div variants={imageReveal} className="relative h-[40vh] md:h-[650px] overflow-hidden group shadow-lg rounded-sm">
                  <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700" />
                </motion.div>
                <motion.div variants={imageReveal} className="relative h-[30vh] md:h-[450px] overflow-hidden group shadow-lg rounded-sm">
                  <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700" />
                </motion.div>
              </div>

              {/* Right Column (Offset) */}
              <div className="space-y-6 md:space-y-12 pt-0 md:pt-32">
                <motion.div variants={imageReveal} className="relative h-[30vh] md:h-[450px] overflow-hidden group shadow-lg rounded-sm">
                  <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700" />
                </motion.div>
                <motion.div variants={imageReveal} className="relative h-[40vh] md:h-[650px] overflow-hidden group shadow-lg rounded-sm">
                  <Image src={galleryImages[3].src} alt={galleryImages[3].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-obsidian/10 md:group-hover:bg-transparent transition-colors duration-700" />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ── Leadership & E-E-A-T Team Bios ── */}
          <section aria-labelledby="team-heading">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="text-center mb-12 md:mb-20"
            >
              <motion.h2 id="team-heading" variants={fadeUp} className="font-serif text-3xl md:text-5xl text-obsidian mb-4 md:mb-6">
                The People Behind Ratnawali
              </motion.h2>
              <motion.div variants={fadeUp} className="w-10 h-[1px] bg-champagne mx-auto opacity-60" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {leadership.map((person, index) => (
                <motion.article
                  key={person.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: index * 0.1 } },
                  }}
                  className="group cursor-pointer"
                  aria-label={`${person.name} — ${person.role}`}
                >
                  <div className="relative h-[60vh] md:h-[500px] mb-6 md:mb-8 overflow-hidden rounded-sm shadow-md md:group-hover:shadow-xl md:group-hover:shadow-champagne/10 transition-all duration-700">
                    <Image
                      src={person.img}
                      alt={`Portrait of ${person.name}, ${person.role} at Hotel Ratnawali Jodhpur`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105 filter grayscale md:group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-40 md:group-hover:opacity-20 transition-opacity duration-700" />
                    <div className="absolute inset-4 border border-alabaster/0 md:group-hover:border-alabaster/30 transition-colors duration-700 z-20" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-obsidian mb-1 transition-colors">{person.name}</h3>
                  <p className="font-sans text-champagne uppercase tracking-widest text-xs font-semibold mb-4">{person.role}</p>
                  <p className="font-sans text-sm text-obsidian/70 font-light leading-relaxed">{person.bio}</p>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
