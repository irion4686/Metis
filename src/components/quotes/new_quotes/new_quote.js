import classes from "./new_quote.module.css";
import ClientForm from "./client_form";
import AddressForm from "./address_form";
import QuoteDetailsForm from "./quote_details_form";
import QuotePrice from "./quote_price_form";
import {useEffect, useState, useContext, useCallback} from "react";
import {getDistance} from "../../../model/address_model";
import ServerContext from "../../../store/server-context";
import {submitQuote} from "../../../model/quote_model";
import ErrorModal from "../../ui/error_modal/ErrorModal";
import InlineError from "./inline_error";
import ConfirmModal from "../../ui/confirm_modal/confirm_modal";

const NewQuote = () => {
    const [clientIsValid, setClientValid] = useState(false);
    const [originIsValid, setOriginValid] = useState(false);
    const [destValid, setDestValid] = useState(false);
    const [detailsValid, setDetailsValid] = useState(false);
    const [pricingValid, setPricingValid] = useState(false);
    const [originAddress, setOrigin] = useState({});
    const [destinationAddress, setDestination] = useState({});
    const [distance, setDistance] = useState('');
    const [totals, setTotals] = useState({});
    const [mapURL, setMapURL] = useState('https://www.google.com/maps/embed/v1/view?center=35.5,-98.35&zoom=3&key=AIzaSyDStzaI2_E0rwxaq0EcKO9251VVDLnYuac');
    const [client, setClient] = useState({});
    const [quoteDetails, setQuoteDetails] = useState({});
    const [quotePricing, setQuotePricing] = useState({});
    const [comments, setComments] = useState('');
    const [commentsLen, setCommentsLen] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [currentProblems, setCurrentProblems] = useState([]);
    const [displayConfirmModal, setDisplayConfirmModal] = useState(false);

    const servCtx = useContext(ServerContext);

    const validClientHandler = useCallback(event => {
        setClientValid(event);
    }, []);
    const validOriginHandler = event => {
        setOriginValid(event);
    }
    const validDestHandler = event => {
        setDestValid(event);
    }
    const validDetailsHandler = useCallback(event => {
        console.log('Details Valid: ', event);
        setDetailsValid(event);
    }, []);
    const validPricingHandler = useCallback(event => {
        setPricingValid(event);
    }, []);

    const onClientChange = useCallback((inClient) => {
        setClient(inClient);
    }, []);

    const closeErrorHandler = () => {
        setErrorTitle('');
        setErrorMessage('');
        setDisplayError(false);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (clientIsValid === true && originIsValid === true && destValid === true && detailsValid === true && pricingValid === true) {
            const quote = {
                client: client.id && client.id > 0 ? {id: client.id} : client,
                locations: {
                    origin: originAddress,
                    destination: destinationAddress,
                    distance: distance
                },
                details: quoteDetails,
                pricing: quotePricing,
                comments: comments
            }
            setIsEnabled(false);
            const result = await submitQuote(quote, servCtx);
            if (result === 200) {
                console.log('SUCCESS!');
                window.location.reload(false);
            } else {
                setIsEnabled(true);
                console.log('Error: ', result.message);
            }
        } else {
            setIsEnabled(true);
            console.log('Cant submit');
            if (!clientIsValid) console.log('Client');
            if (!originIsValid) console.log('Origin');
            if (!destValid) console.log('Destination');
            if (!detailsValid) console.log('Details');
            if (!pricingValid) console.log('Pricing');
        }
    }
    const convertAddressToQuery = (address) => {
        let result = address.id.trim().length > 0 ? 'place_id:' + address.id : ((address.street + ' ' + address.city + ' ' + address.state + ' ' + address.zip).trim());
        return result.split(' ').join('%20');
    }

    const quoteDetailsOnChangeHandler = useCallback(inDetails => {
        const totals = inDetails.horses;
        setTotals(totals);
        setQuoteDetails(inDetails);
    }, []);

    const quotePricingOnChangeHandler = useCallback(inPricing => {
        setQuotePricing(inPricing);
    }, []);

    const commentsOnChangeHandler = event => {
        const input = event.target.value;
        setCommentsLen(input.length);
        setComments(input)
    }

    const cancelClickHandler = (event) => {
        setDisplayConfirmModal(true);
    }

    const onQuitHandler = () => {
        window.location.reload(false);
    }

    const onContinueHandler = () => {
        setDisplayConfirmModal(false);
    }

    useEffect(() => {
        let problems = [];
        if (!clientIsValid) problems.push('client');
        if (!originIsValid) problems.push('origin');
        if (!destValid) problems.push('destination');
        if (!detailsValid) problems.push('details');
        if (!pricingValid) problems.push('pricing');
        setCurrentProblems(problems);
        if (problems.length === 0) setIsEnabled(true);
    }, [clientIsValid, originIsValid, destValid, detailsValid, pricingValid]);

    useEffect(() => {
        const fetchDistance = async () => {
            const validOrigin = originAddress.id || originAddress.zip || (originAddress.city && originAddress.state) ? true : false;
            const validDestination = destinationAddress.id || destinationAddress.zip || (destinationAddress.city && destinationAddress.state) ? true : false;
            if (validOrigin && validDestination) {
                try {
                    const result = await getDistance(originAddress, destinationAddress, servCtx);
                    setDistance(result);
                    const refreshMap = (validOrigin, validDestination) => {
                        if (validOrigin && validDestination) {
                            const originQuery = convertAddressToQuery(originAddress);
                            const destinationQuery = convertAddressToQuery(destinationAddress);
                            setMapURL(`https://www.google.com/maps/embed/v1/directions?origin=${originQuery}&destination=${destinationQuery}&key=AIzaSyDStzaI2_E0rwxaq0EcKO9251VVDLnYuac`);
                        }
                    }
                    refreshMap(validOrigin, validDestination);
                } catch (err) {
                    console.log('Unable to find distance!');
                }
            }
        }
        fetchDistance();
    }, [originAddress, destinationAddress, servCtx]);

    return (
        <div className={classes.new_quote}>
            {displayError && <ErrorModal title={errorTitle} message={errorMessage} onClick={closeErrorHandler}/>}
            {displayConfirmModal &&
            <ConfirmModal title='Are you sure?' message='Cancelling will cause you to lose any entered information'
                          onConfirm={onQuitHandler} onCancel={onContinueHandler}/>}
            <form autoComplete='off'>
                <ClientForm onClientChange={onClientChange} isValid={validClientHandler}/>
                <AddressForm isValid={validOriginHandler} onChange={setOrigin} addressType="Origin"/>
                <AddressForm isValid={validDestHandler} onChange={setDestination} addressType="Destination"/>
                <iframe title='Route Map' loading='lazy' allowFullScreen src={mapURL}/>
                <QuoteDetailsForm isValid={validDetailsHandler} onChange={quoteDetailsOnChangeHandler}
                                  distance={distance}/>
                <QuotePrice totals={totals} distance={distance} onChange={quotePricingOnChangeHandler}
                            isValid={validPricingHandler}/>
                <label htmlFor='comments'>Comments: ({commentsLen}/255)</label>
                <textarea onChange={commentsOnChangeHandler} className={classes.comments} name='comments' rows='9'
                          maxLength='255'/>
                <div className={classes.actionDiv}>
                    <button onClick={cancelClickHandler} className={classes.action}><label>Cancel</label></button>
                </div>
                {currentProblems.length > 0 && <InlineError problems={currentProblems}/>}
                <div className={classes.actionDiv}>
                    <button type='submit' disabled={!isEnabled} onClick={submitHandler} className={classes.action}>
                        <label>Submit</label></button>
                </div>
            </form>
        </div>
    );
}

export default NewQuote;
