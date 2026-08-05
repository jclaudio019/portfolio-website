# Warehouse In-Progress Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** End the unfinished Warehouse project detail page after its verified business problem and a short in-progress notice.

**Architecture:** Reuse the shared `ProjectDetail` route and its existing `project.status` field. Completed projects retain the current full case-study renderer; a project whose status is exactly `In progress` skips metrics and every completed-work section after the business problem.

**Tech Stack:** React 18, React Router 6, Tailwind CSS, Jest/react-scripts.

## Global Constraints

- Keep the Warehouse header, summary, `In progress` badge, cover image, image caption, GitHub link, and business problem.
- End the Warehouse case study with: “This project is in progress. This page will be updated as the research and analysis develop.”
- Do not render metrics, solution, dataset, methodology, findings, business implications, conclusion, next steps, limitations, technologies, or next-project navigation for an `In progress` project.
- Do not change completed project pages, project data, routes, dependencies, or `website_replica-preview.html`.

---

### Task 1: Short in-progress project detail

**Files:**
- Modify: `src/components/ProjectStatus.test.jsx:64-69`
- Modify: `src/pages/ProjectDetail.jsx:121-380`

**Interfaces:**
- Consumes: `project.status`, `project.problem`, and the existing shared `Section` component.
- Produces: Conditional detail rendering for projects whose status equals `In progress`; no new exported interface.

- [ ] **Step 1: Write the failing route-rendering test**

Extend the Warehouse detail-route test with assertions on the rendered page text:

```jsx
const page = container.querySelector("[data-testid='project-detail-page']");
expect(page.textContent).toContain("Business Problem");
expect(page.textContent).toContain("This project is in progress. This page will be updated as the research and analysis develop.");
expect(page.textContent).not.toContain("Data policy");
expect(page.textContent).not.toContain("Project status");
expect(page.textContent).not.toContain("Solution");
expect(page.textContent).not.toContain("Dataset");
expect(page.textContent).not.toContain("Methodology");
expect(page.textContent).not.toContain("Findings");
expect(page.textContent).not.toContain("Business Implications");
expect(page.textContent).not.toContain("Conclusion");
expect(page.textContent).not.toContain("Limitations");
expect(page.textContent).not.toContain("Technologies");
expect(container.querySelector("[data-testid='next-project']")).toBeNull();
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/ProjectStatus.test.jsx
```

Expected: the Warehouse test fails because the full case-study sections and next-project link still render and the final in-progress message is absent.

- [ ] **Step 3: Add the minimal conditional renderer**

In `ProjectDetail`, derive the exact status flag:

```jsx
const isInProgress = project.status === "In progress";
```

Wrap the existing metrics block at lines 121-138 in `{!isInProgress && (...)}`. Immediately after the Business Problem section, insert the following conditional opening and in-progress branch:

```jsx
{isInProgress ? (
    <Section label="In progress">
        <p className="leading-relaxed">
            This project is in progress. This page will be updated as the research and analysis develop.
        </p>
    </Section>
) : (
    <>
```

Keep the existing completed-project sections inside that fragment and close it immediately after the Technologies section:

```jsx
    </>
)}
```

Render the existing next-project navigation only when `next && !isInProgress`. Add `expect(page.textContent).toContain("Methodology")` to the allocation detail-route test so the completed-project path is explicitly protected.

- [ ] **Step 4: Run the focused and full test suites**

Run:

```bash
CI=true ./node_modules/.bin/react-scripts test --watchAll=false src/components/ProjectStatus.test.jsx
CI=true ./node_modules/.bin/react-scripts test --watchAll=false
```

Expected: the focused suite passes 4 tests and the full suite passes 27 tests.

- [ ] **Step 5: Build and visually verify**

Run:

```bash
PUBLIC_URL=/ npm run build
```

Expected: the optimized production build succeeds for `/`. Verify the Warehouse route contains only the approved header/hero, Business Problem, and In progress sections, while a completed project route still renders its full case study.

- [ ] **Step 6: Commit and deploy after verification**

```bash
git add src/components/ProjectStatus.test.jsx src/pages/ProjectDetail.jsx docs/superpowers/plans/2026-08-05-warehouse-in-progress-detail.md
git commit -m "fix: shorten warehouse in-progress page"
git push origin main
npx --yes wrangler@latest pages deploy build --project-name=jose-claudio-portfolio --branch=main
```

Verify `https://joseoclaudio.com/projects/warehouse-club-market-expansion` after deployment.
