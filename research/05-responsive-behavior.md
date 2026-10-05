# 05 · Responsive Behavior

实测断点行为（Tailwind md = 768px）：

## Desktop（md+）

- Sidebar 常驻（可折叠 52px / 展开 240px / 拖拽）。
- Workspace 分栏：chat 36% / kanban 64%（container query：`--chat-share: 36cqw`，随容器宽度而非视口）。
- Palette：560×460 居中 modal，背后遮罩。

## Mobile（<md）

- Desktop sidebar 整体 `hidden`；顶栏出现汉堡按钮（带 `animate-ping` 提醒点）。
- 顶栏右侧有 kanban 切换图标：chat ↔ board 互斥显示（`aria-pressed`）。
- Demo 高度降到 520px。
- Palette 变 bottom sheet：`inset-x-0 bottom-0 max-h-[88%] rounded-t-[16px]`，标题行 "Search" + ×，tabs 不再显示 kbd 提示。
- Hero：h1 降到 2rem，"Works with" 图标列表换行。

## 通用

- `viewport-fit=cover`、`color-scheme: dark light`、`overflow-x-clip`。
- kbd 提示（Ctrl K / N）在触屏上无意义 → 移动端隐藏（`hidden sm:inline` 类策略）。
