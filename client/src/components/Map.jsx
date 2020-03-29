import React from 'react';
import socketIOClient from 'socket.io-client';
import {serverUrl} from '../FunctionConstants'
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import {getParkingSpots} from '../FunctionConstants';


const mapStyles = {
    width: '100%',
    height: '100%',
    // position: 'relative',
    // overflow: "visible"
}

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this
        fetch(serverUrl + "data").then((response) => response.json()).then((data) => {
            this.setState({
                center: { lat: 34.0689, lng: -118.4452 },
                loadedMarkers: true,
                data: data
            });
        });
        // const socket = socketIOClient(serverUrl);
        // socket.on("update parking", data => console.log(data));
    }

    renderMarkers() {
        const occupied = this.state.data["occupied"];
        const occupiedMarkers = Object.keys(occupied).splice(0, 3000).map((streetid) => 
            <Marker
                title={streetid}
                type="taken"
                lat={occupied[streetid]["location"][0]}
                lng={occupied[streetid]["location"][1]}
            />
        );

        const unoccupied = this.state.data["unoccupied"];

        const unoccupiedMarkers = Object.keys(unoccupied).splice(0, 3000).map((streetid) => 
            <Marker
                title={streetid}
                type="free"
                lat={unoccupied[streetid]["location"][0]}
                lng={unoccupied[streetid]["location"][1]}
            />
        );

        return [...occupiedMarkers, ...unoccupiedMarkers]
    };

    render() {
        return (
            <GoogleMap
              style={mapStyles}
              bootstrapURLKeys={{ key: 'AIzaSyBRZCHZ1k9f213BDHCoJFa2GD4VeGa4IbY' }}
              center={{ lat: 34.0689, lng: -118.4452  }}
              zoom={14}
            >
              {/* <Marker
              title={'Current Location'}
              type="blue"
              lat={5}
              lng={-0.1733074} />

             <Marker
              title={'Current Location'}
              type="red"
              lat={5.82}
              lng={-0.1733074} />

              <Marker
              title={'Current Location'}
              type="taken"
              lat={6.2}
              lng={-0.1733074} />

              <Marker
              title={'Current Location'}
              type="free"
              lat={7}
              lng={-0.1733074} /> */}
              {this.state && this.state.data && this.renderMarkers()}

            </GoogleMap>
        )
      }
}

export default Map;