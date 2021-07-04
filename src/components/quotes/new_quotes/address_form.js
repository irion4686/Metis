import { Fragment, useState } from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
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
    },
]

    if (props.suggestions != undefined && props.suggestions.length > 0) {
        streetSuggestions = props.suggestions;
    }

    const onStreetChange = event => {
        address.street = event.target.value;
        props.onClientChange(address);
    }

    const onCityChange = event => {
        address.city = event.target.value;
        props.onClientChange(address);
    }

    const onStateChange = event => {
        address.state = event.target.value;
        props.onClientChange(address);
    }

    const onZipChange = event => {
        address.zip = +event.target.value;
        props.onClientChange(address);
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
        <AutocompleteInput
            label="City"
            isRequired={false}
            value={props.value}
            onChange={onCityChange}
            type="text"
        />
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