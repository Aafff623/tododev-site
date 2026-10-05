# tododev-site · relay lab

参考 todos.dev 的交互范式（Embedded Stateful Product Replica：营销页内嵌一套用 React + mock 数据做出来的"可真操作的产品工作台"）做一个**原创品牌**的同类站点。

- 品牌：`[relay]`（临时占位品牌，见 GPT 交接包建议；改名只需改 `site/lib/demo/brand.ts`）
- 产品设定：AI agent 工作台（Workspace / Runs / Schedules / Connections / Skills / Memory）
- 红线：mock-only，无后端、无鉴权、无真实 API；不复制 todos.dev 的文案、品牌与其页面内容

## Start here

1. Read `AGENTS.md` for project rules.
2. Read `CONTEXT.md` for verified domain facts and terminology.
3. Check `temp/AGENTS.md` before placing temporary material in `temp/`.

## Development

```bash
cd site
npm install
npm run dev        # http://localhost:3000
npm run build      # 生产构建
npm run lint
```

## Deploy（公网）

线上地址：**https://aafff623.github.io/tododev-site/** （GitHub Pages，免域名）

```bash
cd site
BUILD_EXPORT=1 npx next build   # 静态导出到 site/out/（自动加 basePath /tododev-site）
cd out
touch .nojekyll                 # 必须：GitHub Pages 默认 Jekyll 会忽略 _next/ 等下划线目录
git init -b gh-pages && git add -A && git commit -m "deploy"
git push --force https://github.com/Aafff623/tododev-site.git gh-pages
```

决策记录见 `docs/adr/0001`：Gitee Pages 面向个人已停服（2024-05），故 Gitee（`gitee.com/fan-tengda/tododev-site`，remote `gitee`）仅作代码镜像；GitHub（remote `github`）为主远端。

## Directory map

| 目录 | 用途 |
| --- | --- |
| `capture/` | 对 todos.dev 的实测截图 / DOM / 笔记（本地产物） |
| `refs/` | 参考仓库 shallow clone（Git 忽略） |
| `research/` | 设计 DNA、架构、交互状态图、许可证笔记 |
| `design-system/` | 提炼出的 tokens（colors / typography / spacing / motion） |
| `experiments/` | 原语实验说明（app-frame、sidebar、palette…） |
| `site/` | Next.js 站点本体 |
| `qa/` | 截图对比与验收矩阵 |
| `temp/` | 本地临时工作区（Git 忽略） |

## Delivery notes

Project-specific Skills live under `.agents/skills/` when present. Local MCP configuration and temporary material are intentionally excluded from Git; see `AGENTS.md` for the boundary.
