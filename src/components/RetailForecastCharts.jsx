import { useState } from "react";
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import data from "../data/retailForecastCharts.json";

const Plot = createPlotlyComponent(Plotly);

const CATS = ["FOODS", "HOBBIES", "HOUSEHOLD"];
// ponytail: fixed per-category colors (validated CVD-safe on #15151c) — never reassigned by filters
const CAT_COLOR = { FOODS: "#3987e5", HOBBIES: "#d95926", HOUSEHOLD: "#199e70" };
const INK = "#ececf1";
const INK_SECONDARY = "#c3c2b7";
const INK_MUTED = "#898781";
const GRID = "#2c2c2a";

const baseLayout = {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "Satoshi, sans-serif", color: INK_SECONDARY, size: 12 },
    margin: { l: 56, r: 16, t: 8, b: 40 },
    hoverlabel: { bgcolor: "#15151c", bordercolor: GRID, font: { color: INK, family: "JetBrains Mono, monospace", size: 12 } },
    dragmode: "zoom",
};
const axis = (extra = {}) => ({
    gridcolor: GRID,
    zerolinecolor: GRID,
    linecolor: GRID,
    tickfont: { color: INK_MUTED, family: "JetBrains Mono, monospace", size: 11 },
    ...extra,
});
const config = { responsive: true, scrollZoom: true, displaylogo: false, modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"] };

const ChartBlock = ({ title, caption, children }) => (
    <figure className="mt-8 border border-navy/10 bg-surface/50 p-4 sm:p-6">
        <figcaption>
            <p className="font-mono text-xs uppercase tracking-widest text-teal">{title}</p>
            <p className="mt-1 text-sm text-navy/60">{caption}</p>
        </figcaption>
        <div className="mt-4">{children}</div>
    </figure>
);

const CategoryTabs = ({ value, onChange }) => (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product category">
        {CATS.map((c) => (
            <button
                key={c}
                role="tab"
                aria-selected={value === c}
                onClick={() => onChange(c)}
                className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs tracking-wider transition-colors ${
                    value === c ? "border-navy/40 text-navy" : "border-navy/15 text-navy/50 hover:text-navy"
                }`}
            >
                <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: CAT_COLOR[c] }} />
                {c}
            </button>
        ))}
    </div>
);

export default function RetailForecastCharts() {
    const [cat, setCat] = useState("FOODS");

    const wape = data.testWape[cat];
    const avf = data.actualVsForecast[cat];

    return (
        <div data-testid="retail-forecast-charts">
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-navy/40">
                Interactive — drag to zoom, scroll to zoom in/out, double-click to reset
            </p>

            <div className="mt-4">
                <CategoryTabs value={cat} onChange={setCat} />
            </div>

            <ChartBlock
                title="Final test WAPE by model"
                caption={`Untouched 365-day test year, ${cat}. Forecast accuracy varied by category; no single model won everywhere. Lower is better.`}
            >
                <Plot
                    data={[
                        {
                            type: "bar",
                            orientation: "h",
                            y: wape.map((d) => d.model),
                            x: wape.map((d) => d.wape),
                            marker: { color: CAT_COLOR[cat] },
                            text: wape.map((d) => `${d.wape.toFixed(2)}%`),
                            textposition: "outside",
                            textfont: { color: INK_SECONDARY, family: "JetBrains Mono, monospace", size: 11 },
                            customdata: wape.map((d) => d.effort),
                            hovertemplate: "%{y}<br>Test WAPE: %{x:.2f}%<br>Effort: %{customdata}<extra></extra>",
                        },
                    ]}
                    layout={{
                        ...baseLayout,
                        height: 340,
                        bargap: 0.35,
                        xaxis: axis({ title: { text: "Test WAPE (%)", font: { size: 11, color: INK_MUTED } }, range: [0, Math.max(...wape.map((d) => d.wape)) * 1.18] }),
                        yaxis: axis({ gridcolor: "rgba(0,0,0,0)", automargin: true }),
                    }}
                    config={config}
                    className="w-full"
                    useResizeHandler
                    style={{ width: "100%" }}
                />
            </ChartBlock>

            <ChartBlock
                title="Actual vs forecast — test year"
                caption={`${cat}: ${avf.model} (validation-selected). Validation-selected models remained useful on unseen demand, though test error increased.`}
            >
                <Plot
                    data={[
                        {
                            type: "scatter",
                            mode: "lines",
                            name: "Actual",
                            x: avf.dates,
                            y: avf.actual,
                            line: { color: CAT_COLOR[cat], width: 2 },
                            hovertemplate: "%{x}<br>Actual: %{y:,.0f}<extra></extra>",
                        },
                        {
                            type: "scatter",
                            mode: "lines",
                            name: "Forecast",
                            x: avf.dates,
                            y: avf.forecast,
                            line: { color: INK_SECONDARY, width: 2, dash: "dash" },
                            hovertemplate: "%{x}<br>Forecast: %{y:,.0f}<extra></extra>",
                        },
                    ]}
                    layout={{
                        ...baseLayout,
                        height: 360,
                        hovermode: "x unified",
                        legend: { orientation: "h", y: 1.12, font: { color: INK_SECONDARY } },
                        xaxis: axis({}),
                        yaxis: axis({ title: { text: "Daily units sold", font: { size: 11, color: INK_MUTED } }, rangemode: "tozero" }),
                    }}
                    config={config}
                    useResizeHandler
                    style={{ width: "100%" }}
                />
            </ChartBlock>

            <ChartBlock
                title="Weekly demand seasonality"
                caption="Average daily units by weekday, full history (2011–2016). Demand generally rises into the weekend across all three categories."
            >
                <Plot
                    data={CATS.map((c) => ({
                        type: "bar",
                        name: c,
                        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        y: data.weekly[c],
                        marker: { color: CAT_COLOR[c] },
                        hovertemplate: `${c}<br>%{x}: %{y:,.0f} avg units<extra></extra>`,
                    }))}
                    layout={{
                        ...baseLayout,
                        height: 320,
                        barmode: "group",
                        bargap: 0.25,
                        bargroupgap: 0.08,
                        legend: { orientation: "h", y: 1.14, font: { color: INK_SECONDARY } },
                        xaxis: axis({ gridcolor: "rgba(0,0,0,0)" }),
                        yaxis: axis({ title: { text: "Avg daily units", font: { size: 11, color: INK_MUTED } } }),
                    }}
                    config={config}
                    useResizeHandler
                    style={{ width: "100%" }}
                />
            </ChartBlock>

            <ChartBlock
                title="Complexity vs value"
                caption="Test WAPE from the Naive benchmark to the strongest baseline (ETS) to the best observed model per category. Additional complexity helped selectively, not universally."
            >
                <Plot
                    data={CATS.map((c) => ({
                        type: "scatter",
                        mode: "lines+markers+text",
                        name: c,
                        x: ["Naive", "ETS", "Best model"],
                        y: data.complexity[c].map((d) => d.wape),
                        line: { color: CAT_COLOR[c], width: 2 },
                        marker: { size: 9 },
                        text: data.complexity[c].map((d, i) => (i === 2 ? d.stage : "")),
                        textposition: "middle right",
                        cliponaxis: false,
                        textfont: { color: INK_SECONDARY, family: "JetBrains Mono, monospace", size: 11 },
                        customdata: data.complexity[c].map((d) => d.stage),
                        hovertemplate: `${c}<br>%{customdata}: %{y:.2f}% WAPE<extra></extra>`,
                    }))}
                    layout={{
                        ...baseLayout,
                        height: 340,
                        margin: { ...baseLayout.margin, r: 180 },
                        legend: { orientation: "h", y: 1.14, font: { color: INK_SECONDARY } },
                        xaxis: axis({ gridcolor: "rgba(0,0,0,0)" }),
                        yaxis: axis({ title: { text: "Test WAPE (%)", font: { size: 11, color: INK_MUTED } }, rangemode: "tozero" }),
                    }}
                    config={config}
                    useResizeHandler
                    style={{ width: "100%" }}
                />
            </ChartBlock>
        </div>
    );
}
