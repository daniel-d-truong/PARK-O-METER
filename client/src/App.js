import React from 'react';
import { Icon } from '@iconify/react';
import carOutlined from '@iconify/icons-ant-design/car-outlined';
import Geocode from "react-geocode";
import Map from './components/Map';

import './App.css';

Geocode.setApiKey("AIzaSyBRZCHZ1k9f213BDHCoJFa2GD4VeGa4IbY");
Geocode.setLanguage("en");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted : false,
      startingPoint : false,
      currentLocation: 'none',
      currentLocationLatitude: 'none',
      currentLocationLongitude: 'none',
      destination: 'none',
      destinationLatitude: 'none',
      destinationLongitude: 'none',
      numberSubmitted : false,
      number : 'none'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCurrentLocation = this.handleCurrentLocation.bind(this);
    this.renderMapInfo = this.renderMapInfo.bind(this);
    this.parkingSpots = this.parkingSpots.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStartingInput = this.handleStartingInput.bind(this);
    this.geolocation = this.geolocation.bind(this);
  }

  handleSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    this.setState({
      isSubmitted: true,
    })
  };

  textSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    this.setState({
      numberSubmitted: true,
    })

    if(this.state.numberSubmitted === true) {
        console.log("welcome to Twilio!");
    }
  }

  handleCurrentLocation = (e) => {
    this.setState({startingPoint: true, currentLocation: e.target.value});
  }

  handleStartingInput = (e) => {
    this.setState({currentLocation: e.target.value});
    console.log(e.target.value);
  }

  handleDestinationInput = (e) => {
    this.setState({currentLocation: e.target.value});
    console.log(e.target.value);
  }

  handleNumberInput = (e) => {
    this.setState({currentLocation: e.target.value});
    console.log(e.target.value);
  }

  renderMapInfo = () => {
    return (
      <div className="mapSection">
        <br /><br />
        <div className="actualMap">
          <Map />
          <h2 className="subtitle">Directions</h2>
          <div>1) Turn right at the light to merge onto I-5</div>
          <div>2) Take exit 85A for CA-73 N toward Long Beach</div>
          <div>3) Continue onto CA-73 N Toll road</div>
          <div>4) Take exit 18A on the left to merge onto I-405 N toward Long Beach</div>
          <div>5) You're here at your destination! </div>

        </div>

        <div className="parking">
          <div className="directions">
              <h2 className="subtitle">parking</h2>
              {this.parkingSpots()}

              <form onSubmit={this.textSubmit}>
                <input 
                  type="text" 
                  placeholder="text me the open spots!" 
                  className="text-input"
                  id="destination-input"
                  onChange={(e) => this.handleNumberInput(e)}
                  />
                <button 
                  className="submit-button-small" 
                  type="submit"
                  >
                    let's go!
                  </button>
              </form>
          </div>
        </div>
      </div>
    )
  }

  parkingSpots = () => {
    return (
      <div>
        <div>WV82 is available</div>
        <div>CC782 is available</div>
        <div>SV96 is available</div>
        <div>CT260 is available</div>
        <div>CT369A is available</div>
        <div>CT115 is available</div>
        <div>LT297 is available</div>
        <div>ED783 is available</div>
        <div>SV96 is available</div>
      </div>
    )
  }

  geolocation = () => {
    if(!this.props.isGeolocationAvailable) {
      alert("Your browser does not support Geolocation");
      this.setState({startingPoint: false});
    }
    else if(!this.props.isGeolocationEnabled) {
      alert("Geolocation is not enabled");
      this.setState({startingPoint: false});
    }
    else {
      this.setState({
        currentLocationLatitude: this.props.coords.latitude,
        currentLocationLongitude: this.props.coords.longitude
      })
    }
  }
  componentDidMount = () => this.handleClick()

  componentDidUpdate = () => this.handleClick()

  handleClick = () => {
    const { index, selected } = this.props
    if (index === selected) {
      setTimeout(() => {
        this.refs.map.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }

  handleMap = () => {
    var address;
    address  = this.state.destination;

    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        this.setState({
          destinationLatitude: lat,
          destinationLongitude: lng
        });
      },
      error => {
        console.error(error);
      }
    );

    if((this.state.currentLocation).localeCompare('none') !== 0) {
      address = this.state.currentLocation;

      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
  
          this.setState({
            currentLocationLatitude: lat,
            currentLocationLongitude: lng
          });
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  render() {
    return (
      <div className="main">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        </style>
        <div className="titleSection">

          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>

          <h1 className="title">
            parkometer
          </h1>

          <h2 className="subtitle">
            saving you the trouble of parking today!
          </h2>

          <form 
            onSubmit={this.handleSubmit} 
            className="form">
  
            <input 
              type="text" 
              placeholder="starting point" 
              className="location-input"
              id="start-input"
              disabled={(this.state.startingPoint)? "disabled" : ""}
              onChange={(e) => this.handleStartingInput(e)}
            />
            <button
              className="input-current-location"
              type="button"
              onClick={e => this.handleCurrentLocation(e)}
              >
              {(this.state.startingPoint) ? "using your location!" : "use current location"}
              {(this.state.startingPoint) ? this.geolocation() : null}
            </button>
            <br />
            <input 
              type="text" 
              placeholder="destination" 
              className="location-input"
              id="destination-input"
              onChange={(e) => this.handleDestinationInput(e)}
              />
          <button 
            className="submit-button" 
            type="submit"
            onClick={this.handleMap}
            >
              <Icon icon={carOutlined} /> <br />
               let's go!
            </button>

          </form>
        </div>

        {this.state.isSubmitted ? this.renderMapInfo(): null}
        <div ref="map" />
        <footer className="footer">
          
        </footer>
      </div>
    );
  }
}

export default App;
