import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "../components/Reveal";
import PortfolioAssistant from "../components/PortfolioAssistant";

const EVAL_SUMMARY = {
    sourceHitRate: "100%",
    factHitRate: "100%",
    reranking: "Not added — baseline ranking had no failures on the eval set.",
    embedding: "@cf/baai/bge-base-en-v1.5",
    generator: "Gemini 3.5 Flash-Lite (Cloudflare Llama fallback)",
};

const Section = ({ id, label, children }) => (
    <Reveal id={id} className="scroll-mt-24 grid gap-3 border-t border-navy/10 py-10 md:grid-cols-[200px_1fr] md:gap-10">
        <h2 className="font-mono text-sm uppercase tracking-wider text-teal">{label}</h2>
        <div className="min-w-0 max-w-[72ch] text-navy/80">{children}</div>
    </Reveal>
);

export default function RagShowcase() {
    return (
        <div className="px-6 pb-20 pt-24 lg:px-12 lg:pt-28" data-testid="rag-showcase-page">
            <div className="site-shell mx-auto max-w-7xl">
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-navy/60 transition-colors hover:text-navy"
                >
                    <ArrowLeft size={14} /> All Case Studies
                </Link>

                <Reveal>
                    <p className="mt-10 font-mono text-sm uppercase tracking-wider text-teal">
                        Systems — Retrieval & Grounding
                    </p>
                    <h1 className="fluid-page-title mt-4 max-w-5xl font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">
                        Interactive RAG — Retrieval & Grounding Showcase
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/70">
                        Technical case study for the portfolio discovery assistant: how public sources move through
                        chunking, embeddings, retrieval, grounding, citations, and abstention.
                    </p>
                    <Link
                        to="/ask"
                        className="mt-6 inline-flex border border-navy bg-navy px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-teal hover:bg-teal"
                    >
                        Use the portfolio assistant →
                    </Link>
                </Reveal>

                <Section label="Overview">
                    <p>
                        The live assistant on <Link to="/ask" className="text-teal hover:underline">/ask</Link> is a
                        navigation layer over joseoclaudio.com. This page documents the RAG system behind it — not a
                        separate chatbot product.
                    </p>
                </Section>

                <Section label="What I Wanted to Learn">
                    <ul className="grid gap-2 font-mono text-sm text-navy/75 sm:grid-cols-2">
                        {[
                            "Embeddings",
                            "Retrieval quality",
                            "Structure-aware chunking",
                            "Grounding / abstention",
                            "Citations + navigation links",
                            "Professional vs project separation",
                            "Evaluation before UI polish",
                            "Thin deployable API",
                        ].map((item) => (
                            <li key={item} className="border border-navy/10 bg-surface/40 px-3 py-2">
                                {item}
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section id="how-it-works" label="How It Works">
                    <pre className="overflow-x-auto border border-navy/10 bg-surface/50 p-4 font-mono text-[11px] leading-relaxed text-navy/70">
{`Website + GitHub docs + Career KB
        ↓ ingest / normalize / hash
StructureAwareChunker → chunks.jsonl (109)
        ↓ embed (@cf/baai/bge-base-en-v1.5)
Numpy / Worker cosine index
        ↓ query embed → top-k
Context assembly + experience categories
        ↓ grounded generation
Answer + Evidence + Explore-further links`}
                    </pre>
                </Section>

                <Section label="Live Demo">
                    <p className="mb-5">
                        Same assistant as the portfolio guide, with retrieved chunks visible for inspection.
                    </p>
                    <PortfolioAssistant showRetrieval />
                </Section>

                <Section label="Evaluation">
                    <p className="mb-4 text-sm leading-relaxed text-navy/60">
                        Development retrieval benchmark: 26 questions, including 23 answerable questions. These
                        results measure whether the expected source and required facts appeared in the top-five
                        retrieved chunks; they do not claim perfect answer generation on unseen questions.
                    </p>
                    <dl className="mt-1 grid gap-3 font-mono text-sm sm:grid-cols-2">
                        <div className="border border-navy/10 px-3 py-3">
                            <dt className="text-navy/45">Source hit rate</dt>
                            <dd className="mt-1 text-teal">{EVAL_SUMMARY.sourceHitRate}</dd>
                        </div>
                        <div className="border border-navy/10 px-3 py-3">
                            <dt className="text-navy/45">Required-fact hit rate</dt>
                            <dd className="mt-1 text-teal">{EVAL_SUMMARY.factHitRate}</dd>
                        </div>
                        <div className="border border-navy/10 px-3 py-3">
                            <dt className="text-navy/45">Reranking</dt>
                            <dd className="mt-1 text-navy/75">{EVAL_SUMMARY.reranking}</dd>
                        </div>
                        <div className="border border-navy/10 px-3 py-3">
                            <dt className="text-navy/45">Live models</dt>
                            <dd className="mt-1 text-navy/75">
                                {EVAL_SUMMARY.embedding}
                                <br />
                                {EVAL_SUMMARY.generator}
                            </dd>
                        </div>
                    </dl>
                </Section>

                <Section label="What I Learned">
                    <ul className="list-disc space-y-2 pl-5">
                        <li>Navigation value comes from synthesizing evidence and linking to the right pages, not from fluent keyword repetition.</li>
                        <li>Experience-category labels in the evidence block help keep professional work distinct from portfolio/coursework.</li>
                        <li>A small retrieval eval set mattered more than adding reranking for this corpus.</li>
                        <li>Abstention is part of trustworthy portfolio UX.</li>
                    </ul>
                </Section>

                <Section label="Limitations">
                    <ul className="list-disc space-y-2 pl-5">
                        <li>Allowlisted public documents only.</li>
                        <li>Vanilla vector retrieval without hybrid search.</li>
                        <li>Small, hand-authored development evaluation set rather than an independent benchmark.</li>
                        <li>Best-effort per-instance rate limiting; production traffic would need edge-wide enforcement.</li>
                    </ul>
                </Section>

                <Section label="Development Approach">
                    <p>
                        Built with an AI-assisted workflow (Cursor) to accelerate implementation and iteration.
                        Architecture, evaluation, grounding rules, and failure analysis were reviewed against the
                        corpus and benchmark results.
                    </p>
                </Section>

                <Section label="Next Experiments">
                    <ul className="list-disc space-y-2 pl-5">
                        <li>Hybrid search</li>
                        <li>Metadata filters by experience category</li>
                        <li>Query rewriting for short follow-ups</li>
                        <li>Gemini generation when billing credits are available</li>
                    </ul>
                </Section>
            </div>
        </div>
    );
}
