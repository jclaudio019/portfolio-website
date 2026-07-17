import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Github, ArrowUpRight } from "lucide-react";
import { projects } from "../data/content";
import { Reveal } from "../components/Reveal";

const Section = ({ label, children }) => (
    <Reveal className="grid gap-4 border-t border-navy/10 py-10 md:grid-cols-[220px_1fr] md:gap-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-teal">{label}</h2>
        <div className="text-navy/80">{children}</div>
    </Reveal>
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

    const next = projects[(index + 1) % projects.length];

    return (
        <div className="px-6 pb-24 pt-32 lg:px-12 lg:pt-40" data-testid="project-detail-page">
            <div className="mx-auto max-w-[1100px]">
                <Link
                    to="/projects"
                    data-testid="back-to-projects"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy/60 transition-colors hover:text-navy"
                >
                    <ArrowLeft size={14} /> All Projects
                </Link>

                <Reveal>
                    <p className="mt-10 font-mono text-xs uppercase tracking-widest text-teal">
                        {String(index + 1).padStart(2, "0")} — {project.category}
                    </p>
                    <h1 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
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
                    <div className="aspect-[16/9] overflow-hidden border border-navy/10">
                        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-navy/40">
                        Placeholder — replace with a real project screenshot or chart.
                    </p>
                </Reveal>

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

                {/* Story sections */}
                <div className="mt-16">
                    <Section label="Business Problem">
                        <p className="leading-relaxed">{project.problem}</p>
                    </Section>
                    <Section label="Dataset">
                        <p className="leading-relaxed">{project.dataset}</p>
                    </Section>
                    <Section label="Methodology">
                        <ul className="space-y-3">
                            {project.methodology.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="leading-relaxed">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>
                    <Section label="Findings">
                        <p className="leading-relaxed">{project.findings}</p>
                        <div className="mt-6 flex aspect-[16/6] items-center justify-center border border-dashed border-navy/20 bg-surface/50">
                            <span className="font-mono text-xs uppercase tracking-widest text-navy/40">
                                Chart placeholder — add a results visualization here
                            </span>
                        </div>
                    </Section>
                    <Section label="Business Implications">
                        <p className="leading-relaxed">{project.implications}</p>
                    </Section>
                    <Section label="Technologies">
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                                <span key={t} className="border border-navy/15 px-3 py-1.5 font-mono text-xs text-navy/70">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </Section>
                </div>

                {/* Next project */}
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
            </div>
        </div>
    );
}
