import {Fragment, useEffect, useState, useContext, useCallback} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
import {getSuggestions, getPlaceInformation} from '../../../model/address_model';
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
    const [suggestions, setSuggestions] = useState([]);
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
        setCurrentlySelected(selected.STATE);
    }

    const onZipChange = event => {
        setEnteredZip(event.target.value);
        setCurrentlySelected(selected.ZIP);
    }

    const lostFocusHandler = () => {
        setCurrentlySelected(selected.NONE);
    }

    const focusHandler = (component) => {
        switch (component) {
            case 'street':
                setCurrentlySelected(selected.STREET);
                break;
            case 'city':
                setCurrentlySelected(selected.CITY);
                break;
            case 'state':
                setCurrentlySelected(selected.STATE);
                break;
            case 'zip':
                setCurrentlySelected(selected.ZIP);
                break;
        }

    }


    const lookupSuggestions = useCallback(async (address) => {
        return await getSuggestions(address, servCtx, currentUUID);
    }, []);

    useEffect(async () => {
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
            uuid: currentUUID
        }
        setSuggestions(await lookupSuggestions(address));
    }, [lookupSuggestions, firstRender, enteredStreet, enteredCity, enteredState, enteredZip, enteredId]);

    const onSelectionHandler = (address) => {
        setUUID(uuidv4());
        setEnteredStreet(address.street);
        setEnteredCity(address.city);
        setEnteredState(address.state);
        setEnteredId(address.id);
        getPlaceInformation(address.id, servCtx, currentUUID).then(place => {
            setEnteredZip(place.zip);
            const output = {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
                id: address.id
            };
            props.address(address);
        })

    }


    return (
        <div>
            <h2>{props.addressType}</h2>
            <AutocompleteInput
                label="Street"
                isRequired={false}
                value={enteredStreet}
                onChange={onStreetChange}
                suggestions={currentlySelected === 'street' && suggestions}
                suggestionType='address'
                onLostFocus={lostFocusHandler}
                onFocus={focusHandler}
                onSelection={onSelectionHandler}
                id="street"
                type="text"
            />
            <AutocompleteInput
                label="City"
                isRequired={false}
                value={enteredCity}
                onChange={onCityChange}
                suggestions={currentlySelected === 'city' && suggestions}
                suggestionType='address'
                onSelection={onSelectionHandler}
                id="city"
                onLostFocus={lostFocusHandler}
                onFocus={focusHandler}
                type="text"
            />
            <AutocompleteInput
                label="State"
                isRequired={false}
                value={enteredState}
                onChange={onStateChange}
                suggestions={currentlySelected === 'state' && suggestions}
                suggestionType='address'
                onSelection={onSelectionHandler}
                id="state"
                onLostFocus={lostFocusHandler}
                onFocus={focusHandler}
                type="text"
            />
            <AutocompleteInput
                label="Zipcode"
                isRequired={false}
                value={enteredZip}
                onChange={onZipChange}
                suggestions={currentlySelected === 'zip' && suggestions}
                suggestionType='address'
                onSelection={onSelectionHandler}
                id="zip"
                onLostFocus={lostFocusHandler}
                onFocus={focusHandler}
                type="text"
            />
        </div>
    );
}

export default AddressForm;