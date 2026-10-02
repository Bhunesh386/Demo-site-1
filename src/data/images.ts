/**
 * Single source of truth for all image paths and alt text.
 * Keep paths relative to /public (i.e. the URL path used by next/image).
 * Old files are intentionally left in /public until verified; do not reference them here.
 */

// ─── Hero Slideshow ───────────────────────────────────────────────────────────

export interface HeroSlide {
  src: string;
  /** Brief headline ≤5 words */
  headline: string;
  /** One-line subtext, 60–90 chars */
  subtext: string;
  alt: string;
  /** width × height of the source file (for next/image) */
  width: number;
  height: number;
}

export const heroSlides: HeroSlide[] = [
  {
    // LCP slide — must have priority
    src: '/images/main background/c10fb8c7cdf77827d2c4281fe9c2e6b3.jpg',
    headline: 'A Quiet Sanctuary.',
    subtext:
      'Steps from Jodhpur's Clock Tower, where Marwari warmth meets modern calm.',
    alt: 'Grand colonial atrium of Hotel Ratnawali — warm light, arched skylights and palm garden in the heart of Jodhpur',
    width: 1200,
    height: 675,
  },
  {
    src: '/images/main background/7e58462efe97ce3ad1fc9f1b25c263fd.jpg',
    headline: 'Where Heritage Lives.',
    subtext:
      'Carved arches, brass light and a century of Rajasthani craftsmanship.',
    alt: 'Ornate heritage lobby at Hotel Ratnawali — carved arches, golden chandelier and polished marble floors',
    width: 1000,
    height: 562,
  },
  {
    src: '/images/main background/5184107c0156dca2a9f12c8292b7b2fb.jpg',
    headline: 'Sleep Inside a Story.',
    subtext: 'Every corner of Ratnawali holds a detail worth discovering.',
    alt: 'Heritage grand lobby of Hotel Ratnawali — carved teak ceiling, peacock motif installation and traditional seating',
    width: 1199,
    height: 763,
  },
  {
    src: '/images/rooms/0c94c49a315ab4ca82ca4b74866c0b37.jpg',
    headline: 'Above the Blue City.',
    subtext:
      'The Royal Suite — panoramic views, handcrafted interiors, absolute stillness.',
    alt: 'Ratnawali Royal Suite — carved statement wall art, king bed and panoramic city view by night',
    width: 1200,
    height: 800,
  },
  {
    src: '/images/rooms/d0b66b70faaf8967fe5b9bcdb7e683ae.jpg',
    headline: 'Your Night, Reimagined.',
    subtext: 'Candlelight, antique fixtures and a bed you will not want to leave.',
    alt: 'Candlelit canopy suite at Hotel Ratnawali — chandelier, ornate mirror and warm ambient light over a king bed',
    width: 1200,
    height: 800,
  },
];

// ─── OG / Metadata image ──────────────────────────────────────────────────────
// 1200×675 is the closest available to the ideal 1200×630 OG ratio.
export const ogImage = {
  url: '/images/main background/c10fb8c7cdf77827d2c4281fe9c2e6b3.jpg',
  width: 1200,
  height: 630, // cropped by social crawlers — actual file is 675 px tall, that's fine
  alt: 'Hotel Ratnawali Jodhpur — heritage boutique hotel grand atrium interior',
};

// ─── Room galleries ───────────────────────────────────────────────────────────

export interface RoomImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const roomGalleries: Record<string, RoomImage[]> = {
  deluxe: [
    {
      src: '/images/rooms/83a8a5872be29fee2f48b4bf5c64c6a7.jpg',
      alt: 'Deluxe Room at Hotel Ratnawali — king bed, sheer curtains and daylight city view',
      width: 1000,
      height: 666,
    },
    {
      src: '/images/rooms/c9416fbe1b7fd0d25dc132cc28f758a9.jpg',
      alt: 'Deluxe Room twin configuration at Hotel Ratnawali — warm olive tones and city panorama',
      width: 1200,
      height: 800,
    },
  ],
  'super-deluxe': [
    {
      src: '/images/rooms/7b9232aad71818591405fb25b47d639c.jpg',
      alt: 'Super Deluxe Room at Hotel Ratnawali — crystal chandelier, canopy king bed and floral Rajasthani rug',
      width: 735,
      height: 490,
    },
    {
      src: '/images/rooms/a38c11d9dd42ccfa96b4121fd62a4fde.jpg',
      alt: 'Super Deluxe suite at Hotel Ratnawali — moody ambient light and floor-to-ceiling city views',
      width: 750,
      height: 500,
    },
  ],
  'ratnawali-royal-suite': [
    {
      src: '/images/rooms/0c94c49a315ab4ca82ca4b74866c0b37.jpg',
      alt: 'Ratnawali Royal Suite — carved butterfly wall relief, king bed and glowing city view by night',
      width: 1200,
      height: 800,
    },
    {
      src: '/images/rooms/d0b66b70faaf8967fe5b9bcdb7e683ae.jpg',
      alt: 'Ratnawali Royal Suite — candlelit canopy, ornate chandelier and heritage staircase living area',
      width: 1200,
      height: 800,
    },
  ],
};

// ─── About page gallery ───────────────────────────────────────────────────────

export const aboutGallery = [
  {
    src: '/images/main background/7e58462efe97ce3ad1fc9f1b25c263fd.jpg',
    alt: 'Ornate heritage lobby at Hotel Ratnawali — carved arches, golden chandelier and marble floors',
    width: 1000,
    height: 562,
  },
  {
    src: '/images/amenities/84835143858978e59a50c2f4920b21fd.jpg',
    alt: 'Illuminated swimming pool at Hotel Ratnawali at dusk — colonial pavilion reflected in still water',
    width: 1000,
    height: 657,
  },
  {
    src: '/images/main background/5184107c0156dca2a9f12c8292b7b2fb.jpg',
    alt: 'Heritage grand lobby of Hotel Ratnawali — carved teak ceiling, peacock motif and traditional seating',
    width: 1199,
    height: 763,
  },
  {
    src: '/images/amenities/e8a493c2104cd4b5c4af74ea7a87ec52.jpg',
    alt: 'Curated welcome tray at Hotel Ratnawali — fresh flowers, infused water and hand-folded towels',
    width: 616,
    height: 924,
  },
];

// ─── Contact page location image ──────────────────────────────────────────────

export const contactLocationImage = {
  src: '/images/amenities/7b94aef7136b22d2304d8dcfe5866819.jpg',
  alt: 'A Hotel Ratnawali attendant preparing a traditional wellness tray — the quiet care behind every stay',
  width: 1199,
  height: 1799,
};

// ─── Home feature section image ───────────────────────────────────────────────

export const homeFeatureImage = {
  src: '/images/amenities/7b94aef7136b22d2304d8dcfe5866819.jpg',
  alt: 'Hotel Ratnawali's attentive service — artful hospitality rooted in Marwari tradition',
  width: 1199,
  height: 1799,
};

// ─── Rooms page OG image ──────────────────────────────────────────────────────

export const roomsPageOgImage = {
  url: '/images/rooms/83a8a5872be29fee2f48b4bf5c64c6a7.jpg',
  width: 1200,
  height: 630,
  alt: 'Hotel Ratnawali Jodhpur — premium room accommodations',
};
