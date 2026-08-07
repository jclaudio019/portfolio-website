# Black-Scholes Portfolio Explorer Design

## Purpose

Add **Black-Scholes Options Modeling** as completed case study 05 and keep the in-progress Warehouse Club Market Expansion case study last as project 06. The case study combines preserved FM 5151 coursework with a clearly disclosed post-course React and Cloudflare Worker extension.

## Experience

The project detail page follows the existing Credit Risk explorer pattern. A visitor selects AAPL, MSFT, or SPY; call or put; expiration; strike; long or short; and contract count. Nothing is calculated until **Refresh and calculate** is pressed. Results compare market-implied volatility with a one-day GARCH(1,1) forecast and show Black-Scholes price, Delta, Gamma, position exposure, the fractional and rounded share hedge, and the adjustment from the preceding successful refresh.

Any position-defining input change marks the displayed result as outdated. A failed request keeps its error separate from the prior result. The interface identifies timestamps, Yahoo data limitations, the `^IRX` proxy, dividend fallback, educational scope, and AI-assisted development.

## Architecture

- React owns controls, stale state, session-only prior hedge targets, Black-Scholes calculations, and presentation.
- A narrow Cloudflare Worker owns Yahoo retrieval, the AAPL/MSFT/SPY allowlist, response validation, selector caching, and the JavaScript GARCH calculation.
- The browser never contacts Yahoo directly.
- No database, accounts, polling, streaming, trading, or brokerage connection is introduced.

Endpoints:

- `GET /api/options/expirations?symbol=AAPL`
- `GET /api/options/strikes?symbol=AAPL&expiration=YYYY-MM-DD&type=call`
- `POST /api/options/calculate`

The Worker returns normalized finite values and concise JSON errors. Selector requests may be cached for about 15 minutes; calculation requests are fresh.

## Portfolio content and order

The completed case study is inserted after Time-Series Analysis in R. Warehouse remains visible, numbered 06, marked **In progress**, and limited to its business problem and progress message. The Black-Scholes page separates original coursework from the post-course extension with the disclosure supplied in the implementation handoff.

The initial cover may use a temporary portfolio-native asset. A new generated cover is explicitly deferred until Jose requests one.

## Feasibility gate

Before interface implementation, prove that a Worker-compatible fetch can obtain AAPL, MSFT, and SPY chart data, expirations, strikes, bid, ask, last price, implied volatility, adjusted history, dividend information, and `^IRX` without unsupported cookie or crumb authentication. Compare a pure-JavaScript GARCH result against deterministic output from the retained Python `arch` implementation. If the option-chain request is not reliable, stop rather than substitute or fabricate data.

## Verification

Use test-first development for pure Black-Scholes math, position scaling, GARCH, Worker validation and normalization, React stale/loading/error behavior, project ordering, and the in-progress Warehouse boundary. Run focused tests, the complete portfolio suite, the production build, and desktop/mobile localhost checks before any deployment or repository cleanup.

## Repository cleanup boundary

Do not remove Streamlit or update the modeling repository until the React replacement is working and deployed. Preserve `analysis/hedging_final.ipynb` and `src/final/blackscholes.py` byte-for-byte.
