
const QuotePrice = (props) => {
    return (
        <div>
            <h2>Pricing</h2>
            <label>Base Price</label>
            <input type='number'/>
            <label>Discount</label>
            <input type='number'/>
            <label>Overnight Costs</label>
            <input type='number'/>
            <label>Misc Costs</label>
            <input type='number'/>
            <label>Total Price</label>
            <input type='number'/>
        </div>
    )
}
export default QuotePrice;