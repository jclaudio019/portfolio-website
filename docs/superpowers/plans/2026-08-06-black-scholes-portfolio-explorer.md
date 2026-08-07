# Black-Scholes Portfolio Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Black-Scholes Options Modeling as completed project 05 with a React explorer backed by a narrow Cloudflare Worker, leaving Warehouse as in-progress project 06.

**Architecture:** Pure JavaScript handles Black-Scholes and position calculations in the portfolio. A Cloudflare Worker normalizes Yahoo data and computes a one-day GARCH(1,1) forecast. The React component follows the existing credit-risk explorer’s accessible, stale-result, and lazy-loading patterns.

**Tech Stack:** React 18, existing Tailwind/Framer Motion stack, JavaScript, Jest, Cloudflare Workers, Wrangler, Yahoo public endpoints, retained Python `arch` fixture.

## Global Constraints

- Preserve the current Warehouse changes and `website_replica-preview.html` exactly.
- Do not add UI, charting, state-management, or database dependencies.
- Allow only AAPL, MSFT, and SPY.
- Do not contact Yahoo from the browser.
- Do not remove Streamlit until the replacement passes deployed smoke testing.
- Do not modify the original notebook or `src/final/blackscholes.py`.
- Treat every result as educational, not trading or production-risk guidance.

---

### Task 1: Feasibility gate and deterministic fixture

**Files:**
- Create: `worker/scripts/yahoo-feasibility.mjs`
- Create: `worker/test/fixtures/garch-prices.json`
- Create: `worker/test/fixtures/garch-python-result.json`

**Interfaces:**
- Consumes Yahoo chart, quote-summary, option-chain, and `^IRX` responses.
- Produces a written command result proving required fields or a precise blocker.

- [ ] Fetch chart and option-chain data for AAPL, MSFT, and SPY with a Worker-compatible `fetch` request.
- [ ] Verify expirations, strikes, bid, ask, last price, implied volatility, adjusted history, dividends, and `^IRX`.
- [ ] Generate one deterministic Python `arch` result from the retained implementation and save only the compact input/output fixture.
- [ ] Run the JavaScript prototype against the fixture and require finite positive annualized volatility within the documented tolerance.
- [ ] Stop if Yahoo requires unsupported authentication or omits required data.

### Task 2: Pure Black-Scholes and hedge calculations

**Files:**
- Create: `src/lib/blackScholes.js`
- Create: `src/lib/blackScholes.test.js`

**Interfaces:**
- Produces `normalCdf(x)`, `blackScholes({ stockPrice, strike, rate, dividendYield, volatility, timeYears, optionType })`, and `positionHedge({ delta, gamma, signedContracts, previousTarget })`.

- [ ] Write failing call, put, Delta, Gamma, long/short scaling, and hedge-adjustment tests using known Python outputs.
- [ ] Run the focused test and confirm failures are caused by missing implementation.
- [ ] Implement the minimum finite-input Black-Scholes and position functions.
- [ ] Run the focused tests to green.

### Task 3: Worker market data and GARCH API

**Files:**
- Create: `worker/src/garch.js`
- Create: `worker/src/yahoo.js`
- Create: `worker/src/index.js`
- Create: `worker/test/garch.test.js`
- Create: `worker/test/yahoo.test.js`
- Create: `worker/test/index.test.js`
- Create: `worker/package.json`
- Create: `worker/wrangler.jsonc`

**Interfaces:**
- Produces the three `/api/options/*` endpoints defined in the design.
- Returns `{ error: string }` with an appropriate 4xx/5xx status for unsafe or unusable inputs.

- [ ] Write failing tests for the symbol allowlist, request validation, midpoint/last fallback, incomplete responses, dividend fallback, expiry rejection, selector caching boundary, and deterministic GARCH fixture.
- [ ] Run Worker tests and confirm the expected failures.
- [ ] Implement the minimum fetch, normalization, validation, GARCH, CORS, and cache-control behavior.
- [ ] Run Worker tests to green and run a local Worker smoke request.

### Task 4: React explorer

**Files:**
- Create: `src/components/OptionsHedgeExplorer.jsx`
- Create: `src/components/OptionsHedgeExplorer.test.jsx`
- Modify: `src/pages/ProjectDetail.jsx`

**Interfaces:**
- Consumes the Worker endpoints and pure functions from Task 2.
- Maintains prior hedge targets only in component memory.

- [ ] Write failing tests for accessible defaults, dependent choices, button-only calculation, stale results, both volatility rows, second-refresh adjustment, usable errors, limitations, and disclosure.
- [ ] Run the component tests and confirm the missing explorer behavior fails.
- [ ] Implement the explorer by reusing the Credit Risk component’s visual and accessibility patterns.
- [ ] Lazy-load it only on the Black-Scholes project detail page.
- [ ] Run component tests to green.

### Task 5: Project 05 content and Warehouse 06 ordering

**Files:**
- Modify: `src/data/content.js`
- Modify: `src/data/content.test.js`
- Modify: `src/components/ProjectStatus.test.jsx`
- Add: `public/images/black-scholes-options-modeling-hero.png`

**Interfaces:**
- Adds slug `black-scholes-options-modeling` immediately before `warehouse-club-market-expansion`.

- [ ] Write failing tests for six project records, Black-Scholes as completed 05, Warehouse as in-progress 06, detail navigation, disclosure, and repository link.
- [ ] Run content/status tests and confirm failures.
- [ ] Add truthful case-study content separating coursework and the post-course extension.
- [ ] Add a temporary portfolio-native cover without changing existing project images.
- [ ] Run content/status tests to green.

### Task 6: Local integration and production validation

**Files:**
- Modify only files required by failures found in Tasks 2–5.

- [ ] Run all focused math, Worker, component, content, and status tests.
- [ ] Run the complete portfolio test suite.
- [ ] Build the production React bundle.
- [ ] Run `git diff --check` and verify the Warehouse changes remain present.
- [ ] Verify desktop and mobile localhost layouts and a repeated AAPL calculation without console errors.

### Task 7: Deployment and modeling-repository cleanup

**Files:**
- Modify after deployed verification: modeling `README.md`, `pyproject.toml`, and superseded design/plan documents.
- Remove after deployed verification only: `streamlit_app.py` and Streamlit-only `requirements.txt`.

- [ ] Verify the authoritative site deployment and Cloudflare route before configuring the Worker.
- [ ] Deploy the narrow Worker route and portfolio only after local validation.
- [ ] Smoke-test AAPL twice on the deployed site.
- [ ] Preserve the notebook and original Black-Scholes module byte-for-byte.
- [ ] Remove Streamlit/yfinance only after the replacement passes.
- [ ] Run both repositories’ complete tests and confirm clean diffs before any requested commits or pushes.
