// =====================================================================
// SINGLE SOURCE OF TRUTH — edit everything about the site here.
// =====================================================================

export const profile = {
    name: "Jose Claudio",
    role: "Applied Analytics | Forecasting, Statistical Modeling & Decision Support",
    roleShort: "Forecasting, Modeling, Automation & Business Decision Support",
    location: "Orange City, Florida",
    availability: [
        "Open to remote, hybrid, and on-site opportunities",
        "Willing to relocate for the right opportunity",
    ],
    email: "joseo.claudio19@gmail.com",
    github: "https://github.com/jclaudio019",
    linkedin: "https://www.linkedin.com/in/jclaudio019",
    resumeAvailableOnRequest: false,
    resumeUrl: "/Jose_Claudio_Analytics_Resume.pdf",
    education: "M.S. Applied Statistics — Purdue University (Expected 2027)",
    heroIntro:
        "I am an analytics professional with more than five years of experience across finance, supply chain, and inventory planning. I combine programming, forecasting, statistical methods, and business context to support practical, data-informed decisions.",
    heroSupport:
        "I am currently pursuing an M.S. in Applied Statistics at Purdue University to deepen my understanding of modeling, uncertainty, and the questions behind the data.",
};

export const marqueeItems = [
    "Forecasting",
    "Statistical Modeling",
    "Python",
    "SQL",
    "Machine Learning",
    "Decision Support",
    "Reporting Automation",
    "Inventory Analysis",
    "Finance",
    "Supply Chain",
    "Power BI",
    "Applied Statistics",
];

export const aboutChapters = [
    {
        n: "01",
        title: "How It Started",
        paragraphs: [
            "Hi, I'm Jose. I'm originally from Puerto Rico and currently based in Orange City, Florida. My path into analytics began while I was completing my bachelor's degree in finance at Bryant University.",
            "During my senior year, courses in computer science and data analysis for finance introduced me to Python. Programming gave me a practical way to explore data, test assumptions, automate repetitive work, and turn business questions into solutions.",
        ],
    },
    {
        n: "02",
        title: "Professional Application",
        paragraphs: [
            "In my current work, I develop POS-driven forecasts and allocation analyses for retail accounts within a $40M+ product portfolio. I use Python, Excel, VBA, and Power Query to automate reporting, validate data, analyze performance, and support inventory and planning decisions. I also led a $1M+ inventory-validation initiative that improved data accuracy by 15%.",
        ],
    },
    {
        n: "03",
        title: "Why Applied Statistics",
        paragraphs: [
            "As my work became more analytical, I wanted to better understand why different methods work, when to use them, and how to evaluate their results.",
            "I am now pursuing an M.S. in Applied Statistics at Purdue University. My graduate work in regression, probability, statistical inference, and time-series analysis is strengthening how I approach forecasting, model evaluation, uncertainty, and analytical communication.",
        ],
    },
    {
        n: "04",
        title: "What I Build Now",
        paragraphs: [
            "I am most interested in practical problems that sit between data and decisions. My portfolio includes demand forecasting, interpretable credit-risk modeling, time-series analysis, and allocation logic.",
            "Each project is built around a real business question and documents the methods, assumptions, validation, limitations, and decision implications—not only the final output. My goal is to build solutions that are clear, explainable, and useful to the people making the decision.",
        ],
    },
];

export const educationEntries = [
    {
        school: "Purdue University",
        location: "West Lafayette, Indiana",
        degree: "M.S. in Applied Statistics",
        date: "Expected 2027",
        coursework: ["Linear Regression", "Probability", "Statistical Inference", "Time-Series Analysis"],
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
            "Compared forecasting methods for daily retail demand and translated under- and over-forecast errors into retail-value exposure.",
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
            { label: "Naive over-forecast retail value*", value: "$3.01M" },
            { label: "Untouched test period", value: "365 days" },
        ],
        metricsNote:
            "*Retail-value exposure for FOODS under a Naive inventory-constrained scenario (sales-weighted sell_price). Not realized P&L, cash, or profit.",
        problem:
            "Retail teams need a reliable view of daily demand to plan staffing and inventory. Recent sales alone can miss weekly patterns, changes in demand, and calendar events such as Christmas closures. Forecast accuracy also needs to be understood through the operational effects of under- and over-forecasting.",
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
                "Naive forecasts create much more over-forecast retail-value exposure in every category. Better models reduce that amount but can increase under-forecast retail-value exposure, so model comparisons should consider both sides instead of WAPE alone. For HOBBIES, ETS and XGBoost are close. For HOUSEHOLD, linear regression produces a better balance than ETS.",
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
            "The project compares baseline, statistical, and machine-learning models, evaluates them on separate test data, and translates errors into potential retail exposure so operations and finance can discuss the same result.",
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
            "Built an end-to-end educational credit-risk case study connecting calibrated probability of default to expected loss, portfolio risk, stress, simulation, approval strategy, and monitoring.",
        image: `${process.env.PUBLIC_URL}/images/credit-risk-pd-model-hero-v2.png`,
        imageCaption:
            "The balance between repayment strength and default risk determines the illustrative score.",
        tech: ["Python", "DuckDB", "pandas", "scikit-learn", "FastAPI", "React", "Recharts", "Jupyter"],
        github: "https://github.com/jclaudio019/credit_risk",
        metrics: [
            { label: "Historical accounts", value: "466,285" },
            { label: "Out-of-time AUC", value: "0.669" },
            { label: "Portfolio expected loss*", value: "$771.6M" },
        ],
        metricsNote:
            "*Educational estimate using documented LGD/EAD assumptions; 11.58% of $6.66B exposure. Not a reserve, pricing rule, or lending decision.",
        problem:
            "A borrower-level probability score is only one part of a credit decision. The project asks how to build an interpretable PD model, turn it into expected loss, understand portfolio concentration and tail risk, test transparent downturn sensitivities, evaluate approval thresholds, and monitor stability without presenting an educational model as a lending policy.",
        solutionParagraphs: [
            "I organized a notebook-first workflow around time-based train, validation, and out-of-time test vintages. A logistic champion was calibrated on the 2013 validation vintage and evaluated on 2014 loans, keeping development and final evaluation separate.",
            "The calibrated PD feeds a transparent expected-loss calculation (PD × LGD × EAD), segment reporting, independent and correlated-default simulation, sensitivity stress scenarios, and a threshold explorer. Monitoring adds PSI and vintage performance with explicit seasoning warnings.",
            "DuckDB provides the analytical data layer, static JSON exports power the public dashboard, and an optional FastAPI service scores one borrower with the actual model contract. The website remains useful when that API is offline.",
        ],
        dataset:
            "The analysis covers 466,285 historical Lending Club loans issued from 2007 through 2014. Time-based splits use loans through 2012 for training (95,902), 2013 for validation/calibration (134,755), and 2014 as the out-of-time test book (235,628). The target is a simplified loan-status default proxy.",
        methodologySummary:
            "The workflow moves from reproducible DuckDB preparation through calibrated PD modeling, expected loss, portfolio aggregation, Monte Carlo simulation, sensitivity stress, approval thresholds, and monitoring. Each major notebook retains the underlying educational calculation before helper reuse.",
        methodology: [
            "Prepared and validated the canonical analytical table in DuckDB, then created chronological train, validation, and out-of-time test cohorts.",
            "Compared an interpretable logistic model with a nonlinear challenger, selected the champion on validation evidence, and calibrated probability levels before final evaluation.",
            "Evaluated out-of-time discrimination, calibration, Brier score, KS, and a bootstrap AUC interval while keeping a classification threshold separate from ranking quality.",
            "Calculated account expected loss as PD × LGD × EAD and reconciled account-level results to portfolio and segment totals.",
            "Simulated independent defaults and a one-factor correlated-default scenario, then summarized loss distributions with VaR and expected shortfall.",
            "Applied transparent PD, LGD, and EAD sensitivity scenarios and explored how candidate PD thresholds change approvals, exposure, expected defaults, and loss.",
            "Measured population shift with PSI and compared predicted versus observed vintage performance, explicitly flagging under-seasoned outcomes.",
        ],
        findings:
            "The calibrated logistic model achieved 0.669 ROC-AUC, 0.245 KS, and 0.075 Brier score on the 2014 out-of-time book. Estimated expected loss was $771.6M, or 11.58% of $6.66B exposure, under the documented assumptions. Correlated defaults widened the simulated tail materially, severe sensitivity more than doubled expected loss, and 2014 PSI was low at 0.008—but the vintage is under-seasoned, so its observed default rate is downward-biased.",
        implications:
            "The analysis shows how model ranking becomes a portfolio decision framework, but it does not select a production cutoff. A real lender would need pricing, operating costs, recoveries, fairness testing, policy constraints, outcome maturity, and governance before using the model for underwriting.",
        conclusionParagraphs: [
            "Historical borrower and loan information contains enough signal to compare relative risk, but model performance alone cannot determine a lending policy.",
            "The remaining business question is which threshold creates an acceptable balance between missed credit losses and rejected good borrowers. The probability, threshold, and illustrative score should remain separate decisions.",
        ],
        limitations: [
            "The historical loan-status target is a simplified default proxy rather than a fixed performance-horizon definition.",
            "LGD and EAD use documented simplifying assumptions; expected loss is not an accounting reserve or realized loss.",
            "The portfolio-default correlation is assumed rather than empirically calibrated.",
            "Stress results are transparent sensitivity scenarios, not regulatory macroeconomic stress tests.",
            "The 2014 test vintage is under-seasoned, which biases observed default outcomes downward.",
            "Candidate thresholds demonstrate trade-offs; no optimal approval, pricing, or lending policy is claimed.",
            "Fairness, regulatory suitability, production monitoring controls, and formal model governance require further work.",
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
            { label: "Audit tabs", value: "14" },
        ],
        metricsNote:
            "The included large example is independently generated fictional data; it does not reproduce employer records, identifiers, or proprietary materials.",
        problem:
            "When available inventory cannot satisfy every suggested store order, a retailer needs a repeatable way to decide which locations receive product. Manual reductions or additions can become inconsistent, difficult to review, and disconnected from store need, recent sales, shipment minimums, and inventory constraints.",
        solutionParagraphs: [
            "The simulator evaluates one weekly allocation snapshot, applies optional item exclusions and store holds, and classifies each item as balanced, short, or available for an increase. It then applies explicit rank, inventory, sales, capacity, line-limit, shipment, and optional dollar-target rules to produce a final recommendation.",
            "The result is an Excel workbook with the final allocation, availability and capacity checks, approval flags, and supporting tabs. Reviewers can see why units were added, reduced, retained, excluded, or held without relying on an unexplained score.",
            "The project intentionally stops at allocation. It does not forecast demand, determine purchasing quantities, optimize transportation, or represent a production deployment.",
        ],
        dataset:
            "The included large weekly example contains 325,000 unique store-item rows across 1,800 fictional stores and 380 fictional items in two retail categories. Recent Item Sales is an illustrative year-to-date measure, and store ranks run from A1 through E. All values are independently generated for the portfolio.",
        methodologySummary:
            "The simulator validates weekly inputs, applies exclusions and holds, classifies item availability, adjusts allocations, verifies store-category capacity, and records each decision in a 14-tab Excel workbook.",
        methodology: [
            "Validate the control panel and store-item input for required fields, unique keys, numeric values, and supported operating modes; optional item-exclusion and store-hold tabs identify intentional zero allocations.",
            "Compare suggested orders with distribution-center availability to identify balanced items, shortages, and inventory that may be allocated.",
            "Reduce short items using current inventory, store rank, and recent sales-based priority, while restoring capacity when units are removed.",
            "Add eligible units one at a time only while remaining store-category capacity, item availability, line limits, minimum-shipment requirements, and target controls permit them.",
            "Run a final capacity-validation check against the original projected store-category inventory, preserving documented exemptions and correcting non-exempt overages.",
            "Write the final recommendation, capacity and availability checks, review flags, and allocation summaries to an ordered 14-tab Excel workbook.",
        ],
        aiAssistedDevelopment: {
            paragraphs: [
                "I defined the business problem, allocation logic, requirements, decision rules, validation criteria, and weekly scenarios. I used generative AI through Codex, Claude Code, Antigravity IDE, and CLI-based workflows to help translate those specifications into code, tests, and documentation.",
                "The simulator remains a rule-based analytical workflow, not a generative-AI product or AI model. I reviewed and validated the implementation, business rules, and outputs.",
            ],
        },
        findings:
            "The simulator shows that weekly allocation can be handled with visible business rules and checked from input to final recommendation. The examples cover shortages, extra availability, item exclusions, store holds, capacity parity, shipment minimums, targets, validation, and review flags. They demonstrate how the process works rather than claiming a measured sales or inventory improvement.",
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
        slug: "black-scholes-options-modeling",
        title: "Black-Scholes Options Modeling",
        category: "Financial Modeling",
        summary:
            "Extended a graduate Black-Scholes options-modeling project with live market inputs, GARCH volatility, and an interactive Delta-hedge comparison.",
        image: `${process.env.PUBLIC_URL}/images/black-scholes-options-modeling-hero.png`,
        imageCaption:
            "Option value and hedge exposure respond to the underlying price, time to expiration, and volatility assumption.",
        tech: ["JavaScript", "Python", "Cloudflare Workers", "GARCH"],
        github: "https://github.com/jclaudio019/black-scholes-options-modeling",
        metrics: [
            { label: "Supported underlyings", value: "3" },
            { label: "Volatility estimates", value: "2" },
            { label: "Shares per contract", value: "100" },
        ],
        metricsNote:
            "Educational scope: AAPL, MSFT, and SPY. Live values depend on the selected listed option and Yahoo data availability.",
        problem:
            "An option price and its hedge depend on assumptions that change with the market. A useful learning tool should show how the same contract looks under different volatility estimates, connect Delta and Gamma to position exposure, and make the hedge calculation visible without presenting it as a trade recommendation.",
        solutionParagraphs: [
            "The original graduate final project established the foundation: European call and put pricing, option Greeks, simulated price paths, and Delta- and Gamma-hedging experiments under the Black-Scholes assumptions.",
            "After the course, I added a portfolio extension that retrieves current contract inputs for AAPL, MSFT, and SPY, compares market-implied volatility with a one-day GARCH(1,1) forecast, and translates both model views into position Delta, Gamma, and a theoretical share hedge.",
            "The interface refreshes only when requested, identifies stale results when inputs change, and keeps the prior hedge target only for the current browser session so a second refresh can show the estimated hedge adjustment.",
        ],
        dataset:
            "The preserved coursework uses simulated paths and the inputs retained in the original notebook. The post-course explorer requests current Yahoo option chains, two years of adjusted daily price history, dividend information, and the ^IRX Treasury-bill yield proxy. Market data may be delayed, incomplete, or temporarily unavailable.",
        methodologySummary:
            "The project combines the retained Black-Scholes formulas with a button-driven market-data request, a one-day GARCH(1,1) volatility estimate, and position-level Delta and Gamma scaling for standard 100-share option contracts.",
        methodology: [
            "Preserved the original executed coursework notebook and Black-Scholes pricing implementation unchanged.",
            "Validated the selected listed option and normalized its bid, ask, last price, implied volatility, expiration, dividend yield, and risk-free-rate proxy.",
            "Estimated a one-day GARCH(1,1) variance forecast from at least 252 adjusted daily returns and annualized the result using 252 trading days.",
            "Calculated Black-Scholes price, Delta, and Gamma separately under market-implied and GARCH volatility.",
            "Scaled Delta and Gamma by 100 shares and the signed contract count, then calculated the theoretical Delta-neutral stock target.",
            "Compared the new target with the preceding successful refresh for the same position while keeping all state inside the current browser session.",
        ],
        aiAssistedDevelopment: {
            paragraphs: [
                "The original coursework notebook and Black-Scholes pricing implementation are preserved unchanged. The previously empty time-series module, market-data integration, GARCH comparison, and interactive interface were developed after the course with AI-assisted coding and were reviewed and tested as a separate portfolio enhancement.",
            ],
        },
        findings:
            "The explorer makes the model sensitivity visible: changing the volatility estimate changes the theoretical option price, Delta, Gamma, and the share hedge derived from them. The implied and GARCH views answer different questions, so the comparison is more useful than treating either estimate as a guaranteed future value.",
        implications:
            "Delta provides a current estimate of directional exposure, while Gamma helps explain how quickly that exposure—and the associated share hedge—can change when the stock moves. In practice, transaction costs, liquidity, discrete rebalancing, and model limitations would also affect a hedging decision.",
        conclusionParagraphs: [
            "The completed project connects financial-modeling coursework with a small analytical product that makes assumptions, market inputs, and hedge arithmetic inspectable.",
            "It is an educational comparison, not a production pricing system, risk platform, or trading recommendation.",
        ],
        limitations: [
            "Black-Scholes assumes European exercise, continuous trading, stable volatility and rates, and frictionless markets.",
            "Yahoo data may be delayed, incomplete, or temporarily unavailable; ^IRX is used only as a disclosed rate proxy.",
            "The GARCH comparison uses one normal-residual GARCH(1,1) specification rather than multiple tuned volatility models.",
            "The share hedge excludes transaction costs, market impact, discrete execution, and brokerage constraints.",
            "This is an educational modeling tool and not a trading recommendation or production risk-management system.",
        ],
    },
    {
        slug: "backtesting-system",
        title: "Backtesting System",
        published: false,
        category: "Financial Systems",
        summary:
            "Connected two graduate coursework assignments into a documented workflow spanning historical backtesting and a small paper-trading event pipeline.",
        image: `${process.env.PUBLIC_URL}/images/backtesting-system-hero.png`,
        imageCaption:
            "Two analytical lanes connect historical strategy evaluation with a paper-trading event workflow.",
        tech: ["Python", "FastAPI", "Docker", "QuestDB", "Alpaca"],
        github: "https://github.com/jclaudio019/backtesting-system",
        metrics: [
            { label: "Strategy demonstrated", value: "1" },
            { label: "Docker services", value: "4" },
            { label: "QuestDB tables", value: "2" },
            { label: "Related coursework assignments", value: "2" },
        ],
        metricsNote:
            "Educational system using one EMA crossover strategy and Alpaca's paper-trading interface; no profitability or live-trading claim.",
        problem:
            "A strategy notebook can show historical behavior, but it does not explain how signals, orders, broker updates, and stored events connect in an operating workflow. This project examines both stages while keeping their purposes and limitations clear.",
        solutionParagraphs: [
            "The first graduate coursework assignment produced a reusable Python package for loading market data, defining strategies, running historical tests, and reviewing portfolio behavior.",
            "The second assignment extended that learning into a small paper-trading architecture: one EMA crossover strategy sends paper orders through Alpaca, a listener receives broker updates, FastAPI provides a narrow data interface, and QuestDB stores engine runs and trade events.",
            "After the coursework, I used AI-assisted development to repair package imports, align Docker service configuration, make the run identifier consistent across the event flow, add focused tests, and prepare the repository for public review.",
        ],
        dataset:
            "The historical notebook requests Yahoo Finance data for AAPL and MSFT for dates from December 1, 2020, through December 1, 2023 via YahooDataProvider; no fixed market-data snapshot is tracked. Retained notebook outputs are illustrative artifacts, not an immutable reproducible dataset. Paper-trading validation uses mocks and sample API records, not orders or credentials.",
        methodologySummary:
            "The case study follows a strategy from historical evaluation into an event-driven paper-trading workflow, with one shared identifier connecting the engine run, client order IDs, broker updates, and stored trade events.",
        methodology: [
            "Used the local backtestlib package to separate market data, strategy logic, backtest execution, and portfolio evaluation.",
            "Applied one short- and long-period EMA crossover rule in the broker-connected coursework flow.",
            "Separated QuestDB, FastAPI, crossover, and listener responsibilities into four Docker Compose services.",
            "Encoded the strategy-run identifier in client order IDs so listener events can be traced to the matching engine run.",
            "Stored run metadata and trade updates in two QuestDB tables through focused API endpoints.",
            "Validated the repaired paths with isolated unit tests and static Docker Compose/configuration checks. The documented local QuestDB/API smoke procedure remains unverified because Docker was unavailable during final validation.",
        ],
        findings:
            "The main result is architectural rather than financial. Historical testing and broker-connected execution answer different questions, and a shared run identifier makes the relationship between strategy activity, order updates, and stored records inspectable.",
        implications:
            "The project demonstrates how analytical code can be organized into clearer service boundaries and validation points. That structure makes assumptions and event flow easier to explain, test, and review before considering broader strategy or infrastructure work.",
        conclusionParagraphs: [
            "The completed case study connects two pieces of graduate coursework into one documented view of historical testing and paper-trading system design.",
            "It is an educational architecture demonstration, not evidence of strategy profitability, a production trading platform, or a recommendation to trade.",
        ],
        limitations: [
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

export const publishedProjects = projects.filter((project) => project.published !== false);

export const experienceImpactAreas = [
    {
        theme: "Forecasting, Inventory & Decision Support",
        icon: "boxes",
        description:
            "Develop POS-driven forecasts and allocation analyses that support inventory planning, product availability, and practical business decisions.",
        professionalEvidence: [
            "Support assigned retail accounts within a $40M+ product portfolio.",
            "Analyze store- and SKU-level demand, sales, and inventory patterns to inform forecasting and allocation decisions.",
            "Translate unit-level forecasts and inventory signals into revenue and performance views for planning.",
            "Partner across sales, merchandising, planning, finance, and operations to support product availability and business planning.",
        ],
        projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator", "time-series-analysis-r"],
    },
    {
        theme: "Automation, Reporting & Data Validation",
        icon: "workflow",
        description:
            "Build repeatable analytical workflows that reduce manual effort, improve data reliability, and make recurring decisions easier to support.",
        professionalEvidence: [
            "Automate recurring reports, analytical checks, and validation workflows using Python, Excel, VBA, and Power Query.",
            "Consolidate KPIs and large operational datasets into information stakeholders can review and use.",
            "Led a validation initiative involving more than $1 million in inventory that improved data accuracy by 15%.",
            "Designed the allocation logic and validation rules, then led the implementation of a workflow used by my current team.",
        ],
        projectSlugs: ["retail-allocation-simulator", "retail-demand-forecasting", "credit-risk-pd-model"],
    },
    {
        theme: "Finance, Modeling & Performance Analysis",
        icon: "trending-up",
        description:
            "Combine financial analysis, statistical modeling, and business context to understand performance drivers, evaluate scenarios, and communicate implications.",
        professionalEvidence: [
            "Analyze forecast-versus-actual performance and the operational drivers behind changes in demand, inventory, and sales.",
            "Translate volume, inventory, and pricing changes into financial and performance implications.",
            "Modeled financial outcomes based on commodity-price and supplier-pricing changes while working in finance.",
            "Supported financial reporting, reconciliations, KPI reviews, and leadership presentations.",
        ],
        portfolioEvidence: [
            "Built an interpretable probability-of-default model and 300–850 scorecard using logistic regression, WoE and Information Value, and ROC-AUC evaluation.",
            "Applied regression, time-series analysis, forecast validation, and machine-learning methods across public portfolio projects.",
        ],
        projectSlugs: ["credit-risk-pd-model", "time-series-analysis-r"],
    },
];

export const professionalContext = {
    intro:
        "My analytical experience has developed across EssilorLuxottica, Rexel USA, and FGX International in supply-chain analytics, financial reporting, inventory planning, forecasting, and decision support.",
    entries: [
        "EssilorLuxottica — Supply Chain Analyst",
        "Rexel USA — Financial Analyst and Corporate Accounting Analyst",
        "FGX International — Vendor Managed Inventory Analyst",
    ],
};

export const skillGroups = [
    {
        title: "Analytics & Decision Support",
        items: [
            { label: "Forecasting", projectSlugs: ["retail-demand-forecasting", "time-series-analysis-r"] },
            "Variance Analysis",
            { label: "Inventory Analysis", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            { label: "KPI Reporting", projectSlugs: ["retail-demand-forecasting"] },
            { label: "Data Validation", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator"] },
            { label: "Decision Support", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator", "time-series-analysis-r"] },
            { label: "Reporting Automation", projectSlugs: ["retail-allocation-simulator"] },
        ],
    },
    {
        title: "Programming & Data",
        items: [
            { label: "Python", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator"] },
            "SQL",
            { label: "R", projectSlugs: ["time-series-analysis-r"] },
            { label: "pandas", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model", "retail-allocation-simulator"] },
            { label: "NumPy", projectSlugs: ["credit-risk-pd-model"] },
            { label: "Excel", projectSlugs: ["retail-allocation-simulator"] },
            "VBA",
            "Power Query",
            "Git & GitHub",
            {
                label: "AI-Assisted Product Development",
                description:
                    "Use generative AI to turn business requirements, decision rules, and validation criteria into functional analytical workflows, tests, and documentation.",
                tools: ["Codex", "Claude Code", "Antigravity IDE", "CLI workflows"],
                projectSlugs: ["retail-allocation-simulator"],
            },
            { label: "Jupyter", projectSlugs: ["credit-risk-pd-model", "time-series-analysis-r"] },
            { label: "pytest", projectSlugs: ["retail-allocation-simulator"] },
        ],
    },
    {
        title: "Modeling & Statistics",
        items: [
            { label: "Time-Series Analysis", projectSlugs: ["retail-demand-forecasting", "time-series-analysis-r"] },
            { label: "Forecast Validation", projectSlugs: ["retail-demand-forecasting", "time-series-analysis-r"] },
            { label: "Machine Learning", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "Linear Regression", projectSlugs: ["retail-demand-forecasting"] },
            { label: "Logistic Regression", projectSlugs: ["credit-risk-pd-model"] },
            { label: "Statistical Inference", projectSlugs: ["time-series-analysis-r"] },
            { label: "Probability", projectSlugs: ["credit-risk-pd-model", "time-series-analysis-r"] },
            { label: "Feature Engineering", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "Model Evaluation", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "ROC-AUC", projectSlugs: ["credit-risk-pd-model"] },
            { label: "WoE & Information Value", projectSlugs: ["credit-risk-pd-model"] },
            { label: "Scorecard Development", projectSlugs: ["credit-risk-pd-model"] },
        ],
    },
    {
        title: "Visualization & Communication",
        items: [
            "Power BI",
            "Tableau",
            "Matplotlib",
            "Plotly",
            "Dashboard Design",
            "Executive Reporting",
            "Analytical Storytelling",
        ],
    },
    {
        title: "Business Domains",
        items: [
            { label: "Finance", projectSlugs: ["retail-demand-forecasting", "credit-risk-pd-model"] },
            { label: "Supply Chain", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            { label: "Retail Operations", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            { label: "Inventory & Allocation", projectSlugs: ["retail-demand-forecasting", "retail-allocation-simulator"] },
            "Financial Planning & Analysis",
        ],
    },
];

export const resumeHighlights = [
    { label: "Location", value: "Orange City, Florida · Open to relocation" },
    { label: "Education", value: "M.S. Applied Statistics, Purdue University — Expected 2027" },
    { label: "Toolset", value: "Python · SQL · R · Excel · VBA · Power Query · Power BI · Tableau" },
    { label: "Focus", value: "Forecasting · Statistical Modeling · Automation · Decision Support" },
];
