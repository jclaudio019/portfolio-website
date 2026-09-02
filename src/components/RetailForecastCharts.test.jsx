import { act } from "react";
import { createRoot } from "react-dom/client";
import RetailForecastCharts, { paddedDomain, rollingAverage } from "./RetailForecastCharts";

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

test("one category selection updates demand, accuracy, and forecast charts", () => {
    act(() => root.render(<RetailForecastCharts />));

    act(() => container.querySelector("button[role='tab']:nth-of-type(2)").click());

    expect(container.querySelector("[data-testid='category-demand-chart']").textContent).toContain("HOBBIES");
    expect(container.querySelector("[data-testid='model-accuracy-chart']").textContent).toContain("HOBBIES");
    expect(container.querySelector("[data-testid='actual-forecast-chart']").textContent).toContain("HOBBIES");
});

test("forecast comparison uses true demand plus lowest- and highest-error model lines", () => {
    act(() => root.render(<RetailForecastCharts />));

    const chart = container.querySelector("[data-testid='actual-forecast-chart']");
    expect(chart.querySelectorAll(".recharts-line")).toHaveLength(3);
    expect(chart.textContent).toContain("True demand");
    expect(chart.textContent).toContain("Lowest error");
    expect(chart.textContent).toContain("Highest error");
    expect(chart.querySelector(".recharts-area")).toBeNull();
});

test("rollingAverage keeps the full series and uses a trailing window", () => {
    expect(rollingAverage([10, 20, 30, 50], 3)).toEqual([10, 15, 20, 100 / 3]);
});

test("paddedDomain scales to only the visible values", () => {
    expect(paddedDomain([{ actual: 100, best: 120 }, { actual: 110, best: 130 }], ["actual", "best"])).toEqual([97, 133]);
});

test("time-series charts provide timeline zoom and reset controls", () => {
    act(() => root.render(<RetailForecastCharts />));

    ["category-demand-chart", "actual-forecast-chart"].forEach((testId) => {
        const chart = container.querySelector(`[data-testid='${testId}']`);
        expect(chart.querySelector(".recharts-brush")).not.toBeNull();
        expect(chart.querySelector("button").textContent).toBe("Reset zoom");
    });
});

test("forecast comparison identifies the full 365-day smoothed view", () => {
    act(() => root.render(<RetailForecastCharts />));

    const chart = container.querySelector("[data-testid='actual-forecast-chart']");
    expect(chart.textContent.toLowerCase()).toContain("full 365-day untouched test period");
    expect(chart.textContent).toContain("28-day rolling average");
});

test("forecast comparison names the lowest- and highest-error models for each category", () => {
    act(() => root.render(<RetailForecastCharts />));

    const chart = container.querySelector("[data-testid='actual-forecast-chart']");
    expect(chart.textContent).toContain("XGBoost Faster");
    expect(chart.textContent).toContain("Naive");

    const tabs = container.querySelectorAll("button[role='tab']");
    act(() => tabs[1].click());
    expect(chart.textContent).toContain("XGBoost Shallow");
    expect(chart.textContent).toContain("Naive");

    act(() => tabs[2].click());
    expect(chart.textContent).toContain("Linear Regression (Full)");
    expect(chart.textContent).toContain("Naive");
});

test("weekly seasonality and complexity versus value share the final row with all categories", () => {
    act(() => root.render(<RetailForecastCharts />));

    const row = container.querySelector("[data-testid='supporting-chart-row']");
    expect(row.classList.contains("lg:grid-cols-2")).toBe(true);
    const weekly = row.querySelector("[data-testid='weekly-seasonality-chart']");
    const complexity = row.querySelector("[data-testid='complexity-value-chart']");
    expect(weekly.querySelectorAll(".recharts-bar")).toHaveLength(3);
    expect(complexity.querySelectorAll(".recharts-line")).toHaveLength(3);
    ["FOODS", "HOBBIES", "HOUSEHOLD"].forEach((category) => {
        expect(weekly.textContent).toContain(category);
        expect(complexity.textContent).toContain(category);
    });
});

test("all findings charts use the same readable height", () => {
    act(() => root.render(<RetailForecastCharts />));

    [
        "category-demand-chart",
        "actual-forecast-chart",
        "model-accuracy-chart",
        "weekly-seasonality-chart",
        "complexity-value-chart",
    ].forEach((testId) => {
        const responsiveChart = container.querySelector(`[data-testid='${testId}'] .recharts-responsive-container`);
        expect(responsiveChart.style.height).toBe("320px");
    });
});
