import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  images: {
    domains: [
      'laravelpoint.com',
      'i.imgur.com',
      'images.unsplash.com',
      'cdn.sanity.io'
    ]
  }
};

export default nextConfig;
