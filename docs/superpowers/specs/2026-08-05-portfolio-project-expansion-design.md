# Portfolio Project Expansion Design

## Goal

Expand the existing portfolio from two projects to four by adding Retail Allocation Simulator and Warehouse Club Market Expansion Strategy, while replacing the current Forecasting and Credit Risk cover images with the approved creative concepts.

## Scope

- Keep the existing Retail Demand Forecasting and Credit Risk Probability of Default projects.
- Replace their cover images with the newly generated prism and balance-scale concepts.
- Add Retail Allocation Simulator as a complete third project.
- Add Warehouse Club Market Expansion Strategy as a fourth project marked `In progress`.
- Preserve the current shared project-card and project-detail architecture.
- Do not add the unfinished Retail Replenishment & Allocation Engine.
- Do not invent Warehouse Club findings, rankings, or completed metrics.
- Do not force conventional charts into the allocation case study.

## Content Design

### Retail Allocation Simulator

The case study will present the allocation-flow cover, the weekly business question, the independently generated 325,000-row example, the rule-based allocation workflow, Excel audit outputs, validation controls, limitations, and repository link. Its evidence will emphasize process transparency and operational checks. Supporting media may use workbook views or a process graphic; conventional forecasting or optimization charts are not required.

### Warehouse Club Market Expansion Strategy

The case study will present the geographic cover and an explicit `In progress` status. It will describe the fictional client, public-data policy, business question, current research focus, working hypothesis, included and excluded scope, and interpretation guardrails. Sections that normally imply completed findings or recommendations will instead state that the evidence and recommendations remain in development.

## Interface Design

- Add an optional `status` field to project content.
- Render `In progress` on the Warehouse Club card and detail hero only.
- Continue using the existing four-column data flow: `src/data/content.js` supplies project data to `ProjectCard.jsx`, `Projects.jsx`, `Home.jsx`, and `ProjectDetail.jsx`.
- Reuse the existing card layout, project-detail sections, typography, motion, and responsive behavior.
- Keep the next-project cycle complete across all four slugs.

## Image Design

- Forecasting: creative retail-signal prism cover.
- Credit Risk: financial-pressure versus repayment-capacity balance cover.
- Allocation: distribution-center-to-store allocation-flow cover.
- Warehouse Club: regional market-expansion map cover.
- Store production assets under `public/images/` with descriptive filenames.
- Preserve the existing 4:3 card crop, grayscale default, and color-on-hover behavior.

## Testing and Validation

- Add focused content tests proving exactly four unique projects exist.
- Test that both new project routes resolve.
- Test that only Warehouse Club carries the `In progress` status.
- Test that every project references a local cover asset and a valid GitHub URL.
- Run the focused tests, full test suite, production build, and browser review of the projects index and both new detail routes.

## Non-goals

- No deployment, push, pull request, or unrelated visual redesign.
- No new charting dependency or custom page architecture.
- No completion claims for Warehouse Club research.
- No changes to the analytical project repositories.
