import { act } from "react";
import { createRoot } from "react-dom/client";
import BacktestingArchitecture from "./BacktestingArchitecture";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("shows the historical and paper-trading lanes in order", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => root.render(<BacktestingArchitecture />));

    const lanes = container.querySelectorAll("ol");
    const architecture = container.querySelector("[data-testid='backtesting-architecture']");
    expect(architecture).not.toBeNull();
    expect(architecture.className).toMatch(/\bbg-surface\b.*\btext-navy\b/);
    expect(lanes).toHaveLength(2);
    expect(Array.from(lanes[0].children, (node) => node.textContent)).toEqual([
        "Historical price provider",
        "Backtest event loop",
        "Strategy callback",
        "Portfolio order",
        "Position and cash update",
    ]);
    expect(Array.from(lanes[1].children, (node) => node.textContent)).toEqual([
        "EMA crossover",
        "Alpaca paper order",
        "Trade-update listener",
        "FastAPI",
        "QuestDB trade_events table",
    ]);

    act(() => root.unmount());
});
