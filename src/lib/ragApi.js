const PRODUCTION_API =
    "https://portfolio-options-api.joseo-claudio19.workers.dev";

export const RAG_API_BASE =
    process.env.REACT_APP_RAG_API_URL ||
    (process.env.NODE_ENV === "development" ? "" : PRODUCTION_API);

export async function askPortfolioRag(question, topK = 5) {
    const response = await fetch(`${RAG_API_BASE}/api/rag/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, top_k: topK }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`);
    }
    return data;
}
