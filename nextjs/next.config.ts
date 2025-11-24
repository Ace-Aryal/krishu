import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedEnv: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  /* config options here */
};

export default nextConfig;
