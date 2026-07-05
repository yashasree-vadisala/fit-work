import { CheckCircle2, XCircle } from "lucide-react";
import Badge from "../shared/Badge.jsx";

export default function KeywordGaps({ matchedSkills = [], missingSkills = [] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <div className="mb-3 flex items-center gap-2 text-teal">
          <CheckCircle2 size={16} />
          <h3 className="font-body text-sm font-semibold">Present in your resume</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.length ? (
            matchedSkills.map((s) => (
              <Badge key={s} tone="teal">
                {s}
              </Badge>
            ))
          ) : (
            <p className="font-body text-sm text-ink-400">No strong overlaps found.</p>
          )}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2 text-coral">
          <XCircle size={16} />
          <h3 className="font-body text-sm font-semibold">Missing from your resume</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {missingSkills.length ? (
            missingSkills.map((s) => (
              <Badge key={s} tone="coral">
                {s}
              </Badge>
            ))
          ) : (
            <p className="font-body text-sm text-ink-400">No major gaps found. Nice work.</p>
          )}
        </div>
      </div>
    </div>
  );
}
