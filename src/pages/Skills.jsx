import { Reveal } from "../components/Reveal";
import SkillExplorer from "../components/SkillExplorer";

export default function Skills() {
    return (
        <div className="px-6 pb-24 pt-32 lg:px-12 lg:pt-36" data-testid="skills-page">
            <div className="site-shell">
                <Reveal>
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">Skills</p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        Tools and methods I use.
                    </h1>
                </Reveal>

                <div className="mt-16">
                    <SkillExplorer />
                </div>
            </div>
        </div>
    );
}
