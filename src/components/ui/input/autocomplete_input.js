import classes from "./autocomplete_input.module.css";
import styles from "./autocomplete_input.module.css";

const AutocompleteInput = (props) => {
  let suggestions = []
  if (props.suggestions !== undefined && props.suggestions.length > 0) {
    console.log(props.suggestions.length);
      suggestions = props.suggestions.map((client) => (
      <li><button><label>{client.firstName} {client.lastName}<span > | </span>{client.businessName} <span > | </span>{client.email}<span > | </span>{client.phone}</label></button></li>
      ))
  }
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
