"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import { getImageProps } from "next/image";
import type { Video } from "@/content/portfolio";

export function VideoPlayer({ video }: { video: Video }): JSX.Element {
  const player = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const poster = getImageProps({ src: video.src, alt: video.alt, width: video.width, height: video.height, quality: 85 }).props.src;

  useEffect((): (() => void) => {
    const element = player.current;
    return (): void => { element?.pause(); };
  }, []);

  return <>
    <video ref={player} className="viewer-video" src={video.videoSrc} controls playsInline preload="none" poster={poster} width={video.width} height={video.height} aria-label={video.alt} onError={(): void => setFailed(true)}>
      Your browser cannot play this video.
    </video>
    {failed && <div className="video-error" role="alert"><p>This film couldn’t load.</p><button className="text-link" type="button" onClick={(): void => { setFailed(false); player.current?.load(); }}>Try again</button></div>}
  </>;
}
