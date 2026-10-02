# Plan: Images + Animations — Hotel Ratnawali
**Status: AWAITING APPROVAL — do not begin Phase 2 until owner says "approved"**

---

## Phase 0 Summary — Discovery Findings

### Public folder inventory

| Path | Type | Age |
|------|------|-----|
| `public/images/hero-main.jpg` | OLD (740×506, 53 KB) | Original |
| `public/images/hero-secondary.jpg` | OLD (741×414, 103 KB) | Original |
| `public/images/room-standard.jpg` | OLD (259×195, 8 KB — tiny!) | Original |
| `public/images/room-deluxe.jpg` | OLD (678×452, 34 KB) | Original |
| `public/images/room-family.jpg` | OLD (750×409, 57 KB) | Original |
| `public/images/room-suite.jpg` | OLD (612×459, 51 KB) | Original (unused in code) |
| `public/images/amenity-spa.jpg` | OLD (640×427, 84 KB) | Original |
| `public/images/amenity-dining.jpg` | OLD (1001×667, 96 KB) | Original |
| `public/images/amenity-lounge.jpg` | OLD (1600×1067, 131 KB) | Original |
| `public/images/amenity-pool.jpg` | OLD (596×335, 54 KB) | Original |
| `public/images/about-team.jpg` | OLD (477×280, 31 KB) | Original |
| `public/images/main background/5184107c….jpg` | **NEW** (1199×763, 190 KB) | Heritage lobby with carved wood and peacock motif |
| `public/images/main background/7e58462e….jpg` | **NEW** (1000×562, 128 KB) | Grand ornate lobby with golden chandelier/arch |
| `public/images/main background/c10fb8c7….jpg` | **NEW** (1200×675, 239 KB) | Bright colonial atrium lobby with palms |
| `public/images/rooms/0c94c49a….jpg` | **NEW** (1200×800, 127 KB) | Royal Suite — dramatic king bed, carved wall art, city view at night |
| `public/images/rooms/7b9232aa….jpg` | **NEW** (735×490, 66 KB) | Super Deluxe — chandelier, canopy bed, rich Rajasthani textiles |
| `public/images/rooms/83a8a587….jpg` | **NEW** (1000×666, 72 KB) | Deluxe — clean modern room, king bed, sheer curtains, city view |
| `public/images/rooms/a38c11d9….jpg` | **NEW** (750×500, 54 KB) | Super Deluxe alt — moody suite, panoramic floor-to-ceiling night view |
| `public/images/rooms/c9416fbe….jpg` | **NEW** (1200×800, 91 KB) | Deluxe alt — twin beds, warm tones, river/skyline view |
| `public/images/rooms/d0b66b70….jpg` | **NEW** (1200×800, 125 KB) | Royal Suite alt — candlelit suite with canopy, chandelier, staircase |
| `public/images/amenities/84835143….jpg` | **NEW** (1000×657, 74 KB) | Pool — illuminated pool at dusk, colonial pavilion |
| `public/images/amenities/7b94aef7….jpg` | **NEW** (1199×1799, 113 KB — portrait 2:3!) | Spa/service — therapist setting towels and candles |
| `public/images/amenities/6426a54b….jpg` | **NEW** (1200×1450, 217 KB — portrait 4:5!) | Hospitality supplies — NOT suitable for display (branded AGH Supply) |
| `public/images/amenities/e8a493c2….jpg` | **NEW** (616×924, 58 KB — portrait 2:3) | Room service welcome tray — towels, infused water, flowers |

> **⚠️ FLAGS:**
> - `6426a54b….jpg` (amenities): shows "AGH Hospitality Supplies" branded commercial content; **do not display this image on the site**. Exclude from mapping.
> - `7b94aef7….jpg` (amenities, 1199×1799): portrait ratio — fine for vertical card slots, must use `object-cover` in fixed-height containers.
> - `e8a493c2….jpg` (amenities, 616×924): portrait ratio — same constraint.
> - `c10fb8c7….jpg` (main background, 239 KB): largest new file but under the 500 KB threshold.
> - `hero-main.jpg` (old): `identify` reports 740×506 but PIL could not open it (possibly corrupt JPEG). Safe to replace.
> - `room-standard.jpg` (old): only 259×195 — negligibly small, never appropriate for hero use.

---

## Section A — Image Mapping Table

| Old image | New image | Where used | New alt text |
|-----------|-----------|------------|--------------|
| `hero-main.jpg` | Hero slide 1: `main background/c10fb8c7….jpg` | `HomeClient.tsx` hero, `layout.tsx` OG, `page.tsx` OG, `HomeClient` JSON-LD logo/image | "Grand colonial atrium of Hotel Ratnawali — warm light, arched skylights and palm garden in the heart of Jodhpur" |
| `hero-main.jpg` (OG meta only) | `main background/c10fb8c7….jpg` (1200×675 ✓ fits OG) | `layout.tsx`, `page.tsx`, `HomeClient` JSON-LD | (see OG alt above) |
| `hero-secondary.jpg` (About gallery slot 0) | `main background/7e58462e….jpg` | `AboutClient.tsx` gallery[0] | "Ornate heritage lobby at Hotel Ratnawali — carved arches, golden chandelier and marble floors" |
| `amenity-pool.jpg` (About gallery slot 1) | `amenities/84835143….jpg` | `AboutClient.tsx` gallery[1] | "Illuminated swimming pool at Hotel Ratnawali at dusk — colonial pavilion reflected in still water" |
| `amenity-lounge.jpg` (About gallery slot 2) | `main background/5184107c….jpg` | `AboutClient.tsx` gallery[2] | "Heritage grand lobby of Hotel Ratnawali — carved teak ceiling, peacock motif and traditional seating" |
| `amenity-dining.jpg` (About gallery slot 3) | `amenities/e8a493c2….jpg` | `AboutClient.tsx` gallery[3] | "Curated welcome tray at Hotel Ratnawali — fresh flowers, infused water and hand-folded towels" |
| `amenity-spa.jpg` (Contact map placeholder) | `amenities/7b94aef7….jpg` | `ContactClient.tsx` location image | "A Hotel Ratnawali attendant preparing a traditional wellness tray — the quiet care behind every stay" |
| `amenity-spa.jpg` (Home feature image) | `amenities/7b94aef7….jpg` | `HomeClient.tsx` feature section | "Hotel Ratnawali's attentive spa and wellness service — artful hospitality rooted in Marwari tradition" |
| `room-standard.jpg` → **Deluxe** (WRONG) | `rooms/83a8a587….jpg` | `RoomsClient.tsx`, `[slug]/page.tsx` deluxe | "Deluxe Room at Hotel Ratnawali — king bed, sheer curtains and daylight city view" |
| `room-deluxe.jpg` → **Super Deluxe** (WRONG) | `rooms/7b9232aa….jpg` | `RoomsClient.tsx`, `[slug]/page.tsx` super-deluxe | "Super Deluxe Room at Hotel Ratnawali — chandelier, canopy king bed and rich Rajasthani textiles" |
| `room-family.jpg` → **Royal Suite** (WRONG) | `rooms/0c94c49a….jpg` | `RoomsClient.tsx`, `[slug]/page.tsx` royal-suite | "Ratnawali Royal Suite — carved statement wall, king bed and panoramic city view by night" |
| `about-team.jpg` (team photos) | `about-team.jpg` *(unchanged — no new portrait photos uploaded)* | `AboutClient.tsx` leadership | No change |
| `rooms/page.tsx` OG (`room-deluxe.jpg`) | `rooms/83a8a587….jpg` | `rooms/page.tsx` OG image | "Hotel Ratnawali room — premium Jodhpur accommodation" |

**OG image note:** `c10fb8c7….jpg` is 1200×675 — the closest to the ideal 1200×630 OG ratio. All hero OG images will point to this file (path: `/images/main background/c10fb8c7cdf77827d2c4281fe9c2e6b3.jpg`). Since the filename has a space, we'll URL-encode it in meta tags; `next/image` handles it automatically via `src` prop.

---

## Section B — Hero Slideshow (5 slides)

The three `main background/` images plus two strong room images form 5 distinct moods for the hero.

| Slide | Image file | Headline (≤5 words) | Subtext (one line) |
|-------|-----------|---------------------|-------------------|
| 1 (LCP) | `main background/c10fb8c7….jpg` (bright colonial atrium, 1200×675) | "A Quiet Sanctuary." | *Steps from Jodhpur's Clock Tower, where Marwari warmth meets modern calm.* |
| 2 | `main background/7e58462e….jpg` (grand ornate golden lobby, 1000×562) | "Where Heritage Lives." | *Carved arches, brass light and a century of Rajasthani craftsmanship.* |
| 3 | `main background/5184107c….jpg` (carved teak lobby, peacock motif, 1199×763) | "Sleep Inside a Story." | *Every corner of Ratnawali holds a detail worth discovering.* |
| 4 | `rooms/0c94c49a….jpg` (royal suite, night city view, 1200×800) | "Above the Blue City." | *The Royal Suite — panoramic views, handcrafted interiors, absolute stillness.* |
| 5 | `rooms/d0b66b70….jpg` (candlelit canopy suite, 1200×800) | "Your Night, Reimagined." | *Candlelight, antique fixtures and a bed you will not want to leave.* |

**Preloading strategy:**
- Slide 1: `priority` (impacts LCP). Size: 1200×675 — good.
- Slide 2: preloaded via `<link rel="preload">` injected after first paint.
- Slides 3–5: lazy (loaded on demand as slideshow advances).

---

## Section C — Room Galleries (per room, 3–5 images each)

**Deluxe Room** (slug: `deluxe`)
| # | File | Alt |
|---|------|-----|
| 1 (hero) | `rooms/83a8a587….jpg` | "Deluxe Room king bed with sheer curtains and daylight view" |
| 2 | `rooms/c9416fbe….jpg` | "Deluxe Room twin configuration with warm olive tones and city panorama" |

**Super Deluxe Room** (slug: `super-deluxe`)
| # | File | Alt |
|---|------|-----|
| 1 (hero) | `rooms/7b9232aa….jpg` | "Super Deluxe Room — crystal chandelier, canopy king bed and floral Rajasthani rug" |
| 2 | `rooms/a38c11d9….jpg` | "Super Deluxe suite at night — moody ambient light and floor-to-ceiling city views" |

**Ratnawali Royal Suite** (slug: `ratnawali-royal-suite`)
| # | File | Alt |
|---|------|-----|
| 1 (hero) | `rooms/0c94c49a….jpg` | "Royal Suite — carved butterfly wall relief, king bed and glowing city by night" |
| 2 | `rooms/d0b66b70….jpg` | "Royal Suite — candlelit canopy, ornate chandelier, heritage staircase living area" |

---

## Section D — Animation Inventory

### D1 — Hero Slideshow (new `HeroSlideshow.tsx`)
- **Mechanism:** Pure CSS + React state. `opacity` crossfade, no third-party library additions.
- **Ken Burns:** `transform: scale(1)` → `scale(1.06)` on `.active` slide over the slide duration via a CSS `@keyframes kenBurns`. Only `transform` and `opacity` mutated.
- **Timing:** 6 s auto-advance, 1.2 s crossfade.
- **Text animation:** `opacity` + `translateY(16px → 0)` per slide, 200 ms stagger between headline and subtext. Framer Motion `AnimatePresence` can handle this since it's already installed.
- **Controls:** 5 clickable progress-bar dots (thin, champagne). Prev/Next chevron buttons on desktop (hidden on mobile). Touch swipe via `touchstart`/`touchend` delta.
- **Pause:** `document.visibilitychange`, `mouseenter`/`focus` pause, `mouseleave`/`blur` resume.
- **Reduced-motion:** `@media (prefers-reduced-motion: reduce)` — disable Ken Burns, disable auto-advance, use `opacity`-only crossfade or immediate swap.
- **CTA:** The existing "Reserve Your Stay" link appears on every slide, below the slide-specific text.
- **No layout shift:** hero `<section>` has explicit `h-[70vh] md:h-[95vh]` — unchanged from current.

### D2 — Room Gallery Rotator (new `RoomGallery.tsx`)
- **Mechanism:** `IntersectionObserver` — rotation only starts when card enters viewport (50% threshold). Crossfade via `opacity` CSS transition (~5 s interval).
- **Detail pages:** Same component, plus visible dots + touch swipe.
- **No auto-start until visible:** prevents background network churn.

### D3 — Scroll-reveal (`ScrollReveal.tsx` / `useScrollReveal` hook)
- **Reusable wrapper:** `<ScrollReveal>` client component that wraps any child and applies `opacity: 0, translateY(20px)` → `opacity: 1, translateY(0)` once IntersectionObserver fires (threshold 0.1, `once: true`).
- **Duration:** 600 ms. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Where applied:** section headings, stat blocks, feature cards, footer sections. Not applied to elements already animated by Framer Motion `whileInView` (avoid double-animation).
- **Reduced-motion:** hook immediately marks element visible — no animation runs.

### D4 — Navbar (transparent-to-solid)
- Modify `Navigation.tsx` to listen to `window.scrollY`. When `scrollY > 60`, switch from `bg-transparent` to `bg-alabaster/90 backdrop-blur-xl shadow-sm`. Transition: `transition-all duration-300`.
- On home page the nav should start transparent (hero is full-bleed). On inner pages always solid (no hero behind).
- The hero `<section>` has `z-0`; nav is `z-50`. Navigation receives a `isHero` prop or detects route via `pathname === '/'`.

### D5 — Hover states (CSS/Tailwind, no JS)
- **Buttons:** already have hover states; standardise easing to `duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`.
- **Room cards:** `group-hover:scale-105` on inner image over `duration-700` — already present; verify consistent.
- **Nav links:** underline grow already implemented via `scale-x-0 → scale-x-100`.
- **Footer links:** add `hover:text-champagne transition-colors duration-300`.

### D6 — Page/route entry fade
- `src/app/template.tsx` already exists. Wrap with Framer Motion `motion.div` for a subtle `opacity: 0 → 1` over 400 ms. No translate needed to keep it subtle.

---

## Section E — Files to Create or Change

### New files
| File | Purpose |
|------|---------|
| `src/data/images.ts` | Single source of truth: hero slides, room galleries, about gallery, amenity images — all typed |
| `src/components/HeroSlideshow.tsx` | Client component: auto-rotating hero with Ken Burns, text fade, controls, swipe, pause |
| `src/components/RoomGallery.tsx` | Client component: per-room image rotator with IntersectionObserver |
| `src/components/ScrollReveal.tsx` | Client wrapper: one IntersectionObserver-based fade+rise reveal |
| `src/__tests__/heroSlideshow.test.ts` | Vitest: next/prev wrap-around, autoplay pause/resume, reduced-motion |
| `tests/hero-slideshow.spec.ts` | Playwright: slide advances, controls work, reduced-motion no-autoplay |

### Modified files
| File | What changes |
|------|-------------|
| `src/app/HomeClient.tsx` | Replace single Image with `<HeroSlideshow>`, update JSON-LD image URL, update feature section image src/alt |
| `src/app/page.tsx` | Update OG image URL to new hero image |
| `src/app/layout.tsx` | Update default OG image URL to new hero image |
| `src/app/rooms/RoomsClient.tsx` | Remove `roomImages` array (data moves to `images.ts`), add `<RoomGallery>` per card |
| `src/app/rooms/page.tsx` | Update OG image to Deluxe room new image |
| `src/app/rooms/[slug]/page.tsx` | Update `roomImageMap`, update metadata OG images, replace single `<Image>` with `<RoomGallery>` |
| `src/app/about/AboutClient.tsx` | Update `galleryImages` sources/alts to new images |
| `src/app/about/page.tsx` | Update OG image |
| `src/app/contact/ContactClient.tsx` | Update location placeholder image src/alt |
| `src/app/contact/page.tsx` | Update OG image |
| `src/components/Navigation.tsx` | Add scroll-aware transparent→solid navbar (home only), add `isHero`/pathname detection |
| `src/app/template.tsx` | Gentle `opacity` fade on route entry |
| `src/app/globals.css` | Add `@keyframes kenBurns`, any reusable CSS custom props for animations |

---

## Section F — Risks and Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **LCP regression** — hero slideshow loads 5 images at once | HIGH | Slide 1 gets `priority`. Slides 2–5 have `loading="lazy"`. Preload slide 2 only after `requestIdleCallback`. Use `sizes="100vw"` for slides, narrower for room cards. |
| **CLS from hero height change** | MEDIUM | Hero `<section>` keeps its existing `h-[70vh] md:h-[95vh]` class — container height never changes. No img `fill` without a sized parent. |
| **`amenity/6426a54b….jpg` shows brand logo** | HIGH | This image is completely excluded from the site. Not referenced anywhere. |
| **Space in folder name** `main background/` | MEDIUM | URL-encode in OG `url` strings (`main%20background/`). `next/image` `src` handles raw path with space fine (Next.js encodes internally). Test with `next build`. |
| **Portrait images (7b94ae…, e8a493…)** cropped oddly | MEDIUM | Both used in containers with `object-cover` and fixed height — cropping to landscape viewport is intentional and visually acceptable (focus is the subject center). |
| **Navbar transparent-on-home breaking inner pages** | LOW | Use `pathname === '/'` check inside Navigation; inner pages always start solid. |
| **Framer Motion v13 breaking changes** | LOW | The project already uses framer-motion v13. Only use existing APIs (`motion.div`, `AnimatePresence`, `useScroll`, `useTransform`). No new APIs introduced. |
| **`template.tsx` double-animation** | LOW | Route template provides only `opacity` fade. Individual page `initial/animate` stagger stays. They compose cleanly since template wraps the whole page. |
| **`[CONFIRM]` strings in rooms.ts** | INFO | Not in scope (SEO content). Noted; do not touch. |
| **Old images still present** | INFO | Old files left in place for rollback. Listed below as safe to delete after verification. |

---

## Section G — "Safe to Delete" After Verification

These files are replaced by new ones and are not referenced by any new code:

```
public/images/hero-main.jpg
public/images/hero-secondary.jpg
public/images/room-standard.jpg
public/images/room-deluxe.jpg
public/images/room-family.jpg
public/images/room-suite.jpg          (already unused in code)
public/images/amenity-spa.jpg
public/images/amenity-pool.jpg
public/images/amenity-lounge.jpg
public/images/amenity-dining.jpg
public/images/amenities/6426a54b8fce855cbbd669f2fc4f7419.jpg  (branded, never displayed)
```

`public/images/about-team.jpg` — **keep**. No replacement portrait photos were uploaded.

---

## Section H — Commit Sequence (Phase 2)

All work on branch `phase/images-and-motion`.

```
feat(data): add typed images.ts data file [T-IMG-A1]
feat(ui): add HeroSlideshow component with Ken Burns and per-slide text [T-IMG-B1]
feat(ui): wire HeroSlideshow into HomeClient, update JSON-LD image refs [T-IMG-B2]
feat(ui): add RoomGallery component with IntersectionObserver rotation [T-IMG-C1]
feat(ui): wire RoomGallery into rooms index and detail pages [T-IMG-C2]
fix(images): correct room image mapping (deluxe/super-deluxe/suite) [T-IMG-A2]
fix(images): update all OG/Twitter/metadata image references [T-IMG-A3]
fix(images): update About and Contact image sources and alt text [T-IMG-A4]
feat(ui): add ScrollReveal component for scroll-triggered fade+rise [T-IMG-D1]
feat(ui): transparent-to-solid navbar on home page scroll [T-IMG-D2]
feat(ui): gentle opacity fade on route entry in template.tsx [T-IMG-D3]
test(unit): add Vitest tests for HeroSlideshow logic [T-IMG-E1]
test(e2e): add Playwright tests for hero slideshow behaviour [T-IMG-E2]
```

---

*Awaiting "approved" from owner before writing any code.*
