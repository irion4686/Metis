import classes from "./signup.module.css";
import styles from "./signup.module.css";

import { useState } from "react";
import Card from "../ui/card/Card";
import Input from "../ui/input/Input";

const Signup = (props) => {
  return (
    <Card className={classes.input}>
      <form>
        <h2>Registration</h2>
        <label htmlFor="firstname">First name</label>
        <Input id="firstname" type="text" />
        <label htmlFor="lastname">Last name</label>
        <Input id="lastname" type="text" />
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
        <label htmlFor="phone">Phone</label>
        <Input id="phone" type="text" />
        <label htmlFor="password">Password</label>
        <Input id="password" type="text" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input id="confirmPassword" type="text" />
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
      <div></div>
    </Card>
  );
};

export default Signup;
