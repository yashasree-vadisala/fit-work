import { generateJson } from "./geminiClient.js";
import { buildAnalysisPrompt } from "../utils/promptTemplates.js";

/**
 * Analyzes how well a resume matches a job description.
 * @param {string} resumeText
 * @param {string} jobDescriptionText
 */
export async function analyzeResumeMatch(resumeText, jobDescriptionText) {
  const prompt = buildAnalysisPrompt(resumeText, jobDescriptionText);
  const result = await generateJson(prompt);
  return normalizeAnalysis(result);
}

// Guards the frontend against a malformed/partial AI response by filling
// in safe defaults for any missing fields.
function normalizeAnalysis(raw) {
  return {
    overallScore: clampScore(raw.overallScore),
    verdict: raw.verdict || "Analysis complete.",
    categoryScores: {
      skillsMatch: clampScore(raw.categoryScores?.skillsMatch),
      experienceMatch: clampScore(raw.categoryScores?.experienceMatch),
      educationMatch: clampScore(raw.categoryScores?.educationMatch),
      keywordMatch: clampScore(raw.categoryScores?.keywordMatch),
      atsFriendliness: clampScore(raw.categoryScores?.atsFriendliness),
    },
    matchedSkills: toArray(raw.matchedSkills),
    missingSkills: toArray(raw.missingSkills),
    strengths: toArray(raw.strengths),
    gaps: toArray(raw.gaps),
    suggestions: toArray(raw.suggestions),
    summary: raw.summary || "",
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
