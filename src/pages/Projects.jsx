import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { publishedProjects } from "../data/content";
import ProjectCard from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import SkillExplorer from "../components/SkillExplorer";

const flagshipSlugs = [
    "retail-demand-forecasting",
    "time-series-analysis-r",
    "credit-risk-pd-model",
];

export default function Projects() {
    const flagshipProjects = flagshipSlugs
        .map((slug) => publishedProjects.find((project) => project.slug === slug))
        .filter(Boolean);

    return (
        <div className="px-6 pb-24 pt-32 lg:px-12 lg:pt-36" data-testid="projects-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">Portfolio</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        A summary of my work
                    </h1>
                    <p className="mt-6 max-w-3xl leading-relaxed text-navy/70">
                        This portfolio covers classification, regression, forecasting, and time-series
                        methods used to estimate demand, evaluate risk, and understand the likelihood of
                        future events. The three highlighted case studies below represent some of my most
                        rigorous work, while the full portfolio shows how I apply these methods across
                        finance, retail, supply chain, and quantitative analysis.
                    </p>
                </Reveal>

                <p className="mt-10 font-mono text-sm uppercase tracking-wider text-teal">
                    Highlights
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {flagshipProjects.map((project, index) => (
                        <Reveal key={project.slug} delay={index * 0.06}>
                            <Link
                                to={`/projects/${project.slug}`}
                                data-testid="highlight-project"
                                className="group flex h-full items-start justify-between gap-4 border border-navy/15 bg-surface p-5 transition-colors hover:border-teal"
                            >
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-teal">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="mt-2 font-display text-xl font-bold leading-tight text-navy">
                                        {project.title}
                                    </h2>
                                </div>
                                <ArrowUpRight
                                    size={20}
                                    className="mt-1 shrink-0 text-navy/50 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                                />
                            </Link>
                        </Reveal>
                    ))}
                </div>

                <section className="mt-14" aria-labelledby="portfolio-skills-heading">
                    <Reveal>
                        <p className="font-mono text-sm uppercase tracking-wider text-teal">Capabilities</p>
                        <h2 id="portfolio-skills-heading" className="mt-3 font-display text-3xl font-bold text-navy">
                            Skills with project evidence
                        </h2>
                        <p className="mt-3 max-w-2xl leading-relaxed text-navy/70">
                            Select a skill to see the case studies where I applied it.
                        </p>
                    </Reveal>
                    <div className="mt-6">
                        <SkillExplorer testId="portfolio-skills" />
                    </div>
                </section>

                <section className="mt-16" aria-labelledby="portfolio-case-studies-heading" data-testid="portfolio-case-studies">
                    <Reveal>
                        <p className="font-mono text-sm uppercase tracking-wider text-teal">Portfolio Evidence</p>
                        <h2 id="portfolio-case-studies-heading" className="mt-3 font-display text-3xl font-bold text-navy">
                            Case Studies
                        </h2>
                    </Reveal>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {publishedProjects.map((p, i) => (
                        <Reveal key={p.slug} delay={i * 0.08}>
                            <ProjectCard project={p} index={i} />
                        </Reveal>
                    ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
