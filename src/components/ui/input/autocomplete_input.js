import classes from "./autocomplete_input.module.css";
import styles from "./autocomplete_input.module.css";
import address_autocomplete_item from "./address_autocomplete_item";

const AutocompleteInput = (props) => {
  let suggestions = []
  if (props.suggestions !== undefined && props.suggestions.length > 0) {
    console.log('test');
    if (props.suggestionType === 'address') {
      console.log('address');
      suggestions = props.suggestions.map((suggestion) => address_autocomplete_item(suggestion));
    } else {
      suggestions = props.suggestions.map((client) => (
          <li key={client.id}>
            <button><label>{client.firstName} {client.lastName}<span> | </span>{client.businessName}
              <span> | </span>{client.email}<span> | </span>{client.phone}</label></button>
          </li>
      ))
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
    />
    <ul>{suggestions}</ul>
    </div>
    
  );
};

export default AutocompleteInput;
