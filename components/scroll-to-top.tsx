"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import { ArrowIcon } from "@/components/icons";

export function ScrollToTop(): JSX.Element {
  const pathname = usePathname();
  const [visiblePath, setVisiblePath] = useState<string | null>(null);
  const visible = visiblePath === pathname;

  useEffect((): (() => void) | undefined => {
    const cover = document.querySelector(".home-hero, .shoot-cover");
    if (!cover) return;
    const observer = new IntersectionObserver(([entry]): void => {
      setVisiblePath(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0 ? pathname : null);
    });
    observer.observe(cover);
    return (): void => observer.disconnect();
  }, [pathname]);

  function returnToTop(): void {
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <button className={`icon-button scroll-to-top${visible ? " is-visible" : ""}`} type="button" aria-label="Back to top" title="Back to top" aria-hidden={!visible} disabled={!visible} onClick={returnToTop}>
      <ArrowIcon />
    </button>
  );
}
