import { generateJson } from "./geminiClient.js";
import { buildCorrectionPrompt } from "../utils/promptTemplates.js";

/**
 * Produces line-level correction suggestions for a resume, optionally
 * tailored to a job description.
 * @param {string} resumeText
 * @param {string} [jobDescriptionText]
 */
export async function correctResume(resumeText, jobDescriptionText) {
  const prompt = buildCorrectionPrompt(resumeText, jobDescriptionText);
  const result = await generateJson(prompt);
  return normalizeCorrection(result);
}

function normalizeCorrection(raw) {
  const corrections = Array.isArray(raw.corrections) ? raw.corrections : [];
  return {
    overallQualityScore: clampScore(raw.overallQualityScore),
    issuesFound: Number(raw.issuesFound) || corrections.length,
    corrections: corrections.map((c) => ({
      section: c.section || "General",
      original: c.original || "",
      improved: c.improved || "",
      reason: c.reason || "",
    })),
    grammarIssues: toArray(raw.grammarIssues),
    formattingIssues: toArray(raw.formattingIssues),
    generalTips: toArray(raw.generalTips),
  };
}

function clampScore(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function toArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}
