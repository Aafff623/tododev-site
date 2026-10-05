# app-shell.md — Demo 外壳几何契约

```text
┌─ InteractiveDemoFrame 1232×622 rounded-xl border hairline bg-surface overflow-clip
│  ┌─ Sidebar 52/240px，border-r，width 过渡 200ms
│  │  header 44px（折叠钮）· 滚动区 · footer 44px（用户）
│  ├─ ResizeHandle 命中 9px（-ml-[5px] -mr-1），内含 1px 视觉线，col-resize touch-none
│  └─ Main flex-1 min-w-0（container-type: inline-size）
│     顶栏 44px border-b · Screen（workspace: chat 36cqw + board 64%）
└─ PaletteLayer：桌面 560×460 居中；移动 bottom sheet max-h 88%
```

规则：
1. 高度只允许 44 / 52 / 56 / 520 / 620 出现在骨架上。
2. 分隔一律 1px border，不用阴影。
3. demo frame 外阴影仅 `0 24px 50px -12px rgba(0,0,0,.14)`（dark 下关闭）。
4. 主内容需要 `min-w-0` 防溢出；sidebar 拖拽时主区自适应收缩。
