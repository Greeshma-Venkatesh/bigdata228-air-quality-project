from flask import Flask, request, jsonify
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
from controller import openaq