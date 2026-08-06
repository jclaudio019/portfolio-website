import {
    aboutChapters,
    educationEntries,
    experienceImpactAreas,
    professionalContext,
    profile,
    projects,
    publishedProjects,
    resumeHighlights,
    skillGroups,
} from "./content";

test("retains five project records while publishing four complete case studies", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
        "warehouse-club-market-expansion",
    ]);
    expect(new Set(projects.map(({ slug }) => slug))).toHaveProperty("size", 5);
    expect(publishedProjects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
    ]);
    expect(publishedProjects.every(({ image }) => image.includes("/images/") && image.endsWith(".png"))).toBe(true);
    expect(publishedProjects.every(({ github }) => github.startsWith("https://github.com/jclaudio019/"))).toBe(true);
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

    const slugs = new Set(publishedProjects.map(({ slug }) => slug));
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
        heroIntro: "I am an analytics professional with more than five years of experience across finance, supply chain, and inventory planning. I combine programming, forecasting, statistical methods, and business context to support practical, data-informed decisions.",
        heroSupport: "I am currently pursuing an M.S. in Applied Statistics at Purdue University to deepen my understanding of modeling, uncertainty, and the questions behind the data.",
        education: "M.S. Applied Statistics — Purdue University (Expected May 2027)",
    }));
});

test("keeps the About story concise and education accurate", () => {
    expect(aboutChapters.map(({ title }) => title)).toEqual([
        "How It Started",
        "Professional Application",
        "Why Applied Statistics",
        "What I Build Now",
    ]);
    expect(aboutChapters.map(({ paragraphs }) => paragraphs.length)).toEqual([2, 1, 2, 2]);
    expect(aboutChapters[2].paragraphs[0]).toBe(
        "As my work became more analytical, I wanted to better understand why different methods work, when to use them, and how to evaluate their results."
    );
    expect(aboutChapters[3].paragraphs[1]).toContain(
        "My goal is to build solutions that are clear, explainable, and useful to the people making the decision."
    );
    expect(aboutChapters.flatMap(({ paragraphs }) => paragraphs).join(" ")).not.toContain("market-expansion");
    expect(educationEntries[0].coursework).toEqual([
        "Linear Regression", "Probability", "Statistical Inference", "Time-Series Analysis",
    ]);
    expect(educationEntries.map(({ school }) => school)).toEqual([
        "Purdue University", "Bryant University",
    ]);
});

test("keeps forecasting exposure and credit probability language precise", () => {
    const retail = projects.find(({ slug }) => slug === "retail-demand-forecasting");
    const credit = projects.find(({ slug }) => slug === "credit-risk-pd-model");

    expect(retail.summary).toContain("under- and over-forecast errors into retail-value exposure");
    expect(retail.metrics[1]).toEqual({ label: "Naive over-forecast retail value*", value: "$3.01M" });
    expect(retail.problem).toContain("operational effects of under- and over-forecasting");
    expect(credit.summary).toContain("historical risk-ranking model and illustrative scorecard");
    expect(credit.solutionParagraphs[2]).toContain("derives probability of default as 1 − P(good)");
    expect(credit.findings).toContain("At the displayed 0.5 P(good) threshold");
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
    expect(experienceImpactAreas[0].description).not.toContain("working-capital");
    expect(experienceImpactAreas[1].professionalEvidence).toContain(
        "Designed the allocation logic and validation rules, then led the implementation of a workflow used by my current team."
    );
    expect(experienceImpactAreas[2].portfolioEvidence).toHaveLength(2);
    expect(experienceImpactAreas[2].projectSlugs).toEqual([
        "credit-risk-pd-model", "time-series-analysis-r",
    ]);
    expect(professionalContext.entries).toEqual([
        "EssilorLuxottica — Supply Chain Analyst",
        "Rexel USA — Financial Analyst and Corporate Accounting Analyst",
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

test("keeps the warehouse project data unpublished and reversible", () => {
    const warehouse = projects.find(({ slug }) => slug === "warehouse-club-market-expansion");
    expect(warehouse.published).toBe(false);
    expect(warehouse.status).toBe("In progress");
    expect(warehouse.metrics).toBeUndefined();
    expect(publishedProjects).not.toContain(warehouse);
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
