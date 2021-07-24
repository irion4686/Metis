import classes from "./address_autocomplete_item.module.css";

const AddressAutoCompleteItem = (address, onSelection) => {
    const onClickHandler = () => {
        onSelection(address);
    }
    return (
        <li key={address.id} className={classes.item}>
            <button className={classes.buttons} onClick={onClickHandler}>
                {address.street && <label className={classes.street}>{address.street}</label>}
                {address.city && <label className={classes.not_street}>{address.city}</label>}
                {address.state && <label className={classes.not_street}>{address.state}</label>}
                {address.zip !== 0 && <label className={classes.not_street}>{address.zip}</label>}
            </button>
        </li>
    )
}
export default AddressAutoCompleteItem;