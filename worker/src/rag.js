/**
 * Thin RAG ask handler — portfolio discovery + grounded citations.
 * Index is precomputed in the RAG-Assistant repo and exported here.
 */
import index from "./worker_index.json" with { type: "json" };

const SITE = "https://joseoclaudio.com";

const PROJECT_PAGE = {
    "retail-operations": "/projects/retail-demand-forecasting",
    credit_risk: "/projects/credit-risk-pd-model",
    "retail-allocation-simulator": "/projects/retail-allocation-simulator",
    time_series_analysis: "/projects/time-series-analysis-r",
    "black-scholes-options-modeling": "/projects/black-scholes-options-modeling",
    "backtesting-system": "/projects/backtesting-system",
    "warehouse-club-market-expansion-strategy": "/projects/warehouse-club-market-expansion",
};

const SYSTEM_PROMPT = `You are the portfolio discovery assistant for Jose Claudio's public site (joseoclaudio.com).

Your job is to help visitors navigate Jose's skills, experience, projects, methods, tools, education, and analytical workflows using ONLY the Evidence block.

You are both:
1) a useful portfolio guide
2) a grounded retrieval system (no invented facts)

Hard rules:
1. Do not invent employers, titles, dates, metrics, projects, technologies, degrees, or certifications.
2. Never upgrade experience categories. Keep these distinct when evidence supports them:
   - professional experience (jobs)
   - independent / portfolio project work
   - coursework / academic work
   - exploratory / personal learning work
3. Do not claim Jose deployed GenAI/RAG/LLM systems professionally at EssilorLuxottica.
4. FRM is candidacy/exam prep, not an earned certification, unless evidence says otherwise.
5. Purdue M.S. Applied Statistics is in progress (expected 2027), not completed.
6. If evidence is insufficient, abstain with:
   "I don't have enough information in the portfolio to answer that confidently."
7. Do not dump keywords. Synthesize what the evidence actually shows.
8. Prefer career-profile / experience pages for professional claims; project/website case studies for portfolio methods.
9. Tool/language claims (Python, R, SQL, etc.) must be tied to the exact context shown in evidence. If R appears only in a portfolio/coursework project, do NOT say it was used professionally.
10. Ignore unrelated retrieved snippets. If a source does not mention the asked skill/tool/topic, do not use it as support.
11. When describing evidence scope, copy the exact experience_category shown for that source. Never relabel "profile", "skills", "coursework", "exploratory", or "portfolio_project" as "professional". Only evidence marked "professional" may be called professional experience.
12. Never expose local file paths or source URLs beginning with "local::". In Explore further, use only the public URL shown in the source's explore field. Omit a source when no public explore URL is available.

Answer format for non-abstaining answers (use these exact headings):

**Answer**
1-3 sentences with the direct response. Be precise about professional vs portfolio/coursework scope.

**Evidence**
2-5 short bullets explaining concrete examples from the evidence. Use the exact experience_category supplied with each source; translate portfolio_project to "portfolio project" for readability, but do not upgrade any other category.

**Explore further**
Bullet list of the most useful sources to open next, using the source labels from evidence. Prefer website case-study / experience pages when available.`;

const MAX_QUERY_CHARS = 500;
const DEFAULT_TOP_K = 6;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const EMBED_MODEL = "@cf/baai/bge-base-en-v1.5";
const GENERATE_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

const rateBuckets = new Map();
let cachedVectors = null;

function experienceCategory(sourceType, headingPath = "", documentId = "") {
    const path = String(headingPath || "").toLowerCase();
    if (sourceType === "website") {
        if (documentId.includes("experience")) return "professional";
        if (documentId.includes("projects-") || documentId.endsWith("::projects")) return "portfolio_project";
        if (documentId.endsWith("::about") || documentId.endsWith("::home")) return "profile";
        if (documentId.endsWith("::skills")) return "skills";
        return "website";
    }
    if (sourceType === "project") {
        if (path.includes("coursework") || path.includes("assignment") || path.includes("graduate")) return "coursework";
        return "portfolio_project";
    }
    if (sourceType === "career_profile") {
        if (path.includes("professional experience")) return "professional";
        if (path.includes("education") || path.includes("graduate financial mathematics")) return "coursework";
        if (path.includes("professional development") || path.includes("> financial risk manager")) return "professional_development";
        if (path.includes("ai / genai") || path.includes("> lumina") || path.includes("portfolio rag assistant")) return "exploratory";
        if (path.includes("technical & analytical skills") || path.endsWith("skills")) return "skills";
        // Avoid matching the H1 phrase "Portfolio Knowledge Base".
        if (
            path.includes("portfolio projects") ||
            path.includes("showcased project") ||
            path.includes(" > projects") ||
            path.trim().endsWith("projects")
        ) {
            return "portfolio_project";
        }
        return "career_profile";
    }
    return sourceType || "unknown";
}

function exploreUrl(chunk) {
    const documentId = chunk.document_id || "";
    const sourceType = chunk.source_type || "";
    const sourceUrl = chunk.source_url || "";
    const headingPath = chunk.heading_path || "";
    const repoUrl = chunk.metadata?.repo_url || chunk.repo_url || "";

    if (sourceType === "website" && sourceUrl.startsWith("http")) return sourceUrl;

    if (documentId.startsWith("website::")) {
        const slug = documentId.split("::")[1];
        if (slug === "home") return `${SITE}/`;
        if (slug === "skills") return `${SITE}/projects`;
        if (slug.startsWith("projects-")) return `${SITE}/projects/${slug.slice("projects-".length)}`;
        return `${SITE}/${slug}`;
    }

    if (documentId.startsWith("project::")) {
        const repo = documentId.split("::")[1] || "";
        const page = PROJECT_PAGE[repo];
        if (page) return `${SITE}${page}`;
        if (repoUrl.startsWith("http")) return repoUrl;
        if (sourceUrl.startsWith("http")) return sourceUrl;
    }

    if (sourceType === "career_profile") {
        const path = headingPath.toLowerCase();
        if (path.includes("professional experience")) return `${SITE}/experience`;
        if (path.includes("education")) return `${SITE}/about`;
        if (path.includes("ai / genai") || path.includes("rag")) return `${SITE}/projects/interactive-rag`;
        if (path.includes("technical") || path.includes("skills")) return `${SITE}/projects`;
        return `${SITE}/experience`;
    }

    if (sourceUrl.startsWith("http")) return sourceUrl;
    return `${SITE}/projects`;
}

function enrichCitations(citations) {
    const seen = new Set();
    const out = [];
    for (const raw of citations) {
        const category = raw.experience_category || experienceCategory(raw.source_type, raw.section, raw.document_id);
        const url = raw.explore_url || exploreUrl(raw);
        const label = raw.label || "Source";
        const key = `${url}::${label}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ ...raw, experience_category: category, explore_url: url });
    }
    return out;
}

function decodeVectors() {
    if (cachedVectors) return cachedVectors;
    const binary = atob(index.vectors_base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    const floats = new Float32Array(bytes.buffer);
    const dim = index.dimensions;
    const rows = index.chunk_count;
    const matrix = [];
    for (let r = 0; r < rows; r += 1) {
        matrix.push(floats.subarray(r * dim, (r + 1) * dim));
    }
    cachedVectors = matrix;
    return cachedVectors;
}

function l2Normalize(values) {
    let sum = 0;
    for (let i = 0; i < values.length; i += 1) sum += values[i] * values[i];
    const norm = Math.sqrt(sum) || 1e-12;
    return values.map((v) => v / norm);
}

function cosineTopK(queryVec, topK) {
    const matrix = decodeVectors();
    const scored = matrix.map((row, idx) => {
        let dot = 0;
        for (let i = 0; i < row.length; i += 1) dot += row[i] * queryVec[i];
        return { idx, score: dot };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
}

function dedupeHits(hits, topK) {
    const seenHash = new Set();
    const seenSection = new Set();
    const out = [];
    for (const hit of hits) {
        const chunk = index.chunks[hit.idx];
        const sectionKey = `${chunk.document_id}::${chunk.heading_path}`;
        if (seenHash.has(chunk.content_sha256)) continue;
        if (seenSection.has(sectionKey) && out.length >= Math.max(2, topK - 1)) continue;
        seenHash.add(chunk.content_sha256);
        seenSection.add(sectionKey);
        out.push({ chunk, score: hit.score });
        if (out.length >= topK) break;
    }
    return out;
}

function assembleContext(hits, maxChars = 9000) {
    const blocks = [];
    const citations = [];
    const used = [];
    const seen = new Set();
    let total = 0;
    hits.forEach((hit, i) => {
        const c = hit.chunk;
        const label = c.project_name || c.document_title || c.document_id;
        const category = experienceCategory(c.source_type, c.heading_path, c.document_id);
        const visit = exploreUrl(c);
        const piece = `[Source ${i + 1}] ${label}\nexperience_category=${category} | type=${c.source_type} | section=${c.heading_path}\nurl=${c.source_url}\nexplore=${visit}\n${c.content}\n`;
        if (total + piece.length > maxChars && used.length) return;
        blocks.push(piece);
        used.push(hit);
        total += piece.length;
        const key = `${c.source_url}::${label}`;
        if (!seen.has(key)) {
            seen.add(key);
            citations.push({
                label,
                source_type: c.source_type,
                source_url: c.source_url,
                section: c.heading_path,
                document_id: c.document_id,
                chunk_id: c.chunk_id,
                score: Number(hit.score.toFixed(4)),
                repo_url: c.metadata?.repo_url || null,
                experience_category: category,
                explore_url: visit,
            });
        }
    });
    return {
        evidence_block: blocks.join("\n---\n") || "(no evidence retrieved)",
        citations: enrichCitations(citations),
        used,
    };
}

function looksLikeAbstention(answer) {
    const lowered = answer.toLowerCase();
    return [
        "don't have enough information",
        "do not have enough information",
        "not enough information in the portfolio",
        "insufficient evidence",
    ].some((m) => lowered.includes(m));
}

function enforceRateLimit(ip) {
    const now = Date.now();
    const bucket = rateBuckets.get(ip) || [];
    const fresh = bucket.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length >= RATE_LIMIT_MAX) {
        const err = new Error("Rate limit exceeded. Try again shortly.");
        err.status = 429;
        throw err;
    }
    fresh.push(now);
    rateBuckets.set(ip, fresh);
}

export async function handleRagAsk(request, env) {
    if (!env.AI) {
        const err = new Error("Workers AI binding missing");
        err.status = 503;
        throw err;
    }

    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    enforceRateLimit(ip);

    const body = await request.json().catch(() => ({}));
    const question = String(body.question || "").trim();
    const topK = Math.min(Math.max(Number(body.top_k) || DEFAULT_TOP_K, 1), 8);

    if (question.length < 3 || question.length > MAX_QUERY_CHARS) {
        const err = new Error("Question must be between 3 and 500 characters.");
        err.status = 400;
        throw err;
    }

    const embedResult = await env.AI.run(EMBED_MODEL, { text: [question] });
    const queryEmbedding = embedResult?.data?.[0];
    if (!queryEmbedding) {
        const err = new Error("Failed to embed query");
        err.status = 502;
        throw err;
    }

    const pool = cosineTopK(l2Normalize(queryEmbedding), Math.max(topK * 2, topK));
    const hits = dedupeHits(pool, topK);
    const ctx = assembleContext(hits);

    if (!hits.length) {
        return {
            question,
            answer: "I don't have enough information in the portfolio to answer that confidently.",
            abstained: true,
            citations: [],
            explore: [],
            generator_model: "none",
            flow: { retrieved_chunks: 0, context_chunks: 0, cited_sources: 0 },
            retrieved: [],
        };
    }

    const userPrompt = `Question:\n${question}\n\nEvidence:\n${ctx.evidence_block}\n\nWrite a grounded portfolio navigation answer. Synthesize across sources when helpful. If the evidence does not support an answer, abstain.`;
    const gen = await env.AI.run(GENERATE_MODEL, {
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
        ],
        max_tokens: 1024,
    });
    const answer = (
        gen?.choices?.[0]?.message?.content ||
        gen?.response ||
        ""
    ).trim();
    if (!answer) {
        const err = new Error("Empty generation");
        err.status = 502;
        throw err;
    }

    const abstained = looksLikeAbstention(answer);
    const citations = abstained ? [] : ctx.citations;
    return {
        question,
        answer: abstained
            ? "I don't have enough information in the portfolio to answer that confidently."
            : answer,
        abstained,
        citations,
        explore: citations.map((c) => ({
            label: c.label,
            explore_url: c.explore_url,
            experience_category: c.experience_category,
            section: c.section,
        })),
        generator_model: GENERATE_MODEL,
        flow: {
            retrieved_chunks: hits.length,
            context_chunks: ctx.used.length,
            cited_sources: citations.length,
        },
        retrieved: hits.map((h) => ({
            chunk_id: h.chunk.chunk_id,
            document_id: h.chunk.document_id,
            title: h.chunk.project_name || h.chunk.document_title,
            section: h.chunk.heading_path,
            source_type: h.chunk.source_type,
            source_url: /^https?:\/\//.test(String(h.chunk.source_url || ""))
                ? h.chunk.source_url
                : null,
            score: Number(h.score.toFixed(4)),
            excerpt: String(h.chunk.content || "").slice(0, 280),
            explore_url: exploreUrl(h.chunk),
            experience_category: experienceCategory(h.chunk.source_type, h.chunk.heading_path, h.chunk.document_id),
        })),
    };
}

export function ragHealth() {
    return {
        ok: true,
        index_ready: Boolean(index?.chunk_count),
        chunk_count: index?.chunk_count || 0,
        embedding_model: index?.embedding_model || EMBED_MODEL,
        generator_model: GENERATE_MODEL,
        rate_limit_per_minute: RATE_LIMIT_MAX,
    };
}
