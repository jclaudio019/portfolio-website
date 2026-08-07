import { marqueeItems } from "../data/content";

export default function Marquee() {
    const items = [...marqueeItems, ...marqueeItems];
    return (
        <div
            className="relative overflow-hidden border-y border-navy/10 bg-teal py-5"
            data-testid="skills-marquee"
        >
            <div className="animate-marquee flex w-max whitespace-nowrap">
                {items.map((item, i) => (
                    <span
                        key={i}
                        className="mx-8 flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-cream"
                    >
                        {item}
                        <span className="text-cream">✳</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
