from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
from controller import openaq
