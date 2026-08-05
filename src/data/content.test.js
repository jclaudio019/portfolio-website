import { projects, skillGroups } from "./content";

test("publishes five distinct portfolio projects with local covers and repository links", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
        "warehouse-club-market-expansion",
    ]);
    expect(new Set(projects.map(({ slug }) => slug))).toHaveProperty("size", 5);
    expect(projects.every(({ image }) => image.includes("/images/") && image.endsWith(".png"))).toBe(true);
    expect(projects.every(({ github }) => github.startsWith("https://github.com/jclaudio019/"))).toBe(true);
});

test("publishes six skill groups with verified project evidence", () => {
    expect(skillGroups.map(({ title }) => title)).toEqual([
        "Analytics & Operations",
        "Programming & Data",
        "Machine Learning & Forecasting",
        "Visualization",
        "Business & Research",
        "Statistical Methods",
    ]);

    const skills = skillGroups.flatMap(({ items }) => items).map((item) =>
        typeof item === "string" ? { label: item } : item
    );
    expect(skills.map(({ label }) => label)).toEqual(expect.arrayContaining([
        "Machine Learning", "scikit-learn", "XGBoost", "statsmodels",
        "Prophet", "ARIMA", "NumPy", "Jupyter", "pytest",
    ]));

    const slugs = new Set(projects.map(({ slug }) => slug));
    skills.flatMap(({ projectSlugs = [] }) => projectSlugs).forEach((slug) => {
        expect(slugs.has(slug)).toBe(true);
    });
});

test("marks only the warehouse market-expansion project as in progress", () => {
    expect(projects.filter(({ status }) => status)).toEqual([
        expect.objectContaining({
            slug: "warehouse-club-market-expansion",
            status: "In progress",
        }),
    ]);

    const warehouse = projects.find(({ slug }) => slug === "warehouse-club-market-expansion");
    expect(warehouse.status).toBe("In progress");
    expect(warehouse.metrics).toBeUndefined();
});

test("presents the R time-series final project through its implemented analysis", () => {
    const project = projects.find(({ slug }) => slug === "time-series-analysis-r");

    expect(project.title).toBe("Time-Series Analysis & Forecasting in R");
    expect(project.metrics).toEqual([
        { label: "Time-series behaviors simulated", value: "6" },
        { label: "Real-world series forecasted", value: "2" },
        { label: "Forecast horizon", value: "24 months" },
    ]);
    expect(project.gallery).toBeUndefined();
    expect(project.conclusionParagraphs.join(" ")).toContain("six coursework notebooks");
});
