import { useMemo, useState } from "react";
import {
    Area,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Calendar, DollarSign, Target, TrendingUp } from "lucide-react";
import data from "../data/retailForecastCharts.json";
import { CAT_COLOR, CATS, CHART, DAYS, fmtDate, fmtUnits } from "./chartTheme";

const KPI = [
    { icon: Target, value: "7.05%", label: "Best test WAPE", note: "HOUSEHOLD" },
    { icon: DollarSign, value: "$3.01M", label: "Naive excess exposure", note: "FOODS · retail-value" },
    { icon: Calendar, value: "365", label: "Untouched test days", note: "No post-test tuning" },
];

const ChartShell = ({ title, caption, children, className = "" }) => (
    <figure className={`mt-6 overflow-hidden border border-navy/10 bg-surface/80 ${className}`}>
        <figcaption className="border-b border-navy/10 px-4 py-4 sm:px-6">
            <p className="font-mono text-sm uppercase tracking-wider text-teal">{title}</p>
            <p className="mt-1 text-base leading-relaxed text-navy/60">{caption}</p>
        </figcaption>
        <div className="p-3 sm:p-5">{children}</div>
    </figure>
);

const DarkTooltip = ({ active, payload, label, valueLabel = "Value" }) => {
    if (!active || !payload?.length) return null;
    return (
        <div
            className="rounded border px-3 py-2 shadow-lg"
            style={{ background: CHART.tooltipBg, borderColor: CHART.tooltipBorder }}
        >
            {label && (
                <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-navy/50">{label}</p>
            )}
            {payload.map((entry) => (
                <p key={entry.name} className="font-mono text-xs" style={{ color: entry.color || CHART.inkSecondary }}>
                    {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : entry.value}
                    {entry.payload?.effort ? ` · ${entry.payload.effort} effort` : ""}
                </p>
            ))}
            {!payload[0]?.name?.includes("%") && valueLabel === "WAPE" ? null : null}
        </div>
    );
};

const CategoryTabs = ({ value, onChange }) => (
    <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Product category">
        {CATS.map((c) => (
            <button
                key={c}
                type="button"
                role="tab"
                aria-selected={value === c}
                onClick={() => onChange(c)}
                className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs tracking-wider transition-colors ${
                    value === c
                        ? "border-teal/40 bg-teal/5 text-navy"
                        : "border-navy/15 text-navy/50 hover:border-navy/30 hover:text-navy"
                }`}
            >
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: CAT_COLOR[c] }} />
                {c}
            </button>
        ))}
    </div>
);

const tickYear = (ds) => {
    if (ds.endsWith("-12-25")) return `Dec 25 '${ds.slice(2, 4)}`;
    if (ds.endsWith("-01-01")) return ds.slice(0, 4);
    return "";
};

const ChristmasGlow = (seriesColor) =>
    function ChristmasGlowMarker({ cx, cy, payload }) {
        if (!payload?.isChristmas || cx == null || cy == null) return null;
        return (
            <g>
                <circle cx={cx} cy={cy} r={34} fill={CHART.accent} fillOpacity={0.06} />
                <circle cx={cx} cy={cy} r={34} fill="none" stroke={CHART.accent} strokeWidth={2.4} strokeOpacity={0.85} />
                <circle cx={cx} cy={cy} r={5} fill={CHART.accent} stroke={seriesColor} strokeWidth={1.6} />
            </g>
        );
    };

export default function RetailForecastCharts() {
    const [cat, setCat] = useState("FOODS");

    const wape = data.testWape[cat];
    const avf = data.actualVsForecast[cat];
    const color = CAT_COLOR[cat];

    // The plotted series is the validation-selected model, which is not always the best test model.
    const avfWape = useMemo(() => {
        const match = wape.find((d) => d.model === avf.model);
        return match ? `${match.wape.toFixed(2)}%` : "see accuracy chart";
    }, [wape, avf.model]);

    const wapeRows = useMemo(() => {
        const best = Math.min(...wape.map((x) => x.wape));
        return [...wape]
            .sort((a, b) => b.wape - a.wape)
            .map((d) => ({ ...d, fill: d.wape === best ? CHART.accent : color }));
    }, [wape, color]);

    const avfRows = useMemo(() => {
        const rows = avf.dates.map((ds, i) => ({
            ds,
            label: fmtDate(ds),
            actual: avf.actual[i],
            forecast: avf.forecast[i],
        }));
        // Readable window for the main chart — full year available via smaller multiples later if needed
        return rows.slice(0, 120);
    }, [avf]);

    const weeklyRows = useMemo(
        () => DAYS.map((day, i) => ({
            day,
            FOODS: data.weekly.FOODS[i],
            HOBBIES: data.weekly.HOBBIES[i],
            HOUSEHOLD: data.weekly.HOUSEHOLD[i],
        })),
        []
    );

    const complexityRows = useMemo(
        () => [
            { step: "Naive", FOODS: data.complexity.FOODS[0].wape, HOBBIES: data.complexity.HOBBIES[0].wape, HOUSEHOLD: data.complexity.HOUSEHOLD[0].wape },
            { step: "ETS", FOODS: data.complexity.FOODS[1].wape, HOBBIES: data.complexity.HOBBIES[1].wape, HOUSEHOLD: data.complexity.HOUSEHOLD[1].wape },
            { step: "Best", FOODS: data.complexity.FOODS[2].wape, HOBBIES: data.complexity.HOBBIES[2].wape, HOUSEHOLD: data.complexity.HOUSEHOLD[2].wape },
        ],
        []
    );

    const demandRows = useMemo(() => {
        const dr = data.demandRolling;
        if (!dr?.dates) return [];
        return dr.dates.map((ds, i) => ({
            ds,
            tick: tickYear(ds),
            isChristmas: ds.endsWith("-12-25"),
            FOODS: dr.FOODS[i],
            HOBBIES: dr.HOBBIES[i],
            HOUSEHOLD: dr.HOUSEHOLD[i],
        }));
    }, []);

    const axisStyle = { fill: CHART.inkMuted, fontSize: 12, fontFamily: "JetBrains Mono, monospace" };
    const axisStyleSm = { fill: CHART.inkMuted, fontSize: 12, fontFamily: "JetBrains Mono, monospace" };
    const gridProps = { stroke: CHART.grid, vertical: false };

    return (
        <div data-testid="retail-forecast-charts">
            {/* KPI strip — retail dashboard pattern */}
            <div className="mt-8 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-3">
                {KPI.map(({ icon: Icon, value, label, note }) => (
                    <div key={label} className="flex gap-4 bg-surface p-5 sm:p-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-teal/20 bg-teal/5 text-teal">
                            <Icon size={18} strokeWidth={1.75} />
                        </div>
                        <div>
                            <p className="font-display text-2xl font-extrabold tracking-tight text-teal sm:text-3xl">{value}</p>
                            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-navy/70">{label}</p>
                            <p className="mt-0.5 text-xs text-navy/60">{note}</p>
                        </div>
                    </div>
                ))}
            </div>

            <CategoryTabs value={cat} onChange={setCat} />

            {demandRows.length > 0 && (
                <ChartShell
                    title="Category demand (7-day rolling)"
                    caption="Full history (2011–2016). Soft purple glow marks Dec 25 — demand collapses to near zero when stores close."
                    className="mt-4"
                >
                    <ResponsiveContainer width="100%" height={460}>
                        <ComposedChart data={demandRows} margin={{ top: 16, right: 12, left: 4, bottom: 28 }}>
                            <CartesianGrid {...gridProps} />
                            <XAxis
                                dataKey="ds"
                                tickFormatter={tickYear}
                                ticks={demandRows.filter((r) => r.tick).map((r) => r.ds)}
                                tick={axisStyleSm}
                                axisLine={false}
                                tickLine={false}
                                height={40}
                            />
                            <YAxis tick={axisStyle} tickFormatter={fmtUnits} axisLine={false} tickLine={false} width={48} />
                            <Tooltip
                                content={({ active, payload }) =>
                                    active && payload?.length ? (
                                        <DarkTooltip
                                            active
                                            label={payload[0]?.payload?.ds}
                                            payload={payload.map((p) => ({
                                                name: p.name,
                                                value: Number(p.value).toLocaleString(),
                                                color: p.color,
                                            }))}
                                        />
                                    ) : null
                                }
                            />
                            <Legend wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: CHART.inkSecondary }} />
                            {CATS.map((c) => (
                                <Line
                                    key={c}
                                    type="monotone"
                                    dataKey={c}
                                    stroke={CAT_COLOR[c]}
                                    strokeWidth={2}
                                    dot={ChristmasGlow(CAT_COLOR[c])}
                                    activeDot={{ r: 5 }}
                                />
                            ))}
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartShell>
            )}

            <div className="mt-2 grid gap-0 lg:grid-cols-2">
                <ChartShell
                    title="Model accuracy"
                    caption={`Test WAPE by model · ${cat}. Lower is better — best observed model highlighted.`}
                >
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart data={wapeRows} layout="vertical" margin={{ top: 4, right: 48, left: 4, bottom: 4 }}>
                            <CartesianGrid {...gridProps} />
                            <XAxis type="number" domain={[0, "dataMax + 2"]} tick={axisStyle} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="model" width={148} tick={axisStyle} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: CHART.accentSoft }}
                                content={({ active, payload, label }) =>
                                    active && payload?.[0] ? (
                                        <DarkTooltip
                                            active
                                            label={label}
                                            payload={[{ name: "Test WAPE", value: `${payload[0].value}%`, color: color, payload: payload[0].payload }]}
                                        />
                                    ) : null
                                }
                            />
                            <Bar dataKey="wape" radius={[0, 3, 3, 0]} maxBarSize={18}>
                                {wapeRows.map((row) => (
                                    <Cell key={row.model} fill={row.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartShell>

                <ChartShell
                    title="Complexity vs value"
                    caption="Naive → ETS → best observed model. Additional complexity helped selectively, not everywhere."
                >
                    <ResponsiveContainer width="100%" height={380}>
                        <ComposedChart data={complexityRows} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                            <CartesianGrid {...gridProps} />
                            <XAxis dataKey="step" tick={axisStyle} axisLine={false} tickLine={false} />
                            <YAxis tick={axisStyle} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} domain={[0, "auto"]} />
                            <Tooltip
                                content={({ active, payload, label }) =>
                                    active && payload?.length ? (
                                        <DarkTooltip
                                            active
                                            label={label}
                                            payload={payload.map((p) => ({ name: p.name, value: `${p.value}%`, color: p.color }))}
                                        />
                                    ) : null
                                }
                            />
                            <Legend wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: CHART.inkSecondary }} />
                            {CATS.map((c) => (
                                <Line key={c} type="monotone" dataKey={c} stroke={CAT_COLOR[c]} strokeWidth={2} dot={{ r: 4, strokeWidth: 0, fill: CAT_COLOR[c] }} activeDot={{ r: 6 }} />
                            ))}
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartShell>
            </div>

            <ChartShell
                title="Actual vs forecast"
                caption={`${cat} · ${avf.model} — the validation-selected model, shown on the first 120 days of the untouched test year (test WAPE ${avfWape}). Solid area = true demand; dashed line = forecast.`}
            >
                <ResponsiveContainer width="100%" height={440}>
                    <ComposedChart data={avfRows} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                        <defs>
                            <linearGradient id={`demandGrad-${cat}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="label" tick={axisStyle} interval="preserveStartEnd" minTickGap={28} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} tickFormatter={fmtUnits} axisLine={false} tickLine={false} width={44} />
                        <Tooltip
                            content={({ active, payload, label }) =>
                                active && payload?.length ? (
                                    <DarkTooltip
                                        active
                                        label={label}
                                        payload={payload.map((p) => ({
                                            name: p.dataKey === "actual" ? "True demand" : "Forecast",
                                            value: p.value?.toLocaleString(),
                                            color: p.color,
                                        }))}
                                    />
                                ) : null
                            }
                        />
                        <Legend
                            wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: CHART.inkSecondary }}
                            formatter={(v) => (v === "actual" ? "True demand" : "Forecast")}
                        />
                        <Area type="monotone" dataKey="actual" stroke={color} strokeWidth={2} fill={`url(#demandGrad-${cat})`} dot={false} />
                        <Line type="monotone" dataKey="forecast" stroke={CHART.inkSecondary} strokeWidth={2} strokeDasharray="6 4" dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartShell>

            <ChartShell
                title="Weekly seasonality"
                caption="Average daily units by weekday (2011–2016). Demand rises into the weekend across all three categories."
                className="lg:max-w-none"
            >
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyRows} margin={{ top: 8, right: 8, left: 0, bottom: 4 }} barGap={2} barCategoryGap="18%">
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} tickFormatter={fmtUnits} axisLine={false} tickLine={false} width={44} />
                        <Tooltip
                            cursor={{ fill: CHART.accentSoft }}
                            content={({ active, payload, label }) =>
                                active && payload?.length ? (
                                    <DarkTooltip
                                        active
                                        label={label}
                                        payload={payload.map((p) => ({ name: p.name, value: Number(p.value).toLocaleString(), color: p.color }))}
                                    />
                                ) : null
                            }
                        />
                        <Legend wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: CHART.inkSecondary }} />
                        {CATS.map((c) => (
                            <Bar key={c} dataKey={c} fill={CAT_COLOR[c]} radius={[3, 3, 0, 0]} maxBarSize={28} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </ChartShell>

            <p className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy/60">
                <TrendingUp size={12} className="text-teal/60" />
                Hover charts for values · category tabs filter accuracy and forecast views
            </p>
        </div>
    );
}
