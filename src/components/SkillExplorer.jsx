import { useState } from "react";
import { Link } from "react-router-dom";
import { publishedProjects, skillGroups } from "../data/content";
import { Reveal } from "./Reveal";

export default function SkillExplorer({ testId = "skills-explorer" }) {
    const [expandedSkill, setExpandedSkill] = useState(null);
    const relatedProjects = (slugs = []) => slugs
        .map((slug) => publishedProjects.find((project) => project.slug === slug))
        .filter(Boolean);

    return (
        <div data-testid={testId}>
            <div className="grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {skillGroups.map((group, i) => {
                    const activeSkill = group.items
                        .map((item) => typeof item === "string" ? { label: item } : item)
                        .find(({ label }) => label === expandedSkill);
                    const activeProjects = relatedProjects(activeSkill?.projectSlugs);

                    return <Reveal key={group.title} delay={i * 0.06}>
                        <div
                            className="h-full bg-surface p-5"
                            data-testid={`skill-group-${group.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <div className="flex items-baseline justify-between">
                                    <h3 className="font-display text-lg font-bold leading-tight text-navy">
                                    {group.title}
                                </h3>
                                <span className="font-mono text-xs text-navy/60">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {group.items.map((item) => {
                                    const skill = typeof item === "string" ? { label: item } : item;
                                    const related = relatedProjects(skill.projectSlugs);
                                    const className = "border border-navy/15 px-2.5 py-1 font-mono text-xs text-navy/70 transition-colors hover:border-teal hover:text-teal";

                                    if (skill.description && related.length === 1) return (
                                        <Link
                                            key={skill.label}
                                            to={`/projects/${related[0].slug}`}
                                            aria-label={`${skill.label} — view case study evidence`}
                                            className={`${className} w-full`}
                                        >
                                            <span className="block text-navy">{skill.label}</span>
                                                <span className="mt-2 block font-sans text-sm normal-case leading-relaxed tracking-normal text-navy/60">
                                                {skill.description}
                                            </span>
                                            <span className="mt-2 block text-xs uppercase tracking-wider text-teal">
                                                {skill.tools.join(" · ")}
                                            </span>
                                        </Link>
                                    );

                                    if (related.length === 1) return (
                                        <Link
                                            key={skill.label}
                                            to={`/projects/${related[0].slug}`}
                                            aria-label={`${skill.label} — view case study evidence`}
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
                                    <p className="font-mono text-xs uppercase tracking-widest text-navy/60">Used in</p>
                                    <div className="mt-2 grid gap-1.5">
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
    );
}
