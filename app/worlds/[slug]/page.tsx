import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { codexEntries, getWorld, logs, worlds } from "@/data/content";

export function generateStaticParams() {
  return worlds.map((world) => ({ slug: world.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const world = getWorld(params.slug);
  return { title: world ? world.title : "幻境档案" };
}

export default function WorldDetailPage({ params }: { params: { slug: string } }) {
  const world = getWorld(params.slug);
  if (!world) notFound();
  const relatedCodex = codexEntries.filter((entry) => entry.worldSlug === world.slug);
  const relatedLogs = logs.filter((entry) => entry.worldSlug === world.slug && !entry.hidden);

  return (
    <main className="archive-page">
      <article className="detail-article">
        <span className="archive-label">{world.archiveId} / {world.status}</span>
        <h1>{world.title}</h1>
        <p><strong>{world.subtitle}</strong></p>
        <p>{world.description}</p>
        <p><strong>类型：</strong>{world.genre}</p>
        <p><strong>气质：</strong>{world.tone}</p>
        <div className="detail-links">
          {world.links.map((link) => <a className="button small" key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <h2>相关图鉴</h2>
        <ul>{relatedCodex.map((entry) => <li key={entry.slug}><Link href={`/codex/${entry.slug}`}>{entry.title}</Link></li>)}</ul>
        <h2>相关日志</h2>
        <ul>{relatedLogs.map((entry) => <li key={entry.slug}><Link href={`/logs/${entry.slug}`}>{entry.title}</Link></li>)}</ul>
      </article>
    </main>
  );
}
