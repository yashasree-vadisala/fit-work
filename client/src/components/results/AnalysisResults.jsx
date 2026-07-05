import { motion } from "framer-motion";
import { ThumbsUp, AlertTriangle, Lightbulb } from "lucide-react";
import ScoreDial from "./ScoreDial.jsx";
import SectionBreakdown from "./SectionBreakdown.jsx";
import KeywordGaps from "./KeywordGaps.jsx";
import SuggestionList from "./SuggestionList.jsx";

export default function AnalysisResults({ analysis }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 gap-8 rounded-2xl border border-ink-100 bg-white/60 p-8 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark md:grid-cols-[auto_1fr]">
        <ScoreDial score={analysis.overallScore} />
        <div className="flex flex-col justify-center">
          <p className="font-display text-xl font-semibold text-ink-900 dark:text-paper">
            {analysis.verdict}
          </p>
          <p className="mt-2 font-body text-sm text-ink-500 dark:text-ink-300">
            {analysis.summary}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white/60 p-8 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink-900 dark:text-paper">
          Score breakdown
        </h2>
        <SectionBreakdown categoryScores={analysis.categoryScores} />
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white/60 p-8 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink-900 dark:text-paper">
          Keyword coverage
        </h2>
        <KeywordGaps
          matchedSkills={analysis.matchedSkills}
          missingSkills={analysis.missingSkills}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <SuggestionList
          title="Strengths"
          items={analysis.strengths}
          icon={ThumbsUp}
          tone="text-teal"
        />
        <SuggestionList
          title="Gaps"
          items={analysis.gaps}
          icon={AlertTriangle}
          tone="text-coral"
        />
        <SuggestionList
          title="Suggestions"
          items={analysis.suggestions}
          icon={Lightbulb}
          tone="text-gold-dark dark:text-gold"
        />
      </div>
    </motion.div>
  );
}
