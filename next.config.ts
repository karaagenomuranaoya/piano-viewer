import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ↓ ここを (config) から (config: any) に変更
  webpack: (config: any) => {
    config.resolve.alias.canvas = false;
    
    // 必要なら残す（なければ削除でOK）
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };

    return config;
  },
};

export default nextConfig;