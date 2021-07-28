import {useState} from "react";
import NewQuote from "./new_quote";
import SavedQuotes from "../saved_quotes/saved_quotes";

const Quotes = props => {
    const [creatingQuote, setCreatingQuote] = useState(false);

    const addQuoteHandler = () => {
        setCreatingQuote(true);
    }
    return (
        <div>
            {creatingQuote && <NewQuote/>}
            {!creatingQuote && <SavedQuotes onAddQuote={addQuoteHandler}/>}
        </div>
    )
}

export default Quotes;