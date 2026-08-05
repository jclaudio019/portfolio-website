// =====================================================================
// SINGLE SOURCE OF TRUTH — edit everything about the site here.
// =====================================================================

export const profile = {
    name: "Jose Claudio",
    role: "Analytics | Finance, Supply Chain & Applied Statistics",
    roleShort: "Analytics, Forecasting & Business Decisions",
    location: "Orange City, Florida",
    availability: [
        "Open to remote, hybrid, and on-site opportunities",
    ],
    email: "jose.claudio19@gmail.com",
    github: "https://github.com/jclaudio019",
    linkedin: "https://www.linkedin.com/in/jclaudio019",
    resumeAvailableOnRequest: true,
    // TODO: add Jose_Claudio_Analytics_Resume.pdf to public/ when ready
    resumeUrl: null,
    education: "M.S. Applied Statistics — Purdue University (Expected May 2027)",
    heroIntro:
        "I combine experience in finance, supply chain, and operations with Python, forecasting, statistics, and automation.",
    heroSupport:
        "I am also pursuing an M.S. in Applied Statistics and building projects around real business questions.",
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
            "Some of my earliest projects used linear and logistic regression to explore real-world data, including temperature data from NASA. I also used Python to test investment ideas and built a simple backtester with moving averages, the Relative Strength Index, and the stochastic oscillator.",
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
            "Graduate coursework in financial mathematics introduced me to stochastic processes and made me want a stronger foundation in statistics. I wanted to understand not only how to use a method, but also when it is appropriate and how its assumptions affect the result.",
            "I am now pursuing a master's degree in applied statistics at Purdue University. My coursework includes linear regression, probability, and statistical inference.",
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
            "This portfolio brings together my experience in finance and operations with my work in statistics, programming, and forecasting. Each project starts with a practical question and explains the result, the limitations, and what I learned.",
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
            "Compared forecasting methods for daily retail demand and translated errors into potential missed demand and excess inventory.",
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
            "Retail teams need a reliable view of daily demand to plan staffing and inventory. Recent sales alone can miss weekly patterns, changes in demand, and calendar events such as Christmas closures. Forecast accuracy also needs to be connected to the different costs of running short and carrying too much product.",
        solutionParagraphs: [
            "I forecast daily unit sales for FOODS, HOBBIES, and HOUSEHOLD at the category level. This keeps weekly and holiday patterns visible without adding store-item allocation complexity.",
            "I compared simple baselines, linear regression, Prophet, and XGBoost. Models were selected through expanding-window validation and evaluated once on a separate 365-day test period.",
            "I then valued under- and over-forecasts using the sales-weighted selling price. These values represent potential retail exposure, not realized revenue, cash, or profit because unit cost, margin, and carrying cost were not available.",
            "Allocation, replenishment, safety stock, and purchasing recommendations were outside the project scope.",
        ],
        dataset:
            "The M5 Forecasting dataset (Walmart daily unit sales) was aggregated to one daily observation per category (ds | cat_id | y). Chronological split: train 2011-01-29 to 2014-06-20, validation 2014-06-21 to 2015-06-20, and test 2015-06-21 to 2016-06-19. Validation used 13 calendar-aligned expanding windows. Christmas Day demand falls to zero or near zero and was retained as a known calendar effect. Unit residuals on the test period were valued using sales-weighted sell_price to support the exposure analysis.",
        methodologySummary:
            "I compared simple baselines with statistical and machine-learning models across 13 expanding validation windows. The selected models were evaluated once on a separate 365-day test period, and forecast errors were valued at the sales-weighted selling price.",
        methodology: [
            "Prepared and validated the analytical data, then explored weekly seasonality, category behavior, and calendar effects — including the Friday–Sunday lift and Christmas closures.",
            "Established Naive, Seasonal Naive, 7-day SMA, and ETS baselines before comparing more complex models.",
            "Built Linear Regression with lag, rolling, trend, calendar, and Christmas features (full and reduced versions via permutation importance) to keep an interpretable option in the comparison.",
            "Tested Prophet with weekly/yearly seasonality and Christmas as a holiday, plus XGBoost on the shared feature set with small, pre-specified configurations — not an exhaustive hyperparameter search.",
            "Compared models across 13 expanding monthly validation windows with identical dates, horizons, and metrics (WAPE primary; MAE and RMSE also tracked).",
            "Froze validation-selected models per category, then evaluated every pre-specified model once on the untouched 365-day test year — with no post-test tuning.",
            "Translated test residuals into under-forecast and over-forecast unit counts and retail-value exposure, then ranked categories by volume, average selling price, and where deeper analysis would create the most decision value.",
        ],
        findings:
            "Every evaluated alternative improved on the Naive benchmark. The best observed test WAPE was 10.22% for FOODS with XGBoost, 8.00% for HOBBIES with XGBoost, and 7.05% for HOUSEHOLD with linear regression. No model won every category, and simpler models were often close to the best result. Validation winners also changed on the test period for HOBBIES and HOUSEHOLD, showing why test data must remain separate.",
        financialInterpretation: {
            intro:
                "Forecast accuracy matters because it changes two operational exposures. For each category-day, a positive residual (actual − forecast) is an under-forecast: demand that could not be filled if inventory were limited to the forecast. A negative residual is an over-forecast: inventory that would remain after demand was met. The table below applies that inventory-constrained scenario to fixed test forecasts and values units at sales-weighted sell_price.",
            caveat:
                "These figures show retail-value exposure, not realized lost sales, cash, or profit. Margin, unit cost, carrying cost, and service-level policy were not available.",
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
                "Naive forecasts create much more excess-inventory exposure in every category. Better models reduce that amount but can increase under-forecast exposure, so model comparisons should consider both sides instead of WAPE alone. For HOBBIES, ETS and XGBoost are close. For HOUSEHOLD, linear regression produces a better balance than ETS.",
            priorityIntro:
                "Average selling price helps put error into business context (it is not a margin measure). Categories differ in volume, retail value, and where deeper work is worth the effort:",
            priorityRows: [
                {
                    category: "FOODS",
                    units: "9.73M",
                    retailValue: "$25.49M",
                    avgPrice: "$2.62",
                    focus: "Highest volume and retail-value exposure. ETS is a strong simple baseline; review weekday buffers before adding complexity.",
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
            "Forecast accuracy is only part of the decision. Under-forecasts can mean missed demand, while over-forecasts can leave excess product on the shelf. A production decision should compare those costs by category and use different buffers when running short is more expensive than carrying extra inventory.",
        conclusionParagraphs: [
            "Historical sales can forecast category demand more accurately than simply using recent sales, but the best method depends on the category.",
            "The project compares simple and advanced models, evaluates them on separate test data, and translates errors into potential retail exposure so operations and finance can discuss the same result.",
            "The practical next step is to keep simpler models when results are close, review HOUSEHOLD in more detail, and set category buffers based on the cost of stockouts versus excess inventory.",
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
            "Built an interpretable model that uses historical Lending Club outcomes to compare repayment risk and show how borrower inputs affect a credit score.",
        image: `${process.env.PUBLIC_URL}/images/credit-risk-pd-model-hero-v2.png`,
        imageCaption:
            "The balance between repayment strength and default risk determines the illustrative score.",
        tech: ["Python", "pandas", "NumPy", "statsmodels", "scikit-learn", "Jupyter"],
        github: "https://github.com/jclaudio019/credit_risk",
        metrics: [
            { label: "Historical records", value: "466,285" },
            { label: "Held-out AUC", value: "0.699" },
            { label: "Illustrative score", value: "300-850" },
        ],
        metricsNote:
            "Educational historical analysis only. The score is illustrative and is not a lending decision or production credit score.",
        problem:
            "Lenders need a consistent way to compare repayment risk, but a model score should not become an automatic approval decision. The business problem is to identify useful risk differences in borrower and loan information, explain what drives the score, and show how different decision thresholds change the result.",
        solutionParagraphs: [
            "I built an interpretable historical risk-ranking model. Data preparation and category groupings were learned from the training data and then applied unchanged to the test data.",
            "Weight of Evidence and Information Value were used to study risk patterns. The final logistic regression uses grouped categories so the direction and contribution of each input remain explainable.",
            "The model estimates the probability of repayment and converts it into probability of default. AUC, Gini, and KS measure how well the model ranks risk, while an illustrative 300–850 score makes the relationship easier to understand. The score is not an approval or pricing rule.",
        ],
        dataset:
            "The analysis reviewed 466,285 historical Lending Club loan records. A stratified 80/20 split produced 373,028 training rows and 93,257 held-out rows. The historical good_bad target labels specified charge-off, default, and late-status outcomes as bad (0), with the remaining observed statuses labelled good standing (1).",
        methodologySummary:
            "Training and test data were kept separate, grouped inputs were used in an interpretable logistic regression, and AUC, Gini, and KS measured risk ranking. Model output was then translated into an illustrative score.",
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
            "The model achieved an AUC of 0.699, Gini of 0.399, and KS of 0.292 on the test data. This supports relative risk ranking, but it does not cleanly separate good and bad outcomes. At the displayed 50% repayment threshold, the model detected only 10 of 10,194 bad loans. The main lesson is that useful risk ranking does not automatically create a useful decision cutoff.",
        implications:
            "The model can support risk segmentation and threshold analysis, but it cannot set approval or pricing rules by itself. A real credit policy would need to compare the costs of missed defaults and rejected good borrowers and add calibration, monitoring, fairness review, and governance.",
        conclusionParagraphs: [
            "Historical borrower and loan information contains enough signal to compare relative risk, but model performance alone cannot determine a lending policy.",
            "The remaining business question is which threshold creates an acceptable balance between missed credit losses and rejected good borrowers. The probability, threshold, and illustrative score should remain separate decisions.",
        ],
        limitations: [
            "The historical good_bad proxy has no fixed performance-horizon default definition.",
            "A random holdout does not establish temporal stability, population stability, or performance through changing economic conditions.",
            "The probabilities and illustrative 300-850 score are not calibrated for production use.",
            "The displayed 0.5 P(good) threshold has extremely weak bad-loan recall and is not a business policy.",
            "Fairness, monitoring, regulatory suitability, and model governance have not been assessed.",
            "Advanced models may improve discrimination, but complexity must be justified against interpretability, stability, calibration, validation, auditability, implementation cost, and stakeholder explainability.",
            "This is not an IFRS 9 model and does not estimate expected credit loss, LGD, EAD, staging, or forward-looking economic scenarios.",
            "Historical Lending Club accounts may not represent a current institution, portfolio, policy, or economic environment.",
        ],
    },
    {
        slug: "retail-allocation-simulator",
        title: "Retail Allocation Simulator",
        category: "Retail Operations",
        summary:
            "Automates weekly store-item allocation so limited inventory follows consistent business rules and every recommendation can be reviewed in Excel.",
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
            "The result is an Excel workbook with the final allocation, inventory checks, approval flags, and supporting tabs. Reviewers can see why units were added, reduced, retained, or excluded without relying on an unexplained score.",
            "The project intentionally stops at allocation. It does not forecast demand, determine purchasing quantities, optimize transportation, or represent a production deployment.",
        ],
        dataset:
            "The included large weekly example contains 325,000 unique store-item rows across 1,800 fictional stores and 380 fictional items in two retail categories. Recent Item Sales is an illustrative year-to-date measure, and store ranks run from A1 through E. All values are independently generated for the portfolio.",
        methodologySummary:
            "The simulator validates weekly inputs, classifies item availability, applies reduction or increase rules, checks operating limits, and records each decision in a 13-tab Excel workbook.",
        methodology: [
            "Validate the control panel and store-item input for required fields, unique keys, numeric values, and supported operating modes.",
            "Compare suggested orders with distribution-center availability to identify balanced items, shortages, and inventory that may be allocated.",
            "Reduce short items using current inventory, store rank, and recent sales-based priority rather than arbitrary cuts.",
            "Add eligible units only while store capacity, item availability, line limits, minimum-shipment requirements, and target controls permit them.",
            "Write the final recommendation, availability checks, approval flags, and allocation summaries to an ordered 13-tab workbook for review.",
        ],
        findings:
            "The simulator shows that weekly allocation can be handled with visible business rules and checked from input to final recommendation. The examples cover shortages, extra availability, capacity limits, shipment minimums, targets, validation, and approval flags. They demonstrate how the process works rather than claiming a measured sales or inventory improvement.",
        implications:
            "Operations teams receive a consistent recommendation and a clear review trail before approval. Each allocation remains tied to defined inputs and limits, while exceptions stay visible.",
        conclusionParagraphs: [
            "Limited inventory does not require an unexplained model. Clear priority rules, validation checks, and reviewable outputs can make weekly allocation more consistent.",
            "Production use would require live-system integration, monitoring, controls, and measured outcomes. Forecasting, replenishment, purchasing, and transportation remain separate problems.",
        ],
        limitations: [
            "This is a portfolio-scale rule-based simulator, not a production optimization system.",
            "The example data is fictional and does not establish real-world sales, service-level, or inventory improvements.",
            "Demand forecasting, purchasing, transportation, routing, and distribution-center operations are outside scope.",
            "Manual business validation remains necessary even when automated implementation tests pass.",
        ],
    },
    {
        slug: "time-series-analysis-r",
        title: "Time-Series Analysis & Forecasting in R",
        category: "Applied Statistics",
        summary:
            "Used R to simulate time-series behavior and build 24-month forecasts for U.S. unemployment and the S&P 500.",
        image: `${process.env.PUBLIC_URL}/images/time-series-analysis-r-hero.png`,
        imageCaption:
            "Historical patterns lead into several possible future paths, showing seasonality, dependence over time, and forecast uncertainty.",
        tech: ["R", "Jupyter", "astsa", "ARIMA", "Forecasting"],
        github: "https://github.com/jclaudio019/time_series_analysis",
        metrics: [
            { label: "Time-series behaviors simulated", value: "6" },
            { label: "Real-world series forecasted", value: "2" },
            { label: "Forecast horizon", value: "24 months" },
        ],
        metricsNote:
            "Graduate final project completed in R as part of the M.S. in Applied Statistics program at Purdue University. Educational analysis; not an economic or investment recommendation.",
        problem:
            "Economic and financial observations change over time, so trend, persistence, and shocks can make methods built for independent data misleading. This project uses simulation, correlation, differencing, and ARIMA models to study those patterns and forecast two real-world series.",
        solutionParagraphs: [
            "The first section simulates Gaussian noise, a random walk, a Poisson process, a two-dimensional Brownian bridge, AR(1), MA(1), and integrated ARIMA behavior. The paths and correlation patterns show how each process behaves differently.",
            "The applied sections fit ARIMA(1,1,1) models to monthly U.S. unemployment and S&P 500 data and produce 24-month forecasts. The charts show how uncertainty grows beyond the observed data.",
        ],
        dataset:
            "The applied analysis uses the monthly U.S. unemployment-rate series provided by the R astsa package and two S&P 500 workbook inputs retained with the final project. Simulated series use a fixed seed for reproducibility, with 500 observations in the core stochastic-process exercises.",
        methodologySummary:
            "The project moves from controlled simulations to applied forecasting: generate known processes, examine their ACF/PACF structure, difference integrated behavior, fit ARIMA models, and compare observed histories with 24-month forecast paths.",
        methodology: [
            "Simulated Gaussian, Poisson, Brownian-bridge, autoregressive, moving-average, and integrated time-series behavior in R.",
            "Compared ACF and PACF patterns to identify persistence, moving-average cutoff, and the effect of differencing.",
            "Visualized the monthly U.S. unemployment series and summarized its historical level and variance.",
            "Fit an ARIMA(1,1,1) model and generated a 24-month unemployment forecast.",
            "Loaded and inspected the retained S&P 500 level and percentage-change workbooks, including a regenerated cumulative index.",
            "Fit a second ARIMA(1,1,1) model and generated a 24-month S&P 500 forecast.",
        ],
        findings:
            "The simulations make the distinction between stationary and integrated behavior visible: white noise fluctuates around a stable level, a random walk accumulates shocks, the AR(1) ACF decays, and the MA(1) ACF cuts off quickly. In the applied models, both point forecasts remain close to the latest observed level while their uncertainty widens over the 24-month horizon—a useful reminder that the forecast range is as important as the center line.",
        implications:
            "The project connects time-series theory with practical forecasting in R. It also shows why forecasts should be presented as uncertain model-based ranges rather than guaranteed future values.",
        conclusionParagraphs: [
            "This final project brings simulation, model identification, differencing, ARIMA estimation, and forecast interpretation into one reproducible R analysis.",
            "The GitHub repository also includes six coursework notebooks covering stationarity, autocorrelation, model diagnostics, forecasting, and spectral analysis.",
        ],
        limitations: [
            "The applied sections use fixed ARIMA(1,1,1) specifications rather than an exhaustive model-selection process.",
            "The project does not include rolling-origin validation or comparison against multiple forecasting benchmarks.",
            "The retained S&P 500 inputs do not include a complete external data-provenance pipeline or calendar-date field.",
            "The forecasts are educational and should not be used for economic-policy, employment, trading, or investment decisions.",
        ],
    },
    {
        slug: "warehouse-club-market-expansion",
        title: "Warehouse Club Market Expansion",
        category: "Market Strategy",
        status: "In progress",
        summary:
            "Comparing U.S. metro areas to identify where a fictional regional warehouse club should investigate expansion next.",
        image: `${process.env.PUBLIC_URL}/images/warehouse-club-market-expansion-hero.png`,
        imageCaption:
            "A regional market-screening concept. No market has been ranked or recommended.",
        tech: ["Public Data", "Market Research", "Business Strategy"],
        github: "https://github.com/jclaudio019/warehouse-club-market-expansion-strategy",
        problem:
            "Population growth alone does not make a market attractive. Competition, labor, distribution access, and economic concentration also matter. The project will compare those factors before recommending where Atlas Warehouse Club should conduct deeper site research.",
    },
];

export const experience = [
    {
        theme: "Supply Chain & Inventory Analysis",
        icon: "boxes",
        blurb:
            "Forecasting, inventory allocation, and data validation across supply chain and operations.",
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
            "Automated recurring reports and validation checks to reduce manual work and improve data reliability.",
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
            "Used analytics across finance, accounting, supply chain, and operations to support practical decisions.",
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
            { label: "Forecasting", projectSlugs: ["retail-demand-forecasting", "time-series-analysis-r"] },
            { label: "Inventory Analysis", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            { label: "KPI Reporting", projectSlugs: ["retail-demand-forecasting"] },
            { label: "Data Validation", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator"] },
            { label: "Decision Support", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator", "time-series-analysis-r"] },
        ],
    },
    {
        title: "Programming & Data",
        items: [
            { label: "Python", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator"] },
            { label: "R", projectSlugs: ["time-series-analysis-r"] },
            "SQL",
            { label: "Excel", projectSlugs: ["retail-allocation-simulator"] },
            "VBA",
            "Power Query",
            { label: "pandas", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator"] },
            { label: "NumPy", projectSlugs: ["credit-risk-pd-model"] },
            { label: "Jupyter", projectSlugs: ["credit-risk-pd-model", "time-series-analysis-r"] },
            { label: "pytest", projectSlugs: ["retail-allocation-simulator"] },
        ],
    },
    {
        title: "Machine Learning & Forecasting",
        items: [
            { label: "Machine Learning", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "scikit-learn", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "XGBoost", projectSlugs: ["retail-demand-forecasting"] },
            { label: "statsmodels", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "Prophet", projectSlugs: ["retail-demand-forecasting"] },
            { label: "ARIMA", projectSlugs: ["time-series-analysis-r"] },
        ],
    },
    {
        title: "Visualization",
        items: ["Power BI", "Tableau", "Excel (advanced)", "Dashboard Design"],
    },
    {
        title: "Business & Research",
        items: [
            { label: "Supply Chain", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            { label: "Finance", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            "Accounting",
            { label: "Operations", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            { label: "Market Research", projectSlugs: ["warehouse-club-market-expansion"] },
            { label: "Public Data", projectSlugs: ["warehouse-club-market-expansion"] },
            { label: "Business Strategy", projectSlugs: ["warehouse-club-market-expansion"] },
        ],
    },
    {
        title: "Statistical Methods",
        items: [
            { label: "Linear Regression", projectSlugs: ["retail-demand-forecasting"] },
            { label: "Logistic Regression", projectSlugs: ["credit-risk-pd-model"] },
            { label: "Probability", projectSlugs: ["credit-risk-pd-model", "time-series-analysis-r"] },
            { label: "Statistical Inference", projectSlugs: ["time-series-analysis-r"] },
            { label: "Time Series Analysis", projectSlugs: ["retail-demand-forecasting", "time-series-analysis-r"] },
        ],
    },
];

export const resumeHighlights = [
    { label: "Location", value: "Orange City, Florida" },
    { label: "Education", value: "M.S. Applied Statistics, Purdue University (Expected May 2027)" },
    { label: "Toolset", value: "Python · SQL · Excel · VBA · Power Query · Power BI · Tableau" },
    { label: "Focus", value: "Finance · Supply Chain · Forecasting · Applied Statistics" },
];
