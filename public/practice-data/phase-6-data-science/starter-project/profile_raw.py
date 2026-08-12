"""Profile the raw data BEFORE cleaning. Run this first, always.

This is the step most people skip. It takes 60 seconds and tells you
what you are actually dealing with.
"""

from pathlib import Path

import pandas as pd

HERE = Path(__file__).resolve().parent
NULL_TOKENS = ["", " ", "N/A", "n/a", "NA", "NULL", "null", "-", "?", "nan", "missing"]


def profile(df: pd.DataFrame, name: str):
    print(f"\n{'='*70}\n{name}: {df.shape[0]:,} rows x {df.shape[1]} columns\n{'='*70}")

    print("\n-- dtypes as loaded --")
    print(df.dtypes.to_string())

    print("\n-- exact duplicate rows --")
    print(f"   {df.duplicated().sum()} ({df.duplicated().mean():.1%})")

    print("\n-- 'missing' disguised as text --")
    print(f"{'column':<16} {'pandas NaN':>10} {'text nulls':>11} {'real total':>11}")
    for c in df.columns:
        s = df[c].astype(str).str.strip()
        pandas_na = df[c].isna().sum()
        text_na = s.isin([t.strip() for t in NULL_TOKENS]).sum() - pandas_na
        total = pandas_na + text_na
        if total:
            print(f"{c:<16} {pandas_na:>10} {text_na:>11} {total:>10} ({total/len(df):>5.1%})")

    print("\n-- cardinality of text columns (spot the spelling drift) --")
    for c in df.columns:
        if df[c].dtype == object:
            n = df[c].nunique()
            if n <= 30:
                print(f"{c:<16} {n:>3} unique: {sorted(df[c].dropna().unique().tolist())[:12]}")
            else:
                print(f"{c:<16} {n:>3} unique")


if __name__ == "__main__":
    sales = pd.read_csv(HERE / "data" / "sales_raw.csv", dtype=str, keep_default_na=False)
    cust = pd.read_csv(HERE / "data" / "customers_raw.csv", dtype=str, keep_default_na=False)

    profile(sales, "sales_raw.csv")
    profile(cust, "customers_raw.csv")

    print(f"\n{'='*70}\nDATE FORMAT CHAOS\n{'='*70}")
    parsed = pd.to_datetime(sales["order_date"], format="mixed", errors="coerce", dayfirst=True)
    print(f"unparseable dates: {parsed.isna().sum()} of {len(sales)}")
    print("\nsample of the formats present:")
    for v in sales["order_date"].drop_duplicates().head(12):
        print(f"   {v!r}")

    print(f"\n{'='*70}\nNUMBERS STORED AS TEXT\n{'='*70}")
    print("unit_price examples:", sales["unit_price"].drop_duplicates().head(8).tolist())
    direct = pd.to_numeric(sales["unit_price"], errors="coerce")
    print(f"parse as-is -> {direct.notna().sum()} of {len(sales)} succeed "
          f"({direct.isna().sum()} lost)")
