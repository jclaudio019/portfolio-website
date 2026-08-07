import test from "node:test";
import assert from "node:assert/strict";
import {
    normalizeDividendYield,
    normalizeMarketPrice,
    validateOptionType,
    validateSymbol,
} from "../src/yahoo.js";

test("accepts only the three supported symbols", () => {
    assert.equal(validateSymbol("aapl"), "AAPL");
    assert.equal(validateSymbol("MSFT"), "MSFT");
    assert.equal(validateSymbol("SPY"), "SPY");
    assert.throws(() => validateSymbol("TSLA"), /AAPL, MSFT, or SPY/);
});

test("accepts only call or put", () => {
    assert.equal(validateOptionType("call"), "call");
    assert.throws(() => validateOptionType("straddle"), /call or put/);
});

test("uses a positive bid-ask midpoint before the last trade", () => {
    assert.deepEqual(normalizeMarketPrice({ bid: 4, ask: 6, lastPrice: 9 }), {
        bid: 4,
        ask: 6,
        marketPrice: 5,
        marketPriceSource: "bid/ask midpoint",
    });
    assert.deepEqual(normalizeMarketPrice({ bid: 0, ask: 0, lastPrice: 7 }), {
        bid: 0,
        ask: 0,
        marketPrice: 7,
        marketPriceSource: "last trade",
    });
    assert.throws(() => normalizeMarketPrice({ bid: 0, ask: 0, lastPrice: 0 }), /price/);
});

test("normalizes Yahoo dividend fields and identifies fallback", () => {
    assert.deepEqual(normalizeDividendYield({ trailingAnnualDividendYield: 0.0034 }), {
        dividendYield: 0.0034,
        dividendFallback: false,
    });
    const displayedYield = normalizeDividendYield({ dividendYield: 0.35 });
    assert.ok(Math.abs(displayedYield.dividendYield - 0.0035) < 1e-12);
    assert.equal(displayedYield.dividendFallback, false);
    assert.deepEqual(normalizeDividendYield({}), {
        dividendYield: 0,
        dividendFallback: true,
    });
});
