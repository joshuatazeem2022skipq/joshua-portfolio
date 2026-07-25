import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react", "framer-motion"],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
