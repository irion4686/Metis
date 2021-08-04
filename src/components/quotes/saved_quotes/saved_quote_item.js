import classes from "./saved_quotes_item.module.css";

const SavedQuoteItem = (props) => {
    const locations = props.addresses.origin.city + ', ' + props.addresses.origin.state + ' TO ' + props.addresses.destination.city + ', ' + props.addresses.destination.state;
    const distance = props.addresses.distance;
    const timeframe = props.details.timing.timeframe;
    let roundTrip = props.details.timing.roundTrip;
    let date1Label;
    let date2Label;
    let date3Label;
    let date4Label;
    let date1 = props.details.timing.firstDate;
    let date2 = props.details.timing.secondDate;
    let date3 = props.details.timing.thirdDate;
    let date4 = props.details.timing.fourthDate;

    if (timeframe !== 'UNKNOWN' || timeframe !== 'ASAP') {
        if (timeframe === 'BEFORE') {
            date1Label = 'Deliver before:';
            date2Label = 'Return before:';
        } else if (timeframe === 'AFTER') {
            date1Label = 'Deliver after:';
            date2Label = 'Return after:';
        } else if (timeframe === 'BETWEEN') {
            date1Label = 'Deliver between:';
            date2Label = ' and ';
            date3Label = 'Return between:';
            date4Label = ' and ';
        } else if (timeframe === 'SPECIFIC') {
            date1Label = 'Deliver on:';
            date2Label = 'Return on:';
        }
    }
    return (
        <div className={classes.item}>
            <div className={`${classes.row} ${classes.location}`}>
                <label>{locations}</label>
                <label className={classes.distance}>{distance} mi</label>
            </div>
            <div className={classes.row}>
                <label>{props.client.firstName} {props.client.lastName}</label>
                {props.client.businessName !== 'NULL' && <label>{props.client.businessName}</label>}
            </div>
            <div className={classes.row}>
                <label>{date1Label} {date1} {date2Label} {date2} </label>
            </div>
            <div className={classes.row}>
                <label>Stalls(Single, Double, Box): </label>
            </div>
        </div>
    )
}
export default SavedQuoteItem;