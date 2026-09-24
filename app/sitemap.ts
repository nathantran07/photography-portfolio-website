import type { MetadataRoute } from "next";
import { shoots } from "@/content/portfolio";
import { getSiteUrl, isIndexable } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable()) return [];
  return ["/", ...shoots.map((shoot) => `/work/${shoot.slug}`)].map((path) => ({ url: new URL(path, getSiteUrl()).href }));
}
