import { resolvePageMeta } from "./PageMeta";

test("returns recruiter-readable metadata for project and unknown routes", () => {
    expect(resolvePageMeta("/projects/credit-risk-pd-model")).toEqual(expect.objectContaining({
        title: "Credit Risk Decision & Portfolio Analytics",
    }));
    expect(resolvePageMeta("/projects/retail-demand-forecasting").description).toContain("forecast uncertainty");
    expect(resolvePageMeta("/ask")).toEqual(expect.objectContaining({
        title: "Ask the Portfolio",
        description: expect.stringContaining("grounded questions"),
    }));
    expect(resolvePageMeta("/not-a-real-route").title).toBe("Page Not Found");
});
