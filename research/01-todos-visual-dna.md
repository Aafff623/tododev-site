# 01 · Visual DNA

> 只记录几何、色彩、字体的**实测事实**与设计原则；不复制该站的文案与品牌资产。

## 色彩：zinc 灰阶层级（实测 `:root`）

```text
surface-inset   #09090b   最深（输入槽、列卡片）
surface         #18181b   主底
surface-elevated / secondary / hover  #1f1f23
surface-tertiary / border-default     #27272a
border-strong   #3f3f46
text-dim        #52525b
text-tertiary   #71717a
text-secondary  #d4d4d8
text-primary    #fafaf9
nav-bg          rgba(24,24,27,.85)
accent          #4f46e5 (indigo-600)
```

要点：**10+ 层灰阶**而不是黑白二值；分层靠 1px hairline（border-line = #27272a）而非阴影；唯一彩色是 indigo 强调 + 状态点（绿=active，蓝=in progress，橙=needs you，amber=PRO 徽章/技能星标）。

## 版式

- 正文/标题：Inter variable；logo 与工具感 accent：JetBrains Mono variable（`[todos]` 式方括号 logo）。
- Hero h1：`text-[2rem] → lg:text-[3.5rem]`，`font-semibold tracking-tight leading-[1.0~1.05]`。
- 产品界面内大量 12px/14px 小字；次级信息 11–12px + tertiary 灰。
- 行内 kbd 提示（Ctrl K、N）直接排在 UI 文本右侧，右对齐、text-dim——"keyboard-first" 的可视化。

## 几何（全部实测）

```text
56   navbar 高（h-14）
44   sidebar header/footer、app 内顶栏（h-11）
52   sidebar collapsed
240  sidebar expanded
9    resize handle 命中区（-ml-[5px] 负 margin，视觉线 1px）
620  demo 高（sm+）；520（base）
1232 demo 宽（1440 视口，max-w-7xl=1280 下）
12   demo 外框/palette radius（rounded-xl）
6/8  按钮/小卡 radius（rounded-md/lg）
```

## 质感来源（设计原则）

1. 几何规整：所有高度落在 4px 网格（44/52/56/620）。
2. 灰阶分层，无渐变、无玻璃拟态、无重阴影（外框仅 `shadow-[0_24px_50px_-12px_rgba(0,0,0,0.14)] dark:shadow-none`）。
3. 极少 radius 层级（6/8/12 三档）。
4. hairline 边框承担全部结构分隔。
5. 彩色只做"信号"不做"装饰"。
6. 最关键的：**交互即内容**——把能真的操作的产品放进营销页。
