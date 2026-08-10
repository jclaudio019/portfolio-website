# Backtesting System Portfolio Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Backtesting System as completed case study 06, present its two-stage architecture clearly to employers, and keep Warehouse Club Market Expansion last as in-progress case study 07.

**Architecture:** Add one centralized project record and one small responsive architecture component following existing project-detail patterns. Reuse the current lazy-loading, Tailwind styling, project ordering, status handling, and next-project navigation; do not add an interactive trading simulator or a new dependency.

**Tech Stack:** React, JavaScript, Tailwind CSS, Framer Motion, Jest, React Testing Library, CRACO.

## Global Constraints

- Preserve the current layout, typography, colors, animations, routes, responsiveness, navigation, and reusable project-detail structure.
- Public wording must say “graduate coursework”; do not display “FM 5151”.
- Present two related coursework assignments and one EMA crossover strategy.
- Do not claim profitability, production readiness, live trading, real-money execution, or multi-strategy support.
- Keep Backtesting System separate from Black-Scholes Options Modeling.
- Keep Warehouse Club Market Expansion last and marked `In progress`.
- Do not add an interactive simulator or a chart that implies performance results.
- Preserve the unrelated untracked `website_replica-preview.html` file.

---

### Task 1: Add the completed case-study record in the required order

**Files:**
- Modify: `src/data/content.test.js`
- Modify: `src/data/content.js`

**Interfaces:**
- Consumes: the existing `projects` array and `publishedProjects` filter
- Produces: a project with slug `backtesting-system` at array position 6 and Warehouse Club at position 7

- [ ] **Step 1: Update the ordering and truthfulness test first**

Change the first test's expected slugs to:

```javascript
[
    "retail-demand-forecasting",
    "credit-risk-pd-model",
    "retail-allocation-simulator",
    "time-series-analysis-r",
    "black-scholes-options-modeling",
    "backtesting-system",
    "warehouse-club-market-expansion",
]
```

Rename it to `publishes six completed case studies and one in-progress case study`, assert a set size of `7`, and add:

```javascript
test("presents the Backtesting System architecture without unsupported trading claims", () => {
    const project = projects.find(({ slug }) => slug === "backtesting-system");

    expect(project.title).toBe("Backtesting System");
    expect(project.status).toBeUndefined();
    expect(project.github).toBe("https://github.com/jclaudio019/backtesting-system");
    expect(project.metrics).toEqual([
        { label: "Strategy demonstrated", value: "1" },
        { label: "Docker services", value: "4" },
        { label: "QuestDB tables", value: "2" },
        { label: "Related coursework assignments", value: "2" },
    ]);
    const copy = JSON.stringify(project);
    expect(copy).toContain("graduate coursework");
    expect(copy).toContain("EMA crossover");
    expect(copy).not.toContain("FM 5151");
    expect(copy.toLowerCase()).not.toContain("profitable");
    expect(copy.toLowerCase()).not.toContain("production-ready");
});
```

- [ ] **Step 2: Run the content test and confirm it fails**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/data/content.test.js
```

Expected: FAIL because `backtesting-system` is absent.

- [ ] **Step 3: Add the minimum project record before Warehouse Club**

Add this record to `src/data/content.js` immediately after Black-Scholes:

```javascript
{
    slug: "backtesting-system",
    title: "Backtesting System",
    category: "Financial Systems",
    summary:
        "Connected two graduate coursework assignments into a documented workflow spanning historical backtesting and a small paper-trading event pipeline.",
    image: `${process.env.PUBLIC_URL}/images/backtesting-system-hero.png`,
    imageCaption:
        "Two analytical lanes connect historical strategy evaluation with a paper-trading event workflow.",
    tech: ["Python", "FastAPI", "Docker", "QuestDB", "Alpaca"],
    github: "https://github.com/jclaudio019/backtesting-system",
    metrics: [
        { label: "Strategy demonstrated", value: "1" },
        { label: "Docker services", value: "4" },
        { label: "QuestDB tables", value: "2" },
        { label: "Related coursework assignments", value: "2" },
    ],
    metricsNote:
        "Educational system using one EMA crossover strategy and Alpaca's paper-trading interface; no profitability or live-trading claim.",
    problem:
        "A strategy notebook can show historical behavior, but it does not explain how signals, orders, broker updates, and stored events connect in an operating workflow. This project examines both stages while keeping their purposes and limitations clear.",
    solutionParagraphs: [
        "The first graduate coursework assignment produced a reusable Python package for loading market data, defining strategies, running historical tests, and reviewing portfolio behavior.",
        "The second assignment extended that learning into a small paper-trading architecture: one EMA crossover strategy sends paper orders through Alpaca, a listener receives broker updates, FastAPI provides a narrow data interface, and QuestDB stores engine runs and trade events.",
        "After the coursework, I used AI-assisted development to repair package imports, align Docker service configuration, make the run identifier consistent across the event flow, add focused tests, and prepare the repository for public review.",
    ],
    dataset:
        "The historical lane uses the sample market data retained with the coursework. The paper-trading lane is designed for Alpaca paper-account market data and trade updates; automated validation uses mocks and sample API records rather than live orders or credentials.",
    methodologySummary:
        "The case study follows a strategy from historical evaluation into an event-driven paper-trading workflow, with one shared identifier connecting the engine run, client order IDs, broker updates, and stored trade events.",
    methodology: [
        "Used the local backtestlib package to separate market data, strategy logic, backtest execution, and portfolio evaluation.",
        "Applied one short- and long-period EMA crossover rule in the broker-connected coursework flow.",
        "Separated QuestDB, FastAPI, crossover, and listener responsibilities into four Docker Compose services.",
        "Encoded the strategy-run identifier in client order IDs so listener events can be traced to the matching engine run.",
        "Stored run metadata and trade updates in two QuestDB tables through focused API endpoints.",
        "Validated the repaired paths with isolated unit tests and a database/API smoke test that does not start the trading services.",
    ],
    findings:
        "The main result is architectural rather than financial. Historical testing and broker-connected execution answer different questions, and a shared run identifier makes the relationship between strategy activity, order updates, and stored records inspectable.",
    implications:
        "The project demonstrates how analytical code can be organized into clearer service boundaries and validation points. That structure makes assumptions and event flow easier to explain, test, and review before considering broader strategy or infrastructure work.",
    conclusionParagraphs: [
        "The completed case study connects two pieces of graduate coursework into one documented view of historical testing and paper-trading system design.",
        "It is an educational architecture demonstration, not evidence of strategy profitability, a production trading platform, or a recommendation to trade.",
    ],
    limitations: [
        "The broker-connected flow demonstrates one EMA crossover strategy and does not compare multiple strategies.",
        "Historical results do not establish future performance or profitability.",
        "The paper-trading path requires the user's own Alpaca paper credentials and is not exercised during automated validation.",
        "The system does not model transaction costs, market impact, production monitoring, or real-money execution.",
    ],
},
```

- [ ] **Step 4: Run the content test**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/data/content.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit the project content**

```bash
git add src/data/content.js src/data/content.test.js
git commit -m "Add Backtesting System case study"
```

### Task 2: Build the responsive two-lane architecture diagram

**Files:**
- Create: `src/components/BacktestingArchitecture.jsx`
- Create: `src/components/BacktestingArchitecture.test.jsx`

**Interfaces:**
- Consumes: no props and no remote data
- Produces: default React component `BacktestingArchitecture` with `data-testid="backtesting-architecture"`

- [ ] **Step 1: Write the failing semantic rendering test**

Create `src/components/BacktestingArchitecture.test.jsx`:

```jsx
import { act } from "react";
import { createRoot } from "react-dom/client";
import BacktestingArchitecture from "./BacktestingArchitecture";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("shows the historical and paper-trading lanes in order", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => root.render(<BacktestingArchitecture />));

    const lanes = container.querySelectorAll("ol");
    expect(container.querySelector("[data-testid='backtesting-architecture']")).not.toBeNull();
    expect(lanes).toHaveLength(2);
    expect(lanes[0].textContent).toContain("NotebookbacktestlibStrategy & portfolio review");
    expect(lanes[1].textContent).toContain("EMA crossoverAlpaca paper accountTrade listenerFastAPIQuestDB");

    act(() => root.unmount());
});
```

- [ ] **Step 2: Run the test and confirm the component is missing**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/BacktestingArchitecture.test.jsx
```

Expected: FAIL because `BacktestingArchitecture.jsx` does not exist.

- [ ] **Step 3: Implement one static responsive component**

Create `src/components/BacktestingArchitecture.jsx` with two semantic ordered lists, reusing only Tailwind classes already used by the project pages:

```jsx
const lanes = [
    {
        label: "Historical backtesting",
        nodes: ["Notebook", "backtestlib", "Strategy & portfolio review"],
    },
    {
        label: "Paper-trading event flow",
        nodes: ["EMA crossover", "Alpaca paper account", "Trade listener", "FastAPI", "QuestDB"],
    },
];

export default function BacktestingArchitecture() {
    return (
        <figure
            data-testid="backtesting-architecture"
            className="mt-8 overflow-hidden border border-navy/10 bg-navy px-4 py-6 text-white sm:px-6"
        >
            <figcaption className="font-mono text-xs uppercase tracking-widest text-teal">
                System architecture
            </figcaption>
            <div className="mt-5 space-y-6">
                {lanes.map((lane) => (
                    <section key={lane.label} aria-label={lane.label}>
                        <h3 className="text-sm font-semibold text-white">{lane.label}</h3>
                        <ol className="mt-3 grid gap-2 sm:grid-flow-col sm:auto-cols-fr">
                            {lane.nodes.map((node, index) => (
                                <li key={node} className="relative border border-white/20 bg-white/5 px-3 py-3 text-sm">
                                    {node}
                                    {index < lane.nodes.length - 1 ? (
                                        <span aria-hidden="true" className="mt-2 block text-teal sm:absolute sm:-right-2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
                                            →
                                        </span>
                                    ) : null}
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>
        </figure>
    );
}
```

The arrows are decorative; the ordered lists preserve meaning without them. The grid stacks at small widths and does not create horizontal overflow.

- [ ] **Step 4: Run the focused test**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/BacktestingArchitecture.test.jsx
```

Expected: PASS.

- [ ] **Step 5: Commit the diagram**

```bash
git add src/components/BacktestingArchitecture.jsx src/components/BacktestingArchitecture.test.jsx
git commit -m "Add Backtesting System architecture diagram"
```

### Task 3: Integrate the diagram and repair next-project navigation

**Files:**
- Modify: `src/pages/ProjectDetail.jsx`
- Modify: `src/components/ProjectStatus.test.jsx`

**Interfaces:**
- Consumes: default export from `../components/BacktestingArchitecture`
- Produces: lazy-loaded architecture diagram on `/projects/backtesting-system` and the sequence 05 → 06 → 07

- [ ] **Step 1: Update the navigation and detail tests first**

Change the publishing test to assert `7` projects, Backtesting second-to-last completed, and Warehouse last. Replace the old Black-Scholes-to-Warehouse test with:

```jsx
test("links completed Black-Scholes project 05 to Backtesting System project 06", async () => {
    await act(async () => root.render(detailRoute("black-scholes-options-modeling")));
    const next = container.querySelector("[data-testid='next-project']");
    expect(next.textContent).toContain("Backtesting System");
    expect(next.getAttribute("href")).toBe("/projects/backtesting-system");
});

test("shows the Backtesting architecture and links project 06 to Warehouse project 07", async () => {
    await act(async () => root.render(detailRoute("backtesting-system")));
    const page = container.querySelector("[data-testid='project-detail-page']");
    expect(page.textContent).toContain("Backtesting System");
    expect(page.textContent).toContain("System architecture");
    expect(page.textContent).not.toContain("FM 5151");
    const next = container.querySelector("[data-testid='next-project']");
    expect(next.textContent).toContain("Warehouse Club Market Expansion");
    expect(next.getAttribute("href")).toBe("/projects/warehouse-club-market-expansion");
});
```

- [ ] **Step 2: Run the status test and confirm the missing integration**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/ProjectStatus.test.jsx
```

Expected: FAIL because the architecture component is not rendered from `ProjectDetail`.

- [ ] **Step 3: Lazy-load and render the component in the Findings section**

Add with the existing lazy imports in `src/pages/ProjectDetail.jsx`:

```jsx
const BacktestingArchitecture = lazy(() => import("../components/BacktestingArchitecture"));
```

Next to the other project-specific Findings components, add:

```jsx
{project.slug === "backtesting-system" ? (
    <Suspense
        fallback={
            <div className="mt-6 flex aspect-[16/6] items-center justify-center border border-dashed border-navy/20 bg-surface/50">
                <span className="font-mono text-xs uppercase tracking-widest text-navy/60">Loading architecture…</span>
            </div>
        }
    >
        <BacktestingArchitecture />
    </Suspense>
) : null}
```

- [ ] **Step 4: Run the detail tests**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/ProjectStatus.test.jsx src/components/BacktestingArchitecture.test.jsx
```

Expected: PASS, including the Warehouse in-progress section suppression and no-next-project behavior.

- [ ] **Step 5: Commit the detail integration**

```bash
git add src/pages/ProjectDetail.jsx src/components/ProjectStatus.test.jsx
git commit -m "Integrate Backtesting System project flow"
```

### Task 4: Add the cover image without changing the visual system

**Files:**
- Create: `public/images/backtesting-system-hero.png`

**Interfaces:**
- Consumes: the existing project-card image ratio and dark navy, purple, teal visual language
- Produces: a single optimized PNG referenced by the project record

- [ ] **Step 1: Generate one recruiter-facing architecture cover**

Use the image-generation skill with this exact direction:

```text
A premium abstract editorial illustration for a data analytics portfolio case study titled Backtesting System. Dark navy background, restrained purple and teal light, two parallel analytical lanes that begin as historical market traces and converge into clean modular system nodes, subtle financial-model geometry, no readable text, no currency symbols, no profit arrows, no broker logos, no computer mockup, no credentials, no photorealistic people. Sophisticated, minimal, high contrast, consistent with a modern analytical portfolio. Wide 16:9 composition with safe central detail for responsive cropping.
```

Save the approved output as `public/images/backtesting-system-hero.png`.

- [ ] **Step 2: Verify image dimensions, type, and reference**

Run:

```bash
file public/images/backtesting-system-hero.png
rg -n "backtesting-system-hero.png" src/data/content.js
```

Expected: a valid PNG and exactly one content reference.

- [ ] **Step 3: Commit the cover**

```bash
git add public/images/backtesting-system-hero.png
git commit -m "Add Backtesting System cover art"
```

### Task 5: Validate recruiter-facing behavior and production output

**Files:**
- Verify: `src/data/content.js`
- Verify: `src/pages/ProjectDetail.jsx`
- Verify: `src/components/BacktestingArchitecture.jsx`
- Verify: `public/images/backtesting-system-hero.png`

**Interfaces:**
- Consumes: all earlier tasks
- Produces: a tested production build ready for commit, push, and Cloudflare deployment

- [ ] **Step 1: Run focused tests, then the full suite**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/data/content.test.js src/components/BacktestingArchitecture.test.jsx src/components/ProjectStatus.test.jsx
CI=true ./node_modules/.bin/react-scripts test --watchAll=false
```

Expected: all tests pass.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: successful production build with no compile error.

- [ ] **Step 3: Review desktop and mobile routes locally**

Open and inspect at desktop and mobile widths:

```text
http://localhost:3000/projects
http://localhost:3000/projects/black-scholes-options-modeling
http://localhost:3000/projects/backtesting-system
http://localhost:3000/projects/warehouse-club-market-expansion
```

Confirm:

```text
Projects page: Backtesting is card 06 and Warehouse is card 07.
Backtesting cover: crops cleanly without text or logos.
Architecture: both lanes remain readable with no horizontal overflow.
Navigation: Black-Scholes → Backtesting → Warehouse.
Warehouse: In progress, business problem only, and no next-project link.
Copy: no FM 5151, profitability, production, or live-trading claim.
```

- [ ] **Step 4: Review the exact release diff**

Run:

```bash
git status --short
git diff --check
git diff --stat HEAD~4..HEAD
```

Expected: no whitespace errors; the untracked `website_replica-preview.html` remains untouched and excluded.

- [ ] **Step 5: Push and deploy only after both repositories pass**

Run the repository's established push and Cloudflare deployment commands after confirming both repos are clean except for the intentionally preserved preview file. Verify the deployed `/projects/backtesting-system` route and the three-project navigation sequence.
