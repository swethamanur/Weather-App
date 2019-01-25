import React, { Component } from 'react';
import './App.css';

import Header from './components/header';
import Data from './components/data';
import Weather from './components/weather';

class App extends Component {
  //state object
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: ''
  }

  //getWeather api call to open weather api
  getWeather = async (city,country) => {

    const API_KEY = "1911e7806c7269695eba06270946fda2";

    //api call using async await and fetch methods
      let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

    //converts incoming data to json readable format
      let response = await apiCall.json();
      console.log(response);

    //updating the state component  
    if(city && country){
      this.setState({
        temperature : response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description
      });
     
    }else{
      this.setState({
        error: 'please enter the city and country'
      })
    }
    }
  

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 title-container">
                  <Header/>
                </div>
                <div className="col-md-7 form-container">
                    <Data getWeather={this.getWeather}/>
                    <Weather city={this.state.city} country={this.state.country} temperature={this.state.temperature} humidity={this.state.humidity} description={this.state.description} />
                    <p>{this.state.error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

       

export default App;
