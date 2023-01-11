import Link from "next/link";
import { Fragment } from "react";
import styles from "./RegistrationButton.module.css";

function RegistrationButton(props) {
  return (
    <Fragment>
      <div className={styles.loginButton}>
        <button>Зарегистрироваться</button>
      </div>
      <div className={styles.registrationLink}>
        <Link href="/" onClick={props.onShowLogin}>
          Войти на сайт
        </Link>
      </div>
      <div className={styles.forgetPasswordLink}>
        <Link href="/forget-password">Забыл пароль</Link>
      </div>
    </Fragment>
  );
}

export default RegistrationButton;
