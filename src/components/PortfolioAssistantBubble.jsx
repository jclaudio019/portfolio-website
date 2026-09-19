import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import PortfolioAssistant from "./PortfolioAssistant";

const ASSISTANT_ROUTES = new Set(["/ask", "/projects/interactive-rag"]);

export default function PortfolioAssistantBubble() {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        if (!open) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [open]);

    if (ASSISTANT_ROUTES.has(pathname)) return null;

    return (
        <aside
            className={`fixed inset-x-4 bottom-4 z-50 flex max-h-[calc(100dvh-2rem)] flex-col items-end sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-h-[calc(100dvh-3rem)] ${open ? "h-[calc(100dvh-2rem)] sm:h-[calc(100dvh-3rem)]" : ""}`}
            data-testid="portfolio-assistant-bubble"
        >
            {open && (
                <div
                    id="portfolio-assistant-panel"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="portfolio-assistant-title"
                    className="mb-3 flex min-h-0 w-full flex-1 flex-col overflow-hidden border border-navy/20 bg-cream p-4 shadow-2xl sm:w-[430px] sm:p-5"
                >
                    <div className="mb-4 flex shrink-0 items-start justify-between gap-4 border-b border-navy/10 pb-4">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-teal">Portfolio guide</p>
                            <h2 id="portfolio-assistant-title" className="mt-1 font-display text-xl font-bold text-navy">
                                What are you looking for?
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="p-2 text-navy/60 transition-colors hover:text-navy"
                            aria-label="Close portfolio assistant"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden" data-testid="portfolio-assistant-scroll-region">
                        <PortfolioAssistant compact />
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="portfolio-assistant-panel"
                aria-label={open ? "Close portfolio assistant" : "Ask the portfolio"}
                className="ml-auto flex items-center gap-2 rounded-full border border-teal bg-navy px-4 py-3 font-mono text-xs uppercase tracking-wider text-cream shadow-xl transition-colors hover:bg-teal"
            >
                {open ? <X size={18} /> : <MessageCircle size={18} />}
                <span>{open ? "Close" : "Ask"}</span>
            </button>
        </aside>
    );
}
