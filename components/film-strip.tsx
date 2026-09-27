"use client";

import { useCallback, useEffect, useRef, useState, type JSX } from "react";
import Link from "next/link";
import type { FilmProject } from "@/content/films";
import { PortfolioImage } from "@/components/portfolio-image";
import { ArrowIcon, ExternalIcon, PlayIcon } from "@/components/icons";

function FilmCard({ project, onPlay }: { project: FilmProject; onPlay: (player: HTMLVideoElement) => void }): JSX.Element {
  const player = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const { video } = project;

  function play(): void {
    const element = player.current;
    if (!element) return;
    if (failed) element.load();
    setFailed(false);
    setPending(true);
    // Keep play in the click gesture so mobile browsers can start with sound.
    void element.play().then((): void => {
      element.focus({ preventScroll: true });
    }).catch((error: unknown): void => {
      // Another card can intentionally pause this one while it is loading.
      if (!(error instanceof DOMException && error.name === "AbortError")) setFailed(true);
      setPending(false);
    });
  }

  return <article className="film-card">
    <div className="film-media" style={{ aspectRatio: `${video.width} / ${video.height}` }}>
      <video ref={player} src={video.videoSrc} width={video.width} height={video.height} controls={started} playsInline preload="none" tabIndex={started ? 0 : -1} aria-label={project.title} aria-describedby={`${project.id}-credit`} onPlay={(event): void => { onPlay(event.currentTarget); }} onPlaying={(): void => { setStarted(true); setPending(false); }} onPause={(): void => setPending(false)} onError={(): void => { setFailed(true); setPending(false); setStarted(false); }} />
      {!started && <button className="film-play" type="button" onClick={play} disabled={pending} aria-label={`${failed ? "Retry" : "Play"} ${project.title}`} aria-busy={pending}>
        <PortfolioImage src={video.src} alt={video.alt} fill sizes="(max-width: 760px) min(calc(84vw - 33.6px), 320px), (max-width: 1000px) calc(50vw - 46px), (max-width: 1440px) calc(25vw - 43px), 317px" quality={85} />
        <span className="film-play-symbol"><PlayIcon /></span>
        <span className="film-play-label">{pending ? "Loading film…" : failed ? "Try again" : "Play film"}</span>
        <span className="film-duration">{Math.floor(video.duration / 60)}:{String(Math.floor(video.duration % 60)).padStart(2, "0")}</span>
      </button>}
      {failed && <p className="film-error" role="alert">The film couldn’t load. Try playing it again.</p>}
    </div>
    <div className="film-caption"><h3 className="display">{project.title}</h3></div>
    <p className="film-description">{project.description}</p>
    <p className="film-source" id={`${project.id}-credit`}>{project.role === "Editing" ? "Edited" : "Filmed & edited"} by Nathan Tran{project.footageCredit && <><br />{project.footageCredit}</>}</p>
    <div className="film-footer">{project.collection && <Link className="film-collection" href={`/work/${project.collection.slug}`}>From {project.collection.title} <ExternalIcon /></Link>}</div>
  </article>;
}

export function FilmStrip({ projects }: { projects: FilmProject[] }): JSX.Element {
  const activePlayer = useRef<HTMLVideoElement | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const updatePosition = useCallback((): void => {
    const element = track.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const cards = Array.from(element.children);
    const maxScroll = element.scrollWidth - element.clientWidth;
    const closest = cards.reduce((best, card, index): number => Math.abs(card.getBoundingClientRect().left - bounds.left) < Math.abs(cards[best].getBoundingClientRect().left - bounds.left) ? index : best, 0);
    setActiveIndex(maxScroll <= 1 ? 0 : element.scrollLeft >= maxScroll - 1 ? Math.max(0, cards.length - 1) : closest);
    const player = activePlayer.current;
    if (player && !player.paused) {
      const videoBounds = player.getBoundingClientRect();
      if (videoBounds.right <= bounds.left || videoBounds.left >= bounds.right) player.pause();
    }
  }, []);

  useEffect((): (() => void) | undefined => {
    if (!track.current) return;
    const observer = new ResizeObserver(updatePosition);
    observer.observe(track.current);
    return (): void => observer.disconnect();
  }, [updatePosition]);

  function move(direction: number): void {
    const element = track.current;
    const nextIndex = Math.max(0, Math.min(projects.length - 1, activeIndex + direction));
    const card = element?.children[nextIndex];
    if (!element || !card) return;
    activePlayer.current?.pause();
    element.scrollTo({ left: element.scrollLeft + card.getBoundingClientRect().left - element.getBoundingClientRect().left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function activate(player: HTMLVideoElement): void {
    if (activePlayer.current !== player) activePlayer.current?.pause();
    activePlayer.current = player;
  }
  return <section className="films-section" aria-labelledby="films-heading" id="films">
    <div className="films-heading"><h2 className="eyebrow" id="films-heading">Films &amp; edits</h2><span className="section-count">By Nathan Tran</span></div>
    <div className="films-grid" id="films-track" ref={track} onScroll={updatePosition}>{projects.map((project) => <FilmCard key={project.id} project={project} onPlay={activate} />)}</div>
    {projects.length > 1 && <div className="films-navigation"><span className="film-swipe-hint">Swipe to explore</span><div className="films-navigation-controls"><button className="icon-button film-previous" type="button" aria-label="Previous film" aria-controls="films-track" disabled={activeIndex === 0} onClick={(): void => move(-1)}><ArrowIcon /></button><span className="films-position" role="status" aria-label={`Film ${activeIndex + 1} of ${projects.length}`}>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><button className="icon-button" type="button" aria-label="Next film" aria-controls="films-track" disabled={activeIndex === projects.length - 1} onClick={(): void => move(1)}><ArrowIcon /></button></div></div>}
  </section>;
}
