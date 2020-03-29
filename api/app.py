from flask import Flask
from flask_cors import CORS
from live_data import live_data

app = Flask(__name__)
app.config["DEBUG"] = True
app.register_blueprint(live_data, url_prefix='/data')

CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Hello world"

app.run()