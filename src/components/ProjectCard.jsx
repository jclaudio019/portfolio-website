import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectCover from "./ProjectCover";

export default function ProjectCard({ project, index }) {
    const cardTitle = project.cardTitle || project.title;
    const cardContent = (
        <>
            <div className="relative overflow-hidden">
                <span className="absolute left-3 top-3 z-10 bg-cream px-2 py-1 font-mono text-xs uppercase tracking-widest text-navy">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                </span>
                {(project.status || project.dashboardPath) && (
                    <span
                        data-testid={project.dashboardPath ? "project-interactive" : "project-status"}
                        className="absolute right-3 top-3 z-10 bg-teal px-2 py-1 font-mono text-xs uppercase tracking-widest text-cream"
                    >
                        {project.dashboardPath ? "Interactive" : project.status}
                    </span>
                )}
                <ProjectCover project={project} />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight text-navy">
                        {cardTitle}
                    </h3>
                    {!project.dashboardPath && <ArrowUpRight
                        size={22}
                        className="mt-1 shrink-0 text-navy/60 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                    />}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">
                    {project.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                        <span
                            key={t}
                            className="border border-navy/15 px-2 py-1 font-mono text-xs uppercase tracking-wider text-navy/60"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );

    if (project.dashboardPath) {
        return (
            <article
                data-testid={`project-card-${project.slug}`}
                className="group flex h-full flex-col border border-navy/10 bg-surface transition-colors hover:border-navy"
            >
                {cardContent}
                <div className="flex flex-wrap gap-2 px-4 pb-4">
                    <Link
                        to={`/projects/${project.slug}`}
                        data-testid="credit-risk-project-link"
                        className="flex min-w-[140px] flex-1 items-center justify-center gap-2 border border-navy bg-navy px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-cream transition-colors hover:border-teal hover:bg-teal"
                    >
                        View Project <ArrowUpRight size={14} />
                    </Link>
                    <Link
                        to={project.dashboardPath}
                        data-testid="credit-risk-dashboard-link"
                        className="flex min-w-[140px] flex-1 items-center justify-center gap-2 border border-teal px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-teal transition-colors hover:bg-teal hover:text-cream"
                    >
                        Dashboard <ArrowUpRight size={14} />
                    </Link>
                </div>
            </article>
        );
    }

    return (
        <Link
            to={`/projects/${project.slug}`}
            data-testid={`project-card-${project.slug}`}
            className="group flex flex-col border border-navy/10 bg-surface transition-colors hover:border-navy"
        >
            {cardContent}
        </Link>
    );
}
