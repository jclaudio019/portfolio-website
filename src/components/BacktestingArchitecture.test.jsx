import { act } from "react";
import { createRoot } from "react-dom/client";
import BacktestingArchitecture from "./BacktestingArchitecture";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("shows the historical and paper-trading lanes in order", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    act(() => root.render(<BacktestingArchitecture />));

    const lanes = container.querySelectorAll("ol");
    expect(container.querySelector("[data-testid='backtesting-architecture']")).not.toBeNull();
    expect(lanes).toHaveLength(2);
    expect(lanes[0].textContent).toContain("NotebookbacktestlibStrategy & portfolio review");
    expect(lanes[1].textContent).toContain("EMA crossoverAlpaca paper accountTrade listenerFastAPIQuestDB");

    act(() => root.unmount());
});
