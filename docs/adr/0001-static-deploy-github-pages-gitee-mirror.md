# ADR-0001: 静态导出 + GitHub Pages 托管，Gitee 仅作代码镜像

- Status: accepted
- Date: 2026-10-05

## Context

站点需要免域名直接发布公网。首选 Gitee Pages，但查证结论：**Gitee Pages 面向个人已于 2024-05 无公告停服**（多方一手信源：Vant 官方 issue 指向 gitee.com/oschina/git-osc/issues/I9L5FJ、开发者实测博客、旧 gitee.io 站点 404）；官方落地页的宣传文案仍在，不可作为可用性依据。本机凭据两路可用（Gitee SSH key + 凭据管理器 token；GitHub gh CLI 已登录 Aafff623）。

## Decision

1. 站点构建保持 Next.js App Router；部署用 `BUILD_EXPORT=1` 条件开启 `output: "export"` + `basePath: "/tododev-site"`（见 `site/next.config.ts`），产物 `site/out/` 推 `gh-pages` 分支。
2. 公网托管 = **GitHub Pages**：https://aafff623.github.io/tododev-site/ （零域名、零服务器）。
3. **Gitee 仓库仅作代码镜像**（国内访问快）：`gitee.com/fan-tengda/tododev-site`，remote 名 `gitee`；GitHub remote 名 `github`（主推送目标）。
4. 换品牌/换仓库名时需同步改 `basePath` 并重跑导出。

## Consequences

- 部署流程：`cd site && BUILD_EXPORT=1 npx next build` → out/ 推 gh-pages → Pages 自动构建。
- basePath 只在导出模式启用，本地 dev 与普通构建不受影响。
- 中国大陆直连 github.io 速度不稳定（用户已知晓取舍）；如需国内加速，后续可绑定自有域名或迁 Vercel/Cloudflare Pages。
- Gitee Pages 若未来恢复个人版，可将同一份 out/ 直接部署，迁移成本约等于零。

## Alternatives considered

- Gitee Pages：不可用（停服证据见 Context）。
- Vercel / Netlify / Cloudflare Pages：可行但需要额外账号与凭据，且用户明确倾向"现有密钥直接能用"；gh CLI 已登录使 GitHub Pages 成为零摩擦路径。
