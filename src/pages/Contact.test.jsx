import { act } from "react";
import { createRoot } from "react-dom/client";
import Contact from "./Contact";

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

test("shows the correct email address and contact link", () => {
    act(() => root.render(<Contact />));

    const emailLink = container.querySelector("[data-testid='contact-email']");
    expect(emailLink.textContent).toContain("joseo.claudio19@gmail.com");
    expect(emailLink.getAttribute("href")).toBe("mailto:joseo.claudio19@gmail.com");
});
