const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const sigmoid = (value) => 1 / (1 + Math.exp(-value));
const logit = (value) => Math.log(value / (1 - value));

const parameters = ([mu, logOmega, rawAlpha, rawBeta]) => {
    const alpha = 0.999 * sigmoid(rawAlpha);
    const beta = (0.999 - alpha) * sigmoid(rawBeta);
    return { mu, omega: Math.exp(logOmega), alpha, beta };
};

const likelihood = (point, returns, initialVariance) => {
    const { mu, omega, alpha, beta } = parameters(point);
    let variance = initialVariance;
    let previousError = returns[0] - mu;
    let value = Math.log(variance) + previousError ** 2 / variance;
    for (let i = 1; i < returns.length; i += 1) {
        variance = omega + alpha * previousError ** 2 + beta * variance;
        if (!Number.isFinite(variance) || variance <= 1e-12) return Number.POSITIVE_INFINITY;
        const error = returns[i] - mu;
        value += Math.log(variance) + error ** 2 / variance;
        previousError = error;
    }
    return value;
};

const nelderMead = (start, objective) => {
    const simplex = [start, ...start.map((_, index) =>
        start.map((value, position) => value + (index === position ? 0.15 * (Math.abs(value) + 1) : 0))
    )].map((point) => ({ point, value: objective(point) }));

    for (let iteration = 0; iteration < 500; iteration += 1) {
        simplex.sort((a, b) => a.value - b.value);
        const best = simplex[0];
        const worst = simplex.at(-1);
        const secondWorst = simplex.at(-2);
        const centroid = best.point.map((_, index) =>
            simplex.slice(0, -1).reduce((sum, item) => sum + item.point[index], 0) / start.length
        );
        const candidate = (factor) => centroid.map((value, index) =>
            value + factor * (centroid[index] - worst.point[index])
        );
        const reflected = { point: candidate(1), value: 0 };
        reflected.value = objective(reflected.point);

        if (reflected.value < best.value) {
            const expanded = { point: candidate(2), value: 0 };
            expanded.value = objective(expanded.point);
            simplex[simplex.length - 1] = expanded.value < reflected.value ? expanded : reflected;
        } else if (reflected.value < secondWorst.value) {
            simplex[simplex.length - 1] = reflected;
        } else {
            const contractedPoint = centroid.map((value, index) =>
                value + 0.5 * (worst.point[index] - value)
            );
            const contracted = { point: contractedPoint, value: objective(contractedPoint) };
            if (contracted.value < worst.value) {
                simplex[simplex.length - 1] = contracted;
            } else {
                for (let i = 1; i < simplex.length; i += 1) {
                    simplex[i].point = simplex[i].point.map((value, index) =>
                        best.point[index] + 0.5 * (value - best.point[index])
                    );
                    simplex[i].value = objective(simplex[i].point);
                }
            }
        }

        const spread = Math.max(...simplex.map((item) => Math.abs(item.value - simplex[0].value)));
        if (spread < 1e-8) break;
    }
    simplex.sort((a, b) => a.value - b.value);
    return simplex[0];
};

export const garchAnnualizedVolatility = (prices) => {
    const clean = prices.map(Number).filter(Number.isFinite);
    if (clean.some((price) => price <= 0)) throw new Error("prices must be positive");
    const returns = clean.slice(1).map((price, index) => 100 * Math.log(price / clean[index]));
    if (returns.length < 252) throw new Error("GARCH estimation requires at least 252 daily returns");

    const mu = mean(returns);
    const initialVariance = mean(returns.map((value) => (value - mu) ** 2));
    const starts = [0.7, 0.85, 0.93].map((beta) => {
        const alpha = 0.05;
        return [
            mu,
            Math.log(Math.max(initialVariance * (1 - alpha - beta), 1e-8)),
            logit(alpha / 0.999),
            logit(beta / (0.999 - alpha)),
        ];
    });
    const objective = (point) => likelihood(point, returns, initialVariance);
    const fit = starts.map((start) => nelderMead(start, objective)).sort((a, b) => a.value - b.value)[0];
    const { mu: fittedMean, omega, alpha, beta } = parameters(fit.point);
    let variance = initialVariance;
    let previousError = returns[0] - fittedMean;
    for (let i = 1; i < returns.length; i += 1) {
        variance = omega + alpha * previousError ** 2 + beta * variance;
        previousError = returns[i] - fittedMean;
    }
    const forecastVariance = omega + alpha * previousError ** 2 + beta * variance;
    const volatility = Math.sqrt(forecastVariance * 252) / 100;
    if (!Number.isFinite(volatility) || volatility <= 0) throw new Error("GARCH produced an invalid forecast");
    return volatility;
};
