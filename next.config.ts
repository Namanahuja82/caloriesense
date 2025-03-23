import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: this skips ESLint during builds
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
