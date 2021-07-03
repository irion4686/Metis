import classes from './displayed_page.module.css';

const DisplayedPage = props => {
    return (
        <div className={classes.window}>{props.selectedPage}</div>
    );
};

export default DisplayedPage;