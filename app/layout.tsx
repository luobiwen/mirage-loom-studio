import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/ma-shan-zheng/index.css";
import "./fonts-local.css";
import "./globals.css";
import { ClickSparkles } from "@/components/ClickSparkles";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: {
    default: "幻境织机 Mirage Loom | 独立游戏工作室",
    template: "%s | 幻境织机"
  },
  description: "幻境织机是一间由两位来自中山大学的女孩共同创办的独立游戏工作室，专注于编织幻想世界题材游戏。",
  icons: {
    icon: "/favicon.svg?v=2",
    shortcut: "/favicon.svg?v=2",
    apple: "/favicon.svg?v=2"
  },
  openGraph: {
    title: "幻境织机 Mirage Loom",
    description: "我们研究未知，提炼奇迹，将梦中的世界一针一线织成真实可触的幻境。",
    type: "website",
    locale: "zh_CN"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteNav />
        <ClickSparkles />
        {children}
        <footer className="site-footer">
          <p>幻境织机 Mirage Loom · We study the unknown and weave the impossible.</p>
          <p>
            <Link href="/about">关于工作室</Link> · <Link href="/#join">加入通信网络</Link>
          </p>
          <p className="site-copyright">© 2026 幻境织机 版权所有</p>
        </footer>
      </body>
    </html>
  );
}
