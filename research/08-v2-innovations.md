# 08 · V2 Innovations（Baseline 冻结后实施）

从 GPT 建议清单中选定 5 项 + 2 项自创，全部保持 "quiet, precise, tool-like" 气质：

1. **Deep-link demo state**（GPT-D）：`?demo=skills&state=palette` 打开页面直达对应状态；不触发路由跳转，只初始化 reducer；方便分享营销截图。✅
2. **Replay / Reset**（GPT-E）：frame 右上角极小的 "Replay" 控件，一键恢复初始状态并重播。✅
3. **Scroll-sync storytelling**（GPT-B）~~：原做成 sticky 滚动叙事区~~ **已移除**（2026-10-05 用户实测反馈：钉住 demo + 440vh 滚动区会劫持正常下拉浏览；切屏只认点击，demo 回归普通文档流——与 todos.dev 本尊一致）。
4. **Idle auto-tour**（GPT-C，实测 todos.dev 同款行为）：8–12s 无操作后叙事自动推进；一有输入立即让位。✅
5. **Guided spotlight**（GPT-A）：首次进入时给 sidebar 热点一个极轻的提示环（一次性，sessionStorage 记住）。✅
6. **（自创）活的时间线**：workspace 叙事不是静态文案——按剧本引擎推进（时间戳 tick、任务卡从 Backlog 流向 Done），让"多智能体协作"被看见。✅
7. **（自创）Usage 微仪表**：顶栏或 footer 放一个 mock 用量火花线，强化 tool-like 质感。（未做——可做但不紧急）

禁做：carousel 式轮播、炫技大动画、颜色渐变堆砌。

> 教训记一条：任何"自动切 demo 状态"的创新都不能以牺牲正常滚动浏览为代价。
