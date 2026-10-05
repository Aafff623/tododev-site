# interaction-rules.md — 交互分层与指针策略

## Tier A（pointer-events: auto，必须真实）

sidebar 全部按钮、resize handle、command palette（输入/tabs/Go To/关闭）、移动端汉堡与 kanban 切换、Projects/Resources 折叠树、Replay 控件。

## Tier B（pointer-events: none，纯视觉）

聊天气泡与输入槽、任务卡、schedule 行、connection 卡、skill 卡、行内装饰图标。做法：screen 内容容器整体 none，不逐个豁免。

## Tier C（mock 结果）

palette 查询过滤、tab 切换、剧本引擎推进任务状态、V2 deep-link/replay/scroll-sync。

## 键盘契约

| 键 | 行为 |
| --- | --- |
| Ctrl/Cmd K | 开/关 palette |
| Esc | 关 palette / 关移动端抽屉 |
| Ctrl/Cmd B | 折叠/展开 sidebar |
| N | 新任务（打开 palette 的 New task 项） |
| Tab | palette 内切换 tab |
| ↑/↓ + Enter | palette 条目移动/选择 |

全部注册在 demo frame 层，不污染页面级快捷键；palette 输入框聚焦时按键不外泄。

## 可及性

- 所有图标按钮带 `aria-label`（含快捷键提示，如 "Search, Ctrl K"）。
- 折叠树/切换按钮带 `aria-expanded` / `aria-pressed`；palette `role="dialog" aria-modal`；active 屏 `aria-current="page"`。
- `prefers-reduced-motion` 全局降级（motion.css 已含）。
