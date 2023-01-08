import Link from "next/link";
import { Fragment } from "react";
import styles from "./ForgetPassButton.module.css";

function ForgetPassButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <Link onClick={props.onResetPass} href="/">
          Восстановить пароль
        </Link>
      </div>
    </Fragment>
  );
}

export default ForgetPassButton;
