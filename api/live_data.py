from flask import Blueprint, request, jsonify
import pandas as pd
from sodapy import Socrata
import csv
from datetime import date
import time
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from math import cos, asin, sqrt

# Flow: Get each parking meter & location --> Get occupancy state

live_data = Blueprint('live_data', __name__)
client = Socrata("data.lacity.org", None)

today = str(date.today())

parking_occupancy = {}
parking_meters = {}
parking_locations = {}

def distance(lat1, lon1, lat2, lon2):
    p = 0.017453292519943295
    a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p)*cos(lat2*p) * (1-cos((lon2-lon1)*p)) / 2
    return 12742 * asin(sqrt(a))

def closest(v):
    return min(parking_locations, key=lambda p: distance(float(v[0]), float(v[1]), p[0], p[1]))

# Initial load in
def load_parking_meters():
    get_live_data(5000)

    with open("../data/parking_meters.csv", "r") as f:
        f = csv.reader(f, delimiter=',')
        next(f) #skips header
        for row in f:
            # print(row)
            space_id = row[0]

            # saved as (lat, long)
            loc = eval(row[8][1:-1])
            meter_info = {
                "blockFace": row[1],
                "meterType": row[2],
                "rateType": row[3],
                "rateRange": row[4], #convert this to float
                "meterTimeLimit": row[5],
                "parkingPolicy": row[6],
                "streetParking": row[7],
                "location": loc,
                "occupied": parking_occupancy[space_id]['occupied'] if space_id in parking_occupancy else False
            }
            parking_meters[space_id] = meter_info

            # store in locatnois dict
            parking_locations[loc] = space_id
            # print meter_info

    print("loaded data nice")


def update_occupancy():
    get_live_data(200)
    for space in parking_occupancy:
        if space not in parking_meters: continue

        if parking_meters[space]['occupied'] != parking_occupancy[space]['occupied']:
            print("{} has changed to {}".format(space, parking_occupancy[space]['occupied']))
        parking_meters[space]['occupied'] = parking_occupancy[space]['occupied']

def get_live_data(limit=2000):
    # First 2000 results, returned as JSON from API / converted to Python list of
    # dictionaries by sodapy.
    parking_meters = {}
    results = client.get("e7h6-4a3e", limit=limit)

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
    unoccupied_dict = { key:value for (key,value) in parking_meters.items() if not value["occupied"] }

    return {
        "occupied": occupied_dict,
        "unoccupied": unoccupied_dict
    }

@live_data.route('/closest/<lat>/<long>', methods=['GET'])
def getClosestSpot(lat, long):
    closest_loc = closest((lat, long))
    return {
        "lat": closest_loc[0],
        "long": closest_loc[1]
    }

load_parking_meters()

# print(parking_meters)
scheduler = BackgroundScheduler()
scheduler.add_job(func=update_occupancy, trigger="interval", seconds=10)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())