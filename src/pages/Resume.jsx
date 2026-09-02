import { Download, FileText } from "lucide-react";
import { profile, resumeHighlights } from "../data/content";
import { Reveal } from "../components/Reveal";
import ContactSection from "./Contact";

export default function Resume() {
    const downloadFilename = "Jose_Claudio_Analytics_Resume.pdf";

    return (
        <div className="px-6 pb-24 pt-32 lg:px-12 lg:pt-36" data-testid="resume-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">Resume</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        Download my resume.
                    </h1>
                    <p className="mt-6 max-w-2xl leading-relaxed text-navy/70">
                        Download the latest PDF for a concise overview of my experience, education,
                        analytical projects, and technical skills.
                    </p>
                </Reveal>

                <div className="mt-14 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2">
                    {resumeHighlights.map((h) => (
                        <div key={h.label} className="bg-surface p-6">
                            <p className="font-mono text-xs uppercase tracking-widest text-navy/50">
                                {h.label}
                            </p>
                            <p className="mt-2 font-display text-lg font-bold text-navy">{h.value}</p>
                        </div>
                    ))}
                </div>

                <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border border-navy/10 bg-surface p-8 text-navy md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                        <span className="border border-navy/20 p-4 text-teal">
                            <FileText size={28} />
                        </span>
                        <div>
                            <p className="font-display text-xl font-bold">{profile.name} — Resume</p>
                            <p className="font-mono text-xs uppercase tracking-widest text-navy/60">
                                PDF · Ready to download
                            </p>
                        </div>
                    </div>
                    <a
                        href={profile.resumeUrl}
                        download={downloadFilename}
                        data-testid="resume-download-btn"
                        className="flex items-center gap-2 border border-teal bg-teal px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-teal-hover hover:border-teal-hover"
                    >
                        <Download size={16} /> Download Resume
                    </a>
                </Reveal>

                <ContactSection />
            </div>
        </div>
    );
}
