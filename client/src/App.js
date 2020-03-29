import React from 'react';
import { Icon } from '@iconify/react';
import carOutlined from '@iconify/icons-ant-design/car-outlined';
import Geocode from "react-geocode";

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
      destinationLongitude: 'none'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCurrentLocation = this.handleCurrentLocation.bind(this);
    this.renderMapInfo = this.renderMapInfo.bind(this);
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

  renderMapInfo = () => {
    return (
      <div className="mapSection">
        <br /><br />
        <div className="actualMap">
        </div>

        <div className="parking">
        </div>
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
  
      const form = {
        current: this.state.currentLocation,
        dest: this.state.destination
      };

      // database.push(form);
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
            TITLE TITLE TITLE TITLE
          </h1>

          <h2 className="subtitle">
            subtitle subtitle subtitle subtitle subtitle
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
