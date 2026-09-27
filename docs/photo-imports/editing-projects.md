# Homepage films and editing projects

## Source and role evidence

Nathan supplied the following attribution on September 26, 2026:

- `first-motors`: Nathan edited footage from First Motors. No filming credit for Nathan.
- `randoms`: footage sources could not be identified.
- `whistlindiesel`: only the opening Ferrari clip is WhistlinDiesel's; the remaining BMW clips come from unidentified sources.
- `two-huracans`: Nathan's own filming and editing, reusing `cnc-video-lambo-3-1-prob4` from Cars 'N Copters 2025.

These are portfolio edits, not claims of commissioned work. Original footage URLs were not supplied. The First Motors poster shows a Koenigsegg Jesko Attack headlight detail; the other selected frames show a Rolls-Royce front and three BMWs at night.

Nathan subsequently supplied [First Motors' gold-leaf Jesko Attack article](https://f1rstmotors.com/news/koenigsegg-builds-gold-leaf-jesko-attack-for-australia-s-billionaire) as identification context for `edit-first-motors-video-img-202609262149082`. The article was read in the browser. Updated the project title to **Koenigsegg Jesko Attack**, with matching alt text and a caption about the visible carbon fiber, gold accents, and ghost emblem. Ownership, chassis identity, the specific KNC finish, gold purity, and performance figures from the article are not attributed to the filmed car without a direct match. This article is a model/reference source, not the original footage URL.

## Imports and duplicate handling

| Project / record | Original | SHA-256 | Web export | Poster time |
| --- | --- | --- | --- | --- |
| `first-motors` / `edit-first-motors-video-img-202609262149082` | `first-motors/final/IMG_202609262149082.MP4` | `22ac02d6096bbe26f6667b63099c38e5b65f952a3215966996a2aab03a8761c8` | `/videos/edit-first-motors/img-202609262149082.mp4` | 4.5 s |
| `rolls-royce` / `edit-mixed-sources-video-img-202609262149081` | `randoms/final/IMG_202609262149081.MP4` | `5c33b4a47542dda99b31957d28d67a29815f1b89aba55f7661a8a38d88650dc9` | `/videos/edit-mixed-sources/img-202609262149081.mp4` | 16.8 s |
| `ferrari-bmw` / `edit-mixed-sources-video-imgood-6-1-prob4` | `randoms/final/imgood_6_1_prob4.MP4` | `ae3a2b30770ac88a86e25afc06374bdcd6c76e92e04d565fe57d69935195ea61` | `/videos/edit-mixed-sources/imgood-6-1-prob4.mp4` | 9 s |

Intake paths above are relative to `photos+videos/edits/`. The copy of `imgood_6_1_prob4.MP4` in `whistlindiesel/final/` has the same SHA-256 as the `randoms` copy. Both originals remain intact; only one web video and project record are included.

Prepared with the existing `prepare:videos` script (`--nvenc`). All three outputs are 1080x1920 H.264/AAC, retain audio, use fast-start MP4, and stay below 100 MiB each. Durations: 17.706 s, 18.986 s, and 11.566667 s. Source duration differences are below one frame. No event-gallery records were added or removed by this import.

Posters were extracted from the finished edits with FFmpeg, reviewed visually, and stored as local JPGs. The Rolls-Royce poster is named `rolls-royce-cover.jpg` to distinguish the selected clean frame from the preparation script's default two-second frame. Chosen covers are optional; no AI-generated image or alteration of the source footage was used.

## Presentation and verification

`content/films.ts` keeps title, role, footage attribution, and media together. `FilmStrip` renders proportional inline players with optimized posters, a single play action, native playback controls, error/retry feedback, and one active player at a time. MP4s are not preloaded before interaction. The existing event-gallery viewer is unchanged.

Required checks: lint, typecheck, build/content validation; manual desktop/mobile review in both themes; first-click playback for all four cards, switching between players, keyboard controls, and responsive overflow checks. These are manual checks, not an automated browser suite.

### Verification completed

- `npm run lint`, `npm run typecheck`, and `npm run build`: passed. Build reports 3 shoots, 89 photos, 28 collection videos, and 4 homepage films (one reused collection film plus three new imports).
- One-off in-memory validation: blank footage credit, blank alt text, invalid role, and duplicate video source each produced the expected record-specific rejection. No source records were changed for this check.
- Manual Edge browser: all four cards started playback after one click (`paused: false`, advancing `currentTime`). Starting a second card paused the first. Keyboard Enter started playback and focused the video; Space paused it. Unopened players remained at `readyState: 0`.
- Manual responsive review: 375, 768, and 1440 pixels, no horizontal overflow; both light and dark layouts inspected. Display titles remain 28px. All four optimized posters loaded. Original viewport and dark-theme preference restored.
- Existing gallery component restored to its original collection-only implementation. No automated test suite or dependencies added.

### Files changed for this revision

- `components/film-strip.tsx:1-57`: `FilmCard` and `FilmStrip`, inline playback and compact cards.
- `content/films.ts:1-43`: projects, media, role/source attribution, and required collection-video reference.
- `app/page.tsx:7-35`: `Home` uses the film row after the first collection.
- `app/globals.css:89-113`: responsive media grid, play overlay, captions, and credits; oversized featured panel styles removed.
- `content/portfolio.ts:50-70`: removed the superseded single-feature setting. Earlier bio/contact and gallery ordering work remains intact.
- `lib/content-validation.ts:49-193`: shared MP4 checks and film-project validation.
- `scripts/generate-image-previews.ts:5-8`, `scripts/validate-content.ts:2-10`: include homepage projects in build preparation and validation.
- `content/image-previews.json`: three generated poster previews.
- `README.md:43-51`: project configuration, optional covers, playback, and intake instructions.
- `docs/photo-imports/editing-projects.md`: this import and verification record.
- New binary assets: one MP4/JPG pair under `public/videos/edit-first-motors/` and `public/images/edit-first-motors/video-posters/`; two pairs under `public/videos/edit-mixed-sources/` and `public/images/edit-mixed-sources/video-posters/` (paths listed in the import table and `content/films.ts`).
- Local ignored `photos+videos/edits/{first-motors,randoms,whistlindiesel}/credits.txt:1-7`: correct attribution and duplicate handling. Original media preserved.

Local review limitations: real iOS/Safari playback and the network-error retry path were not exercised. Original source links for the editing-only footage remain unspecified. Prior uncommitted gallery-curation notes in `docs/photo-imports/cars-n-copters-2024.md` and `docs/photo-imports/cars-n-copters-2025-videos.md` are retained.
