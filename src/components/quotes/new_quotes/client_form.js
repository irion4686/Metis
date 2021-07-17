import {useState} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
const ClientForm = (props) => {
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

    if (props.suggestions.length > 0) {
        firstNameSuggestions = props.suggestions;
    }

    const onFirstNameChange = event => {
        client.firstName = event.target.value;
        console.log(client);
        props.onClientChange(client);
    }

    const onLastNameChange = event => {
        client.lastName = event.target.value;
        props.onClientChange(client);
    }

    const onBusinessNameChange = event => {
        client.businessName = event.target.value;
        props.onClientChange(client);
    }

    const onEmailChange = event => {
        client.email = event.target.value;
        props.onClientChange(client);
    }

    const onPhoneChange = event => {
        client.phone = event.target.value;
        props.onClientChange(client);
    }

    return (
        <div>
            <h2>Client</h2>
            <AutocompleteInput
            label="First Name"
            isRequired={false}
            value={props.value}
            onChange={onFirstNameChange}
            suggestions={firstNameSuggestions}
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
            isRequired={false}
            value={props.value}
            onChange={onEmailChange}
            id="email"
            type="text"
        />
        <AutocompleteInput
            label="Phone"
            isRequired={false}
            value={props.value}
            onChange={onPhoneChange}
            id="phone"
            type="text"
        />
        </div>
    );
}

export default ClientForm;