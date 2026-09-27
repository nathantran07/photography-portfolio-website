import type { Metadata, Viewport } from "next";
import type { JSX, ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteEntrance } from "@/components/site-entrance";
import { homepageShare, site } from "@/content/portfolio";
import { getSiteUrl, isIndexable } from "@/lib/site-url";
import { reloadScrollScript } from "@/lib/reload-scroll";
import { siteEntranceScript } from "@/lib/site-entrance";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: homepageShare.title, template: "%s — Nathan Tran" },
  description: site.description,
  robots: { index: isIndexable(), follow: isIndexable() },
  openGraph: { type: "website", locale: "en_US", siteName: "Nathan Tran — Photography & Film", title: homepageShare.title, description: site.description, images: [{ url: homepageShare.image, width: 1200, height: 630, alt: homepageShare.alt }] },
  twitter: { card: "summary_large_image", title: homepageShare.title, description: site.description, images: [{ url: homepageShare.image, alt: homepageShare.alt }] },
};

const themeScript = `(function(){var t;try{t=localStorage.getItem('portfolio-theme')}catch(e){}t=t==='dark'?'dark':'light';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#161816':'#f4f1ea'})()`;

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><head><meta name="theme-color" content="#f4f1ea" suppressHydrationWarning /><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script dangerouslySetInnerHTML={{ __html: reloadScrollScript }} /><script dangerouslySetInnerHTML={{ __html: siteEntranceScript }} /></head><body><SiteEntrance /><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /><ScrollToTop /></body></html>;
}
