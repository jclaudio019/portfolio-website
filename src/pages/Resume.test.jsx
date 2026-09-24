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

test("offers the current resume by request without publishing a personal PDF", () => {
    act(() => root.render(<Resume />));

    const requestLink = container.querySelector("[data-testid='resume-request-btn']");
    expect(requestLink.getAttribute("href")).toContain("mailto:joseo.claudio19@gmail.com");
    expect(requestLink.textContent).toContain("Request Resume");
    expect(container.textContent).toContain("available on request");
    expect(container.querySelector("[data-testid='contact-form']")).not.toBeNull();
    expect(container.querySelector("[data-testid='contact-email']").textContent)
        .toContain("joseo.claudio19@gmail.com");
});
