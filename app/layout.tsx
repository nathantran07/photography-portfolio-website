import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/portfolio";
import { getSiteUrl, isIndexable } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: "Nathan Tran — Automotive Photography", template: "%s — Nathan Tran" },
  description: site.description,
  robots: { index: isIndexable(), follow: isIndexable() },
  openGraph: { type: "website", locale: "en_US", siteName: "Nathan Tran Photography", title: "Nathan Tran — Automotive Photography", description: site.description, images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Nathan Tran — Automotive Photography — @natexauto" }] },
  twitter: { card: "summary_large_image", title: "Nathan Tran — Automotive Photography", description: site.description, images: [{ url: "/og/home.jpg", alt: "Nathan Tran — Automotive Photography — @natexauto" }] },
};

const themeScript = `(function(){var t;try{t=localStorage.getItem('portfolio-theme')}catch(e){}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`;

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
