import type { Photo } from "@/content/portfolio";

export type GalleryEntry = { photo: Photo; index: number };

export function galleryRows(photos: Photo[]): GalleryEntry[][] {
  const rows: GalleryEntry[][] = [];
  let row: GalleryEntry[] = [];
  let ratio = 0;

  function flush(): void {
    if (row.length) rows.push(row);
    row = [];
    ratio = 0;
  }

  photos.forEach((photo, index): void => {
    const aspect = photo.width / photo.height;
    if (aspect >= 2.4 || aspect < 0.5) {
      flush();
      rows.push([{ photo, index }]);
      return;
    }
    if (row.length >= 2 && Math.abs(ratio - 3.3) < Math.abs(ratio + aspect - 3.3)) flush();
    row.push({ photo, index });
    ratio += aspect;
    if (row.length === 4 || ratio >= 3.3) flush();
  });
  flush();

  const last = rows.at(-1);
  const previous = rows.at(-2);
  if (last?.length === 1 && previous && previous.length > 1 && previous.length < 4) {
    const lastRatio = last[0].photo.width / last[0].photo.height;
    const combinedRatio = [...previous, ...last].reduce((sum, entry) => sum + entry.photo.width / entry.photo.height, 0);
    if (lastRatio >= 0.5 && lastRatio < 2.4 && combinedRatio <= 5) {
      previous.push(...last);
      rows.pop();
    }
  }
  return rows;
}

export function galleryRowWidth(row: GalleryEntry[]): number {
  return row.length === 1 ? Math.min(1328, 620 * row[0].photo.width / row[0].photo.height) : 1328;
}

export function galleryImageSizes(photo: Photo, row: GalleryEntry[]): string {
  const share = (photo.width / photo.height) / row.reduce((sum, entry) => sum + entry.photo.width / entry.photo.height, 0);
  const gaps = (row.length - 1) * 12;
  const maximum = ((galleryRowWidth(row) - gaps) * share).toFixed(2);
  const mobileMaximum = row.length === 1 ? maximum : 720;
  return `(max-width: 760px) min(calc(100vw - 40px), ${mobileMaximum}px), (max-width: 1000px) min(calc(${(share * 100).toFixed(3)}vw - ${((72 + gaps) * share).toFixed(2)}px), ${maximum}px), (max-width: 1440px) min(calc(${(share * 100).toFixed(3)}vw - ${((112 + gaps) * share).toFixed(2)}px), ${maximum}px), ${maximum}px`;
}

export function viewerImageSizes(photo: Photo): string {
  const ratio = photo.width / photo.height;
  // Viewer controls and padding occupy at least 180px; the stage has an 80px minimum.
  const heightBound = `max(${(80 * ratio).toFixed(2)}px, calc(${(100 * ratio).toFixed(3)}dvh - ${(180 * ratio).toFixed(2)}px))`;
  return `(max-width: 760px) min(calc(100vw - 32px), ${heightBound}), min(calc(100vw - 96px), ${heightBound})`;
}
