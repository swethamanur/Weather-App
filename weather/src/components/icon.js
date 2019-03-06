import React,{Component} from 'react';
import ReactAnimatedWeather from 'react-animated-weather';


class Icon extends Component{
    state={
        icon: this.props.icon
    }

    render(){
        return (
            <ReactAnimatedWeather icon={this.state.icon} color="white" size="64" animate="true" />
        )
    }
}

export default Icon 