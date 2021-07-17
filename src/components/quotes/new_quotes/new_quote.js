import classes from "./new_quote.module.css";
import ClientForm from "./client_form";
import AddressForm from "./address_form";
import QuoteDetailsForm from "./quote_details_form";

const NewQuote = () => {

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
        <ClientForm classname={classes.form} onClientChange={onClientChange} suggestions={DUMMY_CLIENTS}/>
        <AddressForm addressType="Origin"/>
        <AddressForm addressType="Destination" />
        <QuoteDetailsForm distance={600}/>
      </form>
    </div>
  );
};

export default NewQuote;
