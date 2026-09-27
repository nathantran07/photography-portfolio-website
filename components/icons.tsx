import type { JSX } from "react";

type IconProps = { className?: string };

export function EmailIcon({ className }: IconProps): JSX.Element {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function InstagramIcon({ className }: IconProps): JSX.Element {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.25" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.25" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
}

export function ArrowIcon({ className }: IconProps): JSX.Element {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ExternalIcon({ className }: IconProps): JSX.Element {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CloseIcon(): JSX.Element {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" /></svg>;
}

export function PlayIcon(): JSX.Element {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 10 7-10 7V5Z" fill="currentColor" /></svg>;
}
