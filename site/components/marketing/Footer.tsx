import { brand } from "@/lib/demo/brand";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-medium text-content">
            {brand.logo}
          </p>
          <p className="mt-1 text-[12px] text-content-dim">{brand.footerNote}</p>
        </div>
        <div className="flex items-center gap-5 text-[12.5px] text-content-tertiary">
          <a href="#features" className="transition-colors hover:text-content">
            Features
          </a>
          <a href="#" className="transition-colors hover:text-content">
            Docs
          </a>
          <a href="#" className="transition-colors hover:text-content">
            Pricing
          </a>
          <span>© 2026 relay</span>
        </div>
      </div>
    </footer>
  );
}
