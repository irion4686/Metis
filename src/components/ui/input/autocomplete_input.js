import classes from "./autocomplete_input.module.css";
import styles from "./autocomplete_input.module.css";

const AutocompleteInput = (props) => {
  return (
    <div className={classes.input}>
      <label >{props.label}</label>
      <input
      className={`${styles['input']} ${!props.isValid && styles.invalid}`}
      type={props.type || "text"}
      onChange={props.onChange}
      value={props.value}
      suggestions={props.suggestions}
      id={props.id}
    />
    </div>
    
  );
};

export default AutocompleteInput;
