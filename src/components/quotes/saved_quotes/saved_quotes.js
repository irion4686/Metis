import classes from './saved_quotes.module.css';
import {useEffect, useState, useContext} from "react";
import {getQuotes} from "../../../model/quote_model";
import ServerContext from "../../../store/server-context";
import saved_quote_item from "./saved_quote_item";

const SavedQuotes = (props) => {
    const [quotes, setQuotes] = useState([]);
    const servCtx = useContext(ServerContext);

    useEffect(async () => {
        const localQuotes = await getQuotes(servCtx);
        if (localQuotes) {
            setQuotes(localQuotes.map(quote => saved_quote_item(quote)));
        }
    }, [])
    const addQuoteHandler = () => {
        props.onAddQuote(true);
    }
    return (
        <div className={classes.savedQuotes}>
            <button onClick={addQuoteHandler} className={classes.add}>Add Quote</button>
            <ul>{quotes}</ul>
        </div>
    )
}

export default SavedQuotes;