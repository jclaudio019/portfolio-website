import { act } from "react";
import { createRoot } from "react-dom/client";
import RetailForecastCharts from "./RetailForecastCharts";

global.IS_REACT_ACT_ENVIRONMENT = true;
let container;
let root;

beforeEach(() => {
    global.ResizeObserver = class {
        constructor(callback) { this.callback = callback; }
        observe() { this.callback([{ contentRect: { width: 900, height: 320 } }]); }
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

test("presents four decision-focused charts and the expanded project scope", () => {
    act(() => root.render(<RetailForecastCharts />));
    ["selected-wape-chart", "error-direction-chart", "policy-evaluation-chart", "monte-carlo-tradeoff-chart"].forEach((testId) => {
        expect(container.querySelector(`[data-testid='${testId}']`)).not.toBeNull();
    });
    expect(container.textContent).toContain("2,000");
    expect(container.textContent).toContain("controlled sensitivity study");
    expect(container.textContent).not.toContain("$3.01M");
});

test("category selection updates selected-model and risk results", () => {
    act(() => root.render(<RetailForecastCharts />));
    const tabs = container.querySelectorAll("button[role='tab']");
    act(() => tabs[1].click());
    expect(container.querySelector("[data-testid='selected-wape-chart']").textContent).toContain("Linear Regression (Full)");
    expect(container.querySelector("[data-testid='policy-evaluation-chart']").textContent).toContain("HOBBIES");
    act(() => tabs[2].click());
    expect(container.querySelector("[data-testid='selected-wape-chart']").textContent).toContain("Prophet Flexible");
    expect(container.querySelector("[data-testid='monte-carlo-tradeoff-chart']").textContent).toContain("HOUSEHOLD");
});

test("each chart uses the same readable height", () => {
    act(() => root.render(<RetailForecastCharts />));
    ["selected-wape-chart", "error-direction-chart", "policy-evaluation-chart", "monte-carlo-tradeoff-chart"].forEach((testId) => {
        expect(container.querySelector(`[data-testid='${testId}'] .recharts-responsive-container`).style.height).toBe("320px");
    });
});
