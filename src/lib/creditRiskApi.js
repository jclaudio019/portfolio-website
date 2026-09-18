export const creditRiskApiUrl = (process.env.REACT_APP_CREDIT_RISK_API_URL || "").replace(/\/$/, "");

export async function requestExpectedLoss(features, lgd, ead, fetchImpl = fetch, baseUrl = creditRiskApiUrl) {
    if (!baseUrl) throw new Error("API_NOT_CONFIGURED");
    const response = await fetchImpl(`${baseUrl}/expected-loss`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features, lgd, ead }),
    });
    if (!response.ok) {
        let detail = "Scoring service unavailable.";
        try {
            const body = await response.json();
            detail = typeof body.detail === "string" ? body.detail : detail;
        } catch (_) {}
        throw new Error(detail);
    }
    return response.json();
}

