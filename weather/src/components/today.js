import React, {Component} from 'react';

class Today extends Component{

    displayStyle=() => {
        if(this.props.humidity){
            return{
                display: 'contents'
            }
        }else{
            return{
                display: 'none'
            }
        }
    }

    render(){
        return(
            <div className="today__value" style={this.displayStyle()}>
                <div className="row">
                    <div className="col">
                        <img width="42" heigh="42" style={{backgroundColor: "gray"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uTei1Jwk2m4-k-ijbNdRh4I8U12hSQaPuWwFrxxkxqTfmWjD"/>: {this.props.sunrise}
                    </div>
                    <div className="col">
                        SUNSET: {this.props.sunset}

                    </div>
                </div><br/>
                <div className="row">
                    <div className="col">
                        HUMIDITY: {this.props.humidity}
                    </div>
                    <div className="col">
                        CLOUDS: {this.props.cloudiness}

                    </div>
                </div><br/>
                <div className="row">
                    <div className="col">
                        VISIBILITY: {this.props.visibility}
                    </div>
                    <div className="col">
                        WIND: {this.props.wind}

                    </div>
                </div>

            </div>
        )
    }
}

export default Today