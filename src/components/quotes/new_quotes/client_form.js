import {useState, useEffect, useContext, useCallback} from "react"
import AutocompleteInput from "../../ui/input/autocomplete_input";
import {getSuggestions} from '../../../model/client_model';
import ServerContext from "../../../store/server-context";

const emailValidator = require("email-validator");
const GooglePhone = require('google-libphonenumber');
const phoneUtil = GooglePhone.PhoneNumberUtil.getInstance();

const ClientForm = ({onClientChange, isValid}) => {
    const selected = {
        FIRST: 'first',
        LAST: 'last',
        BUSINESS: 'business',
        EMAIL: 'email',
        PHONE: 'phone',
        NONE: 'none'
    }

    const [suggestions, setSuggestions] = useState([]);
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [emailIsValid, setEmailValid] = useState(false);
    const [phoneIsValid, setPhoneValid] = useState(false);
    const [currentlySelected, setCurrentlySelected] = useState(selected.NONE);
    const [enteredFirstName, setFirstName] = useState('');
    const [enteredLastName, setLastName] = useState('');
    const [enteredBusinessName, setBusinessName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredPhone, setPhone] = useState('');
    const [currentCustId, setCurrentCustId] = useState(0);
    const servCtx = useContext(ServerContext);

    const onFocusHandler = (id) => {
        switch (id) {
            case 'first':
                setCurrentlySelected(selected.FIRST);
                break;
            case 'last':
                setCurrentlySelected(selected.LAST);
                break;
            case 'business':
                setCurrentlySelected(selected.BUSINESS);
                break;
            case 'email':
                setCurrentlySelected(selected.EMAIL);
                break;
            case 'phone':
                setCurrentlySelected(selected.PHONE);
                break;
            default:
                setCurrentlySelected(selected.NONE);
        }
    }

    const formatPhone = useCallback(() => {
        if (enteredPhone.trim().length < 7) return;
        try {
            const countryCode = '+1'
            const parsed = phoneUtil.parse(countryCode + enteredPhone)
            const formatted = phoneUtil.format(parsed, GooglePhone.PhoneNumberFormat.NATIONAL);
            setPhone(formatted);
        } catch (error) {
            console.log('Error formatting phone #: ', error);
            setPhoneValid(false);
        }
    }, [enteredPhone]);

    const lostFocusHandler = (id) => {
        setCurrentlySelected(selected.NONE);
        if (id === 'phone') {
            formatPhone();
        }
    }

    const onFirstNameChange = event => {
        setCurrentlySelected(selected.FIRST);
        const input = event.target.value;
        setFirstName(input);
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
    }

    const onPhoneChange = event => {
        const input = event.target.value;
        setCurrentlySelected(selected.PHONE);
        setPhone(input);
    }

    const lookupSuggestions = useCallback((client) => {
        const fetchSuggestions = async () => {
            return await getSuggestions(client, servCtx);
        }
        return fetchSuggestions();
    }, [servCtx]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const client = {
                firstName: enteredFirstName,
                lastName: enteredLastName,
                businessName: enteredBusinessName,
                email: enteredEmail,
                phone: enteredPhone,
                id: currentCustId,
            };
            const validateEntries = () => {
                const validateFirstName = () => {
                    setFirstNameValid(enteredFirstName.trim().length !== 0);
                }

                const validateEmail = () => {
                    setEmailValid(emailValidator.validate(enteredEmail));
                }

                const validatePhone = () => {
                    const countryCode = '+1'
                    try {
                        const value = phoneUtil.parse(countryCode + enteredPhone);
                        setPhoneValid(phoneUtil.isPossibleNumber(value));
                    } catch (error) {
                        setPhoneValid(false);
                    }
                }
                validateFirstName();
                validateEmail();
                validatePhone();
            }
            validateEntries();
            onClientChange(client);
            isValid(firstNameValid && emailIsValid && phoneIsValid);
            setSuggestions(await lookupSuggestions(client));
            formatPhone();
        }
        fetchSuggestions();
        console.log('Test');
    }, [lookupSuggestions, enteredFirstName, enteredLastName, enteredBusinessName, enteredEmail, enteredPhone, firstNameValid, emailIsValid, phoneIsValid, currentCustId, formatPhone, onClientChange, isValid]);

    const onSelectionHandler = (client) => {
        setFirstName(client.firstName);
        setLastName(client.lastName);
        setBusinessName(client.businessName);
        setEmail(client.email);
        setPhone(client.phone);
        setCurrentCustId(client.id);
    }
    return (
        <div>
            <h2>Client</h2>
            <AutocompleteInput
                label="First Name"
                isValid={firstNameValid}
                isRequired={true}
                value={enteredFirstName}
                onChange={onFirstNameChange}
                suggestions={currentlySelected === 'first' && suggestions}
                suggestionType='client'
                onSelection={onSelectionHandler}
                onFocus={onFocusHandler}
                onLostFocus={lostFocusHandler}
                id="firstName"
                type="text"
            />
            <AutocompleteInput
                label="Last Name"
                isRequired={false}
                value={enteredLastName}
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
                value={enteredBusinessName}
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
            value={enteredEmail}
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