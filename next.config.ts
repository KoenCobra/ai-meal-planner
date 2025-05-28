import type { NextConfig } from "next";
import { MAX_FILE_SIZE } from "./lib/constants";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "v3.fal.media",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: MAX_FILE_SIZE,
    },
  },
};

export default nextConfig;
