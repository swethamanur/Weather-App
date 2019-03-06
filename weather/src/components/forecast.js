import React, {Component} from 'react';

class Forecast extends Component{
    getStyle (){
        if(this.props.days.length>0){
            
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
        return (
            <div className="forecast__value" >
                <h2 className="weather__key" style={this.getStyle()}>10 Days Forecast </h2>

                {this.props.days.map((day,index) => {
                    return(
                        <div>
                            {day}<img  width="42" height="42" src={`https://www.weatherbit.io/static/img/icons/${this.props.forecastIcons[index]}.png`}/> {this.props.maxTemp[index]} , {this.props.minTemp[index]}<br/> 

                         </div>   
                    )
                })}

            </div>
        )
    }
}

export default Forecast;