---
name: taste
description: Enforces high design taste and modern front-end craftsmanship. Prevents generic, bland AI aesthetics by applying strict layout, typography, palette, micro-interaction, and spatial discipline.
---

# Taste: Frontend Craft & Aesthetics Guide

Avoid generic AI layouts ("Bootstrap/Purple Tailwind default syndrome"). Treat UI engineering with the craft of an elite product designer.

---

## 1. Typography & Hierarchy
- **Intentional Font Pairing:** Pair an expressive, distinctive heading font with a neutral, hyper-legible body face (e.g., Geist, Inter, Plus Jakarta Sans).
- **Scale Discipline:** Use a strict typographic scale with distinct line-height adjustments. Avoid using intermediate sizes that dilute hierarchy.
- **Tracking & Weight:** Slightly tighten tracking on oversized headlines (`letter-spacing: -0.02em` to `-0.04em`). Keep body copy readable with generous line height (`leading-relaxed` / `1.5` - `1.6`).
- **Muted Contrast:** Never use pure `#000000` text on pure `#ffffff`. Use nuanced slate, zinc, or warm-tinted dark grays (`#0f172a`, `#18181b`, `#111827`) to eliminate harsh contrast fatigue.

---

## 2. Color & Lighting
- **Restraint Over Vibrancy:** Limit your interface to 1 intentional primary brand hue, with 90% of the surface dedicated to refined neutral grays, warm stones, or clean darks.
- **Dynamic Depth:** Prefer subtle borders (`border border-zinc-200 dark:border-zinc-800`) over muddy box-shadows.
- **Multi-layered Shadows:** If using shadows, layer two subtle elevations (an ambient spread + a direct directional contact shadow) instead of a single heavy blur.
- **Glass & Surface Treatments:** Keep blurs and backdrop filters subtle (`backdrop-blur-md` with semi-opaque backgrounds) rather than high-contrast overlays.

---

## 3. Spatial Layout & Density
- **Intentional Whitespace:** Give hero sections, headers, and dashboard widgets breathing room. Double your margins before deciding you need a divider line.
- **Alignment Consistency:** Lock components strictly into an underlying grid (4px / 8px rhythm). Never eyeball alignments or mix inconsistent padding rules.
- **Information Density:** For data tables or analytics panels, prioritize scannability: right-align numbers, left-align text, and use monospaced fonts (`font-mono`) for tabular data and values.

---

## 4. Micro-Interactions & States
- **Smooth State Transitions:** Always style `:hover`, `:focus-visible`, and `:active` states. Transitions should be snappy (`150ms` - `200ms` with `ease-out` curves).
- **Accessible Focus Indicators:** Never remove focus rings without replacing them with sharp, visible offset focus rings (`ring-2 ring-offset-2`).
- **Skeleton States:** Use subtle shimmer skeletons matching the actual layout dimensions instead of jarring full-screen spinners during async loads.

---

## 5. What to Reject (Anti-Patterns)
- **No Neon Gradients:** Avoid cliché violet-to-pink gradient text unless explicitly requested for marketing headers.
- **No Decorative Cards Without Purpose:** Do not wrap every isolated text block in a rounded card with a drop shadow.
- **No Cluttered Hero Sections:** Avoid dumping 4 call-to-action buttons together. Keep 1 primary action and at most 1 secondary ghost button.
