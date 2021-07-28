import classes from './main_page.module.css'
import MobileTabs from '../mobile_tabs/MobileTabs';
import DisplayedPage from '../displayed_page/displayed_page';
import NewQuote from '../quotes/new_quotes/new_quote';
import {useState} from "react";
import Quotes from "../quotes/new_quotes/quotes";

const MainPage = () => {
    const Pages = {
        QUOTES: "quotes",
        TRIPS: "trips",
        DRIVERS: "drivers",
        VEHICLES: "vehicles",
        NONE: "none"
    }
    const [selectedPage, setSelectedPage] = useState(Pages.QUOTES);

    let pageToDisplay;
    if (selectedPage === Pages.QUOTES) pageToDisplay = <Quotes/>;
    //else if (selectedPage === Pages.TRIPS) pageToDisplay =

    const mobileTabClickHandler = tab => {
        switch (tab) {
            case 'quotes':

        }
    }


    return (
        <div className={classes.background}>
            <DisplayedPage selectedPage={pageToDisplay}/>
            <MobileTabs onClick={mobileTabClickHandler}/>
        </div>
    );
};

export default MainPage;