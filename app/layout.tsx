import type { Metadata, Viewport } from "next";
import type { JSX, ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { homepageShare, site } from "@/content/portfolio";
import { getSiteUrl, isIndexable } from "@/lib/site-url";
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

// Run before hydration so browser restoration and a stale section anchor cannot
// move a refreshed page. Leave ordinary navigation and Back/Forward untouched.
const reloadScrollScript = `(() => {
  if (performance.getEntriesByType('navigation')[0]?.type !== 'reload') return;
  const restoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  window.addEventListener('pageshow', () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      history.scrollRestoration = restoration;
    });
  }, { once: true });
})();`;

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><head><meta name="theme-color" content="#f4f1ea" suppressHydrationWarning /><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script dangerouslySetInnerHTML={{ __html: reloadScrollScript }} /></head><body><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /><ScrollToTop /></body></html>;
}
