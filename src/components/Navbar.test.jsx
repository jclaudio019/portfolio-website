import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("shows only the dedicated Resume button in the desktop navigation", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Navbar />
        </MemoryRouter>
    ));

    const resumeLinks = [...container.querySelectorAll("nav a")]
        .filter((link) => link.textContent.trim() === "Resume");
    expect(resumeLinks).toHaveLength(1);
    expect(resumeLinks[0]).toBe(container.querySelector("[data-testid='nav-resume-download']"));
    expect(container.querySelector("[data-testid='nav-contact']")).toBeNull();
    expect([...container.querySelectorAll("nav a")].some((link) => link.textContent.trim() === "Skills")).toBe(false);

    act(() => root.unmount());
    container.remove();
});
