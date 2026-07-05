const TONES = {
  teal: "bg-teal/10 text-teal-dark dark:text-teal-light border-teal/30",
  coral: "bg-coral/10 text-coral-dark dark:text-coral-light border-coral/30",
  gold: "bg-gold/10 text-gold-dark dark:text-gold-light border-gold/30",
  neutral: "bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-200 border-transparent",
};

export default function Badge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs font-medium ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
