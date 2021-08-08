import Card from "../card/Card";
import classes from "./confirm_modal.module.css";
import ReactDOM from "react-dom";
import React from "react";


const Backdrop = (props) => {
    return <div className={classes.backdrop} onCancel={props.onCancel}/>
};

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <button onClick={props.onCancel}>No</button>
                <button onClick={props.onConfirm}>Yes</button>
            </footer>
        </Card>
    );
};

const ConfirmModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onCancel}/>,
                document.getElementById("backdrop-root")
            )};
            {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message}
                                                 onCancel={props.onCancel}
                                                 onConfirm={props.onConfirm}/>, document.getElementById("overlay-root"))};
        </React.Fragment>
    );
};

export default ConfirmModal;
