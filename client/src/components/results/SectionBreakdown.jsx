import { motion } from "framer-motion";

const LABELS = {
  skillsMatch: "Skills match",
  experienceMatch: "Experience match",
  educationMatch: "Education match",
  keywordMatch: "Keyword match",
  atsFriendliness: "ATS friendliness",
};

function barColor(score) {
  if (score >= 75) return "bg-teal";
  if (score >= 50) return "bg-gold";
  return "bg-coral";
}

export default function SectionBreakdown({ categoryScores = {} }) {
  const entries = Object.entries(LABELS).filter(([key]) => key in categoryScores);

  return (
    <div className="space-y-4">
      {entries.map(([key, label], i) => {
        const value = categoryScores[key] ?? 0;
        return (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-body text-sm text-ink-600 dark:text-ink-300">{label}</span>
              <span className="font-mono text-sm font-medium text-ink-900 dark:text-paper">
                {value}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                className={`h-full rounded-full ${barColor(value)}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
