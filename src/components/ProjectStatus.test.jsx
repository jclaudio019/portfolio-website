import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "../pages/ProjectDetail";
import { projects } from "../data/content";

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

test("shows in-progress status on the warehouse card", () => {
    const project = projects.find(({ slug }) => slug === "warehouse-club-market-expansion");

    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><ProjectCard project={project} index={3} /></MemoryRouter>);

    expect(container.querySelector("[data-testid='project-status']").textContent).toBe("In progress");
});

test("does not add a status badge to completed project cards", () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><ProjectCard project={projects[0]} index={0} /></MemoryRouter>);

    expect(container.querySelector("[data-testid='project-status']")).toBeNull();
});

test("resolves the allocation detail route without an in-progress label", () => {
    renderDetail("retail-allocation-simulator");

    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("Retail Allocation Simulator");
    expect(container.querySelector("[data-testid='project-status']")).toBeNull();
    expect(container.querySelector("[data-testid='project-detail-page']").textContent).toContain("Methodology");
});

test("shows in-progress status on the warehouse detail route", () => {
    renderDetail("warehouse-club-market-expansion");

    expect(container.querySelector("[data-testid='project-status']").textContent).toBe("In progress");
    expect(container.querySelector("img").getAttribute("alt")).toBe("Warehouse Club Market Expansion project overview");

    const page = container.querySelector("[data-testid='project-detail-page']");
    expect(page.textContent).toContain("Business Problem");
    expect(page.textContent).toContain("This project is in progress. I’ll update this page as the work develops.");
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
});

test("links project 04 to the in-progress warehouse project 05", async () => {
    await act(async () => root.render(detailRoute("time-series-analysis-r")));

    const next = container.querySelector("[data-testid='next-project']");
    expect(next.textContent).toContain("Warehouse Club Market Expansion");
    expect(next.getAttribute("href")).toBe("/projects/warehouse-club-market-expansion");
});

test("stops project navigation after warehouse project 05", () => {
    renderDetail("warehouse-club-market-expansion");

    expect(container.querySelector("[data-testid='next-project']")).toBeNull();
});

test("uses the fluid site shell on project pages", () => {
    renderDetail("retail-allocation-simulator");

    const page = container.querySelector("[data-testid='project-detail-page']");
    expect(page.firstElementChild.classList.contains("site-shell")).toBe(true);
    expect(page.querySelector("h1").classList.contains("fluid-page-title")).toBe(true);
});
