import { brand } from "@/lib/demo/brand";
import { worksWith } from "@/lib/demo/mock-data";

export function Hero() {
  return (
    <div id="top" className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24">
      <h1 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-tight text-content sm:text-[2.5rem] sm:leading-[1.02] md:text-[3rem] md:leading-[1] lg:text-[3.5rem] lg:leading-[1]">
        Run your whole agent team
        <br className="hidden sm:inline" /> from one place
      </h1>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-content-secondary sm:text-[17px]">
        {brand.name} connects your coding agents — hand them tasks, watch them
        work in parallel, and keep every run, schedule and connection in one
        quiet place.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Download for Windows
        </a>
        <a
          href="#demo"
          className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-content-secondary transition-colors hover:bg-surface-hover hover:text-content"
        >
          See it live ↓
        </a>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="text-sm text-content-dim">Works with</span>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {worksWith.map((w) => (
            <li key={w.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-[4px]"
                style={{ backgroundColor: w.tint }}
                aria-hidden="true"
              />
              <span className="whitespace-nowrap text-sm font-medium text-content-secondary">
                {w.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
