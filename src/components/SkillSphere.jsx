import { useEffect, useRef } from "react";

const SKILL_LABELS = [
    "Python",
    "SQL",
    "Forecasting",
    "Power BI",
    "Statistics",
    "Supply Chain",
    "Finance",
    "Machine Learning",
];

const N = 220;
const LINK_DIST = 0.3;

export default function SkillSphere({ className }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Fibonacci sphere
        const pts = [];
        const ga = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            const y = 1 - (i / (N - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const t = ga * i;
            pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
        }
        const pairs = [];
        for (let i = 0; i < N; i++) {
            for (let j = i + 1; j < N; j++) {
                const dx = pts[i][0] - pts[j][0];
                const dy = pts[i][1] - pts[j][1];
                const dz = pts[i][2] - pts[j][2];
                if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) pairs.push([i, j]);
            }
        }
        const labelIdx = SKILL_LABELS.map((_, i) =>
            Math.floor(((i + 0.5) * N) / SKILL_LABELS.length)
        );

        let w, h, dpr;
        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        let scroll = window.scrollY;
        const onScroll = () => { scroll = window.scrollY; };
        window.addEventListener("scroll", onScroll, { passive: true });

        const proj = new Array(N);
        let raf;

        const draw = (time) => {
            ctx.clearRect(0, 0, w, h);
            const rotY = (reduced ? 0 : time * 0.00006) + scroll * 0.0012;
            const rotX = 0.35 + scroll * 0.0003;
            const cx = w >= 1024 ? w * 0.7 : w * 0.5;
            const cy = h * 0.5;
            const R = Math.min(w, h) * 0.42;
            const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
            const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

            for (let i = 0; i < N; i++) {
                const [x0, y0, z0] = pts[i];
                const x1 = x0 * cosY + z0 * sinY;
                const z1 = -x0 * sinY + z0 * cosY;
                const y2 = y0 * cosX - z1 * sinX;
                const z2 = y0 * sinX + z1 * cosX;
                proj[i] = [cx + x1 * R, cy + y2 * R, z2];
            }

            for (const [i, j] of pairs) {
                const depth = (proj[i][2] + proj[j][2]) / 2; // -1 back, 1 front
                const a = 0.03 + (depth + 1) * 0.05;
                ctx.strokeStyle = `rgba(236, 236, 241, ${a})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(proj[i][0], proj[i][1]);
                ctx.lineTo(proj[j][0], proj[j][1]);
                ctx.stroke();
            }
            for (let i = 0; i < N; i++) {
                const a = 0.15 + (proj[i][2] + 1) * 0.3;
                ctx.fillStyle = `rgba(236, 236, 241, ${a})`;
                ctx.beginPath();
                ctx.arc(proj[i][0], proj[i][1], 1.5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Skill nodes fade in as you scroll toward the next section
            const la = Math.min(1, Math.max(0, (scroll - 60) / 340));
            if (la > 0) {
                ctx.strokeStyle = `rgba(168, 85, 247, ${0.45 * la})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                labelIdx.forEach((idx, k) => {
                    const [x, y] = proj[idx];
                    if (k === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.stroke();

                ctx.font = "10px 'JetBrains Mono', monospace";
                labelIdx.forEach((idx, k) => {
                    const [x, y, z] = proj[idx];
                    const da = (0.35 + (z + 1) * 0.325) * la;
                    ctx.fillStyle = `rgba(168, 85, 247, ${da})`;
                    ctx.beginPath();
                    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = `rgba(236, 236, 241, ${da})`;
                    ctx.fillText(SKILL_LABELS[k].toUpperCase(), x + 8, y + 3);
                });
            }

            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} data-testid="skill-sphere" />;
}
