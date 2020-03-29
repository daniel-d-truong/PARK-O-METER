from flask import Flask
from flask_cors import CORS
from live_data import live_data
from messaging import messaging
from loc import loc
from config import google_api
from flask_socketio import SocketIO

app = Flask(__name__)
app.register_blueprint(live_data, url_prefix='/data')
app.register_blueprint(messaging, url_prefix='/messaging')
app.register_blueprint(loc, url_prefix='/loc')

# socketio stuff
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Hello world"

app.run()