# Nathan Tran — Automotive Photography

A photography-only portfolio built with Next.js App Router, React, TypeScript, and Tailwind. Identity: Nathan Tran / Nate / [@natexauto](https://www.instagram.com/natexauto/).

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
3. Add a `Shoot` record to `shoots` with a unique lowercase hyphenated `slug`, title, optional description, ordered `photos`, and `coverId` matching a photo ID. The slug `home` is reserved for the homepage share image.
4. Every `Photo` needs `id`, `src` (beginning `/images/`), `width`, `height`, and a descriptive nonempty `alt`. Remove `placeholder: true` when replacing a development frame. Describe the actual visible subject; do not repeat keywords or leave the alt as a filename.
5. Optionally set `focalPoint: { x: 50, y: 50 }`. Values range from 0 to 100, representing horizontal and vertical object positioning for cropped previews and share images. Full galleries and the enlarged viewer preserve the complete image.
6. Set `site.featuredSlugs` to the desired homepage order. Set `site.hero` to an existing shoot slug and photo ID. Array order controls gallery and next-shoot order.
7. Run the three verification commands above, review the changed pages in both themes, and push to GitHub.

Example photo record:

```ts
{
  id: "your-shoot-01",
  src: "/images/your-shoot/front-quarter.jpg",
  width: 2400,
  height: 1600,
  alt: "Describe the car, angle, and setting actually visible in this photograph.",
  focalPoint: { x: 50, y: 50 },
}
```

Alt text is required both by TypeScript and runtime build validation. Duplicate slugs, duplicate photo IDs within a shoot, missing assets, invalid/mismatched dimensions, unsafe paths, empty galleries, broken references, and invalid focal points fail with record-specific errors.

### Share images

Every share image is a local 1200×630 JPEG generated at build time:

- `/og/home.jpg`: dedicated Nathan Tran / Automotive Photography / @natexauto artwork.
- `/og/<slug>.jpg`: the shoot cover cropped at its focal point, with shoot title and branding.
- To override a shoot image, add a finished 1200×630 JPG/PNG under `public/images/share/` and set `shoot.ogImage` to its `/images/share/...` path. Do not point overrides into generated `/og/` outputs; they do not exist on a clean clone.

Run `npm run generate:og` to preview sharing changes during development. Link metadata includes absolute URLs, image dimensions, alt text, and Twitter large-image cards. Crawler images use generated files; all on-page photos use `next/image` with responsive sizes and AVIF/WebP negotiation.

### Identity and contact

Edit `site.name`, `site.shortName`, and `site.instagram` for content settings. The current approved identity is also reflected in typography, page metadata, and wordmarks; those are intentionally Nathan Tran-specific. Add `site.email` only when an address is ready to publish. The email action is otherwise hidden.

## Design rules

- Cormorant Garamond is for display headings only, never below 20px. The `.display` class controls it. Manrope handles body copy, captions, navigation, buttons, and UI labels.
- Both fonts are locally served with `font-display: swap` and serif/sans-serif fallback stacks in `app/globals.css`.
- Theme initialization runs before page content renders. Explicit selection is saved locally; otherwise the system theme is followed. Blocked storage does not prevent toggling.
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

Photography is v1. There is no video player, video content, or video schema. Site settings, shoot metadata, and photo records are separate so a future release can add fields without restructuring the current content.

## Font licenses

Frontend WOFF2 fonts come from the `@fontsource` packages. The Manrope TTF used by the local share-image renderer is distributed under the SIL Open Font License in `public/fonts/OFL-Manrope.txt`.
