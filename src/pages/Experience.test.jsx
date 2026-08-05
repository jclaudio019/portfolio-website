import { act } from "react";
import { createRoot } from "react-dom/client";
import Experience from "./Experience";

global.IS_REACT_ACT_ENVIRONMENT = true;

let container;
let root;

beforeEach(() => {
    window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
});

afterEach(() => {
    act(() => root.unmount());
    container.remove();
});

test("renders the professional timeline in reverse chronological order", () => {
    act(() => root.render(<Experience />));

    const roles = [...container.querySelectorAll("[data-testid='experience-role']")];
    expect(roles.map(({ textContent }) => textContent)).toEqual([
        expect.stringContaining("EssilorLuxottica"),
        expect.stringContaining("Rexel USA"),
        expect.stringContaining("FGX International"),
    ]);
    expect(container.textContent).toContain("Earlier experience");
    expect(container.textContent).toContain("Internal Auditor Intern — Neighborhood Health Plan of Rhode Island");
    expect(container.textContent).toContain("Retail Operations — The Home Depot");
});
