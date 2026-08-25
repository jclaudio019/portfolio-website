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

test("publishes six completed case studies and one in-progress case study", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
        "black-scholes-options-modeling",
        "backtesting-system",
        "warehouse-club-market-expansion",
    ]);
    expect(new Set(projects.map(({ slug }) => slug))).toHaveProperty("size", 7);
    expect(publishedProjects.map(({ slug }) => slug)).toEqual([
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
        "black-scholes-options-modeling",
        "backtesting-system",
        "warehouse-club-market-expansion",
    ]);
    expect(publishedProjects.every(({ image }) => image.includes("/images/") && image.endsWith(".png"))).toBe(true);
    expect(publishedProjects.every(({ github }) => github.startsWith("https://github.com/jclaudio019/"))).toBe(true);
});

test("presents the Backtesting System architecture without unsupported trading claims", () => {
    const project = projects.find(({ slug }) => slug === "backtesting-system");

    expect(project.title).toBe("Backtesting System");
    expect(project.status).toBeUndefined();
    expect(project.github).toBe("https://github.com/jclaudio019/backtesting-system");
    expect(project.metrics).toEqual([
        { label: "Strategy demonstrated", value: "1" },
        { label: "Docker services", value: "4" },
        { label: "QuestDB tables", value: "2" },
        { label: "Related coursework assignments", value: "2" },
    ]);
    const copy = JSON.stringify(project);
    expect(copy).toContain("graduate coursework");
    expect(copy).toContain("EMA crossover");
    expect(copy).not.toContain("FM 5151");
    expect(copy.toLowerCase()).not.toContain("profitable");
    expect(copy.toLowerCase()).not.toContain("production-ready");
});

test("presents the updated Retail Allocation Simulator controls and validation flow", () => {
    const project = projects.find(({ slug }) => slug === "retail-allocation-simulator");
    const methodology = project.methodology.join(" ");
    const copy = JSON.stringify(project);

    expect(project.metrics).toContainEqual({ label: "Audit tabs", value: "14" });
    expect(copy).toContain("item exclusions");
    expect(copy).toContain("store holds");
    expect(methodology).toContain("capacity-validation");
    expect(methodology).toContain("original projected store-category inventory");
    expect(methodology).toContain("14-tab Excel workbook");
});

test("states the Backtesting System data, validation, and deployment boundaries", () => {
    const project = projects.find(({ slug }) => slug === "backtesting-system");
    const methodology = project.methodology.join(" ");

    expect(project.dataset).toContain("Yahoo Finance data for AAPL and MSFT");
    expect(project.dataset).toContain("December 1, 2020, through December 1, 2023");
    expect(project.dataset).toContain("no fixed market-data snapshot is tracked");
    expect(project.dataset).toContain("not an immutable reproducible dataset");
    expect(project.dataset).toContain("mocks and sample API records, not orders or credentials");
    expect(project.dataset).not.toContain("sample market data retained with the coursework");
    expect(methodology).toContain("isolated unit tests and static Docker Compose/configuration checks");
    expect(methodology).toContain("remains unverified because Docker was unavailable during final validation");
    expect(methodology).not.toContain("database/API smoke test");
    expect(project.limitations).toEqual([
        "This is an educational graduate-coursework project, not a production trading platform or investment recommendation.",
        "The broker-connected flow uses Alpaca paper trading only.",
        "It demonstrates one EMA crossover strategy.",
        "The project provides no evidence of profitability.",
        "Historical evaluation does not model transaction costs, slippage, or market impact.",
        "The strategy has no out-of-sample validation or production execution controls.",
        "The database and API are not publicly deployed.",
        "No real credentials are tracked; the paper-trading workers require the user's own Alpaca paper credentials.",
        "Public validation used mocks and sample API records and placed no live or paper orders.",
        "Historical notebook outputs are illustrative artifacts rather than investment or reproducibility evidence.",
        "QuestDB and FastAPI are intended for local Docker use only.",
    ]);
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
        education: "M.S. Applied Statistics — Purdue University (Expected 2027)",
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
    expect(educationEntries[0].date).toBe("Expected 2027");
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
        { label: "Education", value: "M.S. Applied Statistics, Purdue University — Expected 2027" },
        { label: "Toolset", value: "Python · SQL · R · Excel · VBA · Power Query · Power BI · Tableau" },
        { label: "Focus", value: "Forecasting · Statistical Modeling · Automation · Decision Support" },
    ]);
});

test("publishes the warehouse project as an in-progress case study without unsupported results", () => {
    const warehouse = projects.find(({ slug }) => slug === "warehouse-club-market-expansion");
    expect(warehouse.status).toBe("In progress");
    expect(warehouse.metrics).toBeUndefined();
    expect(warehouse.solution).toBeUndefined();
    expect(warehouse.methodology).toBeUndefined();
    expect(warehouse.findings).toBeUndefined();
    expect(publishedProjects).toContain(warehouse);
});

test("presents Black-Scholes coursework and its post-course interactive extension truthfully", () => {
    const project = projects.find(({ slug }) => slug === "black-scholes-options-modeling");

    expect(project.title).toBe("Black-Scholes Options Modeling");
    expect(project.status).toBeUndefined();
    expect(project.github).toBe("https://github.com/jclaudio019/black-scholes-options-modeling");
    expect(project.solutionParagraphs.join(" ")).toContain("graduate final project");
    expect(project.aiAssistedDevelopment.paragraphs.join(" ")).toContain("developed after the course");
    expect(project.limitations.join(" ")).toContain("not a trading recommendation");
    expect(JSON.stringify(project)).not.toContain("FM 5151");
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
