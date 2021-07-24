import classes from './quote_price_form.module.css';

const QuotePrice = (props) => {
    return (
        <div className={classes.price}>

            <h2>Pricing</h2>
            <div>
                <label>Base Price</label>
                <input type='number'/>
            </div>
            <div>
                <label>Discount</label>
                <input type='number'/>
            </div>
            <div>
                <label>Overnight Costs</label>
                <input type='number'/>
            </div>
            <div>
                <label>Misc Costs</label>
                <input type='number'/>
            </div>
            <div>
                <label>Total Price</label>
                <input type='number'/>
            </div>

        </div>
    )
}
export default QuotePrice;