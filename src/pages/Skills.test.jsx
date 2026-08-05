import { act } from "react";
import { createRoot } from "react-dom/client";
import Skills from "./Skills";

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

test("renders linked skill evidence for R and Time Series Analysis", () => {
    act(() => root.render(<Skills />));

    const links = [...container.querySelectorAll("[data-testid='skill-evidence-link']")];
    expect(links.map(({ textContent }) => textContent)).toEqual(["R", "Time Series Analysis"]);
    expect(links.every(({ href }) => href === "https://github.com/jclaudio019/time_series_analysis")).toBe(true);
});
