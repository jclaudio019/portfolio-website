# Portfolio Interactivity and Responsive Layout Design

## Goal

Make the portfolio easier to explore and more convincing on modern screens by replacing the static Time-Series figures with interactive evidence, connecting skills to the project pages that prove them, placing the unfinished Warehouse project last, and allowing the interface to use more of the available viewport without sacrificing readable prose.

## Scope

- Replace the Time-Series Brownian Bridge PNG with an interactive, progressive path explorer.
- Replace the two static forecast PNGs with responsive, hoverable unemployment and S&P 500 forecast views.
- Use analytical values produced from the existing R final project; do not invent or silently recompute different results in the browser.
- Add verified project technologies and modeling skills to the Skills page, including Machine Learning, scikit-learn, XGBoost, statsmodels, Prophet, ARIMA, NumPy, Jupyter, and pytest.
- Connect project-supported skills to the relevant internal case-study pages.
- Reorder Time-Series Analysis to Project 04 and Warehouse Club Market Expansion to Project 05.
- Make Project 04 link forward to Project 05, and stop navigation after Project 05.
- Widen the site shell and make charts, imagery, typography, and spacing adapt across mobile, laptop, desktop, and large desktop widths.

## Design Direction

Preserve the current dark editorial analytics identity. Increase interactivity and usable width without turning the portfolio into a dashboard or replacing its established typography, purple accent, restrained motion, and case-study structure.

The implementation will reuse React, Tailwind, Framer Motion, and Recharts already present in the repository. It will not embed exported Plotly HTML, add Plotly.js, or introduce another charting dependency.

## Time-Series Visualization Design

### Brownian Bridge Explorer

The static path image will become a responsive interactive component that explains why the process is unusual:

- Draw the two-dimensional path progressively from the fixed starting point to the fixed endpoint.
- Provide Play/Replay and Pause controls.
- Provide a native range slider so the visitor can inspect any step directly.
- Show the current step, normalized time, X coordinate, and Y coordinate.
- Keep start, current, and end markers visually distinct.
- Preserve a usable non-animated state for reduced-motion users.
- Use a fixed, exported path from the executed R notebook so the website and public analysis show the same simulation.

### Forecast Explorer

The unemployment and S&P 500 views will share one responsive forecast component with two tabs:

- Show the observed series, forecast point estimate, forecast boundary, and 95% interval.
- Use hover tooltips for time/index, observed value, forecast value, and interval bounds.
- Keep the uncertainty band visually secondary to the observed and forecast lines.
- Label the S&P 500 horizontal axis as an observation index because the retained workbook does not contain a verified calendar-date field.
- Keep the existing educational and investment-use caveats.

The component will replace the three static Time-Series gallery entries. The old PNGs will be removed once the interactive views pass visual validation.

## Skills and Project Evidence Design

### Skill Inventory

Organize the Skills page into six concise groups:

1. Analytics & Operations
2. Programming & Data
3. Machine Learning & Forecasting
4. Visualization
5. Business & Research
6. Statistical Methods

Add missing technologies only when they are supported by current portfolio projects or existing professional-experience content. Keep narrow libraries such as `astsa` and `XlsxWriter` as project technology tags rather than headline skills because broader, recruiter-readable skills already represent that work.

### Evidence Navigation

Every skill with public project evidence will include the related project slug or slugs in the content data:

- If a skill has one related project, selecting it navigates directly to that internal project page.
- If a skill has multiple related projects, selecting it reveals a compact, accessible list of project-title links beside or below the skill group.
- Selecting a project title navigates to the internal case study.
- The project page remains the place where a visitor chooses **View on GitHub** for notebooks, code, and deeper technical evidence.
- Skills supported only by professional experience remain visible but do not receive fabricated project links.

The interaction must work by keyboard, expose expanded state to assistive technology, and close or replace the previous selection when another multi-project skill is selected.

## Project Order and Navigation

The canonical project sequence will be:

1. Retail Demand Forecasting
2. Credit Risk Probability of Default
3. Retail Allocation Simulator
4. Time-Series Analysis & Forecasting in R
5. Warehouse Club Market Expansion — `In progress`

The project array remains the single source of truth for card numbering and next-project navigation. Next-project navigation will be non-circular: Project 04 points to Project 05, and Project 05 has no next-project link. The Warehouse page continues to stop after its business problem and in-progress message.

## Responsive Layout Design

- Replace the 1,100-pixel Project Detail cap with the same wider fluid shell used by the main portfolio pages.
- Set the shared page shell maximum width to 1,600 pixels while retaining responsive horizontal gutters.
- Keep long-form paragraphs and introductory copy within a readable line length even when charts and imagery use the wider shell.
- Let hero media, interactive charts, project grids, and galleries use the additional width.
- Replace fixed gallery minimum heights with aspect-ratio or content-driven sizing so images do not create oversized empty areas on small screens.
- Retain single-column mobile layouts and allow multi-column sections only when the viewport provides sufficient space.
- Prevent horizontal overflow in tables, controls, navigation, charts, and skill evidence lists.
- Validate at representative mobile, tablet/laptop, desktop, and large-desktop sizes.

## Data and Component Boundaries

- `src/data/content.js` remains the source of project order, technology tags, skill groups, and skill-to-project evidence mappings.
- Add one exported Time-Series chart-data file generated from the final R analysis.
- Add one focused Time-Series interactive chart component rather than embedding chart logic in `ProjectDetail.jsx`.
- `ProjectDetail.jsx` will lazy-load the Time-Series component using the same pattern as the existing Retail Forecast and Credit Risk interactive components.
- `Skills.jsx` owns only presentation and selection state; evidence relationships remain in content data.
- `Projects.jsx` requires no filtering mode because skills lead directly to project evidence.

## Error and Fallback Behavior

- If chart data is unavailable, show a compact analytical-visualization-unavailable message without blocking the rest of the project page.
- If a skill references no valid project slug, render it as non-interactive rather than creating a broken link.
- Preserve the existing Suspense loading treatment for lazy interactive components.
- Keep chart controls usable without animation and without a pointer device.

## Testing and Validation

- Add content tests for the canonical five-project order and Warehouse-last rule.
- Add navigation tests proving Project 04 links to Project 05 and Project 05 has no next-project link.
- Add Skills tests for direct single-project navigation, multi-project disclosure, keyboard-accessible controls, and valid related slugs.
- Add focused tests for Brownian Bridge play/pause, slider updates, fixed endpoints, and reduced-motion-safe behavior.
- Add forecast-view tests for series switching and the presence of observed, forecast, and interval data.
- Run the complete test suite and production build.
- Perform browser validation at mobile, laptop, desktop, and large-desktop viewport sizes.
- Verify the public project order, skill navigation, Time-Series interactions, and absence of browser console errors after deployment.

## Non-Goals

- No new charting package.
- No changes to model specifications or analytical conclusions.
- No claim that the educational forecasts are production-ready or investment advice.
- No fabricated project evidence for professional skills that are not demonstrated in the public repositories.
- No redesign of the site’s typography, palette, navigation identity, or unrelated case-study content.
- No expansion of the unfinished Warehouse analysis.
