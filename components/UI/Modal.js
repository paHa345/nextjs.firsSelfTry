import { Fragment } from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <div className={styles.modalContent}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
