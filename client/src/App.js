import React from 'react';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted : false,
      startingPoint : false,
    };
  }

  handleSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    this.setState({isSubmitted: true});
  };

  handleCurrentLocation = () => {
    this.setState({startingPoint: true});
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

  componentDidMount = () => this.handleClick()

  componentDidUpdate = () => this.handleClick()

  handleClick= () => {
    const { index, selected } = this.props
    if (index === selected) {
      setTimeout(() => {
        this.refs.map.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }

  render() {
    return (
      <div className="main">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        </style>
        <div className="titleSection">

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
              disabled={(this.state.startingPoint)? "disabled" : ""}/>
            <button
              className="input-current-location"
              type="button"
              onClick={this.handleCurrentLocation}
              >
              {(this.state.startingPoint)? "using your location!" : "use current location"}
            </button>
            <br />
            <input 
              type="text" 
              placeholder="destination" 
              className="location-input"
              id="destination-input"/>

          <button 
            className="submit-button" 
            type="submit"
            onClick={this.handleClick}>
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
