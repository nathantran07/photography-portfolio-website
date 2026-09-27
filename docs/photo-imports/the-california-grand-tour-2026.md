# The California Grand Tour 2026 — photo import

Imported September 26, 2026. Event title and May 23, 2026 date confirmed against [The Exotics Network's official gallery](https://theexoticsnetwork.pixieset.com/thecaliforniagrandtour2026/). Only Nathan's local uploads are used as photographs.

- Intake: `photos+videos/collections/collection-01 (exoticsnetwork)/`; originals remain untouched and ignored by Git.
- Web exports: `public/images/the-california-grand-tour-2026/`.
- Route: `/work/the-california-grand-tour-2026`; replaces the first placeholder collection.
- Export settings: baked orientation, sRGB, maximum 3200px on the longest edge without enlargement, JPEG quality 95, mozjpeg, 4:4:4 chroma. Metadata stripped. On-page delivery continues through `next/image` with responsive AVIF/WebP.
- Order: chosen cover first, then the 17 gallery files in filename order. Both `IMG_0545` crops are retained for review.
- Cover: `cgt-0485`, focal point 50% / 74%; full portrait remains available in the gallery and viewer. Homepage opening frame remains separate.
- Remaining two collections are placeholders, so search indexing stays disabled.

Verification: `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd run build`, and `git diff --check` passed. The build validates 3 collections / 30 photographs, including 18 real event photos. Desktop and 375px mobile browser checks confirmed no horizontal overflow, the event date, responsive image requests, portrait proportions, viewer next/previous navigation, Escape-to-close, and focus restoration. The generated 1200x630 share image was reviewed. Changes remain local; no commit or deployment was performed.

| Order | Source file within intake | Web export | Dimensions |
| --- | --- | --- | --- |
| 1 | `cover/IMG_0485-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-senna-cover.jpg` | 2560 × 3200 |
| 2 | `gallery/IMG_0418-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-senna-cockpit.jpg` | 2560 × 3200 |
| 3 | `gallery/IMG_0428-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-senna-rear.jpg` | 2560 × 3200 |
| 4 | `gallery/IMG_0493-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-senna-front-three-quarter.jpg` | 2560 × 3200 |
| 5 | `gallery/IMG_0503-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-senna-front.jpg` | 2560 × 3200 |
| 6 | `gallery/IMG_0507-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-senna-raised-door.jpg` | 2560 × 3200 |
| 7 | `gallery/IMG_0510-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-f1-gtr-front-detail.jpg` | 2560 × 3200 |
| 8 | `gallery/IMG_0520-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-f1-gtr-front.jpg` | 2560 × 3200 |
| 9 | `gallery/IMG_0525-topaz-rawdenoise-upscale-2x.jpg` | `mclaren-f1-gtr-three-quarter.jpg` | 2560 × 3200 |
| 10 | `gallery/IMG_0542-topaz-rawdenoise-upscale-2x.jpg` | `porsche-911-gt3-front.jpg` | 2400 × 3200 |
| 11 | `gallery/IMG_0545-topaz-rawdenoise-upscale-2x-1.jpg` | `porsche-911-gt3-wide-composition.jpg` | 2133 × 3200 |
| 12 | `gallery/IMG_0545-topaz-rawdenoise-upscale-2x.jpg` | `porsche-911-gt3-three-quarter.jpg` | 2400 × 3200 |
| 13 | `gallery/IMG_0548-topaz-rawdenoise-upscale-2x.jpg` | `porsche-911-gt3-wheel.jpg` | 2400 × 3200 |
| 14 | `gallery/IMG_0549.jpg` | `toyota-supra-rear-three-quarter.jpg` | 2560 × 3200 |
| 15 | `gallery/IMG_0554.jpg` | `toyota-supra-side-rear.jpg` | 2560 × 3200 |
| 16 | `gallery/IMG_0561.jpg` | `toyota-supra-front.jpg` | 2560 × 3200 |
| 17 | `gallery/IMG_0569.jpg` | `toyota-supra-rear-in-sunlight.jpg` | 2560 × 3200 |
| 18 | `gallery/IMG_0579.jpg` | `toyota-supra-rear.jpg` | 2133 × 3200 |

## Captions and confirmed identities

Updated September 26, 2026. Nathan identified the white car as a McLaren Senna GTR and the FINA car as McLaren F1 GTR Longtail chassis 23R. He confirmed the silver Porsche is a 991.2 GT3 and the pink car is a Toyota GR Supra 3.0 with a Liberty Walk widebody, Rohana wheels, and air suspension. The specific Rohana wheel model is unconfirmed. He also identified the red car beside the Porsche in image 11 (`cgt-0545-wide`) as a Chevrolet Corvette C8; trim is unconfirmed, so neither Z06 nor Stingray is asserted. Those are user-provided identifications of the photographed cars; the sources below verify model facts and chassis history, not the identity of a car from a photo alone.

Visible viewer copy now uses `Photo.caption`; required `alt` remains a separate visual description. Keep captions short and tailored to enthusiasts, with deeper research reserved for cars where the history adds something. See `AGENTS.md` for the ongoing writing standard.

| Photo IDs | Caption basis |
| --- | --- |
| `cgt-0485`, `cgt-0418`, `cgt-0428`, `cgt-0493`, `cgt-0503` | [McLaren's March 8, 2019 production Senna GTR press release, reproduced by Supercars.net](https://www.supercars.net/blog/mclaren-senna-gtr/): 75 cars, carbon-fiber racing seat, quick-release wheel, over 1,000 kg peak downforce, 4.0-liter twin-turbo V8 / 814 bhp, and development unconstrained by a racing rulebook. Nathan supplied the carbon-fiber wheel identification; IKEA is the confirmed visible building. |
| `cgt-0507` | Exposed carbon-fiber hood: visible in the photograph and explicitly identified by Nathan. |
| `cgt-0510` | [Ultimatecarpage's chassis 23R history](https://www.ultimatecarpage.com/chassis/2455/McLaren-F1-GTR-Longtail-23R.html): ten Longtails built; four BMW works cars run by Schnitzer in 1997. |
| `cgt-0520`, `cgt-0525` | [Racing Sports Cars' chassis 23R results](https://www.racingsportscars.com/chassis/archive/GTR-23R.html): Kox/Ravaglia, BMW/Schnitzer, Silverstone victory and Sebring second place in 1997. |
| `cgt-0542` | [Porsche's 2017 GT3 engine article](https://newsroom.porsche.com/en/christophorus/issue-381/porsche-christophorus-911-gt3-engine-13662.html): naturally aspirated 4.0-liter flat-six and 9,000 rpm. |
| `cgt-0545-wide` | [Porsche's GT3 history](https://newsroom.porsche.com/en_US/products/porsche-celebrates-20-years-911-gt3-18389.html): the six-speed manual returned as an option for the 991.2. This is a model-level fact; the photographed car's transmission is not known or claimed. |
| `cgt-0545` | [Porsche's 2017 GT3 announcement](https://newsroom.porsche.com/en/products/porsche-911-gt3-world-premiere-geneva-motor-show-gims-2017-13466.html): the road car's 4.0-liter engine is closely related to the GT3 Cup engine. |
| `cgt-0548` | Visible multi-spoke wheels and GT3 side script. Wheel brand, brake material, and suspension modifications are not established. |
| `cgt-0549`, `cgt-0554`, `cgt-0569`, `cgt-0579` | Nathan's confirmed Liberty Walk widebody, Rohana wheels, and air suspension, plus visible deep-dish wheels, exposed-fastener overfenders, and GT-style wing. No kit version, wheel model, material, or aerodynamic performance is inferred. |
| `cgt-0561`, `cgt-0569` | [Toyota's Supra history](https://pressroom.toyota.com/2024-gr-supra-celebrates-45-years-of-legendary-power/): the A90's 3.0-liter B58 turbocharged straight-six and shared Z4 platform. No model year, transmission, tune, or power figure is assigned to this modified car. |
