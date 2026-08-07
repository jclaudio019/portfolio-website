import test from "node:test";
import assert from "node:assert/strict";
import fixture from "./fixtures/garch-python-result.json" with { type: "json" };
import { garchAnnualizedVolatility } from "../src/garch.js";

const deterministicPrices = () => {
    let price = 100;
    return Array.from({ length: 600 }, (_, i) => {
        const dailyReturn = 0.0003 + (0.006 + 0.008 * Math.sin(i / 19) ** 2) * Math.sin(i * 1.731);
        price *= Math.exp(dailyReturn);
        return price;
    });
};

test("aligns with the retained Python arch GARCH fixture", () => {
    const volatility = garchAnnualizedVolatility(deterministicPrices());
    const relativeError = Math.abs(volatility - fixture.pythonArchAnnualizedVolatility) /
        fixture.pythonArchAnnualizedVolatility;

    assert.ok(Number.isFinite(volatility) && volatility > 0);
    assert.ok(relativeError <= fixture.relativeTolerance, `relative error ${relativeError}`);
});

test("requires at least 252 usable daily returns", () => {
    assert.throws(
        () => garchAnnualizedVolatility(deterministicPrices().slice(0, 252)),
        /252 daily returns/
    );
});
