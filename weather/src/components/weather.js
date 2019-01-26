import React ,{Component} from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

import '../App.css';
import App from '../App';
import Icon from '../components/icon';

class Weather extends Component{
    state={
        icon: ''
    }
    //display data only after reciving unput from user
    displayStatus (){
       
        if(this.props.city && this.props.country){
            
            return {
                display: 'contents'
            }
        }else{
            return {
                display: 'none'
            }
        }
    };

    getIcon = () => {
        
        console.log('onload')
        let weatherIcon = '';
        console.log('inside');
                if(this.props.description === 'clear sky') {
                    weatherIcon = "CLEAR_DAY";      
                }else if (this.props.description === 'rainy') {
                    weatherIcon = "RAIN";      
                }else if (this.props.description === 'few clouds') {
                    weatherIcon = "PARTLY_CLOUDY_DAY";      
                }else if(this.props.description === 'snow'){
                    weatherIcon = "SNOW"
                }else if(this.props.description === 'thunderstorm'){
                    weatherIcon = 'WIND'
                }else if(this.props.description === 'broken clouds'){
                    weatherIcon = 'CLOUDY'
                }else if(this.props.description === 'scattered clouds'){
                    weatherIcon = 'CLOUDY'
                }else if(this.props.description === 'mist'){
                    weatherIcon = 'FOG'
                }
                this.setState({icon: weatherIcon});
                console.log(this.state.icon)
        
        
    }
    

    render() {
        return(
            <div style={this.displayStatus()}>
                <p className="weather__key">Weather forecast for <span className="weather__value"> {this.props.city},{this.props.country}</span></p>

                <p align="center"  onClick={this.getIcon}>
                    <h2 className="weather__value" >{this.props.temperature} F</h2>
                    <text className="weather__value">{`${this.props.description}`.charAt(0).toUpperCase() + `${this.props.description}`.slice(1)}</text><br/>
                    <ReactAnimatedWeather icon={this.state.icon} color="white" size="70" animate="true"/>
                </p>

            </div>
        )
    } 
} 

export default Weather;