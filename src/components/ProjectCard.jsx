import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
    return (
        <Link
            to={`/projects/${project.slug}`}
            data-testid={`project-card-${project.slug}`}
            className="group flex flex-col border border-navy/10 bg-surface transition-colors hover:border-navy"
        >
            <div className="relative overflow-hidden">
                <span className="absolute left-4 top-4 z-10 bg-cream px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-navy">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                </span>
                <div className="aspect-[4/3] overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy">
                        {project.title}
                    </h3>
                    <ArrowUpRight
                        size={22}
                        className="mt-1 shrink-0 text-navy/40 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                    />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
                    {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                        <span
                            key={t}
                            className="border border-navy/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-navy/60"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
