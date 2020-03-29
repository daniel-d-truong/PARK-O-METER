from flask import Blueprint, request, jsonify
import pandas as pd
from sodapy import Socrata
import csv
from datetime import date
import time
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

# Flow: Get each parking meter & location --> Get occupancy state

live_data = Blueprint('live_data', __name__)
client = Socrata("data.lacity.org", None)

today = str(date.today())

parking_occupancy = {}
parking_meters = {}

# Initial load in
def load_parking_meters():
    get_live_data()

    with open("../data/parking_meters.csv", "r") as f:
        f = csv.reader(f, delimiter=',')
        next(f) #skips header
        for row in f:
            # print(row)
            space_id = row[0]
            meter_info = {
                "blockFace": row[1],
                "meterType": row[2],
                "rateType": row[3],
                "rateRange": row[4], #convert this to float
                "meterTimeLimit": row[5],
                "parkingPolicy": row[6],
                "streetParking": row[7],
                "latLng": row[8],
                "occupied": parking_occupancy[space_id]['occupied'] if space_id in parking_occupancy else False
            }
            parking_meters[space_id] = meter_info

    print("loaded data nice")


#TODO: Make function that acts as a handler to always get live data.
def update_occupancy():
    get_live_data()
    for space in parking_occupancy:
        if space not in parking_meters: continue

        if parking_meters[space]['occupied'] != parking_occupancy[space]['occupied']:
            print("{} has changed to {}".format(space, parking_occupancy[space]['occupied']))
        parking_meters[space]['occupied'] = parking_occupancy[space]['occupied']

def get_live_data():
    # First 2000 results, returned as JSON from API / converted to Python list of
    # dictionaries by sodapy.
    parking_meters = {}
    results = client.get("e7h6-4a3e", limit=2000)

    # Convert to pandas DataFrame & filter/order data
    results_df = pd.DataFrame.from_records(results)
    mask = (results_df["eventtime"] >= today)

    results_df = results_df.loc[mask]
    
    # Store information in dict
    for index, row in results_df.iterrows():
        space_id = str(row['spaceid'])

        if space_id in parking_meters: continue

        occupied_str = row['occupancystate']
        parking_occupancy[space_id] = {
            "occupied": True if occupied_str == "OCCUPIED" else False
        }

@live_data.route('/', methods=['GET'])
def get():
    occupied_dict = { key:value for (key,value) in parking_meters.items() if value["occupied"] }
    unoccupied_dict = { key:value for (key,value) in parking_meters.items() if !value["occupied"] }

    return {
        "occupied": occupied_dict,
        "unoccupied": unoccupied_dict
    }

load_parking_meters()

# print(parking_meters)
scheduler = BackgroundScheduler()
scheduler.add_job(func=update_occupancy, trigger="interval", seconds=10)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())