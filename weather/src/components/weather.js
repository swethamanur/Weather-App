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
                    <h2 className="weather__value" >{this.props.temperature}<b>{this.props.tempSymbol}</b></h2>
                    <text className="weather__value">{`${this.props.description}`.charAt(0).toUpperCase() + `${this.props.description}`.slice(1)}</text><br/>
                    <img src={this.props.icon}/>
                </p>

            </div>
        )
    } 
} 

export default Weather;