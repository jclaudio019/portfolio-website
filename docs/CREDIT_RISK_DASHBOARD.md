# Credit Risk dashboard data

The dashboard reads eight versioned, static JSON files from `public/data/credit-risk`. They are copied from the analytical repository's canonical `portfolio_export` directory so the portfolio website remains independently buildable and the analytical repository remains the source of truth.

Refresh after intentionally regenerating the analytical export:

```bash
./scripts/sync-credit-risk-dashboard-data.sh
```

An alternate export directory may be passed as the first argument. Review the website diff and rerun tests before publishing. Do not hand-edit the copied JSON.

The dashboard is intentionally static. Model scoring remains part of the analytical
repository and final notebook rather than a separately deployed backend service.
