export const serverUrl = "http://127.0.0.1:5000/"

export const getParkingSpots = (marker_data) => {
    fetch(serverUrl + "data").then((response) => response.json()).then((data) => {
        marker_data["data"] = data;
    });
};