import { hasPlaceholders } from "@/content/portfolio";

export function getSiteUrl(): URL {
  const deployment = process.env.VERCEL_ENV === "preview" ? process.env.VERCEL_URL : process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL(process.env.VERCEL_ENV === "preview" && deployment ? `https://${deployment}` : configured || (deployment ? `https://${deployment}` : "http://localhost:3000"));
}

export function isIndexable(): boolean {
  return process.env.PORTFOLIO_INDEXABLE === "true" && !hasPlaceholders && process.env.VERCEL_ENV !== "preview";
}
