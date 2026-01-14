import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: '/crm-landing',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
