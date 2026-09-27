# Photography content standard

Apply these rules whenever adding or editing photography, including future imports.

- Write a separate `Photo.caption` for every real gallery photo in `content/portfolio.ts`. The viewer uses it as the visible description; `alt` remains required for accessibility. Placeholders and homepage-only images may omit captions.
- Write like a car enthusiast: use the confirmed model name and a relevant detail about the car or build. One or two short sentences are enough. A precise detail caption is better than a forced fun fact or a spec sheet.
- Do not turn every photo import into exhaustive research. Save deeper chassis/provenance research for niche collector cars and hypercars, or when Nathan requests it. Ordinary captions can focus on recognizable design, visible modifications, or confirmed build details. Exact subvariants are welcome when known, not something to guess or demand for every car.
- Prefer "McLaren Senna GTR. One of just 75 built." over a list of doors, spectators, sky, barriers, or background colors. Mention a venue only when it adds meaningful context. Avoid generic praise, sales copy, and invented personal reactions.
- Across photos of the same car, vary the detail. Do not repeat its production count on every frame or replace a specific model with "race car."
- Verify facts using manufacturer documentation and reputable chassis/race records. Record links and the photo IDs they support in `docs/photo-imports/<shoot-slug>.md`. Distinguish model specifications from the photographed car's confirmed equipment. Do not infer chassis numbers, model years, power, wheel brands, material, transmission, or modifications from appearance alone. Use Nathan's explicit identifications as owner-provided context and record them; ask about material uncertainty or omit the claim.
- Keep `alt` concise and visual: identify the exact confirmed car and the angle or detail visible. Historical trivia belongs in `caption`, not in place of an image description. Avoid incidental scenery unless needed to understand the photo.
- Confirmed for the California Grand Tour 2026 collection: white McLaren Senna GTR; FINA McLaren F1 GTR Longtail chassis 23R; silver Porsche 911 GT3 (991.2); pink Toyota GR Supra 3.0 with Liberty Walk widebody, Rohana wheels, and air suspension; red Chevrolet Corvette C8 beside the Porsche in image 11 (`cgt-0545-wide`), trim unconfirmed. Nathan confirmed these identities/build details; preserve them unless corrected. The Supra's wheel model is unconfirmed. Do not label the Corvette as a Z06 or Stingray without confirmation.
- Check new captions in the viewer on desktop and mobile. Run lint, typecheck, and build, including content validation. Do not add an automated test suite.
- Confirmed for Cars 'N Copters: the event is the 2025 edition; the black car in `IMG_1990.HEIC` / `IMG_3299.JPG` (`cnc-3299`) is a Lamborghini Revuelto, not a Toyota GR Supra. Nathan confirmed keeping one edited version per repeated frame rather than displaying both HEIC and JPG versions.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
