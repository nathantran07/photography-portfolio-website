import type { JSX } from "react";
import { site } from "@/content/portfolio";
import { ExternalIcon } from "@/components/icons";

export function Footer(): JSX.Element {
  return (
    <footer className="site-footer shell">
      <a className="wordmark" href="#main" aria-label="Nathan Tran — back to top">Nathan Tran<span className="wordmark-dot" aria-hidden="true">.</span></a>
      <span className="footer-note">© {new Date().getFullYear()} Nathan Tran</span>
      <a className="footer-social" href={site.instagram.url} target="_blank" rel="noopener noreferrer">{site.instagram.handle}<ExternalIcon /></a>
    </footer>
  );
}
