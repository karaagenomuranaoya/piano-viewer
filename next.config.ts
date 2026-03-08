// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // サーバーサイドでのビルド時に pdfjs-dist の中身を解析させない設定
  serverExternalPackages: ["pdfjs-dist"],

  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false, // canvas と encoding の無視だけでOK
    };

    return config;
  },
};

export default nextConfig;