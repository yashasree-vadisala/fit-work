// Every prompt here asks Gemini to reply with ONLY raw JSON (no markdown
// fences, no commentary) so the service layer can parse it directly.

export function buildAnalysisPrompt(resumeText, jobDescriptionText) {
  return `You are an expert technical recruiter and ATS (Applicant Tracking System) specialist.
Compare the RESUME against the JOB DESCRIPTION below and produce a rigorous match analysis.

Score fairly: do not inflate scores. A generic resume with no tailoring to this JD should score low.

Respond with ONLY a raw JSON object (no markdown fences, no extra text) matching this exact shape:

{
  "overallScore": number (0-100, weighted overall match),
  "verdict": string (one short sentence summarizing fit),
  "categoryScores": {
    "skillsMatch": number (0-100),
    "experienceMatch": number (0-100),
    "educationMatch": number (0-100),
    "keywordMatch": number (0-100),
    "atsFriendliness": number (0-100, based on resume formatting/structure quality)
  },
  "matchedSkills": string[] (skills/keywords present in both resume and JD),
  "missingSkills": string[] (important skills/keywords in the JD absent from the resume),
  "strengths": string[] (3-5 concrete strengths of this resume for this JD),
  "gaps": string[] (3-5 concrete gaps or weaknesses relative to this JD),
  "suggestions": string[] (4-6 specific, actionable suggestions to improve the match score),
  "summary": string (2-3 sentence overall summary)
}

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescriptionText}
"""`;
}

export function buildCorrectionPrompt(resumeText, jobDescriptionText) {
  const jdBlock = jobDescriptionText
    ? `Tailor the corrections toward this JOB DESCRIPTION as well:\n"""\n${jobDescriptionText}\n"""\n`
    : "No specific job description was given, so focus on general resume quality and ATS best practices.";

  return `You are a professional resume editor and career coach.
Review the RESUME below and produce specific, line-level correction feedback.
Focus on: grammar/tense consistency, weak or passive phrasing, missing quantified impact,
vague bullet points, formatting/ATS issues, and clarity.

${jdBlock}

Respond with ONLY a raw JSON object (no markdown fences, no extra text) matching this exact shape:

{
  "overallQualityScore": number (0-100, current resume writing quality),
  "issuesFound": number (total count of issues identified),
  "corrections": [
    {
      "section": string (e.g. "Experience - Software Engineer at Acme"),
      "original": string (the original problematic line/bullet, verbatim from the resume),
      "improved": string (the rewritten, stronger version),
      "reason": string (short explanation of why this is better)
    }
  ],
  "grammarIssues": string[] (specific grammar/tense/spelling issues found, if any),
  "formattingIssues": string[] (ATS/formatting concerns, e.g. tables, headers as images, columns),
  "generalTips": string[] (3-5 general tips beyond the line-level corrections)
}

Include at least 5 corrections if the resume has enough content, prioritizing the highest-impact fixes.

RESUME:
"""
${resumeText}
"""`;
}

export function buildGeneratorPrompt(resumeText, jobDescriptionText) {
  return `You are an expert resume writer specializing in ATS-optimized resumes.
Rewrite the RESUME below into a polished, ATS-friendly version tailored specifically to the JOB DESCRIPTION.
Preserve the person's real experience, employers, dates, and education — do NOT invent facts, employers,
job titles, or metrics that are not reasonably implied by the original resume.
You MAY rephrase bullets to naturally include relevant keywords/skills from the JD where truthful,
quantify impact using ranges if exact numbers aren't given (e.g. "reduced load time" -> keep qualitative
if no number exists, do not fabricate a number), and reorder sections for relevance.

Respond with ONLY a raw JSON object (no markdown fences, no extra text) matching this exact shape:

{
  "fullName": string,
  "title": string (a professional title tailored to the JD, e.g. "Senior Backend Engineer"),
  "contact": string (best-guess contact line from the resume, e.g. "email | phone | location | linkedin"),
  "summary": string (3-4 sentence professional summary tailored to the JD),
  "skills": string[] (10-16 skills, prioritizing JD-relevant ones truthfully present in the resume),
  "experience": [
    {
      "company": string,
      "role": string,
      "dates": string,
      "bullets": string[] (3-5 rewritten, achievement-oriented bullet points)
    }
  ],
  "education": [
    { "institution": string, "degree": string, "dates": string }
  ],
  "projects": [
    { "name": string, "description": string }
  ],
  "keywordsIncorporated": string[] (JD keywords woven into this rewrite),
  "changeLog": string[] (4-6 short bullet points summarizing what was changed and why)
}

If a section (like projects) doesn't apply, return an empty array for it, don't omit the key.

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescriptionText}
"""`;
}
