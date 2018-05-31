import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Moment from 'react-moment';

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
        <Today data={this.state.daily[0]} />
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

class Today extends Component {
  render() {
    if (!this.props.data) return (<div />)

    return (
      <Flexbox element="today" height="60px">
        <div className="left">  
          <div className="date">
            Today, <Moment format="MMM DD">{this.props.data.dt}</Moment>
          </div>
          <div className="temp max">{this.props.data.temp.max}&#176;</div>
          <div className="temp min">{this.props.data.temp.min}&#176;</div>    
        </div>
        <div className="right">
          <icon className={"i" + this.props.data.weather[0].icon} />
          <div className="condition">{this.props.data.weather[0].main}</div>
        </div>
      </Flexbox>
    );
  }
}