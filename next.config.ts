import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
