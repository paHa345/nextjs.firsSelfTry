import { Fragment } from "react";
import styles from "./LoginButton.module.css";

function LoginButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <a onClick={props.onLogin} href="/">
          Войти на сайт
        </a>
      </div>

      <div className={styles.registrationLink}>
        <a href="/" onClick={props.onShowReg}>
          Регистрация
        </a>
      </div>
    </Fragment>
  );
}

export default LoginButton;
