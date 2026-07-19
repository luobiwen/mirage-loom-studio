import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { codexEntries, getCodex, getWorld } from "@/data/content";

export function generateStaticParams() {
  return codexEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = getCodex(params.slug);
  return { title: entry ? entry.title : "世界图鉴" };
}

export default function CodexDetailPage({ params }: { params: { slug: string } }) {
  const entry = getCodex(params.slug);
  if (!entry) notFound();
  const world = getWorld(entry.worldSlug);

  return (
    <main className="archive-page">
      <article className="detail-article">
        <span className="archive-label">{entry.type} / {entry.tag}</span>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
        <p>{entry.body}</p>
        {world && <p><strong>所属幻境：</strong><Link href={`/worlds/${world.slug}`}>{world.title}</Link></p>}
      </article>
    </main>
  );
}
