"""
Utilities.

Created on Sun Feb 21 20:19:35 2021

@author: jyotipatel
"""
import pickle
import pandas as pd

def get_unique_parameter(data_df):
    """Get unique parameters."""
    unique_parameter = []
    if data_df:
        unique_parameter = data_df['parameter'].unique()
        print("Unique cities:", unique_parameter)
    else:
        print("Error: Empty dataframe!")
    return unique_parameter


def get_unique_cities(data_df):
    """Get unique cities."""
    unique_cities = []
    if data_df:
        unique_cities = data_df['city'].unique()
        print("Unique cities:", unique_cities)
    else:
        print("Error: Empty dataframe!")
    return unique_cities


def get_unique_countries(data_df):
    """Get unique countries."""
    unique_countries = []
    if data_df:
        unique_countries = data_df['country'].unique()
        print("Unique country:", unique_countries)
    else:
        print("Error: Empty dataframe!")
    return unique_countries


def get_data_by_city(data_df, city):
    """Get data by city."""
    if data_df:
        return data_df[data_df['city'] == city]
    else:
        print("Error: Empty dataframe!")
        return


def get_data_by_country(data_df, country):
    """Get data by city."""
    if data_df:
        return data_df[data_df['country'] == country]
    else:
        print("Error: Empty dataframe!")
        return


def write_pickle_file(filename, object):
    with open(filename, 'wb') as f:
        pickle.dump(object, f)
    return "success"


def get_all_dates_between_dates(yyy_mm_dd_1, yyy_mm_dd_2):
    list_dates = list()
    df_dates = pd.date_range(yyy_mm_dd_1, yyy_mm_dd_2, freq='D')
    for time in df_dates:
        str_time = time.strftime('%Y-%m-%d')
        list_dates.append(str_time)
    return list_dates