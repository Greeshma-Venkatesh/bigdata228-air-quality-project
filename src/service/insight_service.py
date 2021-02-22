"""
Generating insights.

Created on Sun Feb 21 20:19:35 2021

@author: jyotipatel
"""


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
