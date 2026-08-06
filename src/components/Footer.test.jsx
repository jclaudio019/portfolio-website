import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

global.IS_REACT_ACT_ENVIRONMENT = true;

test("uses a connection-focused closing CTA", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => root.render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Footer />
        </MemoryRouter>
    ));

    expect(container.textContent).toContain("Let’s connect");
    expect(container.textContent).toContain("Interested in discussing analytics, forecasting, or modeling?");
    expect(container.textContent).not.toContain("Work with me");

    act(() => root.unmount());
    container.remove();
});
