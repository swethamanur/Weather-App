import React, {Component} from 'react';
import axios from 'axios';

class HourUpdate extends Component{

    getStyle (){
        if(this.props.hourlyTemperatures.length>0){
            
            return {
                display: 'contents'
            }
        }else{
            return {
                display: 'none'
            }
        }
    };


       
    
    render(){
        return(
            <div className="weather__value"  style={this.getStyle()}>
                
                <div className="row" >
                {/*Returning the hourly update belonging to a day */}
                
                        {this.props.hourlyTemperatures.map((hourTemp,index) => {
                            
                            if(index < this.props.end && index >= this.props.start){
                                return (
                                        <div className="col-md-2" align="right">
                                            
                                                {hourTemp}{this.props.tempSymbol}<br/>
                                                <img width="42" height="42" src={`https://www.weatherbit.io/static/img/icons/${this.props.icons[index]}.png`}/><br/>
                                                {this.props.times[index]}
                                                
                                        </div>   
                                )
                            }
                        })}
                    
                
                </div>
                
            </div>
        )
    
}
}

export default HourUpdate