import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { askPortfolioRag } from "../lib/ragApi";

const DEFAULT_SUGGESTIONS = [
    "Which projects best demonstrate Jose's analytical approach?",
    "How does Jose validate models and analytical results?",
    "Where has Jose automated a business process?",
];

const categoryLabel = (value) => {
    const map = {
        professional: "Professional",
        portfolio_project: "Portfolio project",
        coursework: "Coursework",
        exploratory: "Exploratory",
        professional_development: "Professional development",
        skills: "Skills",
        profile: "Profile",
        website: "Website",
        career_profile: "Career profile",
    };
    return map[value] || value || "Source";
};

/** Lightweight markdown-ish renderer for Answer / Evidence / Explore headings. */
function AnswerBody({ text }) {
    const lines = String(text || "").split("\n");
    return (
        <div className="space-y-2 text-navy/85">
            {lines.map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={idx} className="h-2" />;
                if (/^\*\*(.+)\*\*$/.test(trimmed)) {
                    return (
                        <p key={idx} className="pt-2 font-mono text-[11px] uppercase tracking-widest text-teal">
                            {trimmed.replace(/^\*\*|\*\*$/g, "")}
                        </p>
                    );
                }
                if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
                    return (
                        <p key={idx} className="pl-3 text-sm leading-relaxed before:mr-2 before:content-['•']">
                            {trimmed.replace(/^[-•]\s+/, "")}
                        </p>
                    );
                }
                return (
                    <p key={idx} className="text-sm leading-relaxed md:text-base">
                        {trimmed}
                    </p>
                );
            })}
        </div>
    );
}

export default function PortfolioAssistant({
    suggestions = DEFAULT_SUGGESTIONS,
    showRetrieval = false,
    compact = false,
    initialQuestion = "",
}) {
    const [question, setQuestion] = useState(initialQuestion);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const transcriptRef = useRef(null);
    const transcriptEndRef = useRef(null);

    useEffect(() => {
        const transcript = transcriptRef.current;
        if (!transcript) return undefined;
        const keepWheelInsideTranscript = (event) => {
            event.preventDefault();
            event.stopPropagation();
            transcript.scrollTop += event.deltaY;
        };
        transcript.addEventListener("wheel", keepWheelInsideTranscript, { passive: false });
        return () => transcript.removeEventListener("wheel", keepWheelInsideTranscript);
    }, []);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
    }, [messages, loading]);

    const onAsk = async (event) => {
        event.preventDefault();
        const q = question.trim();
        if (q.length < 3) return;
        const history = messages
            .filter((message) => message.role === "user")
            .slice(-3)
            .map((message) => message.text);
        const turnId = `${Date.now()}-${messages.length}`;
        setMessages((current) => [...current, { id: `${turnId}-user`, role: "user", text: q }]);
        setQuestion("");
        setLoading(true);
        try {
            const data = await askPortfolioRag(q, 6, history);
            setMessages((current) => [...current, { id: `${turnId}-assistant`, role: "assistant", result: data }]);
        } catch (err) {
            setMessages((current) => [...current, {
                id: `${turnId}-error`,
                role: "error",
                text: err.message || "Request failed",
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            data-testid="portfolio-assistant"
            className={compact ? "flex h-full min-h-0 flex-col" : "space-y-5"}
        >
            <div
                ref={transcriptRef}
                className={compact
                    ? "min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain pr-1"
                    : "max-h-[65vh] space-y-5 overflow-y-auto overscroll-contain pr-2"}
                data-testid="portfolio-assistant-transcript"
                aria-live="polite"
                tabIndex={0}
            >
                {messages.length === 0 && (
                    <div className="flex flex-wrap gap-2" data-testid="portfolio-assistant-suggestions">
                        {suggestions.map((q) => (
                            <button
                                key={q}
                                type="button"
                                onClick={() => setQuestion(q)}
                                className="border border-navy/15 px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-navy/70 transition-colors hover:border-teal hover:text-teal"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {messages.map((message) => {
                    if (message.role === "user") {
                        return (
                            <div key={message.id} className="flex justify-end" data-testid="portfolio-user-message">
                                <div className="max-w-[88%] border border-navy bg-navy px-4 py-3 text-sm leading-relaxed text-cream">
                                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-teal">You</p>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        );
                    }
                    if (message.role === "error") {
                        return (
                            <div key={message.id} className="border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-700" data-testid="portfolio-assistant-error">
                                {message.text}
                            </div>
                        );
                    }
                    return <AssistantMessage key={message.id} result={message.result} showRetrieval={showRetrieval} />;
                })}

                {loading && (
                    <div className="max-w-[88%] border border-navy/15 bg-surface/40 px-4 py-3" data-testid="portfolio-assistant-loading">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-teal">Portfolio guide</p>
                        <p className="mt-2 text-sm text-navy/55">Searching the portfolio evidence…</p>
                    </div>
                )}
                <div ref={transcriptEndRef} />
            </div>

            <form
                onSubmit={onAsk}
                className={`${messages.length ? "mt-4 border-t border-navy/10 pt-4" : "mt-4"} shrink-0 space-y-3`}
                data-testid="portfolio-assistant-form"
            >
                <textarea
                    aria-label="Ask a question about Jose's portfolio"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={compact ? 2 : 3}
                    maxLength={500}
                    className="w-full border border-navy/20 bg-cream px-4 py-3 font-body text-navy outline-none focus:border-teal"
                    placeholder={messages.length ? "Ask a follow-up…" : "Ask about skills, experience, projects, methods…"}
                    data-testid="portfolio-assistant-input"
                />
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading || question.trim().length < 3}
                        className="border border-navy bg-navy px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-teal hover:bg-teal disabled:opacity-40"
                        data-testid="portfolio-assistant-ask"
                    >
                        {loading ? "Searching portfolio…" : "Ask the portfolio"}
                    </button>
                    <a
                        href="/projects/interactive-rag#how-it-works"
                        className="font-mono text-[11px] uppercase tracking-widest text-navy/45 hover:text-teal"
                    >
                        How this works →
                    </a>
                </div>
            </form>
        </div>
    );
}

function AssistantMessage({ result, showRetrieval }) {
    const explore = result?.explore?.length
        ? result.explore
        : (result?.citations || []).map((c) => ({
              label: c.label,
              explore_url: c.explore_url || c.source_url,
              experience_category: c.experience_category,
              section: c.section,
          }));

    return (
        <div className="max-w-[96%] space-y-4" data-testid="portfolio-assistant-result">
            <div className="border border-navy/15 bg-surface/40 p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-teal">
                    {result.abstained ? "Insufficient evidence" : "Portfolio answer"}
                </p>
                <div className="mt-3">
                    <AnswerBody text={result.answer} />
                </div>
            </div>

            {!result.abstained && explore?.length > 0 && (
                <div className="border border-navy/15 bg-surface/30 p-4 sm:p-5" data-testid="portfolio-explore-further">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-teal">Explore further</p>
                    <ul className="mt-4 space-y-3">
                                {explore.map((item) => {
                                    const href = item.explore_url || "";
                                    const internal = href.includes("joseoclaudio.com")
                                        ? href.replace(/^https?:\/\/(www\.)?joseoclaudio\.com/, "") || "/"
                                        : null;
                                    const content = (
                                        <>
                                            <span className="font-display text-base font-bold text-navy group-hover:text-teal">
                                                {item.label}
                                            </span>
                                            <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-navy/45">
                                                {categoryLabel(item.experience_category)}
                                                {item.section ? ` · ${item.section}` : ""}
                                            </span>
                                        </>
                                    );
                                    return (
                                        <li key={`${item.label}-${href}`} className="border border-navy/10 p-3">
                                            {internal ? (
                                                <Link to={internal} className="group flex items-start justify-between gap-3">
                                                    <span>{content}</span>
                                                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-navy/40 group-hover:text-teal" />
                                                </Link>
                                            ) : href.startsWith("http") ? (
                                                <a href={href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-3">
                                                    <span>{content}</span>
                                                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-navy/40 group-hover:text-teal" />
                                                </a>
                                            ) : (
                                                <div>{content}</div>
                                            )}
                                        </li>
                                    );
                                })}
                    </ul>
                </div>
            )}

            {showRetrieval && !!result.retrieved?.length && (
                <details className="group border border-navy/10 bg-surface/30" data-testid="portfolio-retrieved">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-xs uppercase tracking-widest text-navy/60 hover:text-navy">
                                Retrieved evidence ({result.retrieved.length} chunks)
                                <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="space-y-3 border-t border-navy/10 px-4 py-4">
                                {result.retrieved.map((hit) => (
                                    <div key={hit.chunk_id} className="border border-navy/10 p-3">
                                        <p className="font-mono text-[11px] uppercase tracking-wider text-teal">
                                            {hit.title} · score {hit.score}
                                        </p>
                                        <p className="mt-1 font-mono text-[11px] text-navy/45">{hit.section}</p>
                                        <p className="mt-2 text-sm text-navy/70">{hit.excerpt}</p>
                                    </div>
                                ))}
                            </div>
                </details>
            )}
        </div>
    );
}
