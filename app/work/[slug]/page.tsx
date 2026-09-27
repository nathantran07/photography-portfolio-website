import type { JSX } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatShootDate, gallerySummary, getCover, getGalleryItems, getShoot, isPlaceholderShoot, shoots, site } from "@/content/portfolio";
import { Gallery } from "@/components/gallery";
import { PhotoFrame } from "@/components/photo-frame";
import { ArrowIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/page-metadata";

type ShootPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return shoots.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ShootPageProps): Promise<Metadata> {
  const shoot = getShoot((await params).slug);
  if (!shoot) notFound();
  return pageMetadata({ title: `${shoot.title} — Nathan Tran`, description: shoot.description ?? `${shoot.title}: automotive photography by Nathan Tran.`, path: `/work/${shoot.slug}`, image: `/og/${shoot.slug}.jpg`, imageAlt: `${shoot.title} — photography by Nathan Tran${isPlaceholderShoot(shoot) ? " (placeholder preview)" : ""}` });
}

export default async function ShootPage({ params }: ShootPageProps): Promise<JSX.Element> {
  const shoot = getShoot((await params).slug);
  if (!shoot) notFound();
  const index = shoots.findIndex((item) => item.slug === shoot.slug);
  const next = shoots.length > 1 ? shoots[(index + 1) % shoots.length] : undefined;
  const hasVideos = Boolean(shoot.videos?.length);

  return <main id="main" className="shoot-page" tabIndex={-1}>
    <section className="shell shoot-intro" aria-labelledby="shoot-heading">
      <div className="shoot-breadcrumb"><Link className="text-link back-link" href="/#work"><ArrowIcon /> Work</Link><span className="eyebrow">Collection {String(index + 1).padStart(2, "0")}</span></div>
      <div className="shoot-cover-wrap entrance">
        <PhotoFrame photo={getCover(shoot)} preload sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 72px), (max-width: 1440px) calc(100vw - 112px), 1328px" className="shoot-cover" />
        <div className="shoot-cover-content">
          <span className="eyebrow">{isPlaceholderShoot(shoot) ? "An example collection" : hasVideos ? "Photography & film" : "Automotive photography"}</span>
          <h1 id="shoot-heading" className="display shoot-title">{shoot.title}</h1>
          {(shoot.date || shoot.location) && <div className="shoot-details">{shoot.date && <time dateTime={shoot.date}>{formatShootDate(shoot.date)}</time>}{shoot.location && <span>{shoot.location}</span>}</div>}
          <a className="shoot-enter" href="#photographs">{hasVideos ? "View the gallery" : "View the photographs"} <ArrowIcon /></a>
        </div>
      </div>
      <div className="shoot-description-row"><span className="eyebrow">{gallerySummary(shoot)} <span aria-hidden="true">/</span> {site.name}</span>{shoot.description && <p className="shoot-description">{shoot.description}</p>}</div>
    </section>
    <section className="shell shoot-gallery" id="photographs" aria-labelledby="gallery-heading"><div className="gallery-heading"><h2 id="gallery-heading" className="eyebrow">{hasVideos ? "The gallery" : "The photographs"}</h2>{hasVideos ? <a className="text-link film-jump" href="#films">Jump to films <ArrowIcon /></a> : <span className="section-count">Select to view in full</span>}</div><Gallery photos={getGalleryItems(shoot)} title={shoot.title} /></section>
    <section className="shell next-shoot"><span className="eyebrow">{next ? "Continue exploring" : "Back to the collection"}</span><Link href={next ? `/work/${next.slug}` : "/#work"} className="next-shoot-link"><h2 className="display">{next ? next.title : "Work"}</h2><ArrowIcon /></Link></section>
  </main>;
}
