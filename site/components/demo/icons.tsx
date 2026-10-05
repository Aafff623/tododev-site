/**
 * icons.tsx — 原创内联 SVG 图标集（24 viewBox，stroke 风格）。
 * 只用基础几何形，不复制任何现成图标库的路径资产。
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 16, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconPanelLeft = (p: P) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
  </Base>
);

export const IconPanelRight = (p: P) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15 3v18" />
  </Base>
);

export const IconSearch = (p: P) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7.5" />
    <path d="m20.5 20.5-4.2-4.2" />
  </Base>
);

export const IconPlus = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14M12 5v14" />
  </Base>
);

export const IconKanban = (p: P) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M15 3v18" />
  </Base>
);

export const IconClock = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Base>
);

export const IconGrid = (p: P) => (
  <Base {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Base>
);

/** 四角星 = skills */
export const IconSpark = (p: P) => (
  <Base {...p}>
    <path d="M12 3.5 13.9 10l6.6 2-6.6 2L12 20.5 10.1 14l-6.6-2 6.6-2L12 3.5z" />
  </Base>
);

export const IconChevronRight = (p: P) => (
  <Base {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Base>
);

export const IconChevronLeft = (p: P) => (
  <Base {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Base>
);

export const IconChevronDown = (p: P) => (
  <Base {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Base>
);

export const IconMenu = (p: P) => (
  <Base {...p}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
  </Base>
);

export const IconDots = (p: P) => (
  <Base {...p} strokeWidth={0} fill="currentColor">
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </Base>
);

export const IconSliders = (p: P) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
    <circle cx="15" cy="7" r="2" fill="var(--surface)" />
    <circle cx="8.5" cy="12" r="2" fill="var(--surface)" />
    <circle cx="16.5" cy="17" r="2" fill="var(--surface)" />
  </Base>
);

export const IconArrowUp = (p: P) => (
  <Base {...p}>
    <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
  </Base>
);

export const IconPaperclip = (p: P) => (
  <Base {...p}>
    <path d="m20 11.5-8 8a5 5 0 0 1-7-7l8-8a3.4 3.4 0 0 1 4.8 4.8l-8 8a1.8 1.8 0 0 1-2.5-2.5l7.2-7.2" />
  </Base>
);

export const IconImage = (p: P) => (
  <Base {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <circle cx="8.5" cy="10" r="1.5" />
    <path d="m21 15.5-4.5-4.5L7 20.5" />
  </Base>
);

export const IconCheck = (p: P) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const IconX = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconFilter = (p: P) => (
  <Base {...p}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </Base>
);

export const IconExpand = (p: P) => (
  <Base {...p}>
    <path d="M9 4H4v5M15 20h5v-5" />
    <path d="M4 4l6 6M20 20l-6-6" />
  </Base>
);

export const IconBranch = (p: P) => (
  <Base {...p}>
    <circle cx="6.5" cy="5" r="2.2" />
    <circle cx="6.5" cy="19" r="2.2" />
    <circle cx="17.5" cy="8.5" r="2.2" />
    <path d="M6.5 7.2v9.6" />
    <path d="M17.5 10.7c0 4.3-5.5 3.4-9 5.3" />
  </Base>
);

export const IconReplay = (p: P) => (
  <Base {...p}>
    <path d="M3.5 4.5V9H8" />
    <path d="M4.6 13.5a8 8 0 1 0 1.9-6.9L3.5 9" />
  </Base>
);

export const IconUsers = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M3 20c0-3.4 2.7-5.6 6-5.6s6 2.2 6 5.6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M17.5 14.6c2.2.4 3.9 2.1 3.9 4.4" />
  </Base>
);

export const IconKey = (p: P) => (
  <Base {...p}>
    <circle cx="7.5" cy="15.5" r="4" />
    <path d="m10.5 12.5 9-9M15.5 7.5l3 3" />
  </Base>
);

export const IconServer = (p: P) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </Base>
);

export const IconBars = (p: P) => (
  <Base {...p}>
    <path d="M5 20v-8M12 20V4M19 20v-5" />
  </Base>
);

export const IconDb = (p: P) => (
  <Base {...p}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13" />
    <path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
  </Base>
);

export const IconGlobe = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13.5 13.5 0 0 1 3.6 9 13.5 13.5 0 0 1-3.6 9 13.5 13.5 0 0 1-3.6-9A13.5 13.5 0 0 1 12 3z" />
  </Base>
);

export const IconBolt = (p: P) => (
  <Base {...p}>
    <path d="M13 2.5 4.5 14H11l-1 7.5L18.5 10H12l1-7.5z" />
  </Base>
);

export const IconMail = (p: P) => (
  <Base {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
);

export const IconCode = (p: P) => (
  <Base {...p}>
    <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
  </Base>
);

/** 首字母 monogram 头像（原创，无第三方头像资产） */
export function Monogram({
  initials,
  size = 24,
  tint = "#3d4a5c",
  className,
}: {
  initials: string;
  size?: number;
  tint?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex flex-shrink-0 select-none items-center justify-center rounded-full font-medium ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        backgroundColor: tint,
        color: "#f4f4f2",
        fontSize: Math.round(size * 0.38),
        letterSpacing: "0.02em",
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export type IconName =
  | "kanban"
  | "clock"
  | "users"
  | "grid"
  | "spark"
  | "key"
  | "server"
  | "bars"
  | "db"
  | "globe"
  | "bolt"
  | "mail"
  | "check"
  | "code"
  | "image"
  | "branch";

export const iconMap: Record<IconName, (p: P) => React.JSX.Element> = {
  kanban: IconKanban,
  clock: IconClock,
  users: IconUsers,
  grid: IconGrid,
  spark: IconSpark,
  key: IconKey,
  server: IconServer,
  bars: IconBars,
  db: IconDb,
  globe: IconGlobe,
  bolt: IconBolt,
  mail: IconMail,
  check: IconCheck,
  code: IconCode,
  image: IconImage,
  branch: IconBranch,
};
