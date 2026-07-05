import { useState } from "react";
import { AlertCircle, FileOutput } from "lucide-react";
import PageShell from "../components/layout/PageShell.jsx";
import FileDropzone from "../components/shared/FileDropzone.jsx";
import Button from "../components/shared/Button.jsx";
import Loader from "../components/shared/Loader.jsx";
import GeneratedResumePreview from "../components/results/GeneratedResumePreview.jsx";
import { generateAtsResume, downloadGeneratedResume } from "../api/client.js";

export default function Generate() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(null);

  const canSubmit = file && jobDescription.trim().length >= 30 && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setGenerated(null);
    try {
      const result = await generateAtsResume(file, jobDescription);
      setGenerated(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    setDownloading(true);
    setError("");
    try {
      await downloadGeneratedResume(generated);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <PageShell>
      <header className="mb-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-3 py-1 font-mono text-xs font-medium text-coral-dark dark:text-coral-light">
          <FileOutput size={12} /> ATS generator
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900 dark:text-paper sm:text-4xl">
          Get a tailored, ATS-ready rewrite in one pass
        </h1>
        <p className="mt-3 font-body text-ink-500 dark:text-ink-300">
          Your real experience, employers, and dates stay intact — the wording
          and emphasis get tailored to the job description, then formatted
          for clean ATS parsing.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 rounded-2xl border border-ink-100 bg-white/60 p-8 shadow-panel dark:border-ink-700 dark:bg-ink-800/60 dark:shadow-panel-dark md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block font-body text-sm font-medium text-ink-700 dark:text-ink-200">
            Your current resume
          </label>
          <FileDropzone file={file} onFileSelected={setFile} />
        </div>

        <div>
          <label
            htmlFor="jd-gen"
            className="mb-2 block font-body text-sm font-medium text-ink-700 dark:text-ink-200"
          >
            Target job description
          </label>
          <textarea
            id="jd-gen"
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
          <Button type="submit" disabled={!canSubmit} loading={loading} icon={FileOutput}>
            Generate tailored resume
          </Button>
        </div>
      </form>

      <div className="mt-10">
        {loading && <Loader label="Rewriting your resume around this role…" />}
        {!loading && generated && (
          <GeneratedResumePreview
            generated={generated}
            onDownload={handleDownload}
            downloading={downloading}
          />
        )}
      </div>
    </PageShell>
  );
}
