import { WORKER_API_BASE } from "./workerApi";

export const RAG_API_BASE = WORKER_API_BASE;

export async function askPortfolioRag(question, topK = 5, history = []) {
    const response = await fetch(`${RAG_API_BASE}/api/rag/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, top_k: topK, history }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`);
    }
    return data;
}
