# Job Fit Scoring Tool

A personal AI tool to help me decide **whether to apply to an opportunity and, if so, how much effort to put into the application**.

## V1 workflow

`Paste JD → live company research → 10-dimension fit score → verdict → effort recommendation → company/networking recommendation`

V1 is a browser-based single-page app connected to the OpenAI Responses API.

## What it does

- Accepts a pasted job description
- Performs live company research before scoring
- Scores the opportunity across 10 dimensions
- Returns a verdict and recommended effort level
- Separates company quality from role fit
- Surfaces research sources
- Saves evaluation history locally in the browser

## Development process

### Wednesday 1: Scoring logic + calibration (校准)

I started by building and testing the scoring rubric before turning it into an interface.

I used roles I had already evaluated manually as calibration (校准) cases. When the model disagreed with my expected verdict, I inspected the dimension-level scores and reasoning, then adjusted the rubric only when the underlying logic did not reflect the criteria I actually use to evaluate opportunities.

This led to changes such as:

- making qualification gaps affect the actual verdict
- adding verdict caps for material function or qualification mismatches
- treating genuinely unknown information as neutral rather than automatically negative
- improving geography and remote-role handling
- separating company attractiveness from current-role fit

### Wednesday 2: Productization

I turned the scoring system into a working web application and added:

- OpenAI Responses API integration
- mandatory live company research
- visible research sources
- structured scoring output
- browser-local evaluation history
- additional scoring calibration (校准) from real test cases

## 10 scoring dimensions

1. Geography fit
2. Function fit
3. AI relevance / AI value-chain exposure
4. PMF / underlying demand
5. Founding Team
6. Funding status / financial support
7. Seniority fit
8. Company stage / operating environment fit
9. Market direction
10. Candidate qualification fit

## Architecture

- HTML / CSS / JavaScript
- OpenAI Responses API
- GPT-5.6 Sol
- Medium reasoning effort
- Structured Outputs
- Live web research
- `localStorage` for evaluation history
- No backend in V1

## Privacy note

The version I use privately includes my personalized candidate profile, job-search constraints, and scoring rules.

Those private details are **not included in this public repository**. `PROMPT_TEMPLATE.md` and the public app use a sanitized version of the scoring architecture.

For V1, the API key is stored client-side in the browser because this is still a private prototype. If I turn it into a public or multi-user product, I’d move the API call and secret key to a backend or serverless function.

## Roadmap

### V1 — Manual Scoring Tool

Paste a job posting, run it through the scoring system, and return a fit verdict with dimension-level reasoning.

Current focus:

- structured scoring rubric and hard filters
- live company research
- verdict caps and qualification checks
- calibration against real job postings
- browser-based interface and evaluation history

### V2 — Automated Discovery + Scoring

Automate the filtering process so relevant roles are discovered and scored before I manually review them.

Planned components:

- job discovery from Greenhouse, Lever, and Ashby feeds
- automatic scoring using the V1 framework
- cover letter drafts for roles that pass the scoring threshold
- daily digest with role, score, verdict, application link, and draft

Application submission would remain manual.

### V3 — Multi-User Product

Turn the scoring engine into a configurable product where other job seekers can define their own role, geography, seniority, industry, and qualification criteria.

The longer-term use case is especially relevant for people transitioning into adjacent fields or searching across regions where standard job-board filtering is weak.

## Status

Work in progress. Current private prototype: **V1.1.2**.
