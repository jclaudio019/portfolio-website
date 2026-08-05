import { projects } from "../data/content";
import ProjectCard from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";

export default function Projects() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="projects-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Projects</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-tighter text-navy">
                        Projects built around real business questions.
                    </h1>
                    <p className="mt-6 max-w-2xl leading-relaxed text-navy/70">
                        Each project explains the problem, what I built, what I found, and why it
                        matters. Full code and supporting work are available on GitHub.
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
