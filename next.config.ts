import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. サーバーサイドでのビルド時に pdfjs-dist の中身を解析させない設定
  serverExternalPackages: ["pdfjs-dist"],

  // 2. Webpackで不要なモジュールを徹底的に無視する設定
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false, // これが足りなかった可能性大
      "pdfjs-dist/build/pdf.worker.js": false, // ワーカーの誤爆防止
    };

    return config;
  },
};

export default nextConfig;