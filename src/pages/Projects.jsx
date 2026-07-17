import { projects } from "../data/content";
import ProjectCard from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";

export default function Projects() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="projects-page">
            <div className="mx-auto max-w-[1400px]">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Projects</p>
                    <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
                        Detailed case studies, from problem to business impact.
                    </h1>
                    <p className="mt-6 max-w-2xl leading-relaxed text-navy/70">
                        Each project follows the same thread — a real business problem, the data and
                        methods used to attack it, what the analysis found, and what changed as a
                        result.
                    </p>
                </Reveal>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    {projects.map((p, i) => (
                        <Reveal key={p.slug} delay={i * 0.08}>
                            <ProjectCard project={p} index={i} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
