import os
import pandas as pd
from service import insight_service

datadir = os.path.abspath('../data')

def get_top_city_by_param_by_date(data):
    param = data["param"]
    str_date = data["data_date"]
    position = data["pos"]
    filenamepath = datadir + "/country/usa/" + str_date + "/insights/insights_usa_" + param + ".csv"
    print("Checking if file exits:", filenamepath)
    if os.path.exists(filenamepath):
        df = pd.read_csv(filenamepath)
        if "top" in position.lower():
            df.sort_values(by=['aqi'], inplace=True)
        else:
            df.sort_values(by=['aqi'], inplace=True, ascending=False)
        return True, df.head()
    else:
        print("Data doesn't exist!")
        return False, -1

def get_top_cities_all_param_by_date(data):
    list_aqi_data = []
    list_param = data["param"]
    str_date = data["data_date"]
    position = data["pos"]
    for param in list_param:
        dict_aqi_data = {}
        dict_aqi_data["param"] = param
        filenamepath = datadir + "/country/usa/" + str_date + "/insights/insights_usa_" + param + ".csv"
        print("Checking if file exits:", filenamepath)
        if os.path.exists(filenamepath):
            df = pd.read_csv(filenamepath)
            if "top" in position.lower():
                df.sort_values(by=['aqi'], inplace=True)
            else:
                df.sort_values(by=['aqi'], inplace=True, ascending=False)
            dict_aqi_data["data"] = df.head().to_json(orient='records')
        else:
            dict_aqi_data["data"] = []
        list_aqi_data.append(dict_aqi_data)
    return list_aqi_data

def create_insights_by_parameter(data):
    str_date = data["data_date"]
    list_param = data["param"]
    return insight_service.create_insights_by_parameter(str_date, list_param)


def ingest_process_save_data_between_dates(data):
    start_date = data["start_date"]
    end_date = data["end_date"]
    return insight_service.ingest_process_save_data_between_dates(start_date, end_date)