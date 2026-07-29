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
            "Built a leakage-safe forecasting process for daily category-level POS demand across FOODS, HOBBIES, and HOUSEHOLD — then translated forecast error into retail-value exposure so accuracy could be discussed in operations and finance terms, not only as WAPE.",
        image: `${process.env.PUBLIC_URL}/images/retail-demand-forecasting-hero.png`,
        imageCaption:
            "Portfolio overview from the project data: headline metrics, category demand over time, and Friday–Sunday seasonality.",
        gallery: [
            {
                src: `${process.env.PUBLIC_URL}/images/retail-demand-sales-seasonality.png`,
                caption: "Category daily sales (7-day rolling) — purple glow marks Dec 25 demand dropping to near zero.",
            },
            {
                src: `${process.env.PUBLIC_URL}/images/retail-demand-actual-vs-forecast.png`,
                caption: "True demand vs best observed model on the untouched test year — shaded gaps show under- and over-forecast.",
            },
        ],
        tech: ["Python", "pandas", "statsmodels", "Prophet", "XGBoost", "scikit-learn"],
        github: "https://github.com/jclaudio019/retail-operations",
        metrics: [
            { label: "Best test WAPE", value: "7.05%" },
            { label: "Naive excess inventory*", value: "$3.01M" },
            { label: "Untouched test period", value: "365 days" },
        ],
        metricsNote:
            "*Retail-value exposure for FOODS under a Naive inventory-constrained scenario (sales-weighted sell_price). Not realized P&L, cash, or profit.",
        problem:
            "Retail teams need a reliable view of expected daily demand before they can plan staffing, inventory reviews, and other downstream operations. Using recent sales alone often misses recurring weekly patterns, changes in demand level, and known calendar disruptions such as Christmas closures. Without a defensible forecast, planners lack a clear demand signal — and finance stakeholders have little way to connect forecast quality to the cost of being short versus the cost of carrying too much product.",
        solutionParagraphs: [
            "The response is a leakage-safe, category-level demand forecast for daily POS unit sales in FOODS, HOBBIES, and HOUSEHOLD — a demand signal planners can trust before staffing, inventory reviews, and other downstream work begin.",
            "Category aggregation is intentional. At this level, weekly seasonality and holiday closures are still visible, noise is manageable, and the forecast stays interpretable enough for operations and finance to debate the same result. Working SKU-by-store would add allocation complexity before the demand signal itself was stable.",
            "The workflow starts with transparent baselines (Naive, Seasonal Naive, moving averages, ETS), then compares interpretable linear models with Prophet and XGBoost on a shared feature set. Configurations are selected on expanding-window validation and scored once on an untouched 365-day test year, so later accuracy claims are not the product of peeking at holdout data.",
            "Forecast error is also translated into operational language. Each category-day residual is valued at sales-weighted sell_price: under-forecasts read as potential missed demand if inventory were limited to the forecast; over-forecasts read as excess product that would remain after demand was met. Those dollar figures are retail-value exposure — directional decision support, not lost revenue, freed working capital, or profit. Unit cost, margin, and carrying cost are not in the dataset.",
            "The work stops at the demand signal and that finance-aware reading of error. Allocation, replenishment, safety stock, and order recommendations were left for later once the forecast — and its under-/over-forecast balance — are solid enough to act on.",
        ],
        dataset:
            "The M5 Forecasting dataset (Walmart daily unit sales) was aggregated to one daily observation per category (ds | cat_id | y). Chronological split: train 2011-01-29 to 2014-06-20, validation 2014-06-21 to 2015-06-20, and test 2015-06-21 to 2016-06-19. Validation used 13 calendar-aligned expanding windows. Christmas Day demand falls to zero or near zero and was retained as a known calendar effect. Unit residuals on the test period were valued using sales-weighted sell_price to support the exposure analysis.",
        methodologySummary:
            "Transparent baselines first, then feature-based statistical and machine-learning models on a shared feature set — configurations chosen on 13 expanding, calendar-aligned validation windows and scored once on an untouched 365-day test year, with no post-test tuning. Test residuals were then valued at sales-weighted sell_price to express error as retail exposure.",
        methodology: [
            "Prepared and validated the analytical data, then explored weekly seasonality, category behavior, and calendar effects — including the Friday–Sunday lift and Christmas closures.",
            "Established transparent baselines — Naive, Seasonal Naive, 7-day SMA, and ETS — so advanced models had to beat meaningful benchmarks rather than a weak straw man.",
            "Built Linear Regression with lag, rolling, trend, calendar, and Christmas features (full and reduced versions via permutation importance) to keep an interpretable option in the comparison.",
            "Tested Prophet with weekly/yearly seasonality and Christmas as a holiday, plus XGBoost on the shared feature set with small, pre-specified configurations — not an exhaustive hyperparameter search.",
            "Compared models across 13 expanding monthly validation windows with identical dates, horizons, and metrics (WAPE primary; MAE and RMSE also tracked).",
            "Froze validation-selected models per category, then evaluated every pre-specified model once on the untouched 365-day test year — with no post-test tuning.",
            "Translated test residuals into under-forecast and over-forecast unit counts and retail-value exposure, then ranked categories by volume, average selling price, and where deeper analysis would create the most decision value.",
        ],
        findings:
            "Every evaluated alternative improved on the Naive benchmark (FOODS 16.10%, HOBBIES 17.47%, HOUSEHOLD 19.88% test WAPE). Best observed test models: XGBoost Faster for FOODS at 10.22% (−5.88 pts vs Naive), XGBoost Shallow for HOBBIES at 8.00% (−9.47 pts), and Linear Regression (Full) for HOUSEHOLD at 7.05% (−12.83 pts). No single model won everywhere: ETS was nearly as accurate as XGBoost on FOODS (+0.47 WAPE), HOBBIES was effectively a near-tie among XGBoost, Prophet, and ETS, and HOUSEHOLD favored the interpretable linear model over more complex alternatives. Validation winners also shifted on the holdout for HOBBIES and HOUSEHOLD — reinforcing why test data must stay untouched.",
        financialInterpretation: {
            intro:
                "Forecast accuracy matters because it changes two operational exposures. For each category-day, a positive residual (actual − forecast) is an under-forecast: demand that could not be filled if inventory were limited to the forecast. A negative residual is an over-forecast: inventory that would remain after demand was met. The table below applies that inventory-constrained scenario to fixed test forecasts and values units at sales-weighted sell_price.",
            caveat:
                "These dollar figures are retail-value exposure, not realized lost sales, cash tied up, or profit. Margin, unit cost, carrying cost, and service-level policy are not in the dataset — so the numbers are directional decision support, not a P&L claim.",
            exposureRows: [
                { category: "FOODS", model: "Naive", underUnits: "415,148", missedValue: "$1.09M", overUnits: "1,150,579", excessValue: "$3.01M" },
                { category: "FOODS", model: "ETS", underUnits: "830,705", missedValue: "$2.18M", overUnits: "209,461", excessValue: "$0.54M" },
                { category: "FOODS", model: "XGBoost Faster", underUnits: "696,729", missedValue: "$1.82M", overUnits: "296,956", excessValue: "$0.78M" },
                { category: "HOBBIES", model: "Naive", underUnits: "25,534", missedValue: "$0.11M", overUnits: "225,804", excessValue: "$0.96M" },
                { category: "HOBBIES", model: "ETS", underUnits: "96,856", missedValue: "$0.41M", overUnits: "20,009", excessValue: "$0.07M" },
                { category: "HOBBIES", model: "XGBoost Shallow", underUnits: "90,863", missedValue: "$0.38M", overUnits: "24,192", excessValue: "$0.10M" },
                { category: "HOUSEHOLD", model: "Naive", underUnits: "114,353", missedValue: "$0.46M", overUnits: "595,585", excessValue: "$2.30M" },
                { category: "HOUSEHOLD", model: "ETS", underUnits: "241,795", missedValue: "$0.95M", overUnits: "59,615", excessValue: "$0.22M" },
                { category: "HOUSEHOLD", model: "Linear Regression (Full)", underUnits: "132,093", missedValue: "$0.52M", overUnits: "119,754", excessValue: "$0.46M" },
            ],
            takeaway:
                "Naive forecasts leave far more excess-inventory exposure in every category. Better models reduce that shelf burden, but they can shift the balance toward under-forecast exposure — which is exactly why finance and operations should look at both sides, not WAPE alone. For HOBBIES the ETS-to-XGBoost gap is small; for HOUSEHOLD, Linear Regression improves the under-/over-forecast balance relative to ETS.",
            priorityIntro:
                "Average selling price helps put error into business context (it is not a margin measure). Categories differ in volume, retail value, and where deeper work is worth the effort:",
            priorityRows: [
                {
                    category: "FOODS",
                    units: "9.73M",
                    retailValue: "$25.49M",
                    avgPrice: "$2.62",
                    focus: "Highest volume and retail-value exposure. ETS is a credible simpler baseline; optimize weekday buffers before adding complexity.",
                },
                {
                    category: "HOBBIES",
                    units: "1.44M",
                    retailValue: "$6.15M",
                    avgPrice: "$4.27",
                    focus: "Highest average selling price, but ETS≈XGBoost. Dig deeper only if margin, stockout cost, or promotions make the small accuracy gain meaningful.",
                },
                {
                    category: "HOUSEHOLD",
                    units: "3.57M",
                    retailValue: "$14.05M",
                    avgPrice: "$3.94",
                    focus: "Strongest candidate for deeper analysis — better observed balance than ETS, worth weekday/event/high-value item review.",
                },
            ],
        },
        implications:
            "The retail–finance merge is the point: a forecast is only useful if someone can act on the cost of being wrong. Lower aggregate error is not the whole decision. Under-forecasts and over-forecasts create different exposures — missed demand versus excess product on the shelf. In production, model choice should move toward minimizing expected economic cost (stockout cost vs carrying / markdown cost), with category-specific buffers when running short is more expensive than carrying extra inventory.",
        conclusionParagraphs: [
            "Historical POS demand can forecast future category demand well enough to beat simple recent-sales thinking — but the right model depends on the category, and accuracy alone is not enough to choose it.",
            "What remains is a complete, reproducible path: explore demand patterns, set honest baselines, test interpretable and more flexible models, validate without leakage, evaluate on an untouched year, and translate residuals into retail-value exposure so operations and finance can discuss the same result.",
            "In practice that means category-specific choices: prefer simpler models when accuracy is nearly tied (HOBBIES), use XGBoost for FOODS only when the marginal gain justifies maintenance, and treat HOUSEHOLD as the priority for deeper weekday, event, and high-value item analysis. Holidays stay explicit. The holdout stays untouched. And when time allows, point forecasts give way to buffers and prediction intervals guided by the relative cost of stockouts versus excess inventory.",
        ],
        nextSteps: [
            "Measure forecast error by weekday and business-critical demand periods, then set category-specific safety buffers from stockout cost versus carrying cost.",
            "Where the data supports it, add prediction intervals or forecast quantiles so buffers are probabilistic rather than ad hoc point-forecast padding.",
            "Drill into high-value item groups within HOUSEHOLD (and price-sensitive pockets of HOBBIES) where average selling price makes residual error more expensive.",
            "If unit cost, margin, and holding-cost inputs become available, replace retail-value exposure with a true expected economic-cost objective for model selection.",
            "Extend beyond category-level demand into allocation / replenishment only after the demand signal and its uncertainty are stable enough to trust.",
        ],
        limitations: [
            "Forecasts are at the daily category level, not SKU-store level.",
            "Price, promotions, substitutions, stockouts, and inventory availability were not modeled as predictive inputs.",
            "Dollar exposure uses sell_price retail value — not unit cost, margin, carrying cost, or realized P&L.",
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
