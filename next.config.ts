import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable cross-platform compatibility
  swcMinify: true,
  // Disable platform-specific optimizations
  experimental: {
    // This setting ensures Next.js uses JS implementation if the native SWC binary is not available
    forceSwcTransforms: true
  }
};

export default nextConfig;
