import type { Metadata } from "next";
import Link from "next/link";
import { CardGlyph } from "@/components/CardGlyph";
import { getVisibleWorlds } from "@/data/content";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "幻境档案",
  description: "幻境织机正在织造或采样中的独立游戏项目。"
};

export default function WorldsPage() {
  const worlds = getVisibleWorlds();
  return (
    <main className="archive-page">
      <header className="page-hero">
        <span className="archive-label">World Archives</span>
        <h1>幻境档案</h1>
        <p>每一份档案都是一座独立世界的入口，点击查看完整档案下载游戏。</p>
      </header>
      <section className="section world-grid">
        {worlds.map((world, index) => (
          <article key={world.slug} className="world-card" style={{ "--accent": world.accent } as CSSProperties}>
            <div className="world-window"><CardGlyph variant={index === 0 ? "moon" : "flower"} /></div>
            <span className="archive-label">{world.archiveId}</span>
            <h2>{world.title}</h2>
            <p>{world.summary}</p>
            <Link className="button small" href={`/worlds/${world.slug}`}>查看完整档案</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
