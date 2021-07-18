import classes from "./client_autocomplete_item.module.css";

const ClientAutoCompleteItem = (client) => {
    return (
        <li key={client.id} className={classes.item}>
            <button className={classes.buttons}>
                <div>
                    {client.firstName && <label>{client.firstName}</label>}
                    {client.lastName && <label>{client.lastName}</label>}
                    {client.businessName && <label className={classes.business}>{client.businessName}</label>}
                </div>
                <div>
                    {client.email && <label>{client.email}</label>}
                    {client.phone && <label>{client.phone}</label>}
                </div>
            </button>
        </li>
    )
}
export default ClientAutoCompleteItem;