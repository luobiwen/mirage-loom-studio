import type { NextConfig } from "next";

const longCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async headers() {
    return [
      {
        source: "/art/:path*",
        headers: [{ key: "Cache-Control", value: longCache }]
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: longCache }]
      }
    ];
  }
};

export default nextConfig;
