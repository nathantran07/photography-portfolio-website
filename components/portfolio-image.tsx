"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type JSX } from "react";
import generatedPreviews from "@/content/image-previews.json";

const imagePreviews: Record<string, string> = generatedPreviews;

export function PortfolioImage({ src, alt, ...props }: Omit<ImageProps, "src" | "onError"> & { src: string }): JSX.Element {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const blurDataURL = props.blurDataURL ?? imagePreviews[src];
  if (failedSource === src) return <span className="image-unavailable" role="img" aria-label={`Image unavailable: ${alt}`}>Image unavailable</span>;
  return <Image {...props} src={src} alt={alt} placeholder={props.placeholder ?? (blurDataURL ? "blur" : "empty")} blurDataURL={blurDataURL} onError={(): void => setFailedSource(src)} />;
}
