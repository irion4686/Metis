import classes from "./new_quote.module.css";
import ClientForm from "./client_form";
import AddressForm from "./address_form";
import QuoteDetailsForm from "./quote_details_form";
import QuotePrice from "./quote_price_form";
import { useState } from "react";

const NewQuote = () => {
  const [clientIsValid, setClientValid] = useState(false);
  const [originIsValid, setOriginValid] = useState(false);
  const [destValid, setDestValid] = useState(false);
  const [detailsValid, setDetailsValid] = useState(false);
  const [pricingValid, setPricingValid] = useState(false);

  let client = {
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    id: "",
  };

  const DUMMY_CLIENTS = [
    {
      firstName: "Cody",
      lastName: "Irion",
      businessName: "Eclipse Equine Transport",
      email: "cody@eclipseequinetransport.com",
      phone: "919-923-2259",
      id: "01",
    },
    {
      firstName: "Corey",
      lastName: "Overcash",
      businessName: "",
      email: "coreyovercash@gmail.com",
      phone: "919-599-8498",
      id: "69",
    },
    {
      firstName: "Colin",
      lastName: "Farrel",
      businessName: "Beverly Hills Farms",
      email: "bigshot@gmail.com",
      phone: "919-923-2259",
      id: "202",
    },
  ];

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

  return (
    <div className={classes.new_quote}>
      <form autoComplete='off' onSubmit={submitHandler}>
        <ClientForm onClientChange={onClientChange} isValid={validClientHandler} suggestions={DUMMY_CLIENTS}/>
        <AddressForm isValid={validOriginHandler} addressType="Origin"/>
        <AddressForm isValid={validDestHandler} addressType="Destination"/>
        <QuoteDetailsForm isValid={validDetailsHandler} distance={600}/>
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
