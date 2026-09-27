import type { CSSProperties, JSX } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, ExternalIcon } from "@/components/icons";
import { PhotoFrame } from "@/components/photo-frame";
import { PortfolioImage } from "@/components/portfolio-image";
import { getCover, getHero, getShoot, isPlaceholderShoot, site } from "@/content/portfolio";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({ title: "Nathan Tran — Automotive Photography", description: site.description, path: "/", image: "/og/home.jpg", imageAlt: `Nathan Tran — Automotive Photography — ${site.instagram.handle}` });

export default function Home(): JSX.Element {
  const featured = site.featuredSlugs.map((slug) => getShoot(slug)).filter((shoot) => shoot !== undefined);
  const hero = getHero();
  return (
    <main id="main">
      <section className="home-hero" aria-labelledby="hero-heading" style={{ "--hero-position": `${hero.focalPoint?.x ?? 50}% ${hero.focalPoint?.y ?? 50}%` } as CSSProperties}>
        <PortfolioImage src={hero.src} alt={hero.alt} fill sizes={`max(100vw, ${(100 * hero.width / hero.height).toFixed(2)}svh)`} preload quality={85} className="home-hero-image" />
        <div className="home-hero-content entrance">
          <span className="eyebrow">Nathan Tran / An independent perspective</span>
          <h1 className="display home-hero-title" id="hero-heading">Automotive photography.</h1>
          <a className="home-hero-link" href="#work">View work <ArrowIcon /></a>
        </div>
      </section>

      <section className="work-section shell section-space" id="work" aria-labelledby="work-heading">
        <div className="section-top"><span className="eyebrow">01 / Work</span><span className="section-count">{String(featured.length).padStart(2, "0")} collections</span></div>
        <div className="section-heading-row"><h2 className="display section-title" id="work-heading">A few things<br /><em>worth a closer look.</em></h2><p className="section-description">A collection of perspectives.<br />Each one, its own story.</p></div>
        <div className="projects-grid">
          {featured.map((shoot, index) => <Link href={`/work/${shoot.slug}`} className={`project-card project-${index + 1}`} key={shoot.slug} aria-label={`View ${shoot.title}${isPlaceholderShoot(shoot) ? " — example collection" : ""}`}>
            <PhotoFrame photo={getCover(shoot)} sizes={index === 0 ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 72px), (max-width: 1440px) calc(100vw - 112px), 1328px" : "(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(50vw - 56px), (max-width: 1440px) calc(50vw - 84px), 636px"} className="project-frame" label={String(index + 1).padStart(2, "0")} />
            <div className="project-caption"><div><span className="eyebrow project-category">{isPlaceholderShoot(shoot) ? "Example collection" : "Photographic collection"}</span><h3 className="display project-title">{shoot.title}</h3></div><span className="project-arrow"><ExternalIcon /></span></div>
          </Link>)}
        </div>
      </section>

      <section className="about-section section-space" id="about" aria-labelledby="about-heading"><div className="shell">
        <span className="eyebrow">02 / Behind the camera</span>
        <div className="about-layout">
          <div className="about-intro"><h2 className="display section-title" id="about-heading">For the love<br /><em>of the details.</em></h2>
            <div className="about-copy"><span className="about-monogram" aria-hidden="true">N / T</span><p>I’m Nate, an automotive photographer. I’m drawn to the lines, the details, and the atmosphere around a car.</p><p>This is a space for those perspectives. A place to slow down, take a closer look, and let the photographs speak.</p><a className="text-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">Find me on Instagram <ExternalIcon /></a></div>
          </div>
          {site.headshot && <div className="about-portrait-wrap"><PhotoFrame photo={site.headshot} natural sizes="(max-width: 760px) min(calc(100vw - 54px), 406px), (max-width: 1000px) calc(47.62vw - 76.86px), min(calc(47.62vw - 114.95px), 406px)" className="about-portrait" /></div>}
        </div>
      </div></section>

      <section className="contact-section shell section-space" id="contact" aria-labelledby="contact-heading"><span className="eyebrow">03 / A conversation starts here</span><div className="contact-layout"><h2 className="display contact-title" id="contact-heading">Something<br /><em>in mind?</em></h2><div className="contact-copy"><p>A car, a gathering, a different perspective.<br />I’d love to hear about it.</p><a className="contact-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer"><span>{site.instagram.handle}</span><ExternalIcon /></a>{site.email && <a className="text-link email-link" href={`mailto:${site.email}`}>Send an email <ArrowIcon /></a>}<span className="contact-caption">Let’s start on Instagram.</span></div></div></section>
    </main>
  );
}
