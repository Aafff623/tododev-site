"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { beats, navItems } from "@/lib/demo/mock-data";
import {
  demoReducer,
  initialDemoState,
  type DemoScreen,
  type DemoState,
} from "@/lib/demo/state";
import { CommandPalette } from "./CommandPalette";
import { DemoSidebar, MobileSidebar } from "./DemoSidebar";
import { ResizeHandle } from "./ResizeHandle";
import { WorkspaceScreen } from "./screens/WorkspaceScreen";
import { SchedulesScreen } from "./screens/SchedulesScreen";
import { ConnectionsScreen } from "./screens/ConnectionsScreen";
import { SkillsScreen } from "./screens/SkillsScreen";
import { IconReplay } from "./icons";

const IDLE_PAUSE = 12000; // 用户停手后多久温柔恢复剧本
const IDLE_REPLAY = 15000; // 剧本结束后多久重播（轻量自动导览）

export function ProductDemo() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const frameRef = useRef<HTMLDivElement>(null);
  // 默认 true：引擎的基本运转不依赖 IO（IO 缺失/被节流时照常播放，
  // 真实浏览器里 IO 会在滚出视口后暂停引擎）
  const [inView, setInView] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(0);
  const [spotlight, setSpotlight] = useState(false);

  /* deep-link：?demo=skills&view=palette&story=0（research/08-1） */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const patch: Partial<DemoState> = {};
    const d = params.get("demo");
    if (d && navItems.some((n) => n.screen === d)) {
      patch.screen = d as DemoScreen;
    }
    if (params.get("view") === "palette") {
      patch.paletteOpen = true;
      patch.autoplay = false;
    }
    if (params.get("story") === "0") {
      patch.autoplay = false;
    }
    if (Object.keys(patch).length > 0) {
      dispatch({ type: "hydrate", patch });
    }
    // spotlight 初始化走异步回调，避免渲染期级联 setState
    const t = window.setTimeout(() => {
      let unseen = true;
      try {
        unseen = sessionStorage.getItem("relay-hint") !== "1";
      } catch {
        unseen = true;
      }
      if (unseen) setSpotlight(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  /* demo 是否在视口内（剧本引擎只在可见时运转） */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* 剧本引擎：推进 / 停手恢复 / 结束重播（research/08-4、6） */
  useEffect(() => {
    if (!inView) return;
    const idle = Date.now() - lastInteraction;

    if (state.autoplay) {
      if (state.storyBeat < beats.length - 1) {
        const t = window.setTimeout(
          () => dispatch({ type: "story-advance" }),
          state.storyBeat === 0 ? 1800 : 2900,
        );
        return () => window.clearTimeout(t);
      }
      const wait = Math.max(800, IDLE_REPLAY - idle);
      const t = window.setTimeout(() => {
        if (Date.now() - lastInteraction > IDLE_REPLAY - 500) {
          dispatch({ type: "replay" });
        }
      }, wait);
      return () => window.clearTimeout(t);
    }

    // 被用户操作打断：停手 IDLE_PAUSE 后在 workspace 温柔恢复
    if (state.screen === "workspace") {
      const wait = Math.max(800, IDLE_PAUSE - idle);
      const t = window.setTimeout(() => {
        if (Date.now() - lastInteraction > IDLE_PAUSE - 500) {
          dispatch({ type: "set-autoplay", value: true });
        }
      }, wait);
      return () => window.clearTimeout(t);
    }
  }, [state.autoplay, state.storyBeat, state.screen, inView, lastInteraction]);

  /* 页面级键盘（design-system/interaction-rules.md） */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      const k = e.key.toLowerCase();
      if (mod && k === "k") {
        e.preventDefault();
        dispatch({ type: state.paletteOpen ? "close-palette" : "open-palette" });
        return;
      }
      if (mod && k === "b") {
        e.preventDefault();
        dispatch({ type: "toggle-sidebar" });
        return;
      }
      if (e.key === "Escape") {
        if (state.paletteOpen) dispatch({ type: "close-palette" });
        else if (state.mobileNavOpen) {
          dispatch({ type: "set-mobile-nav", open: false });
        }
        return;
      }
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (!typing && !mod && k === "n" && !state.paletteOpen) {
        e.preventDefault();
        dispatch({ type: "open-palette" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.paletteOpen, state.mobileNavOpen]);

  /* scroll-sync 章节导航（research/08-3） */
  useEffect(() => {
    const onNav = (e: Event) => {
      const screen = (e as CustomEvent<{ screen: DemoScreen }>).detail?.screen;
      if (screen && navItems.some((n) => n.screen === screen)) {
        dispatch({ type: "navigate", screen, silent: true });
      }
    };
    window.addEventListener("relay:demo-nav", onNav);
    return () => window.removeEventListener("relay:demo-nav", onNav);
  }, []);

  const markInteraction = () => {
    setLastInteraction(Date.now());
    if (state.autoplay) dispatch({ type: "set-autoplay", value: false });
    if (spotlight) {
      setSpotlight(false);
      try {
        sessionStorage.setItem("relay-hint", "1");
      } catch {
        /* 本地存储不可用就忽略 */
      }
    }
  };

  const replay = () => {
    dispatch({ type: "replay" });
    setLastInteraction(Date.now());
  };

  return (
    <div>
      <div
        ref={frameRef}
        className={`overflow-clip rounded-xl border border-white/10 bg-surface shadow-[0_24px_50px_-12px_rgba(0,0,0,0.14)] ${
          spotlight ? "hint-ping" : ""
        }`}
      >
        <div
          className="relative flex h-[520px] sm:h-[620px]"
          onPointerDownCapture={markInteraction}
          onKeyDownCapture={markInteraction}
        >
          <DemoSidebar state={state} dispatch={dispatch} />
          {state.sidebarExpanded ? (
            <ResizeHandle
              width={state.sidebarWidth}
              onResize={(width) => dispatch({ type: "set-sidebar-width", width })}
            />
          ) : null}
          <div className="flex min-w-0 flex-1 flex-col">
            {state.screen === "workspace" ? (
              <WorkspaceScreen state={state} dispatch={dispatch} />
            ) : state.screen === "schedules" ? (
              <SchedulesScreen />
            ) : state.screen === "connections" ? (
              <ConnectionsScreen />
            ) : (
              <SkillsScreen />
            )}
          </div>
          <MobileSidebar state={state} dispatch={dispatch} />
          <CommandPalette state={state} dispatch={dispatch} />
        </div>
      </div>

      {/* frame 下方：live 提示 + Replay（research/08-2、5） */}
      <div className="mt-2.5 flex items-center justify-between gap-3 px-1">
        <p className="flex min-w-0 items-center gap-2 text-[12px] text-content-dim">
          {spotlight ? (
            <span className="hint-ping inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
          ) : null}
          <span className="truncate">
            Live demo — every highlighted control really works.
          </span>
        </p>
        <button
          type="button"
          onClick={replay}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] text-content-tertiary transition-colors hover:bg-surface-hover hover:text-content"
        >
          <IconReplay size={12} />
          Replay demo
        </button>
      </div>
    </div>
  );
}
