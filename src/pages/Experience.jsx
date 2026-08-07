import { Link } from "react-router-dom";
import { Boxes, TrendingUp, Workflow } from "lucide-react";
import { experienceImpactAreas, professionalContext, profile, publishedProjects } from "../data/content";
import { Reveal } from "../components/Reveal";

const icons = {
    boxes: Boxes,
    workflow: Workflow,
    "trending-up": TrendingUp,
};

export default function Experience() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="experience-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">Experience</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        Organized by the problems I solve, not job titles.
                    </h1>
                    <p className="mt-6 max-w-2xl leading-relaxed text-navy/70">
                        My experience spans forecasting, inventory analysis, financial reporting,
                        process automation, and data validation. Rather than repeat my resume, this
                        page highlights the problems I solve and the evidence behind that work.
                    </p>
                </Reveal>

                <div className="mt-16 space-y-px border-t border-navy/10">
                    {experienceImpactAreas.map((area, i) => {
                        const Icon = icons[area.icon];
                        const relatedProjects = area.projectSlugs
                            .map((slug) => publishedProjects.find((project) => project.slug === slug))
                            .filter(Boolean);

                        return <Reveal key={area.theme} delay={i * 0.08}>
                            <article
                                className="grid gap-6 border-b border-navy/10 py-10 md:grid-cols-[20rem_1fr] md:gap-12"
                                data-testid="experience-impact-area"
                            >
                                <div>
                                    <Icon size={24} className="text-teal" aria-hidden="true" />
                                    <span className="mt-5 block font-mono text-xs text-navy/60">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-navy">
                                        {area.theme}
                                    </h2>
                                </div>
                                <div>
                                    <p className="text-lg leading-relaxed text-navy/80">
                                        {area.description}
                                    </p>
                                    <ul className="mt-5 space-y-3">
                                        {area.professionalEvidence.map((bullet) => (
                                            <li key={bullet} className="flex gap-3 text-navy/70">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                                                <span className="leading-relaxed">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {area.portfolioEvidence && (
                                        <div className="mt-7 border-t border-navy/10 pt-5">
                                            <p className="font-mono text-xs uppercase tracking-widest text-navy/60">
                                                Portfolio evidence
                                            </p>
                                            <ul className="mt-3 space-y-3">
                                                {area.portfolioEvidence.map((item) => (
                                                    <li key={item} className="flex gap-3 text-navy/70">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                                                        <span className="leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="mt-7 border-t border-navy/10 pt-5">
                                        <p className="font-mono text-xs uppercase tracking-widest text-navy/60">
                                            Related public case studies
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {relatedProjects.map((project) => (
                                                <Link
                                                    key={project.slug}
                                                    to={`/projects/${project.slug}`}
                                                    data-testid="experience-project-link"
                                                    className="border border-navy/15 px-3 py-2 font-mono text-xs text-navy/70 transition-colors hover:border-teal hover:text-teal"
                                                >
                                                    {project.title} ↗
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Reveal>;
                    })}
                </div>

                <Reveal className="mt-12 border border-navy/10 bg-surface p-8">
                    <div className="grid gap-6 md:grid-cols-[20rem_1fr] md:gap-12">
                        <div>
                            <p className="font-mono text-sm uppercase tracking-wider text-teal">
                                Professional Context
                            </p>
                        </div>
                        <div>
                            <p className="max-w-3xl leading-relaxed text-navy/70">
                                {professionalContext.intro}
                            </p>
                            <ul className="space-y-2 text-navy/80">
                                {professionalContext.entries.map((entry) => (
                                    <li key={entry} className="mt-3">{entry}</li>
                                ))}
                            </ul>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border border-navy px-4 py-2 font-mono text-xs uppercase tracking-widest text-navy transition-colors hover:bg-navy hover:text-cream"
                                >
                                    View complete experience on LinkedIn
                                </a>
                                <Link
                                    to="/resume"
                                    className="border border-navy/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-navy transition-colors hover:border-teal hover:text-teal"
                                >
                                    {profile.resumeUrl ? "View resume" : "Resume available on request"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
