import React, {Component} from 'react';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Data extends Component {
    state = {
        city : '',
        country : ''
    };

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        //passing these parameters to App.js
        this.props.getWeather(this.state.city,this.state.country);
        //reseting the values in input
        this.setState({
            city: '',
            country: ''
        })
    }


    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit} >
                    <input name="city" type="text" placeholder="Enter City..." onChange={this.onChange} value={this.state.city}/>
                    <input name="country" type="text" placeholder="Enter Country..." onChange={this.onChange} value={this.state.country}/>
                    <button>Get Weather</button>
                </form>
            </div>
        )
    }
};

export default Data