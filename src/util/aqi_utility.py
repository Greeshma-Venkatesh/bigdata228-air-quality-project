import os

datadir = os.path.abspath('../../data')

# TODO Read i_high, i_low to get the values, c_high, c_low based on parameter


def calculate_aqi_usa(c_low, c_high, i_low, i_high, value):
    aqi = ((i_high - i_low) / (c_high - c_high)) * (value - c_low) + i_low
    return aqi