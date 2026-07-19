import type { MetadataRoute } from "next";
import { artifacts, codexEntries, logs, worlds } from "@/data/content";
import { siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/worlds", "/codex", "/logs", "/artifacts", "/weavers", "/about"];
  const dynamicRoutes = [
    ...worlds.map((item) => `/worlds/${item.slug}`),
    ...codexEntries.map((item) => `/codex/${item.slug}`),
    ...logs.map((item) => `/logs/${item.slug}`),
    ...artifacts.map((item) => `/artifacts#${item.slug}`)
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-07-17")
  }));
}
