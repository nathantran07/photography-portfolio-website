import type { JSX } from "react";
import Link from "next/link";
import { site } from "@/content/portfolio";
import { ExternalIcon } from "@/components/icons";

export function Footer(): JSX.Element {
  return (
    <footer className="site-footer shell">
      <Link className="wordmark" href="/">Nathan Tran<span className="wordmark-dot" aria-hidden="true">.</span></Link>
      <span className="footer-note">© {new Date().getFullYear()} Nathan Tran</span>
      <a className="footer-social" href={site.instagram.url} target="_blank" rel="noopener noreferrer">{site.instagram.handle}<ExternalIcon /></a>
    </footer>
  );
}
