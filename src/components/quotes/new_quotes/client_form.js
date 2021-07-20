import {useState, useEffect} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";

const emailValidator = require("email-validator");
const GooglePhone = require('google-libphonenumber');
const phoneUtil = GooglePhone.PhoneNumberUtil.getInstance();

const ClientForm = (props) => {
    const selected = {
        FIRST: 'first',
        LAST: 'last',
        BUSINESS: 'business',
        EMAIL: 'email',
        PHONE: 'phone',
        NONE: 'none'
    }

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
    const [emailIsValid, setEmailValid] = useState(false);
    const [phoneIsValid, setPhoneValid] = useState(false);
    const [currentlySelected, setCurrentlySelected] = useState(selected.NONE);
    const [enteredFirstName, setFirstName] = useState('');
    const [enteredLastName, setLastName] = useState('');
    const [enteredBusinessName, setBusinessName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredPhone, setPhone] = useState('');
    const [currentCustId, setCustId] = useState(0);

    if (props.suggestions.length > 0) {
        suggestions = props.suggestions;
    }
    const onFocusHandler = (id) => {
        switch (id) {
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
    const lostFocusHandler = (id) => {
        setCurrentlySelected(selected.NONE);
        if (id === 'phone') {
            try {
                const countryCode = '+1'
                const parsed = phoneUtil.parse(countryCode + enteredPhone)
                const formatted = phoneUtil.format(parsed, GooglePhone.PhoneNumberFormat.NATIONAL);
                setPhone(formatted);
            } catch (error) {
                setPhoneValid(false);
            }
        }
    }

    const onFirstNameChange = event => {
        setCurrentlySelected(selected.FIRST);
        const input = event.target.value;
        setFirstName(input);
        console.log(input);
        setFirstNameValid(input.trim().length !== 0)
    }

    const onLastNameChange = event => {
        setCurrentlySelected(selected.LAST);
        setLastName(event.target.value);
    }

    const onBusinessNameChange = event => {
        setCurrentlySelected(selected.BUSINESS);
        setBusinessName(event.target.value);
    }

    const onEmailChange = event => {
        const input = event.target.value;
        setCurrentlySelected(selected.EMAIL);
        setEmail(input);
        setEmailValid(emailValidator.validate(input));
    }

    const onPhoneChange = event => {
        const input = event.target.value;
        setCurrentlySelected(selected.PHONE);
        setPhone(input);
        const countryCode = '+1'
        try {
            const value = phoneUtil.parse(countryCode + input);
            setPhoneValid(phoneUtil.isPossibleNumber(value));
        } catch (error) {
            setPhoneValid(false);
        }
    }

    useEffect(() => {
        const client = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            businessName: enteredBusinessName,
            email: enteredEmail,
            phone: enteredPhone,
            id: "",
        };
        props.onClientChange(client);
        props.isValid(firstNameValid && emailIsValid && phoneIsValid)
    }, [enteredFirstName, enteredLastName, enteredBusinessName, enteredEmail, enteredPhone, firstNameValid, emailIsValid, phoneIsValid]);

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
            isValid={emailIsValid}
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
            isValid={phoneIsValid}
            isRequired={true}
            value={enteredPhone}
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