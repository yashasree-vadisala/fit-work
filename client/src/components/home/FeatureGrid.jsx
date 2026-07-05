import { motion } from "framer-motion";
import { Target, SpellCheck, FileOutput, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  {
    icon: Target,
    title: "Match scoring",
    description:
      "A weighted score across skills, experience, education, and keywords — plus exactly which JD terms your resume is missing.",
    to: "/analyze",
    tone: "text-teal",
  },
  {
    icon: SpellCheck,
    title: "Line-by-line correction",
    description:
      "Every weak bullet, vague phrase, or grammar slip gets a before/after rewrite with a reason attached.",
    to: "/correct",
    tone: "text-gold-dark dark:text-gold",
  },
  {
    icon: FileOutput,
    title: "ATS resume generator",
    description:
      "A tailored, ATS-safe rewrite of your resume built around the job description — download it as a clean .docx.",
    to: "/generate",
    tone: "text-coral",
  },
  {
    icon: Gauge,
    title: "ATS formatting check",
    description:
      "Flags parsing traps like tables, text boxes, and image-based headers that trip up applicant tracking systems.",
    to: "/analyze",
    tone: "text-ink-700 dark:text-paper",
  },
];

export default function FeatureGrid() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 max-w-xl">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-paper sm:text-3xl">
          One upload, four ways to get hired faster
        </h2>
        <p className="mt-3 font-body text-ink-500 dark:text-ink-300">
          Each tool works from the same two documents — your resume and the role
          you're targeting.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <motion.button
            key={f.title}
            onClick={() => navigate(f.to)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group flex flex-col items-start gap-4 rounded-xl border border-ink-100 bg-white/60 p-6 text-left shadow-panel transition-transform hover:-translate-y-1 dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark"
          >
            <span className={`rounded-lg bg-ink-50 p-2.5 dark:bg-ink-700 ${f.tone}`}>
              <f.icon size={20} />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-paper">
              {f.title}
            </h3>
            <p className="font-body text-sm text-ink-500 dark:text-ink-300">{f.description}</p>
            <span className="mt-auto font-mono text-xs font-medium text-ink-400 group-hover:text-gold-dark dark:group-hover:text-gold">
              Try it →
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
