import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getGalleryItems, shoots, site, type Photo } from "../content/portfolio";
import { resolvePublicAsset } from "../lib/content-validation";

const photos = [...shoots.flatMap(getGalleryItems), site.heroImage, site.headshot]
  .filter((photo): photo is Photo => photo !== undefined);
const sources = [...new Set(photos.map((photo): string => photo.src))].sort();
const previews: Record<string, string> = {};

for (const src of sources) {
  const asset = await resolvePublicAsset(src, path.resolve("public"));
  const preview = await sharp(asset).autoOrient()
    .resize({ width: 10, height: 10, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 50 }).toBuffer();
  previews[src] = `data:image/jpeg;base64,${preview.toString("base64")}`;
}

await writeFile(path.resolve("content/image-previews.json"), `${JSON.stringify(previews, null, 2)}\n`);
console.log(`Generated embedded loading previews for ${sources.length} images.`);
