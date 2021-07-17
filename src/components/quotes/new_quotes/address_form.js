import {Fragment, useEffect, useState} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
import { getSuggestions } from '../../../model/address_model';

const AddressForm = (props) => {
    const [enteredStreet, setEnteredStreet] = useState('');
    const [enteredCity, setEnteredCity] = useState('');
    const [enteredState, setEnteredState] = useState('');
    const [enteredZip, setEnteredZip] = useState('');
    const [enteredId, setEnteredId] = useState('');
    const [firstRender, setFirstRender] = useState(false);
    
    let suggestions = [
    {
        street: "",
        city: "",
        state: "",
        zip: 0,
        id: ''
    }]

    let address = {
        street: '',
        city: '',
        state: '',
        zip: 0,
        id: ''
    }

    const selected = {
        STREET: "street",
        CITY: "city",
        STATE: "state",
        ZIP: "zip",
        NONE: "none"
    }
    let currentlySelected =  selected.NONE;

    if (props.suggestions != undefined && props.suggestions.length > 0) {

    }

    const onStreetChange = event => {
        setEnteredStreet(event.target.value);
    }

    const onCityChange = event => {
        setEnteredCity(event.target.value);
    }

    const onStateChange = event => {
        setEnteredState(event.target.value);
    }

    const onZipChange = event => {
        setEnteredZip(+event.target.value);
    }

    const lookupSuggestions = () => {
        suggestions = getSuggestions(address);
    };

    useEffect(() => {
        if (!firstRender) {
            setFirstRender(!firstRender);
            return;
        }
        const address = {
            street: enteredStreet,
            city: enteredCity,
            state: enteredState,
            zip: enteredZip,
            id: enteredId,
        }
        lookupSuggestions();
    }, [enteredStreet, enteredCity, enteredState, enteredZip, enteredId]);



    return (
        <Fragment>
            <h2>{props.addressType}</h2>
            <AutocompleteInput
            label="Street"
            isRequired={false}
            value={props.value}
            onChange={onStreetChange}
            suggestions={currentlySelected === 'street' && suggestions}
            id="street"
            type="text"
        />
        <AutocompleteInput
            label="City"
            isRequired={false}
            value={props.value}
            onChange={onCityChange}
            suggestions={currentlySelected === 'city' && suggestions}
            id="city"
            type="text"
        />
        <AutocompleteInput
            label="State"
            isRequired={false}
            value={props.value}
            onChange={onStateChange}
            suggestions={currentlySelected === 'state' && suggestions}
            id="state"
            type="text"
        />
        <AutocompleteInput
            label="Zipcode"
            isRequired={false}
            value={props.value}
            onChange={onZipChange}
            suggestions={currentlySelected === 'zip' && suggestions}
            id="zip"
            type="text"
        />
        </Fragment>
    );
}

export default AddressForm;