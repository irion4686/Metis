import classes from "./autocomplete_input.module.css";
import styles from "./autocomplete_input.module.css";
import address_autocomplete_item from "./address_autocomplete_item";
import client_autocomplete_item from "./client_autocomplete_item";

const AutocompleteInput = (props) => {
    const id = props.id;
    let suggestions = []
    const onSelectionHandler = (selection) => {
        if (props.onSelection) props.onSelection(selection);
        lostFocusHandler();
    }
    if (props.suggestions !== undefined && props.suggestions.length > 0) {
        if (props.suggestionType === 'address') {
            suggestions = props.suggestions.map(suggestion => address_autocomplete_item(suggestion, onSelectionHandler));
        }
        if (props.suggestionType === 'client') {
            suggestions = props.suggestions.map(client => client_autocomplete_item(client, onSelectionHandler));
        }
    }
    const lostFocusHandler = (event) => {
        if (event && event.relatedTarget && event.relatedTarget.className && event.relatedTarget.className.includes('autocomplete_item')) {
            return;
        }
        if (props.onLostFocus) {
            props.onLostFocus(id);
        }
    }

    const focusHandler = () => {
        if (props.onFocus) {
            props.onFocus(id);
        }
    }

    const onChangeHandler = (event) => {
        props.onChange(event);
        console.log('Valid: ' + props.isValid);
    }
    return (
        <div className={classes.input}>
            <label>{props.label}</label>
            <input
                className={`${styles['input']} ${!props.isValid && props.isRequired && styles.invalid}`}
                type={props.type || "text"}
                onChange={onChangeHandler}
                value={props.value}
                id={props.id}
                onBlur={lostFocusHandler}
                onFocus={focusHandler}
                autoComplete='new-password'
            />
            <ul>{suggestions}</ul>
        </div>
    );
};

export default AutocompleteInput;
