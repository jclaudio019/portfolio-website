import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Projects from "./Projects";

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

test("shows clickable skills before the case studies", () => {
    act(() => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Projects />
        </MemoryRouter>
    ));

    const skills = container.querySelector("[data-testid='portfolio-skills']");
    const caseStudies = container.querySelector("[data-testid='portfolio-case-studies']");
    expect(skills).not.toBeNull();
    expect(caseStudies).not.toBeNull();
    expect(skills.compareDocumentPosition(caseStudies) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const logisticRegression = [...skills.querySelectorAll("a")]
        .find(({ textContent }) => textContent === "Logistic Regression");
    expect(logisticRegression.getAttribute("href")).toBe("/projects/credit-risk-pd-model");
});

test("shows three numbered project highlights in the portfolio summary", () => {
    act(() => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Projects />
        </MemoryRouter>
    ));

    const highlightLinks = [...container.querySelectorAll("[data-testid='highlight-project']")];
    expect(highlightLinks.map((link) => link.getAttribute("href"))).toEqual([
        "/projects/retail-demand-forecasting",
        "/projects/time-series-analysis-r",
        "/projects/credit-risk-pd-model",
    ]);
    expect(container.textContent).toContain("Portfolio Evidence");
    expect(container.textContent).toContain("Case Studies");
    expect(container.textContent).toContain("Highlights");
    expect(container.textContent).not.toContain("Flagship");
    expect(container.textContent).not.toContain("Selected case studies");
});

test("uses project evidence as the cover for completed analytical case studies", () => {
    act(() => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Projects />
        </MemoryRouter>
    ));

    [
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "time-series-analysis-r",
        "black-scholes-options-modeling",
    ].forEach((slug) => {
        expect(container.querySelector(`[data-testid='project-data-cover-${slug}']`)).not.toBeNull();
    });

    expect(container.querySelector("[data-testid='project-image-cover-retail-allocation-simulator']")).not.toBeNull();
    expect(container.querySelector("[data-testid='project-image-cover-warehouse-club-market-expansion']")).not.toBeNull();
});
