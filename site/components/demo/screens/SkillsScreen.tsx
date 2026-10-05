"use client";

import { useState } from "react";
import { skills } from "@/lib/demo/mock-data";
import { ScreenHeader } from "./SchedulesScreen";
import {
  iconMap,
  IconBars,
  IconChevronDown,
  IconSearch,
  IconSpark,
} from "../icons";

export function SkillsScreen() {
  const [query, setQuery] = useState("");
  const shown = skills.filter((s) =>
    (s.slug + " " + s.summary).toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-screen="skills">
      <ScreenHeader title="Skills" action="New" />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-4 scrollbar-none">
        <div className="mx-auto max-w-[880px]">
          <div className="flex items-center gap-2">
            <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-surface-inset px-2.5">
              <IconSearch size={14} className="flex-shrink-0 text-content-tertiary" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills…"
                aria-label="Search skills"
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-content outline-none placeholder:text-content-dim"
              />
            </div>
            <button
              type="button"
              className="flex h-9 flex-shrink-0 items-center gap-1.5 rounded-md px-2 text-[12.5px] text-content-secondary transition-colors hover:bg-surface-hover hover:text-content"
            >
              <IconBars size={13} />
              Sort
              <IconChevronDown size={11} className="text-content-tertiary" />
            </button>
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
            {shown.map((s) => {
              const I = iconMap[s.icon];
              return (
                <div
                  key={s.slug}
                  className="rounded-lg border border-line bg-surface p-3 transition-colors hover:bg-surface-secondary"
                >
                  <div className="flex items-center gap-2">
                    <IconSpark size={14} className="flex-shrink-0 text-amber-300/80" />
                    <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-content">
                      {s.slug}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 min-h-[32px] text-[12px] leading-snug text-content-tertiary">
                    {s.summary}
                  </p>
                  <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-content-dim">
                    {s.files} {s.files === 1 ? "file" : "files"}
                    <span>·</span>
                    {s.updated}
                    <span className="ml-auto flex h-4 w-4 items-center justify-center [&>svg]:h-3 [&>svg]:w-3">
                      <I />
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
          {shown.length === 0 ? (
            <p className="py-10 text-center text-[12.5px] text-content-tertiary">
              No skills match “{query}”.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
