from main import app
from flask import request, jsonify
from service import openaq_service

@app.route('/')
def hello():
    return 'Hello, This is team Avenger OPENAQ project for class DATA228!'


@app.route('/openaq/get_data_by_date', methods=['GET', 'POST'])
def get_openaq_data_by_date():
    return


@app.route('/openaq/createInsightByParam', methods=['POST'])
def create_openaq_insight_by_param():
    data = request.get_json()
    return openaq_service.create_insights_by_parameter(data)


@app.route('/openaq/topCitiesByParam', methods=['GET', 'POST'])
def get_top_cities_by_param_by_date():
    data = request.get_json()
    isData, data_df = openaq_service.get_top_city_by_param_by_date(data)
    if isData:
        return data_df.to_json(orient='records')
    else:
        return jsonify({"msg": "Data doesn't exist!"})


@app.route('/openaq/topCitiesAllParamByDate', methods=['GET', 'POST'])
def get_top_cities_all_param_by_date():
    data = request.get_json()
    list_data = openaq_service.get_top_cities_all_param_by_date(data)
    return jsonify(list_data)


@app.route('/openaq/topCitiesAllParamBetweenDates', methods=['GET', 'POST'])
def get_top_cities_all_param_between_dates():
    data = request.get_json()
    list_data = openaq_service.get_top_cities_all_param_between_dates(data)
    return jsonify(list_data)


@app.route('/openaq/topCitiesDataUiChartWeekly', methods=['GET', 'POST'])
def get_top_cities_data_ui_chart_weekly():
    data = request.get_json()
    dict_data = openaq_service.get_top_cities_data_ui_chart_weekly(data)
    return jsonify(dict_data)


@app.route('/openaq/ingestProcessSaveData', methods=['POST'])
def ingest_process_save_data():
    data = request.get_json()
    return openaq_service.ingest_process_save_data_between_dates(data)