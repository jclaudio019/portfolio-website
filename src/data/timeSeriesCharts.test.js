const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "timeSeriesCharts.json");

test("exports the fixed Brownian bridge and two 24-step forecasts", () => {
    expect(fs.existsSync(dataPath)).toBe(true);
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    expect(data.bridge).toHaveLength(501);
    expect(data.bridge[0]).toEqual(expect.objectContaining({ step: 0, t: 0, x: 0, y: 0 }));
    expect(data.bridge.at(-1)).toEqual(expect.objectContaining({ step: 500, t: 1, x: 0, y: 0 }));

    expect(Object.keys(data.forecasts)).toEqual(["unemployment", "sp500"]);
    for (const forecast of Object.values(data.forecasts)) {
        const future = forecast.rows.filter(({ forecast: value }) => value !== null);
        expect(future).toHaveLength(24);
        expect(future.every(({ lower, upper }) => lower < upper)).toBe(true);
    }
});
