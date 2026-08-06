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

test("publishes only completed project records", () => {
    expect(publishedProjects).toHaveLength(4);
    expect(publishedProjects.every(({ status }) => status !== "In progress")).toBe(true);
});

test("resolves the allocation detail route without an in-progress label", () => {
    renderDetail("retail-allocation-simulator");

    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("Retail Allocation Simulator");
    expect(container.querySelector("[data-testid='project-status']")).toBeNull();
    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("Methodology");
});

test("does not render the unpublished warehouse detail route", () => {
    renderDetail("warehouse-club-market-expansion");

    expect(container.querySelector("[data-testid='project-not-found']").textContent).toContain("Project not found");
    expect(container.querySelector("[data-testid='project-detail-page']")).toBeNull();
    expect(container.textContent).not.toContain("Warehouse Club Market Expansion");
    expect(container.querySelector("[data-testid='next-project']")).toBeNull();
});

test("stops project navigation after the fourth published case study", async () => {
    await act(async () => root.render(detailRoute("time-series-analysis-r")));

    expect(container.querySelector("[data-testid='next-project']")).toBeNull();
});

test("uses the fluid site shell on project pages", () => {
    renderDetail("retail-allocation-simulator");

    const page = container.querySelector("[data-testid='project-detail-page']");
    expect(page.firstElementChild.classList.contains("site-shell")).toBe(true);
    expect(page.querySelector("h1").classList.contains("fluid-page-title")).toBe(true);
});
