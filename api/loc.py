from flask import Blueprint, request, jsonify
from live_data import free_parking_locations
from math import cos, asin, sqrt
from config import google_api
import requests

loc = Blueprint('loc', __name__)

def distance(lat1, lon1, lat2, lon2):
    p = 0.017453292519943295
    a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p)*cos(lat2*p) * (1-cos((lon2-lon1)*p)) / 2
    return 12742 * asin(sqrt(a))

def closest(v):
    return min(free_parking_locations, key=lambda p: distance(float(v[0]), float(v[1]), p[0], p[1]))

def getDirections(loc1, loc2):
    url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        'origin': '{},{}'.format(loc1[0], loc1[1]),
        'destination': '{},{}'.format(loc2[0], loc2[1]),
        'key': google_api
    }
    print google_api
    r = requests.get(url = url, params = params)
    data = r.json()
    return data

@loc.route('/<lat1>,<long1>,<lat2>,<long2>')
def closestRoute(lat1, long1, lat2, long2):
    return getDirections((lat1, long1), closest((lat2, long2)))

@loc.route('/closest/<lat>/<long>', methods=['GET'])
def getClosestSpot(lat, long):
    closest_loc = closest((lat, long))
    return {
        "lat": closest_loc[0],
        "long": closest_loc[1]
    }