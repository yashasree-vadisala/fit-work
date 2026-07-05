import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, LayoutGrid, Lightbulb } from "lucide-react";
import SuggestionList from "./SuggestionList.jsx";

export default function CorrectionResults({ correction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-100 bg-white/60 p-6 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
            Writing quality
          </p>
          <p className="font-display text-3xl font-semibold text-ink-900 dark:text-paper">
            {correction.overallQualityScore}
            <span className="text-base text-ink-400"> / 100</span>
          </p>
        </div>
        <div className="rounded-full bg-coral/10 px-4 py-2 font-mono text-sm font-medium text-coral-dark dark:text-coral-light">
          {correction.issuesFound} issue{correction.issuesFound === 1 ? "" : "s"} found
        </div>
      </div>

      {correction.corrections?.length > 0 && (
        <div>
          <h2 className="mb-5 font-display text-lg font-semibold text-ink-900 dark:text-paper">
            Line-by-line corrections
          </h2>
          <div className="space-y-4">
            {correction.corrections.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-ink-100 bg-white/60 p-6 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark"
              >
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-ink-400">
                  {c.section}
                </p>
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
                  <p className="rounded-lg bg-coral/5 p-3 font-body text-sm text-ink-600 line-through decoration-coral/50 dark:text-ink-300">
                    {c.original}
                  </p>
                  <ArrowRight
                    size={18}
                    className="mx-auto mt-2 hidden shrink-0 text-ink-300 md:block"
                  />
                  <p className="rounded-lg bg-teal/5 p-3 font-body text-sm font-medium text-ink-900 dark:text-paper">
                    {c.improved}
                  </p>
                </div>
                {c.reason && (
                  <p className="mt-3 font-body text-xs italic text-ink-400">{c.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <SuggestionList
          title="Grammar issues"
          items={correction.grammarIssues}
          icon={AlertCircle}
          tone="text-coral"
        />
        <SuggestionList
          title="Formatting / ATS issues"
          items={correction.formattingIssues}
          icon={LayoutGrid}
          tone="text-gold-dark dark:text-gold"
        />
        <SuggestionList
          title="General tips"
          items={correction.generalTips}
          icon={Lightbulb}
          tone="text-teal"
        />
      </div>
    </motion.div>
  );
}
