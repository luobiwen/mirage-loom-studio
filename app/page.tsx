import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { BookOpen, Mail, Sparkles } from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { HomeScrollEffects } from "@/components/HomeScrollEffects";
import { SectionHeader } from "@/components/SectionHeader";
import { CardGlyph } from "@/components/CardGlyph";
import { announcements, artifacts, codexEntries, getVisibleLogs, weavers, worlds } from "@/data/content";
import { cx } from "@/lib/utils";

export default function Home() {
  const logs = getVisibleLogs();
  return (
    <main>
      <HomeScrollEffects />
      <div className="cinematic-landing">
        <HeroScene />
      </div>
      <section id="announcements" className="section notice-section">
        <SectionHeader eyebrow="Notice Board" title="最新公告">
          钉在实验室公告墙上的近况、Demo 记录和开发便签。
        </SectionHeader>
        <div className="notice-grid">
          {announcements.map((item) => (
            <article key={item.id} className={cx("notice-card", item.important && "important")}>
              <span className="archive-label">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <time>{item.date}</time>
            </article>
          ))}
        </div>
      </section>

      <section id="worlds" className="section">
        <SectionHeader eyebrow="World Archives" title="幻境档案">
          每款游戏都是一次新的幻境织造，拥有独立文明、规则、人物和情绪。
        </SectionHeader>
        <div className="world-grid">
          {worlds.map((world, index) => (
            <article key={world.slug} className="world-card" style={{ "--accent": world.accent } as CSSProperties}>
              <div className="world-window">
                <CardGlyph variant={index === 0 ? "moon" : "flower"} />
              </div>
              <span className="archive-label">{world.archiveId}</span>
              <h3>{world.title}</h3>
              <p className="subtitle">{world.subtitle}</p>
              <p>{world.summary}</p>
              <dl>
                <div><dt>类型</dt><dd>{world.genre}</dd></div>
                <div><dt>状态</dt><dd>{world.status}</dd></div>
              </dl>
              <Link className="button small" href={`/worlds/${world.slug}`}>查看完整档案</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="codex" className="section codex-band">
        <SectionHeader eyebrow="World Compendium" title="世界图鉴与设定集">
          魔法研究手册与电子图鉴的结合，记录人物、文明、遗物、场景和异常温柔的技术。
        </SectionHeader>
        <div className="codex-layout">
          <div className="codex-tabs" aria-label="图鉴条目">
            {codexEntries.slice(0, 6).map((entry) => (
              <Link key={entry.slug} href={`/codex/${entry.slug}`}>
                <span>{entry.type}</span>
                {entry.title}
              </Link>
            ))}
          </div>
          <article className="codex-feature">
            <CardGlyph variant="book" />
            <span className="archive-label">世界 / 程序城邦</span>
            <h3>{codexEntries[0].title}</h3>
            <p>{codexEntries[0].summary}</p>
            <p>{codexEntries[0].body}</p>
            <Link className="button small" href="/codex">打开图鉴</Link>
          </article>
        </div>
      </section>

      <section id="logs" className="section">
        <SectionHeader eyebrow="Weaving Logs" title="织造日志">
          开发进度、角色设计、程序实现、失败方案和工作室日常都会被收进这本研究笔记。
        </SectionHeader>
        <div className="log-list">
          {logs.map((log) => (
            <Link key={log.slug} className={`log-row${log.coverImage ? " has-cover" : ""}`} href={`/logs/${log.slug}`}>
              {log.coverImage && (
                <figure className="log-row-cover">
                  <Image src={log.coverImage} alt={log.coverAlt ?? ""} fill sizes="(max-width: 900px) calc(100vw - 68px), 50vw" />
                </figure>
              )}
              <div className="log-row-copy">
                <span>{log.date}</span>
                <h3>{log.title}</h3>
                {log.excerpt && <p>{log.excerpt}</p>}
                <em>{log.category} / {log.readingTime} / {log.author}</em>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="artifacts" className="section artifact-section">
        <SectionHeader eyebrow="Relic Cabinet" title="圣物收藏">
          这里将陈列从幻境带回的画册、徽章、音乐和设定集。
        </SectionHeader>
        <div className="artifact-cabinet">
          {artifacts.map((artifact) => (
            <article key={artifact.slug} className="artifact-card">
              <Sparkles size={24} />
              <h3>{artifact.name}</h3>
              <p>{artifact.description}</p>
              <span>{artifact.sourceWorld}</span>
              <b>{artifact.status}</b>
              <small>{artifact.price}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="weavers" className="section weaver-section">
        <SectionHeader eyebrow="Chief Weavers" title="首席织造师">
          最初，我们只有两个人、一台尚未完成的织机，以及想创造世界的愿望。
        </SectionHeader>
        <div className="weaver-grid">
          {weavers.map((weaver) => (
            <article key={weaver.slug} className={cx("weaver-card", weaver.sideImage && "has-side-image")}>
              <div className="weaver-card-copy">
                <div className="portrait-placeholder">
                  {weaver.image ? (
                    <Image src={weaver.image} alt={`${weaver.name} 的照片`} fill sizes="240px" />
                  ) : (
                    <BookOpen size={36} />
                  )}
                </div>
                <span>{weaver.title}</span>
                <h3>{weaver.name}</h3>
                <p>{weaver.bio}</p>
                {weaver.duties.length > 0 && (
                  <ul>
                    {weaver.duties.map((duty) => <li key={duty}>{duty}</li>)}
                  </ul>
                )}
                <small>{weaver.interests}</small>
              </div>
              {weaver.sideImage ? (
                <div className="weaver-side-image">
                  <Image src={weaver.sideImage} alt={`${weaver.name} BBQ 版造型`} fill sizes="(max-width: 900px) 78vw, 320px" />
                </div>
              ) : (
                <div className="weaver-side-slot" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="join" className="section join-section">
        <SectionHeader eyebrow="Guild Network" title="加入织造师协会的通信网络">
          留下邮箱，未来可用于接收开发日志、试玩招募、Demo 更新和收藏室开放通知。
        </SectionHeader>
        <form className="join-form">
          <label>
            <span>邮箱地址</span>
            <input type="email" placeholder="traveler@example.com" aria-label="邮箱地址" />
          </label>
          <button type="submit"><Mail size={18} /> 缝合并送出</button>
        </form>
      </section>
    </main>
  );
}
