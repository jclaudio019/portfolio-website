import { useEffect, useMemo, useState } from "react";
import {
    Area,
    CartesianGrid,
    ComposedChart,
    Line,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Pause, Play, RotateCcw } from "lucide-react";
import data from "../data/timeSeriesCharts.json";
import { CHART } from "./chartTheme";

const WIDTH = 800;
const HEIGHT = 500;
const PAD = 42;

const scale = (value, min, max, start, end) =>
    start + ((value - min) / (max - min || 1)) * (end - start);

const axisStyle = {
    fill: CHART.inkMuted,
    fontSize: 10,
    fontFamily: "JetBrains Mono, monospace",
};

const ForecastTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const row = payload[0].payload;
    const value = row.observed ?? row.forecast;
    return (
        <div className="border border-white/10 bg-[#15151c] px-3 py-2 shadow-xl">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">{row.label || label}</p>
            <p className="mt-1 font-mono text-xs text-white/80">
                {row.observed == null ? "Forecast" : "Observed"}: {value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            {row.lower != null && (
                <p className="font-mono text-[10px] text-white/50">
                    95% interval {row.lower.toFixed(2)}–{row.upper.toFixed(2)}
                </p>
            )}
        </div>
    );
};

export default function TimeSeriesCharts() {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const [step, setStep] = useState(reducedMotion ? 500 : 0);
    const [playing, setPlaying] = useState(false);
    const [forecastKey, setForecastKey] = useState("unemployment");

    useEffect(() => {
        if (!playing || reducedMotion) return undefined;
        const timer = window.setInterval(() => {
            setStep((current) => {
                if (current >= 500) {
                    setPlaying(false);
                    return 500;
                }
                return Math.min(current + 5, 500);
            });
        }, 40);
        return () => window.clearInterval(timer);
    }, [playing, reducedMotion]);

    const bounds = useMemo(() => ({
        minX: Math.min(...data.bridge.map(({ x }) => x)),
        maxX: Math.max(...data.bridge.map(({ x }) => x)),
        minY: Math.min(...data.bridge.map(({ y }) => y)),
        maxY: Math.max(...data.bridge.map(({ y }) => y)),
    }), []);

    const path = useMemo(() => data.bridge.slice(0, step + 1).map(({ x, y }) =>
        `${scale(x, bounds.minX, bounds.maxX, PAD, WIDTH - PAD)},${scale(y, bounds.minY, bounds.maxY, HEIGHT - PAD, PAD)}`
    ).join(" "), [bounds, step]);

    const current = data.bridge[step];
    const currentX = scale(current.x, bounds.minX, bounds.maxX, PAD, WIDTH - PAD);
    const currentY = scale(current.y, bounds.minY, bounds.maxY, HEIGHT - PAD, PAD);
    const forecast = data.forecasts[forecastKey];
    const forecastRows = forecast.rows.map((row) => ({
        ...row,
        interval: row.lower == null ? null : [row.lower, row.upper],
    }));

    const togglePlayback = () => {
        if (reducedMotion) {
            setStep(step === 500 ? 0 : 500);
            return;
        }
        if (step === 500) setStep(0);
        setPlaying(!playing || step === 500);
    };

    return (
        <div className="mt-8 space-y-6" data-testid="time-series-charts">
            <figure className="overflow-hidden border border-white/10 bg-[#0a0a0f] text-white">
                <figcaption className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-purple-400">Brownian bridge simulation</p>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/55">
                            A two-dimensional Brownian bridge wanders unpredictably, yet is constrained to return to its origin.
                        </p>
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-white/45" data-testid="bridge-step">
                        Step {step} / 500
                    </div>
                </figcaption>

                <div className="relative aspect-[16/10] min-h-[20rem] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_58%)] p-3 sm:p-5">
                    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-full w-full" role="img" aria-label={`Brownian bridge shown through step ${step} of 500`}>
                        <defs>
                            <filter id="bridge-glow">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <pattern id="bridge-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,.055)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width={WIDTH} height={HEIGHT} fill="url(#bridge-grid)" />
                        <line x1={PAD} y1={HEIGHT / 2} x2={WIDTH - PAD} y2={HEIGHT / 2} stroke="rgba(255,255,255,.12)" />
                        <line x1={WIDTH / 2} y1={PAD} x2={WIDTH / 2} y2={HEIGHT - PAD} stroke="rgba(255,255,255,.12)" />
                        <polyline points={path} fill="none" stroke="#a855f7" strokeOpacity=".25" strokeWidth="10" filter="url(#bridge-glow)" />
                        <polyline points={path} fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        <circle cx={currentX} cy={currentY} r="11" fill="#a855f7" fillOpacity=".18" />
                        <circle cx={currentX} cy={currentY} r="4" fill="#fff" />
                    </svg>
                    <div className="pointer-events-none absolute bottom-5 left-5 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-wider text-white/45">
                        <span>x <strong className="text-white/80">{current.x.toFixed(2)}</strong></span>
                        <span>y <strong className="text-white/80">{current.y.toFixed(2)}</strong></span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={togglePlayback}
                        data-testid="bridge-play"
                        className="inline-flex min-w-24 items-center justify-center gap-2 border border-purple-400/40 px-4 py-2 font-mono text-xs uppercase tracking-wider text-purple-300 transition-colors hover:bg-purple-400/10"
                    >
                        {playing ? <Pause size={14} /> : step === 500 ? <RotateCcw size={14} /> : <Play size={14} />}
                        {playing ? "Pause" : step === 500 ? "Replay" : "Play"}
                    </button>
                    <label className="flex flex-1 items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                        Path progress
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={step}
                            onChange={(event) => {
                                setPlaying(false);
                                setStep(Number(event.target.value));
                            }}
                            data-testid="bridge-slider"
                            className="w-full accent-purple-500"
                        />
                    </label>
                </div>
            </figure>

            <figure className="overflow-hidden border border-white/10 bg-[#0a0a0f] text-white">
                <figcaption className="border-b border-white/10 px-5 py-5">
                    <p className="font-mono text-xs uppercase tracking-widest text-purple-400">Forecast explorer</p>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/55">
                        Observed history, the 24-month ARIMA forecast, and its widening 95% uncertainty interval.
                    </p>
                    <div className="mt-4 flex gap-2" role="tablist" aria-label="Forecast series">
                        {Object.entries(data.forecasts).map(([key, item]) => (
                            <button
                                key={key}
                                type="button"
                                role="tab"
                                aria-selected={forecastKey === key}
                                onClick={() => setForecastKey(key)}
                                data-testid={`forecast-tab-${key}`}
                                className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${forecastKey === key ? "border-purple-400/50 bg-purple-400/10 text-purple-300" : "border-white/10 text-white/45 hover:text-white/75"}`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </figcaption>

                <div className="p-3 sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-4">
                        <p className="font-display text-xl font-bold text-white">{forecast.title}</p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{forecast.xLabel}</p>
                    </div>
                    <div className="h-[26rem] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={forecastRows} margin={{ top: 12, right: 12, left: 4, bottom: 20 }}>
                                <CartesianGrid stroke={CHART.grid} vertical={false} />
                                <XAxis dataKey="index" tick={axisStyle} axisLine={false} tickLine={false} minTickGap={36} />
                                <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} domain={["auto", "auto"]} />
                                <Tooltip content={<ForecastTooltip />} />
                                <ReferenceLine x={forecast.boundary} stroke="#a855f7" strokeDasharray="4 5" />
                                <Area type="monotone" dataKey="interval" stroke="none" fill="#a855f7" fillOpacity={0.16} connectNulls={false} />
                                <Line type="monotone" dataKey="observed" name="Observed" stroke="#ececf1" strokeWidth={1.8} dot={false} connectNulls={false} />
                                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#c084fc" strokeWidth={2.4} dot={false} connectNulls={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
                        {forecast.yLabel} · dashed line marks the forecast boundary
                    </p>
                </div>
            </figure>
        </div>
    );
}
