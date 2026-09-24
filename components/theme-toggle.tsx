"use client";

import { useSyncExternalStore, type JSX } from "react";

const themeEvent = "portfolio-theme-change";
let sessionChoice: "light" | "dark" | null = null;

function subscribe(callback: () => void): () => void {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  function syncPreference(): void {
    let saved: string | null = null;
    try { saved = localStorage.getItem("portfolio-theme"); } catch { /* Storage may be unavailable in private contexts. */ }
    const chosen = sessionChoice ?? (saved === "light" || saved === "dark" ? saved : null);
    document.documentElement.dataset.theme = chosen ?? (preference.matches ? "dark" : "light");
    callback();
  }
  function onStorage(event: StorageEvent): void {
    if (event.key !== "portfolio-theme" && event.key !== null) return;
    sessionChoice = event.newValue === "light" || event.newValue === "dark" ? event.newValue : null;
    syncPreference();
  }
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", onStorage);
  preference.addEventListener("change", syncPreference);
  return (): void => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", onStorage);
    preference.removeEventListener("change", syncPreference);
  };
}

function getSnapshot(): string {
  return document.documentElement.dataset.theme ?? "light";
}

export function ThemeToggle(): JSX.Element {
  const theme = useSyncExternalStore(subscribe, getSnapshot, (): string => "system");
  function toggle(): void {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    sessionChoice = next;
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch { /* The current session still keeps its selected theme. */ }
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button className="icon-button theme-toggle" type="button" onClick={toggle} aria-label={theme === "system" ? "Switch color theme" : `Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.2" /><path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" /></svg>
    </button>
  );
}
