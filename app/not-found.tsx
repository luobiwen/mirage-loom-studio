import Link from "next/link";

export default function NotFound() {
  return (
    <main className="archive-page">
      <article className="detail-article">
        <span className="archive-label">404 / 遗失的丝线</span>
        <h1>这段幻境尚未织成</h1>
        <p>你访问的页面可能还在样本盒里，或者已经被织造师移动到了新的卷轴。</p>
        <Link className="button small" href="/">回到首页</Link>
      </article>
    </main>
  );
}
