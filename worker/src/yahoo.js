import { garchAnnualizedVolatility } from "./garch.js";

const SUPPORTED_SYMBOLS = new Set(["AAPL", "MSFT", "SPY"]);
const USER_AGENT = "Mozilla/5.0";

export const validateSymbol = (value) => {
    const symbol = String(value ?? "").toUpperCase();
    if (!SUPPORTED_SYMBOLS.has(symbol)) throw new Error("Symbol must be AAPL, MSFT, or SPY");
    return symbol;
};

export const validateOptionType = (value) => {
    const optionType = String(value ?? "").toLowerCase();
    if (!["call", "put"].includes(optionType)) throw new Error("Option type must be call or put");
    return optionType;
};

export const validateExpiration = (value, now = Date.now()) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ""))) {
        throw new Error("Expiration must use YYYY-MM-DD");
    }
    const timestamp = Date.parse(`${value}T00:00:00Z`);
    if (!Number.isFinite(timestamp) || timestamp <= now) throw new Error("Expiration must be in the future");
    return { expiration: value, timestamp, epoch: Math.floor(timestamp / 1000) };
};

export const normalizeMarketPrice = ({ bid, ask, lastPrice }) => {
    const values = { bid: Number(bid), ask: Number(ask), lastPrice: Number(lastPrice) };
    if (values.bid > 0 && values.ask > 0 && Number.isFinite(values.bid) && Number.isFinite(values.ask)) {
        return {
            bid: values.bid,
            ask: values.ask,
            marketPrice: (values.bid + values.ask) / 2,
            marketPriceSource: "bid/ask midpoint",
        };
    }
    if (values.lastPrice > 0 && Number.isFinite(values.lastPrice)) {
        return {
            bid: Number.isFinite(values.bid) ? values.bid : 0,
            ask: Number.isFinite(values.ask) ? values.ask : 0,
            marketPrice: values.lastPrice,
            marketPriceSource: "last trade",
        };
    }
    throw new Error("The selected contract has no usable market price");
};

export const normalizeDividendYield = (quote) => {
    const trailing = Number(quote?.trailingAnnualDividendYield);
    if (Number.isFinite(trailing) && trailing >= 0) {
        return { dividendYield: trailing, dividendFallback: false };
    }
    const displayedPercent = Number(quote?.dividendYield);
    if (Number.isFinite(displayedPercent) && displayedPercent >= 0) {
        return { dividendYield: displayedPercent / 100, dividendFallback: false };
    }
    return { dividendYield: 0, dividendFallback: true };
};

const yahooClient = async (fetchImpl) => {
    const cookieResponse = await fetchImpl("https://fc.yahoo.com", {
        headers: { "User-Agent": USER_AGENT },
        redirect: "manual",
    });
    const cookie = cookieResponse.headers.get("set-cookie")?.split(";", 1)[0];
    if (!cookie) throw new Error("Yahoo market data session is unavailable");
    const crumbResponse = await fetchImpl("https://query1.finance.yahoo.com/v1/test/getcrumb", {
        headers: { "User-Agent": USER_AGENT, Cookie: cookie },
    });
    const crumb = await crumbResponse.text();
    if (!crumbResponse.ok || !crumb) throw new Error("Yahoo market data session is unavailable");

    return async (path) => {
        const separator = path.includes("?") ? "&" : "?";
        const response = await fetchImpl(`https://query1.finance.yahoo.com${path}${separator}crumb=${encodeURIComponent(crumb)}`, {
            headers: { Accept: "application/json", "User-Agent": USER_AGENT, Cookie: cookie },
        });
        if (!response.ok) throw new Error("Yahoo market data is unavailable");
        return response.json();
    };
};

export const fetchExpirations = async (symbol, fetchImpl = fetch) => {
    const ticker = validateSymbol(symbol);
    const getJson = await yahooClient(fetchImpl);
    const data = await getJson(`/v7/finance/options/${ticker}`);
    const epochs = data.optionChain?.result?.[0]?.expirationDates ?? [];
    const expirations = epochs
        .filter((epoch) => epoch * 1000 > Date.now())
        .map((epoch) => new Date(epoch * 1000).toISOString().slice(0, 10));
    if (!expirations.length) throw new Error("No future option expirations are available");
    return expirations;
};

export const fetchStrikes = async ({ symbol, expiration, optionType }, fetchImpl = fetch) => {
    const ticker = validateSymbol(symbol);
    validateOptionType(optionType);
    const { epoch } = validateExpiration(expiration);
    const getJson = await yahooClient(fetchImpl);
    const data = await getJson(`/v7/finance/options/${ticker}?date=${epoch}`);
    const strikes = (data.optionChain?.result?.[0]?.strikes ?? [])
        .map(Number).filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
    if (!strikes.length) throw new Error("No strikes are available for that expiration");
    return strikes;
};

export const fetchCalculation = async ({ symbol, expiration, strike, optionType }, fetchImpl = fetch, now = Date.now()) => {
    const ticker = validateSymbol(symbol);
    const type = validateOptionType(optionType);
    const expirationData = validateExpiration(expiration, now);
    const selectedStrike = Number(strike);
    if (!Number.isFinite(selectedStrike) || selectedStrike <= 0) throw new Error("Strike must be a positive number");
    const getJson = await yahooClient(fetchImpl);
    const [options, chart, rateChart] = await Promise.all([
        getJson(`/v7/finance/options/${ticker}?date=${expirationData.epoch}`),
        getJson(`/v8/finance/chart/${ticker}?range=2y&interval=1d&events=div%2Csplits`),
        getJson("/v8/finance/chart/%5EIRX?range=5d&interval=1d"),
    ]);

    const chain = options.optionChain?.result?.[0];
    const contracts = chain?.options?.[0]?.[type === "call" ? "calls" : "puts"] ?? [];
    const contract = contracts.find((item) => Math.abs(Number(item.strike) - selectedStrike) < 1e-8);
    if (!contract) throw new Error("The selected option contract is unavailable");
    const impliedVolatility = Number(contract.impliedVolatility);
    if (!Number.isFinite(impliedVolatility) || impliedVolatility <= 0) {
        throw new Error("The selected contract has no usable implied volatility");
    }

    const history = chart.chart?.result?.[0];
    const adjustedPrices = history?.indicators?.adjclose?.[0]?.adjclose?.filter(Number.isFinite) ?? [];
    if (adjustedPrices.length < 253) throw new Error("Yahoo returned insufficient adjusted price history");
    const stockPrice = Number(chain?.quote?.regularMarketPrice ?? history?.meta?.regularMarketPrice);
    const rateCloses = rateChart.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.filter(Number.isFinite) ?? [];
    const riskFreeRate = Number(rateCloses.at(-1)) / 100;
    if (!Number.isFinite(stockPrice) || stockPrice <= 0 || !Number.isFinite(riskFreeRate)) {
        throw new Error("Yahoo returned incomplete stock or rate data");
    }

    const daysToExpiration = Math.ceil((expirationData.timestamp - now) / 86400000);
    return {
        symbol: ticker,
        stockPrice,
        strike: selectedStrike,
        daysToExpiration,
        riskFreeRate,
        ...normalizeDividendYield(chain.quote),
        ...normalizeMarketPrice(contract),
        impliedVolatility,
        garchVolatility: garchAnnualizedVolatility(adjustedPrices),
        lastTradeAt: Number.isFinite(Number(contract.lastTradeDate))
            ? new Date(Number(contract.lastTradeDate) * 1000).toISOString()
            : null,
        retrievedAt: new Date(now).toISOString(),
    };
};
