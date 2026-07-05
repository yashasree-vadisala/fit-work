import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, UploadCloud, X } from "lucide-react";

const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".txt"];

export default function FileDropzone({ file, onFileSelected }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validateAndSet = useCallback(
    (candidate) => {
      if (!candidate) return;
      const ext = candidate.name.slice(candidate.name.lastIndexOf(".")).toLowerCase();
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        setError("Please upload a PDF, DOCX, or TXT file.");
        return;
      }
      if (candidate.size > 8 * 1024 * 1024) {
        setError("File is too large (max 8MB).");
        return;
      }
      setError("");
      onFileSelected(candidate);
    },
    [onFileSelected]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.005 }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging
            ? "border-gold bg-gold/5"
            : "border-ink-200 hover:border-ink-400 dark:border-ink-600 dark:hover:border-ink-400"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />

        {file ? (
          <div className="flex items-center gap-3">
            <FileText size={22} className="text-teal" />
            <div className="text-left">
              <p className="font-body text-sm font-medium text-ink-900 dark:text-paper">
                {file.name}
              </p>
              <p className="font-mono text-xs text-ink-400">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileSelected(null);
              }}
              aria-label="Remove file"
              className="ml-2 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-coral dark:hover:bg-ink-700"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <UploadCloud size={26} className="text-ink-400" />
            <div>
              <p className="font-body text-sm font-medium text-ink-900 dark:text-paper">
                Drop your resume here, or click to browse
              </p>
              <p className="mt-1 font-mono text-xs text-ink-400">PDF, DOCX, or TXT · up to 8MB</p>
            </div>
          </>
        )}
      </motion.div>
      {error && <p className="mt-2 font-body text-sm text-coral">{error}</p>}
    </div>
  );
}
