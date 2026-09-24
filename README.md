# Jose Claudio Portfolio

Source for [joseoclaudio.com](https://joseoclaudio.com): a React portfolio with interactive analytics case studies and a Cloudflare Worker that supports the portfolio assistant and options-modeling demo.

This repository is public so other analysts can inspect the architecture, testing approach, and deployment setup. It is a reference implementation, not a drop-in template: personal content, project data, links, generated knowledge, and deployment settings must be replaced before reuse.

## Architecture

- React 18 frontend built with CRACO and Tailwind CSS
- Cloudflare Worker for the RAG assistant and market-data endpoints
- Precomputed, sanitized vector index at `worker/src/worker_index.json`
- GitHub Actions build, test, and GitHub Pages deployment workflow
- The same production build can also be deployed to Cloudflare Pages

## Prerequisites

- Node.js 20 or newer
- npm
- A Cloudflare account for Worker deployment
- Wrangler authentication for local Worker development or deployment

## Local development

```bash
npm ci
cp .env.example .env.local
npm start
```

In another terminal:

```bash
cd worker
npm ci
npx wrangler dev
```

The frontend development server proxies relative API calls to `http://localhost:8787`.

## Configuration

`REACT_APP_WORKER_API_URL` is the public base URL of your deployed Worker. It is shared by the portfolio assistant and options explorer.

`REACT_APP_BACKEND_URL` is optional. When omitted, the contact form opens the visitor's email client. Set it only if you provide your own contact API.

`GEMINI_API_KEY` is optional in the Worker. Store it as a Cloudflare secret, never in a committed file:

```bash
cd worker
npx wrangler secret put GEMINI_API_KEY
```

The Worker uses the configured Cloudflare Workers AI binding when Gemini is unavailable.

## Tests and build

```bash
npm test
npm run test:worker
npm run test:all
REACT_APP_WORKER_API_URL=https://your-worker.example.workers.dev npm run build
```

The GitHub Pages workflow expects a repository variable named `WORKER_API_URL`.

## RAG index

`worker/src/worker_index.json` is generated outside this repository by the companion RAG pipeline. The committed artifact is intentionally limited to runtime fields and public source content. Local paths and ingestion-only metadata must not be published.

After copying a newly exported index into this repository, sanitize and validate it before committing:

```bash
python scripts/sanitize_worker_index.py worker/src/worker_index.json
npm run test:worker
```

Do not add private notes, application records, credentials, unpublished documents, or local filesystem paths to the knowledge corpus.

## Credit-risk data refresh

The public dashboard uses derived portfolio data under `public/data/credit-risk/`. The helper script documents the expected source repository and copied files:

```bash
./scripts/sync-credit-risk-dashboard-data.sh
```

Review generated data before committing it. Do not publish raw personal, customer, employer, or proprietary records.

## Fork checklist

Before publishing a fork:

1. Replace the profile, contact details, project copy, employer history, and links in `src/data/content.js`.
2. Replace site metadata in `public/index.html`, `src/components/PageMeta.jsx`, and `package.json`.
3. Change `worker/wrangler.jsonc` to your Worker name and deployment settings.
4. Set the GitHub repository variable `WORKER_API_URL` to your Worker URL.
5. Replace or disable `worker/src/worker_index.json`; never point a fork at Jose's Worker or knowledge index.
6. Replace project images and public dashboard data with content you have permission to publish.
7. Keep resumes, phone numbers, credentials, private notes, browser sessions, local paths, and internal agent state out of Git.
8. Run `npm run test:all`, build the site, and perform a privacy scan before publishing.

## Privacy boundary

The repository intentionally contains Jose's public professional name, portfolio email, general location, education, work history, and public project links. It does not intentionally publish a phone number, street address, credentials, private application material, internal agent state, or a downloadable resume.

## License

The source code is available under the MIT License. Jose's biography, resume content, project narratives, datasets, generated RAG knowledge, branding, and personal media are portfolio content and are not granted for reuse by the MIT License. Replace those materials in a fork.
