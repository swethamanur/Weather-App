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
    weatherError: undefined,
    src:''
  }

  //getWeather api call to open weather api
  getWeather = async (city,country) => {
    //resetting the state object 
    this.setState({
      temperature: '',
      city: '',
      country: '',
      humidity: '',
      description: '',
      weatherError:''
      })
    const API_KEY = "1911e7806c7269695eba06270946fda2";

    //api call using async await and fetch methods
      let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);

    //converts incoming data to json readable format
      let response = await apiCall.json();

    //updating the state component  
    if(response.cod !== '404'){
      this.setState({
        temperature : response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        weatherError: '',
        src: ''
      });
    }else if(response.cod === '404' && city ){
      this.setState({
        weatherError: 'This city is not found!',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oops_Stop_Sign_icon.svg/50px-Oops_Stop_Sign_icon.svg.png'
      })
    };
    


  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-4 title-container">
                  <Header/>
                </div>
                <div className="col-md-8 form-container">
                    <Data getWeather={this.getWeather}  />
                    <Weather city={this.state.city} country={this.state.country} temperature={this.state.temperature} humidity={this.state.humidity} description={this.state.description} /><br/>
                    <br/>
                    <div  align="center">
                        <img src={this.state.src} /><br/>
                        <p className="weather__value"><b>{this.state.weatherError}</b></p>
                    </div>
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
