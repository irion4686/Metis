import classes from "./inline_error.module.css";

const InlineError = (props) => {
    return (
        <ul className={classes.problems}>
            Complete or correct the following sections to continue:
            {props.problems.includes('client') && <li>Client Information</li>}
            {props.problems.includes('origin') && <li>Origin Address</li>}
            {props.problems.includes('destination') && <li>Destination Address</li>}
            {props.problems.includes('details') && <li>Quote Details</li>}
            {props.problems.includes('pricing') && <li>Pricing Information</li>}
        </ul>
    )
}
export default InlineError;