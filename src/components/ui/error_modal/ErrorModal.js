import Card from "../card/Card";
import classes from "./ErrorModal.module.css";
import ReactDOM from "react-dom";
import React from "react";


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />
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
          <button onClick={props.onClick}>Okay</button>
        </footer>
      </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onError} />,
        document.getElementById("backdrop-root")
      )};
      {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onClick={props.onError} />, document.getElementById("overlay-root"))};
    </React.Fragment>
  );
};

export default ErrorModal;
