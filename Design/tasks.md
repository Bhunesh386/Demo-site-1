# MASTER PROMPT: Hotel Ratnawali (Pivot to Multi-Page Slate/Emerald)

## 0. OVERVIEW
- **Architecture**: Multi-page routing (Next.js App Router).
- **Design Language**: Deep Slate text, Emerald/Royal Blue accents, Soft Off-white backgrounds. Premium typography (Inter / Playfair Display). Modern CSS Grid/Flexbox with asymmetric balance.
- **Animations**: Framer Motion for smooth sliding page transitions and micro-interactions (hover slides, lifts, staggered fade-ins).
- **Imagery**: Crisp stock photography (Unsplash) with CSS overlays/blend modes.

## 1. ROADMAP

### Phase 1: Foundation & Transitions
- [x] **T-001**: Clean existing UI, setup new design tokens (Deep Slate, Emerald, Off-white) in Tailwind, and install Framer Motion.
  - *Acceptance Criteria*: Tokens apply globally, `framer-motion` installed. Old Jodhpur theme removed.
  - *Skills*: `taste`, `ponytail`, `git-hygiene`
  - *Commit*: `chore(setup): pivot design tokens and install framer-motion [T-001]`
- [x] **T-002**: Global layout, Navigation, and Page Transition Wrapper.
  - *Acceptance Criteria*: Multi-page navigation (Home, About, Rooms, Contact). `AnimatePresence` setup for smooth sliding transitions between routes.
  - *Skills*: `taste`, `perf-audit`, `git-hygiene`
  - *Commit*: `feat(ui): build layout shell and sliding transitions [T-002]`

### Phase 2: Core Pages
- [x] **T-003**: Build Home Page.
  - *Acceptance Criteria*: Striking hero, feature highlights, primary CTA, architectural/lifestyle Unsplash images with subtle overlays.
  - *Skills*: `taste`, `ponytail`, `git-hygiene`
  - *Commit*: `feat(ui): implement modern home page [T-003]`
- [x] **T-004**: Build About Page.
  - *Acceptance Criteria*: Mission, leadership grid, hospitality imagery. Staggered fade-ins on load.
  - *Skills*: `taste`, `ponytail`, `git-hygiene`
  - *Commit*: `feat(ui): implement about page [T-004]`
- [x] **T-005**: Build Rooms & Services Page.
  - *Acceptance Criteria*: Interactive cards with hover lifts. Abstract premium patterns.
  - *Skills*: `taste`, `ponytail`, `git-hygiene`
  - *Commit*: `feat(ui): implement rooms and services page [T-005]`
- [x] **T-006**: Build Contact Page.
  - *Acceptance Criteria*: Functional form with validation. Map placeholder.
  - *Skills*: `sec-hardening`, `test-first`, `git-hygiene`
  - *Commit*: `feat(ui): implement contact page and validated form [T-006]`

## 2. SKILL EVIDENCE LOG
| Task | Skill | What it changed or verified |
|------|-------|-----------------------------|
| T-001 | `taste`, `git-hygiene` | Adjusted tokens to Deep Slate and Emerald palette. |
| T-002 | `taste`, `perf-audit`, `git-hygiene` | Developed responsive shell navigation and `framer-motion` template transitions. |
| T-003 | `taste`, `ponytail` | Implemented modern Home page with Unsplash assets and `framer-motion` overlays. |
| T-004 | `taste`, `ponytail` | Developed About page with staggered leadership grid and hospitality imagery. |
| T-005 | `taste`, `ponytail` | Built Rooms index with alternating grid, interactive hover lifts, and fluid layout. |
| T-006 | `taste`, `sec-hardening` | Added validated Contact form with simulated state feedback and map placeholders. |

### Phase 3: Final Visual Polish & Dynamics
- [x] **T-007**: Advanced Animations, Galleries, & Nav Dynamics.
  - *Acceptance Criteria*: Masonry photo galleries on Rooms/About. Framer Motion staggers, hover scale zooms, pulsing badges, and sliding nav underlines implemented.
  - *Skills*: `taste`, `perf-audit`, `git-hygiene`
  - *Commit*: `feat(ui): implement advanced animations and masonry galleries [T-007]`
- [x] **T-008**: Image Upgrades, Deep Shadows, & Glow Effects.
  - *Acceptance Criteria*: New local assets mapped to Hero/Rooms/Amenities. Gradient fades overlay hero images. Glowing emerald accents on CTAs and tactile shadows on cards.
  - *Skills*: `taste`, `ponytail`, `git-hygiene`
  - *Commit*: `feat(ui): upgrade image assets and add glowing tactile effects [T-008]`
| T-007 | \`taste\`, \`perf-audit\` | Built dynamic Favicon, active sliding Nav underlines, and masonry \`framer-motion\` gallery. |
| T-008 | \`taste\`, \`ponytail\` | Restyled image cards with 3D tactile lifts, scale zooms, and deep gradient mask overlays. |

### Phase 4: Quiet Luxury Refinement
- [x] **T-009**: Refined Quiet Luxury Palette & Branding.
  - *Acceptance Criteria*: Transition theme to Warm Alabaster, Soft Charcoal/Obsidian, and Muted Champagne. Global replace of old Emerald/Slate tokens.
  - *Skills*: `taste`, `git-hygiene`
  - *Commit*: `style: shift to quiet luxury color palette [T-009]`
- [x] **T-010**: Cinematic Transitions, Parallax, & Unblur Reveals.
  - *Acceptance Criteria*: Scroll-based parallax on heroes. Images unblur and scale down on scroll entry. Route templates updated to minimal elegant slide-ups. Champagne border hover states.
  - *Skills*: `taste`, `perf-audit`, `ponytail`, `git-hygiene`
  - *Commit*: `feat(ui): implement parallax, unblur reveals, and route slide-ups [T-010]`
| T-009 | `taste`, `git-hygiene` | Transitioned global theme variables to Quiet Luxury (Alabaster, Obsidian, Champagne). |
| T-010 | `taste`, `perf-audit`, `ponytail` | Implemented Framer Motion parallax, scroll unblur image reveals, and sliding route transitions. |

### Phase 5: Technical SEO & Core Web Vitals Sprint
- [x] **T-011**: Crawl Architecture — Sitemap, robots.txt, canonical tags, and metadata.
  - *Acceptance Criteria*: Complete `sitemap.ts` covers all routes (home, about, rooms, contact, room slugs). `robots.ts` (code-based) is authoritative. Every page exports `generateMetadata` with canonical, title, description, and OG tags. Layout-level `metadataBase` set to production URL.
  - *Skills*: `ponytail`, `git-hygiene`
  - *Commit*: `seo: crawl architecture — sitemap, robots, canonical, and metadata [T-011]`
- [x] **T-012**: On-Page SEO — H1 hierarchy, JSON-LD structured data, breadcrumbs, alt text, and E-E-A-T.
  - *Acceptance Criteria*: Single `<h1>` per page. Hotel `Organization` + `LodgingBusiness` JSON-LD on home. `Hotel` + `HotelRoom` JSON-LD on room pages. `FAQPage` JSON-LD on rooms index & contact. Breadcrumb nav on inner pages. Descriptive `alt` on every image. E-E-A-T author bios added to About page with real titles and a brief bio paragraph.
  - *Skills*: `ponytail`, `git-hygiene`
  - *Commit*: `seo: on-page — JSON-LD schema, breadcrumbs, alt text, E-E-A-T bios [T-012]`
- [x] **T-013**: Core Web Vitals — LCP, CLS, rendering strategy.
  - *Acceptance Criteria*: All public pages are SSG or Server Components (no unnecessary `use client` on page shells). Hero images use `priority` + explicit `sizes`. All `fill` images are in explicitly-sized containers. `<Image>` used site-wide (zero raw `<img>` tags). Rooms detail page is a true RSC with `generateStaticParams`.
  - *Skills*: `perf-audit`, `ponytail`, `git-hygiene`
  - *Commit*: `perf: core web vitals — SSG rendering, image priority, CLS fixes [T-013]`

## 3. SEO SKILL EVIDENCE LOG
| Task | Skill | What it changed or verified |
|------|-------|------------------------------|
| T-011 | `ponytail`, `git-hygiene` | Extended sitemap to all routes; converted robots to code-based; added metadataBase + per-page canonical/OG metadata. |
| T-012 | `ponytail`, `git-hygiene` | Injected JSON-LD (Organization, LodgingBusiness, HotelRoom, FAQPage); breadcrumb nav; descriptive alt text; E-E-A-T bios. |
| T-013 | `perf-audit`, `ponytail`, `git-hygiene` | Converted page shells to RSC where possible; enforced priority on LCP images; verified no raw img tags. |

### Phase 6: Post-Audit SEO Refinements
- [x] **T-014**: Content & Headings — Expand title tags, increase text content on sparse pages, and restructure with semantic H2/H3 tags and keywords.
  - *Acceptance Criteria*: Titles are longer and more descriptive. Home/About pages have more detailed hotel descriptions. Semantic H2/H3 used for sections. Clean internal URLs verified.
  - *Skills*: `ponytail`, `git-hygiene`
  - *Commit*: `seo: expand content, titles, and semantic headers [T-014]`
- [x] **T-015**: Local SEO & Tracking — Footer address/phone, Facebook link, GA & FB Pixel scripts.
  - *Acceptance Criteria*: Footer contains NAP (Name, Address, Phone) and FB link. Root layout includes Google Analytics and FB Pixel placeholder scripts (deferred). Verify Identity/LocalBusiness schema has phone/address.
  - *Skills*: `ponytail`, `git-hygiene`
  - *Commit*: `seo: add footer NAP, social links, and tracking scripts [T-015]`
- [x] **T-016**: Code Cleanliness & DNS Guide — Remove inline styles, create DNS guide.
  - *Acceptance Criteria*: All components scanned for inline `style={{}}` and replaced with Tailwind. `DNS-Mail-Records-Guide.md` created in root for SPF/DMARC.
  - *Skills*: `ponytail`, `perf-audit`, `git-hygiene`
  - *Commit*: `refactor: replace inline styles and add DNS guide [T-016]`
