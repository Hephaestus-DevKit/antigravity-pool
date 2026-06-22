import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    accounts: { stale: 10, revalidate: 60, expire: 300 },
    metrics: { stale: 5, revalidate: 30, expire: 120 },
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
