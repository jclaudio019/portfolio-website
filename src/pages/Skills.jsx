import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, skillGroups } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function Skills() {
    const [expandedSkill, setExpandedSkill] = useState(null);
    const relatedProjects = (slugs = []) => slugs
        .map((slug) => projects.find((project) => project.slug === slug))
        .filter(Boolean);

    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="skills-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Skills</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-tighter text-navy">
                        A toolkit spanning statistics, code, and business context.
                    </h1>
                </Reveal>

                <div className="mt-16 grid gap-px border border-navy/10 bg-navy/10 md:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group, i) => {
                        const activeSkill = group.items
                            .map((item) => typeof item === "string" ? { label: item } : item)
                            .find(({ label }) => label === expandedSkill);
                        const activeProjects = relatedProjects(activeSkill?.projectSlugs);

                        return <Reveal key={group.title} delay={i * 0.06}>
                            <div
                                className="h-full bg-surface p-8"
                                data-testid={`skill-group-${group.title.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                <div className="flex items-baseline justify-between">
                                    <h3 className="font-display text-xl font-bold text-navy">
                                        {group.title}
                                    </h3>
                                    <span className="font-mono text-xs text-navy/30">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {group.items.map((item) => {
                                        const skill = typeof item === "string" ? { label: item } : item;
                                        const related = relatedProjects(skill.projectSlugs);
                                        const className = "border border-navy/15 px-3 py-1.5 font-mono text-xs text-navy/70 transition-colors hover:border-teal hover:text-teal";

                                        if (related.length === 1) return (
                                            <Link
                                                key={skill.label}
                                                to={`/projects/${related[0].slug}`}
                                                aria-label={`${skill.label} — view project evidence`}
                                                className={className}
                                            >
                                                {skill.label}
                                            </Link>
                                        );

                                        if (related.length > 1) return (
                                            <button
                                                key={skill.label}
                                                type="button"
                                                aria-expanded={expandedSkill === skill.label}
                                                onClick={() => setExpandedSkill(expandedSkill === skill.label ? null : skill.label)}
                                                className={className}
                                            >
                                                {skill.label}
                                            </button>
                                        );

                                        return <span key={skill.label} className={className}>{skill.label}</span>;
                                    })}
                                </div>
                                {activeProjects.length > 1 && (
                                    <div className="mt-5 border-t border-navy/10 pt-4" aria-live="polite">
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-navy/45">Used in</p>
                                        <div className="mt-2 grid gap-2">
                                            {activeProjects.map((project) => (
                                                <Link
                                                    key={project.slug}
                                                    to={`/projects/${project.slug}`}
                                                    data-testid="skill-project-choice"
                                                    className="flex items-center justify-between border border-navy/10 px-3 py-2 text-sm text-navy/75 transition-colors hover:border-teal hover:text-teal"
                                                >
                                                    {project.title}<span aria-hidden="true">↗</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>;
                    })}
                </div>
            </div>
        </div>
    );
}
