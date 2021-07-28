import classes from './saved_quotes.module.css';

const SavedQuotes = (props) => {
    const addQuoteHandler = () => {
        props.onAddQuote(true);
    }
    return (
        <div>
            <button onClick={addQuoteHandler} className={classes.add}>Add Quote</button>
            <h1>Saved Quotes</h1>
        </div>
    )
}

export default SavedQuotes;