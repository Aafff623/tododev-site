# 00 · Source Map（实测来源清单）

采集日期：2026-10-05，真机 Chromium（IAB），视口 1440×900 与 390×844。

## 直接实测（measured）

| 来源 | 内容 | 位置 |
| --- | --- | --- |
| Live SSR HTML | 完整 DOM 结构、Tailwind class、aria 标签、SVG 图标 | `capture/todos/dom/`（要点已提炼进本目录文档） |
| `:root` CSS variables | 全部 dark token 实测值 | `capture/todos/css/root-vars.json` |
| 截图 8 张 | hero / workspace 起点 / schedules / connections / skills / palette / sidebar-expanded / mobile palette | `capture/todos/screenshots/` |
| a11y tree | 各屏内容结构、palette 条目、kanban 列结构 | 会话内快照（要点见 03） |
| 行为观察 | demo 存在自动重播（idle 后叙事重置从头播放） | 03 / 08 |

## 推断（inferred，标注于对应文档）

- container query 分栏比例（`--board-share:64%; --chat-share:36cqw`）来自 SSR HTML 内联样式，属实测；
- tooltip 400ms 延迟来自 class `group-hover:delay-[400ms]`，实测；
- 自动重播的触发时长（未精确计时，推断为数十秒级 idle）；
- 浅色主题 token 未采集（本次只做 dark 基线，light 留待后续）。

## 参考仓库

5 个 shallow clone 在 `refs/`（git 忽略），方法论要点见 `06-reference-repos.md`。
