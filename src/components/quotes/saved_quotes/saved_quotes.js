import classes from './saved_quotes.module.css';
import {useEffect, useState, useContext} from "react";
import {getQuotes} from "../../../model/quote_model";
import ServerContext from "../../../store/server-context";
import saved_quote_item from "./saved_quote_item";

const SavedQuotes = (props) => {
    const [quotes, setQuotes] = useState([]);
    const servCtx = useContext(ServerContext);

    useEffect(() => {
        async function fetchQuotes() {
            const localQuotes = await getQuotes(servCtx);
            if (localQuotes) {
                setQuotes(localQuotes.map(quote => saved_quote_item(quote)));
            }
        }

        fetchQuotes();
    }, [servCtx])
    const addQuoteHandler = () => {
        props.onAddQuote(true);
    }
    return (
        <div>
            <div className={classes.actions}>
                <button onClick={addQuoteHandler}>Add Quote</button>
            </div>
            <div className={classes.savedQuotes}>
                <ul>{quotes}</ul>
            </div>
        </div>
    )
}

export default SavedQuotes;