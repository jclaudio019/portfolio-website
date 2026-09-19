import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ExternalLink, Github } from "lucide-react";
import {
    Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend,
    Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { CHART } from "../components/chartTheme";
import { loadCreditRiskDashboardData } from "../lib/creditRiskDashboardData";

const REPO = "https://github.com/jclaudio019/credit_risk";
const LINKS = {
    methodology: `${REPO}/blob/main/docs/METHODOLOGY.md`,
    reproduce: `${REPO}#reproduce-the-analysis`,
    limitations: `${REPO}/blob/main/docs/ASSUMPTIONS_AND_LIMITATIONS.md`,
    performance: `${REPO}/blob/main/notebooks/06_pd_oot_validation_and_calibration.ipynb`,
    loss: `${REPO}/blob/main/notebooks/09_expected_loss.ipynb`,
    simulation: `${REPO}/blob/main/notebooks/12_portfolio_loss_simulation.ipynb`,
    monitoring: `${REPO}/blob/main/notebooks/14_model_monitoring.ipynb`,
};
const COLORS = [CHART.accent, "#38bdf8", "#f59e0b", "#34d399", "#f472b6", "#fb7185", "#a3e635"];
const pct = (value, digits = 1) => `${(Number(value) * 100).toFixed(digits)}%`;
const pctTick = (value) => pct(value);
const usd = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(value);
const num = (value) => new Intl.NumberFormat("en-US").format(Math.round(value));

export function getComparableSimulationRows(simulations) {
    const independent = simulations.find((row) => row.simulation === "independent_sample");
    const correlated = simulations.find((row) => row.simulation === "correlated_sample");
    if (!independent || !correlated || !independent.sample_size || independent.sample_size !== correlated.sample_size) {
        throw new Error("Independent and correlated simulations must use the same portfolio sample.");
    }
    return [independent, correlated];
}

const TooltipBox = ({ active, payload, label }) => active && payload?.length ? (
    <div className="border border-navy/20 bg-surface p-3 text-xs shadow-xl">
        <p className="mb-2 font-mono text-navy/60">{label}</p>
        {payload.map((item) => <p key={item.dataKey} style={{ color: item.color }}>{item.name}: {typeof item.value === "number" ? item.value.toLocaleString(undefined, { maximumFractionDigits: 3 }) : item.value}</p>)}
    </div>
) : null;

const ChartFrame = ({ children, label }) => (
    <div className="mt-5 h-72 w-full" role="img" aria-label={label}>{children}</div>
);

const Section = ({ id, eyebrow, title, intro, notebook, children }) => (
    <section id={id} className="scroll-mt-24 border-t border-navy/10 py-12">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal">{eyebrow}</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy">{title}</h2>
                {notebook && <a href={notebook} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-navy/60 hover:text-teal">View notebook <ExternalLink size={12} /></a>}
            </div>
            <div className="min-w-0">
                <p className="max-w-3xl leading-relaxed text-navy/70">{intro}</p>
                {children}
            </div>
        </div>
    </section>
);

const LearnMore = ({ children }) => (
    <details className="mt-5 border border-navy/10 bg-surface/50 px-4 py-3">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider text-teal">How to read this</summary>
        <div className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/65">{children}</div>
    </details>
);

const Metric = ({ label, value, note }) => (
    <div className="border border-navy/10 bg-surface p-5">
        <p className="font-display text-3xl font-extrabold tracking-tight text-teal">{value}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-navy/60">{label}</p>
        {note && <p className="mt-2 text-xs leading-relaxed text-navy/50">{note}</p>}
    </div>
);

const Callout = ({ children, warning = false, testId }) => (
    <div data-testid={testId} className={`mt-5 flex gap-3 border px-4 py-3 text-sm leading-relaxed ${warning ? "border-amber-400/40 bg-amber-400/10 text-amber-100" : "border-teal/30 bg-teal/5 text-navy/75"}`}>
        {warning && <AlertTriangle className="mt-0.5 shrink-0" size={16} />}{children}
    </div>
);

export default function CreditRiskDashboard() {
    const [data, setData] = useState(null);
    const [loadError, setLoadError] = useState("");
    const [thresholdIndex, setThresholdIndex] = useState(5);
    useEffect(() => { let active = true; loadCreditRiskDashboardData().then((result) => active && setData(result)).catch((error) => active && setLoadError(error.message)); return () => { active = false; }; }, []);
    const nav = ["Overview", "Model Performance", "Expected Loss", "Portfolio Risk", "Simulation", "Stress Testing", "Approval Strategy", "Model Monitoring"];
    const selectedThreshold = data?.thresholds.thresholds[thresholdIndex];
    const roc = useMemo(() => data?.model_performance.roc.filter((_, index, rows) => index % Math.max(1, Math.floor(rows.length / 80)) === 0) || [], [data]);
    if (loadError) return <main className="px-6 pb-20 pt-28"><div className="mx-auto max-w-4xl"><Callout warning>Dashboard data could not be loaded: {loadError}. The project page and repository remain available.</Callout></div></main>;
    if (!data) return <main className="flex min-h-[70vh] items-center justify-center font-mono text-sm uppercase tracking-wider text-navy/60">Loading credit-risk case study…</main>;
    const { summary, model_performance: model, portfolio_risk: risk, simulation, stress, thresholds, monitoring, metadata } = data;
    const simRows = getComparableSimulationRows(simulation.simulations);
    const simulationSampleSize = simRows[0].sample_size;
    const simulationChartData = simRows[0].quantiles.map((point, index) => ({
        quantile: point.quantile,
        independent_loss: point.loss,
        correlated_loss: simRows[1]?.quantiles[index]?.loss,
    }));
    const challengerRows = [
        ["Logistic", model.champion_challenger_validation.logistic],
        ["Histogram gradient boosting", model.champion_challenger_validation.hist_gradient_boosting],
    ];
    const baselineBandPopulation = monitoring.risk_band_distribution.find((row) => row.population.startsWith("baseline"))?.population;
    const comparisonBandPopulation = monitoring.risk_band_distribution.find((row) => row.population === "2014")?.population;
    const monitoringBands = ["low", "medium", "high"].map((band) => ({
        band,
        baseline: monitoring.risk_band_distribution.find((row) => row.population === baselineBandPopulation && row.risk_band === band)?.share,
        comparison: monitoring.risk_band_distribution.find((row) => row.population === comparisonBandPopulation && row.risk_band === band)?.share,
    }));
    return (
        <main className="px-6 pb-20 pt-24 lg:px-12 lg:pt-28" data-testid="credit-risk-dashboard">
            <div className="mx-auto max-w-7xl">
                <Link to="/projects/credit-risk-pd-model" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy/60 hover:text-navy"><ArrowLeft size={14} /> Project case study</Link>
                <header className="mt-9 border-b border-navy/10 pb-10">
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">Applied credit risk analytics</p>
                    <h1 className="mt-3 max-w-5xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-navy md:text-7xl">Credit Risk & Portfolio Expected Loss</h1>
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy/70">A notebook-first walkthrough connecting calibrated borrower probability of default to expected loss, portfolio concentration, simulation, stress sensitivity, decision thresholds, and monitoring.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-navy px-4 py-3 font-mono text-xs uppercase tracking-wider text-navy hover:bg-navy hover:text-cream"><Github size={15} /> GitHub repository</a>
                        <a href={LINKS.methodology} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-navy/20 px-4 py-3 font-mono text-xs uppercase tracking-wider text-navy/70 hover:border-teal hover:text-teal">Methodology <ExternalLink size={13} /></a>
                        <a href={LINKS.reproduce} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-navy/20 px-4 py-3 font-mono text-xs uppercase tracking-wider text-navy/70 hover:border-teal hover:text-teal">Reproduce analysis <ExternalLink size={13} /></a>
                        <span className="border border-navy/10 px-4 py-3 font-mono text-xs uppercase tracking-wider text-navy/50">Historical Lending Club · Educational</span>
                    </div>
                </header>
                <nav aria-label="Dashboard sections" className="dashboard-section-nav sticky top-0 z-20 -mx-6 overflow-x-auto border-b border-navy/10 bg-cream/95 px-6 py-3 backdrop-blur"><div className="flex min-w-max gap-5">{nav.map((label) => <a key={label} href={`#${label.toLowerCase().replaceAll(" ", "-")}`} className="font-mono text-xs uppercase tracking-wider text-navy/55 hover:text-teal">{label}</a>)}</div></nav>

                <Section id="overview" eyebrow="01" title="Overview" intro="Start with the portfolio and model outcomes that matter. These figures come directly from the frozen website export, not from calculations recreated in the browser.">
                    <div className="mt-6 grid gap-px bg-navy/10 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Accounts" value={num(summary.total_accounts)} /><Metric label="Portfolio exposure" value={usd(summary.portfolio_exposure)} /><Metric label="Out-of-time AUC" value={summary.oot_roc_auc.toFixed(3)} /><Metric label="Expected loss" value={usd(summary.portfolio_expected_loss)} note={`${pct(summary.portfolio_expected_loss_rate, 2)} of exposure`} /></div>
                    <Callout>{metadata.methodology_disclaimer}</Callout>
                </Section>

                <Section id="model-performance" eyebrow="02" title="Model Performance" notebook={LINKS.performance} intro="A calibrated logistic model was selected for interpretability and end-to-end decision use. Discrimination measures ranking; calibration asks whether predicted probabilities match observed outcomes.">
                    <div className="mt-6 grid gap-px bg-navy/10 sm:grid-cols-3"><Metric label="ROC-AUC" value={model.selected_metrics.roc_auc.toFixed(3)} /><Metric label="KS" value={model.selected_metrics.ks.toFixed(3)} /><Metric label="Brier score" value={model.selected_metrics.brier.toFixed(3)} /></div>
                    <div className="grid gap-6 xl:grid-cols-2">
                        <ChartFrame label="Receiver operating characteristic curve"><ResponsiveContainer><LineChart data={roc} margin={{ top: 18, bottom: 22, left: 24 }}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="fpr" type="number" domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} tickFormatter={pctTick} stroke={CHART.inkMuted} label={{ value: "False Positive Rate", position: "insideBottom", offset: -14, fill: CHART.inkMuted, fontSize: 11 }} /><YAxis width={64} type="number" domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} tickFormatter={pctTick} stroke={CHART.inkMuted} label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", offset: -8, fill: CHART.inkMuted, fontSize: 11 }} /><Tooltip content={<TooltipBox />} /><ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke={CHART.inkMuted} strokeDasharray="4 4" /><Line dataKey="tpr" name="True-positive rate" stroke={CHART.accent} dot={false} strokeWidth={2} /></LineChart></ResponsiveContainer></ChartFrame>
                        <ChartFrame label="Predicted versus observed default calibration"><ResponsiveContainer><LineChart data={model.calibration.filter((row) => row.version === "calibrated")} margin={{ top: 18, bottom: 22, left: 24 }}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="mean_predicted_pd" type="number" domain={[0, 0.3]} ticks={[0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]} tickFormatter={pctTick} stroke={CHART.inkMuted} label={{ value: "Mean Predicted PD", position: "insideBottom", offset: -14, fill: CHART.inkMuted, fontSize: 11 }} /><YAxis width={64} type="number" domain={[0, 0.3]} tickFormatter={pctTick} stroke={CHART.inkMuted} label={{ value: "Observed Default Rate", angle: -90, position: "insideLeft", offset: -8, fill: CHART.inkMuted, fontSize: 11 }} /><Tooltip content={<TooltipBox />} /><ReferenceLine segment={[{ x: 0, y: 0 }, { x: 0.3, y: 0.3 }]} stroke={CHART.inkMuted} strokeDasharray="4 4" /><Line dataKey="observed_default_rate" name="Observed default" stroke="#38bdf8" dot /></LineChart></ResponsiveContainer></ChartFrame>
                    </div>
                    <div className="mt-6 overflow-x-auto border border-navy/10 bg-surface/50">
                        <table className="w-full min-w-[620px] text-left text-sm">
                            <caption className="px-4 pb-2 pt-4 text-left font-mono text-xs uppercase tracking-wider text-navy/60">Validation comparison before final calibration</caption>
                            <thead className="border-y border-navy/10 font-mono text-xs uppercase tracking-wider text-navy/50"><tr><th className="px-4 py-3">Model</th><th className="px-4 py-3">ROC-AUC</th><th className="px-4 py-3">KS</th><th className="px-4 py-3">Brier</th><th className="px-4 py-3">Log loss</th></tr></thead>
                            <tbody>{challengerRows.map(([label, values]) => <tr key={label} className="border-b border-navy/10 last:border-0"><th className="px-4 py-3 font-medium text-navy/75">{label}</th><td className="px-4 py-3">{values.roc_auc.toFixed(3)}</td><td className="px-4 py-3">{values.ks.toFixed(3)}</td><td className="px-4 py-3">{values.brier.toFixed(3)}</td><td className="px-4 py-3">{values.log_loss.toFixed(3)}</td></tr>)}</tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-navy/60">The nonlinear challenger did not provide a meaningful ranking improvement. Additional complexity should earn its place before replacing an interpretable credit-risk model; final probability quality is assessed after calibration.</p>
                    <LearnMore>ROC-AUC of 0.669 means the model ranks a randomly selected default above a randomly selected non-default about 67% of the time. It does not mean 67% accuracy. The bootstrap interval ({model.bootstrap_auc.auc_ci_low.toFixed(3)}–{model.bootstrap_auc.auc_ci_high.toFixed(3)}) describes sampling uncertainty, while the calibration plot compares probability levels with observed outcomes.</LearnMore>
                </Section>

                <Section id="expected-loss" eyebrow="03" title="Expected Loss" notebook={LINKS.loss} intro="Expected loss combines how likely default is, how much is lost if it occurs, and how much is exposed: EL = PD × LGD × EAD.">
                    <p className="mt-4 text-sm leading-relaxed text-navy/60">LGD is an educational empirical proxy and assumption; EAD uses funded amount as the exposure proxy.</p>
                    <div className="mt-6 grid gap-px bg-navy/10 sm:grid-cols-3"><Metric label="Exposure-weighted PD" value={pct(summary.exposure_weighted_average_pd, 2)} /><Metric label="Expected loss rate" value={pct(summary.portfolio_expected_loss_rate, 2)} /><Metric label="Expected loss" value={usd(summary.portfolio_expected_loss)} /></div>
                    <LearnMore>PD is the calibrated probability of default. LGD is the share of exposure lost after recoveries. EAD is the amount exposed at default. The portfolio estimate uses documented simplifying assumptions, so it is an educational risk estimate—not CECL, IFRS 9, regulatory capital, pricing, or a reserve recommendation.</LearnMore>
                </Section>

                <Section id="portfolio-risk" eyebrow="04" title="Portfolio Risk" intro="Risk is not evenly distributed. The views below separate account mix, exposure, and expected loss so concentration is visible rather than hidden behind one portfolio average.">
                    <div className="grid gap-6 xl:grid-cols-2">
                        <ChartFrame label="Exposure and expected loss by loan grade"><ResponsiveContainer><BarChart data={risk.by_grade}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="grade" stroke={CHART.inkMuted} /><YAxis tickFormatter={usd} stroke={CHART.inkMuted} /><Tooltip content={<TooltipBox />} /><Legend /><Bar dataKey="exposure" name="Exposure" fill="#38bdf8" /><Bar dataKey="expected_loss" name="Expected loss" fill={CHART.accent} /></BarChart></ResponsiveContainer></ChartFrame>
                        <ChartFrame label="Expected loss by risk band"><ResponsiveContainer><BarChart data={risk.by_risk_band}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="risk_band" stroke={CHART.inkMuted} /><YAxis tickFormatter={usd} stroke={CHART.inkMuted} /><Tooltip content={<TooltipBox />} /><Bar dataKey="expected_loss" name="Expected loss">{risk.by_risk_band.map((row, index) => <Cell key={row.risk_band} fill={COLORS[index]} />)}</Bar></BarChart></ResponsiveContainer></ChartFrame>
                    </div>
                    <LearnMore>A segment can matter because it is risky, large, or both. Expected-loss share should therefore be read beside exposure share and observed default rates, not as a standalone ranking of borrower quality.</LearnMore>
                </Section>

                <Section id="simulation" eyebrow="05" title="Simulation" notebook={LINKS.simulation} intro="Monte Carlo simulation turns account-level default uncertainty into a distribution of portfolio loss. The correlated scenario adds a shared systematic factor so defaults can rise together.">
                    <ChartFrame label="Independent and correlated simulated loss distributions"><ResponsiveContainer><AreaChart data={simulationChartData}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="quantile" type="number" domain={[0, 1]} tickFormatter={pctTick} stroke={CHART.inkMuted} /><YAxis tickFormatter={usd} stroke={CHART.inkMuted} /><Tooltip content={<TooltipBox />} /><Legend /><Area dataKey="independent_loss" name="Independent defaults" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.12} /><Area dataKey="correlated_loss" name="Correlated defaults" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.12} /></AreaChart></ResponsiveContainer></ChartFrame>
                    <p className="mt-3 text-sm leading-relaxed text-navy/60">Holding the same {num(simulationSampleSize)}-account sample constant, introducing correlated defaults materially increases tail loss.</p>
                    <div data-testid="simulation-comparison" data-sample-size={simulationSampleSize} className="mt-4 grid gap-px bg-navy/10 sm:grid-cols-2">{simRows.map((row) => <Metric key={row.simulation} label={`${row.kind === "independent" ? "Independent" : "Correlated"} VaR 95`} value={usd(row.var_95)} note={`Expected shortfall: ${usd(row.expected_shortfall_95)}`} />)}</div>
                    <Callout warning>{simulation.correlation_note} Correlation is an assumption, not an empirically calibrated parameter.</Callout>
                </Section>

                <Section id="stress-testing" eyebrow="06" title="Stress Testing" intro="These scenarios apply transparent shifts to PD, LGD, and EAD. They show sensitivity under worsening conditions; they are not regulatory macroeconomic stress tests.">
                    <ChartFrame label="Expected loss under baseline, mild, and severe sensitivity scenarios"><ResponsiveContainer><BarChart data={stress.scenarios}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="label" stroke={CHART.inkMuted} /><YAxis tickFormatter={usd} stroke={CHART.inkMuted} /><Tooltip content={<TooltipBox />} /><Bar dataKey="expected_loss" name="Expected loss">{stress.scenarios.map((row, index) => <Cell key={row.scenario} fill={COLORS[index]} />)}</Bar></BarChart></ResponsiveContainer></ChartFrame>
                    <Callout>{stress.terminology}</Callout>
                </Section>

                <Section id="approval-strategy" eyebrow="07" title="Approval Strategy" intro="A threshold converts ranked probabilities into a policy rule. Moving it changes approval volume, approved exposure, expected defaults, and loss at the same time.">
                    <label className="mt-6 block font-mono text-xs uppercase tracking-wider text-navy/60">PD threshold: {pct(selectedThreshold.pd_threshold, 0)}<input data-testid="threshold-slider" className="mt-3 w-full accent-purple-500" type="range" min="0" max={thresholds.thresholds.length - 1} value={thresholdIndex} onChange={(e) => setThresholdIndex(Number(e.target.value))} /></label>
                    <div data-testid="threshold-results" className="mt-5 grid gap-px bg-navy/10 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Approval rate" value={pct(selectedThreshold.approval_rate)} /><Metric label="Approved accounts" value={num(selectedThreshold.approved_accounts)} /><Metric label="Approved exposure" value={usd(selectedThreshold.approved_exposure)} /><Metric label="Average approved PD" value={pct(selectedThreshold.average_approved_pd, 2)} /><Metric label="Expected defaults" value={num(selectedThreshold.expected_defaults)} /><Metric label="Expected loss" value={usd(selectedThreshold.expected_loss)} note={`${pct(selectedThreshold.expected_loss_rate, 2)} of approved exposure`} /></div>
                    <LearnMore>{thresholds.decision_rule} {thresholds.limitation} This tool demonstrates the trade-off; it does not recommend an approval policy.</LearnMore>
                </Section>

                <Section id="model-monitoring" eyebrow="08" title="Model Monitoring" notebook={LINKS.monitoring} intro="Monitoring asks whether the scoring population and model behavior remain stable after development. PSI measures population shift; vintage views compare predicted and observed outcomes through time.">
                    <div className="mt-6 grid gap-px bg-navy/10 sm:grid-cols-2"><Metric label="2014 population PSI" value={monitoring.psi_2014.toFixed(3)} note={`${monitoring.baseline_population} baseline`} /><Metric label="2014 observed / expected" value={monitoring.vintage_performance.at(-1).observed_to_expected.toFixed(2)} /></div>
                    <ChartFrame label="Predicted and observed default by issue vintage"><ResponsiveContainer><ComposedChart data={monitoring.vintage_performance}><CartesianGrid stroke={CHART.grid} /><XAxis dataKey="issue_year" stroke={CHART.inkMuted} /><YAxis tickFormatter={pctTick} stroke={CHART.inkMuted} /><Tooltip content={<TooltipBox />} /><Legend /><Line dataKey="mean_pd" name="Mean predicted PD" stroke={CHART.accent} strokeWidth={2} /><Line dataKey="observed_default_rate" name="Observed default" stroke="#38bdf8" strokeWidth={2} /></ComposedChart></ResponsiveContainer></ChartFrame>
                    <div className="mt-5 overflow-x-auto border border-navy/10 bg-surface/50">
                        <table className="w-full min-w-[520px] text-left text-sm">
                            <caption className="px-4 pb-2 pt-4 text-left font-mono text-xs uppercase tracking-wider text-navy/60">Risk-band population movement</caption>
                            <thead className="border-y border-navy/10 font-mono text-xs uppercase tracking-wider text-navy/50"><tr><th className="px-4 py-3">Risk band</th><th className="px-4 py-3">{monitoring.baseline_population}</th><th className="px-4 py-3">{monitoring.comparison_population}</th></tr></thead>
                            <tbody>{monitoringBands.map((row) => <tr key={row.band} className="border-b border-navy/10 last:border-0"><th className="px-4 py-3 font-medium capitalize text-navy/75">{row.band}</th><td className="px-4 py-3">{pct(row.baseline)}</td><td className="px-4 py-3">{pct(row.comparison)}</td></tr>)}</tbody>
                        </table>
                    </div>
                    <Callout warning testId="seasoning-warning">{monitoring.seasoning_warning}</Callout>
                    <LearnMore>PSI summarizes distribution shift but does not diagnose its cause or prove model failure. Vintage comparisons also need mature outcomes: a recent book can look artificially safer because some defaults have not had time to emerge.</LearnMore>
                </Section>

                <section className="border-t border-navy/10 py-12">
                    <p className="font-mono text-xs uppercase tracking-wider text-teal">Limitations & responsible use</p>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">{metadata.limitations.map((item) => <li key={item} className="border border-navy/10 bg-surface p-4 text-sm leading-relaxed text-navy/65">{item}</li>)}</ul>
                    <p className="mt-5 text-xs leading-relaxed text-navy/45">Export provenance: canonical analytical outputs from repository commit {metadata.repository_commit.slice(0, 10)}.</p>
                    <a href={LINKS.limitations} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-teal hover:text-teal-hover">Read the complete assumptions and limitations <ExternalLink size={12} /></a>
                </section>
            </div>
        </main>
    );
}
