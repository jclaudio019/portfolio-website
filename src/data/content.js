// =====================================================================
// SINGLE SOURCE OF TRUTH — edit everything about the site here.
// =====================================================================

export const profile = {
    name: "Jose Claudio",
    role: "Analytics Professional | Finance, Supply Chain & Applied Statistics",
    roleShort: "Analytics, Modeling, Forecasting & Decision Support",
    location: "Orange City, Florida",
    availability: [
        "Open to remote opportunities",
        "Open to on-site opportunities",
        "Open to hybrid opportunities",
        "Open to in-person opportunities",
    ],
    email: "jose.claudio19@gmail.com",
    github: "https://github.com/jclaudio019",
    linkedin: "https://www.linkedin.com/in/jclaudio019",
    resumeAvailableOnRequest: true,
    // TODO: add Jose_Claudio_Analytics_Resume.pdf to public/ when ready
    resumeUrl: null,
    education: "M.S. Applied Statistics — Purdue University (Expected May 2027)",
    heroIntro:
        "I combine experience in finance, supply chain, and operations with Python, statistical modeling, forecasting, and automation to solve practical business problems.",
    heroSupport:
        "Currently pursuing an M.S. in Applied Statistics, I am continuing to build projects that connect analytical methods with real business decisions.",
};

export const marqueeItems = [
    "Forecasting",
    "Supply Chain",
    "Python",
    "SQL",
    "Excel",
    "VBA",
    "Power Query",
    "Power BI",
    "Tableau",
    "Statistical Modeling",
    "Reporting Automation",
    "Inventory Analysis",
];

export const aboutChapters = [
    {
        n: "01",
        title: "How It Started",
        paragraphs: [
            "Hi, I'm Jose. I'm originally from Puerto Rico and currently based in Orange City, Florida. My path into analytics began while I was completing my bachelor's degree in finance.",
            "I had always been interested in technology, but during my senior year, I took courses in computer science and data analysis for finance that introduced me to Python. Once I began using it, I was amazed by the possibilities. Programming gave me a way to explore data, test ideas, automate repetitive work, and turn questions into practical solutions.",
        ],
    },
    {
        n: "02",
        title: "Early Projects",
        paragraphs: [
            "Some of my earliest projects involved using linear and logistic regression to explore relationships in real-world data, including temperature data from NASA. Because I had also been interested in trading and financial markets, I began learning how Python could be used to test investment ideas. Using concepts from Yves Hilpisch's Python for Finance, I created a simple vectorized backtester combining moving averages, the Relative Strength Index, and the stochastic oscillator.",
            "That project was simple compared with the work I do today, but it changed how I thought about analytics. I realized that programming was not only about writing code. It was a way to study a problem, define assumptions, test possible solutions, and learn from the results.",
        ],
    },
    {
        n: "03",
        title: "Professional Application",
        paragraphs: [
            "After graduating, I gained experience across finance, accounting, supply chain, and operations. Although I enjoyed working in finance, supply chain gave me more opportunities to work directly with forecasting, automation, inventory decisions, and large operational datasets.",
            "In my current work, I use tools such as Python, Excel, VBA, and Power Query to automate reporting, validate data, analyze performance, and support forecasting and inventory allocation decisions. I have contributed to allocation models used across the organization, developed automated reporting processes, and led a validation initiative involving more than $1 million in inventory that improved data accuracy by 15%.",
        ],
    },
    {
        n: "04",
        title: "Why Applied Statistics",
        paragraphs: [
            "As my interest in data continued to grow, I completed graduate-level coursework in financial mathematics. Studying topics such as stochastic processes and financial modeling helped me recognize that I wanted a stronger foundation in statistics—not only to use analytical methods, but also to understand why they work, when they are appropriate, and how their assumptions affect the results.",
            "I am now pursuing a master's degree in applied statistics at Purdue University. My coursework includes linear regression, probability, and statistical inference, which are helping me build a stronger foundation for approaching analytical problems, selecting appropriate models, evaluating results, and communicating what those results mean.",
        ],
    },
    {
        n: "05",
        title: "What Motivates Me",
        paragraphs: [
            "What continues to motivate me is the opportunity to understand how a process works, identify where it can be improved, and build a practical solution. Sometimes that means automating a report. Other times, it means developing a forecasting model, investigating an unexpected pattern, or translating complex data into information that people can use to make better decisions.",
        ],
    },
    {
        n: "06",
        title: "This Portfolio",
        paragraphs: [
            "This portfolio represents that journey. It brings together my background in finance and operations with my growing knowledge of statistics, programming, forecasting, and data science. Each project is designed around a practical question and documents not only the final result, but also the reasoning, challenges, limitations, and lessons behind it.",
        ],
    },
];

export const educationEntries = [
    {
        school: "Purdue University",
        location: "West Lafayette, Indiana",
        degree: "M.S. in Applied Statistics",
        date: "Expected May 2027",
        coursework: ["Linear Regression", "Probability", "Statistical Inference"],
    },
    {
        school: "Bryant University",
        degree: "B.S.B.A. in Business Administration",
        details: "Concentration in Finance · Minor in Chemistry",
        date: "Graduated May 2020",
    },
];

export const projects = [
    {
        slug: "retail-demand-forecasting",
        title: "Retail Demand Forecasting",
        category: "Forecasting",
        summary:
            "Built a leakage-safe forecasting process for daily category-level POS demand across FOODS, HOBBIES, and HOUSEHOLD — comparing baselines, statistical models, and machine learning on expanding-window validation and an untouched 365-day test year.",
        image: `${process.env.PUBLIC_URL}/images/retail-demand-forecasting-hero.svg`,
        imageCaption:
            "Project results graphic: Naive vs best-model test WAPE by category, plus the end-to-end workflow from data prep through untouched holdout evaluation.",
        tech: ["Python", "pandas", "statsmodels", "Prophet", "XGBoost", "scikit-learn"],
        github: "https://github.com/jclaudio019/retail-operations",
        metrics: [
            { label: "Best test WAPE", value: "7.05%" },
            { label: "Categories forecast", value: "3" },
            { label: "Untouched test period", value: "365 days" },
        ],
        problem:
            "Retail teams need a reliable view of expected daily demand before they can plan staffing, inventory reviews, and other downstream operations. Using recent sales alone often misses recurring weekly patterns, changes in demand level, and known calendar disruptions such as Christmas closures. Without a defensible forecast, planners lack a clear demand signal to support those decisions.",
        solution:
            "This project delivers a category-level demand forecasting process for daily point-of-sale unit sales in FOODS, HOBBIES, and HOUSEHOLD. Historical sales are evaluated with expanding-window validation, then pre-specified models are compared once on an untouched 365-day test period. The output is a transparent, leakage-safe forecast signal a downstream planning process could use — without claiming allocation, replenishment, or safety-stock decisions that were intentionally out of scope.",
        dataset:
            "The M5 Forecasting dataset (Walmart daily unit sales) was aggregated to one daily observation per category (ds | cat_id | y). Chronological split: train 2011-01-29 to 2014-06-20, validation 2014-06-21 to 2015-06-20, and test 2015-06-21 to 2016-06-19. Validation used 13 calendar-aligned expanding windows. Christmas Day demand falls to zero or near zero and was retained as a known calendar effect.",
        methodology: [
            "Prepared and validated the analytical data, then explored weekly seasonality, category behavior, and calendar effects.",
            "Established transparent baselines — Naive, Seasonal Naive, 7-day SMA, and ETS — so advanced models had to beat meaningful benchmarks.",
            "Built Linear Regression with lag, rolling, trend, calendar, and Christmas features (full and reduced versions via permutation importance).",
            "Tested Prophet with weekly/yearly seasonality and Christmas as a holiday, plus XGBoost on the shared feature set with small, pre-specified configurations.",
            "Compared models across 13 expanding monthly validation windows with identical dates, horizons, and metrics (WAPE primary; MAE and RMSE also tracked).",
            "Froze validation-selected models per category, then evaluated every pre-specified model once on the untouched 365-day test year — with no post-test tuning.",
        ],
        findings:
            "Every evaluated alternative improved on the Naive benchmark (FOODS 16.10%, HOBBIES 17.47%, HOUSEHOLD 19.88% test WAPE). Best observed test models: XGBoost Faster for FOODS at 10.22% (−5.88 pts vs Naive), XGBoost Shallow for HOBBIES at 8.00% (−9.47 pts), and Linear Regression (Full) for HOUSEHOLD at 7.05% (−12.83 pts). No single model won everywhere: ETS was nearly as accurate as XGBoost on FOODS (+0.47 WAPE), HOBBIES was effectively a near-tie among XGBoost, Prophet, and ETS, and HOUSEHOLD favored the interpretable linear model over more complex alternatives. Validation winners also shifted on the holdout for HOBBIES and HOUSEHOLD — an important finding that reinforces keeping test data untouched rather than retuning after the fact.",
        implications:
            "The business takeaway is category-specific forecasting: model complexity should be justified by category-level value, not assumed to be better. FOODS may justify XGBoost when the marginal gain matters; otherwise ETS is a credible simpler option. HOBBIES does not clearly justify a much more complex workflow. HOUSEHOLD is the strongest case for the interpretable Linear Regression result. Operationally, lower aggregate error is not the whole decision — under-forecasts and over-forecasts create different inventory exposures, so the next practical step is weekday- and event-aware buffers guided by the cost of a stockout relative to the cost of carrying inventory.",
        conclusion:
            "Historical POS demand can forecast future category demand accurately enough to beat simple recent-sales thinking, but the right model depends on the category. This project shows a complete, reproducible path from data preparation through baseline comparison, feature-based modeling, leakage-safe validation, and a fixed holdout evaluation — ending with a clear recommendation: choose models by category, prefer simpler approaches when accuracy is nearly tied, treat holidays explicitly, and keep an untouched test period before deploying a forecast.",
        limitations: [
            "Forecasts are at the daily category level, not SKU-store level.",
            "Price, promotions, substitutions, stockouts, and inventory availability were not modeled as predictive inputs.",
            "Recursive multi-day forecasts can accumulate error through lag and rolling features.",
            "The test period is one historical year; demand changes should be monitored on future data.",
            "Allocation, replenishment, safety stock, and order recommendations were intentionally out of scope.",
        ],
    },
    // TODO: Add additional verified project case studies when ready.
];

export const experience = [
    {
        theme: "Supply Chain & Inventory Analysis",
        icon: "boxes",
        blurb:
            "Experience supporting forecasting, inventory allocation, and operational data validation in supply chain and operations contexts.",
        points: [
            "Contributed to allocation models used across the organization.",
            "Led a validation initiative involving more than $1 million in inventory that improved data accuracy by 15%.",
            "Supported forecasting and inventory allocation decisions using Python, Excel, VBA, and Power Query.",
        ],
    },
    {
        theme: "Reporting & Process Automation",
        icon: "workflow",
        blurb:
            "Automated recurring reporting and validation workflows to reduce manual work and improve data reliability.",
        points: [
            "Developed automated reporting processes using Python, Excel, VBA, and Power Query.",
            "Built validation checks and KPI reporting to support cross-functional decision-making.",
            "Used Power BI and Tableau to communicate performance and operational trends.",
        ],
    },
    {
        theme: "Finance, Forecasting & Decision Support",
        icon: "trending-up",
        blurb:
            "Applied analytics across finance, accounting, supply chain, and operations to connect data to practical decisions.",
        points: [
            "Supported forecasting workflows and performance analysis in operational and financial contexts.",
            "Analyzed large operational datasets to inform inventory, allocation, and reporting decisions.",
            "Translated analytical results into information stakeholders could use for planning and review.",
        ],
    },
];

export const skillGroups = [
    {
        title: "Analytics & Operations",
        items: [
            "Forecasting",
            "Inventory Analysis",
            "KPI Reporting",
            "Data Validation",
            "Decision Support",
        ],
    },
    {
        title: "Programming & Data",
        items: ["Python", "SQL", "Excel", "VBA", "Power Query", "pandas"],
    },
    {
        title: "Visualization",
        items: ["Power BI", "Tableau", "Excel (advanced)", "Dashboard Design"],
    },
    {
        title: "Business Domains",
        items: ["Supply Chain", "Finance", "Accounting", "Operations"],
    },
    {
        title: "Statistical Methods",
        items: [
            "Linear Regression",
            "Logistic Regression",
            "Probability",
            "Statistical Inference",
            "Time-Series (coursework/projects)",
        ],
    },
];

export const resumeHighlights = [
    { label: "Location", value: "Orange City, Florida" },
    { label: "Education", value: "M.S. Applied Statistics, Purdue University (Expected May 2027)" },
    { label: "Toolset", value: "Python · SQL · Excel · VBA · Power Query · Power BI · Tableau" },
    { label: "Focus", value: "Finance · Supply Chain · Forecasting · Applied Statistics" },
];
