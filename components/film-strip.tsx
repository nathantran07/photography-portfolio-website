"use client";

import { useRef, useState, type JSX } from "react";
import type { FilmProject } from "@/content/films";
import { PortfolioImage } from "@/components/portfolio-image";
import { PlayIcon } from "@/components/icons";

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
        <PortfolioImage src={video.src} alt={video.alt} fill sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 760px) calc(50vw - 28px), (max-width: 1000px) calc(50vw - 46px), (max-width: 1440px) calc(25vw - 43px), 317px" quality={85} />
        <span className="film-play-symbol"><PlayIcon /></span>
        <span className="film-play-label">{pending ? "Loading film…" : failed ? "Try again" : "Play film"}</span>
        <span className="film-duration">{Math.floor(video.duration / 60)}:{String(Math.floor(video.duration % 60)).padStart(2, "0")}</span>
      </button>}
    </div>
    {failed && <p className="film-error" role="alert">The film couldn’t load. Try playing it again.</p>}
    <div className="film-caption"><h3 className="display">{project.title}</h3><span className="film-role">{project.role}</span></div>
    <p className="film-source" id={`${project.id}-credit`}>{project.footageCredit}</p>
  </article>;
}

export function FilmStrip({ projects }: { projects: FilmProject[] }): JSX.Element {
  const activePlayer = useRef<HTMLVideoElement | null>(null);
  function activate(player: HTMLVideoElement): void {
    if (activePlayer.current !== player) activePlayer.current?.pause();
    activePlayer.current = player;
  }
  return <section className="films-section" aria-labelledby="films-heading" id="films">
    <div className="films-heading"><h2 className="eyebrow" id="films-heading">Films &amp; edits</h2><span className="section-count">By Nathan Tran</span></div>
    <div className="films-grid">{projects.map((project) => <FilmCard key={project.id} project={project} onPlay={activate} />)}</div>
  </section>;
}
