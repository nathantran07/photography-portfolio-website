import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { shoots } from "../content/portfolio";

const photos = [...new Map(shoots.flatMap((shoot) => shoot.photos).filter((photo) => photo.placeholder === true).map((photo) => [photo.src, photo])).values()];

for (const [index, photo] of photos.entries()) {
  if (!/^\/images\/placeholders\/[a-z0-9-]+\.jpg$/.test(photo.src)) throw new Error(`Refusing to generate placeholder outside /images/placeholders: ${photo.src}`);
  const light = photo.src.includes("light");
  const { width, height } = photo;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light ? "#ede9e1" : "#b7b1a7"}"/><stop offset="1" stop-color="${light ? "#c9c3b8" : "#595851"}"/></linearGradient>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#232522" stop-opacity="0"/><stop offset="1" stop-color="#232522" stop-opacity=".21"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="#fffdf5" stop-opacity=".4"/><stop offset="1" stop-color="#fffdf5" stop-opacity="0"/></radialGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="${width * 0.035}"/></filter>
    </defs>
    <path fill="url(#base)" d="M0 0h${width}v${height}H0z"/>
    <ellipse cx="${width * 0.2}" cy="${height * 0.1}" rx="${width * 0.85}" ry="${height * 0.9}" fill="url(#glow)"/>
    <path d="M${width * (0.4 + index * 0.035)} ${-height * 0.2} L${width * 0.95} ${height * 1.2} L${width * 1.5} ${height * 1.2} L${width} ${-height * 0.2}Z" fill="url(#shade)" filter="url(#soft)"/>
  </svg>`;
  const destination = path.resolve("public", `.${photo.src}`);
  await mkdir(path.dirname(destination), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile(destination);
  console.log(`Generated ${photo.src} (${width}x${height})`);
}
