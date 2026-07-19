import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LogComments } from "@/components/LogComments";
import { getLog, getWorld, logs } from "@/data/content";

export function generateStaticParams() {
  return logs.map((log) => ({ slug: log.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const log = getLog(slug);
  return { title: log ? log.title : "织造日志" };
}

export default async function LogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const log = getLog(slug);
  if (!log) notFound();
  const world = getWorld(log.worldSlug);
  const bodyBlocks = typeof log.body === "string"
    ? [{ type: "paragraph" as const, content: log.body }]
    : log.body;

  return (
    <main className="archive-page">
      <article className="detail-article">
        <span className="archive-label">{log.category} / {log.date} / {log.readingTime}</span>
        <h1>{log.title}</h1>
        {log.coverImage && (
          <figure className="log-detail-cover">
            <Image src={log.coverImage} alt={log.coverAlt ?? ""} fill sizes="(max-width: 900px) calc(100vw - 90px), 844px" priority />
          </figure>
        )}
        {bodyBlocks.map((block, index) => (
          block.type === "heading"
            ? <h2 key={`${block.content}-${index}`}>{block.content}</h2>
            : block.type === "list"
              ? (
                <ul key={`list-${index}`} className="markdown-list">
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )
              : <p key={`${block.content}-${index}`}>{block.content}</p>
        ))}
        <p><strong>作者：</strong>{log.author}</p>
        {world && <p><strong>所属幻境：</strong><Link href={`/worlds/${world.slug}`}>{world.title}</Link></p>}
        <p><Link href="/logs">返回织造日志</Link></p>
      </article>
      <LogComments slug={log.slug} />
    </main>
  );
}
