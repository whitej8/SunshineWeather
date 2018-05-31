import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import Moment from 'react-moment'

import './App.css'

var Api = require('./utils/api')

class App extends Component {
  state = {
    daily: null
  }

  cities = ['Atlanta'] 
  citiesWeather = [] // API cache
  currentCity = 0 // Index of current city displayed

  // Called before the render method is executed
  componentWillMount = () => {
    this.fetchData()
  }
  
  fetchData = () => {
    
    // Get the data from the cache if possible
    if (this.citiesWeather[this.currentCity]) {
        this.updateData()   
    } else {
        // Request new data to the API
        Api.get(this.cities[this.currentCity])
        .then(function(data) {
            this.citiesWeather[this.currentCity] = data
            this.updateData()
        }.bind(this))
    }
  }
  
  updateData = () => {
    // Update the data for the UI
    this.setState({
        daily: this.citiesWeather[this.currentCity].list,
    })    
  }


  render() {
    if (!this.state.daily) { return <div/> } // do not render until data is present

    return (
      <div className="App"> 
        <AppHeader />
        <Today data={this.state.daily[0]} />
        <Future data={this.state.daily} />        
      </div>  
    )
  }
}
export default App

class AppHeader extends Component {
  render() {
    return (
      <Flexbox element="header" height="60px">
          <logo />
      </Flexbox>
    )
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
    )
  }
}

class FutureRow extends Component {

  dateRow = (d, ndx) => {
    if (ndx === 1) {
      return ('Tomorrow')
    } else {
      <Moment format='dddd'>{d}</Moment>
    }
  }

  render() {
    return (
      <div className="futureRow">
        <div className="c1">
          <icon className={"i" + this.props.icon} />
        </div>
        <div className="c2">
          <div className="date">{this.dateRow(this.props.dt, this.props.ndx)}</div>
          <div className="condition">{this.props.main}</div>
        </div>  
        <div className="c3">
          <div className="temp max">{this.props.tempMax}&#176;</div>
          <div className="temp min">{this.props.tempMin}&#176;</div>           
        </div>
      </div>
    )
  }
}

class Future extends Component {

  rows = Array(this.props.data.length)

  render() {
    if (!this.props.data) { return (<div />)}
  
    // return ( <div> {[...Array(this.props.data.length)].map((x, i) => <FutureRow data={this.props.data[i]} ndx={i} key={i}/> )}d </div> )
    return (<div />)
  }
}