export const WORKER_API_BASE = String(process.env.REACT_APP_WORKER_API_URL || "")
    .trim()
    .replace(/\/+$/, "");