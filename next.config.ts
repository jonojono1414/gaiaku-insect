import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  output: "export",
  ...(!isVercel && { basePath: "/gaiaku-insect" }),
};

export default nextConfig;
