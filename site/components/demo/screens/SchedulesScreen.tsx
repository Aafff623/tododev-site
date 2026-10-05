"use client";

import { schedules } from "@/lib/demo/mock-data";
import { IconChevronLeft, IconDots, IconPlus } from "../icons";

/** 通用页头：左返回（装饰）+ 居中标题 + 右动作（装饰） */
export function ScreenHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="relative flex h-11 flex-shrink-0 items-center border-b border-line px-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary [&>svg]:h-4 [&>svg]:w-4">
        <IconChevronLeft />
      </span>
      <h2 className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13.5px] font-medium text-content">
        {title}
      </h2>
      {action ? (
        <span className="ml-auto flex items-center gap-1 text-[13px] font-medium text-[#7c86f2]">
          <IconPlus size={13} strokeWidth={2.5} />
          {action}
        </span>
      ) : null}
    </div>
  );
}

export function SchedulesScreen() {
  return (
    <div className="flex min-h-0 flex-1 flex-col" data-screen="schedules">
      <ScreenHeader title="Schedules" action="New" />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-5 scrollbar-none">
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-xl bg-surface-inset">
          {schedules.map((s, i) => (
            <div
              key={s.num}
              className={`flex items-center gap-3 px-4 py-3 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <span
                className={`h-2 w-2 flex-shrink-0 rounded-full ${
                  s.active ? "bg-emerald-500" : "border border-content-dim"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] text-content">
                  <span className="mr-1.5 font-mono text-[11.5px] text-content-dim">
                    #{s.num}
                  </span>
                  {s.title}
                </p>
                <p className="mt-0.5 truncate text-[12px] text-content-tertiary">
                  {s.rule}
                  <span className="mx-1.5 text-content-dim">·</span>
                  {s.project}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[12px] text-content-secondary">
                  Next {s.next}
                </p>
                <p className="mt-0.5 text-[11px] text-content-dim">
                  {s.last ? `Last ${s.last}` : "Not run yet"}
                </p>
              </div>
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-content-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5">
                <IconDots />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
