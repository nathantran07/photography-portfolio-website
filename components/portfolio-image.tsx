"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type JSX } from "react";

export function PortfolioImage({ src, alt, ...props }: Omit<ImageProps, "src" | "onError"> & { src: string }): JSX.Element {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (failedSource === src) return <span className="image-unavailable" role="img" aria-label={`Image unavailable: ${alt}`}>Image unavailable</span>;
  return <Image {...props} src={src} alt={alt} onError={(): void => setFailedSource(src)} />;
}
