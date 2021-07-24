import classes from "./new_quote.module.css";
import ClientForm from "./client_form";
import AddressForm from "./address_form";
import QuoteDetailsForm from "./quote_details_form";
import QuotePrice from "./quote_price_form";
import {useEffect, useState, useContext} from "react";
import {getDistance} from "../../../model/address_model";
import ServerContext from "../../../store/server-context";

const NewQuote = () => {
  const [clientIsValid, setClientValid] = useState(false);
  const [originIsValid, setOriginValid] = useState(false);
  const [destValid, setDestValid] = useState(false);
  const [detailsValid, setDetailsValid] = useState(false);
  const [pricingValid, setPricingValid] = useState(false);
  const [originAddress, setOrigin] = useState({});
  const [destinationAddress, setDestination] = useState({});
  const [distance, setDistance] = useState('');
  const [mapURL, setMapURL] = useState('');
  const servCtx = useContext(ServerContext);

  let client = {
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    id: "",
  };

  const validClientHandler = event => {
    setClientValid(event);
  }
  const validOriginHandler = event => {
    setOriginValid(event);
  }
  const validDestHandler = event => {
    setDestValid(event);
  }
  const validDetailsHandler = event => {
    console.log('Details Valid: ', event);
      setDetailsValid(event);
  }
  const validPricingHandler = event => {
    setPricingValid(event);
  }

  const onClientChange = (event) => {
    client = event;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (clientIsValid === true && originIsValid === true && destValid === true && detailsValid === true && pricingValid === true) {
      console.log("submit");
    } else {
      console.log('Cant submit');
    }
  }
  const convertAddressToQuery = (address) => {
    let result = address.id.trim().length > 0 ? 'place_id:' + address.id : ((address.street + ' ' + address.city + ' ' + address.state + ' ' + address.zip).trim());
    return result.split(' ').join('%20');
  }

  const refreshMap = (validOrigin, validDestination) => {
    if (validOrigin && validDestination) {
      const originQuery = convertAddressToQuery(originAddress);
      const destinationQuery = convertAddressToQuery(destinationAddress);
      setMapURL(`https://www.google.com/maps/embed/v1/directions?origin=${originQuery}&destination=${destinationQuery}&key=AIzaSyDStzaI2_E0rwxaq0EcKO9251VVDLnYuac`);
    }
  }

  useEffect(async () => {
    const validOrigin = originAddress.id || originAddress.zip || originAddress.city && originAddress.state ? true : false;
    const validDestination = destinationAddress.id || destinationAddress.zip || destinationAddress.city && destinationAddress.state ? true : false;
    if (validOrigin && validDestination) {
      try {
        const result = await getDistance(originAddress, destinationAddress, servCtx);
        setDistance(result);
        refreshMap(validOrigin, validDestination);
      } catch (err) {
        console.log('Unable to find distance!');
      }
    }
  }, [originAddress, destinationAddress]);

  return (
      <div className={classes.new_quote}>
        <form autoComplete='off' onSubmit={submitHandler}>
          <ClientForm onClientChange={onClientChange} isValid={validClientHandler}/>
          <AddressForm isValid={validOriginHandler} address={setOrigin} addressType="Origin"/>
          <AddressForm isValid={validDestHandler} address={setDestination} addressType="Destination"/>
          <iframe loading='lazy' allowFullScreen src={mapURL}/>
          <QuoteDetailsForm isValid={validDetailsHandler} distance={+distance}/>
          <QuotePrice isValid={validPricingHandler}/>
          <div className={classes.actionDiv}>
            <button type='submit' className={classes.action}><label>Clear</label></button>
          </div>
          <div className={classes.actionDiv}>
            <button className={classes.action}><label>Submit</label></button>
          </div>
        </form>
    </div>
  );
};

export default NewQuote;
