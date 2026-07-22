// =====================================================================
// SINGLE SOURCE OF TRUTH — edit everything about the site here.
// Replace placeholder links (GitHub, LinkedIn, email, resume) with real
// values. Add or edit projects, experience, and skills freely.
// =====================================================================

export const profile = {
    name: "Jose Claudio",
    role: "Business Analytics & Data Science",
    location: "West Lafayette, IN",
    email: "jose.claudio@example.com", // TODO: replace with real email
    github: "https://github.com/jos.claudio", // TODO: replace
    linkedin: "https://www.linkedin.com/in/jose-claudio", // TODO: replace
    resumeUrl: "/jose-claudio-resume.pdf", // file lives in /frontend/public
    education: "M.S. Applied Statistics — Purdue University",
    tagline: "Turning Business Problems into Data-Driven Solutions",
    heroSupport:
        "Business analytics professional with a foundation in finance, supply chain, forecasting, and decision support — now applying advanced statistics and data science to solve problems that move real business metrics.",
};

export const marqueeItems = [
    "Forecasting",
    "Supply Chain",
    "Credit Risk",
    "Python",
    "SQL",
    "Power BI",
    "Time-Series",
    "Statistical Modeling",
    "Reporting Automation",
    "Inventory Analysis",
];

export const aboutChapters = [
    {
        n: "01",
        title: "A finance and supply-chain foundation",
        body: "I started where the numbers meet operations — building forecasts, reconciling inventory, and translating messy business data into decisions. That grounding taught me that a model only matters if it changes what someone does on Monday morning.",
    },
    {
        n: "02",
        title: "Deepening the statistics",
        body: "Completing an M.S. in Applied Statistics at Purdue pushed me from descriptive reporting into rigorous inference, probabilistic modeling, and forecasting. I care about assumptions, uncertainty, and validation — not just an accuracy number on a slide.",
    },
    {
        n: "03",
        title: "Curiosity as a method",
        body: "I treat every dataset as a question waiting to be framed. I like the unglamorous work: cleaning, validating, stress-testing, and asking whether the result actually holds. Good analysis is stubborn honesty applied to data.",
    },
    {
        n: "04",
        title: "Connecting analysis to decisions",
        body: "My goal is always the bridge — from a statistical result to a business implication a stakeholder can act on. Data science, to me, is a communication discipline as much as a technical one.",
    },
];

export const projects = [
    {
        slug: "retail-demand-forecasting",
        title: "Retail Demand Forecasting",
        category: "Forecasting",
        summary:
            "Forecasted daily retail POS demand across three product categories, comparing baseline, statistical, and machine-learning models with leakage-safe expanding-window validation and an untouched 365-day test year.",
        image:
            "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDB8fHx8MTc4NDIxMjA2OHww&ixlib=rb-4.1.0&q=85",
        tech: ["Python", "pandas", "statsmodels", "Prophet", "XGBoost", "scikit-learn"],
        github: "https://github.com/jclaudio019/retail-operations",
        metrics: [
            { label: "Best test WAPE", value: "7.05%" },
            { label: "Categories forecast", value: "3" },
            { label: "Untouched test period", value: "365 days" },
        ],
        problem:
            "Retail teams need a dependable view of expected daily demand before they can plan labor, replenishment inputs, or inventory reviews. Recent averages alone miss recurring weekly patterns, longer-term demand shifts, and calendar disruptions like Christmas closures. This project builds the forecasting layer: estimating future daily category-level demand from historical POS sales, producing a defensible demand signal a downstream planning process could use.",
        dataset:
            "The M5 retail dataset (Walmart daily unit sales), aggregated to daily category-level POS demand for FOODS, HOBBIES, and HOUSEHOLD. Training spanned 2011–2014, with a 365-day validation year split into 13 expanding monthly windows and a final untouched 365-day test year (2015–2016).",
        methodology: [
            "Established transparent benchmarks — Naive, Seasonal Naive, 7-day SMA, and ETS — so advanced models had to beat meaningful baselines.",
            "Engineered leakage-safe lag, rolling, trend, calendar, and Christmas features; multi-day forecasts were recursive since future actuals are unknown.",
            "Compared Linear Regression, Prophet, and XGBoost against baselines across 13 expanding monthly validation windows with identical dates, horizons, and metrics (MAE, RMSE, WAPE).",
            "Froze validation-selected models per category, then evaluated them once on the untouched 365-day test year.",
        ],
        findings:
            "Every advanced model beat the Naive benchmark on the test year, but no single model won everywhere: XGBoost was strongest for FOODS (10.22% WAPE vs 16.10% Naive), while interpretable Linear Regression won HOUSEHOLD (7.05% vs 19.88%) and ETS/Prophet were nearly tied with XGBoost on HOBBIES. Added model complexity earned its place only category by category.",
        implications:
            "The results support category-specific forecasting rather than one model for all demand patterns. When a simpler model is nearly as accurate, it is often preferable — easier to explain, maintain, and monitor. Holiday disruptions should be represented explicitly, and validation rankings shifting on unseen data shows why an untouched test period matters before deploying a forecast.",
    },
    {
        slug: "inventory-allocation-replenishment",
        title: "Inventory Allocation & Replenishment",
        category: "Supply Chain",
        summary:
            "A service-level-driven replenishment policy that rebalanced inventory across a distribution network under budget constraints.",
        image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738",
        tech: ["Python", "PuLP", "NumPy", "SQL", "Power BI"],
        github: "https://github.com/jos.claudio/inventory-allocation",
        metrics: [
            { label: "Fill rate", value: "+6.4 pts" },
            { label: "Working capital", value: "-11%" },
            { label: "Nodes", value: "8 DCs" },
        ],
        problem:
            "Inventory was allocated by static min/max rules that ignored demand variability and lead-time risk, leaving some nodes starved while others sat on excess.",
        dataset:
            "SKU-location demand history, supplier lead times, holding and shortage costs, and current on-hand / in-transit positions across eight distribution centers.",
        methodology: [
            "Estimated demand-during-lead-time distributions per SKU-location to size dynamic safety stock at target service levels.",
            "Formulated allocation as a constrained optimization (linear program) balancing fill-rate targets against a working-capital budget.",
            "Simulated policies against held-out demand to compare fill rate, backorders, and capital tied up.",
            "Packaged outputs into a replenishment recommendation feed for planners.",
        ],
        findings:
            "The optimized policy lifted network fill rate by 6.4 points while reducing working capital ~11%, primarily by shifting buffer stock toward high-variability, high-margin SKUs.",
        implications:
            "Replenishment became risk-aware rather than rule-of-thumb. Planners could trade service level against capital explicitly, with a dashboard showing the frontier of achievable outcomes.",
    },
    {
        slug: "credit-risk-pd-model",
        title: "Credit-Risk Probability of Default Model",
        category: "Risk / Statistics",
        summary:
            "An interpretable probability-of-default model with calibrated scores and a transparent scorecard for lending decisions.",
        image:
            "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDB8fHx8MTc4NDIxMjA2OHww&ixlib=rb-4.1.0&q=85",
        tech: ["Python", "scikit-learn", "statsmodels", "SQL"],
        github: "https://github.com/jos.claudio/credit-risk-pd",
        metrics: [
            { label: "AUC", value: "0.82" },
            { label: "KS statistic", value: "0.47" },
            { label: "Calibration", value: "Brier 0.09" },
        ],
        problem:
            "A lending portfolio needed a defensible, explainable way to rank applicants by default risk and to set consistent approval cutoffs.",
        dataset:
            "Anonymized applicant and loan-performance data with demographic, bureau, and behavioral features, labeled with 12-month default outcomes.",
        methodology: [
            "Performed weight-of-evidence binning and information-value screening for interpretable, monotonic features.",
            "Fit a regularized logistic regression scorecard and benchmarked against gradient boosting for lift.",
            "Calibrated predicted probabilities (Platt / isotonic) and validated with AUC, KS, and reliability curves.",
            "Set risk-based cutoffs aligned to target approval and expected-loss constraints.",
        ],
        findings:
            "The scorecard reached AUC ≈ 0.82 with well-calibrated probabilities, delivering most of the boosting model's discrimination while remaining fully explainable to risk and compliance.",
        implications:
            "The business gained a transparent, auditable decisioning tool. Cutoffs could be tuned to portfolio appetite, and every decision could be explained by its contributing factors.",
    },
    {
        slug: "financial-time-series-forecasting",
        title: "Financial Time-Series Forecasting",
        category: "Finance",
        summary:
            "Forecasting revenue and cash-flow series with volatility-aware models and honest uncertainty bands for planning.",
        image: "https://images.pexels.com/photos/7876507/pexels-photo-7876507.jpeg",
        tech: ["Python", "statsmodels", "Prophet", "arch", "pandas"],
        github: "https://github.com/jos.claudio/financial-time-series",
        metrics: [
            { label: "sMAPE", value: "8.1%" },
            { label: "Coverage @95%", value: "94%" },
            { label: "Series", value: "40+" },
        ],
        problem:
            "Finance planning relied on straight-line growth assumptions that ignored seasonality and volatility, producing brittle budgets and poor scenario planning.",
        dataset:
            "Monthly financial time series (revenue, expenses, cash flow) across business units, with macro indicators as exogenous drivers.",
        methodology: [
            "Decomposed series into trend/seasonality; tested stationarity and differencing choices.",
            "Compared SARIMAX, Prophet, and exponential smoothing; modeled volatility clustering with a GARCH layer where relevant.",
            "Produced probabilistic forecasts with prediction intervals and validated interval coverage, not just point error.",
            "Built scenario overlays so finance could stress base/upside/downside cases.",
        ],
        findings:
            "Models achieved ~8.1% sMAPE with 95% prediction intervals that held ~94% empirical coverage — giving planners realistic ranges instead of single-point guesses.",
        implications:
            "Budgeting shifted from deterministic lines to probabilistic ranges. Leadership could plan against downside scenarios and quantify the risk in their targets.",
    },
];

export const experience = [
    {
        theme: "Forecasting & Decision Support",
        icon: "trending-up",
        blurb:
            "Owned demand and financial forecasting workflows that fed planning and budgeting decisions.",
        points: [
            "Designed forecasting processes combining statistical baselines with machine-learning models, improving accuracy on seasonal and promotional demand.",
            "Translated forecasts into safety-stock, budget, and scenario recommendations stakeholders could act on directly.",
            "Established validation discipline (backtesting, interval coverage) so forecasts carried honest uncertainty.",
        ],
    },
    {
        theme: "Reporting Automation",
        icon: "workflow",
        blurb:
            "Replaced manual, error-prone reporting with automated, reproducible pipelines.",
        points: [
            "Automated recurring Excel and Power BI reporting with Python and SQL, cutting hours of manual work each cycle.",
            "Built reusable data pipelines and validation checks to keep dashboards trustworthy and current.",
            "Standardized KPI definitions across teams to end conflicting numbers in the room.",
        ],
    },
    {
        theme: "Inventory & Financial Analysis",
        icon: "boxes",
        blurb:
            "Connected inventory positions and financial outcomes to surface where capital and service were leaking.",
        points: [
            "Analyzed inventory health, turns, and service levels to identify overstock and stockout drivers.",
            "Modeled the trade-off between working capital and fill rate to guide replenishment policy.",
            "Partnered with finance to tie operational metrics to margin and cash-flow impact.",
        ],
    },
];

export const skillGroups = [
    {
        title: "Analytics",
        items: ["Forecasting", "Demand Planning", "A/B & Experiment Design", "KPI Design", "Cohort Analysis"],
    },
    {
        title: "Programming",
        items: ["Python", "SQL", "pandas / NumPy", "scikit-learn", "Automation Scripting"],
    },
    {
        title: "Visualization",
        items: ["Power BI", "Excel (advanced)", "Matplotlib / Seaborn", "Dashboard Design", "Storytelling"],
    },
    {
        title: "Business Knowledge",
        items: ["Supply Chain", "Finance", "Inventory Management", "Decision Support", "Stakeholder Communication"],
    },
    {
        title: "Statistical Methods",
        items: ["Regression", "Time-Series (ARIMA/GARCH)", "Probability Modeling", "Hypothesis Testing", "Model Calibration"],
    },
];

export const resumeHighlights = [
    { label: "Education", value: "M.S. Applied Statistics, Purdue University" },
    { label: "Focus", value: "Forecasting · Statistical Modeling · Decision Support" },
    { label: "Toolset", value: "Python · SQL · Power BI · Excel" },
    { label: "Domains", value: "Supply Chain · Finance · Retail · Credit Risk" },
];
