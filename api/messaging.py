from flask import Blueprint, request, jsonify
from config import account_sid, auth_token
from twilio.rest import TwilioRestClient
from twilio.twiml import Response

messaging = Blueprint('messaging', __name__)
client = TwilioRestClient(account_sid, auth_token)
fromNum = '+12569603855'

def send_message(toNum='+17147869188', body='hello'):
    message = client.messages.create(
        to=toNum,
        from_=fromNum,
        body=body,
    )
    print(message.sid)

@messaging.route('/', methods=['POST'])
def main():
    json_req = request.json
    print(json_req)
    send_message(json_req['toNum'], json_req['body'])
    return "message sent"

@messaging.route("/sms", methods=['GET', 'POST'])
def sms_ahoy_reply():
    """Respond to incoming messages with a friendly SMS."""
    number = request.form['From']
    message_body = request.form['Body']

    # Start our response
    resp = Response()

    # Add a message
    resp.message("Hype, {}. This works! You just sent: {}".format(number, message_body))

    return str(resp)