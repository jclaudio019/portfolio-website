import { skillGroups } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function Skills() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="skills-page">
            <div className="mx-auto max-w-[1400px]">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Skills</p>
                    <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
                        A toolkit spanning statistics, code, and business context.
                    </h1>
                </Reveal>

                <div className="mt-16 grid gap-px border border-navy/10 bg-navy/10 md:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group, i) => (
                        <Reveal key={group.title} delay={i * 0.06}>
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
                                        const className = "border border-navy/15 px-3 py-1.5 font-mono text-xs text-navy/70 transition-colors hover:border-teal hover:text-teal";

                                        return skill.href ? (
                                            <a
                                                key={skill.label}
                                                href={skill.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                data-testid="skill-evidence-link"
                                                aria-label={`${skill.label} — view public project evidence on GitHub`}
                                                className={className}
                                            >
                                                {skill.label}
                                            </a>
                                        ) : (
                                            <span key={skill.label} className={className}>
                                                {skill.label}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
