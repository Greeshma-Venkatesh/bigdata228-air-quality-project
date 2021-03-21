"""
Generating insights.

Created on Sun Feb 21 20:19:35 2021

@author: jyotipatel
"""
import pandas as pd
import os
import pickle
from util import aqi_utility

datadir = os.path.abspath('../data')

def get_parameter_aqi_for_all_cities(data_df, unique_cities, unique_parameter):
    """Get insights by cities."""
    if not data_df:
        print("Error: Empty or null dataframe!")
        return
    for city in unique_cities:
        for parameter in unique_parameter:
            parameter_in_city_date = data_df.loc[
                (data_df['city'] == city) &
                (data_df['parameter'] == parameter)]
            print(parameter, parameter_in_city_date["value"].mean())
    return


def create_pm25_insights(str_date):
    filename = datadir + "/country/usa/" + str_date + "/processed_data/all_cities_usa.pkl"
    list_data = []
    with open(filename, 'rb') as f:
        list_data = pickle.load(f)
    df_pm25_city_aqi = pd.DataFrame(columns=['city', 'aqi', 'category', 'color_code'])
    for item in list_data:
        for param in item["parameters"]:
            if param["parameter"] == "pm25":
                c_low, c_high, i_low, i_high = aqi_utility.get_clow_chigh_ilow_ihigh_pm25(param["mean"])
                aqi = aqi_utility.calculate_aqi_usa(c_low, c_high, i_low, i_high, param["mean"])
                category, color_code = aqi_utility.get_aqi_category(aqi)
                df_pm25_city_aqi = df_pm25_city_aqi.append(
                    {'city': item["city"], 'aqi': aqi, 'category': category, 'color_code': color_code},
                    ignore_index=True)
    df_pm25_city_aqi.sort_values('aqi', ascending=False)
    df_pm25_city_aqi.to_csv(datadir + "/country/usa/" + str_date + "/insights/insights_usa_pm25.csv", encoding='utf-8', index=False)
    return


def create_insights_by_parameter(str_date, list_param):
    filename = datadir + "/country/usa/" + str_date + "/processed_data/all_cities_usa.pkl"
    list_data = []
    with open(filename, 'rb') as f:
        list_data = pickle.load(f)
    for parameter in list_param:
        df_param_city_aqi = pd.DataFrame(columns=['city', 'aqi', 'category', 'color_code'])
        for item in list_data:
            for param in item["parameters"]:
                if param["parameter"] == parameter:
                    c_low, c_high, i_low, i_high = aqi_utility.get_clow_chigh_ilow_ihigh_by_param(param["mean"], parameter)
                    aqi = aqi_utility.calculate_aqi_usa(c_low, c_high, i_low, i_high, param["mean"])
                    category, color_code = aqi_utility.get_aqi_category(aqi)
                    df_param_city_aqi = df_param_city_aqi.append(
                        {'city': item["city"], 'aqi': aqi, 'category': category, 'color_code': color_code},
                        ignore_index=True)
        df_param_city_aqi.sort_values('aqi', ascending=False)
        df_param_city_aqi.to_csv(datadir + "/country/usa/" + str_date + "/insights/insights_usa_" + parameter + ".csv", encoding='utf-8', index=False)
    return "Success"