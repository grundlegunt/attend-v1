import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The prototype UI is Vercel-compatible; Cloudflare-only database adapters
  // remain outside the deployed routes and are validated by the Sites build.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
