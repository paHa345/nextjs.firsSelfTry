import Link from "next/link";
import { Fragment } from "react";
import styles from "./LoginButton.module.css";

function LoginButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <button>Войти на сайт</button>
      </div>

      <div className={styles.registrationLink}>
        <Link href="/" onClick={props.onShowReg}>
          Регистрация
        </Link>
      </div>
      <div className={styles.forgetPasswordLink}>
        <Link href="/forget-password">Забыл пароль</Link>
      </div>
    </Fragment>
  );
}

export default LoginButton;
