import { act } from "react";
import { createRoot } from "react-dom/client";
import { Simulate } from "react-dom/test-utils";
import TimeSeriesCharts from "./TimeSeriesCharts";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

const mount = (reducedMotion = false) => {
    global.ResizeObserver = class {
        constructor(callback) { this.callback = callback; }
        observe() { this.callback([{ contentRect: { width: 800, height: 416 } }]); }
        unobserve() {}
        disconnect() {}
    };
    window.matchMedia = jest.fn().mockReturnValue({
        matches: reducedMotion,
        addEventListener() {},
        removeEventListener() {},
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<TimeSeriesCharts />));
};

beforeEach(() => {
    jest.useFakeTimers();
    mount();
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.useRealTimers();
});

test("plays and scrubs the fixed Brownian bridge", () => {
    const play = container.querySelector("[data-testid='bridge-play']");
    const slider = container.querySelector("[data-testid='bridge-slider']");
    expect(slider.value).toBe("0");

    act(() => play.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    act(() => jest.advanceTimersByTime(200));
    expect(Number(slider.value)).toBeGreaterThan(0);

    act(() => Simulate.change(slider, { target: { value: "500" } }));
    expect(container.querySelector("[data-testid='bridge-step']").textContent).toContain("500 / 500");
});

test("switches between unemployment and S&P 500 forecasts", () => {
    expect(container.textContent).toContain("U.S. Unemployment");
    const sp500 = container.querySelector("[data-testid='forecast-tab-sp500']");

    act(() => sp500.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(sp500.getAttribute("aria-selected")).toBe("true");
    expect(container.textContent).toContain("Monthly observation");
});

test("disables animation for reduced-motion users", () => {
    act(() => root.unmount());
    container.remove();
    mount(true);

    expect(container.querySelector("[data-testid='bridge-play']").textContent).toContain("Replay");
    expect(container.querySelector("[data-testid='bridge-slider']").value).toBe("500");
});

test("keeps the forecast chart compact enough to compare with nearby content", () => {
    const frame = container.querySelector("[data-testid='forecast-chart-frame']");
    expect(frame).not.toBeNull();
    expect(frame.classList.contains("h-[20rem]")).toBe(true);
});
