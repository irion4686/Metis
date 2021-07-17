import { useState, useContext } from "react";
import ServerContext from "../../store/server-context";
import Card from "../ui/card/Card";
import Input from "../ui/input/Input";

import classes from "./login.module.css";
import styles from "./login.module.css";
const validator = require("email-validator");
const axios = require('axios').default;

const Login = (props) => {
  const servCtx = useContext(ServerContext);
  const SERVER = servCtx.SERVER;
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPass, setIsValidPass] = useState(true);

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

  const onLoginHandler = async (event) => {
    event.preventDefault();
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
        console.log(response);
        if (response.status ) {

          props.onLogIn(true);

        } else {
          console.log("Incorrect username and/or password");
        }
      } catch (error) {
        console.log("Error");
        console.log(error);
      }
    }
  };
  return (
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
          <button type="submit">Log In</button>
        </div>
      </form>
      <div>
        <a className={styles.sign_up} href='/#' onClick={props.onSignup} >
          Register
        </a>
      </div>
    </Card>
  );
};

export default Login;
