import React, {Component} from 'react';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Script from 'react-load-script';

class Data extends Component {
    state = {
        city : '',
        country : '',
        icon: '',
        errorHandle: ''
    };

    //setting on Change to the sercah box
    onChange = (e) => {
        this.setState({
            city : e.target.value
        });
       
    };

    //setting up the autocomplete object
    handleScriptLoad = ( ) => {
        console.log('loaded google api')
        //setting options for the autocomplete object
        let options = {
            types: ['(cities)']
        };

        //new autocomplete object
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),options);

        //event listener to this autocomplete object, calls the callback function 
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete.addListener('place_changed',this.handleSelectPlace)

    };

    //callback fn to get details of the selected place
    handleSelectPlace = () => {
        //getting the deatils of the place upon selecting usong the getPlace method
        let addressObject = this.autocomplete.getPlace();
console.log(addressObject)
        //assigning the array or the list of predictions upon the event
        let address = addressObject.address_components;

        //updating the state parameters
        this.setState({
            city: address[0].long_name,
            country: address[3].long_name
        })
    }
 
    //form submit event
    onSubmit = (e) => {
        this.setState({errorHandle: ''});
        e.preventDefault();
        //passing these parameters to App.js
        if(!this.state.city ){
            this.setState({errorHandle : 'Please enter value!'})
        }
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
                <Script  url="https://maps.googleapis.com/maps/api/js?&key=AIzaSyBOIIADyCTwYHKJsjDlF_uTCXjYDc3IYRc&libraries=places"
                onLoad={this.handleScriptLoad}/>
                <form onSubmit={this.onSubmit} >
                    <input id="autocomplete" type="text" placeholder="Enter place..." onChange={this.onChange} value={this.state.city}/>
                    <p className="weather__value">{this.state.errorHandle}</p>
                    <button>Get Weather</button>
                </form>
            </div>
        )
    }
};

export default Data