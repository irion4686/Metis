import {Fragment, useEffect, useState} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
import Script from 'react-load-script';
const AddressForm = (props) => {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: 0,
    });
    
    let streetSuggestions = [
    {
        street: "",
        city: "",
        state: "",
        zip: 0,
    }]

    const [enteredCity, setEnteredCity] = useState('');
    const [enteredState, setEnteredState] = useState('');

    if (props.suggestions != undefined && props.suggestions.length > 0) {
        streetSuggestions = props.suggestions;
    }

    const onStreetChange = event => {
        address.street = event.target.value;
        props.onClientChange(address);
    }

    const onCityChange = event => {
        setEnteredCity(event.target.value);
        console.log(event.target.value);
    }

    const onStateChange = event => {
        address.state = event.target.value;
        props.onClientChange(address);
    }

    const onZipChange = event => {
        address.zip = +event.target.value;
        props.onClientChange(address);
    }

    let autocomplete;
    const handleScriptLoad = () => {
        // Declare Options For Autocomplete
        const options = {
            types: ['(cities)'],
        };
        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            options,
        );

        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components and formatted
        // address.
        autocomplete.setFields(['address_components', 'formatted_address']);

        // Fire Event when a suggested name is selected
        autocomplete.addListener('place_changed', handlePlaceSelect);
    }

    const handlePlaceSelect = () => {

        // Extract City From Address Object
        const addressObject = autocomplete.getPlace();
        const address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            console.log('City: ', address[0].long_name);
            setEnteredCity(address[0].long_name);
            setEnteredState(address[1].long_name);
        }
    }

    return (
        <Fragment>
            <h2>{props.addressType}</h2>
            <AutocompleteInput
            label="Street"
            isRequired={false}
            value={props.value}
            onChange={onStreetChange}
            suggestions={streetSuggestions}
            id="firstName"
            type="text"
        />
        <div>
            <Script
                url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzE_8zg7BQGZgOA2XsI3Xrp_v_POPSIqc&libraries=places"
                onLoad={handleScriptLoad}
            />
            <input style={{backgroundColor:'transparent'}} id='autocomplete' type='text'  value={enteredCity} onChange={onCityChange}/>
        </div>

        {/*<AutocompleteInput
            label="City"
            isRequired={false}
            value={props.value}
            onChange={onCityChange}
            type="text"
        />*/}
        <AutocompleteInput
            label="State"
            isRequired={false}
            value={props.value}
            onChange={onStateChange}
            id="businessName"
            type="text"
        />
        <AutocompleteInput
            label="Zipcode"
            isRequired={false}
            value={props.value}
            onChange={onZipChange}
            id="email"
            type="text"
        />
        </Fragment>
    );
}

export default AddressForm;