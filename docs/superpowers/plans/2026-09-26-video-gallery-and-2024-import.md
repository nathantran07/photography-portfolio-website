# Video gallery and Cars 'N Copters 2024 implementation plan

**Goal:** Make the 28 uploaded 2025 videos playable beside the existing photos and replace collection 03 with Nathan's Cars 'N Copters 2024 photographs.

**Architecture:** Retain `Shoot.photos` and photo-based covers. Add optional `Shoot.videos`; a video record uses the same thumbnail fields as `Photo`, with `videoSrc`, duration, and a required caption. `getGalleryItems` combines photos and videos for the existing proportional layout. Use native HTML video controls inside the existing dialog, with no autoplay or gallery video downloads. Stop playback on close or navigation. Originals remain in the ignored intake directory.

**Tech Stack:** Existing Next.js/React/TypeScript/Sharp; installed FFmpeg/ffprobe for offline conversion; existing temporary Pillow HEIC tooling for the 2024 stills. No app dependency or automated test suite added.

**Approval:** Nathan approved the three-phase video plan and added the 2024 import on 2026-09-26. Execute locally on the current feature branch; preserve prior work and do not deploy or commit.

## 1. Prepare assets before publishing content
- [x] Probe every video; export H.264/AAC fast-start MP4 with preserved audio, corrected orientation, no GPS tags, and dimensions within 1920x1080 (1080x1920 portrait). Generate JPEG posters and a source/hash manifest using `scripts/prepare-videos.ts`; keep manifests under ignored `artifacts/`.
- [x] Inspect all 2024 images in contact sheets; prefer edited versions of repeated frames and reuse the selected cover once. Convert ICC-tagged sources to sRGB, max 3200px without enlargement, JPEG quality 95. Record each source hash, caption evidence, and export mapping in `docs/photo-imports/cars-n-copters-2024.md`.

## 2. Integrate native playback and content
- [x] Extend `content/portfolio.ts` with `Video`, `isVideo`, `getGalleryItems`, and `gallerySummary`; add all video records and the 2024 shoot. Keep photo cover references and existing photo-only pages valid.
- [x] Update `components/gallery.tsx`, `components/icons.tsx`, and `app/globals.css`: poster/play/duration cards, a contained native player, visible playback error, existing return focus and Escape behavior, no gallery-arrow interception while video controls have focus, and no swipe navigation over the video controls.
- [x] Update `app/work/[slug]/page.tsx` to use combined items and accurate photo/video labels; retain the existing anchor for link compatibility. Update preview generation to include posters.
- [x] Extend `lib/content-validation.ts` to reject malformed video records, duplicate cross-media IDs, missing/empty MP4s, invalid durations, invalid poster dimensions, and unsafe asset paths. Keep all existing photo validation.

## 3. Verify and document
- [x] Run `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`. Content checks must pass with every source present; manually verify missing video and invalid duration rejection without leaving invalid data on disk.
- [x] Inspect exported codecs, dimensions, duration/audio preservation, source hashes, and MP4 fast-start layout. Check HTTP 200 and seek range responses; no file may exceed GitHub's 100 MiB file limit.
- [x] Manually check 375/768/1440 layouts; poster rendering, loading only on demand, play/pause, seek, volume/fullscreen availability, stop-on-next/close, Escape/focus restoration, one-item navigation logic, photo-only pages, and 2024 cover/gallery/OG output. Record unavailable cross-browser checks honestly.
- [x] Update README import instructions and `docs/HANDOFF.md`. Leave the working local preview running; production deployment remains separate.

## Verification limits
Native OS fullscreen activation, Safari/Firefox and real-device playback remain unverified; Edge desktop and emulated phone playback passed. Synchronized speech captions require a launch review. No production deployment or commits were performed. Single-item navigation was checked in source; photo-only regression was exercised on the 2024 collection.
