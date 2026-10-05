"use client";

import { useEffect, useState } from "react";
import type { DemoScreen } from "@/lib/demo/state";
import { ProductDemo } from "@/components/demo/ProductDemo";

type Chapter = {
  screen: DemoScreen;
  eyebrow: string;
  title: string;
  text: string;
};

/** 章节文案（原创；滚动到此章节时 demo 自动切屏，research/08-3） */
const chapters: Chapter[] = [
  {
    screen: "workspace",
    eyebrow: "01 · Delegate",
    title: "Hand a goal to your chief agent",
    text: "Describe the outcome. The chief splits it into todos, assigns the right agent to each, and runs them in parallel — progress lands card by card.",
  },
  {
    screen: "schedules",
    eyebrow: "02 · Automate",
    title: "Work that repeats itself",
    text: "Schedules run any task on a cadence — digests, checks, publishing — and leave a trail of what ran, when, and what it found.",
  },
  {
    screen: "connections",
    eyebrow: "03 · Connect",
    title: "Your stack, readable by agents",
    text: "Connect the tools your work already lives in. Agents read issues, docs, errors and deploys with the context they need.",
  },
  {
    screen: "skills",
    eyebrow: "04 · Reuse",
    title: "Know-how that compounds",
    text: "Package your conventions into skills. Every agent, on every run, works the way your team already does.",
  },
];

export function DemoStorySection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number(entry.target.getAttribute("data-chapter"));
          setActive(i);
          window.dispatchEvent(
            new CustomEvent("relay:demo-nav", {
              detail: { screen: chapters[i].screen },
            }),
          );
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="demo" className="relative mt-12 lg:mt-16 lg:h-[440vh]">
      {/* 桌面：demo 粘性驻留，章节从旁边滚过 */}
      <div className="px-4 sm:px-6 lg:sticky lg:top-14 lg:flex lg:h-[calc(100dvh-3.5rem)] lg:flex-col lg:items-center lg:overflow-clip lg:pt-4">
        <div className="mx-auto w-full max-w-[1232px]">
          <ProductDemo />
        </div>
        <div
          aria-hidden="true"
          className="relative mt-5 hidden h-[118px] w-full max-w-[820px] lg:block"
        >
          {chapters.map((c, i) => (
            <div
              key={c.screen}
              className={`absolute inset-0 flex flex-col items-center text-center transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#7c86f2]">
                {c.eyebrow}
              </p>
              <h3 className="mt-1.5 text-[17px] font-semibold text-content">
                {c.title}
              </h3>
              <p className="mt-1.5 max-w-[560px] text-[13px] leading-relaxed text-content-tertiary">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 滚动哨兵（仅桌面） */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {chapters.map((c, i) => (
          <div key={c.screen} data-chapter={i} className="h-1/4" />
        ))}
      </div>
    </section>
  );
}

/** 移动端：demo 下方平铺四章（无粘性联动） */
export function DemoChaptersStatic() {
  return (
    <div id="features" className="mx-auto max-w-2xl px-6 lg:hidden">
      {chapters.map((c) => (
        <div key={c.screen} className="border-t border-line py-9 first:border-t-0">
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#7c86f2]">
            {c.eyebrow}
          </p>
          <h3 className="mt-2 text-[17px] font-semibold text-content">
            {c.title}
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-content-tertiary">
            {c.text}
          </p>
        </div>
      ))}
    </div>
  );
}
