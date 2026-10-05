import { ProductDemo } from "@/components/demo/ProductDemo";

/**
 * Demo 区：普通文档流（不钉住、不随滚动切屏）。
 * 实测用户反馈：sticky 滚动叙事会劫持正常下拉浏览，切屏只认点击——
 * 与 todos.dev 本尊一致。原 scroll-sync 实现已移除（见 research/08）。
 */
export function DemoStorySection() {
  return (
    <section id="demo" className="mt-12 sm:mt-16">
      <div className="mx-auto w-full max-w-[1232px] px-4 sm:px-6">
        <ProductDemo />
      </div>
    </section>
  );
}

type Chapter = {
  screen: string;
  eyebrow: string;
  title: string;
  text: string;
};

/** demo 下方的四章静态说明（所有断通吃） */
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

export function DemoChaptersStatic() {
  return (
    <div id="features" className="mx-auto max-w-2xl px-6 pt-4">
      {chapters.map((c) => (
        <div
          key={c.screen}
          className="border-t border-line py-9 first:border-t-0"
        >
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
