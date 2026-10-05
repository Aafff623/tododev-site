"use client";

import Image from "next/image";
import { brand } from "@/lib/demo/brand";
import { navItems } from "@/lib/demo/mock-data";
import type { DemoAction, DemoState } from "@/lib/demo/state";
import {
  IconChevronDown,
  IconGrid,
  IconKanban,
  IconPanelLeft,
  IconPlus,
  IconSearch,
  IconSpark,
  IconClock,
} from "./icons";

/* ── 通用小件 ─────────────────────────────────────────────────── */

function KbdHint({ keys, className }: { keys: string; className?: string }) {
  return (
    <span
      className={`text-[11px] leading-none text-content-dim ${className ?? ""}`}
    >
      {keys}
    </span>
  );
}

/** 折叠态图标行：h-9 轨道 + 24px 按钮 + 400ms 延迟 tooltip */
function RailButton({
  label,
  hotkey,
  onClick,
  active,
  children,
}: {
  label: string;
  hotkey?: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-9 flex-shrink-0 items-center justify-center">
      <button
        type="button"
        aria-label={hotkey ? `${label}, ${hotkey}` : label}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
        className={`group relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent ${
          active
            ? "bg-surface-secondary text-content"
            : "text-content-secondary hover:bg-surface-hover hover:text-content"
        }`}
      >
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/85 px-2 py-[3px] text-[11px] font-medium leading-4 text-white opacity-0 transition-opacity duration-300 group-hover:delay-[400ms] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          {hotkey ? `${label} ${hotkey}` : label}
        </span>
      </button>
    </div>
  );
}

function SectionChevron({
  label,
  open,
  onClick,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <RailButton label={`${open ? "Collapse" : "Expand"} ${label}`} onClick={onClick}>
      <span className={`transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}>
        <IconChevronDown size={16} />
      </span>
    </RailButton>
  );
}

/* ── 展开态导航列表（桌面 expanded + 移动抽屉共用）──────────────── */

function NavList({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  const row = (
    label: string,
    hotkey: string | undefined,
    icon: React.ReactNode,
    opts: { active?: boolean; onClick: () => void; ariaCurrent?: boolean } = {
      onClick: () => {},
    },
  ) => (
    <button
      key={label}
      type="button"
      aria-current={opts.active ? "page" : undefined}
      onClick={opts.onClick}
      className={`flex h-8 w-[calc(100%-1rem)] mx-2 flex-shrink-0 items-center gap-2.5 rounded-md px-2 text-left text-[13px] transition-colors ${
        opts.active
          ? "bg-surface-secondary text-content"
          : "text-content-secondary hover:bg-surface-hover hover:text-content"
      }`}
    >
      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {hotkey ? <KbdHint keys={hotkey} /> : null}
    </button>
  );

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto pt-2.5 pb-2 scrollbar-none">
      {row("Search", "Ctrl K", <IconSearch />, {
        onClick: () => dispatch({ type: "open-palette" }),
      })}
      {row("New task", "N", <IconPlus />, {
        onClick: () => dispatch({ type: "open-palette" }),
      })}
      <div className="mt-2" />
      {navItems.map(({ screen, label }) =>
        row(
          label,
          undefined,
          screen === "workspace" ? (
            <IconKanban />
          ) : screen === "schedules" ? (
            <IconClock />
          ) : screen === "connections" ? (
            <IconGrid />
          ) : (
            <IconSpark />
          ),
          {
            active: state.screen === screen,
            onClick: () => dispatch({ type: "navigate", screen }),
          },
        ),
      )}
      <div className="mt-3" />
      <button
        type="button"
        aria-expanded={state.projectsOpen}
        onClick={() => dispatch({ type: "toggle-projects" })}
        className="mx-2 flex h-8 flex-shrink-0 items-center gap-2.5 rounded-md px-2 text-left text-[13px] text-content-secondary transition-colors hover:bg-surface-hover hover:text-content"
      >
        <span
          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-200 ${
            state.projectsOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          <IconChevronDown className="h-4 w-4" />
        </span>
        Projects
      </button>
      {state.projectsOpen ? (
        <div className="mb-1">
          {["Nimbus", "Orchard", "Beacon"].map((p) => (
            <div
              key={p}
              className="mx-2 flex h-7 items-center gap-2 rounded-md pl-8 pr-2 text-[12.5px] text-content-tertiary"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-content-dim/70" />
              <span className="truncate">{p}</span>
            </div>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        aria-expanded={state.resourcesOpen}
        onClick={() => dispatch({ type: "toggle-resources" })}
        className="mx-2 flex h-8 flex-shrink-0 items-center gap-2.5 rounded-md px-2 text-left text-[13px] text-content-secondary transition-colors hover:bg-surface-hover hover:text-content"
      >
        <span
          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center transition-transform duration-200 ${
            state.resourcesOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          <IconChevronDown className="h-4 w-4" />
        </span>
        Resources
      </button>
      {state.resourcesOpen ? (
        <div className="mb-1">
          {["Docs", "Changelog"].map((r) => (
            <div
              key={r}
              className="mx-2 flex h-7 items-center gap-2 rounded-md pl-8 pr-2 text-[12.5px] text-content-tertiary"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-content-dim/70" />
              <span className="truncate">{r}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ── 桌面侧栏 ─────────────────────────────────────────────────── */

export function DemoSidebar({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  const width = state.sidebarExpanded ? state.sidebarWidth : 52;

  return (
    <aside
      className="hidden flex-shrink-0 border-r border-line transition-[width] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none md:flex md:flex-col"
      style={{ width }}
    >
      {/* header 44px */}
      <div className="flex h-11 w-full flex-shrink-0 items-center border-b border-line px-2.5">
        {state.sidebarExpanded ? (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              aria-label="Collapse sidebar, Ctrl B"
              onClick={() => dispatch({ type: "toggle-sidebar" })}
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-content-secondary transition-colors hover:bg-surface-hover hover:text-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
            >
              <IconPanelLeft />
            </button>
            <span className="min-w-0 truncate text-[12.5px] font-medium text-content">
              {brand.team}
            </span>
            <span className="flex-shrink-0 rounded bg-amber-400/10 px-1 py-px text-[9px] font-semibold leading-4 text-amber-400/90">
              {brand.plan}
            </span>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <button
              type="button"
              aria-label="Expand sidebar, Ctrl B"
              onClick={() => dispatch({ type: "toggle-sidebar" })}
              className="group relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-content-secondary transition-colors hover:bg-surface-hover hover:text-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
            >
              <IconPanelLeft />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/85 px-2 py-[3px] text-[11px] font-medium leading-4 text-white opacity-0 transition-opacity duration-300 group-hover:delay-[400ms] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
              >
                Expand sidebar Ctrl B
              </span>
            </button>
          </div>
        )}
      </div>

      {state.sidebarExpanded ? (
        <NavList state={state} dispatch={dispatch} />
      ) : (
        <div className="flex min-h-0 w-full flex-1 flex-col items-center pt-2.5">
          <RailButton
            label="Search"
            hotkey="Ctrl K"
            onClick={() => dispatch({ type: "open-palette" })}
          >
            <IconSearch />
          </RailButton>
          <RailButton
            label="New task"
            hotkey="N"
            onClick={() => dispatch({ type: "open-palette" })}
          >
            <IconPlus strokeWidth={2.5} />
          </RailButton>
          {navItems.map(({ screen, label }) => (
            <RailButton
              key={screen}
              label={label}
              active={state.screen === screen}
              onClick={() => dispatch({ type: "navigate", screen })}
            >
              {screen === "workspace" ? (
                <IconKanban />
              ) : screen === "schedules" ? (
                <IconClock />
              ) : screen === "connections" ? (
                <IconGrid />
              ) : (
                <IconSpark />
              )}
            </RailButton>
          ))}
          <SectionChevron
            label="Projects"
            open={state.projectsOpen}
            onClick={() => dispatch({ type: "toggle-projects" })}
          />
          <SectionChevron
            label="Resources"
            open={state.resourcesOpen}
            onClick={() => dispatch({ type: "toggle-resources" })}
          />
        </div>
      )}

      {/* footer 44px */}
      <div
        className={`flex h-11 w-full flex-shrink-0 items-center border-t border-line ${
          state.sidebarExpanded ? "px-2.5" : "justify-center"
        }`}
      >
        <Image
          src="/avatars/noa.jpg"
          alt={brand.user.name}
          width={24}
          height={24}
          className="h-6 w-6 flex-shrink-0 rounded-full object-cover ring-1 ring-white/10"
        />
        {state.sidebarExpanded ? (
          <>
            <span className="ml-2 min-w-0 flex-1 truncate text-[12.5px] text-content-secondary">
              {brand.user.name}
            </span>
            <span className="flex h-6 w-6 items-center justify-center text-content-tertiary">
              <IconChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </span>
          </>
        ) : null}
      </div>
    </aside>
  );
}

/* ── 移动端抽屉 ───────────────────────────────────────────────── */

export function MobileSidebar({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  return (
    <div
      className={`absolute inset-0 z-30 md:hidden ${
        state.mobileNavOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!state.mobileNavOpen}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 motion-reduce:transition-none ${
          state.mobileNavOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => dispatch({ type: "set-mobile-nav", open: false })}
      />
      <div
        className={`absolute inset-y-0 left-0 flex w-[248px] flex-col border-r border-line bg-surface-elevated transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${
          state.mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-11 flex-shrink-0 items-center gap-2 border-b border-line px-2.5">
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => dispatch({ type: "set-mobile-nav", open: false })}
            className="flex h-6 w-6 items-center justify-center rounded-md text-content-secondary hover:bg-surface-hover hover:text-content"
          >
            <IconPanelLeft />
          </button>
          <span className="min-w-0 truncate text-[12.5px] font-medium text-content">
            {brand.team}
          </span>
          <span className="rounded bg-amber-400/10 px-1 py-px text-[9px] font-semibold leading-4 text-amber-400/90">
            {brand.plan}
          </span>
        </div>
        <NavList state={state} dispatch={dispatch} />
        <div className="flex h-11 flex-shrink-0 items-center gap-2 border-t border-line px-2.5">
          <Image
            src="/avatars/noa.jpg"
            alt={brand.user.name}
            width={24}
            height={24}
            className="h-6 w-6 flex-shrink-0 rounded-full object-cover ring-1 ring-white/10"
          />
          <span className="text-[12.5px] text-content-secondary">
            {brand.user.name}
          </span>
        </div>
      </div>
    </div>
  );
}
