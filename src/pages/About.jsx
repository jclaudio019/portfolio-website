import { profile, aboutChapters, educationEntries } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function About() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="about-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">About</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        Where finance, operations, and applied statistics meet.
                    </h1>
                </Reveal>

                <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <Reveal>
                        <div className="sticky top-28 space-y-4">
                            <div className="border border-navy/10 bg-surface p-5">
                                <p className="font-mono text-xs uppercase tracking-widest text-navy/60">
                                    Based in
                                </p>
                                <p className="mt-2 font-display text-lg font-bold text-navy">
                                    {profile.location}
                                </p>
                            </div>

                            <div className="border border-navy/10 bg-surface p-5">
                                <p className="font-mono text-xs uppercase tracking-widest text-navy/60">
                                    Availability
                                </p>
                                <ul className="mt-3 space-y-2 text-base leading-relaxed text-navy/80">
                                    {profile.availability.map((item) => (
                                        <li key={item} className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {educationEntries.map((entry) => (
                                <div
                                    key={entry.school + entry.degree}
                                    className="border border-navy/10 bg-surface p-5"
                                >
                                    <p className="font-mono text-xs uppercase tracking-widest text-navy/60">
                                        {entry.school}
                                    </p>
                                    <p className="mt-2 font-display text-lg font-bold text-navy">
                                        {entry.degree}
                                    </p>
                                    {entry.location && (
                                        <p className="mt-1 text-base text-navy/60">{entry.location}</p>
                                    )}
                                    {entry.details && (
                                        <p className="mt-1 text-base text-navy/70">{entry.details}</p>
                                    )}
                                    {entry.note && (
                                        <p className="mt-1 text-base italic text-navy/60">{entry.note}</p>
                                    )}
                                    <p className="mt-2 font-mono text-sm uppercase tracking-wider text-teal">
                                        {entry.date}
                                    </p>
                                    {entry.coursework && (
                                        <p className="mt-3 text-base text-navy/70">
                                            Coursework: {entry.coursework.join(" · ")}
                                        </p>
                                    )}
                                    {entry.topics && (
                                        <p className="mt-3 text-base text-navy/70">
                                            Topics: {entry.topics.join(" · ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <div>
                        <div className="space-y-px border-t border-navy/10">
                            {aboutChapters.map((c, i) => (
                                <Reveal key={c.n} delay={i * 0.06}>
                                    <div className="grid gap-4 border-b border-navy/10 py-8 md:grid-cols-[auto_1fr] md:gap-10">
                                        <span className="font-mono text-sm text-teal">{c.n}</span>
                                        <div>
                                            <h3 className="font-display text-xl font-bold text-navy md:text-2xl">
                                                {c.title}
                                            </h3>
                                            {c.paragraphs.map((paragraph, j) => (
                                                <p
                                                    key={j}
                                                    className={`leading-relaxed text-navy/70 ${j === 0 ? "mt-3" : "mt-4"}`}
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
