import classes from "./MobileTabs.module.css";

const MobileTabs = (props) => {
  return (
    <div className={classes.tabs}>
      <button>Quotes</button>
      <button>Trips</button>
      <button>Vehicles</button>
      <button>Drivers</button>
    </div>
  );
};

export default MobileTabs;
