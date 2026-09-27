# Cars 'N Copters 2025 video import

- Nathan approved adding the 28 uploaded videos to the website on 2026-09-26, expanding the original photography-only release.
- All 28 originals remain under `photos+videos/collections/collection-02 (carsncops 25)/video-gallery/`. The two edited sequences and 26 camera clips are distinct files; no video deduplication was applied.
- Web copies: 554.3 MiB total, maximum 53.7 MiB per file. H.264, 8-bit 4:2:0, 30fps, up to 1080x1920 portrait / 1920x1080 landscape; audio preserved as AAC 192 kbps. These are web derivatives, not original-resolution downloads.
- The first two clips use libx264 CRF 19; the rest use NVIDIA NVENC CQ 19. Both use a 10 Mbps ceiling / 20 Mb buffer. Software and GPU decoding gave the same orientation; FFmpeg applied rotation before scaling. No HDR sources were found.
- Full-video duration and audio presence were verified after each conversion. faststart places the MP4 index before media data; source metadata was removed. No app dependency was added; installed FFmpeg/ffprobe perform offline preparation.
- Poster frames and mid-clip contact frames were inspected. Captions use visible details and car identities already established for the 2025 photos. Ferrari subvariants, the BMW model, Koenigsegg variant, and the edited Lamborghini variant are left unspecified. Aventador SVJ lettering is visible in the relevant clips; BAC Mono and the orange Toyota Supra are visually recognizable. No horsepower, chassis, provenance, or wheel-brand claims were added.
- Technical references: [FFmpeg formats](https://ffmpeg.org/ffmpeg-formats.html), [native HTML video](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), and the installed Next.js `docs/01-app/02-guides/videos.md`.

## Nathan's caption corrections

- `cnc-video-img-2021`: Nathan confirmed the passing order: Lamborghini Aventador, Lamborghini Huracan, then Porsche 911 GT3 RS. Caption and alt describe the complete sequence rather than just the Porsche.
- `cnc-video-img-2053`: Nathan confirmed a Koenigsegg, Ford GT, McLaren Speedtail, then another Koenigsegg. The original Centenario identification was incorrect for this clip. Koenigsegg subvariants remain unspecified; other Centenario records are unaffected.
- `cnc-video-img-2136`: Nathan confirmed **Lamborghini Aventador SV**; caption and alt now specify the trim.
- `cnc-video-img-2220`: Nathan confirmed **Mk4 Toyota Supra** and suggested a possible Fast and Furious inspiration. Caption describes the visual resemblance only; official replica status, build intent, and screen use are not confirmed.
- `cnc-video-img-2029` and `cnc-video-carsncops-3-1-prob4`: replaced literal question marks in caption text with apostrophes. These were stored text errors, not a viewer font issue. The same punctuation error was corrected in the 2024 photo captions `cnc24-2659` and `cnc24-2664`.

## Files and source hashes

| Original | ID | MP4 | Duration | SHA-256 |
|---|---|---|---|---|
| `IMG_1989.MOV` | `cnc-video-img-1989` | `/videos/cars-n-copters-2025/img-1989.mp4` | 20.84s | `dccded19af0c73c274b655c3fe2cce5e0791de98a0f1232e906d7dc997b0ab4b` |
| `IMG_1993.MOV` | `cnc-video-img-1993` | `/videos/cars-n-copters-2025/img-1993.mp4` | 12.59s | `7fc21ee743c3e77c254193844833bb42f1bc0fd15e8a84e62aeacd4834f4989f` |
| `IMG_1997.MOV` | `cnc-video-img-1997` | `/videos/cars-n-copters-2025/img-1997.mp4` | 14.78s | `df2ae6f370b092d846d647398696589cde102312d693efc72698c117f9ba603d` |
| `IMG_2011.MOV` | `cnc-video-img-2011` | `/videos/cars-n-copters-2025/img-2011.mp4` | 12.31s | `8578be6a68d0bfa00e8c282501ed539d741622c32771080de301634c89f7dda1` |
| `IMG_2016.MOV` | `cnc-video-img-2016` | `/videos/cars-n-copters-2025/img-2016.mp4` | 6.21s | `4e618aefbbc05fbad8f22a0371c6ed85971cbee1eca7151800cb6ea7172397a6` |
| `IMG_2017.MOV` | `cnc-video-img-2017` | `/videos/cars-n-copters-2025/img-2017.mp4` | 13.67s | `bb798f83ef0ef9d72b6695d05be25a2d89a788fa2b7e9fc9387a083bb7f175a9` |
| `IMG_2021.MOV` | `cnc-video-img-2021` | `/videos/cars-n-copters-2025/img-2021.mp4` | 42.27s | `a1755382621d61df3c0fb9680e9842600aa5cb7d95a2f2ff949bf0bd343949e1` |
| `IMG_2022.MOV` | `cnc-video-img-2022` | `/videos/cars-n-copters-2025/img-2022.mp4` | 16.87s | `bb628b9aad41b8f153b23dae082a092b22862978032212e4065c45ec4795030f` |
| `IMG_2028.MOV` | `cnc-video-img-2028` | `/videos/cars-n-copters-2025/img-2028.mp4` | 9.97s | `2d19909c3e56fc9a4720d6d4b97fc83cfb93d4cea06bb3c50490b1dce896f346` |
| `IMG_2029.MOV` | `cnc-video-img-2029` | `/videos/cars-n-copters-2025/img-2029.mp4` | 11.97s | `bc31b5b3d05897e37b0b976b0a8abf18b38796aa22b9f74a80549ede712ac865` |
| `IMG_2030.MOV` | `cnc-video-img-2030` | `/videos/cars-n-copters-2025/img-2030.mp4` | 28.61s | `6b68b5f12515ce2b581eb6744a77796a4bf6ceff4e194e08a7ac9fd9a61241cd` |
| `IMG_2052.mov` | `cnc-video-img-2052` | `/videos/cars-n-copters-2025/img-2052.mp4` | 11.27s | `4f9c9e0aa0136dc83e5426b9c47ab1c77940fbcab310ec30818407c684068820` |
| `IMG_2053.MOV` | `cnc-video-img-2053` | `/videos/cars-n-copters-2025/img-2053.mp4` | 26.97s | `4ed1c3b889f6a5122de4083f742701b8ac82dc9bf25a3228da87b8f3158d462a` |
| `IMG_2054.MOV` | `cnc-video-img-2054` | `/videos/cars-n-copters-2025/img-2054.mp4` | 2.90s | `8e412603e5c9aa4d1c19e674e94a1c5e0239d14fbfe4c3cb9268eb5a3f14d93b` |
| `IMG_2084.MOV` | `cnc-video-img-2084` | `/videos/cars-n-copters-2025/img-2084.mp4` | 10.13s | `c9748e642da91ad447efd266039fca37c6a2e29b312567c2480294646d1bb6d2` |
| `IMG_2106.MOV` | `cnc-video-img-2106` | `/videos/cars-n-copters-2025/img-2106.mp4` | 9.09s | `3bbebd4829b28655c3ca3a2aa3b9445a011e97026bf2c535324424834a6bcb4b` |
| `IMG_2107.MOV` | `cnc-video-img-2107` | `/videos/cars-n-copters-2025/img-2107.mp4` | 43.95s | `878186adf7aeda74527898aa3aa48d13e93e4a5612c2ddfe1d9c75bd4460506c` |
| `IMG_2108.MOV` | `cnc-video-img-2108` | `/videos/cars-n-copters-2025/img-2108.mp4` | 20.86s | `9619614dfe2c56b475a9c1e9edfbab2466acb7ed6216592d127ede296532c760` |
| `IMG_2109.MOV` | `cnc-video-img-2109` | `/videos/cars-n-copters-2025/img-2109.mp4` | 7.32s | `c6012fcb102234b6e8cc6a7c823c323fce4678949cbfd91c2f15d2fc08f17507` |
| `IMG_2120.MOV` | `cnc-video-img-2120` | `/videos/cars-n-copters-2025/img-2120.mp4` | 34.05s | `22bb4f6b347b6f401c60c52261490a60814fa3c8d2c9e51d89745a87dbc676f0` |
| `IMG_2127.mov` | `cnc-video-img-2127` | `/videos/cars-n-copters-2025/img-2127.mp4` | 12.37s | `9f757dc9fd425f1717c8fc4fbb92dc3aa6978a03a2cb91d3aff2c486b802c504` |
| `IMG_2128.MOV` | `cnc-video-img-2128` | `/videos/cars-n-copters-2025/img-2128.mp4` | 3.83s | `3c4ee6c40508128a936819570eadcdabd110ea5573460e4e1252acd5ac67830d` |
| `IMG_2129.MOV` | `cnc-video-img-2129` | `/videos/cars-n-copters-2025/img-2129.mp4` | 3.03s | `ef5e66b75206bfe50d0f5b144ef4f564816804364f67c42e3df41130b4d4e0d5` |
| `IMG_2136.MOV` | `cnc-video-img-2136` | `/videos/cars-n-copters-2025/img-2136.mp4` | 7.44s | `054f71cf6b61810b3c1511b7673e5f51955f15376ab73c2e04486c4153179aa2` |
| `IMG_2201.MOV` | `cnc-video-img-2201` | `/videos/cars-n-copters-2025/img-2201.mp4` | 8.34s | `7079a998b30e5e06820a239106209d1c64f2756d40ddaae55a2cd000d57a417a` |
| `IMG_2220.MOV` | `cnc-video-img-2220` | `/videos/cars-n-copters-2025/img-2220.mp4` | 16.34s | `86f24698fc7fb4ea977522ee93d8d7e38b892d72ed7d04113234e96810ff322e` |
| `Lambo_3_1_prob4.MP4` | `cnc-video-lambo-3-1-prob4` | `/videos/cars-n-copters-2025/lambo-3-1-prob4.mp4` | 11.57s | `e759e2f7f498a90d5ae6fc531c97aebd73dc1f6dcfb6d0482d9d8809caf4b01b` |
| `carsncops_3_1_prob4.MOV` | `cnc-video-carsncops-3-1-prob4` | `/videos/cars-n-copters-2025/carsncops-3-1-prob4.mp4` | 30.46s | `3709b800e996e4c769dde763ebe32e041a739a49b3d2ae43f176f55c3ee55b29` |

## Verification

Passed lint, typecheck, build/content validation (90 photos / 28 videos), and diff whitespace checks. All 28 source hashes remain unchanged. Every MP4 was probed for H.264 / 8-bit 4:2:0, 30fps, recorded dimensions, AAC audio, no location tags, and a fast-start index; IMG_2127 retains full-range signaling (reported by ffprobe as yuvj420p). All 28 HTTP range requests returned 206 with video/mp4. Desktop and 375px playback, pause/seek/mute, poster layout, one mounted player, no autoplay, next-item playback cleanup, close cleanup, and focus restoration passed. Native fullscreen controls are present, but browser automation did not confirm entering OS fullscreen; real-device Safari/Firefox and fullscreen review remain outstanding. A one-clip preparation run verified the final staging/rename workflow. In-memory invalid records confirmed rejection of duplicate IDs, blank captions, missing MP4s, invalid duration, and invalid poster dimensions. No automated test suite was added. Audio streams are preserved; synchronized captions for meaningful speech have not been authored or fully audited. Review spoken content before public launch.
