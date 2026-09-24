import { PortfolioImage } from "@/components/portfolio-image";
import type { JSX } from "react";
import type { Photo } from "@/content/portfolio";

type PhotoFrameProps = {
  photo: Photo;
  sizes: string;
  preload?: boolean;
  className?: string;
  label?: string;
  natural?: boolean;
};

export function PhotoFrame({ photo, sizes, preload = false, className = "", label, natural = false }: PhotoFrameProps): JSX.Element {
  return (
    <div className={`photo-frame ${className}`} style={natural ? { aspectRatio: `${photo.width} / ${photo.height}` } : undefined}>
      <PortfolioImage src={photo.src} alt={photo.alt} fill sizes={sizes} preload={preload} quality={85} className="frame-image" style={{ objectPosition: `${photo.focalPoint?.x ?? 50}% ${photo.focalPoint?.y ?? 50}%` }} />
      {photo.placeholder && <span className="placeholder-mark" aria-hidden="true"><span className="focus-mark" /><span>Photograph to follow</span></span>}
      {label && <span className="frame-label" aria-hidden="true">{label}</span>}
      <span className="frame-corner top-left" aria-hidden="true" /><span className="frame-corner bottom-right" aria-hidden="true" />
    </div>
  );
}
