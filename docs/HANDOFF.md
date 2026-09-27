# Claude handoff

## Homepage portrait previews - 2026-09-26

**TASK SUMMARY:** Implement the approved wide first collection followed by paired portrait previews for collections 2 and 3.

**FILES MODIFIED:** `app/page.tsx` line 29 (`Home`, responsive image sizes); `app/globals.css` lines 87-91 and 206 (project grid and mobile layout); `docs/HANDOFF.md` lines 3-13 (this entry).

**IMPLEMENTATION:** Reuse `PhotoFrame` with a full-width 16:9 first card and equal 3:4 subsequent cards. Stack cards below 760px; remove the staggered second card and wide third-card crop. Image sizes match existing shell widths and grid gaps. Keep cover records and shoot pages unchanged.

**VERIFICATION:** `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed. Manual Edge checks at 375, 768, and 1440px confirmed correct card proportions and no horizontal overflow; mobile titles remain 32px. Reviewed portrait crops, both themes, and third-card navigation. Restored normal viewport and dark theme after checks.

**OPEN ITEMS:** Local changes only; no commit or deployment. Nathan's final aesthetic review remains pending.

## Video playback and Cars 'N Copters 2024 - 2026-09-26

**TASK SUMMARY:** Add the 28 uploaded 2025 videos to the gallery and import collection 03 as Cars 'N Copters 2024.

**FILES MODIFIED:** `content/portfolio.ts` lines 15-47, 66, and 549-849 (video types/helpers, video records, 2024 photo records and shoots; removed unused placeholder generator); `components/gallery.tsx` lines 5-84 (`Gallery`); new `components/video-player.tsx` lines 1-23 (`VideoPlayer`); `components/icons.tsx` lines 17-19 (`PlayIcon`); `app/work/[slug]/page.tsx` lines 5, 31, and 38-47 (`ShootPage`); `app/globals.css` lines 173-180; `lib/content-validation.ts` lines 1, 98, and 108-139 (`validateContent`); `scripts/generate-image-previews.ts` lines 4-7; `scripts/validate-content.ts` line 9; new `scripts/prepare-videos.ts` lines 1-82; `package.json` lines 17-18; regenerated `content/image-previews.json` lines 2-122; `README.md` lines 3, 75-94, and 146; new `docs/photo-imports/cars-n-copters-2024.md` lines 1-49 and `docs/photo-imports/cars-n-copters-2025-videos.md` lines 1-46; plan `docs/superpowers/plans/2026-09-26-video-gallery-and-2024-import.md` lines 1-28; this section. Assets: 13 JPGs under `public/images/cars-n-copters-2024/`, 28 posters under `public/images/cars-n-copters-2025/video-posters/`, and 28 MP4s under `public/videos/cars-n-copters-2025/`. Generated/ignored OG JPEGs updated, including the new 2024 share image. Prior dirty work is preserved.

**IMPLEMENTATION:** Optional `Shoot.videos` extends the existing photo-based content structure; each video uses a poster compatible with `PhotoFrame` and `next/image`. Photos retain their order, followed by videos; a Jump to films link provides direct access. Native playback controls appear only in the viewer, with no autoplay or collection-page video downloads. One player is mounted at a time and paused on unmount; photo swipe gestures and gallery arrow handling do not intercept video controls. Native controls include seeking, volume, and fullscreen; a playback error offers retry. Existing photo covers and OG generation stay intact. The 2024 collection has 13 distinct photos dated October 13, 2024; its selected Pagani Huayra BC cover matches a gallery file and appears once. Captions distinguish alt text from visible descriptions, identify the badged Zonda AY, and avoid unconfirmed chassis/variant claims.

**VERIFICATION:** Final lint, typecheck, build/content validation and `git diff --check` passed: 3 shoots, 90 photos, 28 videos, 120 previews. All 28 video and 14 still-image source hashes are unchanged. Every MP4 was verified as oriented H.264 / 8-bit 4:2:0 / 30fps with preserved AAC audio, no location tags, and a fast-start index; all 28 range requests returned HTTP 206 / video/mp4. MP4 exports total 554.3 MiB, maximum 53.7 MiB per file. A short isolated encode verified the final staging/rename pipeline; its temporary public assets were removed. In-memory invalid-content checks rejected missing MP4s, duplicate media IDs, blank captions, invalid duration, and invalid poster width. Edge desktop and 375px playback, seeking/mute, single-player cleanup on next/close, poster containment, and restored opener focus passed. The 2024 cover/gallery/OG image and no horizontal overflow at 375/768/1440px were verified. No automated test suite was added.

**OPEN ITEMS:** Native fullscreen controls are present, but OS fullscreen activation was not confirmed by browser automation. Real-device Safari/Firefox playback and synchronized captions for meaningful spoken audio still need a public-launch review; audio is preserved, not transcribed. Single-item navigation remains conditionally hidden in source and was not separately exercised with a one-item fixture. Playback error/retry UI was inspected in source, not forced in the browser. Video derivatives are 1080p/30fps web copies, not full-resolution originals; import details and source maps are in the two import notes. Review video bandwidth/storage on a Vercel preview before deployment. No commits, push, account changes, or deployment performed. Leave the development preview on http://127.0.0.1:3000; both collection URLs are `/work/cars-n-copters-2025` and `/work/cars-n-copters-2024`.

## Cars 'N Copters import and loading review - 2026-09-26

**TASK SUMMARY:** Import collection 02 as Cars 'N Copters 2025, retain one edited version per repeated frame, correct the Revuelto identification, and investigate images stuck as blurred previews.

**FILES MODIFIED:** `content/portfolio.ts` lines 42, 188-544, and 554-557 (`site`, `carsNCoptersPhotos`, `shoots`); `content/image-previews.json` lines 2-60; `AGENTS.md` line 14; `docs/photo-imports/cars-n-copters-2025.md` lines 1-194; 59 new JPGs in `public/images/cars-n-copters-2025/`; generated/ignored `public/og/cars-n-copters-2025.jpg`; this section, lines 3-13. Earlier uncommitted work is preserved.

**IMPLEMENTATION:** Replaced the second placeholder collection with 59 photographs, October 12, 2025 / Huntington Beach metadata, separate enthusiast captions and visual alt text, and the selected Valkyrie cover. Nathan approved keeping edited JPGs instead of repeated HEIC frames; 74 gallery files plus the selected cover resolve to 59 displayed shots. `cnc-3299` is the user-confirmed Lamborghini Revuelto. Existing `PortfolioImage` / `next/image`, gallery layout, and OG generation patterns remain. Sources were color-converted to sRGB and exported at up to 3200px, JPEG quality 95; no application dependencies added. The import record includes all source mappings, hashes, caption sources, and uncertain identifications.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. Build validates 3 shoots / 83 gallery photographs and generates 85 previews. All 75 original still-image hashes remain unchanged. All 59 optimized AVIF requests at width 640 / quality 85 returned HTTP 200 after restarting the stalled dev process; the two reproducible 25-second timeouts then returned in 485-823ms without changing image quality or components. Final browser review confirmed those two photos fully decoded without blur placeholders, the corrected Revuelto caption, arrow navigation, and Escape focus restoration. Earlier desktop/mobile viewer review and overflow checks at 375/768/1440px passed. The 1200x630 share image and collection route return HTTP 200 with matching metadata. No automated test suite was added.

**OPEN ITEMS:** Exact internal cause of the old optimizer stall remains unproven; restart restored the same requests. Temporary 404s occurred while exports were incomplete: future imports must finish assets before updating live content. Final mobile-cover screenshot refresh was interrupted by browser-control timeouts; earlier mobile viewer and responsive checks passed. Intake folder still says `carsncops 26`; originals remain untouched. Unconfirmed car subvariants are intentionally omitted. Videos remain deferred, collection 03 remains a placeholder, and search indexing remains disabled. Changes are local only; no GitHub push or Vercel deployment. Preview is running at http://127.0.0.1:3000/work/cars-n-copters-2025.

## Work labels - 2026-09-26

**TASK SUMMARY:** Replace "Selected work" with the shorter "Work" wording approved by Nathan.

**FILES MODIFIED:** `components/header.tsx` line 30 (`Header`); `app/page.tsx` lines 22 and 27 (`Home`); `app/work/[slug]/page.tsx` lines 33 and 46; `app/not-found.tsx` line 6 (`NotFound`); `README.md` line 77; this section, lines 3-13.

**IMPLEMENTATION:** Navigation and the collection breadcrumb use "Work"; the homepage section reads "01 / Work" and the opening-image link reads "View work". Updated the single-collection fallback and 404 return label for consistency. Existing routes, anchor IDs, scroll behavior, and link components are retained.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. `rg -n -i 'selected work' app components content lib README.md` returned no matches. Manual browser checks confirmed the homepage labels, View work navigating to `/#work`, the collection breadcrumb, and its return to Work.

**OPEN ITEMS:** Local-only changes. The single-collection fallback and 404 copy were checked in source/build, not exercised as separate browser cases.

## About portrait composition - 2026-09-26

**TASK SUMMARY:** Make the left-facing headshot feel connected to the About section while maintaining alignment with section 03.

**FILES MODIFIED:** `app/page.tsx` lines 37-45 (`Home` About markup); `app/globals.css` lines 101-105 and 203; `README.md` line 81; this section, lines 3-13.

**IMPLEMENTATION:** Grouped the heading and bio in the left column and placed the portrait in the right column, facing toward the text. The numbered section label stays on the same shell edge as Contact. Enlarged the portrait frame to a maximum 420px, updated responsive `sizes`, and moved the existing soft background shading toward the portrait. Retained `PhotoFrame`, original image pixels, typography, and theme variables. On mobile, DOM and visual order are heading/bio then centered portrait; an omitted headshot lets the text span both columns. No new dependency or animation was introduced.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. Manual browser review covered 375, 768, and 1440px with no horizontal overflow, plus light and dark themes. Section labels align at x=56px on desktop and x=20px on mobile; the mobile portrait follows the text with a 40px gap. Tablet display type is 46px and mobile 52px. Desktop and tablet screenshots confirm the portrait faces the copy. Temporary viewport settings were reset after review.

**OPEN ITEMS:** Local preview only. The no-headshot fallback is implemented with the existing optional content field and a CSS only-child rule; removal of the headshot was not exercised in the browser.

## Supra wheel identification - 2026-09-26

**TASK SUMMARY:** Add Nathan's confirmed Rohana wheel brand to the pink Supra's content.

**FILES MODIFIED:** `content/portfolio.ts` lines 160 and 177; `AGENTS.md` line 12; `docs/photo-imports/the-california-grand-tour-2026.md` lines 38 and 52; this section, lines 3-13.

**IMPLEMENTATION:** Updated the `cgt-0549` caption and `cgt-0569` visual alt text to identify Rohana wheels. Recorded Nathan's confirmation in the existing project guidance and import notes for future captions. No wheel model is inferred.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` passed, including validation of 3 shoots and 30 photos. This is a text-only refinement; the preceding desktop/mobile viewer verification still applies to the unchanged layout.

**OPEN ITEMS:** Wheel model remains unspecified. Changes are local only.

## Enthusiast captions and confirmed car identities - 2026-09-26

**TASK SUMMARY:** Replace generic photo descriptions with short, informed enthusiast captions and preserve Nathan's standard for future imports.

**FILES MODIFIED:** `content/portfolio.ts` lines 9, 47, 80-184; `components/gallery.tsx` line 74; `lib/content-validation.ts` line 55; `AGENTS.md` lines 1-14; `README.md` lines 39, 53, 67; `docs/photo-imports/the-california-grand-tour-2026.md` lines 36-54; this section.

**IMPLEMENTATION:** The viewer previously reused accessibility alt text as visible copy. Added optional `Photo.caption`, rewrote all 18 real collection captions, and kept separate, more precise visual alt text. The existing viewer falls back to alt for placeholders. Supplied captions must be nonempty strings under the existing runtime validator. Nathan confirmed Senna GTR, F1 GTR Longtail chassis 23R, 991.2 GT3, Liberty Walk GR Supra 3.0 on air suspension, and the C8 beside the Porsche in image 11. Documented factual sources and user identifications in the import notes. `AGENTS.md` now requires natural enthusiast wording, relevant build details, and deeper research only where useful; no separate skill or dependency was introduced.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` passed. Manual validation using `node --import tsx --input-type=module` rejected empty, whitespace-only, numeric, and null captions on in-memory copies; omission was accepted, with source files unchanged. Confirmed 18/18 real photos have captions. Browser checks at desktop and 375px showed the long Longtail caption without clipping or horizontal overflow, independent visual alt text, updated captions when advancing, Escape/focus restoration, and placeholder alt fallback. After the final C8 wording correction, `npm.cmd run validate:content` passed and a direct text check confirmed its exact identity. No automated test setup was added.

**OPEN ITEMS:** Changes remain local and the preview is running. Corvette trim, Porsche transmission/wheel brand, and Supra model year/tune are unconfirmed and are not asserted. The Porsche manual-transmission caption is explicitly a model-history fact, not an equipment claim about this car.

## Image loading and viewer request sizes — 2026-09-26

**TASK SUMMARY:** Reduce first-load blank frames and unnecessary image processing without lowering the configured photo quality.

**FILES MODIFIED:** `components/portfolio-image.tsx` lines 5–13; `components/gallery.tsx` lines 7 and 71; `lib/gallery-layout.ts` lines 55–60; new `scripts/generate-image-previews.ts` lines 1–21; generated `content/image-previews.json` lines 1–28; `package.json` lines 7–15; `README.md` lines 68–72; this handoff section.

**IMPLEMENTATION:** The viewer previously advertised its entire 1603px stage width although a portrait occupied about 445px. `viewerImageSizes` now bounds the requested width by the photo aspect ratio and available viewport height, retaining width limits on mobile and the existing short-screen stage minimum. The shared `PortfolioImage` wrapper shows tiny embedded blur previews until the optimized image loads. Previews are generated from all configured local photos before development/build and can be refreshed with `npm run generate:image-previews`. All 26 previews total about 13KB as JSON. No dependencies, source-photo edits, quality reductions, or automated test setup were added; existing AVIF/WebP settings and lazy loading remain.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. On the same 1699×747 viewport at DPR 1.5, `mclaren-senna-front-three-quarter.jpg` changed from a `w=3840` request to `w=750`, both at quality 85. Its AVIF response shrank from 450310 to 49125 bytes (89.1%); both transfer samples were cache hits, so these are payload comparisons rather than cold-page timing claims. Browser inspection confirmed previews on unloaded lazy images, removal after load, full-image containment, and a 384px variant without horizontal overflow at a 375px mobile viewport. An earlier separate local 1200px request took 622ms on an AVIF cache miss and 4ms on a hit; this does not establish total page latency.

**OPEN ITEMS:** First-visit production latency remains unmeasured until a Vercel preview deployment. Vercel caches optimized variants after processing; a cache miss can still take longer. Changes are local only. If viewer controls/padding change, review the helper's 180px reserved-height bound against the CSS.

## Single-screen framing with front-lip priority — 2026-09-26

**TASK SUMMARY:** Align the crop just below the front lip, near the user's red line, to retain more rear-wing space within the initial screen.

**FILES MODIFIED:** `app/page.tsx` line 18; `app/globals.css` line 55; `content/portfolio.ts` line 46; `README.md` line 70; this handoff section.

**IMPLEMENTATION:** Hero height is exactly 100svh, with both minimum-height overrides removed. Updated responsive image sizes follow viewport dimensions. The focal point was refined from 50%/80% to 50%/72%, reducing the margin below the front lip and revealing more of the rear wing. Phone cover cropping and ordinary scrolling remain. No bars, stretching, or source-photo edits.

**VERIFICATION:** The preceding layout revision passed lint, typecheck, and build. This focal-point-only refinement passed `npm.cmd run validate:content` and `git diff --check`. At scroll position 0, the hero and viewport both measured 746px tall, and the photo measured 1684px wide with computed object-position `50% 72%`. A fresh screenshot confirmed the front lip sits just above the bottom edge on the initial screen.

**OPEN ITEMS:** Rear-wing space is intentionally sacrificed on wide windows per user preference. Cropping still varies with screen shape. Local-only changes. Earlier crop and height experiments are historical.

## Mobile cover crop and taller upload — 2026-09-26

**TASK SUMMARY:** Refine natural navigation in Nathan's own visual style, use an edge-to-edge portrait crop on mobile, and import the taller replacement opening photo. The reference demonstrates usability, not a design to clone.

**FILES MODIFIED:** `app/globals.css` removed the portrait contain override before line 210; `app/page.tsx` line 18; `content/portfolio.ts` lines 44–46; `README.md` line 70; this handoff section; new binary `public/images/home/opening-frame-mclaren-tall.jpg`.

**IMPLEMENTATION:** All screen shapes now use the existing cover crop and readability gradient. Hero size and ordinary scrolling are unchanged. Responsive image sizes account for both viewport width and the source width needed to cover viewport height, including the existing 480px minimum. The newer 7296×5837 upload is exported as a 3200×2560 sRGB JPEG with a 50%/80% focal point. Existing typography, colors, and branding remain.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. At 375×812, the hero measured 812px, used cover, loaded the new image with sizes `max(100vw, 125.00svh, 600px)`, and had no horizontal overflow. A normal quarter-page scroll moved both the document and hero by 203px immediately. Desktop 1440×900 crop reviewed with a 900px hero and no overflow.

**OPEN ITEMS:** User review of the responsive crops; changes remain local. Earlier sections document superseded experiments with contained mobile imagery and previous uploads.

## Full-screen homepage opening — 2026-09-26

**TASK SUMMARY:** Replaced the short framed hero and separate headline with the user's requested screen-height photographic opening and natural scroll into collections.

**FILES MODIFIED:** `app/page.tsx` lines 1–24 (`Home`); `components/header.tsx` lines 4–25 (`Header`); `app/globals.css` lines 35–64, 188–214 (header, hero, responsive rules; obsolete hero rules removed); `README.md` lines 68–72; this handoff section.

**IMPLEMENTATION:** `PortfolioImage` remains optimized and preloaded with `sizes="100vw"`. Hero uses 100svh with a 480px usability minimum, overlay heading/link, and inset border. No wheel/touch interception, pinned hero, or scroll snapping. Homepage header overlays the photo, then an IntersectionObserver restores themed navigation when the image leaves the header area. Other routes retain standard sticky navigation. Portrait/square screens use contained imagery to preserve the entire horizontal composition. Existing light default, headshot, collections, fonts, and reduced-motion rule remain.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. Manual checks: 1440×900 hero measured 900px; one normal page scroll moved its bottom to 0 and revealed Selected Work with opaque light navigation. 375×812 and 768×1024 heroes matched screen height, used contain, and had no horizontal overflow. Desktop/mobile screenshots reviewed. Mobile menu text/background contrast, menu dismissal after navigation, hero CTA anchor, shoot navigation, and standard shoot header verified.

**OPEN ITEMS:** Landscape cover cropping still varies with window aspect ratio; portrait screens intentionally have space around the full photo. Local review only; no deployment. Final image/composition choice remains the user's.

## Light default and replacement opening frame — 2026-09-26

**TASK SUMMARY:** Default to light mode and use the newest opening-frame upload.

**FILES MODIFIED:** `app/layout.tsx` line 18; `components/theme-toggle.tsx` lines 8–26; `app/globals.css` removed the system-dark fallback after line 14; `content/portfolio.ts` lines 44–46; `README.md` line 90; this handoff section; new binary `public/images/home/opening-frame-mclaren.jpg`.

**IMPLEMENTATION:** Light is the fallback in the pre-render script, runtime theme handling, and CSS; explicit saved light/dark choices still win. Removed the system-theme change listener. New opening photo is an sRGB 3200×2133 JPEG derived from `IMG_0500-topaz-rawdenoise-upscale-2x.jpg`, with a 50%/65% focal point and updated alt text. Source upload and prior web export are retained.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. One-off initialization checks passed for absent, invalid, blocked-storage, saved-light, and saved-dark cases. Browser confirmed the optimized McLaren photo loads, no horizontal overflow, and light choice persists after reload. Preview was switched to light for the user.

**OPEN ITEMS:** Local-only changes; user crop review remains. Earlier handoff sections describe historical states, including the previous photo and system-based default.

## Homepage photo trial — 2026-09-26

**TASK SUMMARY:** Added the uploaded opening-frame and headshot test photos to the local homepage.

**FILES MODIFIED:** `content/portfolio.ts` lines 32–33, 43–51, 110; `app/page.tsx` lines 21, 37; `app/globals.css` lines 97–99; `lib/content-validation.ts` lines 52–74, 98–103, 119–124; `README.md` lines 68–70; this section in `docs/HANDOFF.md`; new binary exports `public/images/home/opening-frame.jpg` and `public/images/home/headshot.jpg`.

**IMPLEMENTATION:** Optional `site.heroImage` overrides the existing hero reference, and optional `site.headshot` renders through `PhotoFrame` in About. Both reuse the existing Photo type and the shared alt/dimension/focal-point/asset validator. The example collections remain intact. Opening crop uses 50%/72% focal positioning; headshot displays square, up to 320px. JPEG exports are sRGB, quality 95, with orientation applied and metadata stripped; originals in ignored `photos+videos/` are untouched. Hero remains preloaded; headshot is lazy-loaded.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. One-off in-memory validation rejected blank alt text on each new homepage photo; unchanged records passed. Desktop light-theme opening and About screenshots reviewed. Mobile dark-theme DOM checks confirmed loaded photos, a square headshot, and no horizontal overflow at 375px; mobile screenshot capture was unusually scaled, limiting visual crop review.

**OPEN ITEMS:** User review of these test photos and final crops remains pending. This trial has not been committed, pushed, or deployed. Homepage remains excluded from indexing while the example collections remain placeholders. Preview: http://127.0.0.1:3000/ and http://127.0.0.1:3000/#about.

## Gallery refinement — 2026-09-26

**TASK SUMMARY:** Implemented the approved Pixieset-inspired shoot experience while preserving the homepage design.

**FILES MODIFIED:** Changes from this gallery pass:

| File | Changed lines | Component or purpose |
| --- | --- | --- |
| `app/work/[slug]/page.tsx` | 5, 33–45 | `ShootPage` cover, optional details, gallery introduction |
| `components/gallery.tsx` | 3–77 | `Gallery` proportional rows and enlarged viewer |
| `lib/gallery-layout.ts` | 1–53 | New `galleryRows`, `galleryRowWidth`, `galleryImageSizes` helpers |
| `app/globals.css` | 119–170, 192–198 | Shoot, gallery, viewer, and responsive styling |
| `content/portfolio.ts` | 17–18, 86–91 | Optional shoot details and `formatShootDate` |
| `lib/content-validation.ts` | 15–20, 66–67 | Actual calendar dates and nonempty locations |
| `README.md` | 38, 57–66 | Content authoring instructions |
| `docs/superpowers/plans/2026-09-25-gallery-refinement.md` | 1–30 | Approved implementation plan and completed checks |
| `docs/HANDOFF.md` | 1–36 | This pass's handoff |

Existing uncommitted identity and intake-folder changes in `.gitignore`, `README.md`, `app/layout.tsx`, `app/page.tsx`, `content/portfolio.ts`, and this handoff were preserved. The current local Instagram identity is **@natextran**.

**IMPLEMENTATION:** Retained the existing App Router, `PhotoFrame`/`PortfolioImage` optimization, native dialog, themes, and typography. Shoot pages now have large framed covers, title overlays, and optional dates/locations. Gallery rows preserve image proportions and source order with breakpoint-specific image sizes. The quieter viewer retains arrows, Escape, focus containment/restoration, and hides directional controls for a single photo. Horizontal single-finger swipe handling ignores vertical gestures and multitouch. No dependencies, video features, or automated test framework were added.

**VERIFICATION:** `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` passed. Build validated 3 shoots / 18 photos and regenerated 4 share images. A deliberate impossible date and blank location caused the build to fail with record-specific errors; fixtures were restored before the passing build. Browser review covered 375, 768, and 1440px layouts across light/dark themes, uncropped gallery images, no horizontal overflow, next-shoot/home navigation, theme persistence, viewer arrows/Escape/Tab containment and focus restoration. Temporary single-photo, long-title, and leap-date content rendered correctly and was restored. Homepage desktop/mobile appearance remains intact. Local HTTP checks returned 200 for home and all three shoots, and 404 for an unknown shoot. Two independent code reviews found no actionable defects.

**OPEN ITEMS:** Actual touchscreen swipe/pinch behavior remains unverified. Real-photo crop, fidelity, alt-text, and performance review remains deferred. Reduced-motion and blocked-font browser emulation were not repeated in this pass. Changes are local on `feat/pixieset-gallery`; no commit, push, or deployment was performed. The live deployment described below is the earlier release and does not include this pass or the pending identity correction. Local preview: http://127.0.0.1:3000/work/study-01.

---

## Initial release — 2026-09-24

## Task summary

Implemented the approved photography-only portfolio, including the refined framed homepage, three example shoot pages with six JPG placeholders each, light/dark themes, image viewer, responsive image optimization, content validation, share images, GitHub, and Vercel.

## Implementation

- `Home` and `ShootPage` are statically generated App Router pages. `Gallery` owns the native dialog, keyboard navigation, explicit Tab wrapping, and focus restoration.
- `PhotoFrame` and `PortfolioImage` serve all on-page photos through `next/image`; source sizes and intrinsic frame geometry prevent layout shifts. Formats are explicitly AVIF then WebP, with source-format fallback.
- `ThemeToggle` follows the system initially and persists explicit selection. A small head script applies the theme before rendering. In-memory choice preserves toggling when storage is blocked.
- `Photo.alt` is mandatory. `validateContent` is a build gate for invalid assets, dimensions, alt text, references, focal points, and duplicate identifiers. Generated `/og/` outputs cannot be used as sources.
- `pageMetadata` supplies complete Open Graph objects per page, avoiding shallow inheritance that could drop images. Share images are local 1200×630 JPEGs generated by Sharp from Manrope text and cover crops.
- Fonts are self-hosted through Fontsource and use swap plus system fallbacks. The display serif is limited to large headings; UI labels use Manrope.
- New dependencies are in `package.json`: Next/React/TypeScript/Tailwind and their lint/build tooling, Fontsource for local fonts, Sharp for generated images, and tsx for typed content scripts. No automated test framework was added.
- `AGENTS.md` and `CLAUDE.md` are generated by Next.js 16.3.6. The installed local Next docs were checked for current image, route-param, and metadata behavior.

## Verification and results

Required commands passed on the implementation:

```sh
npm run lint
npm run typecheck
npm run build
```

Windows execution used `npm.cmd` because the machine blocks PowerShell npm scripts. Vercel independently ran all three gates during the successful initial deployment.

Manual browser checks completed:

- Homepage screenshots reviewed at 375, 768, and 1440px, with light and dark themes. No horizontal overflow observed. Shoot pages reviewed at tablet and phone widths.
- Theme toggle and persistence after reload, mobile menu expansion/collapse, and cross-page About navigation.
- Viewer arrow navigation, Escape close, focus return to triggering gallery button, and Tab containment. A temporary single-photo collection showed 01/01 with no directional controls; original content was restored.
- Large heading computed styles confirmed Cormorant Garamond and sizes above 20px. Gallery images advertise lazy loading and breakpoint-specific sizes; the principal cover is preloaded.
- Home and shoot sharing graphics visually reviewed. Every generated image is 1200×630. Explicit override and edge-position crop were exercised locally.
- A deliberate blank-alt modification made `npm run build` exit 1 with record-specific diagnostics; original content was restored and the full build passed. Independent in-memory inspection also rejected missing files, dimension mismatches, duplicate slugs, unresolved covers, invalid focal points, and unsafe paths.

Production HTTP inspection at https://photography-portfolio-website-chi.vercel.app:

- Homepage and all three shoot URLs: 200; unknown shoot: 404.
- Every page has its expected absolute OG image URL and `noindex, nofollow` during placeholder work. Sitemap endpoint exists and is empty until indexing is enabled.
- The same 640px image request returned AVIF for `Accept: image/avif`, WebP for `image/webp`, and JPEG for `image/jpeg`. All decoded to 640×400.

GitHub integration was verified with a subsequent push to `feat/photography-portfolio`: Vercel built a Ready preview at https://photography-portfolio-website-git-1851e0-nathan-tran-s-projects.vercel.app/. It opens in the authenticated browser; anonymous requests redirect to Vercel authentication. `main` remains the production branch.

## Open items and limits

- Real photographs, final bio wording, and email remain intentionally deferred. Instagram is **@natextran** throughout.
- Real-photo fidelity, crop selection, alt-text quality, and production performance need review when the images arrive.
- Reduced-motion behavior, blocked-font fallback, and blocked-storage/system-theme changes were reviewed in code but not exercised through browser emulation in this session. Recheck these using browser developer tools before public launch.
- Native image load-error fallback is implemented; a forced network-failure scenario remains unverified in the browser.
- Keep `PORTFOLIO_INDEXABLE=false` until real content is approved. Preview deployment protection remains enabled; no authentication protections were disabled.
- No video content, player, or video-related schema exists. Content is split into site, shoot, and photo records for a later additive extension.
- See README for content and deployment instructions. Production branch is `main`; development branch is `feat/photography-portfolio`.

## File inventory

All listed files are additions to the initially empty workspace. Text ranges cover each complete file; binary assets have no line ranges.

| File | Lines |
| --- | --- |
| `.env.example` | 1–5 |
| `.gitattributes` | 1–4 |
| `.gitignore` | 1–10 |
| `AGENTS.md` | 1–9 |
| `CLAUDE.md` | 1–1 |
| `README.md` | 1–106 |
| `app/globals.css` | 1–173 |
| `app/icon.svg` | 1–1 |
| `app/layout.tsx` | 1–22 |
| `app/not-found.tsx` | 1–7 |
| `app/page.tsx` | 1–44 |
| `app/robots.ts` | 1–6 |
| `app/sitemap.ts` | 1–8 |
| `app/work/[slug]/page.tsx` | 1–41 |
| `components/footer.tsx` | 1–14 |
| `components/gallery.tsx` | 1–51 |
| `components/header.tsx` | 1–30 |
| `components/icons.tsx` | 1–15 |
| `components/photo-frame.tsx` | 1–23 |
| `components/portfolio-image.tsx` | 1–10 |
| `components/theme-toggle.tsx` | 1–51 |
| `content/portfolio.ts` | 1–101 |
| `docs/HANDOFF.md` | 1–106 |
| `eslint.config.mjs` | 1–9 |
| `lib/content-validation.ts` | 1–119 |
| `lib/page-metadata.ts` | 1–12 |
| `lib/site-url.ts` | 1–11 |
| `next.config.ts` | 1–10 |
| `package-lock.json` | 1–7419 |
| `package.json` | 1–39 |
| `postcss.config.mjs` | 1–3 |
| `public/fonts/Manrope-Variable.ttf` | Binary asset |
| `public/fonts/OFL-Manrope.txt` | 1–93 |
| `public/images/placeholders/landscape-light.jpg` | Binary asset |
| `public/images/placeholders/landscape.jpg` | Binary asset |
| `public/images/placeholders/portrait-light.jpg` | Binary asset |
| `public/images/placeholders/portrait.jpg` | Binary asset |
| `public/images/placeholders/square.jpg` | Binary asset |
| `public/images/placeholders/wide.jpg` | Binary asset |
| `scripts/generate-og.ts` | 1–92 |
| `scripts/generate-placeholders.ts` | 1–27 |
| `scripts/validate-content.ts` | 1–10 |
| `tsconfig.json` | 1–21 |
| `vercel.json` | 1–6 |
