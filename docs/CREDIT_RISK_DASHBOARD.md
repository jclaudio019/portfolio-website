# Credit Risk dashboard data

The dashboard reads eight versioned, static JSON files from `public/data/credit-risk`. They are copied from the analytical repository's canonical `portfolio_export` directory so the portfolio website remains independently buildable and the analytical repository remains the source of truth.

Refresh after intentionally regenerating the analytical export:

```bash
./scripts/sync-credit-risk-dashboard-data.sh
```

An alternate export directory may be passed as the first argument. Review the website diff and rerun tests before publishing. Do not hand-edit the copied JSON.

Only the **Score a Borrower** section needs a service. Set `REACT_APP_CREDIT_RISK_API_URL` at website build time to the deployed FastAPI base URL. Without it, all static sections remain available and the scorer shows a clear unavailable state.

