import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/index.js";

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
