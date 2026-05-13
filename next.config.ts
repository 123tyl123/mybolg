import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-local",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
