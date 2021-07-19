import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${styles['input']} ${!props.isValid && styles.invalid}`}
      type={props.type || "text"}
      onChange={props.onChange}
      value={props.value}
      autoComplete='off'
      id={props.id}
    />
  );
};

export default Input;
