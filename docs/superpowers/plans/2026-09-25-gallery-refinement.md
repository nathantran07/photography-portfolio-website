# Gallery Refinement Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development for the independent content task and inline execution for the coupled gallery and layout work. Preserve existing uncommitted identity and intake-folder changes.

**Goal:** Apply the approved Pixieset-inspired collection experience while keeping Nathan Tran's homepage identity.

**Architecture:** Retain the App Router, typed local content, next/image wrapper, and native dialog. Use ordered, aspect-ratio-weighted gallery rows to avoid both cropping and CSS-column reading-order changes. No new dependencies or video fields.

**Tech Stack:** Existing Next.js, React, TypeScript, Tailwind/CSS, Sharp, npm.

## 1. Optional collection details
- [x] Extend `Shoot` in `content/portfolio.ts` with `date?: string` (ISO calendar date) and `location?: string`.
- [x] Extend `validateContent` in `lib/content-validation.ts`: supplied dates must be actual YYYY-MM-DD dates and supplied locations must be nonempty strings. Omitted fields remain valid. Leave example collections undated.
- [x] Document these fields in `README.md`; do not alter existing identity corrections.

## 2. Cover and gallery
- [x] Refine `ShootPage` in `app/work/[slug]/page.tsx`: large edge-to-edge-within-shell cover, inset border, legible overlaid title, optional details, jump link; supporting description beneath. Only cover crops; retain focal points and preload.
- [x] Refine `Gallery` in `components/gallery.tsx`: group sequential photos into balanced rows, use ratio-based widths, remove repeated visible captions and image zoom/cropping, retain accessible photo names. Single photo and unfinished last rows remain valid.
- [x] Add gallery-only rules in `app/globals.css`; preserve homepage rules and both themes. Stack photos on phones, keep display headings at least 20px, support reduced motion.
- [x] Calculate `sizes` from each photo's share of a row at existing shell breakpoints; lazy-load gallery images.

## 3. Enlarged viewer
- [x] Retain native modal focus containment/restoration, Escape, keyboard arrows, full-image containment, and single-photo control suppression.
- [x] Refine viewer layout and add horizontal single-finger swipe detection with a movement threshold; ignore vertical gestures and multitouch, retain browser pinch zoom. Reset pending gestures when cancelled/closed.

## 4. Verification and handoff
- [x] Run `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` (includes content validation and sharing assets).
- [x] Check browser layouts at 375, 768, 1440 in both themes; inspect image proportions, order, overflow, cover contrast, viewer keyboard/focus, single-photo behavior, and homepage regression.
- [x] Verify invalid date/location rejection, then restore data and pass the build. No automated test suite or Playwright setup.
- [x] Review code against the approved scope, document any checks that cannot be performed, and leave the local preview running. No push/deploy in this pass.
