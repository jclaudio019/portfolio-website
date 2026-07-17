import { TrendingUp, Workflow, Boxes } from "lucide-react";
import { experience } from "../data/content";
import { Reveal } from "../components/Reveal";

const icons = { "trending-up": TrendingUp, workflow: Workflow, boxes: Boxes };

export default function Experience() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="experience-page">
            <div className="mx-auto max-w-[1400px]">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Experience</p>
                    <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
                        Organized by the problems I solve, not job titles.
                    </h1>
                    <p className="mt-6 max-w-2xl leading-relaxed text-navy/70">
                        My work clusters into three capabilities that compound: forecasting and
                        decision support, reporting automation, and inventory & financial analysis.
                    </p>
                </Reveal>

                <div className="mt-16 space-y-px border-t border-navy/10">
                    {experience.map((exp, i) => {
                        const Icon = icons[exp.icon] || TrendingUp;
                        return (
                            <Reveal key={exp.theme} delay={i * 0.08}>
                                <div className="grid gap-6 border-b border-navy/10 py-10 md:grid-cols-[auto_1fr] md:gap-12">
                                    <div className="flex items-start gap-5 md:w-80">
                                        <span className="border border-navy/15 bg-surface p-3 text-teal">
                                            <Icon size={22} />
                                        </span>
                                        <div>
                                            <span className="font-mono text-xs text-navy/40">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-navy">
                                                {exp.theme}
                                            </h3>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg leading-relaxed text-navy/80">
                                            {exp.blurb}
                                        </p>
                                        <ul className="mt-5 space-y-3">
                                            {exp.points.map((pt, j) => (
                                                <li key={j} className="flex gap-3 text-navy/70">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                                                    <span className="leading-relaxed">{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
