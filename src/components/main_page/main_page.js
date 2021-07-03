import classes from './main_page.module.css'
import { Fragment } from 'react';

import MobileTabs from '../mobile_tabs/MobileTabs';
import DisplayedPage from '../displayed_page/displayed_page';
import NewQuote from '../quotes/new_quotes/new_quote';

const MainPage = props => {
    const selectedPage = <NewQuote />;
    return (
        <div className={classes.background}>
            <DisplayedPage selectedPage={selectedPage}/>
            <MobileTabs />
        </div>
    );
};

export default MainPage;