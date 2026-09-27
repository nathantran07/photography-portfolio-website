import { open, realpath, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isDimension(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function isInside(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative);
}

export async function resolvePublicAsset(src: unknown, publicRoot: string): Promise<string> {
  if (!isText(src) || !src.startsWith("/") || src.startsWith("//") || /[\\%?#\u0000-\u001f]/.test(src) || src.split("/").some((part) => part === "." || part === "..")) {
    throw new Error("must be a safe local URL under public, beginning with one slash");
  }
  if (src.startsWith("/og/")) throw new Error("must not use generated /og/ files as source assets; store originals under /images/");
  const root = await realpath(publicRoot);
  const candidate = path.resolve(root, `.${src}`);
  if (!isInside(root, candidate)) throw new Error("must stay within public");
  let actual: string;
  try {
    actual = await realpath(candidate);
  } catch {
    throw new Error(`file does not exist: ${src}`);
  }
  if (!isInside(root, actual)) throw new Error("must not link outside public");
  if (!(await stat(actual)).isFile()) throw new Error(`must reference a file: ${src}`);
  return actual;
}

export async function validateContent(site: unknown, shoots: unknown, publicRoot = path.resolve("public"), films: unknown = []): Promise<string[]> {
  const errors: string[] = [];
  const fail = (location: string, message: string): void => { errors.push(`${location}: ${message}`); };
  async function validatePhoto(photo: RecordValue, photoLocation: string): Promise<void> {
    if (!isText(photo.id)) fail(`${photoLocation}.id`, "must be a non-empty string");
    if (!isText(photo.alt)) fail(`${photoLocation}.alt`, "must be a non-empty, non-whitespace string");
    if (photo.caption !== undefined && !isText(photo.caption)) fail(`${photoLocation}.caption`, "must be a non-empty, non-whitespace string when supplied");
    if (!isDimension(photo.width)) fail(`${photoLocation}.width`, "must be a positive integer");
    if (!isDimension(photo.height)) fail(`${photoLocation}.height`, "must be a positive integer");
    if (photo.focalPoint !== undefined) {
      if (!isRecord(photo.focalPoint)) fail(`${photoLocation}.focalPoint`, "must contain x and y percentages");
      else for (const axis of ["x", "y"] as const) {
        const value = photo.focalPoint[axis];
        if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) fail(`${photoLocation}.focalPoint.${axis}`, "must be a finite number from 0 to 100");
      }
    }
    try {
      const asset = await resolvePublicAsset(photo.src, publicRoot);
      const metadata = await sharp(asset).metadata();
      const width = metadata.autoOrient?.width ?? metadata.width;
      const height = metadata.autoOrient?.height ?? metadata.height;
      if (!width || !height) fail(`${photoLocation}.src`, "must be a readable image with dimensions");
      else if (isDimension(photo.width) && isDimension(photo.height) && (width !== photo.width || height !== photo.height)) fail(photoLocation, `declares ${photo.width}x${photo.height}, but image is ${width}x${height} after orientation`);
    } catch (error) {
      fail(`${photoLocation}.src`, error instanceof Error ? error.message : String(error));
    }
  }
  async function validateVideoFile(video: RecordValue, videoLocation: string): Promise<void> {
    if (video.caption === undefined) fail(`${videoLocation}.caption`, "must be a non-empty, non-whitespace string");
    if (typeof video.duration !== "number" || !Number.isFinite(video.duration) || video.duration <= 0) fail(`${videoLocation}.duration`, "must be a finite positive number of seconds");
    try {
      const asset = await resolvePublicAsset(video.videoSrc, publicRoot);
      if (!/\.mp4$/i.test(String(video.videoSrc))) fail(`${videoLocation}.videoSrc`, "must be an MP4 file");
      const file = await open(asset, "r");
      try {
        const header = Buffer.alloc(12);
        const { bytesRead } = await file.read(header, 0, header.length, 0);
        if (bytesRead < 12 || header.toString("ascii", 4, 8) !== "ftyp") fail(`${videoLocation}.videoSrc`, "must contain an MP4 file header");
        const bytes = (await file.stat()).size;
        if (bytes <= 32 || bytes >= 100 * 1024 * 1024) fail(`${videoLocation}.videoSrc`, "must be nonempty and smaller than 100 MiB");
      } finally { await file.close(); }
    } catch (error) {
      fail(`${videoLocation}.videoSrc`, error instanceof Error ? error.message : String(error));
    }
  }
  if (!Array.isArray(shoots)) return ["shoots: must be an array"];
  const seenSlugs = new Set<string>();
  const photoIdsBySlug = new Map<string, Set<string>>();

  for (const [shootIndex, shoot] of shoots.entries()) {
    const location = `shoots[${shootIndex}]`;
    if (!isRecord(shoot)) { fail(location, "must be an object"); continue; }
    if (!isText(shoot.slug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(shoot.slug) || shoot.slug === "home") {
      fail(`${location}.slug`, "must be a lowercase hyphenated URL slug; home is reserved for the homepage share image");
    } else {
      if (seenSlugs.has(shoot.slug)) fail(`${location}.slug`, `duplicate slug "${shoot.slug}"`);
      seenSlugs.add(shoot.slug);
    }
    if (!isText(shoot.title)) fail(`${location}.title`, "must be a non-empty string");
    if ("date" in shoot && !isCalendarDate(shoot.date)) fail(`${location}.date`, "must be a real calendar date in YYYY-MM-DD format");
    if ("location" in shoot && !isText(shoot.location)) fail(`${location}.location`, "must be a non-empty, non-whitespace string");
    const photoIds = new Set<string>();
    if (isText(shoot.slug)) photoIdsBySlug.set(shoot.slug, photoIds);
    if (!Array.isArray(shoot.photos) || shoot.photos.length === 0) {
      fail(`${location}.photos`, "must be a non-empty gallery");
    } else {
      for (const [photoIndex, photo] of shoot.photos.entries()) {
        const photoLocation = `${location}.photos[${photoIndex}]`;
        if (!isRecord(photo)) { fail(photoLocation, "must be an object"); continue; }
        if ("videoSrc" in photo) fail(photoLocation, "video records belong in this shoot's videos array");
        if (isText(photo.id)) {
          if (photoIds.has(photo.id)) fail(`${photoLocation}.id`, `duplicate photo ID "${photo.id}" in this shoot`);
          photoIds.add(photo.id);
        }
        await validatePhoto(photo, photoLocation);
      }
    }
    if (!isText(shoot.coverId) || !photoIds.has(shoot.coverId)) fail(`${location}.coverId`, `does not resolve to a photo in this shoot: ${String(shoot.coverId)}`);
    if (shoot.videos !== undefined) {
      if (!Array.isArray(shoot.videos)) fail(`${location}.videos`, "must be an array when supplied");
      else {
        const mediaIds = new Set(photoIds);
        for (const [videoIndex, video] of shoot.videos.entries()) {
          const videoLocation = `${location}.videos[${videoIndex}]`;
          if (!isRecord(video)) { fail(videoLocation, "must be an object"); continue; }
          await validatePhoto(video, videoLocation);
          if (isText(video.id)) {
            if (mediaIds.has(video.id)) fail(`${videoLocation}.id`, `duplicate media ID "${video.id}" in this shoot`);
            mediaIds.add(video.id);
          }
          await validateVideoFile(video, videoLocation);
        }
      }
    }
    if (shoot.ogImage !== undefined) {
      try {
        const asset = await resolvePublicAsset(shoot.ogImage, publicRoot);
        const metadata = await sharp(asset).metadata();
        if (!/\.(?:png|jpe?g)$/i.test(String(shoot.ogImage)) || !["png", "jpeg"].includes(metadata.format ?? "")) fail(`${location}.ogImage`, "must be a PNG or JPG image");
        if ((metadata.autoOrient?.width ?? metadata.width) !== 1200 || (metadata.autoOrient?.height ?? metadata.height) !== 630) fail(`${location}.ogImage`, "must be exactly 1200x630 after orientation");
      } catch (error) {
        fail(`${location}.ogImage`, error instanceof Error ? error.message : String(error));
      }
    }
  }
  if (!isRecord(site)) { fail("site", "must be an object"); return errors; }
  for (const field of ["heroImage", "headshot"] as const) {
    if (field in site) {
      if (!isRecord(site[field])) fail(`site.${field}`, "must be a photo object");
      else await validatePhoto(site[field], `site.${field}`);
    }
  }
  if (!Array.isArray(site.featuredSlugs)) fail("site.featuredSlugs", "must be an array");
  else site.featuredSlugs.forEach((slug: unknown, index: number): void => {
    if (typeof slug !== "string" || !seenSlugs.has(slug)) fail(`site.featuredSlugs[${index}]`, `does not resolve to a shoot: ${String(slug)}`);
  });
  if (!isRecord(site.hero)) fail("site.hero", "must reference a shootSlug and photoId");
  else {
    const photoIds = typeof site.hero.shootSlug === "string" ? photoIdsBySlug.get(site.hero.shootSlug) : undefined;
    if (!photoIds) fail("site.hero.shootSlug", `does not resolve to a shoot: ${String(site.hero.shootSlug)}`);
    if (typeof site.hero.photoId !== "string" || !photoIds?.has(site.hero.photoId)) fail("site.hero.photoId", `does not resolve to a photo in the hero shoot: ${String(site.hero.photoId)}`);
  }
  const filmIds = new Set<string>();
  const filmSources = new Set<string>();
  if (!Array.isArray(films)) fail("films", "must be an array");
  else for (const [index, film] of films.entries()) {
    const location = `films[${index}]`;
    if (!isRecord(film)) { fail(location, "must be an object"); continue; }
    for (const field of ["id", "title", "footageCredit"] as const) {
      if (!isText(film[field])) fail(`${location}.${field}`, "must be a non-empty string");
    }
    if (isText(film.id)) {
      if (filmIds.has(film.id)) fail(`${location}.id`, "duplicate film project ID");
      filmIds.add(film.id);
    }
    if (film.role !== "Editing" && film.role !== "Filming & editing") fail(`${location}.role`, "must be Editing or Filming & editing");
    if (!isRecord(film.video)) { fail(`${location}.video`, "must be a video object"); continue; }
    if (isText(film.video.videoSrc)) {
      if (filmSources.has(film.video.videoSrc)) fail(`${location}.video.videoSrc`, "duplicate homepage film");
      filmSources.add(film.video.videoSrc);
    }
    await validatePhoto(film.video, `${location}.video`);
    await validateVideoFile(film.video, `${location}.video`);
  }
  return errors;
}
