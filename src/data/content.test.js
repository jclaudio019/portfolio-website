import { projects } from "./content";

test("publishes four distinct portfolio projects with local covers and repository links", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "warehouse-club-market-expansion",
    ]);
    expect(new Set(projects.map(({ slug }) => slug))).toHaveProperty("size", 4);
    expect(projects.every(({ image }) => image.includes("/images/") && image.endsWith(".png"))).toBe(true);
    expect(projects.every(({ github }) => github.startsWith("https://github.com/jclaudio019/"))).toBe(true);
});

test("marks only the warehouse market-expansion project as in progress", () => {
    expect(projects.filter(({ status }) => status)).toEqual([
        expect.objectContaining({
            slug: "warehouse-club-market-expansion",
            status: "In progress",
        }),
    ]);
});
