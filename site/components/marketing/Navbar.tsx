import { brand } from "@/lib/demo/brand";

const links = ["Features", "Docs", "Pricing"];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navbg backdrop-blur">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <a
          href="#top"
          className="select-none font-mono text-sm font-medium text-content transition-opacity hover:opacity-70"
        >
          {brand.logo}
        </a>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={l === "Features" ? "#features" : "#"}
              className="text-sm text-content-tertiary transition-colors hover:text-content"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-sm text-content-tertiary transition-colors hover:text-content sm:block"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
