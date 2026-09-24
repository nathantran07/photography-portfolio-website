import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp, { type OverlayOptions } from "sharp";
import { getCover, shoots, site, type Photo } from "../content/portfolio";
import { resolvePublicAsset, validateContent } from "../lib/content-validation";

const WIDTH = 1200;
const HEIGHT = 630;
const publicRoot = path.resolve("public");
const outputRoot = path.join(publicRoot, "og");
const fontFile = path.join(publicRoot, "fonts", "Manrope-Variable.ttf");

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character: string): string => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]!);
}

async function textLayer(text: string, size: number, color: string, left: number, top: number, width = 1064, maxHeight = 160, bold = false): Promise<OverlayOptions> {
  const rendered = await sharp({ text: {
    text: `<span foreground="${color}">${escapeXml(text)}</span>`,
    font: `Manrope ${bold ? "Bold " : ""}${size}`,
    fontfile: fontFile,
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
  const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <rect width="1200" height="630" fill="#f1eee7"/>
    <path d="M68 68H1132M68 535H1132" stroke="#cfcbc1"/>
    <path d="M918 124H1132V338M946 152H1104V310M974 180H1076V282" fill="none" stroke="#aa9065" stroke-width="2"/>
    <rect x="68" y="124" width="42" height="3" fill="#a08556"/>
  </svg>`);
  const layers = await Promise.all([
    textLayer("AUTOMOTIVE PHOTOGRAPHY", 20, "#625e55", 68, 153, 820, 32),
    textLayer(site.name, 104, "#22241f", 62, 219, 1064, 153, true),
    textLayer("A considered perspective.", 27, "#625e55", 68, 410, 850, 54),
    textLayer(site.instagram.handle, 20, "#22241f", 68, 561, 900, 32),
    textLayer("PORTFOLIO", 16, "#796b51", 1013, 565, 120, 28),
  ]);
  await sharp(background).composite(layers).jpeg({ quality: 93, mozjpeg: true }).toFile(path.join(outputRoot, "home.jpg"));
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
        textLayer("AUTOMOTIVE PHOTOGRAPHY", 18, "#f1eee7", 68, 63, 900, 28),
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
await mkdir(outputRoot, { recursive: true });
await generateHome();
await generateShootImages();
console.log("Generated /og/home.jpg (all share images are 1200x630).");
