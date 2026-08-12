"""Produce the report figures from the cleaned data.

Chart rules applied here:
  - sort bars by value, never alphabetically
  - label axes with units (Rs)
  - annotate the number that matters
  - no 3D, no pie charts with 8 slices, no dual axes without reason
"""

from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

HERE = Path(__file__).resolve().parent.parent
OUT = HERE / "figures"
OUT.mkdir(exist_ok=True)

BLUE, ORANGE, GREEN, RED, GREY = "#4C72B0", "#DD8452", "#55A868", "#C44E52", "#8C8C8C"
plt.rcParams.update({"figure.dpi": 110, "savefig.dpi": 110, "font.size": 10,
                     "axes.spines.top": False, "axes.spines.right": False})


def lakh(x, _=None):
    return f"{x/1e5:.1f}L"


def main():
    df = pd.read_csv(HERE / "data" / "merged_clean.csv",
                     parse_dates=["order_date", "order_month"])
    valid = df[~df["date_ambiguous"]]

    # ---- 1. before/after cleaning ----
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(11, 4))
    stages = ["raw\nrows", "after\ndedup", "usable\nrevenue"]
    vals = [3060, 3000, int(df["revenue"].notna().sum())]
    bars = a1.bar(stages, vals, color=[GREY, BLUE, GREEN])
    for b, v in zip(bars, vals):
        a1.text(b.get_x() + b.get_width() / 2, v + 40, f"{v:,}", ha="center", fontsize=9)
    a1.set_title("Rows surviving each cleaning stage")
    a1.set_ylabel("orders")
    a1.set_ylim(0, 3400)

    defects = {
        "rating missing": 658, "discount missing": 248,
        "delivery missing": 211, "date unparseable": 154,
        "unit_price missing": 151, "revenue mismatch": 84,
        "impossible rating": 113, "impossible delivery": 65,
        "duplicates": 60, "impossible qty": 47,
        "ambiguous date": 16,
    }
    s = pd.Series(defects).sort_values()
    a2.barh(s.index, s.values, color=ORANGE)
    for i, v in enumerate(s.values):
        a2.text(v + 8, i, str(v), va="center", fontsize=8.5)
    a2.set_title("Defects found in 3,060 raw rows")
    a2.set_xlabel("rows affected")
    a2.set_xlim(0, 760)
    fig.tight_layout()
    fig.savefig(OUT / "01-cleaning-impact.png")
    plt.close(fig)

    # ---- 2. revenue distribution: why median beats mean ----
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(11, 4))
    rev = df["revenue"].dropna()
    a1.hist(rev, bins=50, color=BLUE, alpha=0.8)
    a1.axvline(rev.mean(), color=RED, ls="--", lw=2, label=f"mean Rs {rev.mean():,.0f}")
    a1.axvline(rev.median(), color=GREEN, ls="-", lw=2, label=f"median Rs {rev.median():,.0f}")
    a1.set_title("Order value is right-skewed")
    a1.set_xlabel("order value (Rs)")
    a1.set_ylabel("orders")
    a1.legend(fontsize=9)

    a2.boxplot([df[df.category == c]["revenue"].dropna()
                for c in ["Electronics", "Clothing", "Home", "Books", "Grocery"]],
               tick_labels=["Electr.", "Cloth.", "Home", "Books", "Groc."],
               patch_artist=True,
               boxprops={"facecolor": BLUE, "alpha": 0.6})
    a2.set_title("Order value by category")
    a2.set_ylabel("order value (Rs)")
    fig.tight_layout()
    fig.savefig(OUT / "02-revenue-distribution.png")
    plt.close(fig)

    # ---- 3. category + city ----
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(11, 4))
    cat = valid.groupby("category")["revenue"].sum().sort_values()
    a1.barh(cat.index, cat.values, color=BLUE)
    for i, v in enumerate(cat.values):
        a1.text(v * 1.01, i, lakh(v), va="center", fontsize=9)
    a1.set_title("Revenue by category")
    a1.set_xlabel("revenue (Rs)")
    a1.set_xlim(0, cat.max() * 1.18)

    city = valid.groupby("city")["revenue"].sum().sort_values()
    a2.barh(city.index, city.values, color=GREEN)
    for i, v in enumerate(city.values):
        a2.text(v * 1.01, i, lakh(v), va="center", fontsize=9)
    a2.set_title("Revenue by city")
    a2.set_xlabel("revenue (Rs)")
    a2.set_xlim(0, city.max() * 1.18)
    fig.tight_layout()
    fig.savefig(OUT / "03-category-city.png")
    plt.close(fig)

    # ---- 4. monthly trend ----
    m = valid.groupby("order_month").agg(revenue=("revenue", "sum"),
                                         orders=("order_id", "count"))
    m["roll3"] = m["revenue"].rolling(3).mean()
    fig, ax = plt.subplots(figsize=(10, 4.2))
    ax.plot(m.index, m["revenue"], "o-", color=BLUE, lw=1.5, ms=4, label="monthly revenue")
    ax.plot(m.index, m["roll3"], "-", color=RED, lw=2.5, label="3-month rolling average")
    ax.set_title("Monthly revenue — flat, with no clear trend")
    ax.set_ylabel("revenue (Rs)")
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lakh))
    ax.legend(fontsize=9)
    ax.grid(alpha=0.3)
    fig.autofmt_xdate()
    fig.tight_layout()
    fig.savefig(OUT / "04-monthly-trend.png")
    plt.close(fig)

    # ---- 5. the honest null result ----
    d = df.dropna(subset=["delivery_days", "rating"]).copy()
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(11, 4))
    d["bucket"] = pd.cut(d["delivery_days"], [0, 2, 4, 6, 30],
                         labels=["1-2", "3-4", "5-6", "7+"])
    g = d.groupby("bucket", observed=True)["rating"].mean()
    a1.bar(g.index.astype(str), g.values, color=GREY)
    for i, v in enumerate(g.values):
        a1.text(i, v + 0.03, f"{v:.2f}", ha="center", fontsize=9)
    a1.set_ylim(0, 5)
    a1.set_title(f"Delivery speed vs rating (r = {d['delivery_days'].corr(d['rating']):+.3f})")
    a1.set_xlabel("delivery days")
    a1.set_ylabel("mean rating")
    a1.axhline(d["rating"].mean(), color=RED, ls="--", lw=1,
               label=f"overall {d['rating'].mean():.2f}")
    a1.legend(fontsize=8.5)

    miss = df[["revenue", "rating", "delivery_days", "discount_pct",
               "order_date", "customer_name"]].isna().mean().sort_values() * 100
    a2.barh(miss.index, miss.values, color=ORANGE)
    for i, v in enumerate(miss.values):
        a2.text(v + 0.4, i, f"{v:.1f}%", va="center", fontsize=8.5)
    a2.set_title("Missing data remaining after cleaning")
    a2.set_xlabel("% of rows missing")
    a2.set_xlim(0, 32)
    fig.tight_layout()
    fig.savefig(OUT / "05-null-result-and-missingness.png")
    plt.close(fig)

    print(f"saved {len(list(OUT.glob('*.png')))} figures to {OUT}")


if __name__ == "__main__":
    main()
