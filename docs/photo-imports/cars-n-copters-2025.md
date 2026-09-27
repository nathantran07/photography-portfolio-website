# Cars 'N Copters 2025 import

## Scope and identity

- Nathan corrected the entire collection from 2026 to **2025** in the import conversation on 2026-09-26. Public slug: `cars-n-copters-2025`.
- October 12, 2025 is supported by the original HEIC capture timestamps and the participating organizer's [event listing](https://www.malibuautobahn.com/events/cars-n-copters). Location: Huntington Beach, California.
- Intake folder remains `photos+videos/collections/collection-02 (carsncops 26)/`; its old name is retained to avoid moving Nathan's files.
- Intake: 54 HEICs and 20 JPGs in `gallery/`, one selected JPG in `cover/`, and 28 deferred videos in `video-gallery/`.
- 59 displayed photographs. Nathan confirmed keeping one version per repeated frame. Prefer the edited JPG, with the selected Topaz cover replacing both matching gallery versions. Paired JPGs already existed in the intake before conversion; web conversions were written separately. Distinct shutter frames and alternate angles remain.
- No source files were edited, moved, or deleted. The source audit below accounts for all 75 still-image inputs, including the 16 replaced versions. Videos remain outside the site.

## Export pipeline

- Temporary tooling only: Pillow 12.3.0 and pillow-heif 1.8.0; no new application dependencies.
- [pillow-heif Pillow plugin](https://pillow-heif.readthedocs.io/en/latest/pillow-plugin.html): `register_heif_opener(thumbnails=False)`, primary image decoded at full resolution; EXIF orientation applied.
- Embedded Display P3 or sRGB ICC converted to sRGB using ImageCms. Untagged JPEGs assumed sRGB, documented in the audit. No unsupported HEIC profile was silently discarded.
- Lanczos resize to a maximum 3200px long edge without enlargement; original aspect ratios retained. Lossless PNG staging, then the existing Sharp 0.35.4 dependency exports JPEG quality 95, mozjpeg, 4:4:4. Public copies omit EXIF/GPS.
- On-page rendering retains `PortfolioImage` / `next/image`, responsive sizes, lazy loading, and existing viewer quality. Embedded blur previews regenerated; OG generated separately at 1200x630.
- Chosen cover: `IMG_2293-topaz-sharpen-upscale-2x.jpg`. Focal point x=50, y=72 favors the Valkyrie and helicopter intersection when cropped horizontally.

## Caption evidence

All displayed images were visually reviewed. Captions distinguish visible details from model specifications. No chassis number, owner identity, model year, unconfirmed power figure, wheel brand, or suspension modification is inferred.

- `cnc-1978`, `cnc-3307`, `cnc-1981`, `cnc-1982`, `cnc-1983`, `cnc-1985`: visible Draken lettering plus [Koenigsegg Registry's Draken record](https://www.koenigsegg-registry.com/registry/137) support the name, Agera RS model, and gray body/white/red accents. Chassis number is deliberately omitted. [Koenigsegg Agera RS](https://www.koenigsegg.com/model/agera-rs) supports the series of 25 customer cars; factory/development/replacement exceptions are not presented as a total worldwide count.
- `cnc-cover`, `cnc-2059`, `cnc-2098`, `cnc-2099`, `cnc-2151`, `cnc-2294`, `cnc-2180`, `cnc-2292`, `cnc-2295`: [Aston Martin's Valkyrie design release](https://media.astonmartin.com/aston-martin-valkyrie-secrets-of-exterior-and-interior-design-revealed/?lang=eng) supports the underfloor tunnels, diffuser and teardrop cockpit. Other wording describes visible body shapes.
- `cnc-2089`, `cnc-3276`, `cnc-2303`: Speedtail name visible at rear; [McLaren Charlotte model page](https://www.charlottemclaren.com/models/speedtail/) supports the central three-seat layout, elongated tail and 106-car series. No claim about this car's individual production number.
- `cnc-2140`, `cnc-2312`, `cnc-2149`: Ferrari Daytona SP3's distinctive shape and visible livery. [Ferrari technical specifications](https://www.ferrari.com/content/dam/ferrari-fcom/old/pdf/cs_ferrari_daytona_sp3_gbr.pdf) support the 6.5-liter V12; no individual chassis or provenance claim.
- `cnc-2188`, `cnc-2196`, `cnc-2198`, `cnc-2199`, `cnc-2302`: [Lamborghini's model archive](https://preowned.lamborghini.com/en_gb/models/few_off) supports the Centenario coupe's 20-car production series and Ferruccio centenary. Other captions describe visible blue trim and body details, without guessing material or wheel specification.
- `cnc-2163`, `cnc-2298`: FE lettering on the wing and Vader FE inside the cabin; [Koenigsegg history](https://www.koenigsegg.com/history) and [registry model history](https://www.koenigsegg-registry.com/models/agera-rs) support the Final Edition designation and bespoke aero. No chassis number or individual output inferred.
- `cnc-3301-2`: M3 badge visible on the seat. `cnc-2314`: Nathan confirmed the cockpit is a **Ferrari 458**, correcting the initial 488 identification. The earlier claim of a visible 488 badge was incorrect. Caption and alt use 458 Spider; the existing asset filename is retained to preserve its URL. `cnc-2124`: 458 Spider rear with three central exhausts; no claim that these depict different cars.
- `cnc-2027`: Nathan confirmed the helicopter cockpit. Caption now describes its flight instruments and controls without comparing them to a car's steering wheel.
- `cnc-2135`: Nathan confirmed **Lamborghini Aventador SV**. Caption and alt use the confirmed trim; the caption describes the visible red SV graphics.
- `cnc-3299` (`IMG_3299.JPG`, alternate export of `IMG_1990.HEIC`): Nathan explicitly identified the black car as a **Lamborghini Revuelto**, correcting the initial Supra misidentification. Caption and alt now use Revuelto; no trim, wheel brand, material, power, or aftermarket-kit claim.
- `cnc-2122`: sheriff-liveried C6 with a ZR1 fender badge; the underlying trim is not asserted from a badge on a modified build. `cnc-2113`: Shelby dash signature/badge; exact model/replica status unspecified. `cnc-2306`: McLaren model variant unspecified beside Aston Martin Vantage.
- `cnc-2152`, `cnc-2213`, `cnc-2217`, `cnc-2225`, `cnc-3293`: Koenigsegg details without an unverified subvariant, chassis, power figure or nickname.
- GT-R Liberty Walk branding is visible; no suspension system, engine tune, wheel brand or licensed-kit provenance inferred. All remaining captions use recognizable model families and visible details only.

## Display order and source map

All destinations are under `public/images/cars-n-copters-2025/`.

| Order | Photo ID | Source | Web export | Dimensions |
| --- | --- | --- | --- | --- |
| 1 | `cnc-cover` | `cover/IMG_2293-topaz-sharpen-upscale-2x.jpg` | `valkyrie-cover.jpg` | 2399 x 3200 |
| 2 | `cnc-1978` | `gallery/IMG_1978.HEIC` | `agera-draken-front.jpg` | 2400 x 3200 |
| 3 | `cnc-3307` | `gallery/IMG_3307.jpg` | `agera-draken-profile.jpg` | 2400 x 3200 |
| 4 | `cnc-1981` | `gallery/IMG_1981.HEIC` | `agera-draken-side.jpg` | 2400 x 3200 |
| 5 | `cnc-1982` | `gallery/IMG_1982.heic` | `agera-draken-head-on.jpg` | 2400 x 3200 |
| 6 | `cnc-1983` | `gallery/IMG_1983.HEIC` | `agera-draken-three-quarter.jpg` | 2400 x 3200 |
| 7 | `cnc-1985` | `gallery/IMG_1985.HEIC` | `agera-draken-detail.jpg` | 2400 x 3200 |
| 8 | `cnc-3301-2` | `gallery/IMG_3301 2.JPG` | `bmw-m3-seats.jpg` | 2400 x 3200 |
| 9 | `cnc-1988` | `gallery/IMG_1988.HEIC` | `nissan-gtr-lineup.jpg` | 2400 x 3200 |
| 10 | `cnc-3299` | `gallery/IMG_3299.JPG` | `revuelto-rear.jpg` | 2400 x 3200 |
| 11 | `cnc-2307` | `gallery/IMG_2307.JPG` | `bmw-show-lineup.jpg` | 2400 x 3200 |
| 12 | `cnc-2008` | `gallery/IMG_2008.heic` | `bmw-cockpit.jpg` | 2400 x 3200 |
| 13 | `cnc-2009` | `gallery/IMG_2009.heic` | `audi-r8-lineup.jpg` | 2400 x 3200 |
| 14 | `cnc-2014` | `gallery/IMG_2014.HEIC` | `viper-profile.jpg` | 2400 x 3200 |
| 15 | `cnc-2027` | `gallery/IMG_2027.HEIC` | `helicopter-cockpit.jpg` | 2400 x 3200 |
| 16 | `cnc-2036` | `gallery/IMG_2036.HEIC` | `huracan-helicopter.jpg` | 2400 x 3200 |
| 17 | `cnc-2049` | `gallery/IMG_2049.HEIC` | `porsche-gt3-rs-helicopter.jpg` | 2400 x 3200 |
| 18 | `cnc-2059` | `gallery/IMG_2059.HEIC` | `valkyrie-rear-wheel.jpg` | 2400 x 3200 |
| 19 | `cnc-2089` | `gallery/IMG_2089.HEIC` | `speedtail-rear-three-quarter.jpg` | 2400 x 3200 |
| 20 | `cnc-2098` | `gallery/IMG_2098.HEIC` | `valkyrie-diffuser-low.jpg` | 2400 x 3200 |
| 21 | `cnc-2099` | `gallery/IMG_2099.HEIC` | `valkyrie-diffuser-wide.jpg` | 2400 x 3200 |
| 22 | `cnc-2113` | `gallery/IMG_2113.HEIC` | `shelby-cockpit.jpg` | 2400 x 3200 |
| 23 | `cnc-3276` | `gallery/IMG_3276.jpg` | `speedtail-cockpit.jpg` | 2400 x 3200 |
| 24 | `cnc-2122` | `gallery/IMG_2122.HEIC` | `corvette-sheriff.jpg` | 2400 x 3200 |
| 25 | `cnc-2124` | `gallery/IMG_2124.HEIC` | `ferrari-458-spider-rear.jpg` | 2400 x 3200 |
| 26 | `cnc-2314` | `gallery/IMG_2314.JPG` | `ferrari-488-spider-cockpit.jpg` | 2400 x 3200 |
| 27 | `cnc-2126` | `gallery/IMG_2126.HEIC` | `aventador-urus.jpg` | 2400 x 3200 |
| 28 | `cnc-2131` | `gallery/IMG_2131.HEIC` | `gtr-rear-lineup.jpg` | 2400 x 3200 |
| 29 | `cnc-2313` | `gallery/IMG_2313.jpg` | `liberty-walk-gtr-low.jpg` | 2284 x 3045 |
| 30 | `cnc-2134` | `gallery/IMG_2134.HEIC` | `liberty-walk-gtr-front.jpg` | 2400 x 3200 |
| 31 | `cnc-2135` | `gallery/IMG_2135.HEIC` | `aventador-profile.jpg` | 2400 x 3200 |
| 32 | `cnc-2140` | `gallery/IMG_2140.HEIC` | `daytona-sp3-rear.jpg` | 2400 x 3200 |
| 33 | `cnc-2312` | `gallery/IMG_2312.jpg` | `daytona-sp3-side-rear.jpg` | 1981 x 2642 |
| 34 | `cnc-2149` | `gallery/IMG_2149.HEIC` | `daytona-sp3-front.jpg` | 2400 x 3200 |
| 35 | `cnc-2151` | `gallery/IMG_2151.HEIC` | `valkyrie-show-context.jpg` | 2400 x 3200 |
| 36 | `cnc-2152` | `gallery/IMG_2152.HEIC` | `koenigsegg-cockpit.jpg` | 2400 x 3200 |
| 37 | `cnc-2306` | `gallery/IMG_2306.JPG` | `mclaren-aston-lineup.jpg` | 2400 x 3200 |
| 38 | `cnc-2296` | `gallery/IMG_2296.jpg` | `agera-door-detail.jpg` | 2028 x 2704 |
| 39 | `cnc-2163` | `gallery/IMG_2163.HEIC` | `agera-final-editions.jpg` | 2400 x 3200 |
| 40 | `cnc-2294` | `gallery/IMG_2294.jpg` | `valkyrie-rear.jpg` | 2096 x 2794 |
| 41 | `cnc-2180` | `gallery/IMG_2180.HEIC` | `valkyrie-rear-close.jpg` | 2400 x 3200 |
| 42 | `cnc-2292` | `gallery/IMG_2292.jpg` | `valkyrie-front.jpg` | 2323 x 3097 |
| 43 | `cnc-2188` | `gallery/IMG_2188.HEIC` | `centenario-rear.jpg` | 2400 x 3200 |
| 44 | `cnc-2303` | `gallery/IMG_2303.jpg` | `speedtail-rear.jpg` | 1611 x 2148 |
| 45 | `cnc-2196` | `gallery/IMG_2196.HEIC` | `centenario-front-wide.jpg` | 2400 x 3200 |
| 46 | `cnc-2198` | `gallery/IMG_2198.HEIC` | `centenario-front-low.jpg` | 2400 x 3200 |
| 47 | `cnc-2199` | `gallery/IMG_2199.HEIC` | `centenario-nose.jpg` | 2400 x 3200 |
| 48 | `cnc-2302` | `gallery/IMG_2302.jpg` | `centenario-wheel.jpg` | 1937 x 2583 |
| 49 | `cnc-2205` | `gallery/IMG_2205.HEIC` | `mustang-hypercar-lineup.jpg` | 2400 x 3200 |
| 50 | `cnc-2206` | `gallery/IMG_2206.HEIC` | `mustang-centenario-noses.jpg` | 2400 x 3200 |
| 51 | `cnc-2213` | `gallery/IMG_2213.HEIC` | `koenigsegg-rear-suspension.jpg` | 2400 x 3200 |
| 52 | `cnc-2217` | `gallery/IMG_2217.HEIC` | `koenigsegg-engine-cover.jpg` | 2400 x 3200 |
| 53 | `cnc-2225` | `gallery/IMG_2225.HEIC` | `koenigsegg-engine-badge.jpg` | 2400 x 3200 |
| 54 | `cnc-2231` | `gallery/IMG_2231.HEIC` | `huracan-street.jpg` | 2400 x 3200 |
| 55 | `cnc-2295` | `gallery/IMG_2295.jpg` | `valkyrie-tail.jpg` | 2117 x 2823 |
| 56 | `cnc-2298` | `gallery/IMG_2298.jpg` | `agera-vader-interior.jpg` | 2208 x 2944 |
| 57 | `cnc-2310` | `gallery/IMG_2310.jpg` | `huracan-livery.jpg` | 1870 x 2494 |
| 58 | `cnc-3291` | `gallery/IMG_3291.jpg` | `porsche-gt3-rs-front.jpg` | 2400 x 3200 |
| 59 | `cnc-3293` | `gallery/IMG_3293.jpg` | `koenigsegg-engine-rear.jpg` | 2400 x 3200 |

## Source audit

SHA-256 hashes verified immediately before import; all original files retained.

| Source | Profile | Disposition | SHA-256 |
| --- | --- | --- | --- |
| `cover/IMG_2293-topaz-sharpen-upscale-2x.jpg` | Display P3 | Displayed as cnc-cover | `f7cdaaed861f84d917648287a71778bf6275adcf4b4bbbf964430e9e1ec13766` |
| `gallery/IMG_1978.HEIC` | Display P3 | Displayed as cnc-1978 | `3ba1c0c4f24bd8887f3b46117e65fc67797946494ca872808baaab0eb4180073` |
| `gallery/IMG_1979.HEIC` | Display P3 | Replaced by edited version cnc-3307 | `90b742986162f6a73976f10c1dbcb028ccdc83ceff225ae513518fab7b9b6ab3` |
| `gallery/IMG_1981.HEIC` | Display P3 | Displayed as cnc-1981 | `46f5d2b2b219d1e3a0fc4104e20e05621fb5a5c92d6aef5e7dbf3d13ce1d416b` |
| `gallery/IMG_1982.heic` | Display P3 | Displayed as cnc-1982 | `8c2e407cb09566921c28842fa4a32842001052934f28517237d1094e61e64fe9` |
| `gallery/IMG_1983.HEIC` | Display P3 | Displayed as cnc-1983 | `372684895d6ae77aa9824bbadd174d4880431b16e28958222ddb1895e661aedb` |
| `gallery/IMG_1985.HEIC` | Display P3 | Displayed as cnc-1985 | `bb20678e4f032c340cbd62e71a39a513f3c3374350e9a5688ff244df242c74a5` |
| `gallery/IMG_1986.heic` | Display P3 | Replaced by edited version cnc-3301-2 | `fff98c8306a4ba26858ac7c8b39f30be9ebc0979d7530edd2b129a6f2153d77e` |
| `gallery/IMG_1988.HEIC` | Display P3 | Displayed as cnc-1988 | `2712b366ff33ba775f79a3b73de924df85ab4275de5649fcc2a6c7e1d6423845` |
| `gallery/IMG_1990.HEIC` | Display P3 | Replaced by edited version cnc-3299 | `24df768dbb351c57191c7c24ce55816b1edf04085d42f2e9ab1b65a270e10224` |
| `gallery/IMG_2007.HEIC` | Display P3 | Replaced by edited version cnc-2307 | `04e589a75e8bbf2d1b232cd252fc90ba9627b5544041bfdde40574920d8c6040` |
| `gallery/IMG_2008.heic` | Display P3 | Displayed as cnc-2008 | `67d7b8fc70f2302b9d621e376123cc2ade3c5fb2c9b30169438fce79ac8049e8` |
| `gallery/IMG_2009.heic` | Display P3 | Displayed as cnc-2009 | `1cf8c688dd9b26aa2792b2a4f02210c53384a3164794b29d4f268ba8c7604e43` |
| `gallery/IMG_2014.HEIC` | Display P3 | Displayed as cnc-2014 | `565046fce365154b84206e67087d95d71affefd9013e895900fa4dd4eecd4b97` |
| `gallery/IMG_2027.HEIC` | Display P3 | Displayed as cnc-2027 | `15c311c9dd2afb4a633b1f935fd01cff92f317ee5523b2d6b8bc1195a00c1fce` |
| `gallery/IMG_2036.HEIC` | Display P3 | Displayed as cnc-2036 | `8c1b240b58300708a4fff1f5d5bc173d39d6e9ac2bdc0a9914b7ca15675f6147` |
| `gallery/IMG_2049.HEIC` | Display P3 | Displayed as cnc-2049 | `153b99cecb7660ba57c50252eeb207c6a2f24d53ea46a1d88755ca21d5edf82c` |
| `gallery/IMG_2059.HEIC` | Display P3 | Displayed as cnc-2059 | `fa930ea58e8da42bd4c36d3aef97b1fbd6eefb2c9024aee581eb1ce68b360346` |
| `gallery/IMG_2089.HEIC` | Display P3 | Displayed as cnc-2089 | `e90968fdaf7cb4ed61cb774bf5cf8b218b928612d9a3be7267f725b8e9e2b966` |
| `gallery/IMG_2098.HEIC` | Display P3 | Displayed as cnc-2098 | `4aa496425d48cfeb71ea017dcf18af6a8677b0959b35d5c3c87517543455d7b6` |
| `gallery/IMG_2099.HEIC` | Display P3 | Displayed as cnc-2099 | `26fd3093b4856a973b3e90bfa5807605aa5192081a66f72364b89069991d802c` |
| `gallery/IMG_2113.HEIC` | Display P3 | Displayed as cnc-2113 | `6f7608028e21586328de8f7698590151b85b71ae7c63fe667dc044087c59afec` |
| `gallery/IMG_2115.HEIC` | Display P3 | Replaced by edited version cnc-3276 | `be2487839fb3de35a27fc646dad0b9a4d67090d86f15dd84c12a0a3da19a722f` |
| `gallery/IMG_2122.HEIC` | Display P3 | Displayed as cnc-2122 | `46cab851a7420dbead91726b915010cf6d2fb7c8fa2f98685a5de0e8669b9418` |
| `gallery/IMG_2124.HEIC` | Display P3 | Displayed as cnc-2124 | `4cc9cafa3715e46dc4bdb4db8a623d38a1fa04b23346264e1b61149d80146e5c` |
| `gallery/IMG_2125.HEIC` | Display P3 | Replaced by edited version cnc-2314 | `64085a12106b8a788c8c37e1267ec68af989d371931f18ecd0e66ee4278169fc` |
| `gallery/IMG_2126.HEIC` | Display P3 | Displayed as cnc-2126 | `682070aa2eeb01c0974417f2c3dda222f2d81800df61cec2057d094367c45386` |
| `gallery/IMG_2131.HEIC` | Display P3 | Displayed as cnc-2131 | `a441a1cefc96c31f5408c27edad7375261defcc0f38ce991bd2dbd8080db53c8` |
| `gallery/IMG_2133.HEIC` | Display P3 | Replaced by edited version cnc-2313 | `285ba4ab01eb86bd136c3aaa94037b018670b924ce366323b31a4db75bf9dba1` |
| `gallery/IMG_2134.HEIC` | Display P3 | Displayed as cnc-2134 | `7e028d2cb3353c5f2599c40d36f0e12605f048480112e3eb7b4c5dfe604bf63a` |
| `gallery/IMG_2135.HEIC` | Display P3 | Displayed as cnc-2135 | `a3ec270baee734575f5f442b333d0ba6a3473aeaf1d40787ed2f54a83576feba` |
| `gallery/IMG_2140.HEIC` | Display P3 | Displayed as cnc-2140 | `b83c9318e7994a8dbc8584a17cec207082f377f69d94f2a93689f9d9d13e3df6` |
| `gallery/IMG_2144.HEIC` | Display P3 | Replaced by edited version cnc-2312 | `9be46054c8a61ed4df4dc121ea26b09fa2ef1f64cb65be15e3e00a9c1a11e384` |
| `gallery/IMG_2149.HEIC` | Display P3 | Displayed as cnc-2149 | `09da5dff0adbdf759a91e8fabf6522e8d2bf14bd7e527af264d53f23561f1c4a` |
| `gallery/IMG_2151.HEIC` | Display P3 | Displayed as cnc-2151 | `7f72e965b857d2bf46d6dd00c9cc838d57f02cfbde8e7656764f4e151b9f52af` |
| `gallery/IMG_2152.HEIC` | Display P3 | Displayed as cnc-2152 | `0784acd9d1c512a11c9d3f45e8da49c5aa8a283b54b051f0b92193dd26aee8f1` |
| `gallery/IMG_2153.HEIC` | Display P3 | Replaced by edited version cnc-2306 | `e180ee85c02a76de79174d7f84b2001e00913be2dae9ef1f5d9c07e93171f3b6` |
| `gallery/IMG_2160.HEIC` | Display P3 | Replaced by edited version cnc-2296 | `b321039f17184a2209e2c0c7be4bb009a6055a4b7b6ce33722518770031d4b36` |
| `gallery/IMG_2163.HEIC` | Display P3 | Displayed as cnc-2163 | `10a32dc958749164cec02c199f0732d7d39cc13aa1717ff85e515f9161a08ca5` |
| `gallery/IMG_2176.HEIC` | Display P3 | Replaced by edited version cnc-2294 | `3b6a15258cd8345bbe615cd9a2d5bf4f9f66c6898e9bea9eee920a8482929f98` |
| `gallery/IMG_2180.HEIC` | Display P3 | Displayed as cnc-2180 | `6e9e62fd0d1b6b1a58757a0964e51cf6a6417fc6fe48f2845d227b348633e98c` |
| `gallery/IMG_2186.HEIC` | Display P3 | Replaced by edited version cnc-2292 | `492aa1b075da167647bf0f638ea2585bd142d6786af7c8d6b9ebe26807799529` |
| `gallery/IMG_2188.HEIC` | Display P3 | Displayed as cnc-2188 | `e17e7432d3637cb58ae8638cc218f93038d8cdf24c039d21d6484ce774186fba` |
| `gallery/IMG_2191.HEIC` | Display P3 | Replaced by edited version cnc-2303 | `ff6268a773773da111873d158f21b1e3d9ab263dc682fa9c787e93105f5bfe7c` |
| `gallery/IMG_2196.HEIC` | Display P3 | Displayed as cnc-2196 | `5b1650d881a57cf2003c6003bee0a3343e9314a5a2e06c9f062b006f6c460c6b` |
| `gallery/IMG_2198.HEIC` | Display P3 | Displayed as cnc-2198 | `ca69a0a1a1d9f96c0f1fa5949499736d5c4834d8a231629a5801a8a0416432d0` |
| `gallery/IMG_2199.HEIC` | Display P3 | Displayed as cnc-2199 | `e7104d523bb314f9ff9fcbf235726a5f596eac8dbd20af0e1543c4f51af3f4e1` |
| `gallery/IMG_2203.HEIC` | Display P3 | Replaced by edited version cnc-2302 | `66d2490414fac2405e683c5fcd046ef1794a46eab36e6370e8e4b48b588205c6` |
| `gallery/IMG_2205.HEIC` | Display P3 | Displayed as cnc-2205 | `9a1ad4c42acfc94693f75533bfb3157caa8d796d799280a2bdc4f558b4bb7390` |
| `gallery/IMG_2206.HEIC` | Display P3 | Displayed as cnc-2206 | `89495ed70de73664bee9144b87745c8e122e8aa46fdcda93bf53017c76ae5e90` |
| `gallery/IMG_2212.HEIC` | Display P3 | Replaced by edited version cnc-cover | `60259b897e8b0de1c81a4af6c4a35c82a13a99aaafa9838d2dead3abc8d3844f` |
| `gallery/IMG_2213.HEIC` | Display P3 | Displayed as cnc-2213 | `d05683428a5ab4613cf031299b2323c9aaf7f68acf48decb46728f4f9dc2cc3b` |
| `gallery/IMG_2217.HEIC` | Display P3 | Displayed as cnc-2217 | `420079cb069bfc9113d6f090993c13a16c9522e03ab3c872a8827dcc134f9f42` |
| `gallery/IMG_2225.HEIC` | Display P3 | Displayed as cnc-2225 | `062c8ab120edd6f5f50fb530f3385b86613f60174dec4003074bc1f358a60905` |
| `gallery/IMG_2231.HEIC` | Display P3 | Displayed as cnc-2231 | `e6f190d79c6d6892eebe765c03618d3bb0cbbf9e7eee7d0ec3a32e712e5a12fd` |
| `gallery/IMG_2292.jpg` | Display P3 | Displayed as cnc-2292 | `010de555957446293a22aec3e45982acd90c4f154d3d0d1acc027a65e8035df3` |
| `gallery/IMG_2293.jpg` | Display P3 | Replaced by edited version cnc-cover | `abf74cc801f8c3f2c2ffdf4d0083674bc88626738956207939ad15e89b232633` |
| `gallery/IMG_2294.jpg` | Display P3 | Displayed as cnc-2294 | `0ea4e5fd4ea98901b34687c7c9c4239a65e93103233d4487b2e17cf2817d6203` |
| `gallery/IMG_2295.jpg` | Display P3 | Displayed as cnc-2295 | `bf7a822ce680f56a388c61988c0551b7c90f41016916bde833df3716c078bc48` |
| `gallery/IMG_2296.jpg` | Display P3 | Displayed as cnc-2296 | `121d1649261e1dfddea80c39a0b9816d81309bf77afda8e70b6ca5227221a6c0` |
| `gallery/IMG_2298.jpg` | Display P3 | Displayed as cnc-2298 | `3a84c0bab1ce48687e2c14daa185c1263e1d4e85763c4bfc8cd4374002c7de4d` |
| `gallery/IMG_2302.jpg` | Display P3 | Displayed as cnc-2302 | `99e031508979c547674f95033f33a62b858d4a37bda5a6e8fe596a25aed799ab` |
| `gallery/IMG_2303.jpg` | Display P3 | Displayed as cnc-2303 | `38012a9a733e39ccd6df65128b731b5f1673d4826a56de819d534a353124f0bf` |
| `gallery/IMG_2306.JPG` | Untagged JPEG; assumed sRGB | Displayed as cnc-2306 | `78137351f0ca69da6bae0a14a42fed0c09bb4dd3b3170910e2d575a556217eec` |
| `gallery/IMG_2307.JPG` | Untagged JPEG; assumed sRGB | Displayed as cnc-2307 | `95039c4ff904bb3cdaf3ab48ce992f265463cbe6ee7ad0fd8d17f004c25593de` |
| `gallery/IMG_2310.jpg` | Display P3 | Displayed as cnc-2310 | `c2e95c060e5f6df0588a86bad527d470efb71e1360c3439aae97bb0293dbc903` |
| `gallery/IMG_2312.jpg` | Display P3 | Displayed as cnc-2312 | `e2a70ce03fea0034f964b7e66660fb36c6dfe97f9658995cdcaa2e66006f7b9b` |
| `gallery/IMG_2313.jpg` | Display P3 | Displayed as cnc-2313 | `2933fbe3c78f28ad13f2b3fff1cf3732804625b3cd37125a86564d1816854236` |
| `gallery/IMG_2314.JPG` | Untagged JPEG; assumed sRGB | Displayed as cnc-2314 | `1df32c1fb0dd93681b78b6c603ea811cb5c558bd261f338331791d94158c3983` |
| `gallery/IMG_3276.jpg` | Display P3 | Displayed as cnc-3276 | `d418443753518d6b51fa99b268c8785d4fd4bbcb4b33581ec00078d39bc51075` |
| `gallery/IMG_3291.jpg` | Display P3 | Displayed as cnc-3291 | `7499fc0990cdec56a8bc48c0e6eb33424f94bee4c10c473ffbe3d5952ffa1efa` |
| `gallery/IMG_3293.jpg` | Display P3 | Displayed as cnc-3293 | `12bef9c9d4f2587b4d07847dc0f8e29d28fb22db02fac7405a6c1a277239a83c` |
| `gallery/IMG_3299.JPG` | Untagged JPEG; assumed sRGB | Displayed as cnc-3299 | `d44e76d86076e4795546c4a18b6800eea860c0afd66c8082511ae586381d4560` |
| `gallery/IMG_3301 2.JPG` | IEC 61966-2.1 Default RGB colour space - sRGB | Displayed as cnc-3301-2 | `276234fe2eb9a463d0225a995fd6db4f0693aab21379ca9af39badde8a96ab05` |
| `gallery/IMG_3307.jpg` | Display P3 | Displayed as cnc-3307 | `712cf78449624dd0bfc5692becc1ac2868bac74b6f1e76a880e2f2bc47276562` |

## Verification

- Passed: npm.cmd run lint, npm.cmd run typecheck, npm.cmd run build (3 shoots / 83 gallery photos, 85 image previews), and git diff --check.
- 59 public JPEGs, 114.4 MB combined; every export fits within 3200px, with EXIF/GPS absent. All 75 intake still-image SHA-256 hashes unchanged after import.
- Gallery page and share image return HTTP 200. Share image is JPEG 1200x630; metadata contains an absolute OG URL, dimensions, descriptive alt, and summary_large_image Twitter card.
- Desktop cover/gallery and desktop/mobile viewer reviewed. Arrow navigation changes image and caption; Escape restores the original opener. No horizontal overflow measured at 375, 768, or 1440px. Viewer uses object-fit: contain; captions fit the 375px viewport.
- During review, two image-optimizer requests stalled beyond 25 seconds while the source JPGs returned in 10-80ms. Separate Sharp AVIF conversion completed in 555-641ms. Restarting the dev process restored the same requests in 485-823ms. A subsequent check of all 59 optimized AVIF URLs at width 640 / quality 85 returned HTTP 200 (maximum 384ms, warm cache). No image-quality or component workaround was added.
- Exact trigger for the old optimizer process stall is unproven. The live import initially exposed content before all exports existed, causing temporary 404s; future imports should finish exporting before updating live content. The final build was run with the dev server stopped, then the preview restarted.
- After the final restart, photographs 15 and 16 rendered clearly in the desktop viewer; both images reported complete decoding with nonzero natural dimensions and no remaining blur background. Photograph 10 displayed the corrected Lamborghini Revuelto caption. Escape restored the gallery opener.
- A final mobile-cover screenshot refresh was interrupted by browser-control timeouts; earlier responsive measurements and mobile viewer review passed. The updated desktop gallery is left open for Nathan at http://127.0.0.1:3000/work/cars-n-copters-2025.
