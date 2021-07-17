import classes from "./signup.module.css";
import {useState, useEffect} from "react";
import Card from "../ui/card/Card";
import Input from '../ui/input/Input';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const Signup = () => {
    const [enteredFirstName, setFirstName] = useState('');
    const [enteredLastName, setLastName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredPhone, setPhone] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [enteredConfirmPass, setConfirmPass] = useState('');
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPass, setIsValidPass] = useState(false);
    const [isValidConfirmPass, setIsValidConfirmPass] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);

    const SERVER = 'ec2-44-193-80-73.compute-1.amazonaws.com:3001/';

    const onFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
        if (value.length > 1) {
            setIsValidFirstName(true);
        } else {
            setIsValidFirstName(false);
        }
    };

    const onLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
        if (value.length > 1) {
            setIsValidLastName(true);
        } else {
            setIsValidLastName(false);
        }
    };

    const onEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        const expression = "^[^@s]+@[^@s.]+.[^@.s]+$";
        if (!value.match(expression)) {
            setIsValidEmail(false);
            console.log("invalid");
        } else {
            setIsValidEmail(true);
        }
    };

    const onPhoneChange = (event) => {
        const countryCode = '+1'
        try {
            const value = phoneUtil.parse(countryCode + event.target.value);
            setPhone(event.target.value);
            console.log(event.target.value);
            if (value.length === 0 || phoneUtil.isPossibleNumber(value)) {
                setIsValidPhone(true);
            } else {
                setIsValidPhone(false);
            }
        } catch (error) {
            console.log(error.message);
            setPhone('' + event.target.value);
            setIsValidPhone(false);
        }
    };

    const onPasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        const expression = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
        if (!value.match(expression)) {
            setIsValidPass(false);
        } else {
            setIsValidPass(true);
        }
    };

    const onConfirmPassChange = (event) => {
        const value = event.target.value;
        setConfirmPass(value);
        const expression = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";
        if (!value.match(expression) || value !== enteredPassword) {
            setIsValidConfirmPass(false);
        } else {
            setIsValidConfirmPass(true);
        }
    };

    useEffect(() => {
      const valid = {
        First: isValidFirstName,
        Last: isValidLastName,
        Email: isValidEmail,
        Phone: isValidPhone,
        Pass: isValidPass,
        Confirm: isValidConfirmPass
      }
        if (isValidFirstName && isValidLastName && isValidEmail && isValidPass && isValidConfirmPass && isValidPhone) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
        console.log("Valid: ",  valid);
    }, [isValidFirstName, isValidLastName, isValidEmail, isValidPass, isValidConfirmPass, isValidPhone]);

    const onSignupHandler = async (event) => {
        event.preventDefault();
        console.log("submitting");
        const newClient = {
            first_name: enteredFirstName,
            last_name: enteredLastName,
            email: enteredEmail,
            phone: enteredPhone,
            password: enteredPassword
        }
        try {
            const response = await fetch(SERVER, {
                method: 'POST',
                body: JSON.stringify(newClient),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log(await response.json());
            } else {
                let message = 'Unknown error';
                if (response.status === 409) message = 'User with that email already exists';
                console.log(message);
            }
        } catch (error) {
            console.log("Error");
            console.log(error);
        }
    };

    return (
        <Card className={classes.input}>
            <form onSubmit={onSignupHandler}>
                <h2>Registration</h2>
                <label htmlFor="firstname">First name</label>
                <Input id="firstname"
                       type="text"
                       value={enteredFirstName}
                       onChange={onFirstNameChange}
                />
                <label htmlFor="lastname">Last name</label>
                <Input id="lastname"
                       type="text"
                       value={enteredLastName}
                       onChange={onLastNameChange}
                />
                <label htmlFor="email">Email</label>
                <Input id="email"
                       type="text"
                       value={enteredEmail}
                       onChange={onEmailChange}
                />
                <label htmlFor="phone">Phone</label>
                <Input id="phone"
                       type="text"
                       value={enteredPhone}
                       onChange={onPhoneChange}
                />
                <label htmlFor="password">Password</label>
                <Input id="password"
                       type="text"
                       value={enteredPassword}
                       onChange={onPasswordChange}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input id="confirmPassword"
                       type="text"
                       value={enteredConfirmPass}
                       onChange={onConfirmPassChange}
                />
                <div>
                    <button disabled={!isValidForm} type="submit">Register</button>
                </div>
            </form>
        </ Card>
    );
};

export default Signup;
