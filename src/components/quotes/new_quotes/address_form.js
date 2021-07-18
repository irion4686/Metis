import {Fragment, useEffect, useState, useContext, useCallback} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
import { getSuggestions } from '../../../model/address_model';
import ServerContext from "../../../store/server-context";
import {v4 as uuidv4} from 'uuid';

const AddressForm = (props) => {
    const selected = {
        STREET: "street",
        CITY: "city",
        STATE: "state",
        ZIP: "zip",
        NONE: "none"
    }

    const [enteredStreet, setEnteredStreet] = useState('');
    const [enteredCity, setEnteredCity] = useState('');
    const [enteredState, setEnteredState] = useState('');
    const [enteredZip, setEnteredZip] = useState('');
    const [enteredId, setEnteredId] = useState('');
    const [firstRender, setFirstRender] = useState(false);
    const [currentUUID, setUUID] = useState(uuidv4());
    const [currentlySelected, setCurrentlySelected] = useState(selected.NONE);
    const servCtx = useContext(ServerContext);

    const dummySuggestions = [
        {
            "street": "60 Roland Court",
            "city": "Burgaw",
            "state": "NC",
            "zip": 0,
            "id": "ChIJb-43c_eGqYkReYORLJ5HRfI"
        },
        {
            "street": "60 Possum Ridge Road",
            "city": "Rocky Point",
            "state": "NC",
            "zip": 0,
            "id": "ChIJqZcx2UGFqYkR71jL6H9p0vg"
        },
        {
            "street": "60 W Snowberry Ln",
            "city": "Rocky Point",
            "state": "NC",
            "zip": 0,
            "id": "ChIJ87xPsO6FqYkRuVu7Lt_SpyY"
        },
        {
            "street": "60 Minuteman Road",
            "city": "Currie",
            "state": "NC",
            "zip": 0,
            "id": "ChIJ-U5ewv4vqokR5j9fExIib48"
        },
        {
            "street": "60 Lone Star Ct",
            "city": "Rocky Point",
            "state": "NC",
            "zip": 0,
            "id": "ChIJQwBatIYnqokRojDm723bvLQ"
        }
    ]

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

    if (props.suggestions !== undefined && props.suggestions.length > 0) {

    }

    const onStreetChange = event => {
        setEnteredStreet(event.target.value);
        setCurrentlySelected(selected.STREET);
    }

    const onCityChange = event => {
        setEnteredCity(event.target.value);
        setCurrentlySelected(selected.CITY);
    }

    const onStateChange = event => {
        setEnteredState(event.target.value);
        currentlySelected(selected.STATE);
    }

    const onZipChange = event => {
        setEnteredZip(+event.target.value);
        currentlySelected(selected.ZIP);
    }


    const lookupSuggestions = useCallback(async (add) => {
        //return await getSuggestions(address, servCtx, currentUUID);
        //console.log(suggestions);
    }, [suggestions]);

    useEffect(async () => {
        if (!firstRender) {
            setFirstRender(!firstRender);
            return;
        }
        address = {
            street: enteredStreet,
            city: enteredCity,
            state: enteredState,
            zip: enteredZip,
            id: enteredId,
            uuid: currentUUID
        }
        //suggestions = await lookupSuggestions();
    }, [lookupSuggestions, firstRender, enteredStreet, enteredCity, enteredState, enteredZip, enteredId]);



    return (
        <div>
            <h2>{props.addressType}</h2>
            <AutocompleteInput
                label="Street"
                isRequired={false}
                value={props.value}
                onChange={onStreetChange}
                suggestions={currentlySelected === 'street' && dummySuggestions}
                suggestionType='address'
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
        </div>
    );
}

export default AddressForm;