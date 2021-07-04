import classes from "./new_quote.module.css";
import { useState } from "react";

import AutocompleteInput from "../../ui/input/autocomplete_input";
import ClientForm from "./client_form";

const NewQuote = (props) => {
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

  const onClientChange = (event) => {
    client = event;
  };

  return (
    <div className={classes.new_quote}>
      <form>
        <ClientForm onClientChange={onClientChange} suggestions={DUMMY_CLIENTS}/>
      </form>
    </div>
  );
};

export default NewQuote;
