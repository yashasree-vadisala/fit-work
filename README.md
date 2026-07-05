# Fitwork — Resume ↔ Job Description Matcher

A full-stack app that scores how well a resume matches a job description, gives
line-by-line resume corrections, and generates a tailored ATS-optimized resume
(downloadable as .docx). Powered by the Gemini API.

```
resume-matcher/
├── server/        Node.js + Express API (talks to Gemini, parses files, builds .docx)
└── client/        React + Vite frontend (Tailwind + Framer Motion, light/dark mode)
```

## 1. Get a Gemini API key

Go to https://aistudio.google.com/apikey and create a free API key.

## 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
# open .env and paste your key into GEMINI_API_KEY
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`
to confirm it's up.

## 3. Frontend setup

In a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## Project structure — what's where

### `server/` (backend)
| File | Purpose |
|---|---|
| `server.js` | Express app entry point, mounts routes and middleware |
| `config/env.js` | Loads and validates environment variables |
| `middleware/upload.js` | Multer config for resume file uploads (PDF/DOCX/TXT) |
| `middleware/errorHandler.js` | Centralized error handling + async wrapper |
| `utils/fileParser.js` | Extracts plain text from uploaded PDF/DOCX/TXT files |
| `utils/promptTemplates.js` | All Gemini prompt templates, one function per feature |
| `services/geminiClient.js` | Single wrapper around the Gemini SDK, handles JSON parsing/retries |
| `services/analyzeService.js` | Match-score feature: calls Gemini, normalizes the response |
| `services/correctionService.js` | Line-correction feature: calls Gemini, normalizes the response |
| `services/generatorService.js` | ATS resume generator feature: calls Gemini, normalizes the response |
| `services/docBuilder.js` | Builds a downloadable, ATS-safe `.docx` from the generated resume |
| `routes/analyze.routes.js` | `POST /api/analyze` |
| `routes/correction.routes.js` | `POST /api/correct` |
| `routes/generator.routes.js` | `POST /api/generate` and `POST /api/generate/download` |
| `routes/index.js` | Mounts all routes under `/api` |

### `client/` (frontend)
| File | Purpose |
|---|---|
| `src/main.jsx` | React entry point, wraps app in Theme + Router providers |
| `src/App.jsx` | Route definitions and persistent layout (navbar/footer) |
| `src/index.css` | Tailwind imports + global styles (fonts, focus rings, scrollbars) |
| `src/context/ThemeContext.jsx` | Light/dark mode state, persisted to localStorage |
| `src/api/client.js` | All backend API calls (analyze, correct, generate, download) live here |
| `src/components/layout/` | Navbar, Footer, ThemeToggle, PageShell (page wrapper w/ transition) |
| `src/components/shared/` | Button, Loader, Badge, FileDropzone — used across all pages |
| `src/components/home/` | Hero, OverlapMeter (signature animation), FeatureGrid, HowItWorks |
| `src/components/results/` | All result-rendering pieces: ScoreDial, SectionBreakdown, KeywordGaps, SuggestionList, and the three page-level composites (AnalysisResults, CorrectionResults, GeneratedResumePreview) |
| `src/pages/` | `Home.jsx`, `Analyze.jsx` (match score), `Correct.jsx` (line corrections), `Generate.jsx` (ATS rewrite), `NotFound.jsx` |

## Features

1. **Match score** (`/analyze`) — weighted score across skills, experience,
   education, keywords, and ATS-friendliness, plus matched/missing keyword lists,
   strengths, gaps, and suggestions.
2. **Line-by-line correction** (`/correct`) — before/after rewrites for weak
   bullets, plus grammar and ATS-formatting flags. Job description is optional here.
3. **ATS resume generator** (`/generate`) — full tailored rewrite of your resume
   around the target job description, previewed in-browser and downloadable as
   a clean single-column `.docx`.

## Notes on the AI model

The backend defaults to `gemini-2.5-flash` (cheap, fast, generally available).
If you want stronger reasoning and don't mind higher cost/latency, change
`GEMINI_MODEL` in `server/.env` to `gemini-3.5-flash`.

## Deploying

- **Backend**: any Node host works (Render, Railway, Fly.io, a VPS). Set
  `GEMINI_API_KEY` and `CLIENT_ORIGIN` (your deployed frontend URL) as env vars.
- **Frontend**: any static host (Vercel, Netlify, Cloudflare Pages). Set
  `VITE_API_BASE_URL` to your deployed backend's `/api` URL, then `npm run build`
  and deploy the `dist/` folder.

Never put your Gemini API key in the frontend — it must only live in the
backend's `.env`, since anything shipped to the browser is publicly visible.
