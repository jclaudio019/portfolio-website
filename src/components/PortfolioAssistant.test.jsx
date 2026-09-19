import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import PortfolioAssistant from "./PortfolioAssistant";
import { askPortfolioRag } from "../lib/ragApi";

jest.mock("../lib/ragApi", () => ({ askPortfolioRag: jest.fn() }));

global.IS_REACT_ACT_ENVIRONMENT = true;

test("renders a grounded answer and portfolio navigation links", async () => {
    askPortfolioRag.mockResolvedValue({
        answer: "**Answer**\nJose demonstrates forecasting in professional and portfolio contexts.",
        abstained: false,
        citations: [],
        explore: [{
            label: "Retail Demand Forecasting",
            explore_url: "https://joseoclaudio.com/projects/retail-demand-forecasting",
            experience_category: "portfolio_project",
            section: "Evaluation",
        }],
    });
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PortfolioAssistant
                suggestions={["What forecasting work has Jose done?"]}
                initialQuestion="What forecasting work has Jose done?"
            />
        </MemoryRouter>
    ));
    await act(async () => {
        container.querySelector("[data-testid='portfolio-assistant-form']")
            .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(askPortfolioRag).toHaveBeenCalledWith("What forecasting work has Jose done?", 6);
    expect(container.querySelector("[data-testid='portfolio-assistant-result']").textContent)
        .toContain("Jose demonstrates forecasting");
    expect(container.querySelector("[data-testid='portfolio-explore-further'] a").getAttribute("href"))
        .toBe("/projects/retail-demand-forecasting");

    act(() => root.unmount());
    container.remove();
});
