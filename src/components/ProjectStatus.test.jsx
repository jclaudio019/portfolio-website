import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "../pages/ProjectDetail";
import { publishedProjects } from "../data/content";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

beforeEach(() => {
    window.scrollTo = jest.fn();
    window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
    global.ResizeObserver = class {
        constructor(callback) { this.callback = callback; }
        observe() { this.callback([{ contentRect: { width: 800, height: 416 } }]); }
        unobserve() {}
        disconnect() {}
    };
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
});

const render = (element) => act(() => root.render(element));

const detailRoute = (slug) => (
    <MemoryRouter
        initialEntries={[`/projects/${slug}`]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
        <Routes>
            <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
    </MemoryRouter>
);

const renderDetail = (slug) => render(detailRoute(slug));

test("keeps Backtesting out of the published portfolio", () => {
    expect(publishedProjects).toHaveLength(6);
    expect(publishedProjects.some(({ slug }) => slug === "backtesting-system")).toBe(false);
    expect(publishedProjects.at(-1).slug).toBe("warehouse-club-market-expansion");
    expect(publishedProjects.at(-1).status).toBe("In progress");
});

test("resolves the allocation detail route without an in-progress label", () => {
    renderDetail("retail-allocation-simulator");

    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("Retail Allocation Simulator");
    expect(container.querySelector("[data-testid='project-status']")).toBeNull();
    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("Methodology");
    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("AI-Assisted Development");
    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain(
        "The simulator remains a rule-based analytical workflow"
    );
});

test("labels forecasting values as exposure rather than realized outcomes", () => {
    renderDetail("retail-demand-forecasting");

    const text = container.querySelector("[data-testid='project-detail-page']").textContent;
    expect(text).toContain("Under-forecast retail-value exposure");
    expect(text).toContain("Over-forecast retail-value exposure");
    expect(text).not.toContain("Missed-sales retail value");
    expect(text).not.toContain("Excess-inventory retail value");
});

test("limits the warehouse detail route to its business problem and in-progress message", () => {
    renderDetail("warehouse-club-market-expansion");

    const page = container.querySelector("[data-testid='project-detail-page']");
    expect(page.textContent).toContain("Warehouse Club Market Expansion");
    expect(container.querySelector("[data-testid='project-status']").textContent).toBe("In progress");
    expect(page.textContent).toContain("Business Problem");
    expect(page.textContent).toContain("This project is in progress. I’ll update this page as the work develops.");
    expect(page.textContent).not.toContain("Solution");
    expect(page.textContent).not.toContain("Dataset");
    expect(page.textContent).not.toContain("Methodology");
    expect(page.textContent).not.toContain("Findings");
    expect(page.textContent).not.toContain("Business Implications");
    expect(page.textContent).not.toContain("Conclusion");
    expect(page.textContent).not.toContain("Limitations");
    expect(container.querySelector("[data-testid='next-project']")).toBeNull();
});

test("links project 04 to completed Black-Scholes project 05", async () => {
    await act(async () => root.render(detailRoute("time-series-analysis-r")));

    const next = container.querySelector("[data-testid='next-project']");
    expect(next.textContent).toContain("Black-Scholes Options Modeling");
    expect(next.getAttribute("href")).toBe("/projects/black-scholes-options-modeling");
});

test("links completed Black-Scholes project 05 to Warehouse project 06", async () => {
    await act(async () => root.render(detailRoute("black-scholes-options-modeling")));

    const next = container.querySelector("[data-testid='next-project']");
    expect(next.textContent).toContain("Warehouse Club Market Expansion");
    expect(next.getAttribute("href")).toBe("/projects/warehouse-club-market-expansion");
});

test("does not expose the Backtesting detail route", async () => {
    await act(async () => root.render(detailRoute("backtesting-system")));
    expect(container.querySelector("[data-testid='project-not-found']")).not.toBeNull();
});

test("uses the fluid site shell on project pages", () => {
    renderDetail("retail-allocation-simulator");

    const page = container.querySelector("[data-testid='project-detail-page']");
    expect(page.firstElementChild.classList.contains("site-shell")).toBe(true);
    expect(page.querySelector("h1").classList.contains("fluid-page-title")).toBe(true);
});

test("opens the forecasting case study with a project-data banner", () => {
    renderDetail("retail-demand-forecasting");

    expect(container.querySelector("[data-testid='project-data-cover-retail-demand-forecasting']")).not.toBeNull();
    expect(container.querySelector("[data-testid='project-hero-image']")).toBeNull();
});

test("keeps the project hero image fully visible at a natural reading size", () => {
    renderDetail("retail-allocation-simulator");

    const frame = container.querySelector("[data-testid='project-hero-frame']");
    const image = container.querySelector("[data-testid='project-hero-image']");

    expect(frame.classList.contains("max-w-5xl")).toBe(true);
    expect(frame.classList.contains("mx-auto")).toBe(true);
    expect(image.classList.contains("max-h-[68vh]")).toBe(true);
    expect(image.classList.contains("object-contain")).toBe(true);
    expect(image.classList.contains("object-center")).toBe(true);
});
