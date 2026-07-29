import type { MetadataRoute } from "next";
import { artifacts, getVisibleCodexEntries, getVisibleLogs, getVisibleWorlds } from "@/data/content";
import { siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/worlds", "/codex", "/logs", "/artifacts", "/weavers", "/about"];
  const dynamicRoutes = [
    ...getVisibleWorlds().map((item) => `/worlds/${item.slug}`),
    ...getVisibleCodexEntries().map((item) => `/codex/${item.slug}`),
    ...getVisibleLogs().map((item) => `/logs/${item.slug}`),
    ...artifacts.map((item) => `/artifacts#${item.slug}`)
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-07-17")
  }));
}
