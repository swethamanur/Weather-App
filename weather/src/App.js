import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {ButtonGroup,Button,ButtonToolbar, ToggleButton} from 'react-bootstrap';

import Header from './components/header';
import Data from './components/data';
import Weather from './components/weather';
import HourUpdate from './components/hour';

class App extends Component {
  //state object
  state = {
    //for current weather update
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    weatherError: undefined,
    src:'',
    tempSymbol: 'ºF',
    
    //for hourly update
    hourlyTemperatures: [],
    times: [],
    dailyReport: [],
    icons: []
  };

  //convert from F to C
  getCelcius = () =>{
    if(this.state.tempSymbol === 'ºF' ){
      //rounding to one decimal place
      //Current weather
      this.setState({
        temperature : Math.round(((this.state.temperature -32) *5/9)* 10) / 10,
        tempSymbol : 'ºC'
      });

      //hourly weathers
      this.state.hourlyTemperatures.forEach((hour,index) => {
        
        let celciusHour = Math.round(((hour- 32) * 5/9)*10)/10;
        //pushing to the celcius array
        this.state.hourlyTemperatures[index] = celciusHour;        
      });
      
      
    }
    
  };

  //convert from C to F
  getFarenheit = () =>{

    if(this.state.tempSymbol === 'ºC'){
      //rounding to one decimal place
      this.setState({
        temperature : Math.round(((this.state.temperature *9/5) + 32) * 10)/10,
        tempSymbol : 'ºF'
      })
      //hourly weathers
      this.state.hourlyTemperatures.forEach((hour,index) => {
        
        let farenheitHour = Math.round(((hour* 5/9) +32)*10)/10;
        //pushing to the celcius array
        this.state.hourlyTemperatures[index] = farenheitHour;        
      });
      
    }
    
  }

  //getWeather api call to open weather api
  getWeather = async (city,country) => {
    //resetting the state object 
    this.setState({
      temperature: '',
      city: '',
      icon:'',
      country: '',
      humidity: '',
      description: '',
      weatherError:'',
      hourlyTemperatures: [],
      dailyReport: [],
      tempSymbol: 'ºF',
      tempUnits1: 'imperial',
      tempUnits2: 'I'
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
        icon: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
        weatherError: '',
        src: ''
      });
    }else if(response.cod === '404' && city ){
      this.setState({
        weatherError: 'This city is not found!',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oops_Stop_Sign_icon.svg/50px-Oops_Stop_Sign_icon.svg.png'
      })
    };

    //one more api call for hourly update
      axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${this.state.city},${this.state.country}&key=7d192036ace64638a6b7222064d44fe8&hours=6&units=I`).then((response) =>{
         // console.log(response.data);

          //error handling
        if(response.cod !== 404 && city){
          this.setState({dailyReport: [...this.state.dailyReport,response.data.data]});
          //console.log(this.state.dailyReport[0]);

          this.state.dailyReport[0].forEach((hour) => {
              //converting the localstamp time to am/pm format time, temp and the icons for hourly updated weather
              let time = (new Date(hour.timestamp_local).toLocaleString('en-US', { hour: 'numeric', hour12: true }));
              this.setState({
                times: [...this.state.times,time],
                icons: [...this.state.icons,hour.weather.icon],
                hourlyTemperatures: [...this.state.hourlyTemperatures,hour.temp]
              })
              
              console.log('temperatures',this.state.hourlyTemperatures);
              console.log('times',this.state.times)
          });
        }else{
          this.setState({
            weatherError: 'This city is not found!',
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oops_Stop_Sign_icon.svg/50px-Oops_Stop_Sign_icon.svg.png'
          })
        }
         
          
          
      });

     
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
                  <div className="row">
                    <div className="col-md-6">
                      <Data getWeather={this.getWeather}  />
                    </div> 
                    <div className="col-md-6"> 

                      <div className="d-flex flex-column-md-1">
                      <ButtonToolbar>
                        <Button variant="primary" size="sm" onClick={this.getCelcius}> ºC </Button>
                        <Button variant="primary" size="sm" onClick={this.getFarenheit}> ºF </Button>
                      </ButtonToolbar>
                      </div>

                      <Weather city={this.state.city} country={this.state.country} temperature={this.state.temperature} humidity={this.state.humidity} description={this.state.description} icon={this.state.icon} tempSymbol={this.state.tempSymbol} /><br/>
                      <br/>
                      <div  align="center">
                          <img src={this.state.src} /><br/>
                          <p className="weather__value"><b>{this.state.weatherError}</b></p>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-12" >  
                      <HourUpdate hourlyTemperatures={this.state.hourlyTemperatures} tempSymbol={this.state.tempSymbol} times={this.state.times} icons={this.state.icons}/>
                    </div>
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
