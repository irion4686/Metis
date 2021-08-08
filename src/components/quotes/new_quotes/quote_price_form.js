import classes from './quote_price_form.module.css';

import {useEffect, useState} from "react";

const QuotePrice = ({totals, distance, onChange, isValid}) => {
    const [basePrice, setBasePrice] = useState(0.0);
    const [discount, setDiscount] = useState(0);
    const [layoverCharges, setOvernightCosts] = useState(0.0);
    const [miscCharges, setMiscCosts] = useState(0.0);
    const [totalPrice, setTotalPrice] = useState(0.0);

    const calculateBasePrice = (inTotals, inDistance) => {
        const totals = inTotals;
        const distance = parseInt(inDistance.replace(/[^\d.-]/g, ""));
        if (!totals.totalHorses) return;
        let price = 1.0 * totals.singleStalls;
        price += 1.5 * totals.doubleStalls;
        price += 2.0 * totals.boxStalls;
        price += price * distance;
        setBasePrice(price);
    }

    useEffect(() => {
        const calculateTotalPrice = () => {
            const preDiscount = basePrice + layoverCharges + miscCharges
            setTotalPrice(preDiscount - (preDiscount * (discount / 100)));
        }
        calculateTotalPrice();
        if (totalPrice > 0) isValid(true);
        else isValid(false);
        const pricing = {
            basePrice: basePrice,
            discount: discount,
            layoverCharges: layoverCharges,
            miscCharges: miscCharges,
            totalPrice: totalPrice
        }
        onChange(pricing);
    }, [basePrice, discount, layoverCharges, miscCharges, totalPrice, isValid, onChange])

    useEffect(() => {
        calculateBasePrice(totals, distance);
    }, [totals, distance]);

    const onBasePriceChangeHandler = event => {
        setBasePrice(+event.target.value);
    }

    const onDiscountChangeHandler = event => {
        setDiscount(+event.target.value);
    }

    const onOvernightCostChangeHandler = event => {
        setOvernightCosts(+event.target.value);
    }

    const onMiscCostsHandler = event => {
        setMiscCosts(+event.target.value);
    }

    const onTotalPriceChangeHandler = event => {
        setTotalPrice(+event.target.value);
    }

    return (
        <div className={classes.price}>

            <h2>Pricing</h2>
            <div>
                <label>Base Price</label>
                <input type='number' value={basePrice} onChange={onBasePriceChangeHandler}/>
            </div>
            <div>
                <label>Discount</label>
                <input type='number' value={discount} onChange={onDiscountChangeHandler}/>
            </div>
            <div>
                <label>Overnight Costs</label>
                <input type='number' value={layoverCharges} onChange={onOvernightCostChangeHandler}/>
            </div>
            <div>
                <label>Misc Costs</label>
                <input type='number' value={miscCharges} onChange={onMiscCostsHandler}/>
            </div>
            <div>
                <label>Total Price</label>
                <input type='number' value={totalPrice} onChange={onTotalPriceChangeHandler}/>
            </div>

        </div>
    )
}
export default QuotePrice;