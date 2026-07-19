import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于幻境织机",
  description: "幻境织机 Mirage Loom 的品牌世界观与创作方向。"
};

export default function AboutPage() {
  return (
    <main className="archive-page">
      <article className="detail-article">
        <span className="archive-label">About Mirage Loom</span>
        <h1>关于幻境织机</h1>
        <p>幻境织机是一间由两位来自中山大学的女孩共同创办的独立游戏工作室，专注于创作幻想世界题材游戏。</p>
        <p>工作室是一座隐秘的魔法缝纫师协会。幻境织造师研究未知文明、神秘生物、魔法体系和无法解释的现象，再把它们转化成科学、程序、机械与魔法技术。</p>
        <p>每一款作品都是一次新的幻境织造，而不是单一宇宙的延伸。我们研究未知，提炼奇迹，将曾经只存在于梦中的世界，一针一线地编织成真实可触的幻境。</p>
      </article>
    </main>
  );
}
