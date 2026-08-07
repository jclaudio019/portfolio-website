import { fetchCalculation, fetchExpirations, fetchStrikes } from "./yahoo.js";

const response = (body, status = 200, cacheSeconds = 0) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Cache-Control": cacheSeconds ? `public, max-age=${cacheSeconds}` : "no-store",
    };
    return status === 204
        ? new Response(null, { status, headers })
        : Response.json(body, { status, headers });
};

const errorResponse = (error) => response({ error: error.message || "Request failed" }, 400);

export default {
    async fetch(request) {
        if (request.method === "OPTIONS") return response({}, 204);
        const url = new URL(request.url);
        try {
            if (request.method === "GET" && url.pathname === "/api/options/expirations") {
                return response({ expirations: await fetchExpirations(url.searchParams.get("symbol")) }, 200, 900);
            }
            if (request.method === "GET" && url.pathname === "/api/options/strikes") {
                return response({ strikes: await fetchStrikes({
                    symbol: url.searchParams.get("symbol"),
                    expiration: url.searchParams.get("expiration"),
                    optionType: url.searchParams.get("type"),
                }) }, 200, 900);
            }
            if (request.method === "POST" && url.pathname === "/api/options/calculate") {
                const body = await request.json();
                return response(await fetchCalculation(body));
            }
            return response({ error: "Not found" }, 404);
        } catch (error) {
            return errorResponse(error);
        }
    },
};
