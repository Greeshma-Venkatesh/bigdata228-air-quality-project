from flask import Flask, request, jsonify
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, This is team Avenger OPENAQ project for class DATA228!'


@app.route('/openaq/get_data_by_date', methods=['GET', 'POST'])
def get_openaq_data_by_date():
    return


@app.route('/openaq/topCitiesByParam', methods=['GET', 'POST'])
def get_top_cities_by_param():
    data = request.get_json()
    return