"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [mobileOverlay, setMobileOverlay] = useState(false);
  const pathname = usePathname();
  const SectionLink = pathname === "/" ? "a" : Link;
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const focusedControlIndex = useRef(-1);
  const attachHeader = useCallback((node: HTMLElement | null): void => {
    const controls = header.current?.querySelectorAll<HTMLElement>("a[href], button");
    if (!node && controls) {
      focusedControlIndex.current = Array.from(controls).findIndex((control): boolean => control === document.activeElement);
    }
    header.current = node;
    if (node && focusedControlIndex.current >= 0) {
      node.querySelectorAll<HTMLElement>("a[href], button")[focusedControlIndex.current]?.focus({ preventScroll: true });
      focusedControlIndex.current = -1;
    }
  }, []);

  useEffect((): (() => void) | undefined => {
    if (pathname !== "/") return;
    const hero = document.querySelector(".home-hero");
    if (!hero) return;
    const mobileHeader = window.matchMedia("(max-width: 760px), (hover: none) and (pointer: coarse)");
    const headerHeight = header.current?.offsetHeight ?? 89;
    let heroIntersects = hero.getBoundingClientRect().bottom > headerHeight;
    function updateHeader(): void {
      // On touch screens, avoid a transparent fixed header over the mixed hero/content state.
      setOverHero(mobileHeader.matches ? window.scrollY <= 8 : heroIntersects);
      setMobileOverlay(mobileHeader.matches && window.scrollY <= 8);
    }
    function onScroll(): void {
      if (mobileHeader.matches) updateHeader();
    }
    const observer = new IntersectionObserver(([entry]): void => {
      heroIntersects = entry.isIntersecting;
      updateHeader();
    }, { rootMargin: `-${headerHeight}px 0px 0px 0px` });
    observer.observe(hero);
    window.addEventListener("scroll", onScroll, { passive: true });
    mobileHeader.addEventListener("change", updateHeader);
    updateHeader();
    return (): void => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      mobileHeader.removeEventListener("change", updateHeader);
    };
  }, [pathname]);

  return (
    // WebKit can retain the old fixed header's tint while its renderer survives.
    // Replace that node at the mobile hero boundary; keep menu state and focus.
    <header key={pathname === "/" && mobileOverlay ? "hero" : "surface"} ref={attachHeader} className={`site-header${pathname === "/" ? " home-header" : ""}${pathname === "/" && overHero ? " over-hero" : ""}`} onKeyDown={(event): void => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
      <div className="header-inner shell">
        <SectionLink className="wordmark" href="/#main" aria-label="Nathan Tran home" onClick={(): void => setOpen(false)}>Nathan Tran<span className="wordmark-dot" aria-hidden="true">.</span></SectionLink>
        <div className="header-actions">
          <nav className={`main-nav${open ? " is-open" : ""}`} id="main-navigation" aria-label="Main navigation">
            <SectionLink href="/#work" onClick={(): void => setOpen(false)}>Work</SectionLink>
            <SectionLink href="/#about" onClick={(): void => setOpen(false)}>About</SectionLink>
            <SectionLink href="/#contact" onClick={(): void => setOpen(false)}>Get in touch <span aria-hidden="true">↗</span></SectionLink>
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
