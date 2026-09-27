import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export function pageMetadata({ title, description, path, image, imageAlt }: { title: string; description: string; path: string; image: string; imageAlt: string }): Metadata {
  const url = new URL(path, getSiteUrl()).href;
  const imageUrl = new URL(image, getSiteUrl()).href;
  return {
    title: { absolute: title }, description, alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_US", siteName: "Nathan Tran — Photography & Film", title, description, url, images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: imageUrl, alt: imageAlt }] },
  };
}
