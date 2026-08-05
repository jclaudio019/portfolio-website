import {
    aboutChapters,
    educationEntries,
    experienceImpactAreas,
    professionalContext,
    profile,
    projects,
    resumeHighlights,
    skillGroups,
} from "./content";

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

test("publishes five skill groups with verified project evidence", () => {
    expect(skillGroups.map(({ title }) => title)).toEqual([
        "Analytics & Decision Support",
        "Programming & Data",
        "Modeling & Statistics",
        "Visualization & Communication",
        "Business Domains",
    ]);

    const skills = skillGroups.flatMap(({ items }) => items).map((item) =>
        typeof item === "string" ? { label: item } : item
    );
    expect(skills.map(({ label }) => label)).toEqual(expect.arrayContaining([
        "Forecast Validation", "Machine Learning", "Feature Engineering",
        "ROC-AUC", "WoE & Information Value", "Scorecard Development",
        "NumPy", "Jupyter", "pytest", "Git & GitHub",
    ]));
    expect(skills.map(({ label }) => label)).not.toEqual(expect.arrayContaining([
        "Accounting", "Public Data",
    ]));

    const slugs = new Set(projects.map(({ slug }) => slug));
    skills.flatMap(({ projectSlugs = [] }) => projectSlugs).forEach((slug) => {
        expect(slugs.has(slug)).toBe(true);
    });
});

test("positions Jose as an experienced applied analytics professional", () => {
    expect(profile).toEqual(expect.objectContaining({
        name: "Jose Claudio",
        role: "Applied Analytics | Forecasting, Statistical Modeling & Decision Support",
        roleShort: "Forecasting, Modeling, Automation & Business Decision Support",
        location: "Orange City, Florida",
        availability: [
            "Open to remote, hybrid, and on-site opportunities",
            "Willing to relocate for the right opportunity",
        ],
        heroIntro: "I bring 5+ years of experience across finance, supply chain, inventory planning, and analytics, using Python, SQL, statistical modeling, forecasting, and automation to support practical business decisions.",
        heroSupport: "Currently pursuing an M.S. in Applied Statistics at Purdue University, I build decision-focused projects that connect rigorous analytical methods with operational and financial questions.",
    }));
});

test("keeps the About story concise and education accurate", () => {
    expect(aboutChapters.map(({ title }) => title)).toEqual([
        "How It Started",
        "Professional Application",
        "Why Applied Statistics",
        "What I Build Now",
    ]);
    expect(aboutChapters.every(({ paragraphs }) => paragraphs.length === 2)).toBe(true);
    expect(educationEntries[0].coursework).toEqual([
        "Linear Regression", "Probability", "Statistical Inference", "Time-Series Analysis",
    ]);
    expect(educationEntries.map(({ school }) => school)).toEqual([
        "Purdue University", "Bryant University",
    ]);
});

test("organizes experience around impact areas with compact employer context", () => {
    expect(experienceImpactAreas.map(({ theme }) => theme)).toEqual([
        "Forecasting, Inventory & Decision Support",
        "Automation, Reporting & Data Validation",
        "Finance, Modeling & Performance Analysis",
    ]);
    expect(experienceImpactAreas[0].projectSlugs).toEqual([
        "retail-demand-forecasting",
        "retail-allocation-simulator",
        "time-series-analysis-r",
    ]);
    expect(professionalContext.entries).toEqual([
        "EssilorLuxottica — Supply Chain Analyst",
        "Rexel USA — Financial & Accounting Analyst",
        "FGX International — Vendor Managed Inventory Analyst",
    ]);
});

test("publishes the requested resume highlights", () => {
    expect(resumeHighlights).toEqual([
        { label: "Location", value: "Orange City, Florida · Open to relocation" },
        { label: "Education", value: "M.S. Applied Statistics, Purdue University — Expected May 2027" },
        { label: "Toolset", value: "Python · SQL · R · Excel · VBA · Power Query · Power BI · Tableau" },
        { label: "Focus", value: "Forecasting · Statistical Modeling · Automation · Decision Support" },
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
