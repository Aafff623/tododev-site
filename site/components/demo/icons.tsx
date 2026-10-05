/**
 * icons.tsx — 图标门面： Phosphor Icons（regular，MIT） + 原创 monogram 头像。
 * 具体图形在 icons-phosphor.tsx（由 temp/assets/gen-icons.mjs 生成）。
 */
export * from "./icons-phosphor";

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

import {
  IconBars,
  IconBolt,
  IconBranch,
  IconCheck,
  IconClock,
  IconCode,
  IconDb,
  IconGlobe,
  IconGrid,
  IconImage,
  IconKanban,
  IconKey,
  IconMail,
  IconServer,
  IconSpark,
  IconUsers,
} from "./icons-phosphor";

export const iconMap = {
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
} as const;
