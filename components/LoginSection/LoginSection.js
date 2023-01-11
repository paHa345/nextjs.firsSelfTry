import LoginForm from "./LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import RegistrationForm from "./RegistrationForm";
import styles from "./LoginSection.module.css";
import { useState } from "react";
import Modal from "../UI/Modal";
import Link from "next/link";

function LoginSection(props) {
  const [showregistration, setShowRegistration] = useState(false);

  const showRegHandler = (e) => {
    e.preventDefault();
    setShowRegistration(true);
  };

  const showLoginHandler = (e) => {
    e.preventDefault();
    setShowRegistration(false);
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        {/* <div className={styles.xMark}>
          <a href="/" onClick={props.onHideLogin}>
            <FontAwesomeIcon icon={faXmarkCircle} size="4x" />
          </a>
        </div> */}
        {!showregistration && (
          <LoginForm onShowReg={showRegHandler}></LoginForm>
        )}

        {showregistration && (
          <RegistrationForm onShowLogin={showLoginHandler}></RegistrationForm>
        )}
      </div>
    </section>
  );
}
export default LoginSection;
