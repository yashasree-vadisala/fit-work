import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { extractTextFromFile } from "../utils/fileParser.js";
import { correctResume } from "../services/correctionService.js";

export const correctionRouter = Router();

// POST /api/correct
// multipart/form-data: resume (file), jobDescription (optional text field)
correctionRouter.post(
  "/",
  upload.single("resume"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a resume file." });
    }

    const jobDescription = (req.body.jobDescription || "").trim();
    const resumeText = await extractTextFromFile(req.file);
    const correction = await correctResume(resumeText, jobDescription || undefined);

    res.json({ correction });
  })
);
