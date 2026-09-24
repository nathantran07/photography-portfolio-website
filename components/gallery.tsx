"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import { PhotoFrame } from "@/components/photo-frame";
import { PortfolioImage } from "@/components/portfolio-image";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import type { Photo } from "@/content/portfolio";

export function Gallery({ photos, title }: { photos: Photo[]; title: string }): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const activePhoto = photos[activeIndex];

  useEffect((): void => {
    if (isOpen && !dialog.current?.open) dialog.current?.showModal();
    if (!isOpen && dialog.current?.open) dialog.current?.close();
  }, [isOpen]);

  function close(): void { dialog.current?.close(); }
  function move(direction: number): void { setActiveIndex((current) => (current + direction + photos.length) % photos.length); }

  return <>
    <div className="gallery-grid">
      {photos.map((photo, index) => <figure className={`gallery-item${photo.width / photo.height >= 1.8 ? " gallery-wide" : ""}`} key={photo.id}>
        <button className="gallery-trigger" type="button" aria-label={`Enlarge photograph ${index + 1}: ${photo.alt}`} aria-haspopup="dialog" onClick={(event): void => { opener.current = event.currentTarget; setActiveIndex(index); setIsOpen(true); }}>
          <PhotoFrame photo={photo} natural sizes={photo.width / photo.height >= 1.8 ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 112px), 1328px" : "(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) calc((100vw - 160px) / 2), 640px"} />
          <span className="enlarge-label" aria-hidden="true">View frame <span>↗</span></span>
        </button>
        <figcaption className="gallery-caption"><span>{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>{photo.placeholder && <span>Placeholder frame</span>}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="photo-viewer" aria-labelledby="viewer-title" onClose={(): void => { setIsOpen(false); opener.current?.focus(); }} onClick={(event): void => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event): void => {
      if (event.key === "Tab") {
        const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && event.target === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && event.target === last) { event.preventDefault(); first?.focus(); }
      }
      if (photos.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      <div className="viewer-top"><h2 id="viewer-title">{title}</h2><button className="icon-button viewer-close" onClick={close} aria-label="Close image viewer" autoFocus><CloseIcon /></button></div>
      {isOpen && activePhoto && <>
        <div className="viewer-stage"><PortfolioImage key={activePhoto.id} src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), calc(100vw - 160px)" quality={85} loading="eager" className="viewer-image" /></div>
        <div className="viewer-bottom"><p className="viewer-caption" aria-live="polite">{activePhoto.alt}</p><div className="viewer-controls">{photos.length > 1 && <button className="icon-button previous-image" onClick={(): void => move(-1)} aria-label="Previous photograph"><ArrowIcon /></button>}<span className="viewer-count" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>{photos.length > 1 && <button className="icon-button" onClick={(): void => move(1)} aria-label="Next photograph"><ArrowIcon /></button>}</div></div>
      </>}
    </dialog>
  </>;
}
