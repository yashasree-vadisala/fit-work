import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { extractTextFromFile } from "../utils/fileParser.js";
import { generateAtsResume } from "../services/generatorService.js";
import { buildResumeDocx } from "../services/docBuilder.js";

export const generatorRouter = Router();

// POST /api/generate
// multipart/form-data: resume (file), jobDescription (text field)
// Returns the structured resume JSON (rendered as a preview in the UI).
generatorRouter.post(
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
    const generated = await generateAtsResume(resumeText, jobDescription);

    res.json({ generated });
  })
);

// POST /api/generate/download
// JSON body: { generated: <structured resume object returned above> }
// Returns a .docx file stream.
generatorRouter.post(
  "/download",
  asyncHandler(async (req, res) => {
    const { generated } = req.body;
    if (!generated) {
      return res.status(400).json({ error: "Missing generated resume data." });
    }

    const buffer = await buildResumeDocx(generated);
    const safeName = (generated.fullName || "resume").replace(/[^a-z0-9]+/gi, "_").toLowerCase();

    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${safeName}_ats_resume.docx"`,
    });
    res.send(buffer);
  })
);
