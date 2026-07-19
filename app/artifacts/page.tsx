import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { artifacts } from "@/data/content";

export const metadata: Metadata = {
  title: "圣物收藏",
  description: "幻境织机未来的周边、画册、音乐与收藏物展示柜。"
};

export default function ArtifactsPage() {
  return (
    <main className="archive-page">
      <header className="page-hero">
        <span className="archive-label">Relic Cabinet</span>
        <h1>圣物收藏</h1>
        <p>收藏室仍在准备中。这里展示的是虚构占位商品结构，未来可替换为真实周边。</p>
      </header>
      <section className="section artifact-cabinet">
        {artifacts.map((artifact) => (
          <article id={artifact.slug} key={artifact.slug} className="artifact-card">
            <Sparkles size={24} />
            <h2>{artifact.name}</h2>
            <p>{artifact.description}</p>
            <span>{artifact.sourceWorld}</span>
            <b>{artifact.status}</b>
            <small>{artifact.price}</small>
          </article>
        ))}
      </section>
    </main>
  );
}
