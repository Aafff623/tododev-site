export function FinalCta() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-[26px] font-semibold tracking-tight text-content sm:text-[32px]">
          Give your agents a quiet place to work
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-content-secondary">
          Install relay, connect the agents you already use, and hand them the
          next thing on your list.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Download for Windows
          </a>
        </div>
        <p className="mt-4 text-[12px] text-content-dim">
          Windows · macOS · Linux — free during beta
        </p>
      </div>
    </section>
  );
}
