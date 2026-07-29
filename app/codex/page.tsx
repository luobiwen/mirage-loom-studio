import type { Metadata } from "next";
import Link from "next/link";
import { CardGlyph } from "@/components/CardGlyph";
import { getVisibleCodexEntries, getWorld } from "@/data/content";

export const metadata: Metadata = {
  title: "世界图鉴",
  description: "幻境织机的设定集、遗物、人物、文明与魔法科技记录。"
};

export default function CodexPage() {
  const codexEntries = getVisibleCodexEntries();
  return (
    <main className="archive-page">
      <header className="page-hero">
        <span className="archive-label">World Compendium</span>
        <h1>世界图鉴与设定集</h1>
        <p>像翻阅研究手册一样浏览幻境样本。</p>
      </header>
      <section className="section codex-list">
        {codexEntries.map((entry) => (
          <Link key={entry.slug} className="codex-card" href={`/codex/${entry.slug}`}>
            <CardGlyph variant="book" />
            <span className="archive-label">{entry.type} / {getWorld(entry.worldSlug)?.title}</span>
            <h2>{entry.title}</h2>
            <p>{entry.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
