export type FocalPoint = { x: number; y: number };

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  focalPoint?: FocalPoint;
  placeholder?: boolean;
};

export type Shoot = {
  slug: string;
  title: string;
  description?: string;
  coverId: string;
  photos: Photo[];
  ogImage?: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  instagram: { handle: string; url: string };
  email?: string;
  featuredSlugs: string[];
  hero: { shootSlug: string; photoId: string };
};

export const site: SiteConfig = {
  name: "Nathan Tran",
  shortName: "Nate",
  description: "Automotive photography by Nathan Tran. A considered perspective on cars, their details, and the moments around them.",
  instagram: { handle: "@natexauto", url: "https://www.instagram.com/natexauto/" },
  featuredSlugs: ["study-01", "study-02", "study-03"],
  hero: { shootSlug: "study-01", photoId: "study-01-01" },
};

function placeholderPhotos(collection: string): Photo[] {
  const frames = [
    { src: "landscape", width: 2400, height: 1500, shape: "landscape" },
    { src: "portrait", width: 1200, height: 1600, shape: "portrait" },
    { src: "square", width: 1600, height: 1600, shape: "square" },
    { src: "wide", width: 2400, height: 1200, shape: "wide landscape" },
    { src: "portrait-light", width: 1200, height: 1600, shape: "portrait" },
    { src: "landscape-light", width: 2400, height: 1500, shape: "landscape" },
  ];

  return frames.map((frame, index): Photo => ({
    id: `${collection}-${String(index + 1).padStart(2, "0")}`,
    src: `/images/placeholders/${frame.src}.jpg`,
    width: frame.width,
    height: frame.height,
    alt: `Neutral ${frame.shape} placeholder, frame ${index + 1} of ${collection}. Photography to be added.`,
    focalPoint: { x: 50, y: 50 },
    placeholder: true,
  }));
}

export const shoots: Shoot[] = [
  {
    slug: "study-01", title: "Form & presence",
    description: "An example collection exploring the full frame. Neutral placeholders stand in for the photographs in this preview.",
    coverId: "study-01-01", photos: placeholderPhotos("study-01"),
  },
  {
    slug: "study-02", title: "The finer details",
    description: "An example collection for a closer look. Neutral placeholders stand in for the photographs in this preview.",
    coverId: "study-02-02", photos: placeholderPhotos("study-02"),
  },
  {
    slug: "study-03", title: "Between moments",
    description: "An example collection for the moments around the car. Neutral placeholders stand in for the photographs in this preview.",
    coverId: "study-03-06", photos: placeholderPhotos("study-03"),
  },
];

export function getShoot(slug: string): Shoot | undefined {
  return shoots.find((shoot) => shoot.slug === slug);
}

export function getCover(shoot: Shoot): Photo {
  const cover = shoot.photos.find((photo) => photo.id === shoot.coverId);
  if (!cover) throw new Error(`Shoot "${shoot.slug}" has no matching cover "${shoot.coverId}".`);
  return cover;
}

export function getHero(): Photo {
  const shoot = getShoot(site.hero.shootSlug);
  const photo = shoot?.photos.find((item) => item.id === site.hero.photoId);
  if (!photo) throw new Error("The homepage hero does not reference an existing photo.");
  return photo;
}

export function isPlaceholderShoot(shoot: Shoot): boolean {
  return shoot.photos.some((photo) => photo.placeholder === true);
}

export const hasPlaceholders = shoots.some(isPlaceholderShoot);
