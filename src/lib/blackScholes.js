const SQRT_TWO_PI = Math.sqrt(2 * Math.PI);

const density = (value) => Math.exp(-0.5 * value ** 2) / SQRT_TWO_PI;

const simpson = (fn, left, right) => {
    const midpoint = (left + right) / 2;
    return ((right - left) / 6) * (fn(left) + 4 * fn(midpoint) + fn(right));
};

const integrate = (fn, left, right, tolerance, whole, depth = 0) => {
    const midpoint = (left + right) / 2;
    const lower = simpson(fn, left, midpoint);
    const upper = simpson(fn, midpoint, right);
    const difference = lower + upper - whole;
    if (depth >= 16 || Math.abs(difference) <= 15 * tolerance) {
        return lower + upper + difference / 15;
    }
    return integrate(fn, left, midpoint, tolerance / 2, lower, depth + 1) +
        integrate(fn, midpoint, right, tolerance / 2, upper, depth + 1);
};

export const normalCdf = (value) => {
    if (value <= -9) return 0;
    if (value >= 9) return 1;
    if (value === 0) return 0.5;
    const upper = Math.abs(value);
    const area = integrate(density, 0, upper, 1e-12, simpson(density, 0, upper));
    return value > 0 ? 0.5 + area : 0.5 - area;
};

export const blackScholes = ({
    stockPrice,
    strike,
    rate,
    dividendYield,
    volatility,
    timeYears,
    optionType,
}) => {
    const positiveInputs = [stockPrice, strike, volatility, timeYears];
    if (positiveInputs.some((value) => !Number.isFinite(value) || value <= 0)) {
        throw new Error("Stock price, strike, volatility, and time must be positive finite values");
    }
    if (![rate, dividendYield].every(Number.isFinite) || !["call", "put"].includes(optionType)) {
        throw new Error("Rate, dividend yield, and option type must be valid");
    }

    const rootTime = Math.sqrt(timeYears);
    const d1 = (Math.log(stockPrice / strike) +
        (rate - dividendYield + volatility ** 2 / 2) * timeYears) / (volatility * rootTime);
    const d2 = d1 - volatility * rootTime;
    const stockDiscount = Math.exp(-dividendYield * timeYears);
    const strikeDiscount = Math.exp(-rate * timeYears);
    const gamma = stockDiscount * density(d1) / (stockPrice * volatility * rootTime);

    if (optionType === "call") {
        return {
            price: stockPrice * stockDiscount * normalCdf(d1) - strike * strikeDiscount * normalCdf(d2),
            delta: stockDiscount * normalCdf(d1),
            gamma,
        };
    }
    return {
        price: strike * strikeDiscount * normalCdf(-d2) - stockPrice * stockDiscount * normalCdf(-d1),
        delta: -stockDiscount * normalCdf(-d1),
        gamma,
    };
};

export const positionHedge = ({ delta, gamma, signedContracts, previousTarget = null }) => {
    if (![delta, gamma, signedContracts].every(Number.isFinite)) {
        throw new Error("Position inputs must be finite values");
    }
    const positionDelta = delta * 100 * signedContracts;
    const targetStockHedge = -positionDelta;
    return {
        positionDelta,
        targetStockHedge,
        hedgeAdjustment: previousTarget === null ? null : targetStockHedge - previousTarget,
        positionGamma: gamma * 100 * signedContracts,
    };
};
