import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import './App.css';

var Api = require('./utils/api');

class App extends Component {
  state = {
    daily: null
  };

  cities = ['Atlanta']; 
  citiesWeather = []; // API cache
  currentCity = 0; // Index of current city displayed

  // Called before the render method is executed
  componentWillMount = () => {
    this.fetchData();
  }
  
  fetchData = () => {
    
    // Get the data from the cache if possible
    if (this.citiesWeather[this.currentCity]) {
        this.updateData();   
    } else {
        // Request new data to the API
        Api.get(this.cities[this.currentCity])
        .then(function(data) {
            this.citiesWeather[this.currentCity] = data;
            this.updateData();
        }.bind(this));
    }
  }
  
  updateData = () => {
    // Update the data for the UI
    this.setState({
        daily: this.citiesWeather[this.currentCity].list,
    });    
  }


  render() {
    if (!this.state.daily) { return <div/> } // do not render until data is present

    return (
      <div className="App"> 
        <AppHeader />
      </div>  
    );
  }
}
export default App;

class AppHeader extends Component {
  render() {
    return (
      <Flexbox element="header" height="60px">
          <logo />
      </Flexbox>
    );
  }
}