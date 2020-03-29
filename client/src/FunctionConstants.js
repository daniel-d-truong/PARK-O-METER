const serverUrl = "http://127.0.0.1:5000/"

const getParkingSpots = () => {
    fetch(serverUrl + "data").then((response) => response.json()).then((data) => {
        console.log(data);
    });
};