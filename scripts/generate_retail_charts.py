#!/usr/bin/env python3
"""Polished portfolio charts for the retail demand forecasting case study."""

from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np
import pandas as pd
import seaborn as sns

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "retail-operation" / "data" / "processed"
OUT = Path(__file__).resolve().parents[1] / "public" / "images"

# Cream / editorial dashboard palette (portfolio-first impression)
BG = "#F6F3EE"
CARD = "#FFFFFF"
INK = "#1C1C1A"
MUTED = "#6B6A64"
FAINT = "#D8D4CB"
FOODS = "#0F766E"
HOBBIES = "#C2410C"
HOUSEHOLD = "#1D4ED8"
FORECAST = "#64748B"
ACCENT = "#0F766E"

CAT_COLORS = {"FOODS": FOODS, "HOBBIES": HOBBIES, "HOUSEHOLD": HOUSEHOLD}
BEST = {
    "FOODS": "XGBoost Faster",
    "HOBBIES": "XGBoost Shallow",
    "HOUSEHOLD": "Linear Regression (Full)",
}


def style():
    sns.set_theme(style="white", font="DejaVu Sans")
    plt.rcParams.update(
        {
            "figure.facecolor": BG,
            "axes.facecolor": CARD,
            "axes.edgecolor": FAINT,
            "axes.labelcolor": MUTED,
            "axes.titlecolor": INK,
            "axes.spines.top": False,
            "axes.spines.right": False,
            "axes.spines.left": False,
            "axes.spines.bottom": True,
            "axes.linewidth": 0.8,
            "xtick.color": MUTED,
            "ytick.color": MUTED,
            "text.color": INK,
            "grid.color": FAINT,
            "grid.linewidth": 0.6,
            "grid.alpha": 0.55,
            "legend.frameon": False,
            "font.size": 11,
            "axes.titlesize": 13,
            "axes.titleweight": "semibold",
            "figure.dpi": 160,
            "savefig.dpi": 200,
            "savefig.facecolor": BG,
            "savefig.bbox": "tight",
            "savefig.pad_inches": 0.35,
        }
    )


def load():
    daily = pd.read_parquet(DATA / "category_daily.parquet")
    daily["ds"] = pd.to_datetime(daily["ds"])
    forecasts = pd.read_parquet(DATA / "final_test_forecasts.parquet")
    forecasts["ds"] = pd.to_datetime(forecasts["ds"])
    if "Model" in forecasts.columns and "model" not in forecasts.columns:
        forecasts = forecasts.rename(columns={"Model": "model"})
    return daily, forecasts


def soft_y_grid(ax):
    # Horizontal guides only — light enough to disappear in screenshots
    ax.yaxis.grid(True, which="major", color=FAINT, linewidth=0.7, alpha=0.7)
    ax.xaxis.grid(False)
    ax.set_axisbelow(True)
    ax.tick_params(length=0)
    ax.spines["bottom"].set_color(FAINT)


def card_axes(fig, rect):
    ax = fig.add_axes(rect)
    ax.set_facecolor(CARD)
    for sp in ax.spines.values():
        sp.set_visible(True)
        sp.set_color(FAINT)
        sp.set_linewidth(1.0)
    return ax


def make_hero(daily, forecasts):
    fig = plt.figure(figsize=(14.5, 8.2))
    fig.patch.set_facecolor(BG)

    fig.text(0.045, 0.94, "Retail Demand Forecasting", fontsize=22, fontweight="bold", color=INK, va="top")
    fig.text(
        0.045,
        0.885,
        "Category POS demand · weekly seasonality · true demand vs forecast on an untouched test year",
        fontsize=11,
        color=MUTED,
        va="top",
    )

    # KPI strip
    kpis = [
        ("7.05%", "Best test WAPE", "HOUSEHOLD · Linear Regression"),
        ("$3.01M", "Naive excess exposure*", "FOODS retail-value, not P&L"),
        ("365 days", "Untouched test year", "No post-test tuning"),
    ]
    for i, (value, label, note) in enumerate(kpis):
        x0 = 0.045 + i * 0.315
        ax = card_axes(fig, [x0, 0.72, 0.295, 0.12])
        ax.set_xticks([])
        ax.set_yticks([])
        for sp in ax.spines.values():
            sp.set_visible(False)
        ax.text(0.06, 0.62, value, transform=ax.transAxes, fontsize=26, fontweight="bold", color=ACCENT, va="center")
        ax.text(0.06, 0.28, label, transform=ax.transAxes, fontsize=10, color=INK, va="center")
        ax.text(0.06, 0.08, note, transform=ax.transAxes, fontsize=8.5, color=MUTED, va="center")

    # Demand trend (7d rolling)
    ax1 = card_axes(fig, [0.045, 0.10, 0.55, 0.55])
    ax1.set_title("Daily category demand (7-day rolling)", loc="left", pad=10)
    for cat, color in CAT_COLORS.items():
        s = daily.loc[daily["cat_id"] == cat].sort_values("ds")
        y = s.set_index("ds")["y"].rolling(7, min_periods=1).mean()
        ax1.plot(y.index, y.values, color=color, lw=1.8, label=cat)
    soft_y_grid(ax1)
    ax1.set_ylabel("Units / day", color=MUTED)
    ax1.xaxis.set_major_locator(mdates.YearLocator())
    ax1.xaxis.set_major_formatter(mdates.DateFormatter("%Y"))
    ax1.legend(loc="upper left", ncol=3, fontsize=9, labelcolor=INK)
    ax1.set_xlim(daily["ds"].min(), daily["ds"].max())
    # Christmas markers (subtle)
    for year in range(2012, 2017):
        ax1.axvline(pd.Timestamp(f"{year}-12-25"), color=FAINT, lw=0.9, ls="--", zorder=0)

    # Seasonality
    ax2 = card_axes(fig, [0.625, 0.10, 0.33, 0.55])
    ax2.set_title("Average weekly seasonality", loc="left", pad=10)
    order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    short = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    width = 0.26
    x = np.arange(7)
    for i, (cat, color) in enumerate(CAT_COLORS.items()):
        s = daily.loc[daily["cat_id"] == cat].copy()
        s["dow"] = s["ds"].dt.day_name()
        means = s.groupby("dow")["y"].mean().reindex(order)
        # Index to Monday = 100 for shape clarity
        indexed = means / means.iloc[0] * 100
        ax2.bar(x + (i - 1) * width, indexed.values, width=width, color=color, label=cat, alpha=0.92)
    soft_y_grid(ax2)
    ax2.set_xticks(x)
    ax2.set_xticklabels(short)
    ax2.set_ylabel("Index (Mon = 100)", color=MUTED)
    ax2.legend(loc="upper left", fontsize=9, labelcolor=INK)
    ax2.axhline(100, color=FAINT, lw=1, zorder=0)

    fig.text(
        0.045,
        0.035,
        "*Retail-value exposure under an inventory-constrained reading of forecast error · M5 category daily POS",
        fontsize=8,
        color=MUTED,
    )
    out = OUT / "retail-demand-forecasting-hero.png"
    fig.savefig(out)
    plt.close(fig)
    print("wrote", out)


def make_seasonality(daily):
    fig, ax = plt.subplots(figsize=(12.5, 5.6))
    fig.patch.set_facecolor(BG)
    ax.set_facecolor(CARD)
    ax.set_title("Category daily sales (7-day rolling)", loc="left", pad=12)

    for cat, color in CAT_COLORS.items():
        s = daily.loc[daily["cat_id"] == cat].sort_values("ds")
        y = s.set_index("ds")["y"].rolling(7, min_periods=1).mean()
        ax.plot(y.index, y.values, color=color, lw=1.9, label=cat)

    for year in range(2012, 2017):
        ax.axvline(pd.Timestamp(f"{year}-12-25"), color="#B8B3A8", lw=0.9, ls="--", zorder=0, alpha=0.8)

    soft_y_grid(ax)
    ax.set_ylabel("Units sold / day")
    ax.legend(loc="upper left", ncol=3, fontsize=10)
    ax.xaxis.set_major_locator(mdates.YearLocator())
    ax.xaxis.set_major_formatter(mdates.DateFormatter("%Y"))
    fig.text(
        0.01,
        -0.02,
        "Dashed lines mark Christmas · FOODS highest volume · HOUSEHOLD rising over time · HOBBIES more variable",
        fontsize=8.5,
        color=MUTED,
        transform=ax.transAxes,
    )
    out = OUT / "retail-demand-sales-seasonality.png"
    fig.savefig(out)
    plt.close(fig)
    print("wrote", out)


def make_actual_vs_forecast(forecasts):
    fig, axes = plt.subplots(3, 1, figsize=(12.5, 9.2), sharex=False)
    fig.patch.set_facecolor(BG)
    fig.suptitle("True demand vs forecast (untouched test year)", x=0.01, ha="left", fontsize=14, fontweight="semibold", color=INK)

    # Prefer a readable window that still shows weekly pattern clearly
    window_end = pd.Timestamp("2015-10-20")
    window_start = pd.Timestamp("2015-06-21")

    for ax, cat in zip(axes, ["FOODS", "HOBBIES", "HOUSEHOLD"]):
        model = BEST[cat]
        sub = forecasts.loc[
            (forecasts["cat_id"] == cat) & (forecasts["model"] == model) & (forecasts["ds"] >= window_start) & (forecasts["ds"] <= window_end)
        ].sort_values("ds")
        if sub.empty:
            # fallback: whatever columns exist
            cols = forecasts.columns.tolist()
            raise SystemExit(f"No rows for {cat} / {model}. Columns: {cols}")

        color = CAT_COLORS[cat]
        ax.set_facecolor(CARD)
        ax.plot(sub["ds"], sub["actual"], color=color, lw=1.8, label="True demand")
        ax.plot(sub["ds"], sub["forecast"], color=FORECAST, lw=1.6, ls="--", label="Forecast")
        ax.fill_between(
            sub["ds"],
            sub["actual"],
            sub["forecast"],
            where=(sub["actual"] >= sub["forecast"]),
            color=color,
            alpha=0.12,
            interpolate=True,
        )
        ax.fill_between(
            sub["ds"],
            sub["actual"],
            sub["forecast"],
            where=(sub["actual"] < sub["forecast"]),
            color=FORECAST,
            alpha=0.12,
            interpolate=True,
        )
        soft_y_grid(ax)
        ax.set_title(f"{cat}  ·  {model}", loc="left", fontsize=11, color=INK, pad=6)
        ax.set_ylabel("Units / day")
        ax.legend(loc="upper right", fontsize=9, ncols=2)
        ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %d"))
        ax.xaxis.set_major_locator(mdates.WeekdayLocator(byweekday=mdates.MO, interval=2))

    fig.text(
        0.01,
        0.01,
        "Shaded gap: teal when demand exceeds forecast (under-forecast) · slate when forecast exceeds demand (over-forecast)",
        fontsize=8.5,
        color=MUTED,
    )
    fig.tight_layout(rect=[0, 0.03, 1, 0.97])
    out = OUT / "retail-demand-actual-vs-forecast.png"
    fig.savefig(out)
    plt.close(fig)
    print("wrote", out)


def main():
    style()
    OUT.mkdir(parents=True, exist_ok=True)
    daily, forecasts = load()
    print("daily", daily.columns.tolist(), daily.shape)
    print("forecasts", forecasts.columns.tolist(), forecasts.shape)
    print("models sample", forecasts["model"].dropna().unique()[:20] if "model" in forecasts.columns else "no model col")
    make_hero(daily, forecasts)
    make_seasonality(daily)
    make_actual_vs_forecast(forecasts)


if __name__ == "__main__":
    main()
