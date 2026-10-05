# 06 · Reference Repos（方法论考古）

5 个仓库 shallow clone 在 `refs/`（仅本机）。各自可借鉴的**方法论**（不照搬代码）：

## demoday（MIT）

- 核心卖点："one HTML file, one iframe"——与我们不同（我们做同页 React replica），但其流程值得抄：
  detect stack → map navigation → extract brand tokens → 选 3 条 flow → 生成 mock UI → embed → browser verify。
- Demo 是仓库里的一个文件、可 PR review——"demo as code" 思路我们保留（整个 demo 就是 site/ 里的组件）。

## interactive-preview-skill（MIT）

最接近我们的方法论底座：
- isolated presentational replica（隔离的展示副本）
- in-memory mock data、no fetch / no auth / no secrets
- theme token extraction（我们从 live CSS 变量直接提取）
- declarative flow config（叙事剧本声明化）
- audit 脚本（泄漏检查：demo 里不得出现真实 API 调用）

## shadcn-kanban-board（MIT）

- accessible kanban：键盘 DnD、screen reader announcement、列/卡/编辑。
- Baseline 只做视觉；V2 若加卡片流转，按它的键盘可及性模式。

## react-code-panes（MIT）

- "bounded embedded workbench"：工作台必须放在**固定高度 parent** 里——与我们 620px frame 一致。
- resize sash 的实现：细视觉线 + 宽命中区 + pointer capture，持久化布局。
- 侧栏 min/max clamp、折叠分区。

## Ash（MIT，clone 后已确认 LICENSE 存在）

- keyboard-first 项目管理：sidebar/topbar/kanban/command palette 的组合布局参考。

## 结论

我们最终架构 = interactive-preview-skill 的 mock-only 纪律 + Todos 实测的同页 replica 模式 + code-panes 的 resize 工程 + shadcn-kanban 的可及性标准。
