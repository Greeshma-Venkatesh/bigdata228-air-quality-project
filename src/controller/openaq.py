from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, This is team Avenger OPENAQ project for class DATA228!'

@app.route('/openaq/get_data_by_date')
def get_openaq_data_by_date():
    return
