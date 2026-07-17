import { Download, FileText } from "lucide-react";
import { profile, resumeHighlights } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function Resume() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="resume-page">
            <div className="mx-auto max-w-[1100px]">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">Resume</p>
                    <h1 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
                        The one-page version.
                    </h1>
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
                                PDF · Updated for analytics & data science roles
                            </p>
                        </div>
                    </div>
                    <a
                        href={profile.resumeUrl}
                        download
                        data-testid="resume-download-btn"
                        className="flex items-center gap-2 border border-teal bg-teal px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-teal-hover hover:border-teal-hover"
                    >
                        <Download size={16} /> Download PDF
                    </a>
                </Reveal>

                <Reveal className="mt-8">
                    <div className="overflow-hidden border border-navy/10 bg-surface">
                        <object
                            data={profile.resumeUrl}
                            type="application/pdf"
                            className="h-[720px] w-full"
                            aria-label="Resume preview"
                            data-testid="resume-preview"
                        >
                            <div className="flex h-[300px] items-center justify-center p-8 text-center">
                                <p className="text-navy/60">
                                    Preview unavailable in this browser.{" "}
                                    <a href={profile.resumeUrl} download className="text-teal underline">
                                        Download the PDF
                                    </a>{" "}
                                    instead.
                                </p>
                            </div>
                        </object>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
