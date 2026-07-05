import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../shared/Button.jsx";
import OverlapMeter from "./OverlapMeter.jsx";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grain-light opacity-40 dark:bg-grain-dark" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-xs font-medium text-gold-dark dark:text-gold-light">
            <Sparkles size={12} /> Powered by Gemini
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 dark:text-paper sm:text-5xl">
            See exactly where your resume{" "}
            <span className="text-teal">overlaps</span> the job — and where it doesn't.
          </h1>

          <p className="mt-5 max-w-lg font-body text-lg text-ink-500 dark:text-ink-300">
            Upload a resume and a job description. Get a precise match score, a
            keyword gap report, line-by-line corrections, and a fully rewritten
            ATS-ready resume — all in one pass.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button icon={ArrowRight} onClick={() => navigate("/analyze")}>
              Check my match score
            </Button>
            <Button variant="outline" onClick={() => navigate("/generate")}>
              Generate an ATS resume
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 font-mono text-xs text-ink-400">
            <span>NO SIGN-UP</span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span>FILES NOT STORED</span>
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span>PDF · DOCX · TXT</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <OverlapMeter />
        </motion.div>
      </div>
    </section>
  );
}
