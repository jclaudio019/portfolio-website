import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Skills from "./Skills";

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

const renderSkills = () => act(() => root.render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Skills />
    </MemoryRouter>
));

test("opens a single-project skill directly", () => {
    renderSkills();

    const logisticRegression = [...container.querySelectorAll("a")].find(({ textContent }) => textContent === "Logistic Regression");
    expect(logisticRegression.getAttribute("href")).toBe("/projects/credit-risk-pd-model");
});

test("reveals project choices for a multi-project skill", () => {
    renderSkills();

    const decisionSupport = [...container.querySelectorAll("button")].find(({ textContent }) => textContent === "Decision Support");
    expect(decisionSupport.getAttribute("aria-expanded")).toBe("false");

    act(() => decisionSupport.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(decisionSupport.getAttribute("aria-expanded")).toBe("true");
    const links = [...container.querySelectorAll("[data-testid='skill-project-choice']")];
    expect(links.map(({ textContent }) => textContent.replace("↗", ""))).toEqual([
        "Retail Demand Forecasting",
        "Credit Risk Probability of Default",
        "Retail Allocation Simulator",
        "Time-Series Analysis & Forecasting in R",
    ]);
    expect(container.textContent).not.toContain("Warehouse Club Market Expansion");
});

test("keeps experience-only skills non-interactive", () => {
    renderSkills();

    const sql = [...container.querySelectorAll("span")].find(({ textContent }) => textContent === "SQL");
    expect(sql).not.toBeUndefined();
});
