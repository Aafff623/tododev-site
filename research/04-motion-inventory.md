# 04 · Motion Inventory

原则：**不让动画成为主角**。全部动效都在 200–300ms 区间，easing 克制。

| 元素 | 动效 | 参数（实测/推断） |
| --- | --- | --- |
| Sidebar 折叠 | width | `200ms cubic-bezier(0.2,0,0,1)` + `motion-reduce:transition-none` |
| Palette 出入场 | transform+opacity | `200ms`；closed 态 `translate-y-full opacity-0`（移动端）、桌面 scale/opacity 类似 |
| Tooltip | opacity | `300ms`，hover `delay 400ms` 后浮现 |
| 按钮/列表 hover | background/color | `transition-colors`，无位移 |
| 主区切换屏 | visibility 过渡 | `md:transition-[visibility] duration-200`（内容即时换，无大动画） |
| 消息入场（自动重播） | 逐条出现 | 推断： opacity/translate 小步进，配时间戳推进 |
| 状态点 | ping | `animate-ping`（移动端汉堡的提醒点），`motion-reduce:animate-none` |
| 骨架屏 | pulse | navbar 右侧占位 `animate-pulse` |

实现纪律：所有 transition 一律挂 `motion-reduce:transition-none`；不用 spring/物理曲线；不引入 Framer Motion。
