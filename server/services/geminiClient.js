import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";

let client = null;

function getClient() {
  if (!env.geminiApiKey) {
    const err = new Error(
      "Server is missing GEMINI_API_KEY. Add it to server/.env and restart the server."
    );
    err.status = 500;
    throw err;
  }
  if (!client) client = new GoogleGenerativeAI(env.geminiApiKey);
  return client;
}

/**
 * Sends a prompt to Gemini and returns the parsed JSON response.
 * Retries once with a "fix your JSON" nudge if the first reply isn't valid JSON.
 * @param {string} prompt
 * @returns {Promise<object>}
 */
export async function generateJson(prompt) {
  const model = getClient().getGenerativeModel({
    model: env.geminiModel,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  try {
    return JSON.parse(rawText);
  } catch {
    return retryWithCleanup(model, rawText);
  }
}

async function retryWithCleanup(model, brokenText) {
  const fixPrompt = `The following text was supposed to be raw JSON but failed to parse.
Return ONLY the corrected, valid raw JSON (no markdown fences, no commentary):

${brokenText}`;

  const result = await model.generateContent(fixPrompt);
  const fixedText = result.response.text();

  try {
    return JSON.parse(fixedText);
  } catch (err) {
    const parseErr = new Error("The AI returned a response we couldn't parse. Please try again.");
    parseErr.status = 502;
    throw parseErr;
  }
}
