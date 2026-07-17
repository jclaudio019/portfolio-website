import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
    return (
        <ReactLenis root options={{ lerp: 0.09, duration: 1.1, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
