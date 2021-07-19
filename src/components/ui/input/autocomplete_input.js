import classes from "./autocomplete_input.module.css";
import styles from "./autocomplete_input.module.css";
import address_autocomplete_item from "./address_autocomplete_item";
import client_autocomplete_item from "./client_autocomplete_item";

const AutocompleteInput = (props) => {
  let suggestions = []
  if (props.suggestions !== undefined && props.suggestions.length > 0) {
    console.log('test');
    if (props.suggestionType === 'address') {
      console.log('address');
      suggestions = props.suggestions.map(suggestion => address_autocomplete_item(suggestion));
    }
    if (props.suggestionType === 'client') {
      suggestions = props.suggestions.map(client => client_autocomplete_item(client));
    }
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
      autoComplete='off'
    />
    <ul>{suggestions}</ul>
    </div>
    
  );
};

export default AutocompleteInput;
