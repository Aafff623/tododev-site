# qa/interaction-matrix.md — 验收记录（2026-10-05）

环境：ZCode IAB Chromium（真机渲染），1440×900 与 390×844。

## 视觉状态矩阵（截图在 qa/screenshots/）

| 状态 | 1440 | 390 |
| --- | --- | --- |
| hero + demo 顶部 | ✅ local-1440-hero | ✅ local-390-demo（修：双顶栏） |
| workspace 首拍 | ✅ local-1440-workspace | — |
| workspace 剧中（活时间线） | ✅ local-1440-workspace-midstory | — |
| schedules | ✅ local-1440-schedules | — |
| connections | ✅ local-1440-connections | — |
| skills | ✅ local-1440-skills | — |
| palette 开 | ✅ local-1440-palette | —（bottom sheet 形态由响应式类保证） |
| sidebar 展开 | ✅ local-1440-sidebar-expanded | ✅ local-390-drawer |
| kanban（移动） | — | ✅ local-390-board |

## 功能断言（读运行时状态机验证）

| 项 | 结果 |
| --- | --- |
| Ctrl+K 开 palette / Esc 关 | ✅ |
| Ctrl+B 侧栏折叠↔展开 | ✅ |
| scroll-sync 事件 → navigate(connections) 且不打断 autoplay | ✅ |
| `?demo=skills&view=palette` deep-link | ✅（screen=skills, palette=true, autoplay 暂停） |
| Replay → beat=0 / screen=workspace / autoplay 恢复 | ✅ |
| 剧本推进节拍（10s → beat 3） | ✅ |
| lint / build | ✅ 0 error / ✅ 静态预渲染 |

## 已修复的评审发现

1. P0 移动端聊天顶栏渲染两遍（ChatPane 与 wrapper 各一次）→ `showHeader` 开关。
2. 看板列头筛选图标常显 → hover 才显示（`group/col`）。
3. 消息 key 不稳定 → 每拍全部重放动画 → 改为稳定 `${beat}-${index}` id。
4. 剧本引擎依赖 IO → IAB 节流环境下卡死 → inView 默认 true、IO 仅作暂停信号（对真实浏览器行为不变：滚出视口即暂停）。
5. 剧本第 0 拍看板应为空 → boardSeeded 移到第 1 拍。

## 环境备注（非产品缺陷）

- IAB 面板 rAF/IntersectionObserver 被节流（`visibilityState` 仍报 visible）→ scroll-sync 的 IO 联动在该环境不可观测（接线已用事件注入验证）；截图偶发旧帧发暗为动画时钟冻结假象，禁用动画复测正常。
- 独立视觉评审 agent 未能派出（供应商不可用），降级为主 Agent 逐图自检。
- 浅色主题未在基线范围。
