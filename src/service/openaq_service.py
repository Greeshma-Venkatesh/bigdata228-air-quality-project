import os
import pandas as pd
from service import insight_service
from util import utilities
from util import aqi_utility
import json

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
            df = df.head()
            dict_aqi_data["data"] = json.loads(df.to_json(orient='records'))
        else:
            dict_aqi_data["data"] = []
        list_aqi_data.append(dict_aqi_data)
    print(list_aqi_data)
    return list_aqi_data

def get_top_cities_all_param_between_dates(data):
    final_result_list = []
    list_param = data["param"]
    start_date = data["start_date"]
    end_date = data["end_date"]
    position = data["pos"]
    list_dates = utilities.get_all_dates_between_dates(start_date, end_date)
    dict_aqi_data_by_param_by_city = get_dictonary_avg_aqi_between_dates_all_param(list_param, list_dates)
    #print("DICTIONARY:", dict_aqi_data_by_param_by_city)
    for param_key in dict_aqi_data_by_param_by_city.keys():
        list_aqi_data = []
        result_dict_by_param = {}
        dict_cities_by_param = dict_aqi_data_by_param_by_city[param_key]
        sorted_keys = []
        if "top" in position.lower():
            sorted_keys = sorted(dict_cities_by_param.items(), key=lambda x: x[1]["avgaqi"])
        else:
            sorted_keys = sorted(dict_cities_by_param.items(), key=lambda x: x[1]["avgaqi"], reverse=True)
        for tup in sorted_keys[0:5]:
            result_dict_by_tup = {}
            category, color_code = aqi_utility.get_aqi_category(tup[1]["avgaqi"])
            result_dict_by_tup["city"] = tup[0]
            result_dict_by_tup["aqi"] = tup[1]["avgaqi"]
            result_dict_by_tup["category"] = category
            result_dict_by_tup["color_code"] = color_code
            list_aqi_data.append(result_dict_by_tup)
        result_dict_by_param["data"] = list_aqi_data
        result_dict_by_param["param"] = param_key
        final_result_list.append(result_dict_by_param)
    print(final_result_list)
    return final_result_list

def get_dictonary_avg_aqi_between_dates_all_param(list_param, list_dates):
    dict_aqi_data_by_param_by_city = {}
    for param in list_param:
        if param not in dict_aqi_data_by_param_by_city.keys():
            dict_aqi_data_by_param_by_city[param] = dict()
        for str_date in list_dates:
            filenamepath = datadir + "/country/usa/" + str_date + "/insights/insights_usa_" + param + ".csv"
            print("Checking if file exits:", filenamepath)
            if os.path.exists(filenamepath):
                file_obj = open(filenamepath, "r")
                i = 0
                for line in file_obj:
                    if i != 0:
                        line = line.strip()
                        arr = line.split(',')
                        if arr[0] in dict_aqi_data_by_param_by_city[param].keys():
                            dict_aqi_data_by_param_by_city[param][arr[0]]["sumaqi"] += float(arr[1])
                            dict_aqi_data_by_param_by_city[param][arr[0]]["count"] += 1
                            dict_aqi_data_by_param_by_city[param][arr[0]]["avgaqi"] = dict_aqi_data_by_param_by_city[param][arr[0]]["sumaqi"] / dict_aqi_data_by_param_by_city[param][arr[0]]["count"]
                        else:
                            dict_aqi_data_by_param_by_city[param][arr[0]] = dict()
                            dict_aqi_data_by_param_by_city[param][arr[0]]["sumaqi"] = float(arr[1])
                            dict_aqi_data_by_param_by_city[param][arr[0]]["count"] = 1
                            dict_aqi_data_by_param_by_city[param][arr[0]]["avgaqi"] = float(dict_aqi_data_by_param_by_city[param][arr[0]]["sumaqi"]) / int(dict_aqi_data_by_param_by_city[param][arr[0]]["count"])
                    else:
                        i += 1
                        continue
    return dict_aqi_data_by_param_by_city

def get_top_cities_data_ui_chart_weekly(data):
    list_city_param_aqi = []
    list_weekly_data = get_top_cities_all_param_between_dates(data)
    dict_by_city = {}
    for item in list_weekly_data:
        for dat in item["data"]:
            if dat["city"] in dict_by_city.keys():
                dict_by_city[dat["city"]][item["param"]] = dat["aqi"]
            else:
               dict_by_city[dat["city"]] = dict()
               dict_by_city[dat["city"]][item["param"]] = dat["aqi"]  
    return dict_by_city

def create_insights_by_parameter(data):
    str_date = data["data_date"]
    list_param = data["param"]
    return insight_service.create_insights_by_parameter(str_date, list_param)


def ingest_process_save_data_between_dates(data):
    start_date = data["start_date"]
    end_date = data["end_date"]
    return insight_service.ingest_process_save_data_between_dates(start_date, end_date)
