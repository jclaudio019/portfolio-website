import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

test("allows browser preflight requests from the portfolio", async () => {
    const response = await worker.fetch(new Request("https://example.com/api/options/calculate", {
        method: "OPTIONS",
    }));

    assert.equal(response.status, 204);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
    assert.equal(response.headers.get("Access-Control-Allow-Headers"), "Content-Type");
    assert.match(response.headers.get("Access-Control-Allow-Methods"), /POST/);
});

test("rejects unsupported symbols before contacting Yahoo", async () => {
    const response = await worker.fetch(
        new Request("https://example.com/api/options/expirations?symbol=TSLA")
    );

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "Symbol must be AAPL, MSFT, or SPY" });
});

test("rejects malformed calculation requests", async () => {
    const response = await worker.fetch(new Request("https://example.com/api/options/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: "AAPL", optionType: "call" }),
    }));

    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /Expiration/);
});

test("returns not found for unrelated routes", async () => {
    const response = await worker.fetch(new Request("https://example.com/other"));
    assert.equal(response.status, 404);
});

test("reports the embedded RAG index and live model configuration", async () => {
    const response = await worker.fetch(new Request("https://example.com/api/rag/health"));
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.index_ready, true);
    assert.equal(body.chunk_count, 154);
    assert.match(body.embedding_model, /bge-base/);
    assert.equal(body.generator_model.primary, "gemini-2.5-flash-lite");
    assert.match(body.generator_model.fallback, /llama/);
});

test("requires the Workers AI binding before accepting RAG questions", async () => {
    const response = await worker.fetch(new Request("https://example.com/api/rag/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "What forecasting work has Jose done?" }),
    }), {});

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: "Workers AI binding missing" });
});

test("returns a concise abstention without exposing local source identifiers", async () => {
    const env = {
        AI: {
            async run(model) {
                if (model.includes("bge-base")) return { data: [Array(768).fill(0.01)] };
                return { response: "I don't have enough information in the portfolio to answer that confidently." };
            },
        },
    };
    const response = await worker.fetch(new Request("https://example.com/api/rag/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "cf-connecting-ip": "test-abstention" },
        body: JSON.stringify({ question: "Has Jose used C++?" }),
    }), env);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.abstained, true);
    assert.equal(body.answer, "I don't have enough information in the portfolio to answer that confidently.");
    assert.deepEqual(body.citations, []);
    assert.equal(body.retrieved.every(({ source_url: url }) => url === null || url.startsWith("http")), true);
});

test("uses Gemini for generation when its secret is configured", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
        assert.match(String(url), /gemini-2\.5-flash-lite:generateContent/);
        assert.equal(options.headers["x-goog-api-key"], "test-secret");
        return Response.json({ candidates: [{ content: { parts: [{ text: "**Answer**\nGemini response" }] } }] });
    };
    try {
        const env = {
            GEMINI_API_KEY: "test-secret",
            AI: {
                async run(model) {
                    assert.match(model, /bge-base/);
                    return { data: [Array(768).fill(0.01)] };
                },
            },
        };
        const response = await worker.fetch(new Request("https://example.com/api/rag/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json", "cf-connecting-ip": "test-gemini" },
            body: JSON.stringify({ question: "What forecasting work has Jose done?" }),
        }), env);
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.equal(body.generator_model, "gemini-2.5-flash-lite");
        assert.match(body.answer, /Gemini response/);
    } finally {
        globalThis.fetch = originalFetch;
    }
});

test("falls back to Workers AI when Gemini is unavailable", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response("rate limited", { status: 429 });
    try {
        const env = {
            GEMINI_API_KEY: "test-secret",
            AI: {
                async run(model) {
                    if (model.includes("bge-base")) return { data: [Array(768).fill(0.01)] };
                    return { response: "**Answer**\nCloudflare fallback response" };
                },
            },
        };
        const response = await worker.fetch(new Request("https://example.com/api/rag/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json", "cf-connecting-ip": "test-fallback" },
            body: JSON.stringify({ question: "What forecasting work has Jose done?" }),
        }), env);
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.match(body.generator_model, /llama/);
        assert.match(body.answer, /Cloudflare fallback response/);
    } finally {
        globalThis.fetch = originalFetch;
    }
});
