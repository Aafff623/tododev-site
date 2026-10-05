# tododev-site Context

This file contains verified facts that help Agents work in this project. It is not a product pitch and not a place for guesses.

## Purpose and boundaries

参考 todos.dev 的交互范式构建**原创品牌**营销站（临时品牌 `[relay]`）：页面中央嵌一个用 React + mock 数据实现的迷你产品工作台，sidebar 可折叠/拖拽、四屏可切换、command palette 可用，但一切行为都是本地 mock。研究材料（GPT 交接包）在 `temp/`。

## Domain vocabulary

- **ESPR**（Embedded Stateful Product Replica）：营销页内嵌的、用本地 state 驱动页面切换的"模拟 App"；无 iframe / video / canvas / 路由跳转。
- **Tier A / B / C 交互**：Tier A = 必须真实可用（sidebar、palette、切屏、tab、collapse、resize）；Tier B = 视觉装饰（pointer-events: none）；Tier C = 点了有 mock 结果（如 tab 过滤）。
- **Selective interactivity**：外层容器 `pointer-events-none`，只给叙事热点 `pointer-events-auto`。
- **mock-only contract**：见 AGENTS.md 红线。

## Verified facts（来源：GPT 交接包实测，见 research/）

- 外层 demo frame：1232px 宽（1440 视口、max-w-7xl 1280 下），高 `h-[520px] sm:h-[620px]`，radius 12px，border 1px rgba(255,255,255,.10)，bg #18181b，overflow clip。
- Dark tokens（zinc 系）：surface #18181b / elevated #1f1f23 / inset #09090b / tertiary #27272a；border #27272a / #3f3f46；text #fafaf9 / #d4d4d8 / #71717a / #52525b；nav-bg rgba(24,24,27,.85)；accent #4f46e5。
- Sidebar：collapsed 52px，expanded 240px，`width 200ms cubic-bezier(.2,0,0,1)` + motion-reduce:transition-none；header/footer 44px（h-11）。
- Resize handle：命中区 9px（`w-[9px] -ml-[5px]`），cursor col-resize，touch-none，视觉线极细。
- Command palette：桌面 560×460 居中 modal，radius 12px；移动端 bottom sheet（inset-x-0 bottom-0，max-h 88%，顶部 radius 16px）；`transition-[transform,opacity] 200ms`；Esc 关闭、Ctrl/Cmd+K 打开；tabs All/Tasks/Topics。
- 字体：Inter variable（正文/标题）+ JetBrains Mono variable（logo/工具感 accent）。
- 键盘味：快捷键直接显示在 UI 里（Search Ctrl K / New task N / tabs 的 Ctrl P、Ctrl J）。
- 动效克制：200ms / 300ms，不让动画当主角。

## Important relationships

- `site/lib/demo/`（state、reducer、mock-data）→ `site/components/demo/*` 只负责渲染；换品牌只改 `site/lib/demo/brand.ts` + mock 数据。
- 屏幕切换是 local finite state（无 React Router、URL 不变；V2 的 deep-link 是唯一例外，见 research/08）。

## Hard constraints

- mock-only（无后端/auth/真实 API）。
- 不复制 todos.dev 的品牌、文案、内容、图标；不使用其 logo。
- 大量 `motion-reduce` 支持；键盘可用（Esc / Ctrl+K / N / 方向键）。
- Next.js App Router + React 19 + TS + Tailwind（v4，@theme 定义 tokens）+ useReducer。
- 禁 Three.js / GSAP / Framer Motion 等重组件，除非另有说明理由。

## Known failure modes

（待记录）

## Durable decisions

- 2026-10-05：品牌采用 GPT 建议的占位 `[relay]`，收敛在单文件，便于后续替换。

## 待确认

- 最终品牌名是否沿用 `[relay]`（用户可随时改 `site/lib/demo/brand.ts`）。
- 部署目标（静态导出 or Vercel），当前按可静态导出实现。
