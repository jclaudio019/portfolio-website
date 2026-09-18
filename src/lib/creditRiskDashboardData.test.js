import fs from "fs";
import path from "path";
import { CREDIT_RISK_EXPORT_FILES, loadCreditRiskDashboardData } from "./creditRiskDashboardData";

test("ships every required credit-risk JSON export", () => {
    CREDIT_RISK_EXPORT_FILES.forEach((name) => {
        const file = path.join(process.cwd(), "public", "data", "credit-risk", `${name}.json`);
        expect(() => JSON.parse(fs.readFileSync(file, "utf8"))).not.toThrow();
    });
});

test("loads the static export contract", async () => {
    const fetchImpl = jest.fn(async (url) => ({ ok: true, json: async () => ({ source: url }) }));
    const result = await loadCreditRiskDashboardData(fetchImpl);
    expect(Object.keys(result)).toEqual(CREDIT_RISK_EXPORT_FILES);
    expect(fetchImpl).toHaveBeenCalledTimes(8);
});

