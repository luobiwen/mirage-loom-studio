"use client";

import { type FormEvent, useEffect, useState } from "react";

type LogComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

const storagePrefix = "mirage-loom-log-comments:";

function formatCommentDate(createdAt: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(createdAt));
}

export function LogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<LogComment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const restoreComments = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(`${storagePrefix}${slug}`);
        if (stored) {
          const parsed = JSON.parse(stored) as LogComment[];
          if (Array.isArray(parsed)) setComments(parsed);
        }
      } catch {
        // The empty state remains available when browser storage is unavailable.
      }
    }, 0);

    return () => window.clearTimeout(restoreComments);
  }, [slug]);

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment: LogComment = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    if (!comment.name || !comment.message) return;

    const nextComments = [comment, ...comments];
    setComments(nextComments);
    setName("");
    setMessage("");
    setNotice("回响已收进档案。");

    try {
      window.localStorage.setItem(`${storagePrefix}${slug}`, JSON.stringify(nextComments));
    } catch {
      setNotice("回响已显示在当前页面。");
    }
  };

  const deleteComment = (commentId: string) => {
    if (!window.confirm("确定要删除这条评论吗？")) return;

    const nextComments = comments.filter((comment) => comment.id !== commentId);
    setComments(nextComments);

    try {
      if (nextComments.length > 0) {
        window.localStorage.setItem(`${storagePrefix}${slug}`, JSON.stringify(nextComments));
      } else {
        window.localStorage.removeItem(`${storagePrefix}${slug}`);
      }
      setNotice("评论已删除。");
    } catch {
      setNotice("评论已从当前页面移除，但浏览器存储更新失败。");
    }
  };

  return (
    <section className="log-comments" aria-labelledby="log-comments-title">
      <div className="log-comments-heading">
        <span className="archive-label">Workshop Echoes</span>
        <h2 id="log-comments-title">工坊回响</h2>
        <span>{comments.length} 条回响</span>
      </div>

      {comments.length > 0 ? (
        <ol className="log-comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="log-comment">
              <span className="log-comment-mark" aria-hidden="true">{comment.name.slice(0, 1)}</span>
              <div className="log-comment-copy">
                <div className="log-comment-meta">
                  <strong>{comment.name}</strong>
                  <time dateTime={comment.createdAt}>{formatCommentDate(comment.createdAt)}</time>
                  <button
                    className="log-comment-delete"
                    type="button"
                    aria-label={`删除 ${comment.name} 的评论`}
                    onClick={() => deleteComment(comment.id)}
                  >
                    删除
                  </button>
                </div>
                <p>{comment.message}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="log-comments-empty">第一根回响，正等待被写下。</p>
      )}

      <form className="log-comment-form" onSubmit={submitComment}>
        <label>
          <span>署名</span>
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={32} required />
        </label>
        <label>
          <span>写下回响</span>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={600} required rows={5} />
        </label>
        <div className="log-comment-submit">
          <button className="button primary" type="submit">送出回响</button>
          <span role="status" aria-live="polite">{notice}</span>
        </div>
      </form>
    </section>
  );
}
