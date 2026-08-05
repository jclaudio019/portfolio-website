import { earlierExperience, professionalExperience } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function Experience() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="experience-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Experience</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-tighter text-navy">
                        Experience across analytics, finance, and operations.
                    </h1>
                    <p className="mt-6 max-w-2xl leading-relaxed text-navy/70">
                        My work has focused on forecasting, inventory and working-capital analysis,
                        financial reporting, process automation, and data validation. The timeline
                        below shows how those capabilities developed across roles.
                    </p>
                </Reveal>

                <div className="mt-16 space-y-px border-t border-navy/10">
                    {professionalExperience.map((role, i) => (
                        <Reveal key={role.company + role.title} delay={i * 0.08}>
                            <article
                                className="grid gap-6 border-b border-navy/10 py-10 md:grid-cols-[20rem_1fr] md:gap-12"
                                data-testid="experience-role"
                            >
                                <div>
                                    <span className="font-mono text-xs text-navy/40">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <p className="mt-3 font-mono text-xs uppercase tracking-widest text-teal">
                                        {role.company}
                                    </p>
                                    <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-navy">
                                        {role.title}
                                    </h2>
                                    <p className="mt-3 text-sm text-navy/60">{role.dates}</p>
                                </div>
                                <div>
                                    <p className="text-lg leading-relaxed text-navy/80">
                                        {role.summary}
                                    </p>
                                    <ul className="mt-5 space-y-3">
                                        {role.bullets.map((bullet) => (
                                            <li key={bullet} className="flex gap-3 text-navy/70">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                                                <span className="leading-relaxed">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-12 border-b border-navy/10 pb-10">
                    <div className="grid gap-6 md:grid-cols-[20rem_1fr] md:gap-12">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-teal">
                                Earlier experience
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-2 text-navy/80">
                                {earlierExperience.roles.map((role) => (
                                    <li key={role}>{role}</li>
                                ))}
                            </ul>
                            <p className="mt-4 max-w-3xl leading-relaxed text-navy/65">
                                {earlierExperience.summary}
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
