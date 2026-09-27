"use client";

import { useEffect, useRef, useState, type JSX, type TouchEvent } from "react";
import { PhotoFrame } from "@/components/photo-frame";
import { PortfolioImage } from "@/components/portfolio-image";
import { VideoPlayer } from "@/components/video-player";
import { ArrowIcon, CloseIcon, ExternalIcon, PlayIcon } from "@/components/icons";
import { galleryImageSizes, galleryRows, galleryRowWidth, viewerImageSizes } from "@/lib/gallery-layout";
import { isVideo, site, type GalleryItem } from "@/content/portfolio";

type SwipeStart = { id: number; x: number; y: number };

export function Gallery({ photos, title }: { photos: GalleryItem[]; title: string }): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const swipeStart = useRef<SwipeStart | null>(null);
  const activePhoto = photos[activeIndex];
  const rows = galleryRows(photos);
  const hasVideos = photos.some(isVideo);
  const firstVideoIndex = photos.findIndex(isVideo);

  useEffect((): void => {
    if (isOpen && !dialog.current?.open) dialog.current?.showModal();
    if (!isOpen && dialog.current?.open) dialog.current?.close();
  }, [isOpen]);

  function close(): void { dialog.current?.close(); }
  function move(direction: number): void {
    if (photos.length > 1) setActiveIndex((current) => (current + direction + photos.length) % photos.length);
  }

  function startSwipe(event: TouchEvent<HTMLDivElement>): void {
    if (isVideo(activePhoto)) return;
    const touch = event.touches[0];
    swipeStart.current = event.touches.length === 1 && photos.length > 1 ? { id: touch.identifier, x: touch.clientX, y: touch.clientY } : null;
  }

  function endSwipe(event: TouchEvent<HTMLDivElement>): void {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || event.touches.length) return;
    const touch = Array.from(event.changedTouches).find((item) => item.identifier === start.id);
    if (!touch) return;
    const x = touch.clientX - start.x;
    const y = touch.clientY - start.y;
    if (Math.abs(x) >= 48 && Math.abs(x) > Math.abs(y) * 1.5) move(x < 0 ? 1 : -1);
  }

  return <>
    <div className="gallery-rows">
      {rows.map((row) => <div className="gallery-row" key={row[0].photo.id} style={{ maxWidth: galleryRowWidth(row) }}>
        {row.map(({ photo, index }) => <figure className="gallery-item" id={index === firstVideoIndex ? "films" : undefined} key={photo.id} style={{ flex: `${photo.width / photo.height} 1 0%` }}>
          <button className={`gallery-trigger${isVideo(photo) ? " video-trigger" : ""}`} type="button" aria-label={`${isVideo(photo) ? "Open film" : "Enlarge photograph"} ${index + 1}: ${photo.alt}`} aria-haspopup="dialog" onClick={(event): void => { opener.current = event.currentTarget; setActiveIndex(index); setIsOpen(true); }}>
            <PhotoFrame photo={photo} natural sizes={galleryImageSizes(photo, row)} />
            {isVideo(photo) ? <span className="video-label" aria-hidden="true"><PlayIcon /><span>{Math.floor(photo.duration / 60)}:{String(Math.floor(photo.duration % 60)).padStart(2, "0")}</span></span> : <span className="enlarge-label" aria-hidden="true"><ExternalIcon /></span>}
          </button>
        </figure>)}
      </div>)}
    </div>
    <dialog ref={dialog} className="photo-viewer" aria-labelledby="viewer-title" onClose={(): void => { setIsOpen(false); swipeStart.current = null; opener.current?.focus(); }} onClick={(event): void => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event): void => {
      if (event.key === "Tab") {
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), video[controls]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && event.target === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && event.target === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.target instanceof HTMLVideoElement) return;
      if (photos.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      <div className="viewer-top"><div className="viewer-identity"><span className="eyebrow">{site.name} / {hasVideos ? "Photography & film" : "Photography"}</span><h2 id="viewer-title">{title}</h2></div><button className="icon-button viewer-close" onClick={close} aria-label="Close media viewer" autoFocus><CloseIcon /></button></div>
      {isOpen && activePhoto && <>
        <div className="viewer-stage" onTouchStart={startSwipe} onTouchMove={(event): void => { if (event.touches.length !== 1) swipeStart.current = null; }} onTouchEnd={endSwipe} onTouchCancel={(): void => { swipeStart.current = null; }}>
          {isVideo(activePhoto) ? <VideoPlayer key={activePhoto.id} video={activePhoto} /> : <PortfolioImage key={activePhoto.id} src={activePhoto.src} alt={activePhoto.alt} fill sizes={viewerImageSizes(activePhoto)} quality={85} loading="eager" draggable={false} className="viewer-image" />}
        </div>
        <div className="viewer-bottom">
          <p className="viewer-caption">{activePhoto.caption ?? activePhoto.alt}</p>
          <div className="viewer-controls">{photos.length > 1 && <button className="icon-button previous-image" onClick={(): void => move(-1)} aria-label={hasVideos ? "Previous item" : "Previous photograph"}><ArrowIcon /></button>}<span className="viewer-count" role="status" aria-label={`${hasVideos ? "Item" : "Photograph"} ${activeIndex + 1} of ${photos.length}`}>{String(activeIndex + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(photos.length).padStart(2, "0")}</span>{photos.length > 1 && <button className="icon-button" onClick={(): void => move(1)} aria-label={hasVideos ? "Next item" : "Next photograph"}><ArrowIcon /></button>}</div>
          <p className="viewer-help"><span className="viewer-keyboard-help">{photos.length > 1 && !isVideo(activePhoto) ? "Arrow keys to browse · " : ""}Esc to close</span>{photos.length > 1 && !isVideo(activePhoto) && <span className="viewer-touch-help">Swipe to browse</span>}</p>
        </div>
      </>}
    </dialog>
  </>;
}
