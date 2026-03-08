import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // サーバーサイドでの処理では pdfjs-dist を外部パッケージとして扱う
  serverExternalPackages: ["pdfjs-dist"],

  webpack: (config) => {
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    // ★修正ポイント: canvas だけでなく、fs, path, stream 等も false にする
    // これにより、ブラウザ向けビルドで Node.js モジュールが除外されます
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.resolve.alias.fs = false;
    config.resolve.alias.path = false;
    config.resolve.alias.stream = false;
    config.resolve.alias.http = false;
    config.resolve.alias.https = false;
    config.resolve.alias.zlib = false;

    return config;
  },
};

export default nextConfig;