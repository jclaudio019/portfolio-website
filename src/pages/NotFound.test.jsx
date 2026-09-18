import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("offers clear recovery links for an unknown route", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => root.render(<MemoryRouter><NotFound /></MemoryRouter>));
    expect(container.querySelector("h1").textContent).toBe("Page not found.");
    expect([...container.querySelectorAll("a")].map((link) => link.getAttribute("href"))).toEqual(["/projects", "/"]);
    act(() => root.unmount());
    container.remove();
});
