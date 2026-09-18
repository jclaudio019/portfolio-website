import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

jest.mock("../components/SkillSphere", () => () => null);

global.IS_REACT_ACT_ENVIRONMENT = true;

test("keeps the homepage focused on three representative case studies", () => {
    window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => root.render(<MemoryRouter><Home /></MemoryRouter>));

    expect([...container.querySelectorAll("[data-testid^='project-card-']")].map((card) => card.dataset.testid)).toEqual([
        "project-card-retail-demand-forecasting",
        "project-card-credit-risk-pd-model",
        "project-card-retail-allocation-simulator",
    ]);

    act(() => root.unmount());
    container.remove();
});
