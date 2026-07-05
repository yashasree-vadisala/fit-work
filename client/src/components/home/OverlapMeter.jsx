import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_SCORE = 87;

export default function OverlapMeter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf;
    const duration = 1800;
    const start = performance.now() + 900; // wait for the shapes to slide in first

    function tick(now) {
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      setCount(Math.round(progress * TARGET_SCORE));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 420 340" className="h-auto w-full max-w-md" aria-hidden="true">
        <defs>
          <clipPath id="docA-clip">
            <rect x="60" y="40" width="180" height="240" rx="10" />
          </clipPath>
          <clipPath id="docB-clip">
            <rect x="180" y="40" width="180" height="240" rx="10" />
          </clipPath>
        </defs>

        {/* Resume document (outline, slides in from left) */}
        <motion.g
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <rect
            x="60"
            y="40"
            width="180"
            height="240"
            rx="10"
            className="fill-white stroke-ink-900 dark:fill-ink-800 dark:stroke-gold"
            strokeWidth="2.5"
          />
          {[64, 90, 116, 142, 168, 194, 220, 246].map((y, i) => (
            <rect
              key={y}
              x="78"
              y={y}
              width={i % 3 === 0 ? 90 : 130}
              height="7"
              rx="3.5"
              className="fill-ink-200 dark:fill-ink-600"
            />
          ))}
        </motion.g>

        {/* Job description document (gold outline, slides in from right) */}
        <motion.g
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <rect
            x="180"
            y="40"
            width="180"
            height="240"
            rx="10"
            className="fill-none stroke-gold"
            strokeWidth="2.5"
            strokeDasharray="6 5"
          />
          {[64, 90, 116, 142, 168, 194, 220, 246].map((y, i) => (
            <rect
              key={y}
              x={i % 2 === 0 ? 198 : 198}
              y={y}
              width={i % 4 === 0 ? 80 : 120}
              height="7"
              rx="3.5"
              className="fill-gold/30"
            />
          ))}
        </motion.g>

        {/* Intersection highlight */}
        <motion.rect
          x="180"
          y="40"
          width="60"
          height="240"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="fill-teal"
          clipPath="url(#docA-clip)"
        />
      </svg>

      {/* Score readout */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-xl border border-ink-100 bg-white/90 px-5 py-3 text-center shadow-panel backdrop-blur dark:border-ink-700 dark:bg-ink-800/90 dark:shadow-panel-dark">
        <p className="font-mono text-3xl font-semibold text-teal">{count}%</p>
        <p className="font-body text-[11px] uppercase tracking-wider text-ink-400">Match score</p>
      </div>
    </div>
  );
}
