import { useState } from "react";
import classes from "./autocomplete_input.module.css";
import styles from "./autocomplete_input.module.css";

const AutocompleteInput = (props) => {
  const [enteredValue, setValue] = useState("");

  let suggestions = 
    [
      {
    firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        phone: "",
        id: "",
  }
]
  if (props.suggestions != undefined) {
      suggestions = props.suggestions.map((client) => {
        console.log(client.firstName);
      return <li><label>client.firstName</label></li>;
    })
  }
  
//   const onValueChange = (event) => {
//     setValue(event.target.value);
//     props.onChange(enteredValue);
// };
  return (
    <div className={classes.input}>
      <label >{props.label}</label>
      <input
      className={`${styles['input']} ${!props.isValid && styles.invalid}`}
      type={props.type || "text"}
      onChange={props.onChange}
      value={props.value}
      id={props.id}
    />
    <ul>{suggestions}</ul>
    </div>
    
  );
};

export default AutocompleteInput;
