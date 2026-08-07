import { act } from "react";
import { createRoot } from "react-dom/client";
import OptionsHedgeExplorer from "./OptionsHedgeExplorer";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

const marketResult = (stockPrice = 312) => ({
    symbol: "AAPL",
    stockPrice,
    strike: 310,
    daysToExpiration: 134,
    riskFreeRate: 0.0373,
    dividendYield: 0.0034,
    dividendFallback: false,
    bid: 20,
    ask: 22,
    marketPrice: 21,
    marketPriceSource: "bid/ask midpoint",
    impliedVolatility: 0.24,
    garchVolatility: 0.31,
    lastTradeAt: "2026-08-06T19:30:00.000Z",
    retrievedAt: "2026-08-06T20:00:00.000Z",
});

const response = (body) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    global.fetch = jest.fn((url, options) => {
        if (String(url).includes("expirations")) return response({ expirations: ["2026-12-18"] });
        if (String(url).includes("strikes")) return response({ strikes: [300, 310, 320] });
        if (options?.method === "POST") return response(marketResult());
        throw new Error(`Unexpected request: ${url}`);
    });
    await act(async () => root.render(<OptionsHedgeExplorer />));
    await act(async () => Promise.resolve());
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
});

test("renders accessible controls and waits for the visitor to calculate", () => {
    expect(container.querySelector("[aria-label='Symbol']")).not.toBeNull();
    expect(container.querySelector("[aria-label='Option type']")).not.toBeNull();
    expect(container.querySelector("[aria-label='Expiration']")).not.toBeNull();
    expect(container.querySelector("[aria-label='Strike']")).not.toBeNull();
    expect(container.querySelector("[aria-label='Position']")).not.toBeNull();
    expect(container.querySelector("[aria-label='Contract count']")).not.toBeNull();
    expect(container.querySelector("button").textContent).toBe("Refresh and calculate");
    expect(container.querySelector("[data-testid='options-results']")).toBeNull();
});

test("renders implied and GARCH calculations after a successful refresh", async () => {
    await act(async () => container.querySelector("button").click());

    const results = container.querySelector("[data-testid='options-results']").textContent;
    expect(results).toContain("Market implied");
    expect(results).toContain("GARCH forecast");
    expect(results).toContain("Target share hedge");
    expect(results).toContain("First refresh");
    expect(results).toContain("Bid / ask");
});

test("marks results outdated when a position input changes", async () => {
    await act(async () => container.querySelector("button").click());
    const position = container.querySelector("[aria-label='Position']");
    await act(async () => {
        position.value = "short";
        position.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(container.textContent).toContain("Inputs changed. Refresh to update the result.");
});

test("shows a hedge adjustment on the second successful refresh", async () => {
    global.fetch.mockImplementation((url, options) => {
        if (String(url).includes("expirations")) return response({ expirations: ["2026-12-18"] });
        if (String(url).includes("strikes")) return response({ strikes: [300, 310, 320] });
        if (options?.method === "POST") {
            const count = global.fetch.mock.calls.filter(([, request]) => request?.method === "POST").length;
            return response(marketResult(count > 1 ? 316 : 312));
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    await act(async () => container.querySelector("button").click());
    await act(async () => container.querySelector("button").click());

    expect(container.querySelector("[data-testid='options-results']").textContent).not.toContain("First refreshFirst refresh");
    expect(container.textContent).toContain("Hedge adjustment");
});

test("keeps errors usable and displays the educational disclosure", async () => {
    global.fetch.mockImplementation((url, options) => {
        if (String(url).includes("expirations")) return response({ expirations: ["2026-12-18"] });
        if (String(url).includes("strikes")) return response({ strikes: [310] });
        if (options?.method === "POST") {
            return Promise.resolve({ ok: false, json: () => Promise.resolve({ error: "Yahoo is unavailable" }) });
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    await act(async () => container.querySelector("button").click());

    expect(container.textContent).toContain("Yahoo is unavailable");
    expect(container.textContent).toContain("Educational modeling tool");
    expect(container.textContent).toContain("AI-assisted coding");
});
