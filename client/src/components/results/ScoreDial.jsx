import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function toneFor(score) {
  if (score >= 75) return { stroke: "#2A9D8F", label: "Strong match" };
  if (score >= 50) return { stroke: "#D9A441", label: "Partial match" };
  return { stroke: "#E15554", label: "Weak match" };
}

export default function ScoreDial({ score = 0, size = 180 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const { stroke, label } = toneFor(score);

  useEffect(() => {
    let raf;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayScore(Math.round(progress * score));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="14"
            className="stroke-ink-100 dark:stroke-ink-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth="14"
            strokeLinecap="round"
            stroke={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-semibold text-ink-900 dark:text-paper">
            {displayScore}
          </span>
          <span className="font-mono text-xs text-ink-400">/ 100</span>
        </div>
      </div>
      <p className="mt-3 font-body text-sm font-medium" style={{ color: stroke }}>
        {label}
      </p>
    </div>
  );
}
