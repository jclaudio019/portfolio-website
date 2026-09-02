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

test("downloads the published resume with the requested filename", () => {
    act(() => root.render(<Resume />));

    const downloadLink = container.querySelector("[data-testid='resume-download-btn']");
    expect(downloadLink.getAttribute("href")).toBe("/Jose_Claudio_Analytics_Resume.pdf");
    expect(downloadLink.getAttribute("download")).toBe("Jose_Claudio_Analytics_Resume.pdf");
    expect(downloadLink.textContent).toContain("Download Resume");
    expect(container.querySelector("[data-testid='contact-form']")).not.toBeNull();
    expect(container.querySelector("[data-testid='contact-email']").textContent)
        .toContain("joseo.claudio19@gmail.com");
});
