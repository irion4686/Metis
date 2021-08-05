import classes from "./MobileTabs.module.css";

const MobileTabs = props => {
    const onClickQuotesHandler = () => {
        props.onClick('quotes');
    }
    const onClickTripsHandler = () => {
        props.onClick('trips');
    }
    const onClickVehiclesHandler = () => {
        props.onClick('vehicles');
    }
    const onClickDriversHandler = () => {
        props.onClick('drivers');
    }
    return (
        <div className={classes.tabs}>
            <button onClick={onClickQuotesHandler}>Quotes</button>
            <button onClick={onClickTripsHandler}>Trips</button>
            <button onClick={onClickVehiclesHandler}>Vehicles</button>
            <button onClick={onClickDriversHandler}>Drivers</button>
        </div>
    );
};

export default MobileTabs;
