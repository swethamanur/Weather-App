import React ,{Component} from 'react';

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
                <h2>Weather forecast for {this.props.city},{this.props.country}</h2>
                <p>Temperature : {this.props.temperature}</p>
                <p>Humidity: {this.props.humidity}</p>
                <p>Description: {this.props.description}</p>
            </div>
        )
    } 
} 

export default Weather;