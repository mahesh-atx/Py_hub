"""Generate a deterministic weather + air quality dataset for Project 8.

A realistic 3-year daily series for two Indian cities with genuine gaps
(sensor outages), a couple of encoding-style quirks, and a sensor error
(AQI of 9999) so learners can practise outlier judgement.

Deterministic: same seed -> byte-identical CSV.

Run:  python data/make_weather_data.py
"""

import random
from pathlib import Path

import numpy as np
import pandas as pd

SEED = 7
HERE = Path(__file__).resolve().parent

CITIES = {
    "Delhi": {"base_temp": 25.0, "amp": 11.0, "aqi": 165, "aqi_var": 55},
    "Mumbai": {"base_temp": 28.0, "amp": 4.0, "aqi": 78, "aqi_var": 25},
}


def main() -> None:
    rng = np.random.default_rng(SEED)
    frames = []
    for city, cfg in CITIES.items():
        dates = pd.date_range("2022-01-01", periods=1095, freq="D",
                              tz="Asia/Kolkata")
        n = len(dates)
        day_of_year = dates.dayofyear.to_numpy()
        # Temp peaks in mid-summer (~day 195): phase the cosine so January is
        # the cold season and July the hot season for both cities.
        seasonal = cfg["amp"] * np.cos(2 * np.pi * (day_of_year - 195) / 365.0)
        temp = cfg["base_temp"] + seasonal + rng.normal(0, 1.6, n)
        rain = np.maximum(0, rng.gamma(0.55, 2.2, n))
        if city == "Mumbai":
            rain *= (1 + 1.8 * ((day_of_year > 105) & (day_of_year < 300)))
        # Humidity peaks with the monsoon (Aug), drier in winter.
        humidity = np.clip(58 + 8 * np.sin(2 * np.pi * (day_of_year - 210) / 365.0)
                           + rng.normal(0, 7, n), 20, 99)
        pressure = 1006 + 6 * np.cos(2 * np.pi * day_of_year / 365.0) \
            + rng.normal(0, 4, n)
        wind = np.clip(np.abs(rng.normal(7, 4.5, n)), 0.2, 45)
        aqi = np.clip(cfg["aqi"] + cfg["aqi_var"] * np.sin(2 * np.pi
                       * (day_of_year - 340) / 365.0)
                      + rng.normal(0, 18, n), 20, 500)

        df = pd.DataFrame({
            "date": dates.strftime("%Y-%m-%d"),
            "city": city,
            "temp_c": np.round(temp, 1),
            "rain_mm": np.round(rain, 1),
            "humidity_pct": np.round(humidity, 0).astype(int),
            "pressure_hpa": np.round(pressure, 1),
            "wind_kmh": np.round(wind, 1),
            "aqi": np.round(aqi, 0).astype(int),
        })
        frames.append(df)

    df = pd.concat(frames, ignore_index=True)

    # Sensor outages: 72 consecutive missing hours for Delhi (Feb 14-16, 2023)
    # and 10 scattered missing days for Mumbai.
    outage = (df["city"] == "Delhi") & (
        (df["date"] >= "2023-02-14") & (df["date"] <= "2023-02-16")
    )
    df.loc[outage, ["temp_c", "humidity_pct", "pressure_hpa", "aqi"]] = np.nan
    rng2 = random.Random(SEED)
    for _ in range(12):
        idx = rng2.randrange(len(df))
        df.loc[idx, ["temp_c", "humidity_pct", "pressure_hpa", "aqi"]] = np.nan

    # Sensor error: one impossible AQI spike (9999) for Delhi in November.
    spike_idx = df[(df["city"] == "Delhi") & (df["date"] == "2022-11-15")].index
    if len(spike_idx):
        df.loc[spike_idx, "aqi"] = 9999

    # A real pollution spike worth keeping: Diwali 2022 (Oct 24) in Delhi.
    diwali_idx = df[(df["city"] == "Delhi") & (df["date"] == "2022-10-24")].index
    if len(diwali_idx):
        df.loc[diwali_idx, "aqi"] = 452

    out = HERE / "weather_sample.csv"
    df.to_csv(out, index=False)
    print(f"Wrote {out} ({len(df)} rows, "
          f"{int(df['aqi'].isna().sum()) + int(df['temp_c'].isna().sum())} "
          f"missing cells)")


if __name__ == "__main__":
    main()