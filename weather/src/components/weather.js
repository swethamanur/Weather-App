import React ,{Component} from 'react';

import '../App.css';


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


    render() {
        return(
            <div style={this.displayStatus()}>
                <p className="weather__key">Weather forecast for <span className="weather__value"> {this.props.city},{this.props.country}</span></p>

                <p align="center"  >
                    <h2 className="weather__value" ><img src={this.props.icon}/><text className="weather__value text-capitalize">{this.props.description}</text>{` `} 
                    {this.props.temperature}<b>{this.props.tempSymbol}</b></h2>
                    
                    
                </p>

            </div>
        )
    } 
} 

export default Weather;