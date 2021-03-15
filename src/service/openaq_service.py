import os
import pandas as pd

datadir = os.path.abspath('../data')

def get_top_city_by_param_by_date(data):
    param = data["param"]
    str_date = data["data_date"]
    filenamepath = datadir + "/country/usa/" + str_date + "/insights/insights_usa_" + param + ".csv"
    print("Checking if file exits:", filenamepath)
    if os.path.exists(filenamepath):
        df = pd.read_csv(filenamepath)
        return True, df.head()
    else:
        print("Data doesn't exist!")
        return False, -1

