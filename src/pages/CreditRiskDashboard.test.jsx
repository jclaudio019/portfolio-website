import fs from "fs";
import path from "path";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

jest.mock("recharts", () => {
    const React = require("react");
    const Stub = ({ children }) => <div>{children}</div>;
    return new Proxy({}, { get: (_, name) => name === "ResponsiveContainer" ? Stub : Stub });
});

jest.mock("../lib/creditRiskDashboardData", () => ({
    loadCreditRiskDashboardData: jest.fn(),
}));

jest.mock("../lib/creditRiskApi", () => ({
    creditRiskApiUrl: "https://risk.example",
    requestExpectedLoss: jest.fn(),
}));

import CreditRiskDashboard, { BorrowerScorer, getComparableSimulationRows } from "./CreditRiskDashboard";
import { loadCreditRiskDashboardData } from "../lib/creditRiskDashboardData";
import { requestExpectedLoss } from "../lib/creditRiskApi";

global.IS_REACT_ACT_ENVIRONMENT = true;
const exportData = Object.fromEntries(["summary", "model_performance", "portfolio_risk", "simulation", "stress", "thresholds", "monitoring", "metadata"].map((name) => [name, JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "data", "credit-risk", `${name}.json`), "utf8"))]));
let container;
let root;
beforeEach(() => { container = document.createElement("div"); document.body.appendChild(container); root = createRoot(container); loadCreditRiskDashboardData.mockResolvedValue(exportData); });
afterEach(() => { act(() => root.unmount()); container.remove(); jest.clearAllMocks(); });

test("renders the overview and explicit monitoring warning", async () => {
    await act(async () => { root.render(<MemoryRouter><CreditRiskDashboard /></MemoryRouter>); });
    expect(container.textContent).toContain("466,285");
    expect(container.textContent).toContain("$771.6M");
    expect(container.querySelector("a[href$='/docs/METHODOLOGY.md']")).not.toBeNull();
    expect(container.querySelector("a[href$='/docs/RUNBOOK.md']")).not.toBeNull();
    expect(container.querySelector("[data-testid='seasoning-warning']").textContent).toContain("under-seasoned");
    expect(container.textContent).toContain("Applied credit risk analytics");
    expect(container.textContent).not.toContain("Interview-ready case study");
    expect(container.textContent).not.toContain("NaN");
});

test("threshold control updates approval outcomes", async () => {
    await act(async () => { root.render(<MemoryRouter><CreditRiskDashboard /></MemoryRouter>); });
    const slider = container.querySelector("[data-testid='threshold-slider']");
    const before = container.querySelector("[data-testid='threshold-results']").textContent;
    await act(async () => { Simulate.change(slider, { target: { value: "0" } }); });
    expect(container.querySelector("[data-testid='threshold-results']").textContent).not.toBe(before);
});

test("compares independent and correlated losses on the same portfolio sample", async () => {
    const rows = getComparableSimulationRows(exportData.simulation.simulations);
    expect(rows.map((row) => row.simulation)).toEqual(["independent_sample", "correlated_sample"]);
    expect(rows[0].sample_size).toBe(rows[1].sample_size);
    await act(async () => { root.render(<MemoryRouter><CreditRiskDashboard /></MemoryRouter>); });
    const comparison = container.querySelector("[data-testid='simulation-comparison']");
    expect(comparison.dataset.sampleSize).toBe("25000");
    expect(comparison.textContent).toContain("$42.7M");
    expect(comparison.textContent).toContain("$85.4M");
    expect(comparison.textContent).not.toContain("$777.3M");
});

test("rejects simulation comparisons with mismatched portfolio samples", () => {
    const mismatched = exportData.simulation.simulations.map((row) => row.simulation === "correlated_sample" ? { ...row, sample_size: 10000 } : row);
    expect(() => getComparableSimulationRows(mismatched)).toThrow("same portfolio sample");
});

test("API failure leaves the scorer mounted with a friendly error", async () => {
    requestExpectedLoss.mockRejectedValue(new Error("network"));
    await act(async () => { root.render(<BorrowerScorer />); });
    await act(async () => { container.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
    expect(container.textContent).toContain("scoring service could not be reached");
    expect(container.querySelector("form")).not.toBeNull();
});

test("form rejects a negative required input before calling the API", async () => {
    await act(async () => { root.render(<BorrowerScorer />); });
    const income = container.querySelector("input[aria-label='Annual income']");
    await act(async () => { Simulate.change(income, { target: { value: "-1" } }); });
    await act(async () => { container.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
    expect(container.textContent).toContain("non-negative values");
    expect(requestExpectedLoss).not.toHaveBeenCalled();
});

test("displays API expected loss without recomputing a substitute", async () => {
    requestExpectedLoss.mockResolvedValue({ pd: 0.1, lgd: 0.9, ead: 10000, expected_loss: 900, risk_band: "low" });
    await act(async () => { root.render(<BorrowerScorer />); });
    await act(async () => { container.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })); });
    expect(container.querySelector("[data-testid='borrower-result']").textContent).toContain("$900");
    expect(container.textContent).toContain("10.0% × 90.0% × $10K");
});
