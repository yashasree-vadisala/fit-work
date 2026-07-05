import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import Button from "../shared/Button.jsx";
import Badge from "../shared/Badge.jsx";

export default function GeneratedResumePreview({ generated, onDownload, downloading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]"
    >
      {/* Resume preview, styled like a real document page */}
      <div className="thin-scrollbar max-h-[900px] overflow-y-auto rounded-2xl border border-ink-100 bg-white p-10 shadow-panel dark:border-ink-700 dark:bg-ink-50 dark:shadow-panel-dark">
        <div className="text-ink-900">
          <h1 className="font-display text-2xl font-bold">{generated.fullName}</h1>
          {generated.title && (
            <p className="mt-1 font-body italic text-ink-500">{generated.title}</p>
          )}
          {generated.contact && (
            <p className="mt-1 font-mono text-xs text-ink-400">{generated.contact}</p>
          )}

          {generated.summary && (
            <Section title="Professional Summary">
              <p className="font-body text-sm leading-relaxed text-ink-700">{generated.summary}</p>
            </Section>
          )}

          {generated.skills?.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-1.5">
                {generated.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-ink-100 px-2.5 py-1 font-mono text-xs text-ink-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {generated.experience?.length > 0 && (
            <Section title="Experience">
              <div className="space-y-5">
                {generated.experience.map((job, i) => (
                  <div key={i}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <p className="font-body text-sm font-semibold text-ink-900">
                        {job.role} {job.company && <span className="font-normal">— {job.company}</span>}
                      </p>
                      <p className="font-mono text-xs text-ink-400">{job.dates}</p>
                    </div>
                    <ul className="mt-1.5 list-disc space-y-1 pl-5">
                      {job.bullets?.map((b, j) => (
                        <li key={j} className="font-body text-sm text-ink-700">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {generated.projects?.length > 0 && (
            <Section title="Projects">
              <div className="space-y-3">
                {generated.projects.map((p, i) => (
                  <div key={i}>
                    <p className="font-body text-sm font-semibold text-ink-900">{p.name}</p>
                    <p className="font-body text-sm text-ink-700">{p.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {generated.education?.length > 0 && (
            <Section title="Education">
              <div className="space-y-2">
                {generated.education.map((e, i) => (
                  <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-body text-sm font-semibold text-ink-900">
                      {e.degree} {e.institution && <span className="font-normal">— {e.institution}</span>}
                    </p>
                    <p className="font-mono text-xs text-ink-400">{e.dates}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      {/* Sidebar: download + change log */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-ink-100 bg-white/60 p-6 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark">
          <h3 className="font-display text-base font-semibold text-ink-900 dark:text-paper">
            Ready to send
          </h3>
          <p className="mt-1 font-body text-sm text-ink-500 dark:text-ink-300">
            Download as a clean, single-column .docx built for ATS parsing.
          </p>
          <Button
            icon={Download}
            onClick={onDownload}
            loading={downloading}
            className="mt-4 w-full"
          >
            Download .docx
          </Button>
        </div>

        {generated.keywordsIncorporated?.length > 0 && (
          <div className="rounded-2xl border border-ink-100 bg-white/60 p-6 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark">
            <div className="mb-3 flex items-center gap-2 text-gold-dark dark:text-gold">
              <Sparkles size={16} />
              <h3 className="font-body text-sm font-semibold">Keywords woven in</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {generated.keywordsIncorporated.map((k) => (
                <Badge key={k} tone="gold">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {generated.changeLog?.length > 0 && (
          <div className="rounded-2xl border border-ink-100 bg-white/60 p-6 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark">
            <h3 className="mb-3 font-body text-sm font-semibold text-ink-900 dark:text-paper">
              What changed
            </h3>
            <ul className="space-y-2">
              {generated.changeLog.map((c, i) => (
                <li key={i} className="font-body text-sm text-ink-500 dark:text-ink-300">
                  • {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6 border-t border-ink-100 pt-4 first:mt-4 first:border-t-0 first:pt-0">
      <h2 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink-400">
        {title}
      </h2>
      {children}
    </div>
  );
}
