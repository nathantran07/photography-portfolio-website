import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp, { type OverlayOptions } from "sharp";
import { getCover, getHero, homepageShare, shoots, site, type Photo } from "../content/portfolio";
import { resolvePublicAsset, validateContent } from "../lib/content-validation";

const WIDTH = 1200;
const HEIGHT = 630;
const publicRoot = path.resolve("public");
const outputRoot = path.join(publicRoot, "og");
const fontFile = path.join(publicRoot, "fonts", "Manrope-Variable.ttf");
const displayFontFile = path.join(publicRoot, "fonts", "CormorantGaramond-Variable.ttf");

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character: string): string => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!);
}

async function textLayer(text: string, size: number, color: string, left: number, top: number, width = 1064, maxHeight = 160, bold = false, display = false): Promise<OverlayOptions> {
  const rendered = await sharp({ text: {
    text: `<span foreground="${color}">${escapeXml(text)}</span>`,
    font: `${display ? "Cormorant Garamond" : "Manrope"} ${bold ? "Bold " : ""}${size}`,
    fontfile: display ? displayFontFile : fontFile,
    width,
    wrap: "word-char",
    rgba: true,
    dpi: 72,
  } }).png().toBuffer();
  const input = await sharp(rendered).resize({ width, height: maxHeight, fit: "inside", withoutEnlargement: true }).png().toBuffer();
  return { input, left, top };
}

async function coverCrop(photo: Photo): Promise<Buffer> {
  const asset = await resolvePublicAsset(photo.src, publicRoot);
  const ratio = WIDTH / HEIGHT;
  const cropWidth = Math.min(photo.width, Math.round(photo.height * ratio));
  const cropHeight = Math.min(photo.height, Math.round(photo.width / ratio));
  const focalPoint = photo.focalPoint ?? { x: 50, y: 50 };
  const left = Math.round((photo.width - cropWidth) * focalPoint.x / 100);
  const top = Math.round((photo.height - cropHeight) * focalPoint.y / 100);
  return sharp(asset).autoOrient().extract({ left, top, width: cropWidth, height: cropHeight }).resize(WIDTH, HEIGHT).toBuffer();
}

async function generateHome(): Promise<void> {
  const hero = getHero();
  const background = await coverCrop({ ...hero, focalPoint: { x: 50, y: 82 } });
  const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <defs><radialGradient id="shade" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 60) scale(760 360)"><stop stop-color="#101412" stop-opacity=".88"/><stop offset=".6" stop-color="#101412" stop-opacity=".46"/><stop offset="1" stop-color="#101412" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
  </svg>`);
  const layers = await Promise.all([
    textLayer(site.name, 88, "#f4f1ea", 52, 40, 680, 112, false, true),
    textLayer("AUTOMOTIVE PHOTOGRAPHY & FILM", 26, "#e9e2d6", 57, 142, 700, 36),
  ]);
  const image = await sharp(background).composite([{ input: shade }, ...layers]).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
  await Promise.all([
    writeFile(path.join(outputRoot, path.basename(homepageShare.image)), image),
    writeFile(path.join(outputRoot, "home.jpg"), image),
  ]);
}

async function generateShootImages(): Promise<void> {
  for (const shoot of shoots) {
    const destination = path.join(outputRoot, `${shoot.slug}.jpg`);
    if (shoot.ogImage) {
      const asset = await resolvePublicAsset(shoot.ogImage, publicRoot);
      const image = await sharp(asset).autoOrient().flatten({ background: "#f1eee7" }).jpeg({ quality: 93, mozjpeg: true }).toBuffer();
      await sharp(image).toFile(destination);
    } else {
      const background = await coverCrop(getCover(shoot));
      const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
        <defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#181b17" stop-opacity=".12"/><stop offset=".45" stop-color="#181b17" stop-opacity=".32"/><stop offset="1" stop-color="#181b17" stop-opacity=".94"/></linearGradient></defs>
        <rect width="1200" height="630" fill="url(#shade)"/>
        <path d="M68 545H1132" stroke="#f1eee7" stroke-opacity=".28"/>
        <path d="M68 329H110" stroke="#ceb184" stroke-width="3"/>
      </svg>`);
      const layers = await Promise.all([
        textLayer(shoot.videos?.length ? "AUTOMOTIVE PHOTOGRAPHY & FILM" : "AUTOMOTIVE PHOTOGRAPHY", 18, "#f1eee7", 68, 63, 900, 28),
        textLayer(shoot.title, 70, "#f1eee7", 64, 369, 1064, 146, true),
        textLayer(site.name, 22, "#f1eee7", 68, 569, 640, 34),
        textLayer(site.instagram.handle, 19, "#ddd4c3", 941, 571, 192, 34),
      ]);
      await sharp(background).composite([{ input: shade }, ...layers]).jpeg({ quality: 93, mozjpeg: true }).toFile(destination);
    }
    console.log(`Generated /og/${shoot.slug}.jpg`);
  }
}

const errors = await validateContent(site, shoots, publicRoot);
if (errors.length > 0) throw new Error(`Cannot generate share images:\n${errors.join("\n")}`);
await access(fontFile);
await access(displayFontFile);
await mkdir(outputRoot, { recursive: true });
await generateHome();
await generateShootImages();
console.log(`Generated ${homepageShare.image} (all share images are 1200x630).`);
