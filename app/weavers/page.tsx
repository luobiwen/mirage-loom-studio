import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { weavers } from "@/data/content";

export const metadata: Metadata = {
  title: "首席织造师",
  description: "幻境织机两位来自中山大学的创作者介绍。"
};

export default function WeaversPage() {
  return (
    <main className="archive-page">
      <header className="page-hero">
        <span className="archive-label">Chief Weavers</span>
        <h1>首席织造师</h1>
        <p>真诚、浪漫，也仍在努力调试。这里的姓名与头像是占位内容，后续可替换为真实资料。</p>
      </header>
      <section className="section weaver-grid">
        {weavers.map((weaver) => (
          <article key={weaver.slug} className={`weaver-card ${weaver.sideImage ? "has-side-image" : ""}`}>
            <div className="weaver-card-copy">
              <div className="portrait-placeholder">
                {weaver.image ? (
                  <Image src={weaver.image} alt={`${weaver.name} 的照片`} fill sizes="240px" />
                ) : (
                  <BookOpen size={36} />
                )}
              </div>
              <span>{weaver.title}</span>
              <h2>{weaver.name}</h2>
              <p>{weaver.bio}</p>
              {weaver.duties.length > 0 && (
                <ul>{weaver.duties.map((duty) => <li key={duty}>{duty}</li>)}</ul>
              )}
              <small>{weaver.interests}</small>
            </div>
            {weaver.sideImage && (
              <div className="weaver-side-image">
                <Image src={weaver.sideImage} alt={`${weaver.name} BBQ 版造型`} fill sizes="(max-width: 900px) 78vw, 320px" />
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
