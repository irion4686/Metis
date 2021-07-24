import classes from './quote_details_form.module.css';
import {useEffect, useState} from "react";

const QuoteDetailsForm = (props) => {
    const [timeframe, setTimeframe] = useState('');
    const [firstDateLabel, setFirstDateLabel] = useState('');
    const [secondDateLabel, setSecondDateLabel] = useState('');
    const [thirdDateLabel, setThirdDateLabel] = useState('');
    const [fourthDateLabel, setFourthDateLabel] = useState('');
    const [displayFirstDate, setDisplayFirstDate] = useState(false);
    const [displayThirdDate, setDisplayThirdDate] = useState(false);
    const [displayFourthDate, setDisplayFourthDate] = useState(false);
    const [displaySecondDate, setDisplaySecondDate] = useState(false);
    const [firstDateValue, setFirstDate] = useState('');
    const [secondDateValue, setSecondDate] = useState('');
    const [thirdDateValue, setThirdDate] = useState('');
    const [fourthDateValue, setFourthDate] = useState('');
    const [roundTrip, setRoundTrip] = useState(false);
    const [displayRoundTrip, setDisplayRoundTrip] = useState(false);
    const [totalHorses, setTotalHorses] = useState(0);
    const [singleStalls, setSingleStalls] = useState(0);
    const [doubleStalls, setDoubleStalls] = useState(0);
    const [boxStalls, setBoxStalls] = useState(0);

    const returnMinDate = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-' + dd;
    }
    const MIN_DATE = returnMinDate();

    const validateTimeframe = () => {
        return timeframe !== '';
    }

    const validateTotalHorses = () => {
        return totalHorses > 0;
    }
    const validateStalls = () => {
        console.log('Stalls Valid: ', singleStalls >= 0 && doubleStalls >= 0 && boxStalls >= 0 && singleStalls + doubleStalls + boxStalls > 0);
        return singleStalls >= 0 && doubleStalls >= 0 && boxStalls >= 0 && singleStalls + doubleStalls + boxStalls > 0;
    }

    const validateDates = () => {
        if (displayFirstDate && firstDateValue.trim() === '') return false;
        if (displaySecondDate && secondDateValue === '') return false;
        if (displayThirdDate && thirdDateValue === '') return false;
        if (displayFourthDate && fourthDateValue === '') return false;
        return true;
    }

    const setDateDisplays = () => {
        if (timeframe === '' || timeframe === 'UNKNOWN' || timeframe === 'ASAP') {
            setDisplayFirstDate(false);
            setDisplaySecondDate(false);
            setDisplayThirdDate(false);
            setDisplayFourthDate(false);
            setDisplayRoundTrip(false);
        } else {
            if (timeframe === 'BEFORE') {
                console.log('Before')
                setFirstDateLabel('Deliver by:');
                setSecondDateLabel('Return by:');
                setDisplayFirstDate(true);
                setDisplaySecondDate(roundTrip);
                setDisplayRoundTrip(true);
            } else if (timeframe === 'AFTER') {
                setFirstDateLabel('Delivery after:');
                setSecondDateLabel('Return after:');
                setDisplayFirstDate(true);
                setDisplaySecondDate(roundTrip);
                setDisplayRoundTrip(true);
            } else if (timeframe === 'BETWEEN') {
                setFirstDateLabel('Deliver between:');
                setSecondDateLabel('and:');
                setThirdDateLabel('Return between:');
                setFourthDateLabel('and:');
                setDisplayFirstDate(true);
                setDisplaySecondDate(true);
                setDisplayThirdDate(roundTrip);
                setDisplayFourthDate(roundTrip);
                setDisplayRoundTrip(true);
            } else if (timeframe === 'SPECIFIC') {
                setFirstDateLabel('Deliver on:');
                setSecondDateLabel('Return on:');
                setDisplayFirstDate(true);
                setDisplaySecondDate(roundTrip);
                setDisplayThirdDate(false);
                setDisplayFourthDate(false);
                setDisplayRoundTrip(true);
            } else {
                console.log('Unexpected value for timeframe');
            }
        }
    }
    useEffect(() => {
        setDateDisplays();
        props.isValid(validateDates() && validateStalls() && validateTotalHorses() && validateTimeframe());
    }, [timeframe, roundTrip, totalHorses, singleStalls, doubleStalls, boxStalls, firstDateValue, secondDateValue, thirdDateValue, fourthDateValue]);

    useEffect(() => {
        if (!displayRoundTrip) {
            setRoundTrip(false);
        }
    }, [displayRoundTrip]);
    useEffect(() => {
        if (!displayFirstDate) {
            setFirstDate('');
        }
    }, [displayFirstDate]);

    useEffect(() => {
        if (!displaySecondDate) {
            setSecondDate('');
        }
    }, [displaySecondDate]);

    useEffect(() => {
        if (!displayThirdDate) {
            setThirdDate('');
        }
    }, [displayThirdDate]);

    useEffect(() => {
        if (!displayFourthDate) {
            setFourthDate('');
        }
    }, [displayFourthDate]);

    const timeframeChangeHandler = (event) => {
        const value = event.target.value;
        switch (value) {
            case 'Select Time Frame':
                setTimeframe('');
                break;
            case 'Unknown':
                setTimeframe('UNKNOWN');
                break;
            case 'ASAP':
                setTimeframe('ASAP');
                break;
            case 'Before Date':
                setTimeframe('BEFORE');
                break;
            case 'After Date':
                setTimeframe('AFTER');
                break;
            case 'Between Dates':
                setTimeframe('BETWEEN');
                break;
            case 'Specific Date(s)':
                setTimeframe('SPECIFIC');
        }
    }

    const roundTripChangeHandler = event => {
        setRoundTrip(event.target.value === 'Yes');
    }

    const firstDateChangeHandler = event => {
        setFirstDate(event.target.value);
    }

    const secondDateChangeHandler = event => {
        setSecondDate(event.target.value);
    }

    const thirdDateChangeHandler = event => {
        setThirdDate(event.target.value);
    }

    const fourthDateChangeHandler = event => {
        setFourthDate(event.target.value);
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        validateDates();
    }

    const onTotalHorsesChangeHandler = event => {
        if (event.target.value < 0) return;
        setTotalHorses(event.target.value);
    }

    const onSingleStallChangeHandler = event => {
        if (event.target.value < 0) return;
        setSingleStalls(event.target.value);
    }

    const onDoubleStallChangeHandler = event => {
        if (event.target.value < 0) return;
        setDoubleStalls(event.target.value);
    }

    const onBoxStallChangeHandler = event => {
        if (event.target.value < 0) return;
        setBoxStalls(event.target.value);
    }

    return (
        <div onSubmit={onSubmitHandler} className={classes.details}>
            <label className={classes.distance}>Distance: {props.distance} mi</label>
            <div>
                <label>Timeframe:</label>
                <select onChange={timeframeChangeHandler} className={classes.dropdown}>
                    <option>Select Time Frame</option>
                    <option>Unknown</option>
                    <option>ASAP</option>
                    <option>Before Date</option>
                    <option>After Date</option>
                    <option>Between Dates</option>
                    <option>Specific Date(s)</option>
                    <option></option>
                </select>
            </div>
            {displayRoundTrip && <div>
                <label>Round Trip?:</label>
                <select onChange={roundTripChangeHandler} className={classes.dropdown}>
                    <option>No</option>
                    <option>Yes</option>
                    <option></option>
                </select>
            </div>}

            {displayFirstDate && <div>
                <label>{firstDateLabel}</label>
                <input type='date' onChange={firstDateChangeHandler} min={MIN_DATE}/>
            </div>}
            {displaySecondDate && <div>
                <label>{secondDateLabel}</label>
                <input type='date' onChange={secondDateChangeHandler} min={MIN_DATE}/>
            </div>}
            {displayThirdDate && <div>
                <label>{thirdDateLabel}</label>
                <input type='date' onChange={thirdDateChangeHandler} min={MIN_DATE}/>
            </div>}
            {displayFourthDate && <div>
                <label>{fourthDateLabel}</label>
                <input type='date' onChange={fourthDateChangeHandler} min={MIN_DATE}/>
            </div>}
            <div className={classes.stallInput}>
                <label>Total Horses:</label>
                <input onChange={onTotalHorsesChangeHandler} type='number'/>
            </div>
            <h2>Number of stalls</h2>
            <div className={classes.stalls}>
                <div className={classes.stallInput}>
                    <label>Single Stalls</label>
                    <input onChange={onSingleStallChangeHandler} type='number'/>
                </div>
                <div className={classes.stallInput}>
                    <label>Double Stalls</label>
                    <input onChange={onDoubleStallChangeHandler} type='number'/>
                </div>
                <div className={classes.stallInput}>
                    <label>Box Stalls</label>
                    <input onChange={onBoxStallChangeHandler} type='number'/>
                </div>
                
            </div>
        </div>
    );
};

export default QuoteDetailsForm;