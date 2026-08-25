import { act } from "react";
import { createRoot } from "react-dom/client";
import Resume from "./Resume";

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

test("sends resume requests to the dedicated resume email", () => {
    act(() => root.render(<Resume />));

    const requestLink = container.querySelector("[data-testid='resume-download-btn']");
    expect(requestLink.getAttribute("href")).toMatch(/^mailto:joseo\.claudio19@gmail\.com\?/);
});
