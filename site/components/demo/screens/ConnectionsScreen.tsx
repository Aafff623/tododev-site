"use client";

import { useState } from "react";
import Image from "next/image";
import {
  connectionCategories,
  connections,
} from "@/lib/demo/mock-data";
import { ScreenHeader } from "./SchedulesScreen";
import { BrandMark, brandTint } from "../brand-marks";
import { IconCheck, Monogram } from "../icons";

export function ConnectionsScreen() {
  const [tab, setTab] = useState<string>("All");
  const shown = connections.filter((c) => {
    if (tab === "All") return true;
    if (tab === "Connected 3") return c.connected;
    return c.category === tab;
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-screen="connections">
      <ScreenHeader title="Connections" action="Add custom" />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-4 scrollbar-none">
        <div className="mx-auto max-w-[880px]">
          <p className="text-[13px] leading-relaxed text-content-secondary">
            Connections let your agents read the other apps your work lives in —
            issues, docs, errors, deploys. Missing one?{" "}
            <span className="text-[#7c86f2]">Suggest a connection</span>.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1">
            {connectionCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={tab === c}
                onClick={() => setTab(c)}
                className={`h-7 rounded-md px-2.5 text-[12.5px] transition-colors ${
                  tab === c
                    ? "bg-surface-secondary text-content"
                    : "text-content-tertiary hover:bg-surface-hover hover:text-content-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
            {shown.map((c) => (
              <div
                key={c.name}
                className="rounded-lg border border-line bg-surface p-3 transition-colors hover:bg-surface-secondary"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ring-1 ring-inset ring-white/10"
                    style={{ backgroundColor: `${brandTint(c.logo)}1f` }}
                    aria-hidden="true"
                  >
                    {c.logoPng ? (
                      <Image
                        src={c.logoPng}
                        alt={c.name}
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain"
                      />
                    ) : (
                      <BrandMark name={c.logo} size={16} mono />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-content">
                    {c.name}
                  </span>
                  {c.connected ? (
                    <IconCheck size={14} className="flex-shrink-0 text-emerald-500" />
                  ) : null}
                </div>
                <p className="mt-2 line-clamp-2 min-h-[32px] text-[12px] leading-snug text-content-tertiary">
                  {c.blurb}
                </p>
                <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-content-dim">
                  {c.category}
                  <span>·</span>
                  {c.connected ? "Connected" : "Not connected"}
                  {c.connected ? (
                    <span className="ml-auto flex -space-x-1">
                      <Monogram initials="N" size={14} tint="#a98a5b" className="ring-2 ring-surface" />
                    </span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
