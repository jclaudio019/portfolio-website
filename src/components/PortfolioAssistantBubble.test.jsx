import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import PortfolioAssistantBubble from "./PortfolioAssistantBubble";

global.IS_REACT_ACT_ENVIRONMENT = true;

const renderBubble = (path = "/projects") => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(
        <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PortfolioAssistantBubble />
        </MemoryRouter>
    ));
    return { container, root };
};

test("opens a compact assistant with three decision-oriented suggestions", () => {
    const { container, root } = renderBubble();
    const trigger = container.querySelector("[aria-label='Ask the portfolio']");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    act(() => trigger.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(container.querySelector("[role='dialog']")).not.toBeNull();
    expect([...container.querySelectorAll("[data-testid='portfolio-assistant-form'] button[type='button']")]
        .map(({ textContent }) => textContent)).toEqual([
        "Which projects best demonstrate Jose's analytical approach?",
        "How does Jose validate models and analytical results?",
        "Where has Jose automated a business process?",
    ]);

    act(() => root.unmount());
    container.remove();
});

test("does not duplicate the assistant on its dedicated page", () => {
    const { container, root } = renderBubble("/ask");
    expect(container.querySelector("[data-testid='portfolio-assistant-bubble']")).toBeNull();
    act(() => root.unmount());
    container.remove();
});
