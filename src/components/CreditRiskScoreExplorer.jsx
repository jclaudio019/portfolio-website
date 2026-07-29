import { useEffect, useRef, useState } from "react";
import scorecard from "../data/creditRiskScorecard.json";
import { scoreCreditRisk } from "../lib/creditRiskScoring";

const DEFAULTS = {
    grade: "C",
    interestRate: 13.5,
    annualIncome: 60000,
    debtToIncome: 18,
    loanTerm: 36,
    employmentLength: 5,
    homeOwnership: "MORTGAGE",
    inquiriesLast6Months: 1,
    state: "CA",
    verificationStatus: "Source Verified",
    purpose: "debt_consolidation",
    initialListStatus: "f",
    monthsSinceIssue: 50,
    monthsSinceEarliestCreditLine: 240,
    accountsCurrentlyDelinquent: 0,
    monthsSinceLastDelinquency: null,
    monthsSinceLastPublicRecord: null,
};

const PRIMARY_FAMILIES = new Set([
    "grade",
    "interestRate",
    "annualIncome",
    "debtToIncome",
    "loanTerm",
    "employmentLength",
    "homeOwnership",
    "inquiriesLast6Months",
]);

const LABELS = {
    grade: "Grade",
    interestRate: "Interest rate (%)",
    annualIncome: "Annual income",
    debtToIncome: "DTI (%)",
    loanTerm: "Term (months)",
    employmentLength: "Employment length (years)",
    homeOwnership: "Homeownership",
    inquiriesLast6Months: "Inquiries in last 6 months",
    state: "State",
    verificationStatus: "Verification status",
    purpose: "Loan purpose",
    initialListStatus: "Initial list status",
    monthsSinceIssue: "Months since issue",
    monthsSinceEarliestCreditLine: "Months since earliest credit line",
    accountsCurrentlyDelinquent: "Accounts currently delinquent",
    monthsSinceLastDelinquency: "Months since last delinquency",
    monthsSinceLastPublicRecord: "Months since last public record",
};

const familyValues = (family) =>
    [...new Set(family.options.flatMap(([category, , , values = [category]]) => values))];

const percentage = (value) => `${(value * 100).toFixed(1)}%`;

const scoreBand = (score) => {
    if (score >= 740) return "Lowest";
    if (score >= 630) return "Lower";
    if (score >= 520) return "Middle";
    if (score >= 410) return "Elevated";
    return "Higher relative historical risk";
};

function Field({ family, value, error, onChange }) {
    const label = LABELS[family.id];
    const inputId = `credit-risk-${family.id}`;
    const errorId = `${inputId}-error`;

    return (
        <div>
            <label htmlFor={inputId} className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-navy/60">
                {label}
            </label>
            {family.options ? (
                <select
                    id={inputId}
                    value={value ?? ""}
                    onChange={(event) => onChange(family.id, event.target.value)}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={Boolean(error)}
                    className="w-full border border-navy/20 bg-surface px-3 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                >
                    {family.missingCategory && <option value="">Not provided</option>}
                    {familyValues(family).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
            ) : (
                <input
                    id={inputId}
                    type="number"
                    min={family.minimum}
                    step={family.integer ? "1" : "any"}
                    value={value ?? ""}
                    onChange={(event) => onChange(family.id, event.target.value === "" ? null : event.target.value)}
                    aria-describedby={error ? errorId : undefined}
                    aria-invalid={Boolean(error)}
                    className="w-full border border-navy/20 bg-surface px-3 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-1 focus:ring-teal"
                />
            )}
            {error && <p id={errorId} className="mt-1 border border-red-300/40 bg-navy/90 px-2 py-1 text-xs text-cream">{error}</p>}
        </div>
    );
}

export default function CreditRiskScoreExplorer() {
    const [inputs, setInputs] = useState(DEFAULTS);
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});
    const [stale, setStale] = useState(false);
    const resultsRef = useRef(null);

    useEffect(() => {
        if (result) resultsRef.current?.focus();
    }, [result]);

    const updateInput = (id, value) => {
        setInputs((current) => ({ ...current, [id]: value }));
        setStale(Boolean(result));
        setErrors({});
    };

    const calculate = () => {
        const next = scoreCreditRisk(inputs);
        setErrors(next.errors);
        if (!Object.keys(next.errors).length) {
            setResult(next);
            setStale(false);
        }
    };

    const primary = scorecard.families.filter((family) => PRIMARY_FAMILIES.has(family.id));
    const advanced = scorecard.families.filter((family) => !PRIMARY_FAMILIES.has(family.id));

    return (
        <div className="mt-8 border border-navy bg-surface" data-testid="credit-risk-score-explorer">
            <div className="border-b border-navy bg-navy px-5 py-5 text-cream sm:px-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-teal">Interactive scorecard</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Credit risk score explorer</h3>
            </div>
            <div className="p-5 sm:p-6">
                <p className="border border-teal/30 bg-teal/5 px-4 py-3 text-sm leading-relaxed text-navy/80">
                    Educational historical-model demonstration. Not a lending decision, approval recommendation, or calibrated production PD.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {primary.map((family) => <Field key={family.id} family={family} value={inputs[family.id]} error={errors[family.id]} onChange={updateInput} />)}
                </div>
                <details className="mt-5 border border-navy/15">
                    <summary className="cursor-pointer px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-navy/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal">
                        Advanced historical fields
                    </summary>
                    <div className="grid gap-4 border-t border-navy/15 p-4 md:grid-cols-2">
                        {advanced.map((family) => <Field key={family.id} family={family} value={inputs[family.id]} error={errors[family.id]} onChange={updateInput} />)}
                    </div>
                </details>
                <button
                    type="button"
                    onClick={calculate}
                    className="mt-6 border border-navy bg-navy px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                >
                    Calculate
                </button>
                {result && (
                    <div ref={resultsRef} tabIndex={-1} data-testid="score-results" className="mt-6 border border-navy/15 outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2">
                        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                            {stale ? "Results are stale. Calculate again to refresh." : "Results calculated."}
                        </p>
                        {stale && <p className="border-b border-teal/40 bg-navy/90 px-4 py-3 text-sm text-cream">Results are stale. Calculate again to refresh.</p>}
                        <div className="grid gap-px bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-surface p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Illustrative score:</p><p className="mt-2 font-display text-3xl font-extrabold text-teal">{Math.round(result.score)}</p></div>
                            <div className="bg-surface p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">P(good):</p><p className="mt-2 font-display text-3xl font-extrabold text-teal">{percentage(result.pGood)}</p></div>
                            <div className="bg-surface p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Probability of default:</p><p className="mt-2 font-display text-3xl font-extrabold text-teal">{percentage(result.pd)}</p></div>
                            <div className="bg-surface p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-navy/50">Display-only band:</p><p className="mt-2 font-display text-3xl font-extrabold text-teal">{scoreBand(result.score)}</p></div>
                        </div>
                        <div className="p-4">
                            <p className="font-mono text-[11px] uppercase tracking-widest text-teal">Top three contributions</p>
                            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                                {result.strongestContributions.map((item) => <li key={item.family} data-testid="contribution-row" className="border border-navy/15 px-3 py-2 text-sm text-navy/75"><span className="font-medium text-navy">{LABELS[item.family]}:</span> {item.category} ({item.points >= 0 ? "+" : ""}{item.points} pts)</li>)}
                            </ul>
                            <details className="mt-4 border border-navy/15">
                                <summary className="cursor-pointer px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-navy/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal">Full family breakdown</summary>
                                <ul className="divide-y divide-navy/10 border-t border-navy/15">
                                    {result.contributions.map((item) => <li key={item.family} className="flex justify-between gap-4 px-3 py-2 text-sm"><span>{LABELS[item.family]}: {item.category}</span><span className="font-mono text-navy/60">{item.points >= 0 ? "+" : ""}{item.points} pts</span></li>)}
                                </ul>
                            </details>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
