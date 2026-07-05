import { Router } from "express";
import { analyzeRouter } from "./analyze.routes.js";
import { correctionRouter } from "./correction.routes.js";
import { generatorRouter } from "./generator.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => res.json({ status: "ok" }));

apiRouter.use("/analyze", analyzeRouter);
apiRouter.use("/correct", correctionRouter);
apiRouter.use("/generate", generatorRouter);
