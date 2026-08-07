const symbols = ["AAPL", "MSFT", "SPY"];
const headers = { Accept: "application/json", "User-Agent": "Mozilla/5.0" };

const json = async (url, extraHeaders = {}) => {
    const response = await fetch(url, { headers: { ...headers, ...extraHeaders } });
    const body = await response.json();
    if (!response.ok) throw new Error(`${response.status} ${url}: ${JSON.stringify(body)}`);
    return body;
};

const cookieResponse = await fetch("https://fc.yahoo.com", { headers, redirect: "manual" });
const cookie = cookieResponse.headers.get("set-cookie")?.split(";", 1)[0];
if (!cookie) throw new Error("Yahoo did not return a session cookie");

const crumbResponse = await fetch("https://query1.finance.yahoo.com/v1/test/getcrumb", {
    headers: { "User-Agent": headers["User-Agent"], Cookie: cookie },
});
const crumb = await crumbResponse.text();
if (!crumbResponse.ok || !crumb) throw new Error("Yahoo did not return a crumb");

const results = [];
for (const symbol of symbols) {
    const chart = await json(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=2y&interval=1d&events=div%2Csplits`
    );
    const options = await json(
        `https://query1.finance.yahoo.com/v7/finance/options/${symbol}?crumb=${encodeURIComponent(crumb)}`,
        { Cookie: cookie }
    );

    const history = chart.chart?.result?.[0];
    const chain = options.optionChain?.result?.[0];
    const expiration = chain?.expirationDates?.find((value) => value * 1000 > Date.now());
    if (!history || !expiration) throw new Error(`${symbol}: missing history or future expiration`);

    const datedOptions = await json(
        `https://query1.finance.yahoo.com/v7/finance/options/${symbol}?date=${expiration}&crumb=${encodeURIComponent(crumb)}`,
        { Cookie: cookie }
    );
    const datedChain = datedOptions.optionChain?.result?.[0];
    const contract = datedChain?.options?.[0]?.calls?.[0];
    const closes = history.indicators?.quote?.[0]?.close?.filter(Number.isFinite) ?? [];
    const adjusted = history.indicators?.adjclose?.[0]?.adjclose?.filter(Number.isFinite) ?? [];
    const dividends = Object.keys(history.events?.dividends ?? {}).length;

    const required = {
        expirations: chain.expirationDates.length,
        strikes: datedChain?.strikes?.length ?? 0,
        bid: Number.isFinite(contract?.bid),
        ask: Number.isFinite(contract?.ask),
        lastPrice: Number.isFinite(contract?.lastPrice),
        impliedVolatility: Number.isFinite(contract?.impliedVolatility),
        closeHistory: closes.length,
        adjustedHistory: adjusted.length,
        dividendEvents: dividends,
        dividendYield: Number.isFinite(datedChain?.quote?.dividendYield),
    };
    if (!required.strikes || !required.bid || !required.ask || !required.lastPrice ||
        !required.impliedVolatility || required.closeHistory < 252 || required.adjustedHistory < 252) {
        throw new Error(`${symbol}: required fields missing: ${JSON.stringify(required)}`);
    }
    results.push({ symbol, ...required });
}

const rate = await json("https://query1.finance.yahoo.com/v8/finance/chart/%5EIRX?range=5d&interval=1d");
const rateCloses = rate.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.filter(Number.isFinite) ?? [];
if (!rateCloses.length) throw new Error("^IRX returned no finite close");

console.log(JSON.stringify({ cookieAndCrumb: true, symbols: results, irx: rateCloses.at(-1) }, null, 2));
