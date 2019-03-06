import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {ButtonGroup,Button,ButtonToolbar, ToggleButton,Carousel} from 'react-bootstrap';


import moment from 'moment';

import Header from './components/header';
import Data from './components/data';
import Weather from './components/weather';
import HourUpdate from './components/hour';
import Forecast from './components/forecast';
import Today from './components/today';

class App_2 extends Component {
    //state object
    state = {
      //for current weather update
      temperature: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      weatherError: undefined,
      src:'',
      tempSymbol: 'ºF',
      sunrise: '',
      sunset:'',
      humidity: undefined,
      cloudiness: '',
      wind: '',
      visibility: '',
      maximumTemp:'',
      minimumTemp:'',
  
      //for hourly update
      hourlyTemperatures: [],
      times: [],
      dailyReport: [],
      icons: [],
  
      //for 7 days forcast
      days: [],
      minTemp:[],
      maxTemp: [],
      forecastIcons:[],
  
      //for carousel
      index: 0,
      direction: null,
      controls: false,
      indicators: false
    };
  
    //convert from F to C
    getCelcius = () =>{
      if(this.state.tempSymbol === 'ºF' ){
        //rounding to one decimal place
        //Current weather
        this.setState({
          temperature : this.convertTemperatureUnits(this.state.temperature,this.state.tempSymbol),
          minimumTemp: this.convertTemperatureUnits(this.state.minimumTemp,this.state.tempSymbol),
          maximumTemp: this.convertTemperatureUnits(this.state.maximumTemp,this.state.tempSymbol),
          tempSymbol : 'ºC'
        });
  
        //hourly weathers
        this.convertTemperatureUnits(this.state.hourlyTemperatures,this.state.tempSymbol);
  
        //forcast weathers
        this.convertTemperatureUnits(this.state.minTemp,this.state.tempSymbol);
        this.convertTemperatureUnits(this.state.maxTemp,this.state.tempSymbol);
      }
      
    };
  
    //convert from C to F
    getFarenheit = () =>{
  
      if(this.state.tempSymbol === 'ºC'){
        //rounding to one decimal place
        this.setState({
          temperature : this.convertTemperatureUnits(this.state.temperature,this.state.tempSymbol),
          minimumTemp: this.convertTemperatureUnits(this.state.minimumTemp,this.state.tempSymbol),
          maximumTemp: this.convertTemperatureUnits(this.state.maximumTemp,this.state.tempSymbol),
          tempSymbol : 'ºF'
        });
  
        //hourly weathers
        this.convertTemperatureUnits(this.state.hourlyTemperatures,this.state.tempSymbol);
  
         //forcast weathers
         this.convertTemperatureUnits(this.state.minTemp,this.state.tempSymbol);
         this.convertTemperatureUnits(this.state.maxTemp,this.state.tempSymbol);
      }
    };
  
    //functions to convert from F to C or C to F
  
    convertTemperatureUnits = (temperatures,tempSymbol) => {
      console.log(Array.isArray(temperatures))
     if(Array.isArray(temperatures)){
      temperatures.forEach((temperature,index) => {
        if(tempSymbol === "ºF"){
          let celciusHour = this.round(((temperature- 32) * 5/9));
          //pushing to the celcius array
          temperatures[index] = celciusHour; 
        }else{
          let farenheitHour = this.round(((temperature* 9/5) +32));
          //pushing to the farehnit array
          temperatures[index] = farenheitHour;
        }
      })
     } else {
      if(tempSymbol ===  "ºF"){
        return this.round((temperatures -32) *5/9);

      }else{
        return this.round(((temperatures* 9/5) +32));
      }
     }
    };
  
    //generating day from timestamp
    getDay = (eachDay) => {
      let weekdays = ['Monday','Tuesday','Wednesday','Thurdsay','Friday','Saturday','Sunday'];
      let weekday = new Date(eachDay.datetime).getDay();
      let day = weekdays[weekday];
      return day      
    };
  
    //convert timestamp unix value to raedable time format
    getTime = (timestamp) => {
      //let date = timestamp*1000 + (new Date(timestamp*1000).getTimezoneOffset())*60*1000;
      let date= new Date(timestamp*1000);
     
      var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      let time = new Date(formattedDate).toLocaleString('en-US', { hour: 'numeric', hour12: true });
      console.log(formattedDate,time);
      return time
    };
  
    //round function to one point decimal
    round = (value) => {
      return Math.round(value*10)/10 
    };
  
    //carousel handle select 
    handleSelectCarousel = (selectedIndex, e) => {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
        controls: true
      });
    };
  
    //style contenets for carousel(hourly update)
    getStyle = () => {
      if(this.state.hourlyTemperatures) 
        return{
          display: "contents"
        }
      else
        return{
          display: "none"
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
        tempUnits2: 'I',
        days: [],
        minTemp:[],
        maxTemp: [],
        forecastIcons:[],
        sunrise: '',
        sunset:'',
        cloudiness: '',
        wind: '',
        visibility: '',
        controls: false,
        maximumTemp:'',
         minimumTemp:'',
        })
      const API_KEY_1 = "1911e7806c7269695eba06270946fda2";
      const API_KEY_2 ='7d192036ace64638a6b7222064d44fe8';
  
      //api call using async await and fetch methods
        let apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY_1}&units=imperial`);
  
      //converts incoming data to json readable format
        let response = await apiCall.json();
  
      //updating the state component  
      if(response.cod !== '404'){
        this.setState({
          temperature : response.main.temp,
          city: response.name,
          country: response.sys.country,
          description: response.weather[0].description,
          icon: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
          weatherError: '',
          src: '',
          //today's updates
          humidity: `${response.main.humidity}%`,
          sunrise: this.getTime(response.sys.sunrise),
          sunset: this.getTime(response.sys.sunset),
          cloudiness: `${response.clouds.all} %`,
          wind: `${response.wind.speed} mph`,
          visibility: `${this.round(response.visibility/1690)}m`,
          minimumTemp: response.main.temp_min,
          maximumTemp: response.main.temp_max,
        });
      }else if(response.cod === '404' && city ){
        this.setState({
          weatherError: 'This city is not found!',
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oops_Stop_Sign_icon.svg/50px-Oops_Stop_Sign_icon.svg.png'
        })
      };
  
      //one more api call for hourly update
        axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?city=${this.state.city},${this.state.country}&key=${API_KEY_2}&hours=16&units=I`).then((response) =>{
           
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
  
  
        //forecast for next 7 days
        axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${this.state.city},${this.state.country}&key=${API_KEY_2}&units=I`).then((res) => {
          console.log(res.data.data);
          let data = res.data.data;
          
            data.forEach((eachDay,index) => {
              if(index <= 10 && index > 0){
                //generating day, minTemp and maxTemp
                this.setState({
                  days: [...this.state.days,this.getDay(eachDay)],
                  maxTemp: [...this.state.maxTemp,eachDay.max_temp],
                  minTemp: [...this.state.minTemp,eachDay.min_temp],
                  forecastIcons: [...this.state.forecastIcons,eachDay.weather.icon]
                })
              }
  
            });
            console.log(this.state.days);
            console.log(data);
          
        })
  
       
    }
    render(){
      return(
        <div className="wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 title-container">
                        <Header/><br/>
                        <Data getWeather={this.getWeather}/>
                        <div className="d-flex flex-column-md-1">
                          <ButtonToolbar>
                            <Button variant="primary" size="sm" onClick={this.getCelcius} value={this.state.tempSymbol}> ºC </Button>
                            <Button variant="primary" size="sm" onClick={this.getFarenheit} value={this.state.tempSymbol}> ºF </Button>
                          </ButtonToolbar>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                          <Weather city={this.state.city} country={this.state.country} temperature={this.state.temperature} humidity={this.state.humidity} description={this.state.description} icon={this.state.icon} tempSymbol={this.state.tempSymbol} minimumTemp={this.state.minimumTemp} maximumTemp={this.state.maximumTemp}/><br/>
                          <br/>
                          <div  align="center">
                              <img src={this.state.src} /><br/>
                              <p className="weather__value"><b>{this.state.weatherError}</b></p>
                          </div>
                        </div>
                        <hr style={{color: 'white'}}></hr>
                        <div>
                          <Today sunrise={this.state.sunrise} sunset={this.state.sunset} humidity={this.state.humidity} visibility={this.state.visibility} cloudiness={this.state.cloudiness} wind={this.state.wind} />
                        </div>

                    </div>
                    <div className="col-md-5">
                        <div>
                          <Forecast days={this.state.days} minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} forecastIcons={this.state.forecastIcons}/>
                        </div>
                    </div>

                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="forecast__value">Hourly Update</h2>
                    <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelectCarousel} controls={this.state.controls} indicators={this.state.indicators}  >
                        <Carousel.Item  >
                          <HourUpdate hourlyTemperatures={this.state.hourlyTemperatures} tempSymbol={this.state.tempSymbol} times={this.state.times} icons={this.state.icons} start="0" end="5"/>

                        </Carousel.Item>
                        <Carousel.Item>
                          <HourUpdate  hourlyTemperatures={this.state.hourlyTemperatures} tempSymbol={this.state.tempSymbol} times={this.state.times} icons={this.state.icons} start="5" end="10"/>

                        </Carousel.Item>
                        <Carousel.Item > 
                          <HourUpdate hourlyTemperatures={this.state.hourlyTemperatures} tempSymbol={this.state.tempSymbol} times={this.state.times} icons={this.state.icons} start="10" end="15"/>

                        </Carousel.Item>
                    </Carousel>  
                  </div>
                </div>
            </div>
        
        
        </div>

      )
        
    }  
}
export default App_2;