import Link from "next/link";
import { Fragment } from "react";
import styles from "./RecoverPasswordButton.module.css";

function RecoverPasswordButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <Link onClick={props.onResetPass} href="/">
          Установить пароль
        </Link>
      </div>
    </Fragment>
  );
}

export default RecoverPasswordButton;
