import classes from "./new_quote.module.css";
import { useState } from "react";

import AutocompleteInput from "../../ui/input/autocomplete_input";

const NewQuote = (props) => {
    const [enteredFirstName, setFirstName] = useState("");
    const [enteredLastName, setLastName] = useState("");
    const [enteredBusinessName, setBusinessName] = useState("");
    const [enteredEmail, setEmail] = useState("");
    const [enteredPhone, setPhone] = useState("");

    const onFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const onLastNameChange = (event) => {
        setLastName(event.target.value);
    };
  return (
    <div className={classes.new_quote}>
      <form>
          <h2>Client</h2>
            <AutocompleteInput
            label="First Name"
            isRequired={false}
            value={enteredFirstName}
            onChange={onFirstNameChange}
            id="firstName"
            type="text"
        />
        <AutocompleteInput
            label="Last Name"
            isRequired={false}
            value={enteredLastName}
            onChange={onLastNameChange}
            id="lastName"
            type="text"
        />
      </form>
    </div>
  );
};

export default NewQuote;
