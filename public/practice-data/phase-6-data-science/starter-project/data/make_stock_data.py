"""Generate a deterministic daily OHLCV dataset for Project 9.

Two synthetic Indian stocks (plus an index) with realistic behaviour:
weekend-free trading calendar, occasional holidays, a general drift, and
enough volatility that rolling volatility and drawdown are worth analysing.

Deterministic: same seed -> byte-identical CSV.

Run:  python data/make_stock_data.py
"""

from pathlib import Path

import numpy as np
import pandas as pd

SEED = 11
HERE = Path(__file__).resolve().parent


def make_stock(name: str, seed: int, years: int = 2) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    dates = pd.bdate_range("2023-01-02", periods=252 * years, freq="B")
    # ~2% of trading days are holidays (fractional weekday closures).
    holiday_mask = rng.random(len(dates)) < 0.02
    dates = dates[~holiday_mask]
    n = len(dates)

    drift = 0.00045 if name != "NIFTY50" else 0.00035
    shocks = rng.normal(drift, 0.016, n)
    close = 1000 * np.exp(np.cumsum(shocks))
    open_ = close * (1 + rng.normal(0, 0.005, n))
    high = np.maximum(open_, close) * (1 + np.abs(rng.normal(0, 0.008, n)))
    low = np.minimum(open_, close) * (1 - np.abs(rng.normal(0, 0.008, n)))
    volume = rng.integers(600_000, 2_400_000, n).astype(int)

    return pd.DataFrame({
        "date": dates.strftime("%Y-%m-%d"),
        "symbol": name,
        "open": np.round(open_, 2),
        "high": np.round(high, 2),
        "low": np.round(low, 2),
        "close": np.round(close, 2),
        "volume": volume,
    })


def main() -> None:
    parts = [
        make_stock("RELIANCE", SEED),
        make_stock("TCS", SEED + 1),
        make_stock("NIFTY50", SEED + 2),
    ]
    df = pd.concat(parts, ignore_index=True)
    out = HERE / "stock_sample.csv"
    df.to_csv(out, index=False)
    print(f"Wrote {out} ({len(df)} rows across "
          f"{df['symbol'].nunique()} symbols)")


if __name__ == "__main__":
    main()