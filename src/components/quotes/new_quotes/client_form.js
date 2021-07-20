import {useState} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";

const ClientForm = (props) => {
    const selected = {
        FIRST: 'first',
        LAST: 'last',
        BUSINESS: 'business',
        EMAIL: 'email',
        PHONE: 'phone',
        NONE: 'none'
    }
    const [client, setClient] = useState({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        phone: "",
        id: "",
    });

    let suggestions = [
        {
            firstName: "",
            lastName: "",
            businessName: "",
            email: "",
            phone: "",
            id: "",
        },
    ]
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [currentlySelected, setCurrentlySelected] = useState(selected.NONE);

    if (props.suggestions.length > 0) {
        suggestions = props.suggestions;
    }
    const onFocusHandler = (id) => {
        switch(id) {
            case 'first':
                setCurrentlySelected(selected.FIRST);
            case 'last':
                setCurrentlySelected(selected.LAST);
            case 'business':
                setCurrentlySelected(selected.BUSINESS);
            case 'email':
                setCurrentlySelected(selected.EMAIL);
            case 'phone':
                setCurrentlySelected(selected.PHONE);
        }
    }
    const lostFocusHandler = () => {
        setCurrentlySelected(selected.NONE);
    }

    const onFirstNameChange = event => {
        setCurrentlySelected(selected.FIRST);
        let input = event.target.value;
        client.firstName = input;
        props.onClientChange(client);
        if (input.trim().length > 0) {
            setFirstNameValid(true)
        }
    }

    const onLastNameChange = event => {
        setCurrentlySelected(selected.LAST);
        client.lastName = event.target.value;
        props.onClientChange(client);
    }

    const onBusinessNameChange = event => {
        setCurrentlySelected(selected.BUSINESS);
        client.businessName = event.target.value;
        props.onClientChange(client);
    }

    const onEmailChange = event => {
        setCurrentlySelected(selected.EMAIL);
        client.email = event.target.value;
        props.onClientChange(client);
    }

    const onPhoneChange = event => {
        setCurrentlySelected(selected.PHONE);
        client.phone = event.target.value;
        props.onClientChange(client);
    }

    return (
        <div>
            <h2>Client</h2>
            <AutocompleteInput
                label="First Name"
                isValid={firstNameValid}
                isRequired={true}
                value={props.value}
                onChange={onFirstNameChange}
                suggestions={currentlySelected === 'first' && suggestions}
                suggestionType='client'
                onFocus={onFocusHandler}
                onLostFocus={lostFocusHandler}
                id="firstName"
                type="text"
            />
            <AutocompleteInput
                label="Last Name"
                isRequired={false}
                value={props.value}
                onChange={onLastNameChange}
                suggestions={currentlySelected === 'last' && suggestions}
                onFocus={onFocusHandler}
                onLostFocus={lostFocusHandler}
                suggestionType='client'
                type="text"
            />
            <AutocompleteInput
                label="Business Name"
                isRequired={false}
                value={props.value}
                onChange={onBusinessNameChange}
                suggestions={currentlySelected === 'business' && suggestions}
                onFocus={onFocusHandler}
                onLostFocus={lostFocusHandler}
                suggestionType='client'
                id="business"
            type="text"
        />
        <AutocompleteInput
            label="Email"
            isRequired={true}
            value={props.value}
            onChange={onEmailChange}
            suggestions={currentlySelected === 'email' && suggestions}
            onFocus={onFocusHandler}
            onLostFocus={lostFocusHandler}
            suggestionType='client'
            id="email"
            type="text"
        />
        <AutocompleteInput
            label="Phone"
            isRequired={true}
            value={props.value}
            onChange={onPhoneChange}
            suggestions={currentlySelected === 'phone' && suggestions}
            onFocus={onFocusHandler}
            onLostFocus={lostFocusHandler}
            suggestionType='client'
            id="phone"
            type="text"
        />
        </div>
    );
}

export default ClientForm;