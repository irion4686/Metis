import classes from "./client_autocomplete_item.module.css";

const ClientAutoCompleteItem = (client, onSelection) => {
    const onClickHandler = () => {
        onSelection(client);
    }
    return (
        <li key={client.id} className={classes.item}>
            <button className={classes.buttons} onClick={onClickHandler}>
                <div className={classes.lines}>
                    {client.firstName && client.lastName && <label>{client.firstName} {client.lastName}</label>}
                    {client.businessName && <label className={classes.end}>{client.businessName}</label>}
                </div>
                <div className={classes.lines}>
                    {client.email && <label>{client.email}</label>}
                    {client.phone && <label className={classes.end}>{client.phone}</label>}
                </div>
            </button>
        </li>
    )
}
export default ClientAutoCompleteItem;