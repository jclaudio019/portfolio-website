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
        image: `${process.env.PUBLIC_URL}/images/retail-demand-forecasting-hero-v2.png`,
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
    {
        slug: "credit-risk-pd-model",
        title: "Credit Risk Probability of Default",
        category: "Credit Risk Modeling",
        summary:
            "Credit decisions require more than predicting who may default: lenders need a consistent way to rank relative risk, examine tradeoffs, and challenge model output. This case study builds that transparent foundation from historical Lending Club outcomes.",
        image: `${process.env.PUBLIC_URL}/images/credit-risk-pd-model-hero-v2.png`,
        imageCaption:
            "Held-out ranking evidence and the score-to-risk relationship from the historical Lending Club analysis.",
        tech: ["Python", "pandas", "NumPy", "statsmodels", "scikit-learn", "Jupyter"],
        github: "https://github.com/jclaudio019/credit_risk",
        metrics: [
            { label: "Historical records", value: "466,285" },
            { label: "Held-out AUC", value: "0.699" },
            { label: "Illustrative score", value: "300-850" },
        ],
        metricsNote:
            "Historical educational analysis only. The score is illustrative and is not a lending decision or a calibrated production PD.",
        problem:
            "Treating every applicant alike obscures meaningful differences in repayment risk, but treating a model probability as an automatic approval rule creates a different problem. A lender needs to order accounts by relative risk while keeping the model, the operating threshold, and the final credit policy separate. The decision challenge is therefore twofold: identify risk signal in borrower and loan characteristics, then determine whether that signal is strong and interpretable enough to support threshold and portfolio discussions.",
        solutionParagraphs: [
            "The analytical response is an interpretable historical risk-ranking framework. Cleaning rules, grouped predictors, and bin definitions are learned from training data and applied unchanged to held-out accounts, preserving a credible test of whether the ranking generalizes.",
            "Weight of Evidence is used to understand risk ordering and identify categories or intervals with similar behavior. Information Value remains a descriptive diagnostic rather than an automatic feature-selection rule. The final logistic regression uses one-hot grouped categories, not numeric WoE values, so feature direction, reference groups, and contribution remain explainable.",
            "The model estimates P(good), with PD calculated explicitly as 1 - P(good). Held-out AUC, Gini, and KS assess ranking across thresholds. Fitted log-odds are then translated to an illustrative 300-850 score so relative historical risk can be discussed without presenting the score as an approval or pricing rule.",
        ],
        dataset:
            "The analysis reviewed 466,285 historical Lending Club loan records. A stratified 80/20 split produced 373,028 training rows and 93,257 held-out rows. The historical good_bad target labels specified charge-off, default, and late-status outcomes as bad (0), with the remaining observed statuses labelled good standing (1).",
        methodologySummary:
            "Leakage controls keep held-out ranking evidence credible; training-derived groups, interpretable one-hot logistic regression, and explicit P(good)-to-PD translation make the result challengeable. AUC, Gini, KS, and the illustrative score communicate relative historical risk without turning model output into policy.",
        methodology: [
            "Prepared historical loan data, defined the good_bad proxy, and created a stratified 80/20 train/test split so model development and evaluation remained separate.",
            "Learned cleaning rules, imputation statistics, category definitions, and numeric intervals from training rows, then applied them unchanged to held-out rows to prevent leakage.",
            "Used Weight of Evidence to inspect risk ordering and similarity across categories and intervals, creating groups that stakeholders can challenge and interpret.",
            "Used Information Value as a descriptive separation diagnostic, not an automatic feature-selection cutoff, so grouping and coarse classing remained grounded in observed risk ordering and similarity.",
            "Fit logistic regression with one-hot encoded grouped categories rather than numeric WoE values, retaining explicit reference categories and feature direction for interpretation.",
            "Evaluated held-out ranking with ROC/AUC, Gini, and KS across thresholds, then showed how the displayed 0.5 P(good) threshold turns ranking into one classification rule.",
            "Translated fitted log-odds into an illustrative 300-850 scorecard so relative historical risk could be discussed on a familiar scale without implying a decision rule.",
        ],
        findings:
            "The model achieved limited-to-moderate held-out discrimination: AUC 0.699482, Gini 0.398964, and KS 0.291652. That evidence supports relative ordering, not a claim that good and bad outcomes are cleanly separated. At the displayed 0.5 P(good) threshold, only 10 of 10,194 held-out bad loans were detected. The central business lesson is that discrimination and decision policy are different problems: a model can provide useful ranking across thresholds while a default cutoff produces an unacceptable operating result.",
        implications:
            "The analysis provides a common language for relative-risk segmentation, portfolio review, and threshold or cutoff analysis, not approval, pricing, or treatment rules. An operating policy would need to weigh the asymmetric costs of missed defaults and rejected good borrowers, then add calibration, monitoring, governance, and stakeholder challenge. The displayed score remains an educational historical-risk discussion tool, not a lending decision or calibrated production PD.",
        conclusionParagraphs: [
            "Historical borrower and loan characteristics contain enough signal to support relative risk ranking, but discrimination alone cannot determine a lending policy. The case demonstrates a transparent path from historical outcomes to grouped risk factors, held-out ranking evidence, and an interpretable score.",
            "The unresolved decision is economic and operational: which threshold creates an acceptable balance between missed credit losses and rejected good business? Keeping P(good), PD = 1 - P(good), threshold behavior, and the illustrative 300-850 score distinct makes the historical evidence easier to challenge without overstating its operational use.",
        ],
        limitations: [
            "The historical good_bad proxy has no fixed performance-horizon default definition.",
            "A random holdout does not establish temporal stability, population stability, or performance through changing economic conditions.",
            "The probabilities and illustrative 300-850 score are not calibrated for production use.",
            "The displayed 0.5 P(good) threshold has extremely weak bad-loan recall and is not a business policy.",
            "Fairness, monitoring, regulatory suitability, and model governance have not been assessed.",
            "Advanced models may improve discrimination, but complexity must be justified against interpretability, stability, calibration, validation, auditability, implementation cost, and stakeholder explainability.",
            "IFRS 9 is an accounting standard and financial-reporting framework; this analysis does not comply with IFRS 9 and has no 12-month/lifetime ECL framework, SICR staging, origination-to-reporting-date comparison, forward-looking probability-weighted macroeconomic scenarios, calibrated term structure, LGD, EAD, or effective-interest-rate discounting.",
            "Historical Lending Club accounts may not represent a current institution, portfolio, policy, or economic environment.",
        ],
    },
    {
        slug: "retail-allocation-simulator",
        title: "Retail Allocation Simulator",
        category: "Retail Operations",
        summary:
            "Automates a weekly store-item allocation process so limited distribution-center inventory follows consistent business rules, protects the strongest sales opportunities, and remains auditable in Excel.",
        image: `${process.env.PUBLIC_URL}/images/retail-allocation-simulator-hero.png`,
        imageCaption:
            "A distribution-center-to-store flow represents the allocation decision itself—not a forecast or an optimization claim.",
        tech: ["Python", "pandas", "Excel", "XlsxWriter", "pytest"],
        github: "https://github.com/jclaudio019/retail-allocation-simulator",
        metrics: [
            { label: "Store-item rows", value: "325K" },
            { label: "Fictional stores", value: "1,800" },
            { label: "Audit tabs", value: "13" },
        ],
        metricsNote:
            "The included large example is independently generated fictional data; it does not reproduce employer records, identifiers, or proprietary materials.",
        problem:
            "When available inventory cannot satisfy every suggested store order, a retailer needs a repeatable way to decide which locations receive product. Manual reductions or additions can become inconsistent, difficult to review, and disconnected from store need, recent sales, shipment minimums, and inventory constraints.",
        solutionParagraphs: [
            "The simulator evaluates one weekly allocation snapshot and classifies each item as balanced, short, or available for an increase. It then applies explicit rank, inventory, sales, capacity, line-limit, shipment, and optional dollar-target rules to produce a final recommendation.",
            "The result is delivered as an Excel workbook with a final allocation, availability validation, approval flags, and supporting audit tabs. Reviewers can trace why units were added, reduced, retained, or excluded without relying on a black-box score.",
            "The project intentionally stops at allocation. It does not forecast demand, determine purchasing quantities, optimize transportation, or represent a production deployment.",
        ],
        dataset:
            "The included large weekly example contains 325,000 unique store-item rows across 1,800 fictional stores and 380 fictional items in two retail categories. Recent Item Sales is an illustrative year-to-date measure, and store ranks run from A1 through E. All values are independently generated for the portfolio.",
        methodologySummary:
            "Validate weekly inputs, classify item availability, apply transparent reduction or increase rules, enforce operational controls, and preserve each decision in a 13-tab Excel output for business review.",
        methodology: [
            "Validate the control panel and store-item input for required fields, unique keys, numeric values, and supported operating modes.",
            "Compare suggested orders with distribution-center availability to identify balanced items, shortages, and inventory that may be allocated.",
            "Reduce short items using current inventory, store rank, and recent sales-based priority rather than arbitrary cuts.",
            "Add eligible units only while store capacity, item availability, line limits, minimum-shipment requirements, and target controls permit them.",
            "Write the final recommendation, availability checks, approval flags, and allocation summaries to an ordered 13-tab workbook for review.",
        ],
        findings:
            "The completed simulator demonstrates that a complex weekly allocation can be expressed as visible business rules and checked end to end. The included scenarios cover shortages, surplus availability, capacity limits, shipment minimums, target accounting, validation, and approval flags; they demonstrate process behavior rather than claiming a measured sales or inventory improvement.",
        implications:
            "Operations teams gain a consistent recommendation and a review trail they can challenge before approval. The business value is transparency and repeatability: each allocation remains tied to defined inputs and constraints, while exceptions stay visible instead of being hidden inside an unexplained result.",
        conclusionParagraphs: [
            "Limited inventory does not require an opaque model to support a disciplined decision. Explicit prioritization rules, validation controls, and audit-ready outputs can make a weekly allocation process more consistent and easier to review.",
            "A next production step would require live-system integration, performance monitoring, governance, and measured outcomes. Forecasting, replenishment, purchasing, and transportation decisions remain separate problems.",
        ],
        limitations: [
            "This is a portfolio-scale rule-based simulator, not a production optimization system.",
            "The example data is fictional and does not establish real-world sales, service-level, or inventory improvements.",
            "Demand forecasting, purchasing, transportation, routing, and distribution-center operations are outside scope.",
            "Manual business validation remains necessary even when automated implementation tests pass.",
        ],
    },
    {
        slug: "warehouse-club-market-expansion",
        title: "Warehouse Club Market Expansion",
        category: "Market Strategy",
        status: "In progress",
        summary:
            "Developing a public-data case study for a fictional regional warehouse club to compare U.S. metropolitan markets on commercial potential, operating feasibility, and expansion risk.",
        image: `${process.env.PUBLIC_URL}/images/warehouse-club-market-expansion-hero.png`,
        imageCaption:
            "The regional network concept represents a market-screening question; no final market ranking has been issued.",
        tech: ["Public Data", "Market Research", "Business Strategy"],
        github: "https://github.com/jclaudio019/warehouse-club-market-expansion-strategy",
        metrics: [
            { label: "Data policy", value: "Public" },
            { label: "Analysis level", value: "Metro" },
            { label: "Project status", value: "In progress" },
        ],
        metricsNote:
            "Atlas Warehouse Club is fictional. Research is in progress, and no market recommendation or financial outcome has been finalized.",
        problem:
            "A warehouse-club market can look attractive on population growth while still carrying heavy competition, labor constraints, weak distribution access, or economic concentration. Atlas Warehouse Club needs a defensible way to compare markets across demand potential and operating feasibility before committing to site-level due diligence.",
        solutionParagraphs: [
            "The case study is evaluating whether public data can support a credible metropolitan-market comparison. Candidate evidence is being screened for reliability, geographic coverage, freshness, join compatibility, licensing, and reproducibility before an analytical method is selected.",
            "The working framework considers membership and demand potential, household purchasing power, competitive whitespace, workforce conditions, supply-chain accessibility, and economic resilience. These remain research hypotheses—not final criteria or weights.",
            "Any future ranking will be presented as a decision aid for market prioritization and entry sequencing, not a prediction of store profitability, membership conversion, revenue, or customer lifetime value.",
        ],
        dataset:
            "Public sources only. Source feasibility and geographic compatibility are still being evaluated at the U.S. metropolitan level. Fictional client context will remain clearly separated from observed public evidence, proxy variables, analytical assumptions, and interpretation.",
        methodologySummary:
            "The current phase is evidence design: define the decision, test candidate public sources, document proxy limitations, and only then choose a reproducible comparison method.",
        methodology: [
            "Define the metropolitan-level business decision and separate market screening from site selection and capital approval.",
            "Evaluate candidate public sources for reliability, coverage, freshness, licensing, and geographic join compatibility.",
            "Test whether proposed demand, purchasing-power, competition, workforce, access, and resilience indicators are decision-relevant and defensible.",
            "Document proxy limitations and avoid predictive claims where no observed Atlas outcomes exist.",
            "Develop and sensitivity-test a comparison framework before presenting any market ranking or entry sequence.",
        ],
        findings:
            "Research and data-feasibility work are still in progress. No metropolitan market has been ranked or recommended, and the provisional working hypothesis has not yet been accepted or rejected by evidence.",
        implications:
            "The completed work is intended to narrow where Atlas should invest in deeper due diligence while keeping commercial opportunity and operating risk visible together. It will not replace parcel analysis, lease review, financial underwriting, or final capital approval.",
        conclusion:
            "No final conclusion has been reached. The next milestone is a reproducible public-data foundation strong enough to support a transparent market comparison without overstating what proxy measures can prove.",
        nextSteps: [
            "Complete the public-source feasibility review and document each source's geographic and time coverage.",
            "Confirm which proposed indicators are comparable across metropolitan markets and which require defensible proxies.",
            "Build and sensitivity-test the market comparison before making any prioritization recommendation.",
        ],
        limitations: [
            "Atlas Warehouse Club and its approximately 25-club operating footprint are fictional.",
            "The project has no observed outcomes for profitability, membership conversion, revenue, or customer lifetime value.",
            "Metro-level screening cannot answer exact store, parcel, lease, construction-cost, or freight questions.",
            "Future rankings will be decision aids, not claims of causality, guaranteed performance, or precise profitability.",
        ],
    },
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
