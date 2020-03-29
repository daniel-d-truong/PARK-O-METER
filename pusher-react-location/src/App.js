    // src/App.js
    import React, { Component } from 'react';
    import GoogleMap from 'google-map-react';
    import axios from 'axios';
    import Pusher from 'pusher-js';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const mapStyles = {
      width: '100%',
      height: '100%'
    }

    const markerStyle = {
      height: '50px',
      width: '50px',
      marginTop: '-50px'
    }

    const imgStyle = {
      height: '100%'
    }


    const Marker = ({ title }) => (
      <div style={markerStyle}>
        <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
        <h3>{title}</h3>
      </div>
    );

    class App extends Component {

      constructor(props) {
        super(props)
        this.state = {
          center: { lat: 5.6219868, lng: -0.23223 },
          locations: {},
          users_online: [],
          current_user: ''
        }
      }
      
      render() {
        return (
          <div >
            <GoogleMap
              style={mapStyles}
              bootstrapURLKeys={{ key: 'AIzaSyBRZCHZ1k9f213BDHCoJFa2GD4VeGa4IbY' }}
              center={{ lat: 5.6219868, lng: -0.1733074 }}
              zoom={14}
            >
              <Marker
              title={'Current Location'}
              lat={5.6219868}
              lng={-0.1733074}
            >
              </Marker>
            </GoogleMap>
          </div>
        )
      }
    }

    export default App;