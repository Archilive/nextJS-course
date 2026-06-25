import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "graphqlstore.julienfroidefond.com",
      },
      {
        protocol: "http",
        hostname: "graphqlstore.julienfroidefond.com",
      },
    ],
  },
};

export default nextConfig;
