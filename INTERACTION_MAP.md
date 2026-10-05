# INTERACTION_MAP

## 状态机

```mermaid
stateDiagram-v2
  [*] --> Workspace

  Workspace --> Schedules: sidebar / palette Go To / scroll-sync
  Workspace --> Connections: 同上
  Workspace --> Skills: 同上
  Schedules --> Workspace
  Connections --> Workspace
  Skills --> Workspace

  state "Sidebar" {
    [*] --> Collapsed52
    Collapsed52 --> Expanded240: Ctrl B / 顶部按钮
    Expanded240 --> Collapsed52: Ctrl B
    Expanded240 --> Resized: drag 9px handle (200–320 clamp)
  }

  state "Palette" {
    [*] --> Closed
    Closed --> Open: Ctrl K / Search / N
    Open --> Closed: Esc / 选中 / 点遮罩
    Open --> Open: Tab 切 tab、输入过滤、↑↓ 移动
  }

  state "StoryEngine" {
    [*] --> Playing
    Playing --> Paused: 用户在 frame 内输入
    Paused --> Playing: idle 12s（仅 workspace）
    Playing --> Replay: 剧终后 idle 15s
  }
```

## Tier A（真实可点）

| 控件 | 行为 |
| --- | --- |
| Sidebar 四屏导航 | local state 切屏，URL 不变；active `bg-surface-secondary` |
| 折叠/展开 / Ctrl B | width 200ms 过渡，折叠态 tooltip 400ms 延迟 |
| Resize handle | pointer capture 实时跟手，200–320 clamp |
| Search / Ctrl K | palette 打开（桌面居中 modal / 移动 bottom sheet） |
| palette tabs | 点击或 Tab 键切换 All/Tasks/Topics |
| palette 条目 | 点击/Enter：有 screen 的导航并关闭；其余仅关闭（mock） |
| Connections 分类 tabs | 点击过滤卡片（Tier C mock 结果） |
| Skills 搜索框 | 真实过滤 skill 卡 |
| Projects/Resources | aria-expanded 折叠树 |
| 移动端汉堡 / kanban 切换 | 抽屉开合；chat↔board 互斥（aria-pressed） |
| Replay | 重置全部状态并重播剧本 |

## Tier B（视觉，pointer-events none）

聊天气泡与输入槽、看板卡、schedule 行、connection/skill 卡、装饰图标。悬停样式只作装饰。

## 键盘契约

| 键 | 行为 |
| --- | --- |
| Ctrl/Cmd K | 开/关 palette |
| Esc | 关 palette / 关移动抽屉 |
| Ctrl/Cmd B | 折叠/展开 sidebar |
| N | 打开 palette（非输入态） |
| Tab / Shift Tab | palette tab 轮转 |
| ↑ ↓ Enter | 结果移动 / 激活 |

## Deep-link

`?demo=workspace|schedules|connections|skills` · `?view=palette` · `?story=0`（暂停自动播放）——只影响初始 reducer 状态。
