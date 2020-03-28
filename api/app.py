from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/', methods=['GET'])
def home():
    return "Hello world"

app.run()