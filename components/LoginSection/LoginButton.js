import Link from "next/link";
import { Fragment } from "react";
import styles from "./LoginButton.module.css";

function LoginButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <Link onClick={props.onLogin} href="/">
          Войти на сайт
        </Link>
      </div>

      <div className={styles.registrationLink}>
        <Link href="/" onClick={props.onShowReg}>
          Регистрация
        </Link>
      </div>
    </Fragment>
  );
}

export default LoginButton;
