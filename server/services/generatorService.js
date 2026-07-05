import { generateJson } from "./geminiClient.js";
import { buildGeneratorPrompt } from "../utils/promptTemplates.js";

/**
 * Generates a structured, ATS-optimized resume rewrite tailored to a JD.
 * @param {string} resumeText
 * @param {string} jobDescriptionText
 */
export async function generateAtsResume(resumeText, jobDescriptionText) {
  const prompt = buildGeneratorPrompt(resumeText, jobDescriptionText);
  const result = await generateJson(prompt);
  return normalizeGenerated(result);
}

function normalizeGenerated(raw) {
  return {
    fullName: raw.fullName || "Your Name",
    title: raw.title || "",
    contact: raw.contact || "",
    summary: raw.summary || "",
    skills: toArray(raw.skills),
    experience: toArray(raw.experience).map((e) => ({
      company: e.company || "",
      role: e.role || "",
      dates: e.dates || "",
      bullets: toArray(e.bullets),
    })),
    education: toArray(raw.education).map((e) => ({
      institution: e.institution || "",
      degree: e.degree || "",
      dates: e.dates || "",
    })),
    projects: toArray(raw.projects).map((p) => ({
      name: p.name || "",
      description: p.description || "",
    })),
    keywordsIncorporated: toArray(raw.keywordsIncorporated),
    changeLog: toArray(raw.changeLog),
  };
}

function toArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}
