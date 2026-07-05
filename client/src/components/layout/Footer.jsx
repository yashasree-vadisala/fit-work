import { ScanLine } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 py-10 dark:border-ink-700">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-ink-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <ScanLine size={14} />
          <span className="font-body">Fitwork — resume-to-role matching</span>
        </div>
        <p className="font-body">
          Built with Gemini. Your documents are analyzed on request and never stored.
        </p>
      </div>
    </footer>
  );
}
