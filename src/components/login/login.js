import { useState, useContext } from "react";
import ServerContext from "../../store/server-context";
import Card from "../ui/card/Card";
import Input from "../ui/input/Input";

import classes from "./login.module.css";
import styles from "./login.module.css";
import ErrorModal from "../ui/error_modal/ErrorModal";
const validator = require("email-validator");
const axios = require('axios').default;

const Login = (props) => {
  const servCtx = useContext(ServerContext);
  const SERVER = servCtx.SERVER;
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [loginEnabled, setLoginEnabled] = useState(true);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    if (!validator.validate(event.target.value)) {
      setIsValidEmail(false);
      console.log("invalid");
    } else {
      setIsValidEmail(true);
    }
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    if (
        !event.target.value.match(
            "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
    ) {
      setIsValidPass(false);
    } else {
      setIsValidPass(true);
    }
  };

  const displayErrorHandler = (title, message) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setDisplayError(true);
  }

  const closeErrorModalHandler = () => {
    setErrorTitle('');
    setErrorMessage('');
    setDisplayError(false);
    setLoginEnabled(true);
  }

  const onLoginHandler = async (event) => {
    event.preventDefault();
    setLoginEnabled(false);
    if (
        enteredEmail.trim().length === 0 ||
        enteredPassword.trim().length === 0
    ) {
      return;
    }
    if (isValidEmail && isValidPass) {
      const loginInfo = {
        email: enteredEmail,
        password: enteredPassword
      }
      try {
        const url = SERVER + 'api/login';
        let response = await axios.post(url, loginInfo, {withCredentials: true});
        if (response.status) {
          props.onLogIn(true);
        } else {
          console.log("Incorrect username and/or password");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            displayErrorHandler("Incorrect Login Information", "Incorrect email and/or password, try again.");
          } else {
            displayErrorHandler("Error", error.message);
          }
        } else if (error.request) {
          displayErrorHandler("Error Connecting", "Check your internet connection and/or try again later");
        } else {
          displayErrorHandler("Error", error.message);
        }
      }
    }
  };
  return (
      <div>
        {displayError && <ErrorModal title={errorTitle} message={errorMessage} onClick={closeErrorModalHandler}/>}
        <Card className={classes.input}>
          <form onSubmit={onLoginHandler}>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <Input
                isValid={isValidEmail}
                value={enteredEmail}
                onChange={onEmailChange}
                id="email"
                type="text"
            />
            <label htmlFor="password">Password</label>
            <Input
                isValid={isValidPass}
                value={enteredPassword}
                onChange={onPasswordChange}
                id="password"
                type="password"
            />
            <a href="/#">Forgot Password?</a>
            <div>
              <button type="submit" disabled={!loginEnabled}>Log In</button>
            </div>
          </form>
          <div>
            <a className={styles.sign_up} href='/#' onClick={props.onSignup}>
              Register
            </a>
          </div>
        </Card>
      </div>
  );
};

export default Login;
