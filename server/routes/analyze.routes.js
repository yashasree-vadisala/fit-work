import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { extractTextFromFile } from "../utils/fileParser.js";
import { analyzeResumeMatch } from "../services/analyzeService.js";

export const analyzeRouter = Router();

// POST /api/analyze
// multipart/form-data: resume (file), jobDescription (text field)
analyzeRouter.post(
  "/",
  upload.single("resume"),
  asyncHandler(async (req, res) => {
    const jobDescription = (req.body.jobDescription || "").trim();

    if (!req.file) {
      return res.status(400).json({ error: "Please upload a resume file." });
    }
    if (jobDescription.length < 30) {
      return res
        .status(400)
        .json({ error: "Please paste a fuller job description (at least a few sentences)." });
    }

    const resumeText = await extractTextFromFile(req.file);
    const analysis = await analyzeResumeMatch(resumeText, jobDescription);

    res.json({ analysis, resumeTextLength: resumeText.length });
  })
);
