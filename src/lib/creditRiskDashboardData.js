export const CREDIT_RISK_EXPORT_FILES = [
    "summary",
    "model_performance",
    "portfolio_risk",
    "simulation",
    "stress",
    "thresholds",
    "monitoring",
    "metadata",
];

export async function loadCreditRiskDashboardData(fetchImpl = fetch) {
    const base = `${process.env.PUBLIC_URL || ""}/data/credit-risk`;
    const entries = await Promise.all(
        CREDIT_RISK_EXPORT_FILES.map(async (name) => {
            const response = await fetchImpl(`${base}/${name}.json`);
            if (!response.ok) throw new Error(`Could not load ${name}.json (${response.status})`);
            return [name, await response.json()];
        })
    );
    return Object.fromEntries(entries);
}

