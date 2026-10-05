# experiments/ — 原语映射

GPT 计划中的 7 个原语未做成独立 HTML，而是直接以组件形式落在 `site/`（避免一次性代码）。每个原语的关键参数：

| 原语 | 落点 | 关键参数 |
| --- | --- | --- |
| app-frame | `components/demo/ProductDemo.tsx`（frame 容器） | 1232 max、`h-[520px] sm:h-[620px]`、rounded-xl、border-white/10、`shadow 0 24px 50px -12px rgba(0,0,0,.14)` |
| collapsible-sidebar | `components/demo/DemoSidebar.tsx` | 52↔240（可拖至 200–320）、`transition-[width] 200ms cubic-bezier(.2,0,0,1)`、header/footer 44px、tooltip 400ms |
| resizable-sidebar | `components/demo/ResizeHandle.tsx` | 命中 9px（`-ml-[5px] -mr-1`）、视觉 1px、`cursor-col-resize touch-none`、pointer capture、drag 高亮 accent |
| command-palette | `components/demo/CommandPalette.tsx` | 桌面 560×460 居中、移动 bottom sheet `max-h-[88%] rounded-t-2xl`、`translate-y-full opacity-0` 出入场 200ms、keyed 内层重置光标 |
| screen-switcher | `lib/demo/state.ts` + `ProductDemo` | local reducer（无 router）、`navigate` 支持 `silent`（scroll-sync 不打断剧本） |
| kanban | `components/demo/screens/WorkspaceScreen.tsx` | 列 236px inset 卡、4 列横向滚动、状态点灰/蓝/橙/绿、卡片含 project+num+branch+agent |
| responsive-demo | 各组件 `md:` 前缀 | 移动端隐藏侧栏、单顶栏 + chat/board 互斥、palette 变 bottom sheet、kbd 提示隐藏 |

调参入口集中在 `design-system/*.css` 与 `lib/demo/state.ts` 常量（`SIDEBAR_*`）。
