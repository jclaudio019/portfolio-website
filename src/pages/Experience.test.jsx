import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Experience from "./Experience";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

beforeEach(() => {
    window.IntersectionObserver = class {
        observe() {}
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

test("renders impact-first experience and compact professional context", () => {
    act(() => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Experience />
        </MemoryRouter>
    ));

    const areas = [...container.querySelectorAll("[data-testid='experience-impact-area']")];
    expect(areas.map(({ textContent }) => textContent)).toEqual([
        expect.stringContaining("Forecasting, Inventory & Decision Support"),
        expect.stringContaining("Automation, Reporting & Data Validation"),
        expect.stringContaining("Finance, Modeling & Performance Analysis"),
    ]);
    expect(container.textContent).toContain("Organized by the problems I solve, not job titles.");
    expect(container.textContent).toContain("Professional Context");
    expect(container.textContent).toContain("Related public case studies");
    expect(container.textContent).toContain("Designed the allocation logic and validation rules, then led the implementation of a workflow used by my current team.");
    expect(container.textContent).not.toContain("working-capital");
    expect(container.textContent).not.toContain("Warehouse Club Market Expansion");
    expect(container.textContent).toContain("EssilorLuxottica — Supply Chain Analyst");
    expect(container.textContent).not.toContain("April 2022");
    expect(container.textContent).not.toContain("Home Depot");

    const projectLinks = [...container.querySelectorAll("[data-testid='experience-project-link']")];
    expect(projectLinks.some(({ href }) => href.endsWith("/projects/credit-risk-pd-model"))).toBe(true);
    expect(container.querySelector("a[href='https://www.linkedin.com/in/jclaudio019']")).not.toBeNull();
    expect(container.textContent).toContain("Resume available on request");
});
