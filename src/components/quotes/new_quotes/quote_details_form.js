import classes from './quote_details_form.module.css';

const QuoteDetailsForm = (props) => {
    return (
        <div className={classes.details}>
            <label className={classes.distance}>Distance: {props.distance} mi</label>
            <select className={classes.dropdown}>
                <option>Select Time Frame</option>
                <option>Unknown</option>
                <option>ASAP</option>
                <option>Within 30 Days</option>
                <option>More Than 30 Days Out</option>
                <option>Specific Date(s)</option>
                <option></option>
            </select>
            <div className={classes.stalls}>
                <h2>Number of stalls</h2>
                <div className={classes.stallInput}>
                    <label>Single Stalls</label>
                    <input type='number'/>
                </div>
                <div className={classes.stallInput}>
                    <label>Double Stalls</label>
                    <input type='number'/>
                </div>
                <div className={classes.stallInput}>
                    <label>Box Stalls</label>
                    <input type='number'/>
                </div>
                
            </div>
        </div>
    );
};

export default QuoteDetailsForm;