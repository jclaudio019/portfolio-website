import { useEffect, useRef, useState } from "react";
import { blackScholes, positionHedge } from "../lib/blackScholes";

const API_BASE_URL = process.env.NODE_ENV === "production"
    ? "https://portfolio-options-api.joseo-claudio19.workers.dev"
    : "";

const requestJson = async (url, options) => {
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "Market data request failed");
    return body;
};

const percent = (value) => `${(value * 100).toFixed(2)}%`;
const money = (value) => `$${value.toFixed(2)}`;
const number = (value, digits = 3) => value.toFixed(digits);
const timestamp = (value) => value ? new Date(value).toLocaleString() : "Unavailable";

const ComparisonCard = ({ row }) => (
    <div className="border border-navy/15 bg-surface p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h4 className="font-display text-xl font-extrabold text-navy">{row.label}</h4>
            <span className="font-mono text-xs uppercase tracking-widest text-teal">{percent(row.volatility)}</span>
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
                ["Black-Scholes price", money(row.price)],
                ["Delta", number(row.delta, 4)],
                ["Gamma", number(row.gamma, 5)],
                ["Position Delta", number(row.positionDelta, 2)],
                ["Position Gamma", number(row.positionGamma, 2)],
                ["Target share hedge", number(row.targetStockHedge, 2)],
                ["Rounded hedge", `${Math.round(row.targetStockHedge)} shares`],
                ["Hedge adjustment", row.hedgeAdjustment === null ? "First refresh" : `${number(row.hedgeAdjustment, 2)} shares`],
            ].map(([label, value]) => (
                <div key={label}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-navy/50">{label}</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-navy">{value}</dd>
                </div>
            ))}
        </dl>
    </div>
);

export default function OptionsHedgeExplorer() {
    const [symbol, setSymbol] = useState("AAPL");
    const [optionType, setOptionType] = useState("call");
    const [expirations, setExpirations] = useState([]);
    const [expiration, setExpiration] = useState("");
    const [strikes, setStrikes] = useState([]);
    const [strike, setStrike] = useState("");
    const [position, setPosition] = useState("long");
    const [contracts, setContracts] = useState(1);
    const [result, setResult] = useState(null);
    const [stale, setStale] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const previousTargets = useRef({});
    const previousPositionKey = useRef("");

    const change = (setter) => (event) => {
        setter(event.target.value);
        if (result) setStale(true);
        setError("");
    };

    useEffect(() => {
        let active = true;
        setExpiration("");
        setStrike("");
        requestJson(`/api/options/expirations?symbol=${symbol}`)
            .then(({ expirations: choices }) => {
                if (!active) return;
                setExpirations(choices);
                setExpiration(choices[0] || "");
            })
            .catch((requestError) => active && setError(requestError.message));
        return () => { active = false; };
    }, [symbol]);

    useEffect(() => {
        if (!expiration) return undefined;
        let active = true;
        setStrike("");
        requestJson(`/api/options/strikes?symbol=${symbol}&expiration=${expiration}&type=${optionType}`)
            .then(({ strikes: choices }) => {
                if (!active) return;
                setStrikes(choices);
                setStrike(String(choices[Math.floor(choices.length / 2)] ?? ""));
            })
            .catch((requestError) => active && setError(requestError.message));
        return () => { active = false; };
    }, [symbol, expiration, optionType]);

    const calculate = async () => {
        setLoading(true);
        setError("");
        try {
            const market = await requestJson("/api/options/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol, expiration, strike: Number(strike), optionType }),
            });
            const positionKey = [symbol, expiration, strike, optionType, position, contracts].join("|");
            if (previousPositionKey.current !== positionKey) previousTargets.current = {};
            const signedContracts = (position === "long" ? 1 : -1) * Number(contracts);
            const timeYears = market.daysToExpiration / 365;
            const rows = [
                ["Market implied", market.impliedVolatility],
                ["GARCH forecast", market.garchVolatility],
            ].map(([label, volatility]) => {
                const model = blackScholes({
                    stockPrice: market.stockPrice,
                    strike: market.strike,
                    rate: market.riskFreeRate,
                    dividendYield: market.dividendYield,
                    volatility,
                    timeYears,
                    optionType,
                });
                const hedge = positionHedge({
                    delta: model.delta,
                    gamma: model.gamma,
                    signedContracts,
                    previousTarget: previousTargets.current[label] ?? null,
                });
                previousTargets.current[label] = hedge.targetStockHedge;
                return { label, volatility, ...model, ...hedge };
            });
            previousPositionKey.current = positionKey;
            setResult({ market, rows });
            setStale(false);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 border border-navy/15 bg-cream/40 p-5 sm:p-7" data-testid="options-explorer">
            <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-widest text-teal">Interactive extension</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-navy">Options pricing & hedge explorer</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                    Compare the same listed option under market-implied and one-day GARCH volatility. Data refreshes only when requested.
                </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <label className="grid gap-2 text-sm text-navy/70">Symbol
                    <select aria-label="Symbol" value={symbol} onChange={change(setSymbol)} className="border border-navy/20 bg-surface px-3 py-3 text-navy">
                        {['AAPL', 'MSFT', 'SPY'].map((value) => <option key={value}>{value}</option>)}
                    </select>
                </label>
                <label className="grid gap-2 text-sm text-navy/70">Option type
                    <select aria-label="Option type" value={optionType} onChange={change(setOptionType)} className="border border-navy/20 bg-surface px-3 py-3 text-navy">
                        <option value="call">Call</option><option value="put">Put</option>
                    </select>
                </label>
                <label className="grid gap-2 text-sm text-navy/70">Expiration
                    <select aria-label="Expiration" value={expiration} onChange={change(setExpiration)} disabled={!expirations.length} className="border border-navy/20 bg-surface px-3 py-3 text-navy disabled:opacity-50">
                        {expirations.map((value) => <option key={value}>{value}</option>)}
                    </select>
                </label>
                <label className="grid gap-2 text-sm text-navy/70">Strike
                    <select aria-label="Strike" value={strike} onChange={change(setStrike)} disabled={!strikes.length} className="border border-navy/20 bg-surface px-3 py-3 text-navy disabled:opacity-50">
                        {strikes.map((value) => <option key={value} value={value}>${value}</option>)}
                    </select>
                </label>
                <label className="grid gap-2 text-sm text-navy/70">Position
                    <select aria-label="Position" value={position} onChange={change(setPosition)} className="border border-navy/20 bg-surface px-3 py-3 text-navy">
                        <option value="long">Long</option><option value="short">Short</option>
                    </select>
                </label>
                <label className="grid gap-2 text-sm text-navy/70">Contract count
                    <input aria-label="Contract count" type="number" min="1" step="1" value={contracts} onChange={change((value) => setContracts(Number(value)))} className="border border-navy/20 bg-surface px-3 py-3 text-navy" />
                </label>
            </div>

            <button type="button" onClick={calculate} disabled={loading || !expiration || !strike} className="mt-6 border border-navy bg-navy px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50">
                {loading ? "Refreshing…" : "Refresh and calculate"}
            </button>
            {error && <p role="alert" className="mt-4 border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
            {stale && <p role="status" className="mt-4 border border-teal/40 bg-navy px-4 py-3 text-sm text-cream">Inputs changed. Refresh to update the result.</p>}

            {result && (
                <div className={`mt-7 ${stale ? "opacity-55" : ""}`} data-testid="options-results">
                    <div className="grid gap-3 border border-navy/15 bg-surface p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                        <p><span className="text-navy/50">Stock price</span><br /><strong>{money(result.market.stockPrice)}</strong></p>
                        <p><span className="text-navy/50">Market option price</span><br /><strong>{money(result.market.marketPrice)}</strong></p>
                        <p><span className="text-navy/50">Bid / ask</span><br /><strong>{money(result.market.bid)} / {money(result.market.ask)}</strong></p>
                        <p><span className="text-navy/50">Pricing source</span><br /><strong>{result.market.marketPriceSource}</strong></p>
                        <p><span className="text-navy/50">Dividend yield</span><br /><strong>{percent(result.market.dividendYield)}{result.market.dividendFallback ? " (0% fallback)" : ""}</strong></p>
                        <p><span className="text-navy/50">^IRX proxy</span><br /><strong>{percent(result.market.riskFreeRate)}</strong></p>
                        <p><span className="text-navy/50">Days to expiration</span><br /><strong>{result.market.daysToExpiration}</strong></p>
                        <p><span className="text-navy/50">Yahoo last trade</span><br /><strong>{timestamp(result.market.lastTradeAt)}</strong></p>
                    </div>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-navy/45">Request completed {timestamp(result.market.retrievedAt)}</p>
                    <div className="mt-5 grid gap-4">{result.rows.map((row) => <ComparisonCard key={row.label} row={row} />)}</div>
                </div>
            )}

            <div className="mt-7 space-y-3 border-t border-navy/15 pt-5 text-sm leading-relaxed text-navy/65">
                <p><strong className="text-navy">Delta</strong> estimates immediate directional exposure. <strong className="text-navy">Gamma</strong> shows how quickly Delta—and the share hedge—changes for an approximately $1 stock move.</p>
                <p><strong className="text-navy">Educational modeling tool.</strong> Yahoo data may be delayed or incomplete. This is not a trading recommendation, production pricing system, or brokerage connection.</p>
                <p>The market-data, GARCH, and interactive extension was developed after the course with AI-assisted coding and reviewed and tested separately.</p>
            </div>
        </div>
    );
}
