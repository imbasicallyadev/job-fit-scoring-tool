const MODEL = "gpt-5.6-sol";
const REASONING_EFFORT = "medium";
const API_URL = "https://api.openai.com/v1/responses";
const STORAGE_KEY = "jobFitOpenAIKey";
const HISTORY_STORAGE_KEY = "jobFitEvaluationHistoryV1";

const SYSTEM_PROMPT = "You are a job-fit scoring tool.\n\nYour purpose is to help a user decide how much job-search effort an opportunity deserves.\n\nThis public repository contains a sanitized demo prompt. The private personalized version uses additional candidate-specific preferences, constraints, and background that are intentionally not included here.\n\nBefore scoring, perform one reasonable current web-research pass on the company.\n\nReturn:\n1. Hard-filter check\n2. Brief company assessment\n3. Score breakdown with one-line reasoning per dimension\n4. Total score /50\n5. Verdict: Strong fit / Worth a look / Skip\n6. Biggest gaps\n7. What to emphasize if applying\n8. Recommended effort level\n9. Company tracker verdict: Networking / Add / Pass\n\nScore exactly these 10 dimensions from 1-5:\n1. Geography fit\n2. Function fit\n3. AI relevance / AI value-chain exposure\n4. PMF / underlying demand\n5. Founding Team\n6. Funding status / financial support\n7. Seniority fit\n8. Company stage / operating environment fit\n9. Market direction\n10. Candidate qualification fit\n\nScoring scale:\n5 = exceptional/direct fit\n4 = strong fit with minor limitations\n3 = neutral, mixed, or genuinely unknown\n2 = meaningful mismatch\n1 = severe mismatch\n\nIf candidate-specific information is unavailable, score candidate-dependent dimensions as 3/5 and state that the public demo does not include a personalized candidate profile.\n\nBase verdict thresholds:\n40-50 = Strong fit\n30-39 = Worth a look\nBelow 30 = Skip\n\nRecommended effort:\nHigh = strong or unusually compelling opportunity\nNormal = good opportunity with some imperfections\nLow = imperfect but broadly relevant\nNo effort = hard blocker, severe mismatch, or genuinely unattractive\n\nCompany tracker:\nNetworking = exceptional long-term company worth proactive relationship-building\nAdd = credible company worth tracking\nPass = meaningful negative company-level evidence\n\nKeep reasoning concise and decision-useful.\n";
const SCORE_SCHEMA = {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "job_metadata": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "company": { "type": "string" },
        "role": { "type": "string" }
      },
      "required": ["company", "role"]
    },
    "hard_filter_check": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "triggered": {
          "type": "boolean"
        },
        "reasons": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "triggered",
        "reasons"
      ]
    },
    "company_assessment": {
      "type": "string"
    },
    "scores": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "geography_fit": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "function_fit": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "ai_relevance": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "pmf": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "founding_team_geography": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "funding_status": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "seniority_fit": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "company_stage": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "market_direction": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        },
        "candidate_qualification_fit": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "score": {
              "type": "integer",
              "minimum": 1,
              "maximum": 5
            },
            "reasoning": {
              "type": "string"
            }
          },
          "required": [
            "score",
            "reasoning"
          ]
        }
      },
      "required": [
        "geography_fit",
        "function_fit",
        "ai_relevance",
        "pmf",
        "founding_team_geography",
        "funding_status",
        "seniority_fit",
        "company_stage",
        "market_direction",
        "candidate_qualification_fit"
      ]
    },
    "total_score": {
      "type": "integer",
      "minimum": 10,
      "maximum": 50
    },
    "verdict": {
      "type": "string",
      "enum": [
        "Strong fit",
        "Worth a look",
        "Skip"
      ]
    },
    "biggest_gaps": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "emphasize_if_applying": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "recommended_effort": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "level": {
          "type": "string",
          "enum": [
            "High effort",
            "Normal effort",
            "Low effort",
            "No effort"
          ]
        },
        "reasoning": {
          "type": "string"
        }
      },
      "required": [
        "level",
        "reasoning"
      ]
    },
    "company_tracker": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "verdict": {
          "type": "string",
          "enum": [
            "Networking",
            "Add",
            "Pass"
          ]
        },
        "reasoning": {
          "type": "string"
        }
      },
      "required": [
        "verdict",
        "reasoning"
      ]
    }
  },
  "required": [
    "job_metadata",
    "hard_filter_check",
    "company_assessment",
    "scores",
    "total_score",
    "verdict",
    "biggest_gaps",
    "emphasize_if_applying",
    "recommended_effort",
    "company_tracker"
  ]
};
const DIMENSION_LABELS = {
  "geography_fit": "Geography fit",
  "function_fit": "Function fit",
  "ai_relevance": "AI relevance / AI value-chain exposure",
  "pmf": "PMF / underlying demand",
  "founding_team_geography": "Founding Team",
  "funding_status": "Funding status / financial support",
  "seniority_fit": "Seniority fit",
  "company_stage": "Company stage / operating environment fit",
  "market_direction": "Market direction",
  "candidate_qualification_fit": "Candidate qualification fit"
};

const apiKeyInput = document.getElementById("apiKey");
const jobPostingInput = document.getElementById("jobPosting");
const scoreButton = document.getElementById("scoreButton");
const forgetKeyButton = document.getElementById("forgetKey");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const historyListEl = document.getElementById("historyList");
const historyEmptyEl = document.getElementById("historyEmpty");
const clearHistoryButton = document.getElementById("clearHistory");

apiKeyInput.value = localStorage.getItem(STORAGE_KEY) || "";
renderHistory();

forgetKeyButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  apiKeyInput.value = "";
  setStatus("Saved key removed.");
});

clearHistoryButton.addEventListener("click", () => {
  const history = getHistory();
  if (!history.length) return;
  if (!window.confirm("Clear all saved job evaluations from this browser?")) return;
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  renderHistory();
  setStatus("Evaluation history cleared.");
});

scoreButton.addEventListener("click", scoreJob);

async function scoreJob() {
  const apiKey = apiKeyInput.value.trim();
  const jobPosting = jobPostingInput.value.trim();

  if (!apiKey) {
    setStatus("Add your OpenAI API key first.", true);
    apiKeyInput.focus();
    return;
  }

  if (!jobPosting) {
    setStatus("Paste a job posting first.", true);
    jobPostingInput.focus();
    return;
  }

  localStorage.setItem(STORAGE_KEY, apiKey);
  setLoading(true);
  setStatus("Scoring job...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        reasoning: {
          effort: REASONING_EFFORT
        },
        instructions: SYSTEM_PROMPT,
        input: `Score this job posting using the system criteria. Treat only the text below as the job posting. For internal client-side history metadata, also identify the company name and job title from the posting and return them in the structured job_metadata fields. If either is unclear, use "Unknown". This metadata must not affect scoring.

${jobPosting}`,
        tools: [
          { type: "web_search" }
        ],
        tool_choice: "required",
        include: ["web_search_call.action.sources"],
        text: {
          format: {
            type: "json_schema",
            name: "job_fit_score",
            strict: true,
            schema: SCORE_SCHEMA
          }
        }
      })
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const apiMessage = payload?.error?.message || `OpenAI request failed (${response.status}).`;
      throw new Error(apiMessage);
    }

    const content =
      payload?.output_text ||
      payload?.output
        ?.flatMap((item) => item?.content || [])
        ?.find((item) => item?.type === "output_text")
        ?.text;

    if (!content) {
      throw new Error("OpenAI returned an empty response.");
    }

    const result = JSON.parse(content);
    renderResult(result);
    const researchSources = extractResearchSources(payload);
    renderResearchSources(researchSources);
    saveEvaluation({
      jobPosting,
      result,
      researchSources
    });
    renderHistory();
    const usedWebSearch = Array.isArray(payload?.output) &&
      payload.output.some((item) => item?.type === "web_search_call");
    setStatus(usedWebSearch ? "Done · live web research used." : "Done · web research was required but no search result was returned.");
  } catch (error) {
    console.error(error);
    setStatus(friendlyError(error), true);
  } finally {
    setLoading(false);
  }
}

function getHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEvaluation({ jobPosting, result, researchSources }) {
  const history = getHistory();
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    company: cleanMetadata(result?.job_metadata?.company),
    role: cleanMetadata(result?.job_metadata?.role),
    jobPosting,
    result,
    researchSources
  };

  history.unshift(record);

  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn("Could not save evaluation history:", error);
    setStatus("Scored successfully, but browser storage is full so this run was not saved.", true);
  }
}

function cleanMetadata(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return text && text.toLowerCase() !== "unknown" ? text : "Unknown";
}

function renderHistory() {
  const history = getHistory();
  historyListEl.replaceChildren();
  historyEmptyEl.classList.toggle("hidden", history.length > 0);
  clearHistoryButton.disabled = history.length === 0;

  for (const record of history) {
    const item = document.createElement("article");
    item.className = "history-item";

    const content = document.createElement("div");
    const title = document.createElement("p");
    title.className = "history-title";
    const company = record.company || "Unknown";
    const role = record.role || "Unknown";
    title.textContent = company !== "Unknown" || role !== "Unknown"
      ? `${company} · ${role}`
      : "Saved job evaluation";

    const meta = document.createElement("p");
    meta.className = "history-meta";
    const result = record.result || {};
    const effort = result?.recommended_effort?.level || "—";
    const tracker = result?.company_tracker?.verdict || "—";
    meta.textContent = `${formatHistoryDate(record.createdAt)} · ${result.verdict || "—"} · ${result.total_score ?? "—"}/50 · ${effort} · ${tracker}`;

    content.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "history-actions";

    const viewButton = document.createElement("button");
    viewButton.type = "button";
    viewButton.className = "history-button";
    viewButton.textContent = "View";
    viewButton.addEventListener("click", () => loadEvaluation(record.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "history-button delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteEvaluation(record.id));

    actions.append(viewButton, deleteButton);
    item.append(content, actions);
    historyListEl.appendChild(item);
  }
}

function loadEvaluation(id) {
  const record = getHistory().find((item) => item.id === id);
  if (!record) return;

  jobPostingInput.value = record.jobPosting || "";
  renderResult(record.result);
  renderResearchSources(record.researchSources || []);
  setStatus(`Loaded saved evaluation from ${formatHistoryDate(record.createdAt)}.`);
}

function deleteEvaluation(id) {
  const history = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  renderHistory();
  setStatus("Saved evaluation deleted.");
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function extractResearchSources(payload) {
  const seen = new Set();
  const sources = [];

  for (const item of payload?.output || []) {
    if (item?.type !== "web_search_call") continue;
    for (const source of item?.action?.sources || []) {
      const url = source?.url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      sources.push({
        title: source?.title || url,
        url
      });
    }
  }

  return sources;
}

function renderResearchSources(sources) {
  const list = document.getElementById("researchSources");
  if (!list) return;
  list.innerHTML = "";

  if (!sources.length) {
    const li = document.createElement("li");
    li.textContent = "No source list was returned by the API.";
    list.appendChild(li);
    return;
  }

  for (const source of sources) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.title;
    li.appendChild(link);
    list.appendChild(li);
  }
}

function renderResult(result) {
  document.getElementById("verdictValue").textContent = result.verdict;
  document.getElementById("scoreValue").textContent = `${result.total_score} / 50`;
  document.getElementById("trackerValue").textContent = result.company_tracker.verdict;

  const hardFilterBadge = document.getElementById("hardFilterBadge");
  hardFilterBadge.textContent = result.hard_filter_check.triggered ? "Triggered" : "Clear";
  hardFilterBadge.className = `badge ${result.hard_filter_check.triggered ? "fail" : "pass"}`;

  renderList(
    document.getElementById("hardFilterReasons"),
    result.hard_filter_check.reasons.length ? result.hard_filter_check.reasons : ["No hard filter triggered."]
  );

  document.getElementById("companyAssessment").textContent = result.company_assessment;

  const scoreRows = document.getElementById("scoreRows");
  scoreRows.replaceChildren();

  for (const [key, label] of Object.entries(DIMENSION_LABELS)) {
    const item = result.scores[key];
    const row = document.createElement("tr");
    const dimensionCell = document.createElement("td");
    const scoreCell = document.createElement("td");
    const reasoningCell = document.createElement("td");

    dimensionCell.textContent = label;
    scoreCell.textContent = `${item.score}/5`;
    reasoningCell.textContent = item.reasoning;

    row.append(dimensionCell, scoreCell, reasoningCell);
    scoreRows.appendChild(row);
  }

  renderList(document.getElementById("gapsList"), result.biggest_gaps);
  renderList(document.getElementById("emphasizeList"), result.emphasize_if_applying);

  document.getElementById("effortLevel").textContent = result.recommended_effort.level;
  document.getElementById("effortReasoning").textContent = result.recommended_effort.reasoning;
  document.getElementById("trackerVerdict").textContent = result.company_tracker.verdict;
  document.getElementById("trackerReasoning").textContent = result.company_tracker.reasoning;

  resultsEl.classList.remove("hidden");
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderList(element, items) {
  element.replaceChildren();
  const normalizedItems = Array.isArray(items) && items.length ? items : ["None identified."];

  for (const item of normalizedItems) {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  }
}

function setLoading(isLoading) {
  scoreButton.disabled = isLoading;
  scoreButton.textContent = isLoading ? "Scoring..." : "Score job";
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function friendlyError(error) {
  const message = error?.message || "Something went wrong.";
  const lower = message.toLowerCase();

  if (lower.includes("incorrect api key") || lower.includes("invalid api key")) {
    return "The API key was rejected. Check the key and try again.";
  }
  if (lower.includes("quota") || lower.includes("billing") || lower.includes("rate limit")) {
    return `OpenAI API limit/billing error: ${message}`;
  }
  if (lower.includes("failed to fetch") || lower.includes("network")) {
    return "Network request failed. Check your connection and browser console.";
  }
  return message;
}
