import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, FileText } from "lucide-react";
import { profile, projects } from "../data/content";
import { MaskedLines, Reveal } from "../components/Reveal";
import Marquee from "../components/Marquee";
import ProjectCard from "../components/ProjectCard";
import SkillSphere from "../components/SkillSphere";

export default function Home() {
    return (
        <div data-testid="home-page">
            {/* HERO */}
            <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-24 lg:px-12">
                <SkillSphere className="pointer-events-none absolute inset-0 h-full w-full" />
                <div className="site-shell relative z-10 w-full">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="mb-8 font-mono text-xs uppercase tracking-widest text-teal"
                        data-testid="hero-eyebrow"
                    >
                        {profile.roleShort}
                    </motion.p>

                    <h1
                        className="fluid-hero-title font-display font-extrabold leading-[0.92] tracking-tighter text-navy"
                        data-testid="hero-headline"
                    >
                        <MaskedLines lines={["In a world full of answers."]} />
                        <span className="block overflow-hidden">
                            <motion.span
                                className="block text-teal"
                                initial={{ y: "110%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 0.9, delay: 0.39, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Clarity begins with the right question
                            </motion.span>
                        </span>
                    </h1>

                    <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
                        <Reveal delay={0.5}>
                            <p className="max-w-xl text-base leading-relaxed text-navy/70 md:text-lg">
                                {profile.heroIntro}
                            </p>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-navy/70 md:text-lg">
                                {profile.heroSupport}
                            </p>
                        </Reveal>

                        <Reveal delay={0.6} className="flex flex-wrap gap-3 md:justify-end">
                            <Link
                                to="/projects"
                                data-testid="hero-view-projects"
                                className="group flex items-center gap-2 border border-navy bg-navy px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-teal hover:border-teal"
                            >
                                View Projects
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/resume"
                                data-testid="hero-download-resume"
                                className="flex items-center gap-2 border border-navy px-6 py-3 font-mono text-xs uppercase tracking-widest text-navy transition-colors hover:bg-navy hover:text-cream"
                            >
                                <FileText size={16} /> Resume
                            </Link>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="hero-github"
                                className="flex items-center border border-navy/20 px-4 py-3 text-navy transition-colors hover:bg-navy hover:text-cream"
                                aria-label="GitHub"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                data-testid="hero-linkedin"
                                className="flex items-center border border-navy/20 px-4 py-3 text-navy transition-colors hover:bg-navy hover:text-cream"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            <Marquee />

            {/* SELECTED WORK */}
            <section className="px-6 py-24 lg:px-12 lg:py-32" data-testid="home-projects">
                <div className="site-shell">
                    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-teal">
                                Selected Work
                            </p>
                            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy md:text-5xl">
                                Case studies in impact
                            </h2>
                        </div>
                        <Link
                            to="/projects"
                            data-testid="home-all-projects"
                            className="nav-underline font-mono text-xs uppercase tracking-widest text-navy"
                        >
                            All projects →
                        </Link>
                    </Reveal>

                    <div className="grid gap-6 md:grid-cols-2">
                        {projects.map((p, i) => (
                            <Reveal key={p.slug} delay={i * 0.08}>
                                <ProjectCard project={p} index={i} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA STRIP */}
            <section className="px-6 pb-24 lg:px-12" data-testid="home-cta">
                <Reveal className="site-shell border border-navy/10 bg-surface px-8 py-16 text-navy md:px-16">
                    <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                        <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                            Looking to bring order to chaotic data? Let&apos;s turn complexity into opportunity.
                        </h2>
                        <Link
                            to="/contact"
                            data-testid="home-cta-contact"
                            className="flex shrink-0 items-center gap-2 border border-teal bg-teal px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-teal-hover hover:border-teal-hover"
                        >
                            Get in touch <ArrowRight size={16} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
