import type { NextConfig } from "next";

/**
 * 部署模式（BUILD_EXPORT=1）：静态导出到 site/out/，用于 GitHub Pages。
 * basePath 对应仓库名（https://<user>.github.io/tododev-site/）；
 * 本地 dev / 普通构建完全不受影响。
 */
const isExport = process.env.BUILD_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        basePath: "/tododev-site",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
