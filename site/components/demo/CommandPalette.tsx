"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "@/lib/demo/brand";
import { paletteGoTo, tasks, topic } from "@/lib/demo/mock-data";
import type {
  DemoAction,
  DemoScreen,
  DemoState,
  PaletteTab,
} from "@/lib/demo/state";
import { iconMap, IconSearch, IconX } from "./icons";

const TABS: Array<{ id: PaletteTab; label: string; hotkey: string }> = [
  { id: "all", label: "All", hotkey: "Ctrl K" },
  { id: "tasks", label: "Tasks", hotkey: "Ctrl P" },
  { id: "topics", label: "Topics", hotkey: "Ctrl J" },
];

type Row =
  | { kind: "goto"; label: string; screen?: DemoScreen; icon: string }
  | { kind: "task"; num: string; title: string; project: string }
  | { kind: "topic"; label: string; emoji: string };

/**
 * 内层：keyed by open/tab —— 每次打开或切 tab 重新挂载，cursor 自然归零，
 * 不需要 effect 里写 setState。
 */
function PaletteInner({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    // 等过渡首帧后聚焦
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, []);

  const rows = useMemo<Row[]>(() => {
    const q = state.paletteQuery.trim().toLowerCase();
    const goto: Row[] = paletteGoTo
      .filter(
        (g) =>
          (state.paletteTab === "all" || state.paletteTab === "tasks") &&
          (!q || g.label.toLowerCase().includes(q)),
      )
      .map((g) => ({
        kind: "goto" as const,
        label: g.label,
        screen: g.screen,
        icon: g.icon,
      }));
    const taskRows: Row[] = Object.values(tasks)
      .filter(
        (t) =>
          (state.paletteTab === "all" || state.paletteTab === "tasks") &&
          (!q ||
            t.title.toLowerCase().includes(q) ||
            t.num.includes(q)),
      )
      .map((t) => ({
        kind: "task" as const,
        num: t.num,
        title: t.title,
        project: t.project,
      }));
    const topicRows: Row[] =
      state.paletteTab === "tasks"
        ? []
        : [
            { emoji: topic.emoji, name: topic.name },
            { emoji: "🌳", name: "Orchard redesign" },
            { emoji: "📘", name: "Beacon docs" },
          ]
            .filter((t) => !q || t.name.toLowerCase().includes(q))
            .map((t) => ({ kind: "topic" as const, label: t.name, emoji: t.emoji }));
    return [...goto, ...taskRows, ...topicRows];
  }, [state.paletteQuery, state.paletteTab]);

  // 渲染期 clamp：行数收缩时不产生多余渲染
  const active = Math.min(cursor, Math.max(0, rows.length - 1));

  const activate = (row: Row | undefined) => {
    if (!row) return;
    if (row.kind === "goto" && row.screen) {
      dispatch({ type: "navigate", screen: row.screen });
    }
    dispatch({ type: "close-palette" });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={brand.paletteTitle}
      className={`absolute inset-x-0 bottom-0 flex h-[540px] max-h-[88%] flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-surface-elevated shadow-2xl transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-[460px] sm:w-[560px] sm:max-w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:rounded-xl ${
        state.paletteOpen
          ? "translate-y-0 opacity-100 sm:translate-y-[-50%]"
          : "translate-y-full opacity-0 sm:translate-y-[calc(-50%+8px)]"
      }`}
    >
      {/* 移动端标题行 */}
      <div className="flex h-12 flex-shrink-0 items-center justify-between px-4 sm:hidden">
        <span className="text-[15px] font-semibold text-content">
          {brand.paletteTitle}
        </span>
        <button
          type="button"
          aria-label="Close search"
          onClick={() => dispatch({ type: "close-palette" })}
          className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary hover:bg-surface-hover hover:text-content"
        >
          <IconX size={16} />
        </button>
      </div>

      {/* 输入行 */}
      <div className="flex h-12 flex-shrink-0 items-center gap-2.5 border-b border-line px-4">
        <IconSearch size={15} className="flex-shrink-0 text-content-tertiary" />
        <input
          ref={inputRef}
          value={state.paletteQuery}
          onChange={(e) =>
            dispatch({ type: "set-palette-query", query: e.target.value })
          }
          placeholder={brand.palettePlaceholder}
          className="h-full min-w-0 flex-1 bg-transparent text-[13.5px] text-content outline-none placeholder:text-content-dim"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setCursor(Math.min(active + 1, rows.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setCursor(Math.max(active - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              activate(rows[active]);
            } else if (e.key === "Tab") {
              e.preventDefault();
              const i = TABS.findIndex((t) => t.id === state.paletteTab);
              const next = e.shiftKey
                ? TABS[(i + TABS.length - 1) % TABS.length]
                : TABS[(i + 1) % TABS.length];
              dispatch({ type: "set-palette-tab", tab: next.id });
            }
          }}
        />
        <kbd className="hidden flex-shrink-0 rounded border border-line px-1.5 py-0.5 text-[10px] text-content-dim sm:block">
          Esc
        </kbd>
      </div>

      {/* tabs */}
      <div className="flex h-11 flex-shrink-0 items-center gap-1 px-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={state.paletteTab === t.id}
            onClick={() => dispatch({ type: "set-palette-tab", tab: t.id })}
            className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] transition-colors ${
              state.paletteTab === t.id
                ? "bg-surface-tertiary text-content"
                : "text-content-tertiary hover:bg-surface-hover hover:text-content-secondary"
            }`}
          >
            {t.label}
            <span className="hidden text-[10px] text-content-dim sm:inline">
              {t.hotkey}
            </span>
          </button>
        ))}
        <span className="ml-auto hidden text-[11px] text-content-dim sm:block">
          Tab to switch
        </span>
      </div>

      {/* 结果列表 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {rows.length === 0 ? (
          <p className="px-3 py-10 text-center text-[12.5px] text-content-tertiary">
            Nothing matches “{state.paletteQuery}”.
          </p>
        ) : (
          <>
            {rows[0]?.kind === "goto" ? (
              <p className="px-3 pb-1 pt-2 text-[10.5px] font-semibold tracking-[0.08em] text-content-dim">
                GO TO
              </p>
            ) : null}
            {rows.map((row, i) => {
              const selected = i === active;
              return (
                <button
                  key={`${row.kind}-${i}`}
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => activate(row)}
                  className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-[13px] transition-colors ${
                    selected
                      ? "bg-surface-secondary text-content"
                      : "text-content-secondary"
                  }`}
                >
                  {row.kind === "goto" ? (
                    <>
                      {(() => {
                        const I = iconMap[row.icon as keyof typeof iconMap];
                        return (
                          <I
                            size={15}
                            className="flex-shrink-0 text-content-tertiary"
                          />
                        );
                      })()}
                      <span className="truncate">{row.label}</span>
                    </>
                  ) : row.kind === "task" ? (
                    <>
                      <span className="w-8 flex-shrink-0 font-mono text-[11px] text-content-dim">
                        #{row.num}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{row.title}</span>
                      <span className="flex-shrink-0 text-[11px] text-content-dim">
                        {row.project}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex-shrink-0 text-[13px]">
                        {row.emoji}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{row.label}</span>
                      <span className="flex-shrink-0 text-[11px] text-content-dim">
                        Topic
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export function CommandPalette({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  const open = state.paletteOpen;
  return (
    <div
      className={`absolute inset-0 z-40 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* scrim */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => dispatch({ type: "close-palette" })}
      />
      {/* key = open/tab：重新打开或切 tab 时重置光标 */}
      <PaletteInner
        key={`${open}-${state.paletteTab}`}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
}
