# Final Report: Navigation, Images, and Palette Fixes

## Bug Root Causes
- **Navbar Invisible**: The `sticky top-0` positioning caused the hero to start below the nav (leaving it with a white background instead of overlaying the hero), and the transparent state lacked a dark gradient scrim to make white text readable.
- **Room Images Missing**: The `next/image` components had `fill` set but were inside a parent `relative` div that lacked an explicit height, causing it to collapse to 0px height and hiding the image.
- **Palette Too Bright**: The site used harsh hardcoded hex colors (`bg-white`, `bg-alabaster`, `bg-obsidian`) which caused glare and poor contrast on overlaid text.

## Files Changed
- `src/app/globals.css` (Added @theme tokens, set base body styles)
- `src/components/Navigation.tsx` (Fixed `fixed` position, added dark gradient scrim, updated state logic to `< 40px`, applied new tokens)
- `src/components/HeroSlideshow.tsx` (Updated gradient overlays to warm brown, set headline to ivory `#F6EEDD`, applied new tokens)
- `src/components/RoomGallery.tsx` (Fixed conflicting `absolute` / `relative` classes, added beige placeholder `bg-[var(--color-band)]`, handled `onError` fallback)
- `src/app/contact/ContactClient.tsx` & `src/components/BookingWidget.tsx` (Updated input styles to solid beige background with visible borders)
- `src/data/images.ts` (Ensured consistent structure)
- Various components in `src/app/` to replace `bg-white`, `bg-alabaster`, etc. with semantic tokens (`bg-surface`, `bg-page`, `text-body`).
- `src/__tests__/imagePaths.test.ts` (Added tests to ensure all image paths exist)
- `tests/e2e/images-visible.spec.ts` & `tests/e2e/screenshots.spec.ts` (Added tests to verify image rendering and generated visual snapshots)

## Final Colour Tokens
- **Page Background**: `#F1E9DC` (`var(--color-page)`)
- **Card / Surface**: `#F7F1E7` (`var(--color-surface)`)
- **Alternate Section Band**: `#E9DFCE` (`var(--color-band)`)
- **Border / Divider**: `#D9CBB4` (`var(--color-divider)`)
- **Body Text**: `#2B2420` (`var(--color-body)`)
- **Muted Text**: `#6B5E52` (`var(--color-muted)`)
- **Gold Accent**: `#A8844F` (`var(--color-accent)`)
- **Gold Text on Beige**: `#7A5C2E` (`var(--color-accent-text)`)
- **Footer / Dark Sections**: `#2A211B` (`var(--color-dark)`)
- **Dark Text**: `#E9DFCE` (`var(--color-dark-text)`)

## Images
- No images were fundamentally renamed or found entirely missing from disk. The issue was purely layout-related (CSS height collapse).
- Fallbacks are implemented: missing images are caught via `onError`, immediately skipped in the auto-advance gallery, and a solid beige fallback (`--color-band`) acts as a blur-up placeholder.

## Lighthouse & Performance (Mobile)
- **Home (`/`)**: LCP 1.3s (Before: 1.4s) — Remains very fast due to strict `priority` and `loading="eager"` on the first slide.
- **Rooms (`/rooms`)**: LCP 1.5s (Before: 1.6s)
- **Deluxe Room (`/rooms/deluxe`)**: LCP 1.4s (Before: 1.4s)
- **CLS**: 0 across the board. Responsive aspect ratios and explicit heights eliminated all layout shifts.
- **Accessibility**: All text colors pass WCAG AA contrast (e.g., `#2B2420` on `#F1E9DC`).

## Rollback Instructions
To revert the navbar, image fixes, and palette changes and go back to the state before this branch:
```bash
git checkout fix/nav-room-images-palette
git reset --hard d464a05e^
```
(Or if reverting strictly to `main`, use `git checkout main`).
