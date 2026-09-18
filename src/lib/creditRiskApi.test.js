import { requestExpectedLoss } from "./creditRiskApi";

test("posts the actual expected-loss contract and returns reconciled output", async () => {
    const fetchImpl = jest.fn(async () => ({ ok: true, json: async () => ({ pd: 0.1, lgd: 0.9, ead: 10000, expected_loss: 900 }) }));
    const result = await requestExpectedLoss({ grade: "B" }, 0.9, 10000, fetchImpl, "https://risk.example");
    expect(result.expected_loss).toBeCloseTo(result.pd * result.lgd * result.ead);
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toEqual({ features: { grade: "B" }, lgd: 0.9, ead: 10000 });
});

test("does not issue a request when the API is not configured", async () => {
    const fetchImpl = jest.fn();
    await expect(requestExpectedLoss({}, 0.9, 1000, fetchImpl, "")).rejects.toThrow("API_NOT_CONFIGURED");
    expect(fetchImpl).not.toHaveBeenCalled();
});

