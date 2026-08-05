import { act } from "react";
import { createRoot } from "react-dom/client";
import { Simulate } from "react-dom/test-utils";
import CreditRiskScoreExplorer from "./CreditRiskScoreExplorer";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
});

const renderExplorer = () => act(() => root.render(<CreditRiskScoreExplorer />));

const change = (label, value) => {
    const input = [...container.querySelectorAll("input, select")].find((node) => node.labels?.[0]?.textContent === label);
    act(() => {
        input.value = value;
        Simulate.change(input);
    });
};

test("keeps results hidden until Calculate and shows the historical-model notice", () => {
    renderExplorer();

    expect(container.textContent).toContain("Educational example based on historical data. It is not a lending decision or a production credit score.");
    expect(container.textContent).not.toContain("Illustrative score:");
});

test("calculates the specified default profile", () => {
    renderExplorer();

    act(() => container.querySelector("button").click());

    expect(container.textContent).toContain("Illustrative score:");
    expect(container.textContent).toContain("Probability of repayment:");
    expect(container.textContent).toContain("Probability of default:");
    expect(container.textContent).toContain("Illustrative risk band:Middle");
    expect(container.querySelectorAll("[data-testid='contribution-row']")).toHaveLength(3);
});

test("marks a calculated result stale when an input changes", () => {
    renderExplorer();
    act(() => container.querySelector("button").click());

    change("Annual income", "70000");

    expect(container.textContent).toContain("Inputs changed. Calculate again to update the result.");
    expect(container.textContent).toContain("Illustrative score:");
});

test("describes validation errors through the invalid field", () => {
    renderExplorer();
    change("Interest rate (%)", "-1");
    act(() => container.querySelector("button").click());

    const input = container.querySelector("#credit-risk-interestRate");
    const message = container.querySelector("#credit-risk-interestRate-error");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBe("credit-risk-interestRate-error");
    expect(message.textContent).toBe("Enter a non-negative number.");
});

test("announces calculated and stale results without changing the visible layout", () => {
    renderExplorer();
    act(() => container.querySelector("button").click());

    expect(container.querySelector("[role='status']").textContent).toBe("Results calculated.");

    change("Annual income", "70000");
    expect(container.querySelector("[role='status']").textContent).toBe("Inputs changed. Calculate again to update the result.");
});

test("moves focus to results after a successful calculation", () => {
    renderExplorer();

    act(() => container.querySelector("button").click());

    expect(document.activeElement).toBe(container.querySelector("[data-testid='score-results']"));
});
