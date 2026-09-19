import { act } from "react";
import { createRoot } from "react-dom/client";
import { Reveal } from "./Reveal";

global.IS_REACT_ACT_ENVIRONMENT = true;
global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

test("forwards anchor attributes to the revealed section", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => root.render(<Reveal id="how-it-works">Architecture</Reveal>));

    expect(container.querySelector("#how-it-works")?.textContent).toBe("Architecture");

    act(() => root.unmount());
    container.remove();
});
