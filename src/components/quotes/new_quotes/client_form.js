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

    let firstNameSuggestions = [
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
        firstNameSuggestions = props.suggestions;
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
                suggestions={firstNameSuggestions}
                suggestionType='client'
                id="firstName"
                type="text"
            />
            <AutocompleteInput
                label="Last Name"
                isRequired={false}
                value={props.value}
                onChange={onLastNameChange}
                type="text"
            />
            <AutocompleteInput
                label="Business Name"
                isRequired={false}
                value={props.value}
                onChange={onBusinessNameChange}
                id="businessName"
            type="text"
        />
        <AutocompleteInput
            label="Email"
            isRequired={true}
            value={props.value}
            onChange={onEmailChange}
            id="email"
            type="text"
        />
        <AutocompleteInput
            label="Phone"
            isRequired={true}
            value={props.value}
            onChange={onPhoneChange}
            id="phone"
            type="text"
        />
        </div>
    );
}

export default ClientForm;