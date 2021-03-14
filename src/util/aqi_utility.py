import os
import pandas as pd

datadir = os.path.abspath('../../data')
df_aqi_pm25 = pd.read_csv(datadir + '/country/usa/aqi/aqi_pm25_us.csv')
df_aqi_range_usa = pd.read_csv(datadir + '/country/usa/aqi/aqi_range_us.csv')

def calculate_aqi_usa(c_low, c_high, i_low, i_high, value):
    aqi = ((i_high - i_low) / (c_high - c_low)) * (value - c_low) + i_low
    return aqi


def get_clow_chigh_ilow_ihigh_pm25(mean_pm25):
    for i in range(0, df_aqi_pm25.shape[0]):
        c_low = df_aqi_pm25.iloc[i]["c_low"]
        c_high = df_aqi_pm25.iloc[i]["c_high"]
        i_low = df_aqi_range_usa.iloc[i]["i_low"]
        i_high = df_aqi_range_usa.iloc[i]["i_high"]
        if mean_pm25 >= c_low and mean_pm25 <= c_high:
            return c_low, c_high, i_low, i_high


def get_aqi_category(aqi):
    for i in range(0, df_aqi_range_usa.shape[0]):
        if aqi >= df_aqi_range_usa.iloc[i]["i_low"] and aqi <= df_aqi_range_usa.iloc[i]["i_high"]:
            return df_aqi_range_usa.iloc[i]["category"], df_aqi_range_usa.iloc[i]["color_code"]

