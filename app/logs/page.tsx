import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getVisibleLogs } from "@/data/content";

export const metadata: Metadata = {
  title: "织造日志",
  description: "幻境织机的开发进度、角色设计、程序实现和工作室日常。"
};

export default function LogsPage() {
  const logs = getVisibleLogs();
  return (
    <main className="archive-page">
      <header className="page-hero">
        <span className="archive-label">Weaving Logs</span>
        <h1>织造日志</h1>
        <p>记录制作过程，也记录那些失败但有用的方案。</p>
      </header>
      <section className="section log-list">
        {logs.map((log) => (
          <Link key={log.slug} className={`log-row${log.coverImage ? " has-cover" : ""}`} href={`/logs/${log.slug}`}>
            {log.coverImage && (
              <figure className="log-row-cover">
                <Image
                  src={log.coverImage}
                  alt={log.coverAlt ?? ""}
                  fill
                  priority={log.slug === logs[0]?.slug}
                  sizes="(max-width: 900px) calc(100vw - 68px), 50vw"
                />
              </figure>
            )}
            <div className="log-row-copy">
              <span>{log.date}</span>
              <h2>{log.title}</h2>
              {log.excerpt && <p>{log.excerpt}</p>}
              <em>{log.category} / {log.readingTime}</em>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
