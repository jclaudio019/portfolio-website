import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/content";

export default function Footer() {
    return (
        <footer
            className="border-t border-navy/10 bg-cream"
            data-testid="footer"
        >
            <div className="site-shell px-6 py-16 lg:px-12">
                <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-teal">
                            Work with me
                        </p>
                        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tighter text-navy md:text-5xl">
                            Let&apos;s find the signal in the noise.
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-github"
                            className="border border-navy/20 p-3 text-navy transition-colors hover:bg-navy hover:text-cream"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-linkedin"
                            className="border border-navy/20 p-3 text-navy transition-colors hover:bg-navy hover:text-cream"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href={`mailto:${profile.email}`}
                            data-testid="footer-email"
                            className="border border-navy/20 p-3 text-navy transition-colors hover:bg-navy hover:text-cream"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-14 flex flex-col justify-between gap-4 border-t border-navy/10 pt-8 font-mono text-xs uppercase tracking-widest text-navy/60 md:flex-row">
                    <span>© {new Date().getFullYear()} {profile.name}</span>
                    <div className="flex flex-wrap gap-6">
                        <Link to="/projects" className="hover:text-navy">Projects</Link>
                        <Link to="/contact" className="hover:text-navy">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
