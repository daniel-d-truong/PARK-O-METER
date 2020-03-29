import React from 'react';
import './App.css'

class App extends React.Component {

  handleSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    alert("TESTING: submitted!");
  };

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
              id="start-input"/>
            <br />
            <input 
              type="text" 
              placeholder="destination" 
              className="location-input"
              id="destination-input"/>

          <button 
            className="submit-button" 
            type="submit">
               let's go!
            </button>

          </form>


        </div>
        <div className="mapSection">
          MAP
        </div>
        <footer className="footer">
          hello
        </footer>
      </div>
    );
  }
}

export default App;
