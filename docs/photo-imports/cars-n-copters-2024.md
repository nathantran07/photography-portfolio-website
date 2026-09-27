# Cars 'N Copters 2024 import

- Nathan supplied the collection title/year. Original capture dates on IMG_1006, IMG_1194, IMG_1289, IMG_1355, IMG_1959, IMG_2658 and IMG_3309 show October 13, 2024. IMG_3269 has a later edit timestamp; it does not override the event date.
- 12 displayed gallery photos after Nathan identified the Ferrari cockpit as an accidental 2025 duplicate. The selected cover IMG_2659.JPG has the same SHA-256 as its gallery copy and appears only once.
- Originals remain untouched under `photos+videos/collections/collection-03 (carsncops 24)/`.
- Full-resolution HEIC primary image decoded using existing temporary Pillow/pillow-heif tools. ICC Display P3 converted to sRGB; untagged JPEGs assumed sRGB. Oriented, max 3200px without enlargement, JPEG quality 95 / 4:4:4 via Sharp; metadata stripped.
- The Huayra BC name is visible on its front plate; Liberty Walk branding is visible on IMG_3271. Captions distinguish visible details and Nathan's confirmed identifications from unverified specifications.
- Huayra BC caption fact: [Pagani manufacturer page](https://www.pagani.com/huayra-bc/) supports the Benny Caiola / first customer explanation for cnc24-2659.
- The Zonda AY name is readable on the rear badge in IMG_2660 and corroborated by [Pagani of Beverly Hills](https://www.linkedin.com/posts/pagani-beverly-hills_paganibeverlyhills-pagani-paganizonda-activity-7042240448282705920-vhdh). Its caption describes the visible purple trim; no unverified chassis history is added.
- Other individual Pagani special editions remain unconfirmed; captions avoid them.

## Nathan's corrections and model check

- `cnc24-2659`: corrected the literal question mark in `Pagani's` to an apostrophe during the preceding caption pass.
- `cnc24-1289`: Nathan identified the lineup, nearest first, as two Lamborghini Aventador SVJs, a blue McLaren, and a Ferrari. Caption and alt now describe that order; McLaren and Ferrari subvariants are not inferred.
- `cnc24-2664`: removed from the collection's content records, public web assets, and generated previews at Nathan's request. The Ferrari 458 belongs in the 2025 gallery as `cnc-2314`; its 2025 record and all original uploads remain intact. The source audit below retains an exclusion note to prevent re-importing it into 2024.
- `cnc24-3269`: Nathan identified the cockpit as a **McLaren 765LT with fully exposed carbon-fiber bodywork**. This material/model identification is user-confirmed, not inferred from the weave alone.
- `cnc24-3309`: Nathan identified **McLaren 765LT Spider beside Lamborghini Murcielago**, correcting the Diablo label. Existing descriptive asset filenames are retained to preserve URLs; caption and alt carry the corrected identities.
- `cnc24-3271`: retained **McLaren 720S** after comparing Nathan's photo with [Rohana Wheels' own Liberty Walk 720S album](https://www.flickr.com/photos/rohanawheels/albums/72177720316010895). The purple bodywork, black wheels, widebody and rear wing are consistent with the documented build; this is a visual match, not chassis-level proof. [Liberty Walk's 720S kit documentation](https://libertywalk.co.jp/bodykit/mclaren-720s/) lists a replacement bonnet alongside its fenders and aero parts, so the hood is not evidence of a factory 765LT. No individual wheel model, chassis number, or tuning specification is added.

## Source audit

| Source | SHA-256 | Displayed ID |
|---|---|---|
| `cover/IMG_2659.JPG` | `28d4e9779f3364a0790538aa3ac82355ff01c98978bf0cdb01c1954f9dd43d3b` | cnc24-2659 |
| `gallery/IMG_1006.jpg` | `9ad0efa2bbc52337bca2891926fc1cbdf3ce5db872d330e480931b6a47f68a42` | cnc24-1006 |
| `gallery/IMG_1194.JPG` | `2e92d627b88d24611cfb586c23b479630c043a477cb3aa65ba2c4e44113a3e40` | cnc24-1194 |
| `gallery/IMG_1289.jpg` | `88ccea59d79da5c67f3ce4eddb81795d1e3b8b269e996901d86a9e4cbf8c634e` | cnc24-1289 |
| `gallery/IMG_1355.jpg` | `202d21408cdfa3fb64cebd1168fd6f3de396a11a8cae8b0c21c23b39a2cc602e` | cnc24-1355 |
| `gallery/IMG_1959.heic` | `377ddffae3e00221200bafa84df7044dcee90134f7f844c53de90aedd0d0ed68` | cnc24-1959 |
| `gallery/IMG_2658.JPG` | `8a76a1510e0fe454ace9cf035edca94009cc3e19b3559af8c11539e4bfbc7f12` | cnc24-2658 |
| `gallery/IMG_2659.JPG` | `28d4e9779f3364a0790538aa3ac82355ff01c98978bf0cdb01c1954f9dd43d3b` | cnc24-2659 |
| `gallery/IMG_2660.JPG` | `a36c9031bdb0637ef197b09abbd388a888b0405842a3b4a4c38885cc71ab5442` | cnc24-2660 |
| `gallery/IMG_2662.JPG` | `fc69920eb205270000ab81d8df6021eaede3039357c17282f8d0f7a44e0bce6b` | cnc24-2662 |
| `gallery/IMG_2664.JPG` | `e3b74f3e219d8d1c1d55f96bd66bdcb3f4d68999ae964d9580febe8006c9b0de` | Excluded: belongs to 2025; do not re-import into 2024 |
| `gallery/IMG_3269.jpg` | `da293b26e0b8cbce98868b77f842f2126e0480eed1f501c4c6c47fee07d61c05` | cnc24-3269 |
| `gallery/IMG_3271.JPG` | `03e06494168d87d0036f6b2fe1ed926c6afda1e1ff36f87faddb662279fa703f` | cnc24-3271 |
| `gallery/IMG_3309.jpg` | `217fdf499fb7ae155161cdba45075de0d4c59dc96467189755dee86ec407fef0` | cnc24-3309 |

## Import order (historical)

The gallery has since been curated to alternate cars and details in its opening sequence. Current display order is the photo array in `content/portfolio.ts`; the list below records the import order, not the current viewer numbering. All 12 retained photos and the cover reference are unchanged.

1. `cnc24-2659`: `/images/cars-n-copters-2024/huayra-bc-front.jpg`
2. `cnc24-1006`: `/images/cars-n-copters-2024/chiron-helicopter-profile.jpg`
3. `cnc24-1194`: `/images/cars-n-copters-2024/revuelto-front.jpg`
4. `cnc24-1289`: `/images/cars-n-copters-2024/mclaren-rear-lineup.jpg`
5. `cnc24-1355`: `/images/cars-n-copters-2024/mclaren-spider-tails.jpg`
6. `cnc24-1959`: `/images/cars-n-copters-2024/chiron-nose.jpg`
7. `cnc24-2658`: `/images/cars-n-copters-2024/huayra-blue-front.jpg`
8. `cnc24-2660`: `/images/cars-n-copters-2024/zonda-rear.jpg`
9. `cnc24-2662`: `/images/cars-n-copters-2024/huayra-front-quarter.jpg`
10. `cnc24-3269`: `/images/cars-n-copters-2024/mclaren-cockpit.jpg`
11. `cnc24-3271`: `/images/cars-n-copters-2024/liberty-walk-mclaren.jpg`
12. `cnc24-3309`: `/images/cars-n-copters-2024/mclaren-diablo-pair.jpg`

## Correction verification

- `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed. The first build attempt exited during share-image generation with a native process error; a clean rerun completed successfully without code or configuration workarounds.
- Content validation reports 89 photos and 28 videos across three collections. The 2024 gallery displays 12 photos; the duplicate Ferrari record, web image, and generated preview are absent, while the 2025 Ferrari entry and asset remain.
- Manual Edge checks confirmed the Pagani apostrophe, corrected lineup, 765LT cockpit, 720S, and 765LT Spider / Murcielago captions. Desktop and 375px mobile viewer layouts were inspected locally before publication.

## Original import verification (before the corrections above)

Passed lint, typecheck, build/content validation, and diff whitespace checks. All 14 source hashes remain unchanged. The 13-photo gallery, Pagani cover, Zonda AY viewer caption, Escape focus restoration, and layouts at 375/768/1440 were checked in Edge with no horizontal overflow. The dedicated 1200x630 OG image was inspected. Real-device Safari review and production deployment remain outstanding.
