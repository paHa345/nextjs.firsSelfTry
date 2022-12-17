import { Fragment } from "react";
import styles from "./RegistrationButton.module.css";

function RegistrationButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <a onClick={props.onAuth} href="/">
          Зарегистрироваться
        </a>
      </div>
      <div className={styles.registrationLink}>
        <a href="/" onClick={props.onShowLogin}>
          Войти на сайт
        </a>
      </div>
    </Fragment>
  );
}

export default RegistrationButton;
