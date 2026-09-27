export type FocalPoint = { x: number; y: number };

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  focalPoint?: FocalPoint;
  placeholder?: boolean;
};

export type Shoot = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  coverId: string;
  photos: Photo[];
  videos?: Video[];
  ogImage?: string;
};

// src and dimensions describe the poster; videoSrc is the playable MP4.
export type Video = Photo & {
  videoSrc: string;
  duration: number;
  caption: string;
};

export type GalleryItem = Photo | Video;

export function isVideo(item: GalleryItem): item is Video {
  return "videoSrc" in item;
}

export function getGalleryItems(shoot: Shoot): GalleryItem[] {
  return [...shoot.photos, ...(shoot.videos ?? [])];
}

export function gallerySummary(shoot: Shoot): string {
  const photos = `${shoot.photos.length} ${shoot.photos.length === 1 ? "photograph" : "photographs"}`;
  const videos = shoot.videos?.length ?? 0;
  return videos ? `${photos} / ${videos} ${videos === 1 ? "film" : "films"}` : photos;
}

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  instagram: { handle: string; url: string };
  email?: string;
  featuredSlugs: string[];
  hero: { shootSlug: string; photoId: string };
  heroImage?: Photo;
  headshot?: Photo;
};

export const site: SiteConfig = {
  name: "Nathan Tran",
  shortName: "Nate",
  description: "Automotive photography and films by Nathan Tran. Hypercars, exceptional builds, and California’s car community.",
  instagram: { handle: "@natextran", url: "https://www.instagram.com/natextran/" },
  email: "natextran@gmail.com",
  featuredSlugs: ["the-california-grand-tour-2026", "cars-n-copters-2025", "cars-n-copters-2024"],
  hero: { shootSlug: "the-california-grand-tour-2026", photoId: "cgt-0485" },
  heroImage: {
    id: "opening-frame", src: "/images/home/opening-frame-mclaren-tall.jpg", width: 3200, height: 2560,
    alt: "White McLaren Senna GTR viewed head-on, with exposed carbon fiber and blue and orange accents.",
    focalPoint: { x: 50, y: 71 },
  },
  headshot: {
    id: "nathan-tran-headshot", src: "/images/home/headshot.jpg", width: 784, height: 784,
    alt: "Nathan Tran in profile, wearing a black shirt against a warm sunset sky.",
  },
};

export const homepageShare = {
  title: `${site.name} — Automotive Photography & Film`,
  image: "/og/nathan-tran-photography-film.jpg",
  alt: "McLaren Senna GTR photographed head-on, with Nathan Tran — Automotive Photography & Film branding.",
};

const californiaGrandTourPhotos: Photo[] = [
  {
    id: "cgt-0485", src: "/images/the-california-grand-tour-2026/mclaren-senna-cover.jpg",
    width: 2560, height: 3200,
    alt: "White McLaren Senna GTR with blue and orange accents, viewed from the front three-quarter angle.",
    caption: "McLaren Senna GTR. One of just 75 built.",
    focalPoint: { x: 50, y: 74 },
  },
  {
    id: "cgt-0525", src: "/images/the-california-grand-tour-2026/mclaren-f1-gtr-three-quarter.jpg",
    width: 2560, height: 3200,
    alt: "Front three-quarter view of McLaren F1 GTR Longtail 23R, with its FINA-liveried nose and extended rear bodywork.",
    caption: "F1 GTR Longtail 23R, campaigned by Schnitzer for BMW Motorsport. It also finished second at Sebring in 1997.",
  },
  {
    id: "cgt-0548", src: "/images/the-california-grand-tour-2026/porsche-911-gt3-wheel.jpg",
    width: 2400, height: 3200,
    alt: "Multi-spoke front wheel, red brake caliper, and GT3 side script on the silver Porsche 911 GT3 (991.2).",
    caption: "Multi-spoke wheels and GT3 side script on this silver 991.2.",
  },
  {
    id: "cgt-0561", src: "/images/the-california-grand-tour-2026/toyota-supra-front.jpg",
    width: 2560, height: 3200,
    alt: "Low front three-quarter view of the pink Toyota GR Supra 3.0, with Liberty Walk widebody panels and LBWK lettering on the splitter.",
    caption: "GR Supra 3.0. A turbocharged B58 straight-six under the hood, Liberty Walk bodywork around it.",
  },
  {
    id: "cgt-0545-wide", src: "/images/the-california-grand-tour-2026/porsche-911-gt3-wide-composition.jpg",
    width: 2133, height: 3200,
    alt: "Wide composition of the silver Porsche 911 GT3 (991.2) parked outside IKEA, beside a red Chevrolet Corvette C8.",
    caption: "991.2 GT3. The generation that brought the six-speed manual back as an alternative to PDK.",
  },
  {
    id: "cgt-0418", src: "/images/the-california-grand-tour-2026/mclaren-senna-cockpit.jpg",
    width: 2560, height: 3200,
    alt: "Carbon-fiber racing bucket seat and carbon-fiber steering wheel inside the McLaren Senna GTR.",
    caption: "Inside the Senna GTR: carbon-fiber racing buckets and a carbon-fiber, quick-release steering wheel.",
  },
  {
    id: "cgt-0579", src: "/images/the-california-grand-tour-2026/toyota-supra-rear.jpg",
    width: 2133, height: 3200,
    alt: "Straight rear view of the pink Liberty Walk GR Supra 3.0, showing widened rear quarters, tall wing, and black diffuser.",
    caption: "Liberty Walk GR Supra 3.0. Wide rear quarters and a GT-style wing, with air suspension bringing the whole car down.",
  },
  {
    id: "cgt-0510", src: "/images/the-california-grand-tour-2026/mclaren-f1-gtr-front-detail.jpg",
    width: 2560, height: 3200,
    alt: "Front wheel and nose of McLaren F1 GTR Longtail chassis 23R in white, red, and blue FINA livery.",
    caption: "McLaren F1 GTR Longtail, chassis 23R. One of ten Longtails built, and one of four run by BMW Motorsport in 1997.",
  },
  {
    id: "cgt-0503", src: "/images/the-california-grand-tour-2026/mclaren-senna-front.jpg",
    width: 2560, height: 3200,
    alt: "White McLaren Senna GTR head-on, with a blue center stripe and orange trim along its carbon-fiber splitter.",
    caption: "Senna GTR. Built for the track, without having to fit a racing rulebook.",
  },
  {
    id: "cgt-0428", src: "/images/the-california-grand-tour-2026/mclaren-senna-rear.jpg",
    width: 2560, height: 3200,
    alt: "Rear wing and diffuser of the white McLaren Senna GTR outside IKEA.",
    caption: "Senna GTR outside IKEA. Its aero package produces over 1,000 kg of peak downforce.",
  },
  {
    id: "cgt-0493", src: "/images/the-california-grand-tour-2026/mclaren-senna-front-three-quarter.jpg",
    width: 2560, height: 3200,
    alt: "Low front three-quarter view of the white McLaren Senna GTR and its exposed carbon-fiber front splitter.",
    caption: "McLaren Senna GTR. 814 bhp from a 4.0-liter twin-turbo V8.",
  },
  {
    id: "cgt-0507", src: "/images/the-california-grand-tour-2026/mclaren-senna-raised-door.jpg",
    width: 2560, height: 3200,
    alt: "Elevated front three-quarter view of the white McLaren Senna GTR and its exposed carbon-fiber hood.",
    caption: "Exposed carbon fiber across the white Senna GTR's hood.",
  },
  {
    id: "cgt-0520", src: "/images/the-california-grand-tour-2026/mclaren-f1-gtr-front.jpg",
    width: 2560, height: 3200,
    alt: "McLaren F1 GTR Longtail 23R viewed from above the front, wearing number 9 and FINA BMW Motorsport livery.",
    caption: "FINA BMW Motorsport livery on F1 GTR Longtail 23R. Peter Kox and Roberto Ravaglia drove it to victory at Silverstone in 1997.",
  },
  {
    id: "cgt-0542", src: "/images/the-california-grand-tour-2026/porsche-911-gt3-front.jpg",
    width: 2400, height: 3200,
    alt: "Head-on view of a silver Porsche 911 GT3 (991.2), with a low front splitter and red tow strap.",
    caption: "Porsche 911 GT3 (991.2). A naturally aspirated 4.0-liter flat-six that revs to 9,000 rpm.",
  },
  {
    id: "cgt-0545", src: "/images/the-california-grand-tour-2026/porsche-911-gt3-three-quarter.jpg",
    width: 2400, height: 3200,
    alt: "Close front three-quarter view of the silver Porsche 911 GT3 (991.2), with multi-spoke wheels and a fixed rear wing.",
    caption: "Porsche 991.2 GT3. Its 4.0-liter flat-six is closely related to the engine in the GT3 Cup race car.",
  },
  {
    id: "cgt-0549", src: "/images/the-california-grand-tour-2026/toyota-supra-rear-three-quarter.jpg",
    width: 2560, height: 3200,
    alt: "Rear three-quarter view of a pink Toyota GR Supra 3.0 with Liberty Walk widebody arches and a tall rear wing.",
    caption: "Toyota GR Supra 3.0. Liberty Walk widebody, Rohana wheels, and air suspension.",
  },
  {
    id: "cgt-0554", src: "/images/the-california-grand-tour-2026/toyota-supra-side-rear.jpg",
    width: 2560, height: 3200,
    alt: "Side and rear of the pink Liberty Walk GR Supra 3.0, showing its widened arches and low stance outside IKEA.",
    caption: "Exposed-fastener overfenders on the Liberty Walk GR Supra, sitting low on bags.",
  },
  {
    id: "cgt-0569", src: "/images/the-california-grand-tour-2026/toyota-supra-rear-in-sunlight.jpg",
    width: 2560, height: 3200,
    alt: "Sunlit rear three-quarter view of the pink Liberty Walk GR Supra 3.0, with deep-dish Rohana wheels tucked under wide arches.",
    caption: "Toyota's A90 Supra shares its underlying platform with the BMW Z4.",
  },
];

const carsNCoptersPhotos: Photo[] = [
  {
    id: "cnc-cover", src: "/images/cars-n-copters-2025/valkyrie-cover.jpg",
    width: 2399, height: 3200,
    alt: "Silver Aston Martin Valkyrie rear quarter framed beneath a red-and-white helicopter.",
    caption: "Aston Martin Valkyrie. The open underbody and deep rear diffuser are central to its aerodynamics.",
    focalPoint: { x: 50, y: 72 },
  },
  {
    id: "cnc-1978", src: "/images/cars-n-copters-2025/agera-draken-front.jpg",
    width: 2400, height: 3200,
    alt: "Low front three-quarter view of the Koenigsegg Agera RS Draken, with white accents and red brake calipers.",
    caption: "Koenigsegg Agera RS Draken. White pinstriping follows the contours of its gray-tinted bodywork.",
  },
  {
    id: "cnc-3276", src: "/images/cars-n-copters-2025/speedtail-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "Central driving seat and steering wheel inside the McLaren Speedtail.",
    caption: "McLaren Speedtail. The driver sits in the middle, with a passenger seat on either side, echoing the McLaren F1.",
  },
  {
    id: "cnc-2149", src: "/images/cars-n-copters-2025/daytona-sp3-front.jpg",
    width: 2400, height: 3200,
    alt: "Front three-quarter view of a blue Ferrari Daytona SP3 with a white center stripe and number 22 roundels.",
    caption: "Ferrari Daytona SP3. The white center stripe and number 22 roundels give this example a racing-livery feel.",
  },
  {
    id: "cnc-3299", src: "/images/cars-n-copters-2025/revuelto-rear.jpg",
    width: 2400, height: 3200,
    alt: "Black Lamborghini Revuelto viewed from the rear three-quarter angle, with a rear wing and polished wheels.",
    caption: "Lamborghini Revuelto. Polished wheels stand out against the dark bodywork and sharply cut rear quarters.",
  },
  {
    id: "cnc-2027", src: "/images/cars-n-copters-2025/helicopter-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "Helicopter cockpit with two seats, flight instruments, and a control stick.",
    caption: "Inside the helicopter cockpit. Flight instruments and controls between the two seats.",
  },
  {
    id: "cnc-2188", src: "/images/cars-n-copters-2025/centenario-rear.jpg",
    width: 2400, height: 3200,
    alt: "Rear three-quarter view of a Lamborghini Centenario with blue accents outlining its diffuser.",
    caption: "Lamborghini Centenario. Blue accents trace the tall rear diffuser fins.",
  },
  {
    id: "cnc-1988", src: "/images/cars-n-copters-2025/nissan-gtr-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Purple Nissan GT-R R35 with a dark hood and low front splitter in the show lineup.",
    caption: "Nissan GT-R R35. A deep front splitter and widened stance change the shape of the nose.",
  },
  {
    id: "cnc-2163", src: "/images/cars-n-copters-2025/agera-final-editions.jpg",
    width: 2400, height: 3200,
    alt: "Rear wings and taillights of two Koenigsegg Ageras, with FE lettering on the nearest wing.",
    caption: "Koenigsegg Agera Final Edition details. The FE cars received bespoke aerodynamic pieces at the end of the Agera line.",
  },
  {
    id: "cnc-2014", src: "/images/cars-n-copters-2025/viper-profile.jpg",
    width: 2400, height: 3200,
    alt: "White Dodge Viper in Gold Rush Rally graphics, viewed in profile with a large rear wing.",
    caption: "Dodge Viper in Gold Rush Rally livery. The long hood, side-exit exhaust, and oversized wing dominate its profile.",
  },
  {
    id: "cnc-2036", src: "/images/cars-n-copters-2025/huracan-helicopter.jpg",
    width: 2400, height: 3200,
    alt: "Yellow Lamborghini Huracan parked beside a yellow helicopter.",
    caption: "Lamborghini Huracan. The low wedge of the nose sits beneath the helicopter's skids.",
  },
  {
    id: "cnc-2124", src: "/images/cars-n-copters-2025/ferrari-458-spider-rear.jpg",
    width: 2400, height: 3200,
    alt: "White Ferrari 458 Spider viewed from the rear, showing three central exhaust outlets.",
    caption: "Ferrari 458 Spider. Three exhaust tips grouped in the center are a signature of the 458's rear end.",
  },
  {
    id: "cnc-3307", src: "/images/cars-n-copters-2025/agera-draken-profile.jpg",
    width: 2400, height: 3200,
    alt: "Side profile of the Koenigsegg Agera RS Draken beside a helicopter.",
    caption: "Agera RS Draken. The wraparound windscreen and low roofline are unmistakably Koenigsegg.",
  },
  {
    id: "cnc-1981", src: "/images/cars-n-copters-2025/agera-draken-side.jpg",
    width: 2400, height: 3200,
    alt: "Wide side view of the Koenigsegg Agera RS Draken, showing its rear wing and white side accents.",
    caption: "Draken's white accents trace the side intake and the lower edge of the Agera RS body.",
  },
  {
    id: "cnc-1982", src: "/images/cars-n-copters-2025/agera-draken-head-on.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg Agera RS Draken viewed head-on, with its low splitter and outlined hood.",
    caption: "Agera RS Draken. A low splitter and paired hood vents give the nose its shape.",
  },
  {
    id: "cnc-1983", src: "/images/cars-n-copters-2025/agera-draken-three-quarter.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg Agera RS Draken viewed from the front three-quarter angle beside a helicopter.",
    caption: "Koenigsegg Agera RS. Built as a limited series of 25 customer cars.",
  },
  {
    id: "cnc-1985", src: "/images/cars-n-copters-2025/agera-draken-detail.jpg",
    width: 2400, height: 3200,
    alt: "Side intake, red Draken lettering, and rear wheel of the Koenigsegg Agera RS.",
    caption: "The Draken name sits just ahead of the rear wheel, picked out in red against the gray bodywork.",
  },
  {
    id: "cnc-3301-2", src: "/images/cars-n-copters-2025/bmw-m3-seats.jpg",
    width: 2400, height: 3200,
    alt: "Blue and yellow bucket seats with M3 badges inside a blue BMW M3.",
    caption: "BMW M3. Deep bucket seats with blue centers, yellow bolsters, and M-striped belts.",
  },
  {
    id: "cnc-2307", src: "/images/cars-n-copters-2025/bmw-show-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Black BMW with yellow headlight accents at the front of a supercar lineup.",
    caption: "Yellow headlight accents and a low splitter on the BMW at the head of the lineup.",
  },
  {
    id: "cnc-2008", src: "/images/cars-n-copters-2025/bmw-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "BMW cockpit with a red interior and a red center marker on the steering wheel.",
    caption: "BMW cockpit details: a red wheel marker, sculpted steering-wheel grips, and red upholstery.",
  },
  {
    id: "cnc-2009", src: "/images/cars-n-copters-2025/audi-r8-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Red Audi R8 at the front of a row of sports cars along the beachfront.",
    caption: "Audi R8 at the front of the row. Its broad grille and side intakes keep the nose unmistakable.",
  },
  {
    id: "cnc-2049", src: "/images/cars-n-copters-2025/porsche-gt3-rs-helicopter.jpg",
    width: 2400, height: 3200,
    alt: "White Porsche 911 GT3 RS beside a black helicopter, with its large rear wing visible.",
    caption: "Porsche 911 GT3 RS. Front-fender vents and a tall rear wing give the RS its distinct silhouette.",
  },
  {
    id: "cnc-2059", src: "/images/cars-n-copters-2025/valkyrie-rear-wheel.jpg",
    width: 2400, height: 3200,
    alt: "Rear wheel and sculpted silver rear quarter of the Aston Martin Valkyrie.",
    caption: "Aston Martin Valkyrie. The rear bodywork curves tightly around the wheel before opening into the diffuser.",
  },
  {
    id: "cnc-2089", src: "/images/cars-n-copters-2025/speedtail-rear-three-quarter.jpg",
    width: 2400, height: 3200,
    alt: "Black McLaren Speedtail viewed from the rear three-quarter angle with both doors open.",
    caption: "McLaren Speedtail. Its elongated tail was shaped to reduce drag, with a production run of just 106 cars.",
  },
  {
    id: "cnc-2098", src: "/images/cars-n-copters-2025/valkyrie-diffuser-low.jpg",
    width: 2400, height: 3200,
    alt: "Low close view of the Aston Martin Valkyrie's rear wheel, exhaust, and deep diffuser.",
    caption: "Valkyrie rear aero. The underfloor tunnels feed air through the deep diffuser.",
  },
  {
    id: "cnc-2099", src: "/images/cars-n-copters-2025/valkyrie-diffuser-wide.jpg",
    width: 2400, height: 3200,
    alt: "Rear three-quarter view of the silver Aston Martin Valkyrie beside a Koenigsegg with its clamshell raised.",
    caption: "Aston Martin Valkyrie. The narrow upper body leaves room for the substantial airflow paths below.",
  },
  {
    id: "cnc-2113", src: "/images/cars-n-copters-2025/shelby-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "Shelby Mustang interior with a Carroll Shelby signature on the dash and a stuffed goat in the passenger seat.",
    caption: "Shelby Mustang. A Carroll Shelby signature across the dash, a three-spoke wheel, and an unexpected passenger.",
  },
  {
    id: "cnc-2122", src: "/images/cars-n-copters-2025/corvette-sheriff.jpg",
    width: 2400, height: 3200,
    alt: "Front quarter of a Chevrolet Corvette C6 wearing sheriff graphics, with its engine exposed.",
    caption: "Chevrolet Corvette C6 in sheriff livery. With the hood off, the plumbing is as much a part of the display as the bodywork.",
  },
  {
    id: "cnc-2314", src: "/images/cars-n-copters-2025/ferrari-488-spider-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "Ferrari 458 Spider cockpit with a red manettino switch and engine-start button on the wheel.",
    caption: "Ferrari 458 Spider. The manettino and engine-start button sit right on the steering wheel.",
  },
  {
    id: "cnc-2126", src: "/images/cars-n-copters-2025/aventador-urus.jpg",
    width: 2400, height: 3200,
    alt: "Front of a white Lamborghini Aventador beside a green Lamborghini Urus.",
    caption: "Lamborghini Aventador and Urus. Low, angular bodywork beside the much taller SUV.",
  },
  {
    id: "cnc-2131", src: "/images/cars-n-copters-2025/gtr-rear-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Rear of a blue Nissan GT-R R35 with four round taillights and a tall rear wing.",
    caption: "Nissan GT-R R35. Four round taillights remain the defining view from behind.",
  },
  {
    id: "cnc-2313", src: "/images/cars-n-copters-2025/liberty-walk-gtr-low.jpg",
    width: 2284, height: 3045,
    alt: "Low front three-quarter view of a pink-and-blue Nissan GT-R with Liberty Walk graphics.",
    caption: "Nissan GT-R with Liberty Walk branding. Broad overfenders, a deep splitter, and pink-to-blue bodywork.",
  },
  {
    id: "cnc-2134", src: "/images/cars-n-copters-2025/liberty-walk-gtr-front.jpg",
    width: 2400, height: 3200,
    alt: "Elevated front view of the pink-and-blue Nissan GT-R, showing wide front arches and its splitter.",
    caption: "This GT-R's wide front arches and extended splitter carry the Liberty Walk look around the nose.",
  },
  {
    id: "cnc-2135", src: "/images/cars-n-copters-2025/aventador-profile.jpg",
    width: 2400, height: 3200,
    alt: "White Lamborghini Aventador SV viewed in profile against the beachfront.",
    caption: "Lamborghini Aventador SV. Red SV graphics break up the white bodywork above the rear arches.",
  },
  {
    id: "cnc-2140", src: "/images/cars-n-copters-2025/daytona-sp3-rear.jpg",
    width: 2400, height: 3200,
    alt: "Blue Ferrari Daytona SP3 from the rear three-quarter angle, showing its horizontal tail strakes.",
    caption: "Ferrari Daytona SP3. The stacked horizontal strakes give the rear its distinctive shape.",
  },
  {
    id: "cnc-2312", src: "/images/cars-n-copters-2025/daytona-sp3-side-rear.jpg",
    width: 1981, height: 2642,
    alt: "Blue Ferrari Daytona SP3 with a number 22 roundel, viewed from the rear quarter.",
    caption: "Daytona SP3. A naturally aspirated 6.5-liter V12 sits behind the cockpit.",
  },
  {
    id: "cnc-2151", src: "/images/cars-n-copters-2025/valkyrie-show-context.jpg",
    width: 2400, height: 3200,
    alt: "Silver Aston Martin Valkyrie viewed from behind beside a red helicopter.",
    caption: "Aston Martin Valkyrie. The slim tail contrasts with the huge openings beneath it.",
  },
  {
    id: "cnc-2152", src: "/images/cars-n-copters-2025/koenigsegg-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg steering wheel and circular center-console controls through an open side window.",
    caption: "Koenigsegg cockpit. A circular control layout and twin round vents give the center console its own identity.",
  },
  {
    id: "cnc-2306", src: "/images/cars-n-copters-2025/mclaren-aston-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Black McLaren and Aston Martin Vantage parked side by side, with gold wheels on the McLaren.",
    caption: "McLaren and Aston Martin Vantage. Gold wheels and a deep front splitter distinguish the McLaren in this pair.",
  },
  {
    id: "cnc-2296", src: "/images/cars-n-copters-2025/agera-door-detail.jpg",
    width: 2028, height: 2704,
    alt: "Open Koenigsegg Agera door beside its front wheel and low splitter.",
    caption: "Koenigsegg Agera. The door rotates forward and upward, leaving the front wheel and sill in view.",
  },
  {
    id: "cnc-2294", src: "/images/cars-n-copters-2025/valkyrie-rear.jpg",
    width: 2096, height: 2794,
    alt: "Rear three-quarter view of the silver Aston Martin Valkyrie, with its diffuser and tail visible.",
    caption: "Valkyrie. The rear wheel pods frame a tail shaped around the underbody airflow.",
  },
  {
    id: "cnc-2180", src: "/images/cars-n-copters-2025/valkyrie-rear-close.jpg",
    width: 2400, height: 3200,
    alt: "Close rear three-quarter view of the silver Aston Martin Valkyrie and its black diffuser.",
    caption: "Aston Martin Valkyrie. The separation between the silver upper body and open lower structure is clearest at the rear.",
  },
  {
    id: "cnc-2292", src: "/images/cars-n-copters-2025/valkyrie-front.jpg",
    width: 2323, height: 3097,
    alt: "Front three-quarter view of the silver Aston Martin Valkyrie with its low nose and open side channels.",
    caption: "Aston Martin Valkyrie. Its teardrop cockpit sits between the airflow tunnels that run along the floor.",
  },
  {
    id: "cnc-2303", src: "/images/cars-n-copters-2025/speedtail-rear.jpg",
    width: 1611, height: 2148,
    alt: "Black McLaren Speedtail viewed directly from behind with its doors open.",
    caption: "McLaren Speedtail. A tapering tail and slim rear lights keep the rear profile unusually clean.",
  },
  {
    id: "cnc-2196", src: "/images/cars-n-copters-2025/centenario-front-wide.jpg",
    width: 2400, height: 3200,
    alt: "Lamborghini Centenario viewed from a low front three-quarter angle with blue accents.",
    caption: "Lamborghini Centenario coupe. One of 20 coupes built to mark Ferruccio Lamborghini's centenary.",
  },
  {
    id: "cnc-2198", src: "/images/cars-n-copters-2025/centenario-front-low.jpg",
    width: 2400, height: 3200,
    alt: "Low side and front view of the Lamborghini Centenario beside a black McLaren.",
    caption: "Centenario. The blue splitter edges follow the sharply cut nose and continue along the side skirts.",
  },
  {
    id: "cnc-2199", src: "/images/cars-n-copters-2025/centenario-nose.jpg",
    width: 2400, height: 3200,
    alt: "Close view of the Lamborghini Centenario's nose, headlights, and blue splitter accents.",
    caption: "Lamborghini Centenario. Small blue accents pick out the hood vent and the corners of the front splitter.",
  },
  {
    id: "cnc-2302", src: "/images/cars-n-copters-2025/centenario-wheel.jpg",
    width: 1937, height: 2583,
    alt: "Front wheel, Lamborghini badge, and blue side-skirt trim on the Centenario.",
    caption: "Centenario details. Wide wheel spokes, the shield on the front fender, and a thin blue line along the sill.",
  },
  {
    id: "cnc-2205", src: "/images/cars-n-copters-2025/mustang-hypercar-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Shelby Mustang, Lamborghini Centenario, and McLaren parked in a diagonal lineup.",
    caption: "Shelby Mustang, Centenario, and McLaren. Three very different interpretations of a low, wide front end.",
  },
  {
    id: "cnc-2206", src: "/images/cars-n-copters-2025/mustang-centenario-noses.jpg",
    width: 2400, height: 3200,
    alt: "Low view across the noses of a striped Shelby Mustang, Centenario, and McLaren.",
    caption: "Shelby Mustang beside the Centenario. Round lamps and twin stripes meet a much sharper modern wedge.",
  },
  {
    id: "cnc-2213", src: "/images/cars-n-copters-2025/koenigsegg-rear-suspension.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg rear wheel and exposed suspension beneath an open rear clamshell.",
    caption: "Koenigsegg with the rear clamshell open. Suspension links and dampers are visible beside the rear wheel.",
  },
  {
    id: "cnc-2217", src: "/images/cars-n-copters-2025/koenigsegg-engine-cover.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg engine-cover spine and exposed rear damper assembly.",
    caption: "Koenigsegg rear detail. The central bodywork spine leads down to the exposed damper assembly.",
  },
  {
    id: "cnc-2225", src: "/images/cars-n-copters-2025/koenigsegg-engine-badge.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg lettering and engine bay beneath the raised rear clamshell.",
    caption: "Koenigsegg engine bay. The raised clamshell opens up a view normally hidden behind the rear bodywork.",
  },
  {
    id: "cnc-2231", src: "/images/cars-n-copters-2025/huracan-street.jpg",
    width: 2400, height: 3200,
    alt: "Black Lamborghini Huracan parked at the curb with amber lights illuminated.",
    caption: "Lamborghini Huracan. The angular front lights stand out even with the rest of the nose in shadow.",
  },
  {
    id: "cnc-2295", src: "/images/cars-n-copters-2025/valkyrie-tail.jpg",
    width: 2117, height: 2823,
    alt: "Straight rear view of the Aston Martin Valkyrie, showing its narrow center section and open diffuser.",
    caption: "Aston Martin Valkyrie. From straight behind, the space beneath the body is as striking as the body itself.",
  },
  {
    id: "cnc-2298", src: "/images/cars-n-copters-2025/agera-vader-interior.jpg",
    width: 2208, height: 2944,
    alt: "Koenigsegg Agera interior with Vader FE lettering, diamond-quilted seats, and circular console controls.",
    caption: "Koenigsegg Agera Final Edition Vader. The name is carried into the cabin, above the quilted passenger seat.",
  },
  {
    id: "cnc-2310", src: "/images/cars-n-copters-2025/huracan-livery.jpg",
    width: 1870, height: 2494,
    alt: "Lamborghini Huracan with illustrated side graphics and a dark hood, viewed from the front quarter.",
    caption: "Lamborghini Huracan. Illustrated graphics follow the doors and rear quarters, contrasting with the dark hood.",
  },
  {
    id: "cnc-3291", src: "/images/cars-n-copters-2025/porsche-gt3-rs-front.jpg",
    width: 2400, height: 3200,
    alt: "White Porsche 911 GT3 RS viewed from the front three-quarter angle with dark fender vents.",
    caption: "Porsche 911 GT3 RS. The vents over the front wheels are as recognizable as the rear wing.",
  },
  {
    id: "cnc-3293", src: "/images/cars-n-copters-2025/koenigsegg-engine-rear.jpg",
    width: 2400, height: 3200,
    alt: "Koenigsegg viewed from the rear with its clamshell raised, exposing the engine and suspension.",
    caption: "Under the Koenigsegg's rear clamshell. The drivetrain, dampers, and suspension links are all on display.",
  },
];

const carsNCoptersVideos: Video[] = [
  {
    id: "cnc-video-lambo-3-1-prob4", src: "/images/cars-n-copters-2025/video-posters/lambo-3-1-prob4.jpg",
    videoSrc: "/videos/cars-n-copters-2025/lambo-3-1-prob4.mp4", duration: 11.566667,
    width: 1080, height: 1920,
    alt: "Two Lamborghini Huracans parked at the curb in Huntington Beach, shown in a short edit.",
    caption: "Two Lamborghini Huracans at the curb in Huntington Beach. A short film of the cars and their details.",
  },
  {
    id: "cnc-video-carsncops-3-1-prob4", src: "/images/cars-n-copters-2025/video-posters/carsncops-3-1-prob4.jpg",
    videoSrc: "/videos/cars-n-copters-2025/carsncops-3-1-prob4.mp4", duration: 30.458,
    width: 1080, height: 1920,
    alt: "Edited highlights of supercars at Cars 'N Copters 2025.",
    caption: "Cars 'N Copters 2025. A short edit from the beachfront lineup.",
  },
  {
    id: "cnc-video-img-1989", src: "/images/cars-n-copters-2025/video-posters/img-1989.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-1989.mp4", duration: 20.841,
    width: 1080, height: 1920,
    alt: "Lamborghini Revuelto at the beachfront display.",
    caption: "Lamborghini Revuelto. A closer look at the low nose, side intakes, and rear wing.",
  },
  {
    id: "cnc-video-img-1993", src: "/images/cars-n-copters-2025/video-posters/img-1993.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-1993.mp4", duration: 12.585,
    width: 1080, height: 1920,
    alt: "Green Ferrari in the event lane.",
    caption: "Ferrari. A long hood and low roofline, with the cabin set well back from the front wheels.",
  },
  {
    id: "cnc-video-img-1997", src: "/images/cars-n-copters-2025/video-posters/img-1997.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-1997.mp4", duration: 14.782,
    width: 1080, height: 1920,
    alt: "Orange McLaren beside another supercar at the show.",
    caption: "McLaren. The deep headlight openings are cut into either side of the low nose.",
  },
  {
    id: "cnc-video-img-2011", src: "/images/cars-n-copters-2025/video-posters/img-2011.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2011.mp4", duration: 12.308,
    width: 1080, height: 1920,
    alt: "Red, white, and black BAC Mono at the event.",
    caption: "BAC Mono. A single-seat cockpit with exposed wheels on either side.",
  },
  {
    id: "cnc-video-img-2016", src: "/images/cars-n-copters-2025/video-posters/img-2016.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2016.mp4", duration: 6.206,
    width: 1080, height: 1920,
    alt: "Dark BMW in the event lane.",
    caption: "BMW. A low front splitter and dark wheels frame the large kidney grilles.",
  },
  {
    id: "cnc-video-img-2017", src: "/images/cars-n-copters-2025/video-posters/img-2017.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2017.mp4", duration: 13.673,
    width: 1080, height: 1920,
    alt: "Lamborghini Huracan with bright accents and illustrated body graphics in the event lane.",
    caption: "Lamborghini Huracan. Bright trim traces the nose and splitter around the illustrated bodywork.",
  },
  {
    id: "cnc-video-img-2021", src: "/images/cars-n-copters-2025/video-posters/img-2021.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2021.mp4", duration: 42.266667,
    width: 1080, height: 1920,
    alt: "Lamborghini Aventador and Huracan passing through the event lane, followed by a Porsche 911 GT3 RS.",
    caption: "A Lamborghini Aventador leads, followed by a Huracan and then a Porsche 911 GT3 RS.",
  },
  {
    id: "cnc-video-img-2022", src: "/images/cars-n-copters-2025/video-posters/img-2022.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2022.mp4", duration: 16.873,
    width: 1080, height: 1920,
    alt: "Dark Ferrari viewed from the side at the show.",
    caption: "Ferrari. The sculpted side intake leads into the rear wheel arch.",
  },
  {
    id: "cnc-video-img-2028", src: "/images/cars-n-copters-2025/video-posters/img-2028.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2028.mp4", duration: 9.966667,
    width: 1080, height: 1920,
    alt: "Rear of a yellow Lamborghini Huracan beside the helicopter display.",
    caption: "Lamborghini Huracan. A rear view of the taillights, exhaust, and diffuser.",
  },
  {
    id: "cnc-video-img-2029", src: "/images/cars-n-copters-2025/video-posters/img-2029.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2029.mp4", duration: 11.966667,
    width: 1080, height: 1920,
    alt: "Front of a yellow Lamborghini Huracan beside a helicopter.",
    caption: "Lamborghini Huracan. A low front view beneath the helicopter's rotor.",
  },
  {
    id: "cnc-video-img-2030", src: "/images/cars-n-copters-2025/video-posters/img-2030.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2030.mp4", duration: 28.606,
    width: 1080, height: 1920,
    alt: "Yellow Lamborghini Huracan among the helicopter displays.",
    caption: "Lamborghini Huracan. The low tail sits beneath the helicopter display.",
  },
  {
    id: "cnc-video-img-2052", src: "/images/cars-n-copters-2025/video-posters/img-2052.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2052.mp4", duration: 11.265,
    width: 1080, height: 1920,
    alt: "Silver Aston Martin Valkyrie at the show.",
    caption: "Aston Martin Valkyrie. A closer view of the open channels beneath its bodywork.",
  },
  {
    id: "cnc-video-img-2053", src: "/images/cars-n-copters-2025/video-posters/img-2053.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2053.mp4", duration: 26.966667,
    width: 1080, height: 1920,
    alt: "A Koenigsegg, Ford GT, McLaren Speedtail, and a second Koenigsegg passing in sequence.",
    caption: "A Koenigsegg opens the procession, followed by a Ford GT, a McLaren Speedtail, and another Koenigsegg.",
  },
  {
    id: "cnc-video-img-2054", src: "/images/cars-n-copters-2025/video-posters/img-2054.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2054.mp4", duration: 2.9,
    width: 1080, height: 1920,
    alt: "Rear of the Aston Martin Valkyrie surrounded by visitors.",
    caption: "Aston Martin Valkyrie. A brief look at the narrow tail and deep rear diffuser.",
  },
  {
    id: "cnc-video-img-2084", src: "/images/cars-n-copters-2025/video-posters/img-2084.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2084.mp4", duration: 10.133008,
    width: 1080, height: 1920,
    alt: "Black McLaren Speedtail viewed from behind at the event.",
    caption: "McLaren Speedtail. The long, tapering tail carries a thin strip of rear lighting.",
  },
  {
    id: "cnc-video-img-2106", src: "/images/cars-n-copters-2025/video-posters/img-2106.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2106.mp4", duration: 9.086,
    width: 1080, height: 1920,
    alt: "Rear of a Lamborghini Centenario with blue diffuser accents.",
    caption: "Lamborghini Centenario. Blue edges pick out the tall diffuser fins.",
  },
  {
    id: "cnc-video-img-2107", src: "/images/cars-n-copters-2025/video-posters/img-2107.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2107.mp4", duration: 43.945,
    width: 1080, height: 1920,
    alt: "Lamborghini Centenario viewed around its rear quarter at the show.",
    caption: "Lamborghini Centenario. A closer view of the rear wing, wheels, and blue-accented diffuser.",
  },
  {
    id: "cnc-video-img-2108", src: "/images/cars-n-copters-2025/video-posters/img-2108.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2108.mp4", duration: 20.862,
    width: 1080, height: 1920,
    alt: "Rear quarter of a Lamborghini Centenario beside another supercar.",
    caption: "Lamborghini Centenario. The rear bodywork leaves much of the diffuser exposed.",
  },
  {
    id: "cnc-video-img-2109", src: "/images/cars-n-copters-2025/video-posters/img-2109.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2109.mp4", duration: 7.316,
    width: 1080, height: 1920,
    alt: "Close rear-quarter view of the Lamborghini Centenario.",
    caption: "Lamborghini Centenario. A short detail study of the rear wheel and angular tail.",
  },
  {
    id: "cnc-video-img-2120", src: "/images/cars-n-copters-2025/video-posters/img-2120.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2120.mp4", duration: 34.046,
    width: 1080, height: 1920,
    alt: "White Lamborghini Aventador SVJ Roadster in the show lineup.",
    caption: "Lamborghini Aventador SVJ Roadster. The rear wing sits above the high-mounted exhaust outlets.",
  },
  {
    id: "cnc-video-img-2127", src: "/images/cars-n-copters-2025/video-posters/img-2127.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2127.mp4", duration: 12.366667,
    width: 1080, height: 1920,
    alt: "Burgundy Koenigsegg in the event lane.",
    caption: "Koenigsegg. A low nose beneath the curved, wraparound windscreen.",
  },
  {
    id: "cnc-video-img-2128", src: "/images/cars-n-copters-2025/video-posters/img-2128.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2128.mp4", duration: 3.833008,
    width: 1080, height: 1920,
    alt: "White Lamborghini Aventador SVJ Roadster viewed from the rear quarter.",
    caption: "Lamborghini Aventador SVJ Roadster. SVJ lettering runs along the rear quarter beneath the wing.",
  },
  {
    id: "cnc-video-img-2129", src: "/images/cars-n-copters-2025/video-posters/img-2129.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2129.mp4", duration: 3.033008,
    width: 1080, height: 1920,
    alt: "Rear wing and engine cover of a white Lamborghini Aventador SVJ Roadster.",
    caption: "Lamborghini Aventador SVJ Roadster. A closer look at the rear wing and engine-cover louvers.",
  },
  {
    id: "cnc-video-img-2136", src: "/images/cars-n-copters-2025/video-posters/img-2136.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2136.mp4", duration: 7.444,
    width: 1080, height: 1920,
    alt: "White Lamborghini Aventador SV viewed in profile at the beachfront.",
    caption: "Lamborghini Aventador SV. The side profile shows the deep intake behind the door and fixed rear wing.",
  },
  {
    id: "cnc-video-img-2201", src: "/images/cars-n-copters-2025/video-posters/img-2201.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2201.mp4", duration: 8.34,
    width: 1080, height: 1920,
    alt: "Yellow Lamborghini viewed in profile in the event lane.",
    caption: "Lamborghini. The low roofline drops toward the sculpted side intake.",
  },
  {
    id: "cnc-video-img-2220", src: "/images/cars-n-copters-2025/video-posters/img-2220.jpg",
    videoSrc: "/videos/cars-n-copters-2025/img-2220.mp4", duration: 16.34,
    width: 1080, height: 1920,
    alt: "Orange Mk4 Toyota Supra with sweeping side graphics at the show.",
    caption: "Mk4 Toyota Supra. Orange paint and sweeping side graphics recall the Supra from The Fast and the Furious.",
  },
];

const carsNCopters2024Photos: Photo[] = [
  {
    id: "cnc24-2659", src: "/images/cars-n-copters-2024/huayra-bc-front.jpg",
    width: 2400, height: 3200,
    alt: "White Pagani Huayra BC viewed from the front, with a blue center stripe and exposed-weave hood.",
    caption: "Pagani Huayra BC. The initials honor Benny Caiola, Pagani's first customer.",
    focalPoint: { x: 50, y: 67 },
  },
  {
    id: "cnc24-3309", src: "/images/cars-n-copters-2024/mclaren-diablo-pair.jpg",
    width: 2400, height: 3200,
    alt: "Exposed-carbon McLaren 765LT Spider with turquoise accents beside a yellow Lamborghini Murcielago.",
    caption: "McLaren 765LT Spider beside a Lamborghini Murcielago. Exposed carbon and turquoise alongside bright yellow.",
  },
  {
    id: "cnc24-1006", src: "/images/cars-n-copters-2024/chiron-helicopter-profile.jpg",
    width: 2400, height: 3200,
    alt: "Rear quarter of a two-tone Bugatti Chiron beside a helicopter.",
    caption: "Bugatti Chiron. The sweeping C-shaped side line wraps around the cabin and into the air intake.",
  },
  {
    id: "cnc24-3269", src: "/images/cars-n-copters-2024/mclaren-cockpit.jpg",
    width: 2400, height: 3200,
    alt: "McLaren 765LT cockpit with turquoise trim and exposed carbon-fiber bodywork around the door opening.",
    caption: "McLaren 765LT with fully exposed carbon-fiber bodywork. Turquoise accents continue through the cockpit.",
  },
  {
    id: "cnc24-3271", src: "/images/cars-n-copters-2024/liberty-walk-mclaren.jpg",
    width: 2400, height: 3200,
    alt: "Purple McLaren 720S with widened arches and Liberty Walk lettering on the rear wing.",
    caption: "McLaren 720S with Liberty Walk bodywork. A vented hood, widened arches, and a deep splitter reshape the front end.",
  },
  {
    id: "cnc24-2660", src: "/images/cars-n-copters-2024/zonda-rear.jpg",
    width: 2400, height: 3200,
    alt: "Rear of the Pagani Zonda AY with purple accents, a large wing, and four central exhaust outlets.",
    caption: "Pagani Zonda AY. Purple details pick out the wing supports, taillights, and four-pipe exhaust surround.",
  },
  {
    id: "cnc24-1289", src: "/images/cars-n-copters-2024/mclaren-rear-lineup.jpg",
    width: 2400, height: 3200,
    alt: "Rear view along a lineup of two Lamborghini Aventador SVJs, a blue McLaren, and a Ferrari.",
    caption: "Two Lamborghini Aventador SVJs lead the lineup, their fixed rear wings ahead of a blue McLaren and a Ferrari.",
  },
  {
    id: "cnc24-1194", src: "/images/cars-n-copters-2024/revuelto-front.jpg",
    width: 2400, height: 3200,
    alt: "Matte-dark Lamborghini Revuelto viewed from the front three-quarter angle with its door open.",
    caption: "Lamborghini Revuelto. Y-shaped lights trace the edges of its angular nose.",
  },
  {
    id: "cnc24-1959", src: "/images/cars-n-copters-2024/chiron-nose.jpg",
    width: 2400, height: 3200,
    alt: "Silver Bugatti Chiron nose with a number 16 grille beside a helicopter.",
    caption: "Bugatti Chiron. The number 16 fills its horseshoe grille.",
  },
  {
    id: "cnc24-2658", src: "/images/cars-n-copters-2024/huayra-blue-front.jpg",
    width: 2400, height: 3200,
    alt: "Blue Pagani Huayra viewed from a low front angle, with gold wheels.",
    caption: "Pagani Huayra. Blue bodywork and gold wheels frame the separate headlight pods and low nose.",
  },
  {
    id: "cnc24-1355", src: "/images/cars-n-copters-2024/mclaren-spider-tails.jpg",
    width: 2400, height: 3200,
    alt: "Rear quarter of a white McLaren Spider beside other McLarens.",
    caption: "McLaren Spider. The raised rear wing sits above the deep openings across the tail.",
  },
  {
    id: "cnc24-2662", src: "/images/cars-n-copters-2024/huayra-front-quarter.jpg",
    width: 2400, height: 3200,
    alt: "Blue Pagani Huayra front quarter and gold wheel, with a green Pagani behind it.",
    caption: "Pagani Huayra. A closer look at the front wheel, small mirror stalk, and sculpted fender.",
  },
];

export const shoots: Shoot[] = [
  {
    slug: "the-california-grand-tour-2026", title: "The California Grand Tour 2026",
    description: "A day among the cars and the details at The California Grand Tour 2026.",
    date: "2026-05-23",
    coverId: "cgt-0485", photos: californiaGrandTourPhotos,
  },
  {
    slug: "cars-n-copters-2025", title: "Cars 'N Copters 2025",
    description: "Hypercars, custom builds, and helicopters along the Huntington Beach waterfront.",
    date: "2025-10-12", location: "Huntington Beach, California",
    coverId: "cnc-cover", photos: carsNCoptersPhotos, videos: carsNCoptersVideos,
  },
  {
    slug: "cars-n-copters-2024", title: "Cars 'N Copters 2024",
    description: "Pagani, McLaren, Bugatti, and Lamborghini along the Huntington Beach waterfront.",
    date: "2024-10-13", location: "Huntington Beach, California",
    coverId: "cnc24-2659", photos: carsNCopters2024Photos,
  },
];

export function getShoot(slug: string): Shoot | undefined {
  return shoots.find((shoot) => shoot.slug === slug);
}

export function formatShootDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function getCover(shoot: Shoot): Photo {
  const cover = shoot.photos.find((photo) => photo.id === shoot.coverId);
  if (!cover) throw new Error(`Shoot "${shoot.slug}" has no matching cover "${shoot.coverId}".`);
  return cover;
}

export function getHero(): Photo {
  if (site.heroImage) return site.heroImage;
  const shoot = getShoot(site.hero.shootSlug);
  const photo = shoot?.photos.find((item) => item.id === site.hero.photoId);
  if (!photo) throw new Error("The homepage hero does not reference an existing photo.");
  return photo;
}

export function isPlaceholderShoot(shoot: Shoot): boolean {
  return shoot.photos.some((photo) => photo.placeholder === true);
}

export const hasPlaceholders = shoots.some(isPlaceholderShoot);
