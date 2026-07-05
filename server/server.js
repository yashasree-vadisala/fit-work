import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: "2mb" }));

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`✓ Resume Matcher API running on http://localhost:${env.port}`);
  if (!env.geminiApiKey) {
    console.warn("⚠ GEMINI_API_KEY is not set — requests will fail until you add it to .env");
  }
});
