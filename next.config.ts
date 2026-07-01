import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
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
