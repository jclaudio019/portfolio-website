/** Shared chart tokens — aligned with portfolio dark theme (index.css / tailwind.config.js) */

export const CHART = {
    bg: "#0a0a0f",
    surface: "#15151c",
    surfaceRaised: "#1c1c24",
    ink: "#ececf1",
    inkSecondary: "#c3c2b7",
    inkMuted: "#898781",
    accent: "#a855f7",
    accentSoft: "rgba(168, 85, 247, 0.15)",
    border: "rgba(236, 236, 241, 0.12)",
    grid: "rgba(236, 236, 241, 0.06)",
    tooltipBg: "#15151c",
    tooltipBorder: "#2c2c2a",
};

export const CAT_COLOR = {
    FOODS: "#3987e5",
    HOBBIES: "#d95926",
    HOUSEHOLD: "#199e70",
};

export const CATS = ["FOODS", "HOBBIES", "HOUSEHOLD"];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const fmtUnits = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(Math.round(v)));

export const fmtDate = (iso) => {
    const d = new Date(`${iso}T12:00:00`);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
