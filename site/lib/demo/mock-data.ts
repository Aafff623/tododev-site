/**
 * mock-data.ts — 原创演示数据（research/07 的内容边界：结构与该站范式同型，文案全部自写）。
 * 数据与 UI 严格解耦：screens 只渲染这里的纯数据。
 */
import type { DemoScreen } from "./state";

/* ── Workspace：多智能体叙事（原创剧本）─────────────────────────── */

export type Agent = { name: string; role: string; hue: string };

export const agents: Record<string, Agent> = {
  designer: { name: "Brand designer", role: "design", hue: "#c29343" },
  frontend: { name: "Frontend engineer", role: "build", hue: "#4f8f6b" },
  release: { name: "Release engineer", role: "ship", hue: "#5f7fb8" },
  you: { name: "You", role: "review", hue: "#8a7fb8" },
};

export type Task = {
  num: string;
  title: string;
  agent: keyof typeof agents;
  project: string;
};

export const tasks: Record<string, Task> = {
  t101: {
    num: "101",
    title: "Design the launch page with the Nimbus brand kit",
    agent: "designer",
    project: "Nimbus",
  },
  t102: {
    num: "102",
    title: "Build the page, waitlist form and changelog feed",
    agent: "frontend",
    project: "Nimbus",
  },
  t103: {
    num: "103",
    title: "Wire the domain, deploy previews and OG images",
    agent: "release",
    project: "Nimbus",
  },
  t104: {
    num: "104",
    title: "Approve the launch and switch the domain over",
    agent: "you",
    project: "Nimbus",
  },
};

/** 看板列：backlog / progress / needs / done */
export type BoardState = {
  backlog: string[];
  progress: string[];
  needs: string[];
  done: string[];
};

export const boardEmpty: BoardState = {
  backlog: [],
  progress: [],
  needs: [],
  done: [],
};

/** 第 1 拍：chief 拆分后任务入池 */
export const boardSeeded: BoardState = {
  backlog: ["t101", "t102", "t103"],
  progress: [],
  needs: [],
  done: [],
};

export const boardFinal: BoardState = {
  backlog: [],
  progress: [],
  needs: ["t104"],
  done: ["t101", "t102", "t103"],
};

export type ChatMessage = {
  from: "user" | "chief";
  time: string;
  text: string;
  /** chief 拆分出的任务行 */
  taskRows?: string[];
  /** 状态注脚（如 Done 2m） */
  note?: string;
};

export type Beat = {
  messages: ChatMessage[];
  board: BoardState;
};

/**
 * 叙事 beats：自动播放逐拍推进（research/08 自创创新 6「活的时间线」），
 * 每拍把 messages 追加到聊天、把 board 整体替换为快照。
 */
export const beats: Beat[] = [
  {
    messages: [
      {
        from: "user",
        time: "09:12",
        text: "I need a launch page for Nimbus this week — waitlist form, changelog feed and a press kit. Can we have something live today?",
      },
    ],
    board: boardEmpty,
  },
  {
    messages: [
      {
        from: "chief",
        time: "09:13",
        text: "On it — splitting this into three todos and running them in parallel. I'll call you over as soon as a first version is up.",
        taskRows: ["t101", "t102", "t103"],
      },
    ],
    board: boardSeeded,
  },
  {
    messages: [
      {
        from: "chief",
        time: "09:41",
        text: "Good pace: the page structure and the deploy pipeline are already in. The designer is polishing the hero section now.",
        note: "Done 3m",
      },
    ],
    board: {
      backlog: ["t101"],
      progress: ["t102"],
      needs: [],
      done: ["t103"],
    },
  },
  {
    messages: [
      {
        from: "chief",
        time: "10:05",
        text: "Review caught one thing: the waitlist form submits without validation. The frontend engineer is patching it now.",
        note: "Done 2m",
      },
    ],
    board: {
      backlog: [],
      progress: ["t102"],
      needs: [],
      done: ["t101", "t103"],
    },
  },
  {
    messages: [
      {
        from: "chief",
        time: "10:32",
        text: "✅ Patch passed re-review and the preview is live. One card needs your sign-off before we point the domain.",
        note: "Done 40s",
        taskRows: ["t104"],
      },
    ],
    board: boardFinal,
  },
  {
    messages: [
      { from: "user", time: "10:40", text: "Ship it." },
      {
        from: "chief",
        time: "10:44",
        text: "🚀 Live at nimbus.dev — the waitlist is collecting signups and the changelog feed is wired in. Go tell everyone.",
        note: "Done 1m 10s",
      },
    ],
    board: {
      backlog: [],
      progress: [],
      needs: [],
      done: ["t101", "t102", "t103", "t104"],
    },
  },
];

export const topic = {
  emoji: "☄️",
  name: "Launch page",
  badge: 3,
};

/* ── Schedules（原创行）────────────────────────────────────────── */

export type ScheduleRow = {
  num: string;
  title: string;
  rule: string;
  project: string;
  next: string;
  last: string | null;
  active: boolean;
};

export const schedules: ScheduleRow[] = [
  {
    num: "212",
    title: "Star history snapshot for Nimbus",
    rule: "Every day at 08:30",
    project: "Nimbus",
    next: "Tomorrow 08:30",
    last: "2 hours ago",
    active: true,
  },
  {
    num: "208",
    title: "Changelog digest to the mailing list",
    rule: "Mondays at 09:00",
    project: "Beacon",
    next: "Monday 09:00",
    last: "6 days ago",
    active: true,
  },
  {
    num: "201",
    title: "Publish the Friday field note",
    rule: "Fridays at 17:00",
    project: "Orchard",
    next: "Friday 17:00",
    last: "2 days ago",
    active: true,
  },
  {
    num: "196",
    title: "Nightly link and sitemap check",
    rule: "Every day at 03:00",
    project: "Beacon",
    next: "Tomorrow 03:00",
    last: "9 hours ago",
    active: true,
  },
  {
    num: "190",
    title: "Sweep the waitlist for duplicates",
    rule: "Every day at 19:00",
    project: "Nimbus",
    next: "Today 19:00",
    last: "13 hours ago",
    active: true,
  },
  {
    num: "184",
    title: "Dependency updates across repos",
    rule: "Tuesdays at 07:00",
    project: "Nimbus",
    next: "Tuesday 07:00",
    last: null,
    active: false,
  },
];

/* ── Connections（原创简介文案）────────────────────────────────── */

export type ConnectionCategory =
  | "Code & issues"
  | "Docs"
  | "Chat"
  | "Monitoring"
  | "Cloud"
  | "Payments";

export type Connection = {
  name: string;
  monogram: string;
  tint: string;
  category: ConnectionCategory;
  connected: boolean;
  blurb: string;
};

export const connectionCategories: Array<
  "All" | `Connected ${number}` | ConnectionCategory
> = [
  "All",
  "Connected 3",
  "Code & issues",
  "Docs",
  "Chat",
  "Monitoring",
  "Cloud",
  "Payments",
];

export const connections: Connection[] = [
  {
    name: "GitHub",
    monogram: "GH",
    tint: "#3f3f46",
    category: "Code & issues",
    connected: true,
    blurb: "Repositories, issues and pull requests for every project.",
  },
  {
    name: "Linear",
    monogram: "LN",
    tint: "#5e6ad2",
    category: "Code & issues",
    connected: true,
    blurb: "Cycles and projects that keep the issue queue honest.",
  },
  {
    name: "Notion",
    monogram: "N",
    tint: "#6b6b6b",
    category: "Docs",
    connected: false,
    blurb: "Specs, wikis and meeting notes in one shared space.",
  },
  {
    name: "Slack",
    monogram: "S",
    tint: "#8f5f4f",
    category: "Chat",
    connected: true,
    blurb: "Channels and DMs where the team actually talks.",
  },
  {
    name: "Sentry",
    monogram: "Se",
    tint: "#7b5c90",
    category: "Monitoring",
    connected: false,
    blurb: "Error tracking with stack traces attached to releases.",
  },
  {
    name: "Datadog",
    monogram: "Dd",
    tint: "#77618c",
    category: "Monitoring",
    connected: false,
    blurb: "Metrics, logs and traces in a single pane of glass.",
  },
  {
    name: "Vercel",
    monogram: "V",
    tint: "#4f4f4f",
    category: "Cloud",
    connected: true,
    blurb: "Preview URLs and production deploys for the sites.",
  },
  {
    name: "Cloudflare",
    monogram: "Cf",
    tint: "#a86438",
    category: "Cloud",
    connected: false,
    blurb: "DNS, CDN and Workers at the edge.",
  },
  {
    name: "Stripe",
    monogram: "St",
    tint: "#5b53c9",
    category: "Payments",
    connected: false,
    blurb: "Payments, invoices and revenue events as they happen.",
  },
];

/* ── Skills（原创条目）─────────────────────────────────────────── */

export type Skill = {
  slug: string;
  summary: string;
  files: number;
  updated: string;
  icon: "globe" | "check" | "bolt" | "mail" | "bars" | "image";
};

export const skills: Skill[] = [
  {
    slug: "changelog-style",
    summary: "House voice for release notes: short, factual, user-facing.",
    files: 1,
    updated: "3 days ago",
    icon: "globe",
  },
  {
    slug: "release-checklist",
    summary: "Pre-flight checks: build, tests, links and sitemap.",
    files: 4,
    updated: "5 days ago",
    icon: "check",
  },
  {
    slug: "seo-sweep",
    summary: "Audit titles, meta tags and internal links before a launch.",
    files: 2,
    updated: "1 week ago",
    icon: "bolt",
  },
  {
    slug: "inbox-triage",
    summary: "Sort support mail into replies, bugs and ideas.",
    files: 1,
    updated: "2 weeks ago",
    icon: "mail",
  },
  {
    slug: "weekly-report",
    summary: "Roll the week's metrics into one Monday-morning summary.",
    files: 1,
    updated: "2 weeks ago",
    icon: "bars",
  },
  {
    slug: "og-cards",
    summary: "Generate social cards for every new post and page.",
    files: 3,
    updated: "3 weeks ago",
    icon: "image",
  },
];

/* ── palette / 导航 ───────────────────────────────────────────── */

export const navItems: Array<{ screen: DemoScreen; label: string }> = [
  { screen: "workspace", label: "Workspace" },
  { screen: "schedules", label: "Schedules" },
  { screen: "connections", label: "Connections" },
  { screen: "skills", label: "Skills" },
];

export type PaletteGoTo = {
  label: string;
  screen?: DemoScreen;
  icon:
    | "kanban"
    | "clock"
    | "users"
    | "grid"
    | "spark"
    | "key"
    | "server"
    | "bars"
    | "db";
};

export const paletteGoTo: PaletteGoTo[] = [
  { label: "Workspace", screen: "workspace", icon: "kanban" },
  { label: "Schedules", screen: "schedules", icon: "clock" },
  { label: "Team", icon: "users" },
  { label: "Connections", screen: "connections", icon: "grid" },
  { label: "Skills", screen: "skills", icon: "spark" },
  { label: "Memory", icon: "db" },
  { label: "Secrets", icon: "key" },
  { label: "Machines", icon: "server" },
  { label: "Usage", icon: "bars" },
];

/** 营销页 Works-with 条目（纯文字 + monogram 点，原创排版） */
export const worksWith = [
  { name: "Claude Code", tint: "#d97757" },
  { name: "Codex", tint: "#8f8f8f" },
  { name: "Gemini CLI", tint: "#8e75b2" },
  { name: "Cursor", tint: "#9c9c9c" },
  { name: "OpenCode", tint: "#7aa2f7" },
  { name: "ZCode", tint: "#4f46e5" },
  { name: "Qwen Code", tint: "#6d44e8" },
  { name: "Droid", tint: "#5f7fb8" },
];
