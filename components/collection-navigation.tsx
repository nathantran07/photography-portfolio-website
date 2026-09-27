"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, type ComponentProps, type JSX } from "react";
import { ArrowIcon } from "@/components/icons";

type ReturnPosition = { slug: string; openerId: string; x: number; y: number; width: number };
type CollectionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & { slug: string };

// Keep this visit's origin in the current tab. A reload or direct visit uses
// the collection-card anchor instead of an unrelated, older saved position.
let returnPosition: ReturnPosition | null = null;
let pendingReturn: ReturnPosition | null = null;

export function CollectionLink({ slug, id = `collection-${slug}`, ...props }: CollectionLinkProps): JSX.Element {
  return <Link {...props} id={id} href={`/work/${slug}`} onNavigate={(): void => {
    returnPosition = { slug, openerId: id, x: window.scrollX, y: window.scrollY, width: window.innerWidth };
    pendingReturn = null;
  }} />;
}

export function BackToWork({ slug }: { slug: string }): JSX.Element {
  const router = useRouter();
  return <Link className="text-link back-link" href={`/#collection-${slug}`} onNavigate={(event): void => {
    if (returnPosition?.slug !== slug) return;
    event.preventDefault();
    pendingReturn = returnPosition;
    router.push("/", { scroll: false });
  }}><ArrowIcon /> Work</Link>;
}

export function RestoreCollectionPosition(): null {
  useLayoutEffect((): void => {
    const position = pendingReturn;
    pendingReturn = null;
    if (!position) return;
    const opener = document.getElementById(position.openerId);
    opener?.focus({ preventScroll: true });
    if (position.width !== window.innerWidth && opener) {
      opener.scrollIntoView({ block: "start", behavior: "instant" });
    } else {
      window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
    }
  }, []);
  return null;
}
