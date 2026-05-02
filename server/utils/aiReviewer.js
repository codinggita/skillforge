const Groq = require("groq-sdk");

// ─── Client (lazy-initialised so tests can mock it) ───────────────────────────
let _client = null;
function getClient() {
  if (!_client) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set in environment variables.");
    }
    _client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _client;
}

// ─── Model config ─────────────────────────────────────────────────────────────
// Free Groq models (as of 2025). Prefer the 70B for better code reasoning.
const GROQ_MODEL = "llama-3.3-70b-versatile"; // fast + free on Groq
// Fallback: "llama3-8b-8192" (faster, lower quality)

// ─── Skill dimension keywords ─────────────────────────────────────────────────
// Maps free-text AI skill names → one of the 5 SkillScore dimensions
const DIMENSION_KEYWORDS = {
  debugging:          ["debug", "error", "fix", "bug", "exception", "trace", "log"],
  problemSolving:     ["algorithm", "logic", "approach", "solution", "problem", "solve", "complexity"],
  codeQuality:        ["readab", "clean", "style", "format", "naming", "convention", "structure", "modular"],
  timeManagement:     ["efficient", "optim", "performance", "fast", "slow", "time", "speed"],
  conceptApplication: ["concept", "pattern", "principle", "solid", "oop", "functional", "paradigm", "data structure"],
};

/**
 * Map a free-text skill name to one of the 5 SkillScore dimension keys.
 * @param {string} skill
 * @returns {string} dimension key
 */
function mapSkillToDimension(skill) {
  const lower = skill.toLowerCase();
  for (const [dim, keywords] of Object.entries(DIMENSION_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return dim;
  }
  return "problemSolving"; // default
}

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a senior software engineer and coding mentor with 15+ years of experience.
Your job is to review student code submissions and return structured feedback.

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanation, no code fences. Raw JSON only.

Required JSON schema:
{
  "score": <integer 1-10>,
  "feedback": "<2-4 sentence overall review>",
  "council": [
    { "persona": "⚡ Speedy (Performance)", "comment": "<critique>" },
    { "persona": "🛡️ Guardian (Security)", "comment": "<critique>" },
    { "persona": "🎨 Architect (Clean Code)", "comment": "<critique>" }
  ],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "skillsTested": ["<skill name>", ...],
  "weakAreas": ["<weakness>", ...],
  "strengths": ["<strength>", ...],
  "summary": "<one sentence summary>",
  "codeQualityScore": <integer 0-100>,
  "readabilityScore": <integer 0-100>,
  "efficiencyScore": <integer 0-100>
}

Scoring rubric for "score":
  1-3  = Poor: does not run or has critical flaws
  4-5  = Below average: runs but has major structural issues
  6-7  = Average: works correctly with minor issues
  8-9  = Good: clean, efficient, well-structured
  10   = Excellent: production-quality code`;

// ─── Core function ────────────────────────────────────────────────────────────

/**
 * Review a student's code submission using Groq (Llama 3.3 70B — free).
 *
 * @param {object} params
 * @param {string}   params.code                - Student's submitted source code
 * @param {string}   params.language            - Programming language
 * @param {string}   params.projectTitle        - Project/challenge title
 * @param {string}   params.projectDescription  - Full project description
 * @param {number}  [params.timeTakenMinutes]   - Time the student took (optional)
 * @param {string[]}[params.projectTags]        - Skill tags from the project
 *
 * @returns {Promise<ReviewResult>}
 */
async function reviewCode({
  code,
  language,
  projectTitle,
  projectDescription,
  timeTakenMinutes = null,
  projectTags = [],
}) {
  // ── 1. Guard clauses ──────────────────────────────────────────────────────
  if (!code || code.trim().length === 0) {
    throw new Error("Cannot review empty code submission.");
  }

  // Truncate very large submissions (~12k chars ≈ 3k tokens, well within Groq limits)
  const MAX_CODE_LENGTH = 12000;
  const truncatedCode =
    code.length > MAX_CODE_LENGTH
      ? code.slice(0, MAX_CODE_LENGTH) + `\n\n// [Truncated — original: ${code.length} chars]`
      : code;

  // ── 2. Build user message ─────────────────────────────────────────────────
  const timeContext = timeTakenMinutes
    ? `The student completed this in ${timeTakenMinutes} minutes.`
    : "";
  const tagsContext =
    projectTags.length > 0
      ? `Project skill targets: ${projectTags.join(", ")}.`
      : "";

  const userMessage = `
Project: ${projectTitle}
Description: ${projectDescription}
Language: ${language}
${timeContext}
${tagsContext}

Student Code:
\`\`\`${language}
${truncatedCode}
\`\`\`

Return ONLY the JSON object. No extra text.`.trim();

  // ── 3. Call Groq ──────────────────────────────────────────────────────────
  const client = getClient();
  let rawContent;

  try {
    const completion = await client.chat.completions.create({
      model:       GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userMessage },
      ],
      temperature:       0.2,    // low = consistent structured output
      max_tokens:        900,
      // Groq supports JSON mode via response_format on supported models
      response_format:   { type: "json_object" },
    });

    rawContent = completion.choices[0]?.message?.content;
  } catch (err) {
    throw new Error(`Groq API error: ${err.message}`);
  }

  // ── 4. Parse & normalise ──────────────────────────────────────────────────
  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    // Attempt to extract JSON from a partially wrapped response
    const match = rawContent.match(/\{[\s\S]*\}/);
    if (match) {
      try { parsed = JSON.parse(match[0]); }
      catch { throw new Error(`Groq returned unparseable JSON. Raw: ${rawContent}`); }
    } else {
      throw new Error(`Groq returned non-JSON response. Raw: ${rawContent}`);
    }
  }

  return normaliseReview(parsed, projectTags);
}

// ─── Normaliser ───────────────────────────────────────────────────────────────

/**
 * Validate, clamp, and enrich the raw AI JSON.
 * Adds `dimensionScores` for direct SkillScore persistence.
 */
function normaliseReview(raw, projectTags = []) {
  const clamp  = (v, min, max) => Math.min(max, Math.max(min, Number(v) || 0));
  const toStr  = (v, fallback = "") => (typeof v === "string" ? v : fallback).slice(0, 2000);

  const score            = clamp(raw.score, 1, 10);
  const codeQualityScore = clamp(raw.codeQualityScore, 0, 100);
  const readabilityScore = clamp(raw.readabilityScore, 0, 100);
  const efficiencyScore  = clamp(raw.efficiencyScore,  0, 100);

  const feedback     = toStr(raw.feedback, "No feedback provided.");
  const summary      = toStr(raw.summary).slice(0, 300);
  const suggestions  = ensureArray(raw.suggestions, 3).slice(0, 5);
  const skillsTested = ensureArray(raw.skillsTested).slice(0, 10);
  const weakAreas    = ensureArray(raw.weakAreas).slice(0, 10);
  const strengths    = ensureArray(raw.strengths).slice(0, 10);
  const council      = Array.isArray(raw.council) ? raw.council.slice(0, 5) : [];

  // ── Map skills → 5 SkillScore dimensions ─────────────────────────────────
  const allSkills = [...skillsTested, ...projectTags];
  const baseScore = Math.round(score * 10); // 1–10 → 10–100

  const dimensionScores = {
    debugging:          clamp(inferDimScore(allSkills, "debugging",          baseScore, codeQualityScore), 0, 100),
    problemSolving:     clamp(inferDimScore(allSkills, "problemSolving",     baseScore, efficiencyScore),  0, 100),
    codeQuality:        codeQualityScore,
    timeManagement:     clamp(inferDimScore(allSkills, "timeManagement",     baseScore, efficiencyScore),  0, 100),
    conceptApplication: clamp(inferDimScore(allSkills, "conceptApplication", baseScore, readabilityScore), 0, 100),
  };

  return {
    score,
    feedback,
    council,
    summary,
    suggestions,
    skillsTested,
    weakAreas,
    strengths,
    codeQualityScore,
    readabilityScore,
    efficiencyScore,
    dimensionScores,
    modelUsed:  GROQ_MODEL,
    reviewedAt: new Date(),
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureArray(val, minLength = 0) {
  const arr = Array.isArray(val) ? val.map(String) : [];
  while (arr.length < minLength) arr.push("No suggestion provided.");
  return arr;
}

function inferDimScore(skills, dimension, base, specialScore) {
  const relevant = skills.some((s) => mapSkillToDimension(s) === dimension);
  return relevant ? Math.round((base + specialScore) / 2) : base;
}

module.exports = { reviewCode, mapSkillToDimension };
