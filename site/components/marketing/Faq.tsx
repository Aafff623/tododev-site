const faqs = [
  {
    q: "What is relay?",
    a: "A quiet workspace for you and your team of coding agents. You describe the outcome you want; your chief agent breaks it into todos, hands each one to the right agent, and keeps you in the loop while they work in parallel.",
  },
  {
    q: "Which agents can it run?",
    a: "The ones you already use — Claude Code, Codex, Gemini CLI, Cursor, OpenCode and more. relay assigns models and roles per task instead of locking you into one runtime.",
  },
  {
    q: "Is the demo on this page real?",
    a: "It is a faithful, clickable replica that runs entirely in your browser on mock data — the sidebar, screens, search and keyboard shortcuts all work, and nothing ever leaves your machine.",
  },
  {
    q: "Where does my code run?",
    a: "On your machine. relay orchestrates the agents and tools you already have installed; nothing is uploaded to run our side.",
  },
  {
    q: "How much does it cost?",
    a: "Free during the beta. The Pro plan — shared schedules, longer memory, team workspaces — will be announced later.",
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h2 className="text-[22px] font-semibold tracking-tight text-content sm:text-2xl">
        Questions, answered briefly
      </h2>
      <div className="mt-6">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[14px] font-medium text-content [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-content-tertiary transition-transform duration-200 group-open:rotate-45">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5v14" />
                </svg>
              </span>
            </summary>
            <p className="pb-4 pr-8 text-[13.5px] leading-relaxed text-content-tertiary">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
