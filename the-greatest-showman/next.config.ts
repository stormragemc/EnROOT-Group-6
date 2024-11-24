import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Spread the existing config
  images: {
    domains: ['i.ibb.co', 's11.gifyu.com', 'images.genius.com'],
     // Add image domains here
  },
};

export default nextConfig;
