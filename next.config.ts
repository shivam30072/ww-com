import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BACKEND_BASE_URL: "https://siya-backend-1.onrender.com",
  },
};

export default nextConfig;
