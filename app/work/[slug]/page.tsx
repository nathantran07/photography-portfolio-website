import type { JSX } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCover, getShoot, isPlaceholderShoot, shoots } from "@/content/portfolio";
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

  return <main id="main" className="shoot-page">
    <section className="shell shoot-intro" aria-labelledby="shoot-heading">
      <Link className="text-link back-link" href="/#work"><ArrowIcon /> Back to selected work</Link>
      <div className="shoot-heading-row entrance"><div><span className="eyebrow">Collection {String(index + 1).padStart(2, "0")} {isPlaceholderShoot(shoot) ? "/ Example collection" : "/ Photography"}</span><h1 id="shoot-heading" className="display shoot-title">{shoot.title}</h1></div>{shoot.description && <p className="shoot-description">{shoot.description}</p>}</div>
      <div className="hero-frame-wrap entrance entrance-later"><PhotoFrame photo={getCover(shoot)} preload sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 112px), 1328px" className="shoot-cover" label={`${String(index + 1).padStart(2, "0")} / Opening photograph`} /></div>
      <div className="hero-caption"><span>{String(shoot.photos.length).padStart(2, "0")} {shoot.photos.length === 1 ? "photograph" : "photographs"}</span><a href="#photographs">Explore the collection <span aria-hidden="true">↓</span></a></div>
    </section>
    <section className="shell section-space shoot-gallery" id="photographs" aria-labelledby="gallery-heading"><div className="section-top gallery-heading"><h2 id="gallery-heading" className="eyebrow">The photographs</h2><span className="section-count">Select a frame to enlarge</span></div><Gallery photos={shoot.photos} title={shoot.title} /></section>
    <section className="shell next-shoot"><span className="eyebrow">{next ? "Continue exploring" : "Back to the collection"}</span><Link href={next ? `/work/${next.slug}` : "/#work"} className="next-shoot-link"><h2 className="display">{next ? next.title : "Selected work"}</h2><ArrowIcon /></Link></section>
  </main>;
}
