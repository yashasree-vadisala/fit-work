import { useState } from "react";
import { AlertCircle, Target } from "lucide-react";
import PageShell from "../components/layout/PageShell.jsx";
import FileDropzone from "../components/shared/FileDropzone.jsx";
import Button from "../components/shared/Button.jsx";
import Loader from "../components/shared/Loader.jsx";
import AnalysisResults from "../components/results/AnalysisResults.jsx";
import { analyzeResume } from "../api/client.js";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const canSubmit = file && jobDescription.trim().length >= 30 && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const result = await analyzeResume(file, jobDescription);
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <header className="mb-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-xs font-medium text-teal-dark dark:text-teal-light">
          <Target size={12} /> Match score
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900 dark:text-paper sm:text-4xl">
          How well does your resume fit this role?
        </h1>
        <p className="mt-3 font-body text-ink-500 dark:text-ink-300">
          Upload your resume and paste the job description. You'll get a weighted
          score, a keyword gap report, and specific suggestions.
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
            htmlFor="jd"
            className="mb-2 block font-body text-sm font-medium text-ink-700 dark:text-ink-200"
          >
            Job description
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here…"
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
          <Button type="submit" disabled={!canSubmit} loading={loading} icon={Target}>
            Analyze match
          </Button>
        </div>
      </form>

      <div className="mt-10">
        {loading && <Loader label="Comparing resume against job description…" />}
        {!loading && analysis && <AnalysisResults analysis={analysis} />}
      </div>
    </PageShell>
  );
}
