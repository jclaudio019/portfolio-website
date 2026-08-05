import { projects, skillGroups } from "./content";

test("publishes five distinct portfolio projects with local covers and repository links", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "warehouse-club-market-expansion",
        "time-series-analysis-r",
    ]);
    expect(new Set(projects.map(({ slug }) => slug))).toHaveProperty("size", 5);
    expect(projects.every(({ image }) => image.includes("/images/") && image.endsWith(".png"))).toBe(true);
    expect(projects.every(({ github }) => github.startsWith("https://github.com/jclaudio019/"))).toBe(true);
});

test("links R and Time Series Analysis skills to the public coursework repository", () => {
    const linkedSkills = skillGroups.flatMap(({ items }) => items).filter((item) => typeof item === "object");

    expect(linkedSkills).toEqual([
        { label: "R", href: "https://github.com/jclaudio019/time_series_analysis" },
        { label: "Time Series Analysis", href: "https://github.com/jclaudio019/time_series_analysis" },
    ]);
});

test("marks only the warehouse market-expansion project as in progress", () => {
    expect(projects.filter(({ status }) => status)).toEqual([
        expect.objectContaining({
            slug: "warehouse-club-market-expansion",
            status: "In progress",
        }),
    ]);

    const warehouse = projects.find(({ slug }) => slug === "warehouse-club-market-expansion");
    expect(warehouse.metrics.find(({ label }) => label === "Project status")?.value).toBe("In progress");
});
