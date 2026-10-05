# 09 · IP 吉祥物候选与品牌资产（2026-10-05）

按 `ip-as-logo` 规范一次成图：3 个方向 × 2 = 6 张独立候选，每张一个完整 1:1 方图、三色（两 IP 色 + 一背景色）、无文字。生成通道：本地 MiniMax `mmx image generate`（image-01），prompt 为该 skill 的骨架改写、压缩到 <1500 字符。

## 方向与结果

| 标签 | 方向 | 角落 | 文件（temp/assets/gen/ip/，不进 Git） |
| --- | --- | --- | --- |
| A1 / A2 | 信使机器人（square 头+天线塔+圆角身体） | 左下 / 右下 | A1-robot-lower-left.jpg / A2-robot-lower-right.jpg |
| B1 / B2 | 纸飞机信使（圆滚滚机身+小圆眼） | 左下 / 右下 | B1-plane-lower-left.jpg / B2-plane-lower-right.jpg |
| C1 / C2 | 信使小狗（大圆头+耷耳+任务挂牌） | 左下 / 右下 | C1-pup-lower-left.jpg / C2-pup-lower-right.jpg |

（均为 1024×1024。）

**选定：C1（信使小狗）**。理由：任务挂牌直接对应 relay 的"派单/中继"产品隐喻；三只里辨识度与可爱度最高；在 32×32 缩略（favicon）下头部+耳朵剪影仍可读。
**备选：B2（纸飞机）**，色彩与站点最接近但面部偏弱。

偏差记录：C1 实出四色（奶油/褐/珊瑚项圈/橄榄底，超出"恰好三色"）且带微笑；按 ip-as-logo "一次成图、原样交付"纪律不做修补，由品牌侧接受。

## 落地位置

- `site/public/ip/mascot.jpg`（即 C1）：chief 头像、底部品牌位
- `site/app/icon.jpg`：站点 favicon（同图）
- 四张角色头像（`site/public/avatars/`）：designer.jpg / frontend.jpg / release.jpg / noa.jpg，均为 MiniMax 生成、与站内 UI 同色系（深炭底 flat vector）

## 品牌 logo 资产（连接页 + hero "Works with"）

| 来源 | 许可 | 覆盖 |
| --- | --- | --- |
| simple-icons 包 | CC0-1.0 | Claude / Gemini CLI / Cursor / OpenCode / Qwen / GitHub / Linear / Notion / Sentry / Datadog / Vercel / Cloudflare / Stripe |
| openai.svg（ai.sitebard 镜像） | Lobe Icons MIT | Codex |
| slack-salesforce-logo-nav-white.png | Slack 官方资产（nominative use） | Slack |
| ZCode / Droid | 无公开官方 mark | 回落品牌色方块 |

商标均归各公司；本站仅为兼容性标注（nominative use），未暗示背书。

## Phosphor 图标

`site/components/demo/icons-phosphor.tsx`（33 个组件）由 `temp/assets/@phosphor-icons/core` 包的 regular 集生成（Phosphor Icons MIT）。注意： phosphor CLI 的联网兜底在本机被墙，直接读包内 SVG 即可。

## 深度素材批次（2026-10-05 下午，第二弹）

- **四章吉祥物插图**（`public/ip/chapter-{delegate,automate,connect,reuse}.jpg`）：以 C1 为 `--subject-ref` 生成的同角色场景图（清单/闹钟/插头/书本），用于 demo 下方四章说明，每章配 Phosphor 图标。
- **Connections 扩建到 24 个集成**（新增 13 个品牌：GitLab/Jira/Confluence/Figma/Discord/Netlify/Railway/Expo/Supabase/Neon/Airtable/PostHog/Mixpanel/Docker/Google Cloud，含 Design/Data 两个新分类），Connected 计数改为动态计算。
- **部署裁切**：mmx 输出角落实测带极小渠道水印文字（`©UHD …Photvt.com` 等，pipeline 里被 pipeline 发现），已用 sharp 统一裁去四边 8% 区域（`temp/assets/crop-watermarks.mjs`）；候选原图未动。后续 mmx 产物上线前一律走此裁切。

## IP 第二轮（2026-10-05 傍晚）：风格转向「几何/工具向」

用户反馈：奶萌暖色小狗与站点 "quiet, precise, tool-like" 气质不合，要求风格大不一样。按 `ip-as-logo` 重新提案三个几何向方向，各 2 张（+2 张定向补画）：

| 标签 | 方向 | 角落 | 配色 | 结果 |
| --- | --- | --- | --- | --- |
| A1 | 信号塔信使 | 左/中 | #6366f1 + #eef0f6 / 底 #101014 | **✅ 选定为新品牌 IP** |
| A2 | 信号旗杆（无眼，物件非角色） | 右下 | off-white + 琥珀 / 深底 | 备选（物件向） |
| B1/B2 | 纸飞机信使 | 左/右 | — | 弃选：底色被模型跑偏成浅灰 |
| C1/C2 | 飞翼信封 | 左/右 | — | 弃选：底色被模型跑偏成浅蓝 |
| A3/A4 | 信号塔严格补画 | 左 | — | 弃选：构图/四色控制不住；候选保留 |

**A1 入选理由**：唯一同时满足「角色（有眼）+ 深锌底 + indigo/白 + 几何工具感」；小偏差（居中构图、嘴线、天线灯一点琥珀作信号色）由品牌侧接受。**产品隐喻也最准**：信号塔 = 派单中枢，正是 relay 的 chief 调度定位。

**部署**：`public/ip/mascot.jpg`（chief 头像）+ `app/icon.jpg`（favicon）已换成 A1；四章场景图用 A1 作 `--subject-ref` 重画（清单/灯塔+闹钟/三灯枢纽/书+星）并同路径替换。旧小狗版保留在 `temp/assets/gen/ip/` 备回退。

**教训**：mmx 对「hex 指定背景色」遵循不稳定（第二轮 4/6 跑偏成浅色），下单时要预期返工；素材上线前必须过水印裁切。
