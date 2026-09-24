"use client";

import Link from "next/link";
import { useRef, useState, type JSX } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="site-header" onKeyDown={(event): void => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
      <div className="header-inner shell">
        <Link className="wordmark" href="/" onClick={(): void => setOpen(false)} aria-label="Nathan Tran — home">Nathan Tran<span className="wordmark-dot" aria-hidden="true">.</span></Link>
        <div className="header-actions">
          <nav className={`main-nav${open ? " is-open" : ""}`} id="main-navigation" aria-label="Main navigation">
            <Link href="/#work" onClick={(): void => setOpen(false)}>Selected work</Link>
            <Link href="/#about" onClick={(): void => setOpen(false)}>About</Link>
            <Link href="/#contact" onClick={(): void => setOpen(false)}>Get in touch <span aria-hidden="true">↗</span></Link>
          </nav>
          <span className="nav-divider" aria-hidden="true" />
          <ThemeToggle />
          <button className="icon-button mobile-menu" ref={menuButton} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={(): void => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={open ? "M6 6 18 18M6 18 18 6" : "M4 8h16M4 16h16"} stroke="currentColor" strokeWidth="1.2" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
