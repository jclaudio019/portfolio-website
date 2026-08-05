import { useParams, Link } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { ArrowLeft, Github, ArrowUpRight, ChevronDown } from "lucide-react";
import { projects } from "../data/content";
import { Reveal } from "../components/Reveal";

const RetailForecastCharts = lazy(() => import("../components/RetailForecastCharts"));
const CreditRiskScoreExplorer = lazy(() => import("../components/CreditRiskScoreExplorer"));
const TimeSeriesCharts = lazy(() => import("../components/TimeSeriesCharts"));

const Section = ({ label, children, wide = false }) => (
    <Reveal className="grid gap-4 border-t border-navy/10 py-10 md:grid-cols-[220px_1fr] md:gap-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-teal">{label}</h2>
        <div className={`min-w-0 text-navy/80 ${wide ? "" : "max-w-4xl"}`}>{children}</div>
    </Reveal>
);

/** Baseline + chosen model per category, so the headline contrast reads without the full grid. */
const compactExposure = (rows = []) => {
    const byCategory = new Map();
    rows.forEach((row) => {
        if (!byCategory.has(row.category)) byCategory.set(row.category, []);
        byCategory.get(row.category).push(row);
    });
    return [...byCategory.values()].flatMap((group) =>
        group.length > 1 ? [group[0], group[group.length - 1]] : group
    );
};

/** Progressive disclosure so the page stays scannable; detail stays one click away. */
const Disclosure = ({ summary, children }) => (
    <details className="group mt-4 border border-navy/10 bg-surface/40">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-navy/60 transition-colors hover:text-navy">
            {summary}
            <ChevronDown size={14} className="shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-navy/10 px-4 py-5">{children}</div>
    </details>
);

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);
    const index = projects.findIndex((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-6" data-testid="project-not-found">
                <p className="font-display text-3xl font-bold text-navy">Project not found</p>
                <Link to="/projects" className="mt-6 nav-underline font-mono text-xs uppercase tracking-widest text-teal">
                    ← Back to projects
                </Link>
            </div>
        );
    }

    // Only offer a "next project" when another case study actually exists
    const next = projects[index + 1] ?? null;
    const isInProgress = project.status === "In progress";

    return (
        <div className="px-6 pb-24 pt-32 lg:px-12 lg:pt-40" data-testid="project-detail-page">
            <div className="site-shell">
                <Link
                    to="/projects"
                    data-testid="back-to-projects"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy/60 transition-colors hover:text-navy"
                >
                    <ArrowLeft size={14} /> All Projects
                </Link>

                <Reveal>
                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <p className="font-mono text-xs uppercase tracking-widest text-teal">
                            {String(index + 1).padStart(2, "0")} — {project.category}
                        </p>
                        {project.status && (
                            <span
                                data-testid="project-status"
                                className="bg-teal px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-cream"
                            >
                                {project.status}
                            </span>
                        )}
                    </div>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-tighter text-navy">
                        {project.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/70">
                        {project.summary}
                    </p>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        data-testid="project-github-link"
                        className="mt-6 inline-flex items-center gap-2 border border-navy px-5 py-3 font-mono text-xs uppercase tracking-widest text-navy transition-colors hover:bg-navy hover:text-cream"
                    >
                        <Github size={16} /> View on GitHub
                    </a>
                </Reveal>

                {/* Hero image */}
                <Reveal className="mt-12">
                    <div className="overflow-hidden border border-navy/10 bg-surface">
                        <img
                            src={project.image}
                            alt={`${project.title} project overview`}
                            className="h-full w-full object-contain object-top"
                        />
                    </div>
                    {project.imageCaption && (
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy/40">
                            {project.imageCaption}
                        </p>
                    )}
                </Reveal>

                {!isInProgress && (
                    <>
                        {/* Metrics */}
                        <Reveal className="mt-12 grid grid-cols-1 gap-px border border-navy/10 bg-navy/10 sm:grid-cols-3">
                            {project.metrics.map((m) => (
                                <div key={m.label} className="bg-surface p-6">
                                    <p className="font-display text-4xl font-extrabold tracking-tighter text-teal">
                                        {m.value}
                                    </p>
                                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-navy/60">
                                        {m.label}
                                    </p>
                                </div>
                            ))}
                        </Reveal>
                        {project.metricsNote && (
                            <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-wide text-navy/45">
                                {project.metricsNote}
                            </p>
                        )}
                    </>
                )}

                {/* Story sections */}
                <div className="mt-16">
                    <Section label="Business Problem">
                        <p className="leading-relaxed">{project.problem}</p>
                    </Section>
                    {isInProgress ? (
                        <Section label="In progress">
                            <p className="leading-relaxed">
                                This project is in progress. This page will be updated as the research and analysis develop.
                            </p>
                        </Section>
                    ) : (
                        <>
                    {(project.solutionParagraphs || project.solution) && (
                        <Section label="Solution">
                            {project.solutionParagraphs ? (
                                <div className="space-y-4">
                                    {project.solutionParagraphs.map((paragraph, i) => (
                                        <p key={i} className="leading-relaxed">{paragraph}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="leading-relaxed">{project.solution}</p>
                            )}
                        </Section>
                    )}
                    <Section label="Dataset">
                        <p className="leading-relaxed">{project.dataset}</p>
                    </Section>
                    <Section label="Methodology">
                        {project.methodologySummary && (
                            <p className="leading-relaxed">{project.methodologySummary}</p>
                        )}
                        <Disclosure summary={`Step-by-step method · ${project.methodology.length} steps`}>
                            <ul className="space-y-3">
                                {project.methodology.map((step, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </Disclosure>
                    </Section>
                    <Section label="Findings" wide>
                        <p className="leading-relaxed">{project.findings}</p>
                        {project.gallery?.length > 0 && (
                            <div className="mt-8 space-y-8">
                                {project.gallery.map((item) => (
                                    <figure key={item.src} className="border border-navy/10 bg-surface/50">
                                        <div className="min-h-[28rem] bg-surface p-2 sm:min-h-[32rem] sm:p-4">
                                            <img
                                                src={item.src}
                                                alt={item.caption}
                                                className="h-full w-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        <figcaption className="border-t border-navy/10 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-navy/40">
                                            {item.caption}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        )}
                        {project.slug === "retail-demand-forecasting" ? (
                            <Suspense
                                fallback={
                                    <div className="mt-6 flex aspect-[16/6] items-center justify-center border border-dashed border-navy/20 bg-surface/50">
                                        <span className="font-mono text-xs uppercase tracking-widest text-navy/40">Loading charts…</span>
                                    </div>
                                }
                            >
                                <RetailForecastCharts />
                            </Suspense>
                        ) : null}
                        {project.slug === "credit-risk-pd-model" ? (
                            <Suspense
                                fallback={
                                    <div className="mt-6 flex aspect-[16/6] items-center justify-center border border-dashed border-navy/20 bg-surface/50">
                                        <span className="font-mono text-xs uppercase tracking-widest text-navy/40">Loading score explorer…</span>
                                    </div>
                                }
                            >
                                <CreditRiskScoreExplorer />
                            </Suspense>
                        ) : null}
                        {project.slug === "time-series-analysis-r" ? (
                            <Suspense
                                fallback={
                                    <div className="mt-6 flex aspect-[16/6] items-center justify-center border border-dashed border-navy/20 bg-surface/50">
                                        <span className="font-mono text-xs uppercase tracking-widest text-navy/40">Loading time-series explorer…</span>
                                    </div>
                                }
                            >
                                <TimeSeriesCharts />
                            </Suspense>
                        ) : null}
                    </Section>
                    {project.financialInterpretation && (
                        <Section label="Operations & Finance" wide>
                            <div className="space-y-4">
                                <p className="leading-relaxed">{project.financialInterpretation.intro}</p>
                                <p className="border border-teal/30 bg-teal/5 px-4 py-3 text-sm leading-relaxed text-navy/80">
                                    {project.financialInterpretation.caveat}
                                </p>
                                <div className="overflow-x-auto border border-navy/10">
                                    <table className="min-w-full text-left text-sm">
                                        <thead className="bg-surface font-mono text-[11px] uppercase tracking-widest text-navy/50">
                                            <tr>
                                                <th className="px-3 py-3">Category</th>
                                                <th className="px-3 py-3">Model</th>
                                                <th className="px-3 py-3">Missed-sales retail value</th>
                                                <th className="px-3 py-3">Excess-inventory retail value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {compactExposure(project.financialInterpretation.exposureRows).map((row) => (
                                                <tr key={`compact-${row.category}-${row.model}`} className="border-t border-navy/10">
                                                    <td className="px-3 py-2.5 font-mono text-xs text-teal">{row.category}</td>
                                                    <td className="px-3 py-2.5 text-navy/80">{row.model}</td>
                                                    <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.missedValue}</td>
                                                    <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.excessValue}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Disclosure summary="Full exposure detail · all models and unit counts">
                                    <div className="overflow-x-auto border border-navy/10">
                                        <table className="min-w-full text-left text-sm">
                                            <thead className="bg-surface font-mono text-[11px] uppercase tracking-widest text-navy/50">
                                                <tr>
                                                    <th className="px-3 py-3">Category</th>
                                                    <th className="px-3 py-3">Model</th>
                                                    <th className="px-3 py-3">Under-forecast units</th>
                                                    <th className="px-3 py-3">Missed-sales retail value</th>
                                                    <th className="px-3 py-3">Over-forecast units</th>
                                                    <th className="px-3 py-3">Excess-inventory retail value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.financialInterpretation.exposureRows.map((row) => (
                                                    <tr key={`${row.category}-${row.model}`} className="border-t border-navy/10">
                                                        <td className="px-3 py-2.5 font-mono text-xs text-teal">{row.category}</td>
                                                        <td className="px-3 py-2.5 text-navy/80">{row.model}</td>
                                                        <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.underUnits}</td>
                                                        <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.missedValue}</td>
                                                        <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.overUnits}</td>
                                                        <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.excessValue}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-teal hover:text-teal-hover"
                                    >
                                        Full report and code <ArrowUpRight size={13} />
                                    </a>
                                </Disclosure>
                                <p className="leading-relaxed">{project.financialInterpretation.takeaway}</p>
                                <p className="leading-relaxed">{project.financialInterpretation.priorityIntro}</p>
                                <div className="overflow-x-auto border border-navy/10">
                                    <table className="min-w-full text-left text-sm">
                                        <thead className="bg-surface font-mono text-[11px] uppercase tracking-widest text-navy/50">
                                            <tr>
                                                <th className="px-3 py-3">Category</th>
                                                <th className="px-3 py-3">Test units</th>
                                                <th className="px-3 py-3">Retail value</th>
                                                <th className="px-3 py-3">Avg unit price</th>
                                                <th className="px-3 py-3">Recommended focus</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {project.financialInterpretation.priorityRows.map((row) => (
                                                <tr key={row.category} className="border-t border-navy/10 align-top">
                                                    <td className="px-3 py-2.5 font-mono text-xs text-teal">{row.category}</td>
                                                    <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.units}</td>
                                                    <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.retailValue}</td>
                                                    <td className="px-3 py-2.5 font-mono text-xs text-navy/70">{row.avgPrice}</td>
                                                    <td className="px-3 py-2.5 text-navy/75">{row.focus}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Section>
                    )}
                    <Section label="Business Implications">
                        <p className="leading-relaxed">{project.implications}</p>
                    </Section>
                    {(project.conclusionParagraphs || project.conclusion) && (
                        <Section label="Conclusion">
                            {project.conclusionParagraphs ? (
                                <div className="space-y-4">
                                    {project.conclusionParagraphs.map((paragraph, i) => (
                                        <p key={i} className="leading-relaxed">{paragraph}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="leading-relaxed">{project.conclusion}</p>
                            )}
                        </Section>
                    )}
                    {project.nextSteps?.length > 0 && (
                        <Section label="Worth Digging Deeper">
                            <ul className="space-y-3">
                                {project.nextSteps.map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}
                    {project.limitations?.length > 0 && (
                        <Section label="Limitations">
                            <ul className="space-y-3">
                                {project.limitations.map((item, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}
                    <Section label="Technologies">
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span key={t} className="border border-navy/15 px-3 py-1.5 font-mono text-xs text-navy/70">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </Section>
                        </>
                    )}
                </div>

                {/* Next project */}
                {next && !isInProgress && (
                    <Reveal className="mt-8 border-t border-navy/10 pt-10">
                        <Link
                            to={`/projects/${next.slug}`}
                            data-testid="next-project"
                            className="group flex items-center justify-between gap-6"
                        >
                            <div>
                                <p className="font-mono text-xs uppercase tracking-widest text-navy/50">Next project</p>
                                <p className="mt-2 font-display text-2xl font-bold text-navy md:text-3xl">{next.title}</p>
                            </div>
                            <ArrowUpRight size={32} className="shrink-0 text-navy/40 transition-[color,transform] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal" />
                        </Link>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
