import React ,{Component} from 'react';
import '../App.css';

class Weather extends Component{

    //display data only after reciving unput from user
    displayStatus (){
        console.log('hello');
        if(this.props.city && this.props.country){
            return {
                display: 'contents'
            }
        }else{
            return {
                display: 'none'
            }
        }
    }

    render() {
        return(
            <div style={this.displayStatus()} >
                <p className="weather__key">Weather forecast for <span className="weather__value"> {this.props.city},{this.props.country}</span></p>
                <p className="weather__key">Temperature : <span className="weather__value"> {this.props.temperature}</span></p>
                <p className="weather__key">Humidity: <span className="weather__value"> {this.props.humidity}</span></p>
                <p className="weather__key">Description: <span className="weather__value"> {this.props.description}</span></p>
            </div>
        )
    } 
} 

export default Weather;