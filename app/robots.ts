import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: isIndexable() ? new URL("/sitemap.xml", getSiteUrl()).href : undefined };
}
