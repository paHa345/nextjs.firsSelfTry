import Link from "next/link";
import { Fragment } from "react";
import styles from "./RegistrationButton.module.css";

function RegistrationButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <Link onClick={props.onAuth} href="/">
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.registrationLink}>
        <Link href="/" onClick={props.onShowLogin}>
          Войти на сайт
        </Link>
      </div>
    </Fragment>
  );
}

export default RegistrationButton;
