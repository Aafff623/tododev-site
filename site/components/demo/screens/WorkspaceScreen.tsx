"use client";

import Image from "next/image";
import { brand } from "@/lib/demo/brand";
import {
  agents,
  beats,
  chiefAvatar,
  tasks,
  topic,
} from "@/lib/demo/mock-data";
import type { BoardState, ChatMessage } from "@/lib/demo/mock-data";
import type { DemoAction, DemoState } from "@/lib/demo/state";
import {
  IconArrowUp,
  IconBranch,
  IconChevronDown,
  IconDots,
  IconExpand,
  IconFilter,
  IconGrid,
  IconImage,
  IconMenu,
  IconPanelRight,
  IconPaperclip,
  IconPlus,
  IconSliders,
  IconSpark,
} from "../icons";

/* ── 顶栏 ─────────────────────────────────────────────────────── */

function TopicButton() {
  return (
    <div className="relative flex min-w-0 flex-shrink items-center">
      <div
        className="flex max-w-full items-center gap-1.5 rounded-md px-1 py-0.5"
        aria-label={`Topic: ${topic.name}`}
      >
        <span className="text-[12px] leading-none">{topic.emoji}</span>
        <span className="min-w-0 truncate text-[13px] font-medium text-content">
          {topic.name}
        </span>
        <IconChevronDown size={11} className="flex-shrink-0 text-content-tertiary" />
        <span className="flex h-4 min-w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium leading-none text-white">
          {topic.badge}
        </span>
      </div>
    </div>
  );
}

function ChatHeader({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  return (
    <div className="flex h-11 flex-shrink-0 items-center gap-1.5 border-b border-line px-3">
      {state.mobileNavOpen ? null : (
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={() => dispatch({ type: "set-mobile-nav", open: true })}
          className="pointer-events-auto relative flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary hover:bg-surface-hover hover:text-content md:hidden"
        >
          <IconMenu size={15} />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
      )}
      <TopicButton />
      <span className="flex-1" />
      <span className="hidden items-center gap-0.5 sm:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5">
          <IconPlus />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5">
          <IconSliders />
        </span>
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5">
        <IconDots />
      </span>
      <button
        type="button"
        aria-label="Toggle kanban"
        aria-pressed={state.mobileBoard}
        onClick={() => dispatch({ type: "toggle-mobile-board" })}
        className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary hover:bg-surface-hover hover:text-content md:hidden"
      >
        <IconPanelRight size={15} />
      </button>
    </div>
  );
}

/* ── 聊天 ─────────────────────────────────────────────────────── */

function ChiefAvatar() {
  return (
    <Image
      src={chiefAvatar}
      alt="Chief"
      width={24}
      height={24}
      className="h-6 w-6 flex-shrink-0 rounded-full object-cover ring-1 ring-white/10"
    />
  );
}

function TaskRow({ id }: { id: string }) {
  const t = tasks[id];
  const a = agents[t.agent];
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5">
      <span className="w-8 flex-shrink-0 font-mono text-[11px] text-content-dim">
        #{t.num}
      </span>
      <span className="min-w-0 flex-1 truncate text-[12.5px] text-content-secondary">
        {t.title}
      </span>
      <span className="flex flex-shrink-0 items-center gap-1.5 rounded-md bg-surface-tertiary px-1.5 py-0.5">
        <Image
          src={a.avatar}
          alt={a.name}
          width={14}
          height={14}
          className="h-3.5 w-3.5 rounded-full object-cover"
        />
        <span className="text-[11px] text-content-tertiary">{a.name}</span>
      </span>
    </div>
  );
}

function Message({ msg }: { msg: ChatMessage }) {
  return (
    <div className="message-in flex flex-col gap-1">
      {msg.from === "user" ? (
        <div className="flex items-start gap-2.5">
          <Image
            src="/avatars/noa.jpg"
            alt="You"
            width={24}
            height={24}
            className="h-6 w-6 flex-shrink-0 rounded-full object-cover ring-1 ring-white/10"
          />
          <div className="max-w-[85%] rounded-lg bg-surface-secondary px-3 py-2.5">
            <p className="text-[13px] leading-snug text-content">{msg.text}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2.5">
          <ChiefAvatar />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[13px] leading-snug text-content-secondary">
              {msg.text}
            </p>
            {msg.taskRows ? (
              <div className="mt-1.5 divide-y divide-line overflow-hidden rounded-lg border border-line">
                {msg.taskRows.map((id) => (
                  <TaskRow key={id} id={id} />
                ))}
              </div>
            ) : null}
            {msg.note ? (
              <p className="mt-1 flex items-center gap-1 text-[11px] text-content-dim">
                <IconSpark size={10} />
                {msg.note}
              </p>
            ) : null}
          </div>
        </div>
      )}
      <p className="pr-2 text-right text-[10px] leading-none text-content-dim">
        {msg.time}
      </p>
    </div>
  );
}

function ChatPane({
  state,
  dispatch,
  showHeader = true,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
  showHeader?: boolean;
}) {
  const messages = beats
    .slice(0, state.storyBeat + 1)
    .flatMap((b, bi) => b.messages.map((m, mi) => ({ msg: m, id: `${bi}-${mi}` })));

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col md:w-[38cqw] md:flex-none">
      {showHeader ? <ChatHeader state={state} dispatch={dispatch} /> : null}
      <div className="mx-auto flex min-h-0 w-full max-w-[680px] flex-1 flex-col justify-end overflow-hidden px-4 pb-2 pt-3">
        <div className="flex flex-col gap-3.5">
          {messages.map(({ msg, id }) => (
            <Message key={id} msg={msg} />
          ))}
        </div>
      </div>
      {/* 输入槽（Tier B 装饰） */}
      <div className="mx-4 mb-2.5 rounded-xl border border-line bg-surface-inset px-3 pb-2 pt-2.5">
        <p className="text-[13px] text-content-dim">{brand.chatPlaceholder}</p>
        <div className="mt-3 flex items-center gap-2 text-content-tertiary">
          <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">
            <IconPaperclip />
          </span>
          <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">
            <IconImage />
          </span>
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-surface-tertiary">
            <IconArrowUp size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 看板 ─────────────────────────────────────────────────────── */

const columns = [
  { key: "backlog", label: "Backlog", dot: "#52525b", empty: "Nothing waiting to start" },
  { key: "progress", label: "In progress", dot: "#3b82f6", empty: "Nothing in progress" },
  { key: "needs", label: "Needs you", dot: "#f59e0b", empty: "Nothing waiting on you" },
  { key: "done", label: "Done", dot: "#22c55e", empty: "Nothing finished yet" },
] as const;

function CardTime({ col }: { col: string }) {
  if (col === "needs") return <span className="text-amber-400/90">Awaiting review</span>;
  if (col === "progress") return <span>Started 09:41</span>;
  return <span>1 minute ago</span>;
}

function BoardPane({ board }: { board: BoardState }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col border-l border-line">
      <div className="flex h-11 flex-shrink-0 items-center gap-1.5 border-b border-line px-3">
        <span className="text-[13px] font-medium text-content">Kanban</span>
        <span className="text-content-tertiary [&>svg]:h-3 [&>svg]:w-3">
          <IconGrid />
        </span>
        <span className="flex-1" />
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5">
          <IconFilter />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-content-tertiary [&>svg]:h-3.5 [&>svg]:w-3.5">
          <IconExpand />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 gap-2.5 overflow-x-auto p-2.5 scrollbar-none">
        {columns.map((col) => {
          const ids = board[col.key];
          return (
              <div
                key={col.key}
                className="group/col flex h-full w-[236px] flex-shrink-0 flex-col rounded-lg bg-surface-inset"
              >
              <div className="flex flex-shrink-0 items-center gap-1.5 px-3 pb-1 pt-2.5">
                <span
                  className="h-2 w-2 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: col.dot }}
                />
                <span className="text-[12.5px] font-medium text-content">
                  {col.label}
                </span>
                <span className="text-[11px] text-content-dim">{ids.length}</span>
                <span className="ml-auto text-content-tertiary opacity-0 transition-opacity group-hover/col:opacity-100 [&>svg]:h-3 [&>svg]:w-3">
                  <IconFilter />
                </span>
              </div>
              {ids.length === 0 ? (
                <div className="grid flex-1 place-items-center px-3">
                  <p className="text-center text-[12px] text-content-dim">
                    {col.empty}
                  </p>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto p-1.5 scrollbar-none">
                  {ids.map((id) => {
                    const t = tasks[id];
                    const a = agents[t.agent];
                    return (
                      <div
                        key={id}
                        className="rounded-md border border-line bg-surface-secondary p-2"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 flex-shrink-0 rounded-[3px] bg-[#5f7fb8]"
                            aria-hidden="true"
                          />
                          <span className="text-[11px] text-content-tertiary">
                            {t.project}
                          </span>
                          <span className="font-mono text-[10.5px] text-content-dim">
                            #{t.num}
                          </span>
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded text-content-tertiary [&>svg]:h-3 [&>svg]:w-3">
                            <IconBranch />
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-content">
                          {t.title}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <Image
                            src={a.avatar}
                            alt={a.name}
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 rounded-full object-cover"
                          />
                          <span className="text-[11px] text-content-dim">
                            <CardTime col={col.key} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 屏幕根 ───────────────────────────────────────────────────── */

export function WorkspaceScreen({
  state,
  dispatch,
}: {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
}) {
  const board = beats[state.storyBeat].board;
  return (
    <div
      className="flex min-h-0 flex-1 flex-col [container-type:inline-size]"
      data-screen="workspace"
    >
      {/* 移动端：单顶栏 + chat/board 互斥 */}
      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        <ChatHeader state={state} dispatch={dispatch} />
        {state.mobileBoard ? (
          <BoardPane board={board} />
        ) : (
          <ChatPane state={state} dispatch={dispatch} showHeader={false} />
        )}
      </div>
      {/* 桌面：双栏 */}
      <div className="hidden min-h-0 flex-1 md:flex">
        <ChatPane state={state} dispatch={dispatch} />
        <BoardPane board={board} />
      </div>
    </div>
  );
}
