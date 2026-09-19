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
    assert.match(body.generator_model, /llama/);
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
