import React,{Component} from 'react';

let getCelcius = () => {
    if(this.state.tempSymbol === 'ºF' ){
        //rounding to one decimal place
        //Current weather
        this.setState({
          temperature : Math.round(((this.state.temperature -32) *5/9)* 10) / 10,
          tempSymbol : 'ºC'
        });
  
        //hourly weathers
        this.convertTemperatureUnits(this.state.hourlyTemperatures,this.state.tempSymbol);
  
        //forcast weathers
        this.convertTemperatureUnits(this.state.minTemp,this.state.tempSymbol);
        this.convertTemperatureUnits(this.state.maxTemp,this.state.tempSymbol);
      }
}

export default getCelcius;