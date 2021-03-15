import boto3
import pandas as pd
from util import utilities
import os

datadir = os.path.abspath('../data')

def fetch_openaq_raw_data_by_date(str_date, bucket_name, folder_name, zone):
    s3 = boto3.resource(
        service_name='s3',
        region_name=zone
    )
    list_df = []
    bucket = s3.Bucket(bucket_name)
    # date format yyyy-mm-dd
    folder_path = folder_name + '/' + str_date + '/'
    objs = list(bucket.objects.filter(Prefix=folder_path))
    for i in range(0, len(objs)):
        print(objs[i].key)
        s3file_obj = s3.Bucket(bucket_name).Object(objs[i].key).get()
        df = pd.read_json(s3file_obj['Body'], lines=True)
        print("New data shape:", df.shape)
        # print(df.head(2))
        list_df.append(df)
    print("Total data files fetched:", len(list_df))
    combined_data = pd.concat(list_df)
    # save the collected data
    combined_data.to_csv("openaqdata_" + str_date + ".csv", encoding='utf-8', index=False)
    return combined_data


def process_raw_data_by_date(str_date):
    df = pd.read_csv(datadir +
        '/country/usa/' + str_date + '/ingested_data/openaq_data.csv')
    data_by_country = df[df['country'] == "US"]
    unique_cities_usa = data_by_country['city'].unique()
    unique_parameter = df['parameter'].unique()
    list_usa_city_data = []
    for city in unique_cities_usa:
        dict_city = {}
        print("CITY:", city)
        dict_city["city"] = city
        list_parameter = []
        for parameter in unique_parameter:
            parameter_in_city_date = data_by_country.loc[
                (data_by_country['city'] == city) & (data_by_country['parameter'] == parameter)]
            city_mean = parameter_in_city_date["value"].mean()
            if (str(city_mean) != "nan"):
                dict_parameter = {}
                dict_parameter["parameter"] = parameter
                list_unit = parameter_in_city_date['unit'].unique()
                dict_parameter["mean"] = city_mean
                # print(parameter, city_mean, list_unit)
                dict_parameter["unit"] = list_unit[0]
                list_parameter.append(dict_parameter)
        dict_city["parameters"] = list_parameter
        list_usa_city_data.append(dict_city)
        filename = datadir + "/country/usa/" + str_date + "/processed_data/all_cities_usa.pkl"
        utilities.write_pickle_file(filename, list_usa_city_data)
    return

