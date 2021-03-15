from main import app
from flask import request, jsonify
from service import openaq_service

@app.route('/')
def hello():
    return 'Hello, This is team Avenger OPENAQ project for class DATA228!'


@app.route('/openaq/get_data_by_date', methods=['GET', 'POST'])
def get_openaq_data_by_date():
    return


@app.route('/openaq/topCitiesByParam', methods=['GET', 'POST'])
def get_top_cities_by_param_by_date():
    data = request.get_json()
    data_df = openaq_service.get_top_city_by_param_by_date(data)
    return data_df.to_json(orient='records')
