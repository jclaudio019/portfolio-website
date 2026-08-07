import { blackScholes, positionHedge } from "./blackScholes";

test("matches retained Python call price, delta, and gamma", () => {
    const result = blackScholes({
        stockPrice: 75.5,
        strike: 50.25,
        rate: 0.10,
        dividendYield: 0.02,
        volatility: 0.35,
        timeYears: 2.5,
        optionType: "call",
    });

    expect(result.price).toBeCloseTo(34.6578940888037, 8);
    expect(result.delta).toBeCloseTo(0.870607763233823, 8);
    expect(result.gamma).toBeCloseTo(0.00353504880571565, 8);
});

test("matches retained Python put price, delta, and gamma", () => {
    const result = blackScholes({
        stockPrice: 40.15,
        strike: 65.25,
        rate: 0.08,
        dividendYield: 0.03,
        volatility: 0.25,
        timeYears: 2.33,
        optionType: "put",
    });

    expect(result.price).toBeCloseTo(18.2202245870577, 8);
    expect(result.delta).toBeCloseTo(-0.728506968428777, 8);
    expect(result.gamma).toBeCloseTo(0.0179615806241197, 8);
});

test("scales long and short positions and reports the next hedge adjustment", () => {
    expect(positionHedge({ delta: 0.6, gamma: 0.05, signedContracts: 1 })).toEqual({
        positionDelta: 60,
        targetStockHedge: -60,
        hedgeAdjustment: null,
        positionGamma: 5,
    });
    expect(positionHedge({
        delta: -0.35,
        gamma: 0.03,
        signedContracts: -2,
        previousTarget: -60,
    })).toEqual({
        positionDelta: 70,
        targetStockHedge: -70,
        hedgeAdjustment: -10,
        positionGamma: -6,
    });
});

test("rejects non-finite or non-positive model inputs", () => {
    expect(() => blackScholes({
        stockPrice: 0,
        strike: 100,
        rate: 0.04,
        dividendYield: 0,
        volatility: 0.2,
        timeYears: 0.5,
        optionType: "call",
    })).toThrow("positive finite");
});
