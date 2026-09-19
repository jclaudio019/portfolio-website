import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import PortfolioAssistant from "../components/PortfolioAssistant";

export default function Ask() {
    return (
        <div className="px-6 pb-20 pt-24 lg:px-12 lg:pt-28" data-testid="ask-page">
            <div className="site-shell mx-auto max-w-4xl">
                <Reveal>
                    <p className="font-mono text-sm uppercase tracking-wider text-teal">Portfolio guide</p>
                    <h1 className="fluid-page-title mt-4 font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        Ask about the work
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/70">
                        Ask natural-language questions about Jose&apos;s skills, experience, projects, methods, and
                        tools. Answers are grounded in public portfolio sources and link you to the relevant pages.
                    </p>
                </Reveal>

                <Reveal delay={0.08} className="mt-10 border border-navy/15 bg-surface/40 p-5 sm:p-7">
                    <PortfolioAssistant />
                </Reveal>

                <Reveal delay={0.12} className="mt-10 border-t border-navy/10 pt-8 text-sm text-navy/60">
                    <p>
                        This assistant is a navigation layer over the public portfolio — not a résumé chatbot that
                        invents experience. For the retrieval/chunking/grounding technical write-up, see the{" "}
                        <Link to="/projects/interactive-rag" className="text-teal hover:underline">
                            Interactive RAG case study
                        </Link>
                        .
                    </p>
                </Reveal>
            </div>
        </div>
    );
}
