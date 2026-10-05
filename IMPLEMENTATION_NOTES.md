# IMPLEMENTATION_NOTES

> 交付说明。研究材料在 `research/`，设计契约在 `design-system/`，验收证据在 `qa/`。

## 交付了什么

**[relay]** —— 一个深色极简营销站（Next.js 16 App Router + React 19 + Tailwind v4 + TS），页面中央嵌一个 **Embedded Stateful Product Replica**：用 React 本地 state + 纯 mock 数据实现的迷你 AI 工作台（无 iframe / video / canvas / 路由跳转，URL 不因切屏改变）。

品牌、文案、mock 剧本、图标、头像全部**原创**；从 todos.dev 只取用了实测的几何/灰阶/缓动等设计事实与交互范式（边界见 `research/07-license-notes.md`）。

## 实测 vs 推断

| 项 | 来源 |
| --- | --- |
| 全部 dark token（10+ 层 zinc 灰阶、accent、nav-bg） | 实测 live `:root` CSS variables（`capture/todos/css/root-vars.json`） |
| frame 1232×622/520、radius 12、hairline 边框 | 实测 SSR HTML + 截图 |
| sidebar 52↔240、200ms cubic-bezier(.2,0,0,1)、resize 9px 命中 | 实测 SSR HTML |
| palette 560×460 / 移动端 bottom sheet、tabs、Go To 结构 | 实测 DOM + 截图 |
| tooltip 400ms 延迟 | 实测 class |
| **idle 自动重播**（demo 会自己"活着"） | 实测行为观察，并在本站重新实现为剧本引擎 |
| chat/board 36/64 container-query 分栏 | 实测内联样式（本站取 38/62 近似） |
| 浅色主题 token | 未采集（本站仅 dark 基线） |

## 核心实现

- `site/lib/demo/state.ts` —— `useReducer` 集中状态机（navigate/sidebar/resize/palette/折叠树/mobile board/story beat/autoplay）。
- `site/lib/demo/mock-data.ts` —— 原创剧本 beats（每拍 = 新消息 + 看板快照）、schedules/connections/skills 数据。数据与 UI 严格解耦，换品牌只改 `brand.ts`。
- `site/components/demo/` —— DemoSidebar（折叠/展开/tooltip/移动抽屉）、ResizeHandle（pointer capture）、CommandPalette（keyed 内层，桌面 modal/移动 bottom sheet）、四屏、ProductDemo（键盘/剧本引擎/deep-link/scroll-sync/replay/spotlight）。
- Selective interactivity：非叙事区 Tier B 不可点（`pe-none-all` / 结构性不绑事件），只有 Tier A 热点真实交互——无"死按钮"。
- `motion-reduce`：全局 CSS 降级 + 逐处 `motion-reduce:*`。

## 与 GPT 计划的偏差

1. **Baseline 与 V2 同次落地**（未分两次 freeze）：创新项与 demo 引擎天然耦合（剧本引擎同时服务 idle tour 与活时间线），拆分成本大于收益。git tag `v0.1-baseline` 标记本次完整状态。
2. **experiments/ 未做独立 HTML 原语**：7 个原语直接以组件形式落在 site/ 中（见 `experiments/README.md` 的映射表），省去一次性代码。
3. Tailwind 用 v4（@theme），GPT 记录的是参考站 v3——token 语义层等价。
4. 字体走 @fontsource（本地构建产物），而非 next/font/google（构建网络依赖更稳）。

## V2 创新清单（全部实现）

1. **Deep-link demo state**：`?demo=skills&view=palette&story=0` 直达任意状态，仅初始化 reducer 不动路由。
2. **Replay**：frame 下方常驻小按钮，一键重置并重播。
3. **Scroll-sync storytelling**（lg+）：demo 粘性驻留，四章字幕滚动切换，demo 自动跟屏；用户操作后不被抢权（silent 导航不打断剧本）。
4. **Idle auto-tour**：无操作 12s 剧本恢复推进、结束 15s 后重播；任何输入立即让位。
5. **Spotlight**：首次访问 frame 呼吸提示 + "Live demo" 提示行（sessionStorage 记忆）。
6. **活的时间线**：消息逐拍入场、任务卡随看板流转（Backlog→In progress→Needs you→Done）。
7. 键盘：Ctrl/Cmd K、Esc、Ctrl/Cmd B、N、Tab、↑/↓+Enter。

## 验证记录

- `npm run lint` ✅ 0 error / `npm run build` ✅ 静态预渲染通过。
- 真机（IAB Chromium）截图验收 10 个状态：`qa/screenshots/`（1440 桌面 6 态 + 390 移动 3 态 + 中途剧情态）。
- 功能断言（读取运行时状态机）：Ctrl+K/Esc/Ctrl+B、scroll-sync 事件导航、deep-link 三参数、Replay 重置 —— 全部通过（记录见 `qa/interaction-matrix.md`）。
- 环境备注：IAB 面板存在 **rAF/IO 渲染节流**（`document.visibilityState` 仍报 visible），导致依赖 IntersectionObserver 的逻辑在该环境不可观测。已把引擎改为 **inView 默认 true、IO 仅作暂停信号**，保证最坏环境下 demo 依然完整运转；截图旧帧发暗为该环境动画时钟冻结假象（禁用动画复测正常）。
- 独立视觉评审 agent 因供应商不可用未能派出，降级为主 Agent 自检（逐张过图 + 参照设计契约），已按发现修复：移动端双顶栏（P0）、看板筛选图标常显、消息 key 不稳定导致动画重放、剧本引擎 IO 依赖。

## 遗留 / 后续可做

- 浅色主题（token 已预留语义层，未做切换 UI）。
- 看板键盘 DnD（shadcn-kanban 模式已在 refs/ 备好）。
- `?demo=` 状态目前不写入 history（避免污染路由），如需可加 replaceState。
- 品牌定稿后替换 `site/lib/demo/brand.ts`。
