# tododev-site Agent Rules

## Project purpose

把 todos.dev 验证过的 "营销页内嵌可交互产品 Demo" 范式做成原创品牌站点（临时品牌 `[relay]`）。研究基于 `TODOS_STYLE_ZCODE_HANDOFF.md` / `ZCODE_TODOS_MASTER_PROMPT.md`（存于 `temp/`）；最终交付物是 `site/` 下的 Next.js 应用与 `research/`、`design-system/`、`qa/` 文档。

## Read first

- `README.md` for startup and daily usage.
- `CONTEXT.md` for verified domain facts and shared terminology.
- `temp/AGENTS.md` before entering or creating files under `temp/`.
- `.agents/skills/` when a task matches a project-specific Skill.

## File boundaries

- Product code belongs in `site/`; durable research/design docs belong in `research/`, `design-system/`, `qa/`.
- Temporary scripts, raw capture payloads, reports, logs, and local secrets belong under `temp/`.
- `temp/` payloads and MCP configuration are local-only. Do not commit them.
- `refs/` and `capture/` raw payloads are local-only too (git-ignored); never copy third-party source files into `site/`.

## Mock-only contract（本项目红线）

- Demo 内禁止：真实后端、auth、数据库、真实 API 调用、网络写入、真实密钥。
- 所有行为必须能从 mock store 重置；交互状态用 `useReducer` 集中管理。
- 不复制 todos.dev 的品牌、文案、mock 内容与图标；只借鉴其**实测的几何、灰阶、动效参数与交互模式**。

## Secrets

- Any key, token, or credential that appears in a session is saved on receipt into `temp/secrets/` (or the project's Git-ignored env file) in the same turn — save silently, report the path, never ask for confirmation.
- Before requesting a credential, search `temp/secrets/` and Git-ignored env files first; never ask the owner for the same value twice.
- Secrets never enter Git-tracked files, logs, or replies, and never leave this machine.

## Working rules

- Inspect the current project and Git status before editing.
- Preserve unrelated changes and existing user-authored rules.
- Do not invent commands, paths, endpoints, or domain facts. Mark uncertainty for confirmation.
- Use Superpowers for the implementation workflow when it is available: clarify, plan, implement, test, review, and verify.
- Do not copy an external Skill package into this project just to make the tree look complete.
- UI 验收必须用真实浏览器截图（浏览器操作不委派给 subagent）。

## Completion

Report the files changed, checks run, remaining uncertainty, and any work intentionally left for the user. Do not claim deployment, MCP health, or production acceptance without direct evidence.
