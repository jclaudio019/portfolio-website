import retailData from "../data/retailForecastCharts.json";
import timeSeriesData from "../data/timeSeriesCharts.json";
import { scoreCreditRisk } from "../lib/creditRiskScoring";
import { blackScholes, positionHedge } from "../lib/blackScholes";

const DATA_COVER_SLUGS = new Set([
    "retail-demand-forecasting",
    "credit-risk-pd-model",
    "time-series-analysis-r",
    "black-scholes-options-modeling",
]);

const sampleCreditResult = scoreCreditRisk({
    grade: "C", interestRate: 13.5, annualIncome: 60000, debtToIncome: 18,
    loanTerm: 36, employmentLength: 5, homeOwnership: "MORTGAGE",
    inquiriesLast6Months: 1, state: "CA", verificationStatus: "Source Verified",
    purpose: "debt_consolidation", initialListStatus: "f", monthsSinceIssue: 50,
    monthsSinceEarliestCreditLine: 240, accountsCurrentlyDelinquent: 0,
    monthsSinceLastDelinquency: null, monthsSinceLastPublicRecord: null,
});

const optionScenario = {
    stockPrice: 190, strike: 195, rate: 0.045, dividendYield: 0.006,
    timeYears: 45 / 365, optionType: "call",
};

const optionRows = [["Implied", 0.24], ["GARCH", 0.29]].map(([label, volatility]) => {
    const model = blackScholes({ ...optionScenario, volatility });
    return { label, volatility, ...model, ...positionHedge({ ...model, signedContracts: 1 }) };
});

const CoverLabel = ({ eyebrow, title }) => (
    <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-3 pt-10 text-white">
        <p className="font-mono text-[10px] uppercase tracking-widest text-purple-300">{eyebrow}</p>
        <p className="mt-1 font-display text-sm font-bold leading-tight sm:text-base">{title}</p>
    </div>
);

function ForecastCover() {
    const rows = Object.entries(retailData.testWape).map(([category, models]) => ({
        category,
        ...models.reduce((best, row) => row.wape < best.wape ? row : best),
    }));

    return (
        <div className="h-full bg-[#0a0a0f] px-4 pb-16 pt-12 text-white" role="img" aria-label="Best test WAPE by retail category; lower values indicate more accurate forecasts">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/55">
                <span>Best model accuracy</span><span>Lower is better</span>
            </div>
            <div className="mt-4 space-y-3">
                {rows.map((row) => (
                    <div key={row.category} className="grid grid-cols-[4.75rem_1fr_2.75rem] items-center gap-2">
                        <span className="font-mono text-[9px] text-white/65">{row.category}</span>
                        <div className="h-2 bg-white/10">
                            <div className="h-full bg-gradient-to-r from-purple-700 to-purple-300" style={{ width: `${Math.min(row.wape * 5, 100)}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-purple-200">{row.wape.toFixed(2)}%</span>
                    </div>
                ))}
            </div>
            <CoverLabel eyebrow="Forecast validation" title="Which model best predicts demand?" />
        </div>
    );
}

function CreditCover() {
    const score = Math.round(sampleCreditResult.score);
    const pd = `${(sampleCreditResult.pd * 100).toFixed(1)}%`;

    return (
        <div className="grid h-full grid-cols-[1fr_1.1fr] bg-[#0a0a0f] px-4 pb-16 pt-12 text-white" role="img" aria-label={`Illustrative credit scorecard result: score ${score}, probability of default ${pd}`}>
            <div className="border-r border-white/10 pr-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">Sample inputs</p>
                <dl className="mt-3 space-y-2 text-[10px]">
                    <div className="flex justify-between gap-2"><dt className="text-white/50">Grade</dt><dd>C</dd></div>
                    <div className="flex justify-between gap-2"><dt className="text-white/50">Income</dt><dd>$60K</dd></div>
                    <div className="flex justify-between gap-2"><dt className="text-white/50">DTI</dt><dd>18%</dd></div>
                </dl>
            </div>
            <div className="pl-3">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">Illustrative result</p>
                <div className="mt-2 flex items-end gap-3">
                    <strong className="font-display text-3xl text-purple-300">{score}</strong>
                    <span className="pb-1 font-mono text-[9px] uppercase text-white/50">Score</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-white/75">PD {pd}</p>
            </div>
            <CoverLabel eyebrow="Interpretable scorecard" title="How do borrower inputs shape risk?" />
        </div>
    );
}

function TimeSeriesCover() {
    const width = 640;
    const height = 310;
    const pad = 24;
    const xs = timeSeriesData.bridge.map(({ x }) => x);
    const ys = timeSeriesData.bridge.map(({ y }) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const scale = (value, min, max, start, end) => start + ((value - min) / (max - min || 1)) * (end - start);
    const points = timeSeriesData.bridge.map(({ x, y }) =>
        `${scale(x, minX, maxX, pad, width - pad)},${scale(y, minY, maxY, height - pad, pad)}`
    ).join(" ");
    const originX = scale(0, minX, maxX, pad, width - pad);
    const originY = scale(0, minY, maxY, height - pad, pad);

    return (
        <div className="h-full bg-[#0a0a0f] pb-14 pt-8 text-white" role="img" aria-label="Animated Brownian bridge path beginning and ending at the origin">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-hidden="true">
                <defs>
                    <pattern id="cover-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,.055)" />
                    </pattern>
                    <filter id="cover-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <rect width={width} height={height} fill="url(#cover-grid)" />
                <line x1={pad} y1={originY} x2={width - pad} y2={originY} stroke="rgba(255,255,255,.12)" />
                <line x1={originX} y1={pad} x2={originX} y2={height - pad} stroke="rgba(255,255,255,.12)" />
                <polyline className="project-cover-path" pathLength="1" points={points} fill="none" stroke="#c084fc" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" filter="url(#cover-glow)" />
                <circle cx={originX} cy={originY} r="5" fill="#fff" />
            </svg>
            <CoverLabel eyebrow="Brownian bridge" title="A path that starts and returns to zero" />
        </div>
    );
}

function OptionsCover() {
    return (
        <div className="h-full bg-[#0a0a0f] px-4 pb-16 pt-12 text-white" role="img" aria-label="Illustrative Black-Scholes scenario comparing implied and GARCH volatility inputs">
            <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/55">
                <span>AAPL call · $195 strike</span><span>45 days</span>
            </div>
            <div className="mt-3 overflow-hidden border border-white/10">
                <div className="grid grid-cols-4 bg-white/5 px-2 py-1.5 font-mono text-[8px] uppercase text-white/50">
                    <span>Model</span><span>Vol.</span><span>Price</span><span>Hedge</span>
                </div>
                {optionRows.map((row) => (
                    <div key={row.label} className="grid grid-cols-4 border-t border-white/10 px-2 py-2 font-mono text-[10px]">
                        <span className="text-purple-300">{row.label}</span>
                        <span>{(row.volatility * 100).toFixed(0)}%</span>
                        <span>${row.price.toFixed(2)}</span>
                        <span>{Math.round(row.targetStockHedge)}</span>
                    </div>
                ))}
            </div>
            <CoverLabel eyebrow="Options scenario" title="How volatility changes price and hedge" />
        </div>
    );
}

const dataCovers = {
    "retail-demand-forecasting": ForecastCover,
    "credit-risk-pd-model": CreditCover,
    "time-series-analysis-r": TimeSeriesCover,
    "black-scholes-options-modeling": OptionsCover,
};

export default function ProjectCover({ project, detail = false }) {
    if (!DATA_COVER_SLUGS.has(project.slug)) {
        return (
            <div className={detail ? "flex w-full justify-center" : "aspect-video overflow-hidden"} data-testid={`project-image-cover-${project.slug}`}>
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    data-testid={detail ? "project-hero-image" : undefined}
                    className={detail
                        ? "max-h-[68vh] w-auto max-w-full object-contain object-center"
                        : "h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"}
                />
            </div>
        );
    }

    const Cover = dataCovers[project.slug];
    return (
        <div className={`relative w-full overflow-hidden bg-[#0a0a0f] ${detail ? "aspect-[16/7]" : "aspect-video"}`} data-testid={`project-data-cover-${project.slug}`}>
            <Cover />
        </div>
    );
}
