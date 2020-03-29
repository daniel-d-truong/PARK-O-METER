from flask import Flask
from flask_cors import CORS
from live_data import live_data
from messaging import messaging
from config import google_api

app = Flask(__name__)
app.register_blueprint(live_data, url_prefix='/data')
app.register_blueprint(messaging, url_prefix='/messaging')

CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Hello world"

app.run()