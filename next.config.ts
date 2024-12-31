import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BACKEND_BASE_URL: "http://localhost:4847",
    USER_ID: '672f138c6090c2215c603e4e'
  },
};

export default nextConfig;
