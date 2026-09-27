# Nathan Tran — Automotive Photography

A photography and film portfolio built with Next.js App Router, React, TypeScript, and Tailwind. Identity: Nathan Tran / Nate / [@natextran](https://www.instagram.com/natextran/).

Live portfolio: https://natefilms.vercel.app

Private repository: https://github.com/nathantran07/photography-portfolio-website

Vercel project: https://vercel.com/nathan-tran-s-projects/photography-portfolio-website

## Local development

Use Node 22 or newer and npm. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm ci
npm run generate:og
npm run dev
```

Open http://127.0.0.1:3000. Neutral JPG placeholders are included; there is no external image service or remote font request. Run `npm run generate:placeholders` only to recreate these development assets.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

`build` first validates content and generates share images. Generated `public/og/` files are ignored by Git and regenerated on Vercel. No automated test framework or browser-test script is installed.

## Add or edit photography

All portfolio content lives in `content/portfolio.ts`. Components do not need editing to publish a shoot.

1. Export web-ready JPGs in the sRGB color space. Bake orientation into the exported pixels. Keep original/full-resolution files outside this repository.
2. Add exports under `public/images/<shoot-slug>/`. Use descriptive lowercase filenames. Record their actual pixel width and height.
3. Add a `Shoot` record to `shoots` with a unique lowercase hyphenated `slug`, title, optional description, ordered `photos`, and `coverId` matching a photo ID. Optionally add a real calendar `date` in `YYYY-MM-DD` format and a nonempty `location` string. Omit unknown details. The slug `home` is reserved for the homepage share image.
4. Every `Photo` needs `id`, `src` (beginning `/images/`), `width`, `height`, and a descriptive nonempty `alt`. Add a separate `caption` for real gallery photos: the confirmed model/variant and a short enthusiast detail or verified fact. Follow the writing standard in `AGENTS.md` and record factual sources in `docs/photo-imports/<shoot-slug>.md`. The viewer displays `caption`, falling back to `alt` for existing placeholders. Alt text still describes the visible subject for accessibility. Remove `placeholder: true` when replacing a development frame.
5. Optionally set `focalPoint: { x: 50, y: 50 }`. Values range from 0 to 100, representing horizontal and vertical object positioning for cropped previews and share images. Full galleries and the enlarged viewer preserve the complete image.
6. Set `site.featuredSlugs` to the desired homepage order. Set `site.hero` to an existing shoot slug and photo ID. Array order controls gallery and next-shoot order. Gallery openings now alternate cars, wider views, and details before continuing with the remaining coverage. Reordering never requires renaming IDs or changing cover references.

### Films and editing-only projects

The homepage's compact films row is configured in `content/films.ts`. Each `FilmProject` has a title, a short description, Nathan's role, a `Video` record, an optional known footage credit, and an optional collection reference. The first card reuses the two-Huracan collection video; the other three are editing-only projects. The identical Ferrari/BMW uploads are included once, with WhistlinDiesel credited only for the Ferrari opening. Unresolved Rolls-Royce and BMW sources remain documented in the import notes and source captions.

`FilmStrip` plays each film inline on the first click, with sound and native playback controls. Only one card plays at a time; unopened MP4s use `preload="none"`. Posters use the existing optimized image pipeline. On phones, the cards form a scroll-snap row with a visible next-card edge, previous/next buttons, and a position counter. Button navigation pauses the active film and respects reduced motion. Swiping a playing film fully out of view also pauses it. The Huracan card links to its event collection. No new dialog or extra play step is involved. The event galleries keep their existing viewer.

Store intake projects in `photos+videos/edits/<project-name>/final/`, with an optional chosen frame in `cover/` and a `credits.txt` recording the title, footage creator, source link, and Nathan's role. These ignored local folders do not publish automatically. A cover is optional: extract a clean frame from the finished export when none is supplied. Keep originals intact, use `prepare:videos` for web exports, and add records to `content/films.ts`. Do not add editing-only projects to event galleries or credit Nathan with filming other people's footage. Keep unknown sources explicitly marked as unknown in the import notes; do not invent an on-page credit. The visible role line must still identify Nathan as the editor, and every card must retain a meaningful description.

Build validation checks project IDs, descriptions, roles, optional credits, collection references, duplicate homepage videos, and the same image/MP4 rules as collection videos. Record import evidence and poster timestamps in `docs/photo-imports/editing-projects.md`.

7. Run the three verification commands above, review the changed pages in both themes, and push to GitHub.

Example photo record:

```ts
{
  id: "your-shoot-01",
  src: "/images/your-shoot/front-quarter.jpg",
  width: 2400,
  height: 1600,
  alt: "Describe the car, angle, and setting actually visible in this photograph.",
  caption: "Name the confirmed model and add one verified fact or specific build detail.",
  focalPoint: { x: 50, y: 50 },
}
```

Illustrative optional shoot fields only; replace these sample details with confirmed information for the actual shoot:

```ts
date: "2024-02-29",
location: "Example venue, Example city",
```

Dates display in English (for example, February 29, 2024) using UTC so the day stays consistent across time zones. Existing placeholder collections intentionally omit dates and locations.

Alt text is required both by TypeScript and runtime build validation. Captions are optional in the type so placeholders and homepage-only photos remain valid; any supplied caption must be a nonempty string. Duplicate slugs, duplicate photo IDs within a shoot, missing assets, invalid/mismatched dimensions, unsafe paths, empty galleries, broken references, invalid focal points, malformed or impossible dates, and empty or non-string locations or captions fail with record-specific errors.

### Image loading

`npm run dev` and `npm run build` generate tiny embedded previews for every configured photo in `content/image-previews.json`. Commit that generated file with photo changes. If you add or replace photos while the development server is already running, run `npm run generate:image-previews` to refresh it. The shared `PortfolioImage` component shows these previews immediately while `next/image` loads the responsive, optimized image. Full-resolution sources and the quality setting are unchanged.

The enlarged viewer's responsive sizes account for both screen width and the photo's height-constrained display area. This avoids requesting a full-width image for a narrow portrait. Offscreen gallery photos stay lazy-loaded; AVIF and WebP remain enabled. Vercel caches optimized variants after they are requested, so a first uncached request can still take longer than a cached one. Check production loading on a Vercel preview before launch.

### Adding videos

Keep originals in the collection's ignored `video-gallery/` intake folder. With FFmpeg and ffprobe installed, run:

```sh
npm run prepare:videos -- "photos+videos/collections/collection-02 (carsncops 25)/video-gallery" cars-n-copters-2025
```

The offline script creates oriented H.264/AAC MP4 copies under `public/videos/<slug>/` and JPEG posters under `public/images/<slug>/video-posters/`. It fits within 1920x1080 (1080x1920 portrait), exports 30fps with quality 19 and a 10 Mbps video ceiling, preserves audio at 192 kbps, strips source metadata, and moves the MP4 index to the front for progressive playback. HDR sources require separate color review and are rejected. Originals are untouched. `--nvenc` uses an installed compatible NVIDIA GPU; omit it for software encoding. `--resume` reuses completed files from an existing source-hash manifest under `artifacts/video-imports/`.

Finish asset generation before updating live content. Add `Video` records to the optional `Shoot.videos` array in `content/portfolio.ts`: `id`, poster `src`, poster `width`/`height`, visual `alt`, visible `caption`, MP4 `videoSrc`, and `duration` in seconds. The same `src`/dimensions structure lets `PhotoFrame`, the proportional gallery layout, and `next/image` handle posters consistently. Covers and OG images still reference real photos. Photos appear first, followed by videos in their array order; the gallery offers a Jump to films link.

Video files do not load on the collection page. The viewer mounts one native player with `preload="none"`; visitors start playback using its controls. Closing or navigating away unmounts and pauses the player. Video controls keep their native keyboard behavior; gallery swipes apply only to photographs. Playback errors offer a retry. Review clips for meaningful speech and provide synchronized captions before publishing spoken content.

Run lint, typecheck, and build, then manually check playback, seeking, volume, fullscreen, mobile layout, and the unchanged photo viewer. Build validation checks video IDs, captions, duration, poster dimensions, MP4 headers/files, and the 100 MiB per-file ceiling. Codecs, audio preservation, duration, and orientation are checked during offline import; browser playback remains a manual gate. Commit the MP4s, posters, content, and regenerated `content/image-previews.json` together. Video hosting/bandwidth must also be checked on a Vercel preview before production release.

### Homepage photographs

The opening image fills an edge-to-edge hero exactly 100svh tall, with overlay navigation and a "View work" link to the Work section. Its current 50%/72% focal point keeps a narrow margin below the front lip to retain more of the rear wing on wide screens. Regular scrolling moves the image immediately; there is no pinned hero or scroll snapping. Phone layouts also use a cover crop, without side bars. Responsive image sizes account for viewport width and screen height. Homepage navigation becomes opaque after leaving the image; shoot-page navigation keeps its standard layout.

Optional `site.heroImage` and `site.headshot` accept complete `Photo` records with required alt text and dimensions. `heroImage` overrides the existing collection-based hero reference without adding a homepage-only photo to a shoot. Removing it restores `site.hero` as the fallback. The headshot appears in the About section when supplied. These records run through the same build validation as gallery photos. Current trial exports live under `public/images/home/`; untouched intake files remain in the ignored `photos+videos/` folder.

The About section keeps its numbered label aligned with Contact. Its heading and bio share the left column; the portrait sits on the right so Nathan's gaze faces the copy. The frame grows to 420px including its border and inset, with responsive image sizes matching the available column. Below 761px, the text precedes a centered portrait. If no headshot is supplied, the text spans the layout.

### Share images

Every share image is a local 1200×630 JPEG generated at build time:

- `/og/nathan-tran-photography-film.jpg`: the Senna GTR opening photograph with Cormorant Garamond branding and an Automotive Photography & Film label. Homepage metadata is centralized in `homepageShare` in `content/portfolio.ts`; the share crop is independent of the on-page hero crop.
- `/og/home.jpg`: compatibility copy of the same image for previously shared links.
- `/og/<slug>.jpg`: the shoot cover cropped at its focal point, with shoot title and branding.
- To override a shoot image, add a finished 1200×630 JPG/PNG under `public/images/share/` and set `shoot.ogImage` to its `/images/share/...` path. Do not point overrides into generated `/og/` outputs; they do not exist on a clean clone.

Run `npm run generate:og` to preview sharing changes during development. Link metadata includes absolute URLs, image dimensions, alt text, and Twitter large-image cards. Crawler images use generated files; all on-page photos use `next/image` with responsive sizes and AVIF/WebP negotiation.

Share-image fonts are bundled under `public/fonts/` for consistent offline builds. The Cormorant Garamond TTF comes from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond); its OFL license is included as `OFL-CormorantGaramond.txt`. Website font loading continues to use the existing Fontsource packages.

### Identity and contact

Edit `site.name`, `site.shortName`, and `site.instagram` for content settings. The current approved identity is also reflected in typography, page metadata, and wordmarks; those are intentionally Nathan Tran-specific. Add `site.email` only when an address is ready to publish. The email action is otherwise hidden.

## Design rules

- Cormorant Garamond is for display headings only, never below 20px. The `.display` class controls it. Manrope handles body copy, captions, navigation, buttons, and UI labels.
- Both fonts are locally served with `font-display: swap` and serif/sans-serif fallback stacks in `app/globals.css`.
- Theme initialization runs before page content renders. Light is the default, regardless of system theme. Explicit light/dark selections are saved locally. Blocked storage does not prevent toggling.
- Reduced-motion preferences disable entrance animations, smooth scrolling, and transitions.
- Native modal dialogs provide viewer focus containment and Escape behavior. Close restores the triggering gallery button; arrow keys wrap through photos. A single-photo gallery hides directional controls.

## GitHub and Vercel

1. Create a **private** GitHub repository named `photography-portfolio-website` in the intended account; add it as `origin` and push the reviewed project.
2. Import that repository in Vercel using the Next.js framework preset. `vercel.json` installs with `npm ci` and runs lint, typecheck, and build. Keep deployment protection enabled for previews.
3. Use `main` as the production branch; feature-branch pushes create review previews.
4. In Vercel production settings, set `NEXT_PUBLIC_SITE_URL` to the final `https://...` production address. Until configured, Vercel's assigned deployment/production addresses are used. Preview metadata always uses its preview deployment URL.
5. Keep `PORTFOLIO_INDEXABLE=false` during placeholder work. When all placeholder flags are removed and real content is approved, set it to `true` for production and redeploy. Preview deployments remain non-indexable regardless.
6. Add a custom domain later through Vercel; update the production URL and redeploy metadata when changing domains.

`robots.txt` allows crawling so crawlers can see `noindex` metadata and share images. Placeholder/preview builds emit `noindex, nofollow` and an empty sitemap. They are not a privacy boundary; use Vercel deployment protection for restricted previews.

## Manual release review

- At 375, 768, and 1440px: inspect both themes, heading sizes, content overflow, and mixed photo proportions.
- Check every shoot, invalid URLs, homepage anchors, mobile menu, keyboard focus, and single-image viewer controls.
- Open/close viewer with mouse and keyboard; check arrow navigation, focus containment, and focus return.
- With browser network tools: inspect responsive source widths, AVIF/WebP negotiation, and lazy offscreen requests. Block font requests and inspect immediate fallback text. Emulate reduced motion.
- Inspect the homepage and every shoot's social metadata and 1200×630 outputs, including an explicit override.
- Confirm malformed content makes the build fail, restore it, and obtain passing lint/typecheck/build.
- Before public launch: replace placeholder content, review actual crops, alt text, color fidelity, loading performance, contact links, and Vercel preview.

The original photography-only scope was expanded with Nathan's approval to include self-hosted gallery videos. Site configuration, shoot metadata, photos, and optional videos remain separate. Production deployment still requires a preview review.

## Font licenses

Frontend WOFF2 fonts come from the `@fontsource` packages. The Manrope TTF used by the local share-image renderer is distributed under the SIL Open Font License in `public/fonts/OFL-Manrope.txt`.
