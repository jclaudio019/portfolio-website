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
    workflowPillars,
} from "./content";

test("keeps Backtesting documented but removes it from the published portfolio", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
        "interactive-rag",
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
        "black-scholes-options-modeling",
        "backtesting-system",
        "warehouse-club-market-expansion",
    ]);
    expect(new Set(projects.map(({ slug }) => slug))).toHaveProperty("size", 8);
    expect(publishedProjects.map(({ slug }) => slug)).toEqual([
        "interactive-rag",
        "retail-demand-forecasting",
        "credit-risk-pd-model",
        "retail-allocation-simulator",
        "time-series-analysis-r",
        "black-scholes-options-modeling",
        "warehouse-club-market-expansion",
    ]);
    expect(
        publishedProjects.every(
            ({ image }) => image.includes("/images/") && (image.endsWith(".png") || image.endsWith(".svg"))
        )
    ).toBe(true);
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
        "AI-Augmented Analytics & Automation", "Analytical Validation & Audit",
        "Model Calibration & Monitoring", "Uncertainty & Scenario Analysis",
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
        email: "joseo.claudio19@gmail.com",
        resumeAvailableOnRequest: false,
        resumeUrl: "/Jose_Claudio_Analytics_Resume.pdf",
        role: "AI-Enabled Applied Analytics | Modeling, Automation & Decision Support",
        roleShort: "AI-Enabled Analytics, Modeling, Automation & Decision Support",
        location: "Orange City, Florida",
        availability: [
            "Open to remote, hybrid, and on-site opportunities",
            "Willing to relocate for the right opportunity",
        ],
        heroIntro: "I am an analytics professional with more than five years of experience across finance, supply chain, and inventory planning. I combine forecasting, statistical modeling, automation, and business context to turn practical questions into validated decision support.",
        heroSupport: "I decide what problem to solve, where a process can improve, and what judgment must remain human. I use AI and software for repetitive and computational heavy lifting, creating more time for root-cause analysis, business context, and the people affected by the decision.",
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
        "I identify where analysis or automation can help"
    );
    expect(aboutChapters[3].paragraphs[1]).toContain("final review human-led");
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

    expect(retail.summary).toContain("forecast uncertainty changes service and inventory exposure");
    expect(retail.metrics).toEqual([
        { label: "FOODS test WAPE*", value: "10.22%" },
        { label: "FOODS fill rate**", value: "94.30 → 99.07%" },
        { label: "Monte Carlo paths", value: "2,000" },
    ]);
    expect(retail.problem).toContain("point accuracy alone");
    expect(retail.findings).toContain("validation-calibrated p95 buffer");
    expect(retail.limitations.join(" ")).toContain("hypothetical analytical assumptions");
    expect(credit.summary).toContain("end-to-end educational credit-risk case study");
    expect(credit.solutionParagraphs[2]).toContain("without introducing a separate backend service");
    expect(credit.findings).toContain("0.669 ROC-AUC");
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
        { label: "Focus", value: "AI-Enabled Analytics · Statistical Modeling · Automation · Decision Support" },
    ]);
});

test("explains the AI-enabled analytical workflow without transferring analytical ownership", () => {
    expect(workflowPillars.map(({ title }) => title)).toEqual([
        "Analyze", "Validate", "Automate", "Communicate",
    ]);
    const story = workflowPillars.map(({ description }) => description).join(" ");
    expect(story).toContain("AI-assisted visuals");
    expect(profile.heroSupport).toContain("I decide what problem to solve");
    expect(profile.heroSupport).toContain("what judgment must remain human");
    expect(story).toContain("After the logic and controls are understood");
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
