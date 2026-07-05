import { useState } from "react";
import { AlertCircle, SpellCheck } from "lucide-react";
import PageShell from "../components/layout/PageShell.jsx";
import FileDropzone from "../components/shared/FileDropzone.jsx";
import Button from "../components/shared/Button.jsx";
import Loader from "../components/shared/Loader.jsx";
import CorrectionResults from "../components/results/CorrectionResults.jsx";
import { correctResume } from "../api/client.js";

export default function Correct() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [correction, setCorrection] = useState(null);

  const canSubmit = file && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setCorrection(null);
    try {
      const result = await correctResume(file, jobDescription.trim() || undefined);
      setCorrection(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <header className="mb-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-xs font-medium text-gold-dark dark:text-gold-light">
          <SpellCheck size={12} /> Correction
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900 dark:text-paper sm:text-4xl">
          Fix the weak lines before a recruiter sees them
        </h1>
        <p className="mt-3 font-body text-ink-500 dark:text-ink-300">
          Get a before/after rewrite for every weak bullet, plus grammar and
          formatting flags. Adding a job description sharpens the suggestions,
          but it's optional here.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 rounded-2xl border border-ink-100 bg-white/60 p-8 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block font-body text-sm font-medium text-ink-700 dark:text-ink-200">
            Your resume
          </label>
          <FileDropzone file={file} onFileSelected={setFile} />
        </div>

        <div>
          <label
            htmlFor="jd-optional"
            className="mb-2 block font-body text-sm font-medium text-ink-700 dark:text-ink-200"
          >
            Job description <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <textarea
            id="jd-optional"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description to tailor the corrections…"
            rows={8}
            className="w-full resize-none rounded-xl border border-ink-200 bg-white p-4 font-body text-sm text-ink-900 outline-none placeholder:text-ink-300 focus:border-gold dark:border-ink-600 dark:bg-ink-800 dark:text-paper dark:placeholder:text-ink-500"
          />
        </div>

        <div className="md:col-span-2">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-coral/10 px-4 py-3 font-body text-sm text-coral-dark dark:text-coral-light">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <Button type="submit" disabled={!canSubmit} loading={loading} icon={SpellCheck}>
            Review my resume
          </Button>
        </div>
      </form>

      <div className="mt-10">
        {loading && <Loader label="Reading through your resume line by line…" />}
        {!loading && correction && <CorrectionResults correction={correction} />}
      </div>
    </PageShell>
  );
}
