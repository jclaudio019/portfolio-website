import { profile, aboutChapters } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function About() {
    return (
        <div className="px-6 pb-24 pt-36 lg:px-12 lg:pt-44" data-testid="about-page">
            <div className="mx-auto max-w-[1400px]">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-widest text-teal">About</p>
                    <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] tracking-tighter text-navy sm:text-5xl md:text-6xl">
                        From business questions to statistical answers — and back again.
                    </h1>
                </Reveal>

                <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
                    <Reveal>
                        <div className="sticky top-28">
                            <div className="aspect-[3/4] overflow-hidden border border-navy/10">
                                <img
                                    src="https://images.pexels.com/photos/10816007/pexels-photo-10816007.jpeg"
                                    alt="Jose Claudio"
                                    className="h-full w-full object-cover grayscale"
                                />
                            </div>
                            <div className="mt-4 border border-navy/10 bg-surface p-5">
                                <p className="font-mono text-[11px] uppercase tracking-widest text-navy/60">
                                    Currently
                                </p>
                                <p className="mt-2 font-display text-lg font-bold text-navy">
                                    {profile.education}
                                </p>
                                <p className="mt-1 text-sm text-navy/70">{profile.location}</p>
                            </div>
                        </div>
                    </Reveal>

                    <div>
                        <Reveal>
                            <p className="text-lg leading-relaxed text-navy/80 md:text-xl">
                                I’m a business analytics professional moving deliberately into
                                advanced analytics and data science. I’ve spent my career close to
                                the operational and financial realities of a business — and I’m now
                                pairing that context with rigorous statistics to build models people
                                actually trust and use.
                            </p>
                        </Reveal>

                        <div className="mt-14 space-y-px border-t border-navy/10">
                            {aboutChapters.map((c, i) => (
                                <Reveal key={c.n} delay={i * 0.06}>
                                    <div className="grid gap-4 border-b border-navy/10 py-8 md:grid-cols-[auto_1fr] md:gap-10">
                                        <span className="font-mono text-sm text-teal">{c.n}</span>
                                        <div>
                                            <h3 className="font-display text-xl font-bold text-navy md:text-2xl">
                                                {c.title}
                                            </h3>
                                            <p className="mt-3 leading-relaxed text-navy/70">
                                                {c.body}
                                            </p>
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
