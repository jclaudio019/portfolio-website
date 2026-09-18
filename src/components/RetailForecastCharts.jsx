import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Boxes, FlaskConical, ShieldCheck } from "lucide-react";
import { CAT_COLOR, CATS, CHART } from "./chartTheme";

const RESULTS = {
    FOODS: { selectedModel: "XGBoost Faster", validationWape: 6.99, testWape: 10.22, naiveWape: 16.10, fillNone: 94.30, fillP95: 99.07, inventoryNone: 12256, inventoryP95: 38622, weekday: [83.0, 40.4, 46.2, 53.8, 63.5, 63.5, 94.2], monteCarlo: [{ policy: "p90", fillRate: 99.81, inventory: 32570, cvar: 57421 }, { policy: "p95", fillRate: 99.95, inventory: 42089, cvar: 25839 }, { policy: "p98", fillRate: 99.98, inventory: 47449, cvar: 16186 }] },
    HOBBIES: { selectedModel: "Linear Regression (Full)", validationWape: 6.50, testWape: 8.78, naiveWape: 17.47, fillNone: 93.36, fillP95: 97.55, inventoryNone: 1190, inventoryP95: 2183, weekday: [81.1, 71.2, 73.1, 75.0, 71.2, 69.2, 88.5], monteCarlo: [{ policy: "p90", fillRate: 99.82, inventory: 3256, cvar: 5961 }, { policy: "p95", fillRate: 99.92, inventory: 3685, cvar: 3467 }, { policy: "p98", fillRate: 99.97, inventory: 4119, cvar: 1946 }] },
    HOUSEHOLD: { selectedModel: "Prophet Flexible", validationWape: 6.88, testWape: 8.31, naiveWape: 19.88, fillNone: 99.56, fillP95: 100.00, inventoryNone: 8126, inventoryP95: 17614, weekday: [67.9, 19.2, 13.5, 17.3, 17.3, 23.1, 57.7], monteCarlo: [{ policy: "p90", fillRate: 99.64, inventory: 7618, cvar: 27870 }, { policy: "p95", fillRate: 99.84, inventory: 9038, cvar: 15859 }, { policy: "p98", fillRate: 99.97, inventory: 11642, cvar: 5655 }] },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const KPI = [
    { icon: ShieldCheck, value: "10.22%", label: "FOODS test WAPE", note: "Validation-selected model" },
    { icon: Boxes, value: "94.30 → 99.07%", label: "FOODS fill rate", note: "No buffer → p95 buffer" },
    { icon: FlaskConical, value: "2,000", label: "Monte Carlo paths", note: "Per category and policy" },
];

const ChartShell = ({ title, caption, children, testId }) => (
    <figure data-testid={testId} className="mt-6 overflow-hidden border border-navy/10 bg-surface/80">
        <figcaption className="border-b border-navy/10 px-4 py-3 sm:px-5"><p className="font-mono text-sm uppercase tracking-wider text-teal">{title}</p><p className="mt-1 text-base leading-relaxed text-navy/60">{caption}</p></figcaption>
        <div className="p-3 sm:p-4">{children}</div>
    </figure>
);

const TooltipCard = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return <div className="rounded border border-navy/15 bg-surface px-3 py-2 shadow-lg"><p className="mb-1 font-mono text-xs uppercase tracking-wider text-navy/50">{label}</p>{payload.map((entry) => <p key={entry.name} className="font-mono text-xs" style={{ color: entry.color || CHART.inkSecondary }}>{entry.name}: {Number(entry.value).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>)}</div>;
};

const CategoryTabs = ({ value, onChange }) => (
    <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Product category">{CATS.map((category) => <button key={category} type="button" role="tab" aria-selected={value === category} onClick={() => onChange(category)} className={`border px-3 py-1.5 font-mono text-xs tracking-wider transition-colors ${value === category ? "border-teal/40 bg-teal/5 text-navy" : "border-navy/15 text-navy/50 hover:border-navy/30 hover:text-navy"}`}>{category}</button>)}</div>
);

export default function RetailForecastCharts() {
    const [category, setCategory] = useState("FOODS");
    const selected = RESULTS[category];
    const color = CAT_COLOR[category];
    const axis = { fill: CHART.inkMuted, fontSize: 12, fontFamily: "JetBrains Mono, monospace" };
    const grid = { stroke: CHART.grid, vertical: false };
    const wapeRows = useMemo(() => [{ model: "Naive", wape: selected.naiveWape }, { model: selected.selectedModel, wape: selected.testWape }], [selected]);
    const weekdayRows = useMemo(() => DAYS.map((day, index) => ({ day, underForecast: selected.weekday[index] })), [selected]);
    const policyRows = useMemo(() => [{ policy: "No buffer", fillRate: selected.fillNone, inventory: selected.inventoryNone }, { policy: "p95 buffer", fillRate: selected.fillP95, inventory: selected.inventoryP95 }], [selected]);

    return <div data-testid="retail-forecast-charts">
        <div className="mt-8 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-3">{KPI.map(({ icon: Icon, value, label, note }) => <div key={label} className="flex gap-4 bg-surface p-5 sm:p-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center border border-teal/20 bg-teal/5 text-teal"><Icon size={18} /></div><div><p className="font-display text-2xl font-extrabold tracking-tight text-teal sm:text-3xl">{value}</p><p className="mt-1 font-mono text-xs uppercase tracking-wider text-navy/70">{label}</p><p className="mt-0.5 text-xs text-navy/60">{note}</p></div></div>)}</div>
        <CategoryTabs value={category} onChange={setCategory} />
        <div className="grid gap-0 lg:grid-cols-2">
            <ChartShell testId="selected-wape-chart" title="Selected model vs baseline" caption={`${category} · ${selected.selectedModel} was selected on validation (${selected.validationWape.toFixed(2)}% WAPE), then scored once on the untouched test year. Lower is better.`}><ResponsiveContainer width="100%" height={320}><BarChart data={wapeRows} layout="vertical" margin={{ top: 12, right: 32, left: 16, bottom: 4 }}><CartesianGrid {...grid} /><XAxis type="number" tick={axis} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="model" width={145} tick={axis} axisLine={false} tickLine={false} /><Tooltip content={<TooltipCard />} /><Bar dataKey="wape" name="Test WAPE" maxBarSize={24}>{wapeRows.map((row, index) => <Cell key={row.model} fill={index === 0 ? CHART.inkMuted : color} />)}</Bar></BarChart></ResponsiveContainer></ChartShell>
            <ChartShell testId="error-direction-chart" title="When the model under-forecast" caption={`${category} · share of test days with actual demand above the forecast, grouped by weekday. This is diagnostic evidence, not a service target.`}><ResponsiveContainer width="100%" height={320}><BarChart data={weekdayRows} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}><CartesianGrid {...grid} /><XAxis dataKey="day" tick={axis} axisLine={false} tickLine={false} /><YAxis domain={[0, 100]} tick={axis} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} /><Tooltip content={<TooltipCard />} /><Bar dataKey="underForecast" name="Under-forecast days (%)" fill={color} maxBarSize={30} /></BarChart></ResponsiveContainer></ChartShell>
            <ChartShell testId="policy-evaluation-chart" title="Controlled policy comparison" caption={`${category} · 14-day order-up-to simulation on the untouched test period. Buffers were calibrated only from validation residuals.`}><ResponsiveContainer width="100%" height={320}><ComposedChart data={policyRows} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}><CartesianGrid {...grid} /><XAxis dataKey="policy" tick={axis} axisLine={false} tickLine={false} /><YAxis yAxisId="fill" domain={[90, 100]} tick={axis} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} /><YAxis yAxisId="inventory" orientation="right" tick={axis} tickFormatter={(v) => v.toLocaleString()} axisLine={false} tickLine={false} /><Tooltip content={<TooltipCard />} /><Legend /><Bar yAxisId="inventory" dataKey="inventory" name="Average inventory" fill={CHART.inkMuted} maxBarSize={34} /><Line yAxisId="fill" type="monotone" dataKey="fillRate" name="Fill rate (%)" stroke={color} strokeWidth={3} /></ComposedChart></ResponsiveContainer></ChartShell>
            <ChartShell testId="monte-carlo-tradeoff-chart" title="Uncertainty tradeoff" caption={`${category} · 2,000 block-bootstrap paths per policy. Higher buffers improve service and reduce tail lost units while increasing inventory.`}><ResponsiveContainer width="100%" height={320}><ComposedChart data={selected.monteCarlo} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}><CartesianGrid {...grid} /><XAxis dataKey="policy" tick={axis} axisLine={false} tickLine={false} /><YAxis yAxisId="inventory" tick={axis} tickFormatter={(v) => v.toLocaleString()} axisLine={false} tickLine={false} /><YAxis yAxisId="service" orientation="right" domain={[99, 100]} tick={axis} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} /><Tooltip content={<TooltipCard />} /><Legend /><Bar yAxisId="inventory" dataKey="inventory" name="Average inventory" fill={color} maxBarSize={30} /><Bar yAxisId="inventory" dataKey="cvar" name="Tail lost units (CVaR95)" fill={CHART.accent} maxBarSize={30} /><Line yAxisId="service" type="monotone" dataKey="fillRate" name="Mean fill rate (%)" stroke={CHART.inkSecondary} strokeWidth={3} /></ComposedChart></ResponsiveContainer></ChartShell>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-navy/60">The inventory analysis is a controlled sensitivity study using hypothetical lead times, buffers, and lost-sales behavior. It illustrates decision tradeoffs; it does not reproduce Walmart's replenishment system or make production inventory recommendations.</p>
    </div>;
}
