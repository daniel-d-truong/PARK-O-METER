from flask import Blueprint
import pandas as pd
from sodapy import Socrata
import csv
from datetime import date
import config

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
                "occupied": parking_occupancy[space_id] if space_id in parking_occupancy else False
            }
            parking_meters[space_id] = meter_info


#TODO: Make function that acts as a handler to always get live data.

def get_live_data():
    # First 2000 results, returned as JSON from API / converted to Python list of
    # dictionaries by sodapy.
    results = client.get("e7h6-4a3e", limit=2000)

    # Convert to pandas DataFrame & filter/order data
    results_df = pd.DataFrame.from_records(results)
    mask = (results_df["eventtime"] >= today)

    results_df = results_df.loc[mask]
    
    # Store information in dict
    for index, row in results_df.iterrows():
        space_id = row['spaceid']

        if space_id not in parking_meters: continue

        occupied_str = row['occupancystate']
        parking_occupancy[space_id] = {
            "occupied": True if occupied_str == "OCCUPIED" else False
        }

@live_data.route('/', methods=['GET'])
def get():
    return "hello data"

load_parking_meters()
print(parking_meters)