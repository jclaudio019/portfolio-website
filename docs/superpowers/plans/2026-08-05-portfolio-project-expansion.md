# Portfolio Project Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox notation for explicit progress tracking.

**Goal:** Expand the portfolio from two to four projects, replace the two existing covers, and identify the warehouse market-expansion case study as in progress.

**Architecture:** Keep `src/data/content.js` as the single source of truth. Reuse the existing project grids, generic `/projects/:slug` detail route, and shared `ProjectCard`; add only an optional status presentation. Store all four 4:3 covers under `public/images` so deployment remains self-contained.

**Tech Stack:** React 18, React Router 6, Tailwind CSS, Jest/react-scripts.

## Global Constraints

- Keep exactly four projects: the two existing projects plus Retail Allocation Simulator and Warehouse Club Market Expansion.
- Mark only Warehouse Club Market Expansion as `In progress`.
- Do not invent completed findings, rankings, or financial outcomes for the warehouse project.
- Present the allocation simulator through its allocation workflow, validation controls, and auditable Excel output; do not add a chart solely to resemble a forecasting project.
- Preserve the current visual system and generic detail-page structure.
- Do not touch the untracked `website_replica-preview.html` file.

## Task 1: Add the four project records and local cover assets

**Files:**
- Modify: `src/data/content.js`
- Add: `src/data/content.test.js`
- Add: `public/images/retail-demand-forecasting-hero-v2.png`
- Add: `public/images/credit-risk-pd-model-hero-v2.png`
- Add: `public/images/retail-allocation-simulator-hero.png`
- Add: `public/images/warehouse-club-market-expansion-hero.png`

- [ ] Write a focused data test that expects four unique slugs, the two new project records, local image paths, truthful repository links, and only the warehouse record to carry `status: "In progress"`.
- [ ] Run `CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/data/content.test.js` and confirm it fails against the current two-project data.
- [ ] Copy the approved files exactly:
  - `/Users/joseclaudio/.codex/generated_images/019fcff1-9629-7360-acf7-e1c59e61a6d9/exec-5895d5f3-bec6-4efd-956d-988295407777.png` → `public/images/retail-demand-forecasting-hero-v2.png`
  - `/Users/joseclaudio/.codex/generated_images/019fcff1-9629-7360-acf7-e1c59e61a6d9/exec-12bda03e-5372-48d4-a387-78d4d8e3f5ec.png` → `public/images/credit-risk-pd-model-hero-v2.png`
  - `/Users/joseclaudio/.codex/generated_images/019fcff1-9629-7360-acf7-e1c59e61a6d9/exec-9b590d84-3d5a-461e-a8c9-19ca58207efb.png` → `public/images/retail-allocation-simulator-hero.png`
  - `/Users/joseclaudio/.codex/generated_images/019fcff1-9629-7360-acf7-e1c59e61a6d9/exec-2d4f0229-40be-49d2-94b6-90d3435c7b66.png` → `public/images/warehouse-club-market-expansion-hero.png`
- [ ] Update the existing two image references and append two records based on `/Users/joseclaudio/Dev_local/project_potfolio/retail-allocation-simulator` and `/Users/joseclaudio/Dev_local/project_potfolio/warehouse-club-market-expansion-strategy`. Each new record must provide the fields consumed unconditionally by `ProjectDetail`: `slug`, `title`, `category`, `summary`, `image`, `tech`, `github`, three `metrics`, `problem`, `dataset`, `methodology`, `findings`, `implications`, and either `conclusion` or `conclusionParagraphs`; include `status` only for Warehouse.
- [ ] Run `CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/data/content.test.js` and confirm one passing suite.

## Task 2: Show optional project status on cards and detail pages

**Files:**
- Modify: `src/components/ProjectCard.jsx`
- Modify: `src/pages/ProjectDetail.jsx`
- Add: `src/components/ProjectStatus.test.jsx`

- [ ] Write a focused rendering test that verifies `In progress` appears for the warehouse card and detail route, while completed projects render no status badge. Render cards inside `MemoryRouter`; render `/projects/retail-allocation-simulator` and `/projects/warehouse-club-market-expansion` through `MemoryRouter`, `Routes`, and a `/projects/:slug` route, with `window.scrollTo` stubbed for JSDOM.
- [ ] Run `CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/ProjectStatus.test.jsx` and confirm it fails before the status UI exists.
- [ ] Add one conditional status badge to `ProjectCard` and one conditional status label to `ProjectDetail`, reusing existing typography and colors.
- [ ] Run `CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/ProjectStatus.test.jsx` and confirm one passing suite.

## Task 3: Verify the complete portfolio experience

**Files:**
- Update if required by repository policy: `graphify-out/*`

- [ ] Run `CI=true ./node_modules/.bin/react-scripts test --watchAll=false` and confirm all suites pass.
- [ ] Run `npm run build` and confirm the optimized production build succeeds.
- [ ] Run `graphify update .` and confirm the repository graph refresh succeeds because Graphify informed this change.
- [ ] Visually inspect the home/projects grids and all four project routes at desktop and mobile widths, confirming 4:3 crops, readable badges, working GitHub links, and no broken images.
- [ ] Review the final diff for scope fidelity and leave `website_replica-preview.html` untouched.
