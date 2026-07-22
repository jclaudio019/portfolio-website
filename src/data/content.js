// =====================================================================
// SINGLE SOURCE OF TRUTH — edit everything about the site here.
// =====================================================================

export const profile = {
    name: "Jose Claudio",
    role: "Analytics Professional | Finance, Supply Chain & Applied Statistics",
    roleShort: "Finance, Supply Chain & Data Analytics",
    location: "Orange City, Florida",
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
    {
        school: "Additional graduate study",
        degree: "Financial Mathematics Coursework",
        note: "Coursework — not a completed degree",
        topics: [
            "Financial modeling",
            "Options modeling",
            "Brownian motion and stochastic processes",
            "Quantitative risk concepts",
        ],
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
    // TODO: Add additional verified project case studies when ready.
    // Placeholder projects removed: inventory-allocation-replenishment,
    // credit-risk-pd-model, financial-time-series-forecasting
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
