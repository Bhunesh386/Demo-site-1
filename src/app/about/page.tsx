'use client';

import { motion } from 'framer-motion';
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

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
  show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2 } }
};

export default function About() {
  const leadership = [
    { name: "Eleanor Wright", role: "General Manager", img: "/images/about-team.jpg" },
    { name: "Marcus Thorne", role: "Head of Operations", img: "/images/about-team.jpg" },
    { name: "Sophia Lin", role: "Design Director", img: "/images/about-team.jpg" }
  ];

  const galleryImages = [
    "/images/hero-secondary.jpg",
    "/images/amenity-pool.jpg",
    "/images/amenity-lounge.jpg",
    "/images/amenity-dining.jpg"
  ];

  return (
    <div className="pt-32 pb-40 overflow-hidden relative bg-alabaster">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        {/* Mission Statement */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center mb-48 pt-10"
        >
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl text-obsidian mb-10 tracking-tight">The Vision</motion.h1>
          <motion.div variants={fadeUp} className="w-16 h-[1px] bg-champagne mx-auto mb-12 opacity-80"></motion.div>
          <motion.p variants={fadeUp} className="font-sans text-xl md:text-3xl text-obsidian/70 font-light leading-relaxed">
            To create a sanctuary where understated design meets intuitive hospitality. We believe that true luxury lies in the details—the quiet spaces, the thoughtful amenities, and seamless service.
          </motion.p>
        </motion.section>

        {/* Gallery Masonry Grid */}
        <section className="mb-48">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Left Column */}
            <div className="space-y-8 md:space-y-12">
              <motion.div variants={imageReveal} className="relative h-[450px] md:h-[650px] overflow-hidden group shadow-lg rounded-sm">
                <Image src={galleryImages[0]} alt="Gallery image 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </motion.div>
              <motion.div variants={imageReveal} className="relative h-[350px] md:h-[450px] overflow-hidden group shadow-lg rounded-sm">
                <Image src={galleryImages[1]} alt="Gallery image 2" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </motion.div>
            </div>
            
            {/* Right Column (Offset) */}
            <div className="space-y-8 md:space-y-12 md:pt-32">
              <motion.div variants={imageReveal} className="relative h-[350px] md:h-[450px] overflow-hidden group shadow-lg rounded-sm">
                <Image src={galleryImages[2]} alt="Gallery image 3" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </motion.div>
              <motion.div variants={imageReveal} className="relative h-[450px] md:h-[650px] overflow-hidden group shadow-lg rounded-sm">
                <Image src={galleryImages[3]} alt="Gallery image 4" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-obsidian/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Leadership Grid */}
        <section>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-obsidian mb-6">Our Leadership</motion.h2>
            <motion.div variants={fadeUp} className="w-10 h-[1px] bg-champagne mx-auto opacity-60"></motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {leadership.map((person, index) => (
              <motion.div 
                key={person.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: index * 0.2 } }
                }}
                className="group cursor-pointer"
              >
                <div className="relative h-[500px] mb-8 overflow-hidden rounded-sm shadow-md group-hover:shadow-xl group-hover:shadow-champagne/10 transition-all duration-700">
                  <Image 
                    src={person.img} 
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <div className="absolute inset-4 border border-alabaster/0 group-hover:border-alabaster/30 transition-colors duration-700 z-20"></div>
                </div>
                <h3 className="font-serif text-3xl text-obsidian mb-2 transition-colors">{person.name}</h3>
                <p className="font-sans text-champagne uppercase tracking-widest text-xs font-semibold">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
