import { useEffect, useMemo, useState } from "react";
import {
    Bar,
    BarChart,
    Brush,
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

const ChartShell = ({ title, caption, children, className = "", testId }) => (
    <figure data-testid={testId} className={`mt-6 overflow-hidden border border-navy/10 bg-surface/80 ${className}`}>
        <figcaption className="border-b border-navy/10 px-4 py-3 sm:px-5">
            <p className="font-mono text-sm uppercase tracking-wider text-teal">{title}</p>
            <p className="mt-1 text-base leading-relaxed text-navy/60">{caption}</p>
        </figcaption>
        <div className="p-3 sm:p-4">{children}</div>
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

export const rollingAverage = (values, windowSize) => {
    let total = 0;
    return values.map((value, index) => {
        total += value;
        if (index >= windowSize) total -= values[index - windowSize];
        return total / Math.min(index + 1, windowSize);
    });
};

export const paddedDomain = (rows, keys) => {
    const values = rows.flatMap((row) => keys.map((key) => row[key])).filter(Number.isFinite);
    if (!values.length) return [0, 1];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min || Math.abs(max) || 1) * 0.1;
    return [min - padding, max + padding];
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
    const [demandRange, setDemandRange] = useState({ startIndex: 0, endIndex: data.demandRolling.dates.length - 1 });
    const [forecastRange, setForecastRange] = useState({ startIndex: 0, endIndex: data.errorRangeForecasts.FOODS.dates.length - 1 });

    const wape = data.testWape[cat];
    const avf = data.errorRangeForecasts[cat];
    const color = CAT_COLOR[cat];

    useEffect(() => {
        setDemandRange({ startIndex: 0, endIndex: data.demandRolling.dates.length - 1 });
        setForecastRange({ startIndex: 0, endIndex: avf.dates.length - 1 });
    }, [cat, avf.dates.length]);

    const wapeRows = useMemo(() => {
        const best = Math.min(...wape.map((x) => x.wape));
        return [...wape]
            .sort((a, b) => b.wape - a.wape)
            .map((d) => ({ ...d, fill: d.wape === best ? CHART.accent : color }));
    }, [wape, color]);

    const avfRows = useMemo(() => {
        const actualRolling = rollingAverage(avf.actual, 28);
        const bestRolling = rollingAverage(avf.bestForecast, 28);
        const worstRolling = rollingAverage(avf.worstForecast, 28);
        const rows = avf.dates.map((ds, i) => ({
            ds,
            label: fmtDate(ds),
            actual: actualRolling[i],
            best: bestRolling[i],
            worst: worstRolling[i],
        }));
        return rows;
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
            demand: dr[cat][i],
        }));
    }, [cat]);

    const demandDomain = useMemo(
        () => paddedDomain(demandRows.slice(demandRange.startIndex, demandRange.endIndex + 1), ["demand"]),
        [demandRows, demandRange]
    );
    const forecastDomain = useMemo(
        () => paddedDomain(avfRows.slice(forecastRange.startIndex, forecastRange.endIndex + 1), ["actual", "best", "worst"]),
        [avfRows, forecastRange]
    );

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
                    testId="category-demand-chart"
                    title="Category demand (7-day rolling)"
                    caption={`${cat} · full history (2011–2016). Soft purple glow marks Dec 25 — demand collapses to near zero when stores close.`}
                    className="mt-4"
                >
                    <div className="flex justify-end px-3 pt-3 sm:px-4">
                        <button type="button" onClick={() => setDemandRange({ startIndex: 0, endIndex: demandRows.length - 1 })} className="font-mono text-xs uppercase tracking-wider text-teal hover:text-navy">Reset zoom</button>
                    </div>
                    <ResponsiveContainer width="100%" height={320}>
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
                            <YAxis domain={demandDomain} tick={axisStyle} tickFormatter={fmtUnits} axisLine={false} tickLine={false} width={48} />
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
                            <Line type="monotone" dataKey="demand" name={cat} stroke={color} strokeWidth={2} dot={ChristmasGlow(color)} activeDot={{ r: 5 }} />
                            <Brush dataKey="ds" startIndex={demandRange.startIndex} endIndex={demandRange.endIndex} onChange={(range) => range && setDemandRange(range)} height={22} travellerWidth={8} stroke={CHART.inkMuted} fill={CHART.accentSoft} tickFormatter={fmtDate} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartShell>
            )}

            <ChartShell
                testId="actual-forecast-chart"
                title="True demand vs model error range"
                caption={`${cat} · lowest error: ${avf.bestModel} (${avf.bestWape.toFixed(2)}% WAPE) · highest error: ${avf.worstModel} (${avf.worstWape.toFixed(2)}% WAPE). Full 365-day untouched test period using a 28-day rolling average.`}
            >
                <div className="flex justify-end px-3 pt-3 sm:px-4">
                    <button type="button" onClick={() => setForecastRange({ startIndex: 0, endIndex: avfRows.length - 1 })} className="font-mono text-xs uppercase tracking-wider text-teal hover:text-navy">Reset zoom</button>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                    <ComposedChart data={avfRows} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="label" tick={axisStyle} interval="preserveStartEnd" minTickGap={28} axisLine={false} tickLine={false} />
                        <YAxis domain={forecastDomain} tick={axisStyle} tickFormatter={fmtUnits} axisLine={false} tickLine={false} width={44} />
                        <Tooltip
                            content={({ active, payload, label }) =>
                                active && payload?.length ? (
                                    <DarkTooltip
                                        active
                                        label={label}
                                        payload={payload.map((p) => ({
                                            name: p.name,
                                            value: p.value?.toLocaleString(),
                                            color: p.color,
                                        }))}
                                    />
                                ) : null
                            }
                        />
                        <Legend wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: CHART.inkSecondary }} />
                        <Line type="monotone" dataKey="actual" name="True demand" stroke={CHART.inkSecondary} strokeWidth={2.4} dot={false} activeDot={{ r: 4 }} />
                        <Line type="monotone" dataKey="best" name="Lowest error" stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                        <Line type="monotone" dataKey="worst" name="Highest error" stroke={CHART.accent} strokeWidth={2} strokeDasharray="6 4" dot={false} activeDot={{ r: 4 }} />
                        <Brush dataKey="ds" startIndex={forecastRange.startIndex} endIndex={forecastRange.endIndex} onChange={(range) => range && setForecastRange(range)} height={22} travellerWidth={8} stroke={CHART.inkMuted} fill={CHART.accentSoft} tickFormatter={fmtDate} />
                    </ComposedChart>
                </ResponsiveContainer>
            </ChartShell>

            <ChartShell
                    testId="model-accuracy-chart"
                    title="Model accuracy"
                    caption={`Test WAPE by model · ${cat}. Lower is better — best observed model highlighted.`}
                >
                    <ResponsiveContainer width="100%" height={320}>
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

            <div className="mt-2 grid gap-0 lg:grid-cols-2" data-testid="supporting-chart-row">
              <ChartShell testId="weekly-seasonality-chart" title="Weekly seasonality" caption="Average daily units by weekday (2011–2016) across all three categories.">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={weeklyRows} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
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
                        {CATS.map((category) => <Bar key={category} dataKey={category} fill={CAT_COLOR[category]} radius={[3, 3, 0, 0]} maxBarSize={28} />)}
                    </BarChart>
                </ResponsiveContainer>
              </ChartShell>
              <ChartShell testId="complexity-value-chart" title="Complexity vs value" caption="Naive → ETS → best observed model across all three categories. Lower WAPE is better.">
                <ResponsiveContainer width="100%" height={320}>
                    <ComposedChart data={complexityRows} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                        <CartesianGrid {...gridProps} />
                        <XAxis dataKey="step" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis tick={axisStyle} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} domain={[0, "auto"]} />
                        <Tooltip content={({ active, payload, label }) => active && payload?.length ? <DarkTooltip active label={label} payload={payload.map((p) => ({ name: `${p.name} WAPE`, value: `${p.value}%`, color: p.color }))} /> : null} />
                        <Legend wrapperStyle={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: CHART.inkSecondary }} />
                        {CATS.map((category) => <Line key={category} type="monotone" dataKey={category} stroke={CAT_COLOR[category]} strokeWidth={2} dot={{ r: 4, strokeWidth: 0, fill: CAT_COLOR[category] }} activeDot={{ r: 6 }} />)}
                    </ComposedChart>
                </ResponsiveContainer>
              </ChartShell>
            </div>

            <p className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy/60">
                <TrendingUp size={12} className="text-teal/60" />
                Hover charts for values · category tabs update demand, accuracy, and forecast views
            </p>
        </div>
    );
}
