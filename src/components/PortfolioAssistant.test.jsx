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

    expect(askPortfolioRag).toHaveBeenCalledWith("What forecasting work has Jose done?", 6, []);
    expect(container.querySelector("[data-testid='portfolio-assistant-input']").value).toBe("");
    expect(container.querySelector("[data-testid='portfolio-user-message']").textContent)
        .toContain("What forecasting work has Jose done?");
    expect(container.querySelector("[data-testid='portfolio-assistant-suggestions']")).toBeNull();
    expect(container.querySelector("[data-testid='portfolio-assistant-result']").textContent)
        .toContain("Jose demonstrates forecasting");
    expect(container.querySelector("[data-testid='portfolio-explore-further'] a").getAttribute("href"))
        .toBe("/projects/retail-demand-forecasting");

    act(() => root.unmount());
    container.remove();
});

test("uses recent user questions to ground a follow-up", async () => {
    askPortfolioRag
        .mockResolvedValueOnce({ answer: "Credit risk dashboard details", abstained: false, explore: [] })
        .mockResolvedValueOnce({ answer: "It monitors model stability", abstained: false, explore: [] });
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PortfolioAssistant initialQuestion="Is there a credit risk dashboard?" />
        </MemoryRouter>
    ));
    await act(async () => {
        container.querySelector("[data-testid='portfolio-assistant-form']")
            .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    await act(async () => {
        const input = container.querySelector("[data-testid='portfolio-assistant-input']");
        const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
        setter.call(input, "What does it monitor?");
        input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
        container.querySelector("[data-testid='portfolio-assistant-form']")
            .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(askPortfolioRag).toHaveBeenLastCalledWith(
        "What does it monitor?",
        6,
        ["Is there a credit risk dashboard?"]
    );

    act(() => root.unmount());
    container.remove();
});

test("links directly to the architecture explanation", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PortfolioAssistant />
        </MemoryRouter>
    ));

    expect(container.querySelector("a[href='/projects/interactive-rag#how-it-works']")).not.toBeNull();

    act(() => root.unmount());
    container.remove();
});

test("keeps wheel scrolling inside the conversation transcript", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PortfolioAssistant />
        </MemoryRouter>
    ));
    const transcript = container.querySelector("[data-testid='portfolio-assistant-transcript']");
    transcript.scrollTop = 100;
    const wheel = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: 80 });

    act(() => transcript.dispatchEvent(wheel));

    expect(transcript.scrollTop).toBe(180);
    expect(wheel.defaultPrevented).toBe(true);

    act(() => root.unmount());
    container.remove();
});
