# 02 · Demo Architecture

## 模式定义

**Embedded Stateful Product Replica（ESPR）**：营销页内嵌一个用 React 本地 state 驱动的"模拟 App"。确认特征：

- 非 iframe / video / canvas；真实 DOM，真实 `<button>`。
- 屏幕切换 = local state，URL 不变、无 history。
- 数据 = 固定 mock；无任何网络写入。
- 外层 frame：`overflow-clip rounded-xl border bg-surface`，内层 `relative flex h-[520px] sm:h-[620px]`。

## 结构树（实测归纳）

```text
InteractiveDemoFrame
└─ DemoApp (relative flex h-[520px/620px])
   ├─ DesktopSidebar (hidden md:flex, border-r, width 52↔240, transition-[width] 200ms cubic-bezier(.2,0,0,1))
   │   ├─ header h-11 border-b（collapse 按钮）
   │   ├─ scroll 区（展开态：Search/New task/Workspace/Schedules/Connections/Skills/Projects▾/Resources▾ + kbd 提示）
   │   └─ footer h-11 border-t（用户）
   ├─ ResizeHandle (w-[9px] -ml-[5px] cursor-col-resize touch-none, 内含 1px 线)
   ├─ Main (flex-1 min-w-0, [container-type:inline-size])
   │   ├─ 顶栏 h-11 border-b（话题选择器 + 右侧图标组；移动端：汉堡 + ping 点 + kanban 切换）
   │   └─ Screen（workspace 用 container query 分栏：chat = 36cqw / board = 64%）
   ├─ MobileSidebar（<md 抽屉）
   └─ CommandPaletteLayer（desktop: 560px 居中 modal；mobile: bottom sheet max-h-[88%]）
```

## State Model（推荐实现）

```ts
type DemoScreen = "workspace" | "schedules" | "connections" | "skills";
type DemoState = {
  screen: DemoScreen;
  sidebarExpanded: boolean;
  sidebarWidth: number;        // 52..280，drag 可变
  paletteOpen: boolean;
  paletteTab: "all" | "tasks" | "topics";
  paletteQuery: string;
  projectsExpanded: boolean;
  resourcesExpanded: boolean;
  mobileBoard: boolean;        // 移动端 chat/kanban 切换
};
```

用 `useReducer` 集中；action：NAVIGATE / SIDEBAR_TOGGLE / SIDEBAR_RESIZE / PALETTE_OPEN / PALETTE_CLOSE / PALETTE_QUERY / PALETTE_TAB / TOGGLE_PROJECTS / TOGGLE_RESOURCES / BOARD_TOGGLE / RESET。

## Selective Interactivity（核心技巧）

- 非叙事区容器 `pointer-events-none`；只有 sidebar、palette、tab、resize、开关等热点 `pointer-events-auto`。
- 好处：没有"点了没反应"的伪按钮；state 复杂度收敛到叙事需要的最小集。

## 数据/UI 解耦

screens 只渲染 `lib/demo/mock-data.ts` 里的纯数据（schedules 行、connection 卡、skill 卡、workspace 叙事时间线）。换品牌/换剧本不动组件。
