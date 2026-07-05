import { motion } from "framer-motion";

export default function Loader({ label = "Analyzing…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16">
      <div className="relative h-28 w-20 overflow-hidden rounded-md border-2 border-ink-900 dark:border-gold">
        {/* Document lines */}
        <div className="flex h-full w-full flex-col justify-center gap-2 px-3">
          {[70, 90, 55, 80, 40].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-ink-200 dark:bg-ink-600"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        {/* Scanning beam */}
        <motion.div
          className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-gold/70 to-transparent"
          animate={{ y: ["-100%", "220%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="font-mono text-sm text-ink-500 dark:text-ink-300">{label}</p>
    </div>
  );
}
