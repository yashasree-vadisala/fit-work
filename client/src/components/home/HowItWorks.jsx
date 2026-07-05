import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Upload your resume",
    description: "PDF, DOCX, or TXT. Nothing is stored after your session ends.",
  },
  {
    n: "02",
    title: "Paste the job description",
    description: "The more complete it is, the more precise the gap analysis will be.",
  },
  {
    n: "03",
    title: "Act on the results",
    description: "Read your score, apply the corrections, or download the tailored rewrite.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-ink-100 bg-ink-50/60 py-16 dark:border-ink-700 dark:bg-ink-800/40">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-paper sm:text-3xl">
          How it works
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-2"
            >
              <span className="font-mono text-4xl font-semibold text-ink-200 dark:text-ink-600">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink-900 dark:text-paper">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm text-ink-500 dark:text-ink-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
