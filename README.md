# Job Fit Scoring Tool

A personal AI tool for deciding **how much job-search effort an opportunity deserves**, rather than trying to predict whether the user will get hired.

## V1 workflow

`Paste JD → live company research → 10-dimension fit score → verdict → effort recommendation → company/networking recommendation`

The current prototype is a browser-based single-page app connected to the OpenAI Responses API.

## What it does

- Accepts a pasted job description
- Performs live company research before scoring
- Scores the opportunity across 10 dimensions
- Returns a verdict and recommended effort level
- Separates company quality from role fit
- Surfaces research sources
- Saves evaluation history locally in the browser

## Development process

### Wednesday 1 — Scoring logic + calibration

I first built and tested the scoring rubric before turning it into an interface.

I used roles I had already evaluated manually as calibration cases. When the model disagreed with my expected verdict, I inspected the dimension-level scores and reasoning, then adjusted the rubric only when the underlying logic did not reflect the criteria I actually use to evaluate opportunities.

This led to changes such as:

- making qualification gaps affect the actual verdict
- adding verdict caps for material function or qualification mismatches
- distinguishing event-heavy roles from roles where events are only one marketing channel
- improving geography and remote-role handling
- separating company attractiveness from current-role fit

### Wednesday 2 — Productization

I turned the scoring system into a working web application and added:

- OpenAI API integration
- mandatory live company research
- visible research sources
- structured scoring output
- browser-local evaluation history
- additional scoring calibration from real test cases

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

The production version uses a personalized candidate profile, job-search constraints, and scoring rules.

Those private details are **not included in this public repository**. `PROMPT_TEMPLATE.md` and the public app use a sanitized version of the scoring architecture.

The current V1 also stores the API key client-side in the user's browser. This is acceptable for a private prototype, but a public/multi-user product would move the API call and secret key to a backend/serverless function.

## Roadmap

- **V1:** Manual job-description input and scoring
- **V2:** Automated job ingestion + alerts
- **V3:** Multi-user product with customizable criteria

## Status

Work in progress. Current private prototype: **V1.1.2**.
