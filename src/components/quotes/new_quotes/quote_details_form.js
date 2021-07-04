import classes from './quote_details_form.module.css';

const QuoteDetailsForm = (props) => {
    return (
        <div className={classes.details}>
            <label>Distance: {props.distance}</label>
            <select className={classes.dropdown} >
                <option>Unknown</option>
                <option>ASAP</option>
                <option>Within 30 Days</option>
                <option>More Than 30 Days Out</option>
                <option>Specific Date(s)</option>
                <option></option>
            </select>
        </div>
    );
};

export default QuoteDetailsForm;