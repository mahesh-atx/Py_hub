"""Reference EDA on the cleaned data. Produces the numbers a report needs.

Run after src/clean.py. Every finding here is something a stakeholder
could act on — that is the bar for including it.
"""

from pathlib import Path

import pandas as pd

HERE = Path(__file__).resolve().parent.parent
pd.set_option("display.width", 100)


def load():
    df = pd.read_csv(HERE / "data" / "merged_clean.csv", parse_dates=["order_date", "order_month"])
    return df


def headline(df: pd.DataFrame):
    print("=" * 72)
    print("HEADLINE NUMBERS")
    print("=" * 72)
    rev = df["revenue"].sum()
    ok = df[~df["date_ambiguous"]]
    print(f"orders            : {len(df):,}")
    print(f"date range        : {ok['order_date'].min():%Y-%m-%d} to "
          f"{ok['order_date'].max():%Y-%m-%d}  (excl. {int(df['date_ambiguous'].sum())} ambiguous)")
    print(f"total revenue     : Rs {rev:,.0f}")
    print(f"avg order value   : Rs {df['revenue'].mean():,.0f}")
    print(f"median order value: Rs {df['revenue'].median():,.0f}")
    print(f"unique customers  : {df['customer_id'].nunique():,}")
    print(f"avg rating        : {df['rating'].mean():.2f} (from {df['rating'].notna().sum():,} rated orders)")
    print(f"\nmean > median by {df['revenue'].mean()/df['revenue'].median():.2f}x "
          "-> right-skewed, a few large orders pull the average up.")
    print("Report the MEDIAN as 'typical order', not the mean.")


def by_category(df: pd.DataFrame):
    print("\n" + "=" * 72)
    print("REVENUE BY CATEGORY")
    print("=" * 72)
    g = (df.groupby("category")
           .agg(orders=("order_id", "count"),
                revenue=("revenue", "sum"),
                avg_order=("revenue", "mean"),
                avg_rating=("rating", "mean"))
           .sort_values("revenue", ascending=False))
    g["rev_share_%"] = (g["revenue"] / g["revenue"].sum() * 100).round(1)
    print(g.round(1).to_string())
    top = g.index[0]
    print(f"\n{top} is {g.loc[top,'rev_share_%']:.0f}% of revenue from "
          f"{g.loc[top,'orders']/len(df)*100:.0f}% of orders.")


def by_city(df: pd.DataFrame):
    print("\n" + "=" * 72)
    print("REVENUE BY CITY")
    print("=" * 72)
    g = (df.groupby("city")
           .agg(orders=("order_id", "count"),
                revenue=("revenue", "sum"),
                avg_order=("revenue", "mean"))
           .sort_values("revenue", ascending=False))
    g["cum_share_%"] = (g["revenue"].cumsum() / g["revenue"].sum() * 100).round(1)
    print(g.round(0).to_string())
    n80 = int((g["cum_share_%"] <= 80).sum()) + 1
    print(f"\nTop {n80} of {len(g)} cities generate 80% of revenue (Pareto).")


def monthly_trend(df: pd.DataFrame):
    print("\n" + "=" * 72)
    print("MONTHLY TREND")
    print("=" * 72)
    n_amb = int(df["date_ambiguous"].sum())
    if n_amb:
        print(f"NOTE: excluding {n_amb} orders whose dd/mm vs mm/dd reading is")
        print("ambiguous and parsed into impossible future months.\n")
        df = df[~df["date_ambiguous"]]
    m = (df.groupby("order_month")
           .agg(orders=("order_id", "count"), revenue=("revenue", "sum")))
    m["rev_3mo_avg"] = m["revenue"].rolling(3).mean()
    m["mom_%"] = (m["revenue"].pct_change() * 100).round(1)
    print(m.round(0).to_string())


def payment_and_delivery(df: pd.DataFrame):
    print("\n" + "=" * 72)
    print("PAYMENT METHOD AND DELIVERY")
    print("=" * 72)
    g = (df.groupby("payment_method")
           .agg(orders=("order_id", "count"),
                avg_order=("revenue", "mean"),
                avg_delivery=("delivery_days", "mean"),
                avg_rating=("rating", "mean"))
           .sort_values("orders", ascending=False))
    print(g.round(2).to_string())

    print("\n-- does slow delivery hurt ratings? --")
    d = df.dropna(subset=["delivery_days", "rating"]).copy()
    d["delivery_bucket"] = pd.cut(d["delivery_days"], [0, 2, 4, 6, 30],
                                  labels=["1-2 days", "3-4 days", "5-6 days", "7+ days"])
    print(d.groupby("delivery_bucket", observed=True)["rating"]
           .agg(["count", "mean"]).round(2).to_string())
    corr = d["delivery_days"].corr(d["rating"])
    print(f"\ncorrelation(delivery_days, rating) = {corr:+.4f}")
    print("Near zero -> in THIS dataset delivery speed does not predict rating.")
    print("That is a real finding. Report it; do not hunt for a story that isn't there.")


def customer_value(df: pd.DataFrame):
    print("\n" + "=" * 72)
    print("CUSTOMER VALUE")
    print("=" * 72)
    c = (df.dropna(subset=["customer_id"])
           .groupby("customer_id")
           .agg(orders=("order_id", "count"),
                spend=("revenue", "sum"),
                premium=("is_premium", "first"))
           .sort_values("spend", ascending=False))
    print(f"customers with >=1 order: {len(c):,}")
    print(f"top 10% of customers   : {c['spend'].head(len(c)//10).sum()/c['spend'].sum()*100:.1f}% of revenue")
    print(f"\nrepeat rate: {(c['orders'] > 1).mean()*100:.1f}% ordered more than once")

    print("\n-- premium vs non-premium --")
    p = df.dropna(subset=["is_premium"]).groupby("is_premium").agg(
        orders=("order_id", "count"),
        avg_order=("revenue", "mean"),
        avg_rating=("rating", "mean"))
    print(p.round(2).to_string())


def data_quality_caveats(df: pd.DataFrame):
    print("\n" + "=" * 72)
    print("CAVEATS THE REPORT MUST STATE")
    print("=" * 72)
    print(f"orders with no revenue figure : {df['revenue'].isna().sum():,} "
          f"({df['revenue'].isna().mean():.1%})")
    print(f"orders with unparseable date  : {df['order_date'].isna().sum():,}")
    print(f"orders with no rating         : {df['rating'].isna().sum():,} "
          f"({df['rating'].isna().mean():.1%})")
    print(f"orders not matched to customer: {df['customer_name'].isna().sum():,}")
    print(f"revenue figures recomputed    : {int(df['revenue_suspect'].sum()):,}")
    print(f"ambiguous dd/mm vs mm/dd dates: {int(df['date_ambiguous'].sum()):,}")
    print("\nRatings are missing for 1 in 5 orders and missingness is unlikely")
    print("to be random - unhappy customers often just don't rate. Treat the")
    print("average rating as an UPPER bound.")


if __name__ == "__main__":
    df = load()
    headline(df)
    by_category(df)
    by_city(df)
    monthly_trend(df)
    payment_and_delivery(df)
    customer_value(df)
    data_quality_caveats(df)
