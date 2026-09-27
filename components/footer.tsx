import type { JSX } from "react";
import { site } from "@/content/portfolio";
import { ExternalIcon } from "@/components/icons";

export function Footer(): JSX.Element {
  return (
    <footer className="site-footer shell">
      <span className="wordmark">Nathan Tran<span className="wordmark-dot" aria-hidden="true">.</span></span>
      <span className="footer-note">© {new Date().getFullYear()} Nathan Tran</span>
      <a className="footer-social" href={site.instagram.url} target="_blank" rel="noopener noreferrer">{site.instagram.handle}<ExternalIcon /></a>
    </footer>
  );
}
