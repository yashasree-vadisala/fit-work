import { ScanLine, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 py-10 dark:border-ink-700">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">

        {/* Left */}
        <div className="flex items-center gap-2 text-ink-400">
          <ScanLine size={14} />
          <span className="font-body">
            Fitwork — resume-to-role matching
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="hidden font-body text-ink-400 md:block">
            Help us improve Fitwork.
          </span>

          <a
            href="https://tally.so/r/D49W5b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 font-body font-medium text-ink-500 transition-all duration-200 hover:border-[#D4A13B] hover:bg-[#D4A13B]/10 hover:text-[#D4A13B] dark:border-ink-700 dark:text-ink-300"
          >
            <MessageSquare size={16} />
            Share Feedback
          </a>
        </div>

      </div>
    </footer>
  );
}