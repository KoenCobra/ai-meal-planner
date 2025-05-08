import type { NextConfig } from "next";
import { MAX_FILE_SIZE } from "./lib/image-utils";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.convex.cloud",
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
